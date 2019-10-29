<!-- 规格管理 -->
<template>
    <div>
        <div>
            <span style="font-size:18px;font-weight:600;">规格名称</span>&nbsp;&nbsp;&nbsp;
            <el-input style="width:250px" v-model="area_name" size="medium" clearable placeholder="请输入规格名称"></el-input>
            <!--  -->
            &nbsp;&nbsp;&nbsp;
            <el-button type="primary" size="medium" icon="el-icon-search" @click="seachAndClear(1)">搜索</el-button>
            <el-button type="info"  size="medium" icon="el-icon-refresh" @click="seachAndClear(2)">重置</el-button>
        </div>
        <br>
        <div>
            <!-- show_bounced=true -->
            <el-button type="primary" icon="el-icon-plus" @click="addCommon({index:1,title:'新增规格'})">新增规格</el-button>
        </div>
        <br>
        <!-- 数据 -->
        <div>
            <table class="table_list" border="0" cellspacing="0">
                <tr>
                    <th></th>
                    <th>区域名称</th>
                    <th>关联菜品数量</th>
                    <th>操作</th>
                </tr>
                <tr v-for="(v,k) in data_list" :key="k">
                    <td>{{k+1}}</td>
                    <td>{{v.name}}</td>
                    <td>{{v.num}}</td>
                    <td>
                        <el-button type="primary" size="small" icon="el-icon-edit"  @click="operation(1,k)">关联菜品</el-button>
                        <el-button type="danger" size="small" icon="el-icon-delete" @click="operation(2,k)">删除</el-button>
                    </td>
                </tr>
                <!-- 无数据显示 -->
                <tr v-if="data_list.length<=0">
                    <td colspan="4">
                        <p style="color:#999">暂无更多数据</p>
                    </td>
                </tr>
            </table>
        </div>
        <!-- 分页 -->
        <div class="pageBtn">
            <el-pagination
            :background="true"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageIndex"
            :page-sizes="[10, 20, 30, 40, 50]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="9990">
            </el-pagination>
        </div>
        <!-- 弹框 -->
        <div class="bounced_box"  v-if="show_bounced" @click="quiet_box">
            <transition name="animate_box">
                <div class="center_box" v-if="show_center" @click.stop :class="{showLongBox:commonBox.index==2}">
                     <!-- 定位 X -->
                    <div class="position_clear" @click="quiet_box">
                        <i class="el-icon-circle-close"></i>
                    </div>
                    <!-- 头部 -->
                    <div class="title">{{commonBox.title}}</div>
                    <!-- 内容部分 -->
                    <div class="content_scroll">
                        <!-- 新增规格模块 -->
                        <div v-if="commonBox.index==1">
                            <br>
                            <div class="box_input">
                                <div class="font">规格名称</div>
                                <div>
                                    <el-input class="Class_name_gui" style="width:250px" v-model.trim="Class_name" size="medium" clearable placeholder="请输入规格名称"></el-input>
                                </div>
                                <div class="font" style="color:red">*</div>
                            </div>
                        </div>
                        <!-- 关联菜品模块 -->
                        <div v-if="commonBox.index==2">
                            <associated
                            @change="associatedC"
                            :footList="footList"
                            :footClass="footClass"
                            :selectedList="selectedList"></associated>
                        </div>
                    </div>
                    <!-- 底部内容 -->
                    <div class="footer_btn">
                        <el-button type="info" size="medium"  @click="quiet_box">取消</el-button>
                        <el-button v-if="commonBox.index==1" type="primary" size="medium"  @click="associated">马上关联菜品</el-button>
                        <el-button type="success" size="medium" @click="confirmOk">确认</el-button>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                footClass:[ //菜品分类
                    {label:'全部',name:'0'},
                    {label:'套餐',name:'1'},
                    {label:'早餐',name:'2'}
                ],
                footList:[ //所以普菜品数据
                    {type:1,id:'1',name:'好吃的饺子',money:21},
                    {type:1,id:'2',name:'超级馒头',money:45},
                    {type:1,id:'3',name:'无敌煎饼',money:21},
                    {type:1,id:'4',name:'牛逼黄金油条',money:2},
                    {type:1,id:'5',name:'12米面条',money:21},
                    {type:1,id:'6',name:'1平方米煎饼果子',money:12},
                    {type:2,id:'7',name:'辣子鸡',money:21},
                    {type:2,id:'8',name:'豆浆',money:21},
                    {type:2,id:'9',name:'拿铁咖啡',money:5},
                ],
                selectedList:[
                    {id: "1",money: 23,viPrice:23,name: "好吃的饺子",type: 1},
                    {id: "5",money: 21,viPrice:21,name: "12米面条",type: 1}
                ],// 已经添加过的数据
                Class_name:'',//新增规格名称
                commonBox:{index:-1,title:''},//设置弹框显示
                area_name: '',//顶部搜索框规格名称
                show_center:false,//弹框内层框是否显示
                show_bounced:false,//是否显示弹框
                pageIndex:1,//当前页数
                pageSize:10,//每页显示条数
                data_list:[ //渲染数据
                    {name:'程序媛',num:1,},
                    {name:'程序媛',num:1,},
                    {name:'程序媛',num:1,},
                    {name:'程序媛',num:1,},
                    {name:'程序媛',num:1,},
                    {name:'程序媛',num:1,},
                    {name:'程序媛',num:1,},
                    {name:'程序媛',num:1,},
                    {name:'程序媛',num:1,},
                    {name:'程序媛',num:1,},
                ],
            }
        },
        watch:{
            // 监听动画
            show_bounced(){
                if(this.show_bounced){
                    setTimeout(()=>{
                        this.show_center=true
                    },0)
                }
            },
            show_center(){
                if(!this.show_center){
                    setTimeout(()=>{
                        this.show_bounced=false
                    },200)
                }
            }
        },
        methods:{
            // 穿梭狂事件
            associatedC(data){
                console.log(data)
            },
            // 公共弹框事件
            addCommon(e){
                // 设置显示哪块
                this.commonBox=e;
                // 开启弹框
                this.show_bounced=true
            },
            // 马上关联菜品
            associated(){
                if(this.Class_name==''){
                    this.$message({
                        message: '请填写规格名称',
                        type: 'warning'
                    });
                    return   
                }
                // 请求成功后
                // 设置弹框
                this.commonBox={index:2,title:'关联菜品'}
            },
            //重置和搜索按钮
            seachAndClear(e){
                if(e==1){
                    // 搜索
                }else{
                    // 重置
                    this.area_name='';
                }
            },
            //弹框确定事件
            confirmOk(){
                console.log(23232323)
            },
            // 弹框 关闭事件{
            quiet_box(){
                this.show_center=false;
                this.Class_name='';
                this.$message({
                    duration:1000,
                    type: 'info',
                    message: '已取消'
                }); 
            },
            // pageSize 改变时会触发
            handleSizeChange(data){
                console.log(data)
                this.pageSize=data
            },
            // pageIndex改变事件
            handleCurrentChange(data){
                console.log(data)
                this.pageIndex=data
            },
            // 操作按钮 启用/停用/删除
            operation(e,k,data){
                if(e==1){
                    // 关联菜品
                    // 打开弹框
                    this.show_bounced=true;
                    // 设置弹框
                    this.commonBox={index:2,title:'关联菜品'}
                }else if(e==2){
                    // 删除
                    this.$confirm('此操作将删除该岗位, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        // 删除该条数据
                        this.data_list.splice(k,1);
                        this.$message({
                            duration:1000,
                            type: 'success',
                            message: '删除成功!'
                        });
                    }).catch(() => {
                        this.$message({
                            duration:1000,
                            type: 'info',
                            message: '已取消'
                        });          
                    });
                }
            },
        }
    }
</script>

<style scoped>
    .pageBtn{
        margin: 20px auto 0 auto;
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
    }
    .showLongBox{
        width:1100px;
    }
    .box_input{
        width:400px;
        margin: auto;
        padding:15px 0;
    }
    .box_input div{
        display: inline-block;
        margin-right:20px;
    }
    .box_input .font{
        font-size:18px;
        font-weight: 600;
        color:#333;
        vertical-align: top;
        padding-top:5px;
    }
    .box_input div:last-child{
        margin-right:0;
    }
    hr{
        width:90%;
        margin:8px auto;
        border: 0;
        height: 1px;
        background:#eee;;
    }
</style>