<!-- 门店采购 -->
<template>
   <div class="postPre">
        <div class="commonHeader_style commonHeader">
            <el-tabs v-model="activeName"  @tab-click="handleClick($event,activeName)">
                <el-tab-pane label="订单列表" name="1"></el-tab-pane>
                <el-tab-pane label="未提交" name="2"></el-tab-pane>
                <el-tab-pane label="待审核" name="3"></el-tab-pane>
                <el-tab-pane label="待发货" name="4"></el-tab-pane>
                <el-tab-pane label="已发货" name="5"></el-tab-pane>
                <el-tab-pane label="已完成" name="6"></el-tab-pane>
            </el-tabs>
        </div>
        <div class="commonHeader_style" style="margin-top:5px;">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                activeName:'1',
            }
        },
        methods: {
            handleClick(data,k){
                this.coomskip(k);
                // 保存tab标签 选中状态
                sessionStorage.tabs_select=k;
            },
            coomskip(k){
                if(k=='1'){
                    //订单列表
                    this.$router.push('/HomePage/procurement/order')
                }else if(k=='2'){
                    //未提交
                    this.$router.push('/HomePage/procurement/unSubmi')
                }else if(k=='3'){
                    //待审核
                    this.$router.push('/HomePage/procurement/audit')
                }else if(k=='4'){ 
                    //待发货
                    this.$router.push('/HomePage/procurement/undeliver')
                }else if(k=='5'){
                    //已发货
                    this.$router.push('/HomePage/procurement/deliver')
                }else{
                    //已完成
                    this.$router.push('/HomePage/procurement/done')
                }
            },
        },
        created(){
            // 默认进入订单列表
            var ses_tab=sessionStorage.tabs_select;
            console.log(ses_tab)
            if(ses_tab==undefined){
                this.activeName='1'
                this.$router.push('/HomePage/procurement/order');
            }else{
                this.activeName=ses_tab;
                this.coomskip(ses_tab);
            }
        }
    }
</script>

<style scoped>
    .postPre{
        padding:10px;
    }
</style>