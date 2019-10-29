<!-- 待发货 -->
<template>
     <div>
        <transition name="animateCheckDetail">
<!-- ========================================================================================主页面-->
            <div v-if="orderShow" key="save">
                <!--头部搜索-->
                <procurementTop></procurementTop>
                <!-- 数据 -->
                <div style="margin-top:20px;">
                    <table class="table_list" border="0" cellspacing="0">
                        <tr>
                            <th></th>
                            <th>单据号</th>
                            <th>订单类型</th>
                            <th>采购门店</th>
                            <th>供应商名称</th>
                            <th>采购日期</th>
                            <th>审核日期</th>
                            <th>采购金额</th>
                            <th>操作时间</th>
                            <th>操作</th>
                        </tr>
                        <tr v-for="(v,k) in data_list" :key="k">
                            <td>{{k+1}}</td>
                            <td>{{v.s_name}}</td>
                            <td>{{v.brand}}</td>
                            <td>{{v.areaName}}</td>
                            <td>{{v.attribute}}</td>
                            <td>{{v.formats}}</td>
                            <td>{{v.user}}</td>
                            <td>{{v.time}}</td>
                            <td>{{v.time1}}</td>
                            <td>
                                <el-button type="primary" size="small" icon="el-icon-search"  @click="operation(1,k,v)">查看</el-button>
                                <el-button type="primary" size="small" icon="el-icon-goods" @click="operation(2,k,v)" v-show="true">发货</el-button>
                            </td>
                        </tr>
                        <!-- 无数据显示 -->
                        <tr v-if="data_list.length<=0">
                            <td colspan="10">
                                <p style="color:#999">暂无更多数据</p>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
<!-- =============================================================查看详情或者审核页面-->
            <div v-else>
                <!--头部搜索栏-->
                <checkTop :supplierName="supplierName" :purchaseShop="purchaseShop" :isdeliver="isdeliver"></checkTop>
                <!--表格数据展示 -->
                <checkDetail @fromchild="fromchild"  :isCheckDetail="isCheckDetail" :isAudit="isAudit" :buttondeliver="buttondeliver"></checkDetail>
            </div>
        </transition>
    </div>
</template>

<script>
import procurementTop from '@/components/childPage/StoreMGM/Procurement-Children/common/procurementTop.vue';//引入门店采购订单公用头部
import checkTop from '@/components/childPage/StoreMGM/Procurement-Children/common/checkTop.vue';//引入查看详情页以及审核页头部搜索组件
import checkDetail from '@/components/childPage/StoreMGM/Procurement-Children/common/checkDetail.vue';//引入查看详情页以及审核页表格数据组件
    export default {
        data(){
            return{
                orderShow:true, //主页面状态
                supplierName:"",//供应商名称给子组件传值
                purchaseShop:'',//采购门店给子组件传值
                isdeliver:true,//点击发货时给子组件搜索头部传的值
                buttondeliver:false,//点击发货确认收货按钮显示与否
                data_list:[ //渲染数据
                    {s_name:'18121415450025',brand:'自采',attribute:'安少爷米线（瑶海万达店）',areaName:'总部配送中心',formats:'2018-12-20',user:'3364.50',time:'2018-12-20 11:16:32',time1:'2018-10-07 08:23:32'},
                ],
            }
        },
        methods:{
            //点击查看或者审核
            operation(data,k,v){
                if(data=='1'){
                    // 点击查看
                    this.supplierName=this.data_list[k].attribute;//供应商给子组件传值
                    this.purchaseShop=this.data_list[k].areaName;//采购门店给子组件传值
                    this.isdeliver=true;//点击发货时给子组件头部搜索传的值
                    this.isCheckDetail=true;//打印按钮显示
                    this.isAudit=false;//审核通过与驳回按钮隐藏
                    this.buttondeliver=false;//确认收货按钮隐藏
                    this.orderShow=false;//查看内容显示
                }else{
                    //点击发货
                    this.supplierName=this.data_list[k].attribute;//供应商给子组件传值
                    this.purchaseShop=this.data_list[k].areaName;//采购门店给子组件传值
                    this.isdeliver=false;//点击发货时给子组件头部搜索传的值
                    this.isCheckDetail=false;//打印按钮隐藏
                    this.isAudit=false;//审核通过与驳回按钮隐藏
                    this.buttondeliver=true;//确认收货按钮显示
                    this.orderShow=false;//审核内容显示
                }
            },
            // 接受来自子组件的事件
            fromchild(){
            this.orderShow=true;
            }
        },
        created(){
            console.log('门店直配')
        },
        components:{
            procurementTop,
            checkDetail,
            checkTop,
        }
    }
</script>

<style scoped>
    .postPre{
        padding:10px;
    }
</style>