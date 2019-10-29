<!-- 已审核-->
<template>
    <div class="postPre">
        <transition name="animateCheckDetail">
            <!-- 主页面 -->
            <div v-if="show" key="main">
                <!--头部搜索-->
                <seaechTop></seaechTop>
                <!--新增调价单-->
                <div style="margin-top:20px;">
                    <el-button type="primary"  style="margin-top:10px;" @click="addGoods">新增调价单<i class="el-icon-plus el-icon-plus-right"></i></el-button>
                </div>
                <!-- 表格数据 -->
                <div style="margin-top:10px;">
                    <table class="table_list" border="0" cellspacing="0">
                        <tr>	
                            <th></th>
                            <th>门店名称</th>
                            <th>原材料类别</th>
                            <th>原材料名称</th>
                            <th>库存单价(元)</th>
                            <th>门店订货价格(元)</th>
                            <th>状态</th>
                            <th>保存时间</th>
                            <th>操作</th>
                        </tr>
                        <tr v-for="(v,k) in data_list" :key="k">
                            <td>{{k+1}}</td>
                            <td>{{v.s_name}}</td>
                            <td>{{v.brand}}</td>
                            <td>{{v.attribute}}</td>
                            <td>{{v.uniot}}</td>
                            <td>{{v.di}}</td>
                            <td>{{v.num}}</td>
                            <td>{{v.product}}</td>
                            <td>
                                <el-button type="primary" size="small" icon="el-icon-search" @click="operation">查看</el-button>
                            </td>
                        </tr>
                    </table>	
                </div>
            </div>
            <!--新增变价单页面-->
            <div  v-else-if="addNewPrice" key="newPrice">
                <newPriceList  @toParCancel='toParCancel'>></newPriceList>
            </div>
            <!-- 查看详情页面 -->	
            <checkDetail v-else  @detailFade="detailFade"></checkDetail>
        </transition>  
    </div>
</template>

<script>
import seaechTop    from '@/components/childPage/StoreMGM/common/dateSelection.vue';//引入头部搜索组件
import newPriceList from '@/components/childPage/StoreMGM/common/newPrice_list.vue';//引入新增变价单组件
import checkDetail  from '@/components/childPage/StoreMGM/common/checkDetail.vue';//引入查看详情组件
    export default {
        data(){
            return{
                show:true,//主页面
                addNewPrice:false,//新增订单
                data_list:[//表格数据渲染
                    {s_name:'安少爷米线（瑶海万达店）',brand:'低值易耗品',attribute:'米线打包盒大',uniot:'0.00',di:'108.00',num:'已审核',product:'2018-12-19  18:09:49',},
                    {s_name:'安少爷米线（瑶海万达店）',brand:'低值易耗品',attribute:'米线打包盒大',uniot:'0.00',di:'108.00',num:'已审核',product:'2018-12-19  18:09:49',},
                    {s_name:'安少爷米线（瑶海万达店）',brand:'低值易耗品',attribute:'米线打包盒大',uniot:'0.00',di:'108.00',num:'已审核',product:'2018-12-19  18:09:49',},
                    {s_name:'安少爷米线（瑶海万达店）',brand:'低值易耗品',attribute:'米线打包盒大',uniot:'0.00',di:'108.00',num:'已审核',product:'2018-12-19  18:09:49',},
                    {s_name:'安少爷米线（瑶海万达店）',brand:'低值易耗品',attribute:'米线打包盒大',uniot:'0.00',di:'108.00',num:'已审核',product:'2018-12-19  18:09:49',},
                    {s_name:'安少爷米线（瑶海万达店）',brand:'低值易耗品',attribute:'米线打包盒大',uniot:'0.00',di:'108.00',num:'已审核',product:'2018-12-19  18:09:49',},
                ],
            }
        },
        methods:{
            // 点击新增变价单
            addGoods(){
                this.show=false;
                this.addNewPrice=true;
            },
            // 新增订单子组件取消事件
            toParCancel(){
                this.show=true;
                this.addNewPrice=false;
            },
            // 点击查看详情
            operation(){
                this.show=false;
                this.addNewPrice=false;
            },
            // 查看详情页面取消事件
            detailFade(){
                this.toParCancel();
            }
        },
        created(){
            console.log('已审核')
        },
        components:{
            seaechTop,
            newPriceList,
            checkDetail
        }
    }
</script>

<style scoped>
    .postPre{
        padding:10px;
    }
</style>