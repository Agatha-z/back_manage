<!-- 门店报表 -->
<template>
    <div class="postPre">
        <div class="commonHeader_style commonHeader">
            <el-tabs v-model="activeName" @tab-click="handleClick($event,activeName)">
                <el-tab-pane label="库存查询" name="1"></el-tab-pane>
                <el-tab-pane label="进销存汇总" name="2"></el-tab-pane>
                <el-tab-pane label="进销存明细" name="3"></el-tab-pane>
                <el-tab-pane label="盘点盈亏表" name="4"></el-tab-pane>
                <el-tab-pane label="盘存明细表" name="5"></el-tab-pane>
                <el-tab-pane label="供应商统计表" name="6"></el-tab-pane>
                <el-tab-pane label="采购订单差异表" name="7"></el-tab-pane>
                <el-tab-pane label="采购物品差异表" name="8"></el-tab-pane>
                <el-tab-pane label="调拨单差异表" name="9"></el-tab-pane>
                <el-tab-pane label="调拨物品差异表" name="10"></el-tab-pane>
            </el-tabs>
        </div>
        <div  style="margin-top:5px;padding:20px 0px;background:#fff;">
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
        methods:{
            coomskip(k){
                if(k=='1'){
                    // 库存查询
                    this.$router.push('/HomePage/theReport/goodsBatch')
                }else if(k=='2'){
                    // 进销存汇总
                    this.$router.push('/HomePage/theReport/inoutAmount')
                }else if(k=='3'){
                    // 进销存明细
                    this.$router.push('/HomePage/theReport/inoutAmountDetail')
                }else if(k=='4'){
                    // 盘点盈亏表
                    this.$router.push('/HomePage/theReport/profitLoss')
                }else if(k=='5'){
                    // 盘点明细表
                    this.$router.push('/HomePage/theReport/stocktaking')
                }else if(k=='6'){
                    // 供应商统计表
                    this.$router.push('/HomePage/theReport/supplier')
                }else if(k=='7'){
                    // 采购订单差异表
                    this.$router.push('/HomePage/theReport/orderDifference')
                }else if(k=='8'){
                    // 采购物品差异表
                    this.$router.push('/HomePage/theReport/procurement')
                }else if(k=='9'){
                    // 调拨单差异表
                    this.$router.push('/HomePage/theReport/transferDiffence')
                }else{
                    // 调拨物品差异表
                    this.$router.push('/HomePage/theReport/transferGoodsDiffence')
                }
            },
            // 标签页点击事件
            handleClick(data,k){
                this.coomskip(k)
                // 保存tab标签 选中状态
                sessionStorage.tabs_select=k;
            }
        },
        created(){
            // console.log('门店报表统计')
            // 默认进入库存查询页面
            var ses_tab=sessionStorage.tabs_select;
            // console.log(ses_tab)
            if(ses_tab==undefined){
                this.activeName='1';
                 this.$router.push('/HomePage/theReport/goodsBatch');
            }else{
                this.activeName=ses_tab;
                this.coomskip(ses_tab)
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