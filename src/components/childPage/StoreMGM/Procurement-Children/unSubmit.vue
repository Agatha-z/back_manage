<!-- 未提交 -->
<template>
    <div>
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
                    <th>采购金额</th>
                    <th>操作时间</th>
                    <th>操作</th>
                </tr>
                <tr v-for="(v,k) in data_list" :key="k">
                </tr>
                <!-- 无数据显示 -->
                <tr v-if="data_list.length<=0">
                    <td colspan="9">
                        <p style="color:#999">暂无更多数据</p>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import procurementTop from '@/components/childPage/StoreMGM/Procurement-Children/common/procurementTop.vue';//引入门店采购订单公用头部
    export default {
        data(){
            return{
                data_list:[ //渲染数据
                    
                ],
            }
        },
        methods:{
            
        },
        created(){
            console.log('门店直配')
        },
        components:{
            procurementTop
        }
    }
</script>

<style scoped>
</style>