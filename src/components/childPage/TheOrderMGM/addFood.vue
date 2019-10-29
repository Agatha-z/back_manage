<!-- 增菜订单 -->
<template>
    <div class="postPre">
        <!-- 引用公共头部 -->
        <orderComHead
        :inputsList="['增菜原因','操作人']"
        @submitSeach="submitSeach"></orderComHead>
        <br>
        <orderCenter
        :data_list="orderCenter">
        </orderCenter>
        <br>
        <!--  -->
        <div class="commonHeader_style">
            <el-button type="primary" size="medium" @click="ExportData">批量导出<i class="el-icon-printer el-icon--right"></i></el-button> 
            <!-- 数据显示 -->
            <div class="tabel_list_body">
                <table class="table_list table_list_box" border="0" cellspacing="0">
                    <tr>
                        <th></th>
                        <th>机构名称</th>
                        <th>增菜原因</th>
                        <th>账单编号</th>
                        <th>桌位名称</th>
                        <th>增菜金额</th>
                        <th>结账总额</th>
                        <th>消费人数</th>
                        <th>操作人</th>
                        <th>批准人</th>
                        <th>退菜时间</th>
                        <th>点菜时间</th>
                    </tr>
                    <!--  -->
                    <tr v-for="(v,k) in data_list" :key="k">
                        <td>{{k+1}}</td>
                        <td>{{v.name}}</td>
                        <td>{{v.why}}</td>
                        <td>{{v.code}}</td>
                        <td>{{v.Seat}}</td>
                        <td>{{v.money}}</td>
                        <td>{{v.moneyNum}}</td>
                        <td>{{v.refundNum}}</td>   
                        <td>{{v.operation}}</td>
                        <td>{{v.approval}}</td>
                        <td>{{v.refundTime}}</td>
                        <td>{{v.pointTime}}</td>
                    </tr>
                    <!-- 无数据显示 -->
                    <tr v-if="data_list.length<=0">
                        <td colspan="15">
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
    </div>
</template>

<script>
    export default {
        data(){
            return {
                orderCenter:[
                    {name:'增菜数量',value:'100'},
                    {name:'增菜金额',value:'100'}
                ],//中间显示数据
                pageIndex:1,//当前页数
                pageSize:10,//每页显示条数
                data_list:[
                    {   name:'安少爷米线（商之都店）',why:'客户结账后退菜',code:'2333445534',Seat:'PSHJD2',
                        money:23,moneyNum:233,refundNum:1,operation:'马路牙子',approval:'大哥',refundTime:'2018-8-10 23:22:12',
                        pointTime:'2018-12-23 11:12:45'
                    },
                    {   name:'安少爷米线（商之都店）',why:'客户结账后退菜',code:'2333445534',Seat:'PSHJD2',
                        money:23,moneyNum:233,refundNum:1,operation:'马路牙子',approval:'大哥',refundTime:'2018-8-10 23:22:12',
                        pointTime:'2018-12-23 11:12:45'
                    },
                    {   name:'安少爷米线（商之都店）',why:'客户结账后退菜',code:'2333445534',Seat:'PSHJD2',
                        money:23,moneyNum:233,refundNum:1,operation:'马路牙子',approval:'大哥',refundTime:'2018-8-10 23:22:12',
                        pointTime:'2018-12-23 11:12:45'
                    },
                    {   name:'安少爷米线（商之都店）',why:'客户结账后退菜',code:'2333445534',Seat:'PSHJD2',
                        money:23,moneyNum:233,refundNum:1,operation:'马路牙子',approval:'大哥',refundTime:'2018-8-10 23:22:12',
                        pointTime:'2018-12-23 11:12:45'
                    },
                    {   name:'安少爷米线（商之都店）',why:'客户结账后退菜',code:'2333445534',Seat:'PSHJD2',
                        money:23,moneyNum:233,refundNum:1,operation:'马路牙子',approval:'大哥',refundTime:'2018-8-10 23:22:12',
                        pointTime:'2018-12-23 11:12:45'
                    },
                    {   name:'安少爷米线（商之都店）',why:'客户结账后退菜',code:'2333445534',Seat:'PSHJD2',
                        money:23,moneyNum:233,refundNum:1,operation:'马路牙子',approval:'大哥',refundTime:'2018-8-10 23:22:12',
                        pointTime:'2018-12-23 11:12:45'
                    },
                    {   name:'安少爷米线（商之都店）',why:'客户结账后退菜',code:'2333445534',Seat:'PSHJD2',
                        money:23,moneyNum:233,refundNum:1,operation:'马路牙子',approval:'大哥',refundTime:'2018-8-10 23:22:12',
                        pointTime:'2018-12-23 11:12:45'
                    },
                    {   name:'安少爷米线（商之都店）',why:'客户结账后退菜',code:'2333445534',Seat:'PSHJD2',
                        money:23,moneyNum:233,refundNum:1,operation:'马路牙子',approval:'大哥',refundTime:'2018-8-10 23:22:12',
                        pointTime:'2018-12-23 11:12:45'
                    },
                    {   name:'安少爷米线（商之都店）',why:'客户结账后退菜',code:'2333445534',Seat:'PSHJD2',
                        money:23,moneyNum:233,refundNum:1,operation:'马路牙子',approval:'大哥',refundTime:'2018-8-10 23:22:12',
                        pointTime:'2018-12-23 11:12:45'
                    },
                    {   name:'安少爷米线（商之都店）',why:'客户结账后退菜',code:'2333445534',Seat:'PSHJD2',
                        money:23,moneyNum:233,refundNum:1,operation:'马路牙子',approval:'大哥',refundTime:'2018-8-10 23:22:12',
                        pointTime:'2018-12-23 11:12:45'
                    },
                ],
            }
        },
        created(){
            console.log('增菜订单')
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
                        const tHeader = ['机构名称','退菜原因','账单编号','桌位名称','增菜金额','结账总额','消费人数','金额','操作人','批准人','退菜时间','点菜时间'];
                        const filterVal = ['name', 'why', 'code', 'Seat','money','moneyNum','refundNum','operation','approval','refundTime','pointTime'];
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
            }
        }
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
        width:auto;
    }
    .table_list_box tr td{
        padding: 10px 5px;
    }
</style>