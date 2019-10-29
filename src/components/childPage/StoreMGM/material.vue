<!-- 原材料管理 -->
<template>
    <div class="postPre">
        <div class="commonHeader_style  commonHeader">
            <el-tabs v-model="activeName"  @tab-click="handleClick($event,activeName)">
                <el-tab-pane label="物品列表" name="1"></el-tab-pane>
                <el-tab-pane label="物品类别" name="2"></el-tab-pane>
                <el-tab-pane label="单位管理" name="3"></el-tab-pane>
                <el-tab-pane label="价格协议" name="4"></el-tab-pane>
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
                    //物品列表
                    this.$router.push('/HomePage/material/goodsList')
                }else if(k=='2'){
                    // 物品类别
                    this.$router.push('/HomePage/material/category')
                }else if(k=='3'){
                    //单位管理
                    this.$router.push('/HomePage/material/unit')
                }else{ 
                    //价格协议
                    this.$router.push('/HomePage/material/priceAgreement')
                }
            },
        },
        created(){
            // 默认进入物品列表
            var ses_tab=sessionStorage.tabs_select
            // console.log(ses_tab)
            if(ses_tab==undefined){
                this.activeName='1'
                this.$router.push('/HomePage/material/goodsList')
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