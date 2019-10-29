<!-- 报表统计 -->
<template>
    <div class="postPre">
        <div class="commonHeader_style commonHeader">
            <el-tabs v-model="activeName"  @tab-click="handleClick($event,activeName)">
                <el-tab-pane label="库存查询" name="1"></el-tab-pane>
                <el-tab-pane label="进销存汇总" name="2"></el-tab-pane>
                <el-tab-pane label="进销存明细" name="3"></el-tab-pane>
                <el-tab-pane label="盘点盈亏表" name="4"></el-tab-pane>
                <el-tab-pane label="盘存明细表" name="5"></el-tab-pane>
                <el-tab-pane label="供应商统计表" name="6"></el-tab-pane>
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
                activeName: '1',
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
                    //库存查询
                    this.$router.push('/HomePage/Statistics/goodsBatch')
                }else if(k=='2'){
                    //进销存汇总
                    this.$router.push('/HomePage/Statistics/inoutAmount')
                }else if(k=='3'){
                    //进销存明细
                    this.$router.push('/HomePage/Statistics/inoutAmountDetail')
                }else if(k=='4'){ 
                    //盘点盈亏表
                    this.$router.push('/HomePage/Statistics/profitLoss')
                }else if(k=='5'){
                    //盘点明细表
                    this.$router.push('/HomePage/Statistics/stocktaking')
                }else{
                    //供应商统计表
                    this.$router.push('/HomePage/Statistics/supplier')
                }
            },
        },
        created(){
            // 默认进入库存查询
            var ses_tab=sessionStorage.tabs_select
            console.log(ses_tab)
            if(ses_tab==undefined){
                this.activeName='1'
                this.$router.push('/HomePage/Statistics/goodsBatch')
            }else{
                this.activeName=ses_tab;
                this.coomskip(ses_tab);
            };
        },
        components: {
        }
    }
</script>

<style scoped>
    .postPre{
        padding:10px;
    }
</style>