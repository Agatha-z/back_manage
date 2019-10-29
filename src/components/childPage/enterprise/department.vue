<!-- 部门管理 -->
<template>
    <div class="postPre">
        <!-- 顶部公共组件 -->
        <comTopHeader
        :padding_c="true"
        :placeholder_txt="'输入部门名/机构名'"
        :select_data="[{index:0,txt:'全部'},{index:1,txt:'启用'},{index:2,txt:'停用'}]"
        :brand_data="[{index:0,txt:'安少爷米线'},{index:1,txt:'黑暗料理吃不死人'}]"
        :area_data="[{index:0,txt:'合肥'},{index:1,txt:'铜陵'},{index:2,txt:'芜湖'}]"
        @input-change="seachBtn"
        @state-change="stateChange"
        @brand-change="brandChange"
        @area-change="areaChange"
        ></comTopHeader>
        <!--  -->
        <div class="commonHeader_style">
            <div>
                <el-button type="primary" @click="show_bounced=true,checkedTree=[],lowerLevel=[]" icon="el-icon-plus">新增部门</el-button>
            </div>
            <br>
            <!-- 数据 -->
            <div>
                <table class="table_list" border="0" cellspacing="0">
                    <tr>
                        <th></th>
                        <th>部门名称</th>
                        <th>所属机构</th>
                        <th>操作人</th>
                        <th>操作时间</th>
                        <th>部门状态</th>
                        <th>操作</th>
                    </tr>
                    <tr v-for="(v,k) in data_list" :key="k">
                        <td>{{k+1}}</td>
                        <td>{{v.name}}</td>
                        <td>{{v.institutions}}</td>
                        <td>{{v.user}}</td>
                        <td>{{v.time}}</td>
                        <td>
                            <span v-if="v.state==1" style="color:green">{{v.state==1?'启用':''}}</span>
                            <span v-else style="color:red">{{v.state==2?'停用':''}}</span>
                        </td>
                        <td>
                            <el-button type="primary" size="small" icon="el-icon-edit" @click="operation(1,k,v)">编辑</el-button>
                            <el-button type="warning" v-if="v.state==1" size="small" icon="el-icon-time" @click="operation(2,k)">停用</el-button>
                            <el-button type="success" v-if="v.state==2" size="small" icon="el-icon-time" @click="operation(4,k)">启用</el-button>
                            <el-button type="danger" size="small" icon="el-icon-delete" @click="operation(3,k)">删除</el-button>
                        </td>
                    </tr>
                    <!-- 无数据显示 -->
                    <tr v-if="data_list.length<=0">
                        <td colspan="7">
                            <p style="color:#999">暂无更多数据</p>
                        </td>
                    </tr>
                </table>
            </div>
            <!--  -->
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
        </div>
        <!--  -->
        <div class="bounced_box"  v-if="show_bounced" @click="quiet_box">
            <transition name="animate_box">
                <div class="center_box" v-if="show_center" @click.stop>
                     <!-- 定位 X -->
                    <div class="position_clear" @click="quiet_box">
                        <i class="el-icon-circle-close"></i>
                    </div>
                    <!-- 头部 -->
                    <div class="title">新增部门</div>
                    <!-- 内容部分 -->
                    <div class="content_scroll">
                        <br>
                        <div class="box_input">
                            <div class="font">部&nbsp;&nbsp;门&nbsp;&nbsp;名&nbsp;&nbsp;称&nbsp;</div>
                            <div>
                                <el-input style="width:300px" v-model="P_name" size="medium" clearable placeholder="请输入岗位名称"></el-input>
                            </div>
                            <div class="font" style="color:red">*</div>
                        </div>
                        <hr>
                        <!--  -->
                        <div class="box_input">
                            <div class="font">所&nbsp;&nbsp;属&nbsp;&nbsp;机&nbsp;&nbsp;构&nbsp;</div>
                            <div>
                                <el-select style="width:300px"  size="medium" v-model="P_institutions" placeholder="请选择">
                                    <el-option label="安少爷米线" :value="1"></el-option>
                                    <el-option label="小少爷米线" :value="2"></el-option>
                                    <el-option label="大少爷米线" :value="3"></el-option>
                                </el-select>
                            </div>
                            <div class="font" style="color:red">*</div>
                        </div>
                    </div>
                    <!-- 底部内容 -->
                    <div class="footer_btn">
                        <el-button type="info" size="medium"  @click="quiet_box">取消</el-button>
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
                P_name:'',//部门名称
                P_institutions:'',//所属机构
                show_center:false,//弹框内层框是否显示
                show_bounced:false,//是否显示增加岗位弹框
                pageIndex:1,//当前页数
                pageSize:10,//每页显示条数
                data_list:[
                   {name:'运营部',institutions:'合肥安业餐饮有限公司（蜀山区分公司）',user:'魏大勋',time:'2018-10-30 23:00',state:1},
                   {name:'设计部',institutions:'合肥安业餐饮有限公司（蜀山区分公司）',user:'邓超他爸',time:'2018-10-30 23:00',state:1},
                   {name:'开发部',institutions:'合肥安业餐饮有限公司（蜀山区分公司）',user:'江疏影男朋友',time:'2018-10-30 23:00',state:2},
                   {name:'总经办',institutions:'合肥安业餐饮有限公司（蜀山区分公司）',user:'黄渤他二大爷',time:'2018-10-30 23:00',state:1},
                   {name:'开发部',institutions:'合肥安业餐饮有限公司（蜀山区分公司）',user:'小猪',time:'2018-10-30 23:00',state:2},
                   {name:'开发部',institutions:'合肥安业餐饮有限公司（蜀山区分公司）',user:'绝地求生',time:'2018-10-30 23:00',state:2},
                   {name:'开发部',institutions:'合肥安业餐饮有限公司（蜀山区分公司）',user:'英雄联盟',time:'2018-10-30 23:00',state:1},
                   {name:'开发部',institutions:'合肥安业餐饮有限公司（蜀山区分公司）',user:'吃饭要吃鸡',time:'2018-10-30 23:00',state:2},
                   {name:'开发部',institutions:'合肥安业餐饮有限公司（蜀山区分公司）',user:'天王盖地虎',time:'2018-10-30 23:00',state:1},
                   {name:'开发部',institutions:'合肥安业餐饮有限公司（蜀山区分公司）',user:'张嘉欣',time:'2018-10-30 23:00',state:1},
                ] 
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
        created(){
            console.log('部门管理')
        },
        methods:{
            // 公共组件搜索按钮事件
            seachBtn(data){
                console.log(data)
            },
            //状态栏change事件
            stateChange(data){
                console.log(data)
            },
            //所属品牌change事件
            brandChange(e){
                console.log(e)
            },
            //所属品牌change事件
            areaChange(e){
                console.log(e)
            },
            // 操作按钮 启用/停用/删除
            operation(e,k,data){
                if(e==1){
                    // 编辑
                    this.checkedTree=data.check;
                    this.show_bounced=true;
                }else if(e==2){
                    // 停用
                    this.$confirm('此操作将停用该部门, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        // 停用当前数据
                        this.data_list[k].state=2;
                        this.$message({
                            duration:1000,
                            type: 'success',
                            message: '停用成功!'
                        });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            duration:1000,
                            message: '已取消'
                        });          
                    });
                }else if(e==3){
                    // 删除
                    this.$confirm('此操作将删除该部门, 是否继续?', '提示', {
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
                }else{
                    // 启用
                    this.$confirm('此操作将启用该部门, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        // 停用当前数据
                        this.data_list[k].state=1;
                        this.$message({
                            duration:1000,
                            type: 'success',
                            message: '启用成功!'
                        });
                    }).catch(() => {
                        this.$message({
                            duration:1000,
                            type: 'info',
                            message: '已取消'
                        });          
                    });
                }
                console.log(e,k)
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
            // 弹框 关闭事件{
            quiet_box(){
                this.show_center=false;
                this.$message({
                    duration:1000,
                    type: 'info',
                    message: '已取消'
                }); 
            },
            //弹框确定事件
            confirmOk(){
                console.log(this.checkedTree)
                console.log(this.$refs.tree.getCheckedKeys())
            }
        }
    }
</script>

<style scoped>
    .postPre{
        padding:10px;
    }
    .commonHeader_style{
        margin-top:10px;
    }
    .pageBtn{
        margin: 20px auto 0 auto;
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
    }
    .box_input{
        width:500px;
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