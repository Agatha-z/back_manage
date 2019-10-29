<!--未提交-->
<template>
    <div>
        <transition name="fade">>
            <div class="undone" v-if="show">
                <!--头部搜索-->
                <centerSearch :status="status"></centerSearch >
            </div>
            <!--查看内容详情-->
            <checkDetail @fromchild="fromchild" :status="status" v-else></checkDetail>
        </transition>
    </div>
</template>
<script>
import  centerSearch from '@/components/common/centerSearch.vue';//引入头部公共搜索组件
import  checkDetail  from '@/components/common/check.vue';//引入查看内容详情组件
export default {
    data(){
        return{
            show:true,//点击查看
            status:false,//向子组件传值
        }
    },
    methods:{

    },
    components:{
        checkDetail,
        centerSearch
    }
}
</script>
<style scoped>

</style>