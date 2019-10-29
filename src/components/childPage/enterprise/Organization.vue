<!-- 机构管理 -->
<template>
    <div class="postPre">
        <div class="commonHeader_style commonHeader">
            <el-tabs v-model="activeName" @tab-click="handleClick($event,activeName)">
                <el-tab-pane label="品牌管理" name="1"></el-tab-pane>
                <el-tab-pane label="区域管理" name="2"></el-tab-pane>
                <el-tab-pane label="门店管理" name="3"></el-tab-pane>
                <el-tab-pane label="权限模板" name="4"></el-tab-pane>
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
            return {
                activeName:'1'
            }
        },
        // destroyed(){
        //     // 卸载组件时 清除保存状态
        //     sessionStorage.removeItem('tabs_select')
        // },
        created(){
            console.log('机构管理')
            // 默认进入品牌管理页面
            var ses_tab=sessionStorage.tabs_select
            if(ses_tab==undefined){
                this.activeName='1'
                this.$router.push('/HomePage/Organization/brand_c')
            }else{
                this.activeName=ses_tab;
                this.coomskip(ses_tab)
            }
        },
        methods:{
            coomskip(k){
                if(k=='1'){
                    // 品牌管理页面
                    this.$router.push('/HomePage/Organization/brand_c')
                }else if(k=='2'){
                    // 区域管理页面
                    this.$router.push('/HomePage/Organization/area_c')
                }else if(k=='3'){
                    // 门店管理页面
                    this.$router.push('/HomePage/Organization/store_c')
                }else{
                    // 权限模板页面
                    this.$router.push('/HomePage/Organization/permissions_c')
                }
            },
            // 标签页点击事件
            handleClick(data,k){
                this.coomskip(k)
                // 保存tab标签 选中状态
                sessionStorage.tabs_select=k;
            }
        },
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