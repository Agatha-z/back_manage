<!-- 反结订单 -->
<template>
    <div class="postPre">
        <!-- 引用公共头部 -->
        <orderComHead
        :inputsList="['操作人','反结原因']"
        @submitSeach="submitSeach"></orderComHead>
        <br>
        <!--  -->
        <div class="commonHeader_style">
            <el-button type="primary" size="medium" @click="ExportData">批量导出<i class="el-icon-printer el-icon--right"></i></el-button> 
            <!-- 数据显示 -->
            <div class="tabel_list_body">
                <table class="table_list" border="0" cellspacing="0">
                    <tr>
                        <th></th>
                        <th>机构名称</th>
                        <th>反结原因</th>
                        <th>操作人</th>
                        <th>账单编号</th>
                        <th>反结时间</th>
                        <th>应收</th>
                        <th>实收</th>
                        <th>反结详情</th>
                    </tr>
                    <!--  -->
                    <tr v-for="(v,k) in data_list" :key="k">
                        <td>{{k+1}}</td>
                        <td>{{v.name}}</td>
                        <td>{{v.why}}</td>
                        <td>{{v.user}}</td>
                        <td>{{v.code}}</td>
                        <td>{{v.time}}</td>
                        <td>{{v.originally}}</td>
                        <td>{{v.theActual}}</td>
                        <td>
                             <el-button @click="showBox_s(k)" size="small" type="primary"><i class="el-icon-view"></i>&nbsp;&nbsp;查看</el-button>
                        </td>
                    </tr>
                    <!-- 无数据显示 -->
                    <tr v-if="data_list.length<=0">
                        <td colspan="9">
                            <p style="color:#999">暂无更多数据</p>
                        </td>
                    </tr>
                </table>
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
            <!--  -->
            </div>
        </div>
        <div class="bounced_box"  v-if="show_bounced" @click="quiet_box">
            <transition name="animate_box">
                <div class="center_box" v-if="show_center" @click.stop>
                     <!-- 定位 X -->
                    <div class="position_clear" @click="quiet_box">
                        <i class="el-icon-circle-close"></i>
                    </div>
                    <!-- 头部 -->
                    <div class="title">反结详情</div>
                    <!-- 内容部分 -->
                    <div class="content_scroll">
                        <div style="padding:20px;">
                            <!-- 显示表格 -->
                            <table class="table_list table_list_box" border="0" cellspacing="0">
                                <tr>
                                    <th>账单类型</th>
                                    <th>结账时间</th>
                                    <th>应收</th>
                                    <th>实收</th>
                                    <th>现金支付</th>
                                </tr>
                                <!-- {class:'反结账单',time:'2018-9-2 23:23:01',originally:23,theActual:30,cash:23}, -->
                                <tr v-for="(v,k) in toView" :key="k">
                                    <td>{{v.class}}</td>
                                    <td>{{v.time}}</td>
                                    <td>{{v.originally}}</td>
                                    <td>{{v.theActual}}</td>
                                    <td>{{v.cash}}</td>
                                </tr>
                                <tr v-if="toView.length<=0">
                                    <td colspan="5" style="color:#999;">暂无数据</td>
                                </tr>
                            </table>
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
                toView:[  //弹框查看数据
                    {class:'反结账单',time:'2018-9-2 23:23:01',originally:23,theActual:30,cash:'--'},
                    {class:'原始单',time:'2018-9-2 23:23:01',originally:23,theActual:30,cash:23},
                ],
                show_center:false,//弹框内层框是否显示
                show_bounced:false,//是否显示增加岗位弹框
                pageIndex:1,//当前页数
                pageSize:10,//每页显示条数
                data_list:[
                    {name:'安少爷米线（商之都店）',why:'客户结账后退菜',user:'商之都店',code:'10000233',time:'2018-9-10 09:23:02',originally:23,theActual:30},
                    {name:'安少爷米线（商之都店）',why:'客户结账后退菜',user:'商之都店',code:'10000233',time:'2018-9-10 09:23:02',originally:23,theActual:30},
                    {name:'安少爷米线（商之都店）',why:'客户结账后退菜',user:'商之都店',code:'10000233',time:'2018-9-10 09:23:02',originally:23,theActual:30},
                    {name:'安少爷米线（商之都店）',why:'客户结账后退菜',user:'商之都店',code:'10000233',time:'2018-9-10 09:23:02',originally:23,theActual:30},
                    {name:'安少爷米线（商之都店）',why:'客户结账后退菜',user:'商之都店',code:'10000233',time:'2018-9-10 09:23:02',originally:23,theActual:30},
                    {name:'安少爷米线（商之都店）',why:'客户结账后退菜',user:'商之都店',code:'10000233',time:'2018-9-10 09:23:02',originally:23,theActual:30},
                    {name:'安少爷米线（商之都店）',why:'客户结账后退菜',user:'商之都店',code:'10000233',time:'2018-9-10 09:23:02',originally:23,theActual:30},
                    {name:'安少爷米线（商之都店）',why:'客户结账后退菜',user:'商之都店',code:'10000233',time:'2018-9-10 09:23:02',originally:23,theActual:30},
                    {name:'安少爷米线（商之都店）',why:'客户结账后退菜',user:'商之都店',code:'10000233',time:'2018-9-10 09:23:02',originally:23,theActual:30},
                    {name:'安少爷米线（商之都店）',why:'客户结账后退菜',user:'商之都店',code:'10000233',time:'2018-9-10 09:23:02',originally:23,theActual:30},
                ],
            }
        },
        created(){
            console.log('反结订单')
        },
        methods:{
            // 查看按钮
            showBox_s(){
                this.show_bounced=true;
            },
            // 公共组件头部 搜索事件
            submitSeach(data){
                console.log(data)
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            },
            // 导出数据事件
            ExportData(){
                this.$confirm('此操作将导出全部菜品数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'info'
                }).then(() => {
                    //excel数据导出
                    require.ensure([], () => {
                        const {
                            export_json_to_excel
                        } = require('../../../vendor/Export2Excel');
                        const tHeader = ['机构名称','反结原因','操作人','账单编号','反结时间','应收','实收'];
                        const filterVal = ['name', 'why', 'user', 'code', 'time', 'originally', 'theActual' ];
                        const list = this.data_list;
                        const data = this.formatJson(filterVal, list);
                        export_json_to_excel(tHeader, data, '列表excel');
                    })
                    this.$message({
                        type: 'success',
                        message: '已添加到下载队列'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });          
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
    .tabel_list_body{
        margin-top:10px;
    }
    .pageBtn{
        margin: 20px auto 0 auto;
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
    }
    .table_list tr>th:last-child, .table_list tr>td:last-child{
        width:100px;
    }
    .table_list_box tr td{
        padding: 10px 5px;
    }
</style>