<!-- 原材料调价管理 -->
<template>
    <div class="postPre">
        <div class="commonHeader_style  commonHeader">
            <el-tabs v-model="activeName"  @tab-click="handleClick($event,activeName)">
                <el-tab-pane label="已审核" name="1"></el-tab-pane>
                <el-tab-pane label="待审核" name="2"></el-tab-pane>
                <el-tab-pane label="未提交" name="3"></el-tab-pane>
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
                    //已审核
                    this.$router.push('/HomePage/MaterialPric/done')
                }else if(k=='2'){
                    // 待审核
                    this.$router.push('/HomePage/MaterialPric/audit')
                }else{
                    //未提交
                    this.$router.push('/HomePage/MaterialPric/undone')
                }
            },
        },
        created(){
            // 默认进入物品列表
            var ses_tab=sessionStorage.tabs_select;
            // console.log(ses_tab)
            if(ses_tab==undefined){
                this.activeName='1';
                this.$router.push('/HomePage/MaterialPric/done');
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