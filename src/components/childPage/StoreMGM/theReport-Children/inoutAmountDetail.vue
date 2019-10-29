<!-- 盘点盈亏 -->
<template>
    <div style="padding:10px; overflow: hidden;">
        <!--头部搜索功能-->
        <navsHead></navsHead>
        <!--数据-->
        <div class="table_Parcel">
            <div class="table_Content">
                <table  cellspacing="0">
                    <tr>
                        <th  class="ui-state-default"></th>
                        <th  colspan="5" class=" ui-th-column-header"></th>
                        <th  class=" ui-th-column-header"></th>
                        <th  class=" ui-th-column-header"></th>
                        <th  colspan="2" class=" ui-th-column-header">期初</th>
                        <th  colspan="2" class=" ui-th-column-header">采纳入库</th>
                        <th  colspan="2" class=" ui-th-column-header">其他入库</th>
                        <th  colspan="2" class=" ui-th-column-header">退货出库</th>
                        <th  colspan="2" class=" ui-th-column-header">其他出库</th>
                        <th  colspan="2" class=" ui-th-column-header">销售出库</th>
                        <th  colspan="2" class=" ui-th-column-header">调入</th>
                        <th  colspan="2" class=" ui-th-column-header">调出</th>
                        <th  colspan="2" class=" ui-th-column-header">跨店调入</th>
                        <th  colspan="2" class=" ui-th-column-header">跨店调出</th>
                        <th  colspan="2" class=" ui-th-column-header">盘盈/盘亏</th>
                        <th  colspan="2" class=" ui-th-column-header">结存</th>
                    </tr>
                    <tr>
                        <th></th>
                        <th>门店</th>
                        <th>仓库</th>
                        <th>物品类别</th>
                        <th>物品编码</th>
                        <th>物品名称</th>
                        <th>规格型号</th>
                        <th>库存单位</th>
                        <th>数量</th>
                        <th>金额</th>
                        <th>数量</th>
                        <th>金额</th>
                        <th>数量</th>
                        <th>金额</th>
                        <th>数量</th>
                        <th>金额</th>
                        <th>数量</th>
                        <th>金额</th>
                        <th>数量</th>
                        <th>金额</th>
                        <th>数量</th>
                        <th>金额</th>
                        <th>数量</th>
                        <th>金额</th>
                        <th>数量</th>
                        <th>金额</th>
                        <th>数量</th>
                        <th>金额</th>
                        <th>数量</th>
                        <th>金额</th>
                        <th>数量</th>
                        <th>金额</th>
                    </tr>
                </table>
                <div class="ui-jqgrid-bdiv" style="width:1660px;height:30px;"></div>
            </div>
       </div>
       
    </div>
</template>

<script>
import navsHead from '@/components/childPage/StoreMGM/theReport-Children/common/commonHead.vue';//引入门店报表统计头部搜索组件
    export default {
        data(){
            return{
            }
        },
        created(){
            console.log('门店供应商')
        },
        components:{
            navsHead 
        },
    }
</script>

<style scoped>
    .postPre{
        padding:10px;
    }
    .table_Parcel{
        width: 1660px;
        overflow: hidden;
        color: #222222;
    }
    .table_Content{
        overflow-x:auto;
        width:100%;
    }
    table{
       width:3150px;
    }
    table th{
        height:40px;
        border: 1px solid #e1e1e1!important;
    }
    table td{
        border: 1px solid #e1e1e1!important;
    }
</style>