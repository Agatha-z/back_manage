<!-- 菜谱 -->
<template>
    <div class="postPre">
        <dishesHeader
        @selectChange="selectChange"
        @state-change="stateChange"
        @input-change="seachChange"
        :placeholder_txt="'输入菜谱名'"
        :select_data="[{index:0,txt:'全部'},{index:1,txt:'启用'},{index:2,txt:'停用'}]"></dishesHeader>
        <br>
        <div class="commonHeader_style">
            <div>
                <el-button type="primary" @click="show_bounced=true" icon="el-icon-plus">新增菜谱</el-button>
            </div>
            <br>
            <!-- 数据 -->
            <div>
                <table class="table_list" border="0" cellspacing="0">
                    <tr>
                        <th></th>
                        <th>岗位名称</th>
                        <th>所属机构</th>
                        <th>所属部门</th>
                        <th>操作人</th>
                        <th>操作时间</th>
                        <th>岗位状态</th>
                        <th>操作</th>
                    </tr>
                    <tr v-for="(v,k) in data_list" :key="k">
                        <td>{{k+1}}</td>
                        <td>{{v.name}}</td>
                        <td>{{v.institutions}}</td>
                        <td>{{v.office}}</td>
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
                        <td colspan="8">
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
                    <div class="title">新增菜谱</div>
                    <!-- 内容部分 -->
                    <div class="content_scroll">
                        <br>
                        <div class="box_input">
                            <div class="font firstName">菜谱名称</div>
                            <div>
                                <el-input size="medium" style="width:293px;" placeholder="请输入内容"></el-input>
                            </div>
                        </div>
                        <hr>
                        <!--  -->
                        <div class="box_input" onselectstart="return false;">
                            <div class="font firstName">选择门店</div>
                            <div>
                                <!--  -->
                                <storeSelect
                                @selectChange="TBoxstateChage">
                                </storeSelect>
                                <!--  -->
                            </div>
                        </div>
                        <hr>
                        <!--  -->
                        <div class="box_input">
                            <div class="font firstName">选择菜品库菜品</div>
                            <div style="width:500px;">
                                <footCommon></footCommon>
                            </div>
                        </div>
                        <hr>
                        <!--  -->
                        <div class="box_input">
                            <div class="font firstName">生效日期</div>
                            <div style="width:500px;">
                                <el-date-picker
                                v-model="dateValue"
                                size="medium"
                                style="width:293px;"
                                type="date"
                                placeholder="选择日期">
                                </el-date-picker>
                            </div>
                        </div>
                        <br>
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
                dateValue:'',//弹框选择的时间
                P_name:'',//新增菜谱名称
                data_list:[
                   {name:'CEO',institutions:'合肥安业餐饮有限公司（蜀山区分公司）',office:'公司办公室',check:['1-8-1'],user:'魏大勋',time:'2018-10-30 23:00',state:1},
                   {name:'CEO',institutions:'合肥安业餐饮有限公司（蜀山区分公司）',office:'公司办公室',check:['1-8-1'],user:'邓超他爸',time:'2018-10-30 23:00',state:1},
                   {name:'CEO',institutions:'合肥安业餐饮有限公司（蜀山区分公司）',office:'公司办公室',check:['1-8-1'],user:'江疏影男朋友',time:'2018-10-30 23:00',state:2},
                   {name:'CEO',institutions:'合肥安业餐饮有限公司（蜀山区分公司）',office:'公司办公室',check:['1-8-1'],user:'黄渤他二大爷',time:'2018-10-30 23:00',state:1},
                   {name:'CEO',institutions:'合肥安业餐饮有限公司（蜀山区分公司）',office:'公司办公室',check:['1-8-1'],user:'小猪',time:'2018-10-30 23:00',state:2},
                   {name:'CEO',institutions:'合肥安业餐饮有限公司（蜀山区分公司）',office:'公司办公室',check:['1-8-1'],user:'绝地求生',time:'2018-10-30 23:00',state:2},
                   {name:'CEO',institutions:'合肥安业餐饮有限公司（蜀山区分公司）',office:'公司办公室',check:['1-8-1'],user:'英雄联盟',time:'2018-10-30 23:00',state:1},
                   {name:'CEO',institutions:'合肥安业餐饮有限公司（蜀山区分公司）',office:'公司办公室',check:['1-8-1'],user:'吃饭要吃鸡',time:'2018-10-30 23:00',state:2},
                   {name:'CEO',institutions:'合肥安业餐饮有限公司（蜀山区分公司）',office:'公司办公室',check:['1-8-1'],user:'天王盖地虎',time:'2018-10-30 23:00',state:1},
                   {name:'CEO',institutions:'合肥安业餐饮有限公司（蜀山区分公司）',office:'公司办公室',check:['1-8-1'],user:'张嘉欣',time:'2018-10-30 23:00',state:1},
                ],
                show_center:false,//弹框内层框是否显示
                show_bounced:false,//是否显示增加岗位弹框
                pageIndex:1,//当前页数
                pageSize:10,//每页显示条数

            }
        },
        created(){
            console.log('菜谱')
        },
        methods:{
            // 弹框门店选择事件
            TBoxstateChage(data){
                console.log(data)
            },
            // 搜索框事件
            seachChange(e){
                console.log(e)
            },
            // 状态栏事件
            stateChange(e){
                console.log(e)
            },
            // 门店选择事件
            selectChange(e){
                console.log(e)
            },
            // 操作按钮 启用/停用/删除
            operation(e,k,data){
                if(e==1){
                    // 编辑
                    this.show_bounced=true;
                }else if(e==2){
                    // 停用
                    this.$confirm('此操作将停用该岗位, 是否继续?', '提示', {
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
                }else{
                    // 启用
                    this.$confirm('此操作将启用该岗位, 是否继续?', '提示', {
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
                console.log('确认新增菜谱')
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
    }
</script>

<style scoped>
    .postPre{
        padding:10px;
    }
    .pageBtn{
        margin: 20px auto 0 auto;
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
    }
    .box_input{
        width:700px;
        margin: auto;
        padding:4px 0;
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
    .titles_head{
        font-size: 14px;
        color:#666;
    }
    .firstName{
        width:150px;
        text-align: right;
    }
</style>