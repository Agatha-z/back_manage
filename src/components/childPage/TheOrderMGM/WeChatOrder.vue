<!-- 微信点单 -->
<template>
    <div class="postPre">
        <!-- 引用公共头部 -->
        <orderComHead
        :inputsList="[]"
        @submitSeach="submitSeach"></orderComHead>
        <br>
        <orderCenter
        :data_list="orderCenter">
        </orderCenter>
        <br>
        <!--  -->
        <div class="commonHeader_style">
            <span>做法：</span>
            <el-select size="medium" v-model="platform" placeholder="请选择"> 
                <el-option  label="红烧" :value="0"></el-option>
                <el-option  label="油炸" :value="1"></el-option>
                <el-option  label="清蒸" :value="2"></el-option>
                <el-option  label="涮着吃" :value="3"></el-option>
            </el-select> 
            &nbsp;&nbsp;&nbsp;
            <!--  -->
            <span>支付方式：</span>
            <el-select size="medium" v-model="state" placeholder="请选择">
                <el-option  label="微信" :value="0"></el-option>
                <el-option  label="支付宝" :value="1"></el-option>
                <el-option  label="现金" :value="2"></el-option>
                <el-option  label="信用卡" :value="3"></el-option>
                <el-option  label="银联卡" :value="4"></el-option>
            </el-select>
            &nbsp;&nbsp;&nbsp;
            <!--  -->
            <el-button type="primary" size="medium" @click="ExportData">批量导出<i class="el-icon-printer el-icon--right"></i></el-button> 
            <br>
            <br>
            <!-- 数据显示 --> 
            <div class="tabel_list_body">
                <table class="table_list table_list_box" border="0" cellspacing="0">
                    <tr>
                        <th></th>
                        <th>机构名称</th>
                        <th>订单编号</th>
                        <th>桌位号</th>
                        <th>菜品分类</th>
                        <th>菜品名称</th>
                        <th>规格</th>
                        <th>做法</th>
                        <th>点菜数量</th>
                        <th>金额</th> 
                        <th>操作人</th>
                        <th>支付方式</th>
                        <th>点菜时间</th> 
                    </tr>
                    <!--  -->
                    <tr v-for="(v,k) in data_list" :key="k">
                        <td>{{k+1}}</td>
                        <td>{{v.name}}</td>
                        <td>{{v.code}}</td>
                        <td>{{v.A_table}}</td>
                        <td>{{v.class}}</td>
                        <td>{{v.foodName}}</td>
                        <td>{{v.specifications}}</td>
                        <td>{{v.practice}}</td>   
                        <td>{{v.foodNum}}</td>
                        <td>{{v.money}}</td>
                        <td>{{v.user}}</td>
                        <td>{{v.payType}}</td>
                        <td>{{v.startTime}}</td>
                    </tr>
                    <!-- 无数据显示 -->
                    <tr v-if="data_list.length<=0">
                        <td colspan="13">
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
                platform:'',//选择平台绑定数据，
                state:'',//选择状态绑定数据
                orderCenter:[ 
                    {name:'订单金额',value:'100'},
                    {name:'订单数量',value:'100'},
                ],//中间显示数据
                pageIndex:1,//当前页数
                pageSize:10,//每页显示条数
                data_list:[
                    {   name:'安少爷米线（天庭店）',code:'201938382828',A_table:'GFDR445',class:'啤酒',foodName:'米线',
                        specifications:'标准',practice:'泡着吃',foodNum:3,money:33,user:'马可波罗',payType:'现金支付',
                        startTime:'2018-2-23 19:00:00'
                    },
                    {   name:'安少爷米线（天庭店）',code:'201938382828',A_table:'GFDR445',class:'啤酒',foodName:'米线',
                        specifications:'标准',practice:'泡着吃',foodNum:3,money:33,user:'马可波罗',payType:'现金支付',
                        startTime:'2018-2-23 19:00:00'
                    },
                    {   name:'安少爷米线（天庭店）',code:'201938382828',A_table:'GFDR445',class:'啤酒',foodName:'米线',
                        specifications:'标准',practice:'泡着吃',foodNum:3,money:33,user:'马可波罗',payType:'现金支付',
                        startTime:'2018-2-23 19:00:00'
                    },
                    {   name:'安少爷米线（天庭店）',code:'201938382828',A_table:'GFDR445',class:'啤酒',foodName:'米线',
                        specifications:'标准',practice:'泡着吃',foodNum:3,money:33,user:'马可波罗',payType:'现金支付',
                        startTime:'2018-2-23 19:00:00'
                    },
                    {   name:'安少爷米线（天庭店）',code:'201938382828',A_table:'GFDR445',class:'啤酒',foodName:'米线',
                        specifications:'标准',practice:'泡着吃',foodNum:3,money:33,user:'马可波罗',payType:'现金支付',
                        startTime:'2018-2-23 19:00:00'
                    },
                    {   name:'安少爷米线（天庭店）',code:'201938382828',A_table:'GFDR445',class:'啤酒',foodName:'米线',
                        specifications:'标准',practice:'泡着吃',foodNum:3,money:33,user:'马可波罗',payType:'现金支付',
                        startTime:'2018-2-23 19:00:00'
                    },
                    {   name:'安少爷米线（天庭店）',code:'201938382828',A_table:'GFDR445',class:'啤酒',foodName:'米线',
                        specifications:'标准',practice:'泡着吃',foodNum:3,money:33,user:'马可波罗',payType:'现金支付',
                        startTime:'2018-2-23 19:00:00'
                    },
                    {   name:'安少爷米线（天庭店）',code:'201938382828',A_table:'GFDR445',class:'啤酒',foodName:'米线',
                        specifications:'标准',practice:'泡着吃',foodNum:3,money:33,user:'马可波罗',payType:'现金支付',
                        startTime:'2018-2-23 19:00:00'
                    },
                    {   name:'安少爷米线（天庭店）',code:'201938382828',A_table:'GFDR445',class:'啤酒',foodName:'米线',
                        specifications:'标准',practice:'泡着吃',foodNum:3,money:33,user:'马可波罗',payType:'现金支付',
                        startTime:'2018-2-23 19:00:00'
                    },
                    {   name:'安少爷米线（天庭店）',code:'201938382828',A_table:'GFDR445',class:'啤酒',foodName:'米线',
                        specifications:'标准',practice:'泡着吃',foodNum:3,money:33,user:'马可波罗',payType:'现金支付',
                        startTime:'2018-2-23 19:00:00'
                    },
                ],
            }
        },
        created(){
            console.log('微信点单')
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
                    // 组织
                    return 
                    //excel数据导出
                    require.ensure([], () => {
                        const {
                            export_json_to_excel 
                        } = require('../../../vendor/Export2Excel');
                        const tHeader = ['机构名称','折扣原因','账单编号','桌位名称','应收金额','实收金额','折扣金额','全单折','方案折','菜品折','操作人','点菜时间'];
                        const filterVal = ['name', 'platform', 'code', 'class','foodName','TheRider','discountMoney','allOrder','plan','dishes','user','pointTime'];
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
    .table_list_box tr td{
        padding: 10px 5px;
    }
</style>