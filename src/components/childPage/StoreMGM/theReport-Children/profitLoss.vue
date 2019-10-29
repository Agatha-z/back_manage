<!-- 盘点盈亏 -->
<template>
    <div style="padding:10px; overflow: hidden;">
        <!--头部搜索功能-->
        <navsHead></navsHead>
        <!--数据-->
        <div class="table_Parcel">
            <div class="table_Content">
                <table  border="0" cellspacing="0" class="table_list">
                    <tr>
                        <th rowspan="2"></th>
                        <th rowspan="2" style="width: 200px;">门店</th>
                        <th rowspan="2" class="ui-jqgrid-sortable">仓库</th>
                        <th rowspan="2" class="ui-jqgrid-sortable">物品类别</th>	
                        <th rowspan="2" class="ui-jqgrid-sortable">物品名称</th>	
                        <th rowspan="2" class="ui-jqgrid-sortable">库存单位</th>
                        <th rowspan="2" style="width: 200px;">盘点日期</th>	
                        <th rowspan="2" class="jqgh_grid-table_theoryQty">标准用量</th>	
                        <th rowspan="2" class="jqgh_grid-table_theoryQty">标准成本</th>
                        <th rowspan="2" class="jqgh_grid-table_theoryQty">实际用量</th>	
                        <th rowspan="2" class="jqgh_grid-table_theoryQty">实际成本</th>
                        <th colspan="2" style="width:150px">盘盈</th>
                       	<th colspan="2" style="width:150px">盘亏</th>
                        <th rowspan="2" >详情</th>
                    </tr>
                    <tr class="rowTh">
                        <th>数量</th>
                        <th>金额(元)</th>
                        <th>数量</th>
                        <th>金额(元)</th>
                    </tr>
                </table>
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
    .table_Content table th{
        border-top:1px solid #ccc;
        border-right:1px solid #ccc;
    }
    .table_Content table .rowTh th{
        width:100px;
    }
    .ui-jqgrid-sortable{
        width:160px;
    }
    .jqgh_grid-table_theoryQty{
        width:180px;
    }
</style>