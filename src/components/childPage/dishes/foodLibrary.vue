<!-- 菜品库 -->
<template>
    <div class="postPre">
        <div class="commonHeader_style commonHeader">
            <el-tabs v-model="activeName" @tab-click="handleClick($event,activeName)">
                <el-tab-pane label="菜品管理" name="1"></el-tab-pane>
                <el-tab-pane label="规格管理" name="2"></el-tab-pane>
                <el-tab-pane label="做法管理" name="3"></el-tab-pane>
                <el-tab-pane label="加料管理" name="4"></el-tab-pane>
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
        //     sessionStorage.removeItem('foot_select')
        // },
        created(){
            console.log('菜品库')
            // 默认进入菜品库管理页面
            var ses_tab=sessionStorage.foot_select
            if(ses_tab==undefined){
                this.activeName='1'
                this.$router.push('/HomePage/foodLibrary/Food_MGM')
            }else{
                this.activeName=ses_tab;
                this.coomskip(ses_tab)
            }
        },
        methods:{
            coomskip(k){
                if(k=='1'){
                    // 菜品管理页面
                    this.$router.push('/HomePage/foodLibrary/Food_MGM')
                }else if(k=='2'){
                    // 规格管理页面
                    this.$router.push('/HomePage/foodLibrary/Specification_MGM')
                }else if(k=='3'){
                    // 做法管理理页面
                    this.$router.push('/HomePage/foodLibrary/practice_MGM')
                }else{
                    // 加料模板页面
                    this.$router.push('/HomePage/foodLibrary/charging_MGM')
                }
            },
            // 标签页点击事件
            handleClick(data,k){
                this.coomskip(k)
                // 保存tab标签 选中状态
                sessionStorage.foot_select=k;
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