<template>
    <div class="sidebar" onselectstart="return false">
            <el-menu :default-active="activeName"
                     text-color="#fff"
                     :unique-opened="true"
                     background-color="#515A6E"
                     class="el-menu-vertical-demo"
                     @select="onSelect"
                     :collapse="isCollapse">
            <!--  -->
                <router-link to="/HomePage/index">
                    <el-menu-item index="0">
                        <i>
                            <img src="@/assets/png/index.png" class="vertcalImg" alt="">
                        </i>
                        <span slot="title">首页</span>
                    </el-menu-item>
                </router-link>
                <!--  -->
                <el-submenu index="1">
                    <template slot="title">
                        <i>
                            <img src="@/assets/png/Enterprise.png" class="vertcalImg" alt="">
                        </i>
                        <span slot="title">企业机构</span>
                    </template>
                    <router-link to="/HomePage/Organization">
                        <el-menu-item index="1-1">机构管理</el-menu-item>
                    </router-link>
                    <router-link to="/HomePage/department">
                        <el-menu-item index="1-2">部门管理</el-menu-item>
                    </router-link>
                    <router-link to="/HomePage/postPermissions">
                        <el-menu-item index="1-3">角色管理</el-menu-item>
                    </router-link>
                    <router-link to="/HomePage/employees">
                        <el-menu-item index="1-4">员工管理</el-menu-item>
                    </router-link>
                </el-submenu>
                <!--  -->
                <el-submenu index="2">
                    <template slot="title">
                        <i>
                            <img src="@/assets/png/food.png" class="vertcalImg" alt="">
                        </i>
                        <span slot="title">菜品管理</span>
                    </template>
                    <router-link to="/HomePage/foot_home_page">
                        <el-menu-item index="2-1">菜品库</el-menu-item>
                    </router-link>
                    <router-link to="/HomePage/theRecipe">
                        <el-menu-item index="2-2">菜谱</el-menu-item>
                    </router-link>
                    <router-link to="/HomePage/intending">
                        <el-menu-item index="2-3">变价设置</el-menu-item>
                    </router-link>
                </el-submenu>
                <!--  -->
                <el-submenu index="3">
                    <template slot="title">
                        <i>
                            <img src="@/assets/png/stores.png" class="vertcalImg" alt="">
                        </i>
                        <span slot="title">门店库存管理</span>
                    </template>
                    <router-link to="/HomePage/procurement">
                        <el-menu-item index="3-1">门店采购订单</el-menu-item>
                    </router-link>
                    <router-link to="/HomePage/rection">
                        <el-menu-item index="3-2">门店采购统计</el-menu-item>
                    </router-link>
                    <router-link to="/HomePage/theReport">
                        <el-menu-item index="3-3">门店报表统计</el-menu-item>
                    </router-link>
                    <router-link to="/HomePage/StoreWH">
                        <el-menu-item index="3-4">门店仓库管理</el-menu-item>
                    </router-link>
                    <router-link to="/HomePage/material">
                        <el-menu-item index="3-5">原材料管理</el-menu-item>
                    </router-link>
                    <router-link to="/HomePage/MaterialPric">
                        <el-menu-item index="3-6">原材料调价管理</el-menu-item>
                    </router-link>
                    <router-link to="/HomePage/storeSupplier">
                        <el-menu-item index="3-7">门店供应商</el-menu-item>
                    </router-link>
                    <router-link to="/HomePage/QrCode">
                        <el-menu-item index="3-8">库存数据下发</el-menu-item>
                    </router-link>
                </el-submenu>
                <!--  -->
                <el-submenu index="4">
                    <template slot="title">
                        <i>
                            <img src="@/assets/png/kitchen.png" class="vertcalImg" alt="">
                        </i>
                        <span slot="title">总部库存管理</span>
                    </template>
                    <router-link to="/HomePage/orderMGM">
                        <el-menu-item index="4-1">总部订单管理</el-menu-item>
                    </router-link>
                    <router-link to="/HomePage/inventory">
                        <el-menu-item index="4-2">总部盘点管理</el-menu-item>
                    </router-link>
                    <router-link to="/HomePage/Statistics">
                        <el-menu-item index="4-3">总部报表统计</el-menu-item>
                    </router-link>
                    <router-link to="/HomePage/WarehouseM">
                        <el-menu-item index="4-4">总部仓库管理</el-menu-item>
                    </router-link>
                    <router-link to="/HomePage/supplier">
                        <el-menu-item index="4-5">总部供应商</el-menu-item>
                    </router-link>
                </el-submenu>
                <!--  -->
                <el-submenu index="5">
                    <template slot="title">
                        <i>
                            <img src="@/assets/png/diamond.png" class="vertcalImg" alt="">
                        </i>
                        <span slot="title">会员管理</span>
                    </template>
                    <router-link to="/HomePage/sser_MGM">
                        <el-menu-item index="5-1">用户管理</el-menu-item>
                    </router-link>
                    <router-link to="/HomePage/vipCard">
                        <el-menu-item index="5-2">会员卡</el-menu-item>
                    </router-link>
                    <router-link to="/HomePage/vipLevel">
                        <el-menu-item index="5-3">会员等级</el-menu-item>
                    </router-link>
                    <router-link to="/HomePage/vipLabel">
                        <el-menu-item index="5-4">会员标签</el-menu-item>
                    </router-link>
                    <router-link to="/HomePage/IntegralMall">
                        <el-menu-item index="5-5">积分商城</el-menu-item>
                    </router-link>
                    <router-link to="/HomePage/StoredValue">
                        <el-menu-item index="5-6">储值管理</el-menu-item>
                    </router-link>
                </el-submenu>
                <!--  -->
                <el-submenu index="6">
                    <template slot="title">
                        <i>
                            <img src="@/assets/png/order.png" class="vertcalImg" alt="">
                        </i>
                        <span slot="title">订单管理</span>
                    </template>
                    <router-link to="/HomePage/theOrder">
                        <el-menu-item index="6-1">反结订单</el-menu-item>
                    </router-link>
                    <router-link to="/HomePage/free">
                        <el-menu-item index="6-2">免费订单</el-menu-item>
                    </router-link>
                    <router-link to="/HomePage/foodBack">
                        <el-menu-item index="6-3">退菜订单</el-menu-item>
                    </router-link>
                    <router-link to="/HomePage/addFood">
                        <el-menu-item index="6-4">增菜订单</el-menu-item>
                    </router-link>
                    <router-link to="/HomePage/discount">
                        <el-menu-item index="6-5">折扣订单</el-menu-item>
                    </router-link>
                    <router-link to="/HomePage/Delivery">
                        <el-menu-item index="6-6">外卖订单</el-menu-item>
                    </router-link>
                    <router-link to="/HomePage/offline">
                        <el-menu-item index="6-7">线下订单</el-menu-item>
                    </router-link>
                    <router-link to="/HomePage/WeChatOrder">
                        <el-menu-item index="6-8">微信点单</el-menu-item>
                    </router-link>
                </el-submenu>
                <!--  -->
                <el-submenu index="7">
                    <template slot="title">
                        <i>
                            <img src="@/assets/png/money.png" class="vertcalImg" alt="">
                        </i>
                        <span slot="title">收银管理</span>
                    </template>
                    <router-link to="/HomePage/OrderAmeal">
                        <el-menu-item index="7-1">点餐</el-menu-item>
                    </router-link>
                    <router-link to="/HomePage/numeral">
                        <el-menu-item index="7-2">排号</el-menu-item>
                    </router-link>
                    <router-link to="/HomePage/A_table">
                        <el-menu-item index="7-3">桌位管理</el-menu-item>
                    </router-link>
                </el-submenu>
                <!--  -->
                <el-submenu index="8">
                    <template slot="title">
                        <i>
                            <img src="@/assets/png/excli.png" class="vertcalImg" alt="">
                        </i>
                        <span slot="title">营业收入报表</span>
                    </template>
                    <router-link to="/HomePage/summary">
                        <el-menu-item index="8-1">营业汇总表</el-menu-item>
                    </router-link>
                    <router-link to="/HomePage/succession">
                        <el-menu-item index="8-2">交班信息表</el-menu-item>
                    </router-link>
                    <router-link to="/HomePage/eatIn">
                        <el-menu-item index="8-3">堂食时段账单</el-menu-item>
                    </router-link>
                </el-submenu>
                <!--  -->
                <el-submenu index="9">
                    <template slot="title">
                        <i>
                            <img src="@/assets/png/data_s.png" class="vertcalImg" alt="">
                        </i>
                        <span slot="title">数据分析</span>
                    </template>
                    <router-link to="/HomePage/business">
                        <el-menu-item index="9-1">经营分析</el-menu-item>
                    </router-link>
                    <router-link to="/HomePage/goods">
                        <el-menu-item index="9-2">商品分析</el-menu-item>
                    </router-link>
                    <router-link to="/HomePage/user">
                        <el-menu-item index="9-3">用户分析</el-menu-item>
                    </router-link>
                    <router-link to="/HomePage/marketing">
                        <el-menu-item index="9-4">营销分析</el-menu-item>
                    </router-link>
                    <router-link to="/HomePage/logistics">
                        <el-menu-item index="9-5">物流数据</el-menu-item>
                    </router-link>
                </el-submenu>
                <!--  -->
              <el-submenu index="10">
                <template slot="title">
                  <i>
                    <img src="@/assets/png/data_s.png" class="vertcalImg" alt="">
                  </i>
                  <span slot="title">营销中心</span>
                </template>
                <router-link to="/HomePage/groupPurchase">
                  <el-menu-item index="10-1">团购卷</el-menu-item>
                </router-link>
                <router-link to="/HomePage/collarCenter">
                  <el-menu-item index="10-2">领劵中心</el-menu-item>
                </router-link>
                <router-link to="">
                  <el-menu-item index="10-3">卡劵核销</el-menu-item>
                </router-link>
              </el-submenu>
                <!--<router-link to="/HomePage/MarketingCenter">-->
                    <!--<el-menu-item index="10">-->
                        <!--<i>-->
                            <!--<img src="@/assets/png/marketing.png" class="vertcalImg" alt="">-->
                        <!--</i>-->
                        <!--<span slot="title">营销中心</span>-->
                    <!--</el-menu-item>-->
                <!--</router-link>-->
                <!--  -->
            </el-menu>
            <!--  -->
            <div style="height:49px;background:#17233d"></div>
    </div>
</template>

<script>

export default {
    data(){
        return {
            activeName:'1',//激活菜单的 name 值
            isCollapse:false,//是否水平折叠收起菜单
        }
    },
    created(){
        // 设置选中状态
        sessionStorage.activeName==undefined?this.activeName='0':this.activeName=sessionStorage.activeName;
        // 小屏幕水平折叠面板
        var widths=$('body').width()
        if(widths<=1360){
            this.isCollapse=true
            this.$store.state.SmallScreen=true
        }else{
            this.isCollapse=false
            this.$store.state.SmallScreen=false
        }
    },
    methods:{
        // 保存选中状态  下次打开激活对应得侧边栏项目
        onSelect(data){
            // 此处设置路由组件重载
            if(this.activeName==data){
                this.$store.state.RoutingOverloading=new Date().getTime()
            }
            sessionStorage.activeName=data
            this.activeName=data
        }
    }
};
</script>

<style scoped>
    .sidebar {
        width: 200px;
        height: auto;
    }
    .vertcalImg{
        height:14px;
        width:14px;
        vertical-align: middle;
        margin:0 12px 2px 5px;
    }
    .sidebar .el-menu-item.is-active{
        background:#414858!important;
        color:#fff;
    }
</style>
