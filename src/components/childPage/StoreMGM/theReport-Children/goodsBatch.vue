<!-- 库存查询 -->
<template>
    <div style="padding:10px;">
       <!--头部搜索功能-->
       <navsHead :show="warnState"></navsHead>
       <!--数据-->
       <div>
            <table class="table_list" border="0" cellspacing="0">
                <tr>
                    <th></th>
                    <th>门店</th>
                    <th>仓库</th>
                    <th>物品类型</th>
                    <th>物品编码</th>
                    <th>物品名称</th>
                    <th>规格型号</th>
                    <th>库存单位</th>
                    <th>实时库存</th>
                    <th>库存预警</th>
                    <th>库存金额</th>
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
                warnState:true,//头部预警状态显示
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

</style>