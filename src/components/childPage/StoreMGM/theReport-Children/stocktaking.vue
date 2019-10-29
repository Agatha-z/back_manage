<!-- 盘点明细表 -->
<template>
    <div>
        <!--头部搜索功能-->
        <navsHead></navsHead>
        <!--数据-->
        <div>
            <table border="0" cellspacing="0" class="table_list">
                <tr>
                    <th></th>
                    <th>门店</th>	
                    <th>仓库</th>	
                    <th>物品类别</th>	
                    <th>物品编码</th>	
                    <th>物品名称</th>	
                    <th>规格型号</th>	
                    <th>单价</th>	
                    <th>库存单位</th>	
                    <th>盘点日期</th>	
                    <th>理论数</th>	
                    <th>实盘数</th>	
                    <th>差异数量</th>	
                    <th>差异金额</th>
                </tr>
            </table>
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
        }
    }
</script>

<style scoped>
  
</style>