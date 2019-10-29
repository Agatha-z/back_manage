<!-- 订单管理 -->
<template>
    <div class="postPre">
        <div class="commonHeader_style commonHeader">
            <el-tabs v-model="activeName"  @tab-click="handleClick($event,activeName)">
                <el-tab-pane label="订单列表" name="1"></el-tab-pane>
                <el-tab-pane label="未提交" name="2"></el-tab-pane>
                <el-tab-pane label="待审核" name="3"></el-tab-pane>
                <el-tab-pane label="待收货" name="4"></el-tab-pane>
                <el-tab-pane label="已完成" name="5"></el-tab-pane>
            </el-tabs>
        </div>
        <div class="commonHeader_style">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                activeName: '1'
            }
        },
        methods:{
            // 标签页点击事件
            handleClick(data,k){
                this.coomskip(k);
                // 保存tab标签 选中状态
                sessionStorage.tabs_select=k;
            },
            coomskip(k){
                if(k=='1'){
                    //订单列表
                    this.$router.push('/HomePage/orderMGM/orderlist')
                }else if(k=='2'){
                    // 未提交
                    this.$router.push('/HomePage/orderMGM/undone')
                }else if(k=='3'){
                    // 待审核
                    this.$router.push('/HomePage/orderMGM/audit')
                }else if(k=='4'){ 
                    // 待收货
                    this.$router.push('/HomePage/orderMGM/pending')
                }else{
                    //已完成
                    this.$router.push('/HomePage/orderMGM/done')
                }
            },
        },
        created(){
            // console.log('订单列表')
            // 默认进入订单列表
            var ses_tab=sessionStorage.tabs_select;
            console.log(ses_tab)
            if(ses_tab==undefined){
                this.activeName='1';
                this.$router.push('/HomePage/orderMGM/orderlist')
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
    .commonHeader{
        padding-bottom: 0;
        margin-bottom:5px;
    }
</style>