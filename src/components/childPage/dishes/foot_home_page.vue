<!-- 菜品库主页 -->
<template>
    <div class="postPre">
        <div class="commonHeader_style">
            <div>
                <el-button type="primary" icon="el-icon-plus" @click="show_bounced=true">添加库</el-button>
            </div>
            <br>
            <!-- 数据 -->
            <div>
                <table class="table_list" border="0" cellspacing="0">
                    <tr>
                        <th></th>
                        <th>菜品库名称</th>
                        <th>所属机构</th>
                        <th>创建时间</th>
                        <th>状态</th>
                        <th>操作</th>
                    </tr>
                    <!--  -->
                    <tr v-for="(v,k) in data_list" :key="k">
                        <td>{{k+1}}</td>
                        <td>{{v.name}}</td>
                        <td>{{v.institutions}}</td>
                        <td>{{v.time}}</td>
                        <td>
                            <span v-if="v.state==1" style="color:green">{{v.state==1?'启用':''}}</span>
                            <span v-else style="color:red">{{v.state==2?'停用':''}}</span>
                        </td>
                        <td>
                            <el-button type="primary" size="small" icon="el-icon-setting" @click="operation(1,k,v)">菜品管理</el-button>
                            <el-button type="warning" v-if="v.state==1" size="small" icon="el-icon-time" @click="operation(2,k)">停用</el-button>
                            <el-button type="success" v-if="v.state==2" size="small" icon="el-icon-time" @click="operation(4,k)">启用</el-button>
                            <el-button type="danger" size="small" icon="el-icon-delete" @click="operation(3,k)">删除</el-button>
                        </td>
                    </tr>
                    <!-- 无数据显示 -->
                    <tr v-if="data_list.length<=0">
                        <td colspan="6">
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
                    <div class="center_box" v-if="show_center" @click.stop>
                        <!-- 定位 X -->
                        <div class="position_clear" @click="quiet_box">
                            <i class="el-icon-circle-close"></i>
                        </div>
                        <!-- 头部 -->
                        <div class="title">新增菜品库</div>
                        <!-- 内容部分 -->
                        <div class="content_scroll">
                            <br>
                            <div class="box_input">
                                <div class="font">菜&nbsp;&nbsp;品&nbsp;&nbsp;库&nbsp;&nbsp;名&nbsp;&nbsp;称&nbsp;</div>
                                <div>
                                    <el-input style="width:300px" v-model="P_name" size="medium" clearable placeholder="请输入菜品库名称"></el-input>
                                </div>
                                <div class="font" style="color:red">*</div>
                            </div>
                            <hr>
                            <!--  -->
                            <div class="box_input" onselectstart="return false;">
                                <div class="font firstName">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;选&nbsp;&nbsp;择&nbsp;&nbsp;门&nbsp;&nbsp;店&nbsp;&nbsp;</div>
                                <div>
                                    <!--  -->
                                    <storeSelect
                                    :inputWidth="240"
                                    @selectChange="TBoxstateChage">
                                    </storeSelect>
                                    <!--  -->
                                </div>
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
    </div>
</template>

<script>
    export default {
        data(){
            return {
                P_name:'',//菜品库名称
                show_center:false,//弹框内层框是否显示
                show_bounced:false,//是否显示增加岗位弹框
                pageIndex:1,//当前页数
                pageSize:10,//每页显示条数
                data_list:[
                   {name:'加盟店菜谱(2018改价后)',institutions:'合肥安业餐饮有限公司（蜀山区分公司）',time:'2018-10-30 23:00',user:'张嘉欣',state:1},
                   {name:'吃饱了撑的没事干',institutions:'合肥安业餐饮有限公司（蜀山区分公司）',time:'2018-10-30 23:00',user:'张嘉欣',state:2},
                   {name:'吃饱了撑的没事干',institutions:'合肥安业餐饮有限公司（蜀山区分公司）',time:'2018-10-30 23:00',user:'张嘉欣',state:2},
                   {name:'吃饱了撑的没事干',institutions:'合肥安业餐饮有限公司（蜀山区分公司）',time:'2018-10-30 23:00',user:'张嘉欣',state:2},
                   {name:'吃饱了撑的没事干',institutions:'合肥安业餐饮有限公司（蜀山区分公司）',time:'2018-10-30 23:00',user:'张嘉欣',state:1},
                   {name:'吃饱了撑的没事干',institutions:'合肥安业餐饮有限公司（蜀山区分公司）',time:'2018-10-30 23:00',user:'张嘉欣',state:2},
                   {name:'吃饱了撑的没事干',institutions:'合肥安业餐饮有限公司（蜀山区分公司）',time:'2018-10-30 23:00',user:'张嘉欣',state:1},
                   {name:'吃饱了撑的没事干',institutions:'合肥安业餐饮有限公司（蜀山区分公司）',time:'2018-10-30 23:00',user:'张嘉欣',state:2},
                   {name:'吃饱了撑的没事干',institutions:'合肥安业餐饮有限公司（蜀山区分公司）',time:'2018-10-30 23:00',user:'张嘉欣',state:2},
                   {name:'吃饱了撑的没事干',institutions:'合肥安业餐饮有限公司（蜀山区分公司）',time:'2018-10-30 23:00',user:'张嘉欣',state:1},
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
            console.log('菜品库主页')
        },
        methods:{
            // 弹框门店选择事件
            TBoxstateChage(data){
                console.log(data)
            },
            //弹框确定事件
            confirmOk(){
                console.log('添加库确定')
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
                    // 菜品管理
                    sessionStorage.removeItem('foot_select')
                    this.$router.push('/HomePage/foodLibrary/Food_MGM')
                }else if(e==2){
                    // 停用
                    this.$confirm('此操作将停用该菜品库, 是否继续?', '提示', {
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
                    this.$confirm('此操作将删除该菜品库, 是否继续?', '提示', {
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
                    this.$confirm('此操作将启用该菜品库, 是否继续?', '提示', {
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
        }
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