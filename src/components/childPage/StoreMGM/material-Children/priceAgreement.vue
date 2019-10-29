<!-- 原材料管理/价格协议-->
<template>
    <div class="postPre">
        <transition name="animateCheckDetail">
<!-- ===============================================================================================主页 -->
            <div v-if="show" key="main">
                <!--头部搜索-->
                <div class="searchTop">
                    <div class="topWrap">
                        <div class="item">
                            <div class="floatLeft">
                                <span style="font-size:18px;font-weight:600;">查看方式:</span>
                            </div>
                            <el-select style="width:347.34px;margin-right:60px;"  v-model="name_in" placeholder="请选择" class="floatLeft">
                                <el-option label="按门店" :value="1"></el-option>
                                <el-option label="按物品" :value="2"></el-option>
                            </el-select>
                            <!--组件-->
                            <div class="floatLeft">
                                <span style="font-size:18px;font-weight:600;float: left;">门店</span>
                            </div>
                            <div class="floatLeft">
                                <storeSelect :storeSelectData='storeSelectData' :inputWidth="290" :placeholder="['请选择门店','已选择门店点击下拉按钮查看']"></storeSelect>   
                            </div>
                        </div>
                    </div>
                    <div class="topWrap">
                        <div class="item">
                            <div class="floatLeft">
                                <span style="font-size:18px;font-weight:600;">物品名称:</span>
                            </div>
                            <!--组件-->
                            <div class="floatLeft" style="margin-right:60px;">
                                <storeSelect :storeSelectData='storeSelectData' :inputWidth="290" :placeholder="['请选择门店','已选择门店点击下拉按钮查看']"></storeSelect>   
                            </div>
                            <div class="floatLeft">
                                <el-button type="primary" size="small" icon="el-icon-search" @click="seachAndClear(1)" style="margin-left:10px;">搜索</el-button>
                                <el-button type="info"  size="small" icon="el-icon-refresh" @click="seachAndClear(2)">重置</el-button>
                            </div>
                        </div>
                    </div>
                </div>
                <!--新增调价单-->
                <div>
                    <el-button type="primary"  style="margin-top:10px;" @click="addGoods">新增调价单<i class="el-icon-plus el-icon-plus-right"></i></el-button>
                </div>
                <!--数据-->
                <div style="margin-top:10px;">
                    <table class="table_list" border="0" cellspacing="0">
                        <tr>	
                            <th></th>
                            <th>门店名称</th>
                            <th>原材料类别</th>
                            <th>原材料名称</th>
                            <th>库存单价(元)</th>
                            <th>门店订货价格(元)</th>
                            <th>生效时间</th>
                        </tr>
                    </table>
                </div>
            </div>
<!-- ===============================================================================================================新增变价单 -->
            <div v-else key="add">
                <newPriceList @toParCancel='toParCancel'></newPriceList>
            </div>
        </transition>
    </div>
</template>

<script>
import newPriceList from '@/components/childPage/StoreMGM/common/newPrice_list.vue';//引入新增变价单组件
    export default {
        data(){
            return{
                name_in:'',
                storeSelectData:[],
                show:true,
            }
        },
        methods:{
            // 点击新增变价单
            addGoods(){
                this.show=false;
            },
            //点击全部分类加减号
            selectUnfold(){
                this.isUnfold=!this.isUnfold;
            },
            //接受子组件的取消事件
            toParCancel(){
                this.show=true;
            }
        },
        created(){
            console.log('原材料管理')
        },
        components:{
            newPriceList
        }
    }
</script>

<style scoped>
/*主页面*/
    .postPre{
        padding:10px;
        height:100%;
    }
    .topWrap{
        height:60px;
    }
    .item{
        float: left;
        line-height:40px;
    }
    .item .floatLeft{
        float: left;
    }
    .item .floatLeft span{
        margin-right:10px;
    }
</style>