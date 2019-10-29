import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '',
            name: '',
            component: resolve => require(['@/components/childPage/login/login'], resolve),
        },
        {//登录页面
            path: '/login',
            name: 'login',
            component: resolve => require(['@/components/childPage/login/login'], resolve),
        },
        {//打印页面
            path: '/print',
            name: 'print',
            component: resolve => require(['@/components/childPage/print/print'], resolve),
        },
        {
            path: '/HomePage',
            name: 'HomePage',
            component: resolve => require(['@/components/HomePage'], resolve),
            children: [
                {
                    path: '',//岗位权限
                    name: '',
                    component: resolve => require(['@/components/childPage/index'], resolve),
                },
                {
                    path: 'index',//岗位权限
                    name: 'index',
                    component: resolve => require(['@/components/childPage/index'], resolve),
                },
                {
                    path: 'postPermissions',//岗位权限
                    name: 'postPermissions',
                    component: resolve => require(['@/components/childPage/enterprise/postPermissions'], resolve),
                },
                // ======================================================企业机构
                {
                    path: 'Organization',//机构管理
                    name: 'Organization',
                    component: resolve => require(['@/components/childPage/enterprise/Organization'], resolve),
                    children: [
                        {
                            path: 'brand_c',//品牌管理
                            name: 'brand_c',
                            component: resolve => require(['@/components/childPage/enterprise/O_Children/brand_c'], resolve),
                        },
                        {
                            path: 'area_c',//区域管理
                            name: 'area_c',
                            component: resolve => require(['@/components/childPage/enterprise/O_Children/area_c'], resolve),
                        },
                        {
                            path: 'store_c',//门店管理
                            name: 'store_c',
                            component: resolve => require(['@/components/childPage/enterprise/O_Children/store_c'], resolve),
                        },
                        {
                            path: 'permissions_c',//权限模板
                            name: 'permissions_c',
                            component: resolve => require(['@/components/childPage/enterprise/O_Children/permissions_c'], resolve),
                        },
                    ]
                },
                {
                    path: 'department',//部门管理
                    name: 'department',
                    component: resolve => require(['@/components/childPage/enterprise/department'], resolve),
                },
                {
                    path: 'employees',//员工管理
                    name: 'employees',
                    component: resolve => require(['@/components/childPage/enterprise/employees'], resolve),
                },
                // =======================================================菜品管理
                {
                    path: 'foot_home_page',//菜品库主页
                    name: 'foot_home_page',
                    component: resolve => require(['@/components/childPage/dishes/foot_home_page'], resolve),
                },
                {
                    path: 'foodLibrary',//菜品库
                    name: 'foodLibrary',
                    component: resolve => require(['@/components/childPage/dishes/foodLibrary'], resolve),
                    children: [
                        {
                            path: 'Food_MGM',//菜品管理
                            name: 'Food_MGM',
                            component: resolve => require(['@/components/childPage/dishes/foot_Child/Food_MGM'], resolve),
                        },
                        {
                            path: 'Specification_MGM',//规格管理
                            name: 'Specification_MGM',
                            component: resolve => require(['@/components/childPage/dishes/foot_Child/Specification_MGM'], resolve),
                        },
                        {
                            path: 'practice_MGM',//做法管理
                            name: 'practice_MGM',
                            component: resolve => require(['@/components/childPage/dishes/foot_Child/practice_MGM'], resolve),
                        },
                        {
                            path: 'charging_MGM',//加料模板
                            name: 'charging_MGM',
                            component: resolve => require(['@/components/childPage/dishes/foot_Child/charging_MGM'], resolve),
                        },
                    ]
                },
                {
                    path: 'theRecipe',//菜谱
                    name: 'theRecipe',
                    component: resolve => require(['@/components/childPage/dishes/theRecipe'], resolve),
                },
                {
                    path: 'intending',//变价设置
                    name: 'intending',
                    component: resolve => require(['@/components/childPage/dishes/intending'], resolve),
                },
                // =======================================================中央厨房
                {
                    path: 'orderMGM',//总部订单管理
                    name: 'orderMGM',
                    component: resolve => require(['@/components/childPage/centralKitchen/orderMGM'], resolve),
                    children: [
                        {
                            path: 'orderlist',//订单列表
                            name: 'orderlist',
                            component: resolve => require(['@/components/childPage/centralKitchen/orderComMGM/orderList'], resolve),
                        },
                        {
                            path: 'undone',//未提交
                            name: 'undone',
                            component: resolve => require(['@/components/childPage/centralKitchen/orderComMGM/undone'], resolve),
                        },
                        {
                            path: 'audit',//待审核
                            name: 'audit',
                            component: resolve => require(['@/components/childPage/centralKitchen/orderComMGM/audit'], resolve),
                        },
                        {
                            path: 'pending',//待收货
                            name: 'pending',
                            component: resolve => require(['@/components/childPage/centralKitchen/orderComMGM/pending'], resolve),
                        },
                        {
                            path: 'done',//已完成
                            name: 'done',
                            component: resolve => require(['@/components/childPage/centralKitchen/orderComMGM/done'], resolve),
                        },
                    ]
                },
                {
                    path: 'inventory',//总部盘点管理
                    name: 'inventory',
                    component: resolve => require(['@/components/childPage/centralKitchen/inventory'], resolve),
                },
                {
                    path: 'Statistics',//总部报表统计
                    name: 'Statistics',
                    component: resolve => require(['@/components/childPage/centralKitchen/Statistics'], resolve),
                    children: [
                        {
                            path: 'goodsBatch',//库存查询
                            name: 'goodsBatch',
                            component: resolve => require(['@/components/childPage/centralKitchen/Statistics-Children/goodsBatch'], resolve),
                        },
                        {
                            path: 'inoutAmount',//进销存汇总
                            name: 'inoutAmount',
                            component: resolve => require(['@/components/childPage/centralKitchen/Statistics-Children/inoutAmount'], resolve),
                        },
                        {
                            path: 'inoutAmountDetail',//进销存明细
                            name: 'inoutAmountDetail',
                            component: resolve => require(['@/components/childPage/centralKitchen/Statistics-Children/inoutAmountDetail'], resolve),
                        },
                        {
                            path: 'profitLoss',//盘点盈亏表
                            name: 'profitLoss',
                            component: resolve => require(['@/components/childPage/centralKitchen/Statistics-Children/profitLoss'], resolve),
                        },
                        {
                            path: 'stocktaking',//盘点明细表
                            name: 'stocktaking',
                            component: resolve => require(['@/components/childPage/centralKitchen/Statistics-Children/stocktaking'], resolve),
                        },
                        {
                            path: 'supplier',//供应商统计表
                            name: 'suppliers',
                            component: resolve => require(['@/components/childPage/centralKitchen/Statistics-Children/supplier'], resolve),
                        },
                    ]
                },
                {
                    path: 'WarehouseM',//总部仓库管理
                    name: 'WarehouseM',
                    component: resolve => require(['@/components/childPage/centralKitchen/WarehouseM'], resolve),
                },
                {
                    path: 'supplier',//总部供应商
                    name: 'supplier',
                    component: resolve => require(['@/components/childPage/centralKitchen/supplier'], resolve),
                },
                // =======================================================门店库存管理
                {
                    path: 'procurement',//门店采购订单
                    name: 'procurement',
                    component: resolve => require(['@/components/childPage/StoreMGM/procurement'], resolve),
                    children: [
                        {
                            path: 'order',//订单列表
                            name: 'order',
                            component: resolve => require(['@/components/childPage/StoreMGM/Procurement-Children/order'], resolve),
                        },
                        {
                            path: 'unSubmi',//未提交
                            name: 'unSubmi',
                            component: resolve => require(['@/components/childPage/StoreMGM/Procurement-Children/unSubmit'], resolve),
                        },
                        {
                            path: 'audit',//待审核
                            name: 'audit_s',
                            component: resolve => require(['@/components/childPage/StoreMGM/Procurement-Children/audit'], resolve),
                        },
                        {
                            path: 'undeliver',//待发货
                            name: 'undeliver',
                            component: resolve => require(['@/components/childPage/StoreMGM/Procurement-Children/undeliver'], resolve),
                        },
                        {
                            path: 'deliver',//已发货
                            name: 'deliver',
                            component: resolve => require(['@/components/childPage/StoreMGM/Procurement-Children/deliver'], resolve),
                        },
                        {
                            path: 'done',//已完成
                            name: 'done_s',
                            component: resolve => require(['@/components/childPage/StoreMGM/Procurement-Children/done'], resolve),
                        },
                    ]
                },
                {
                    path: 'rection',//门店直配
                    name: 'rection',
                    component: resolve => require(['@/components/childPage/StoreMGM/rection'], resolve),
                },
                {
                    path: 'theReport',//门店报表
                    name: 'theReport',
                    component: resolve => require(['@/components/childPage/StoreMGM/theReport'], resolve),
                    children: [
                        {
                            path: 'goodsBatch',//库存查询
                            name: 'goodsBatch_A',
                            component: resolve => require(['@/components/childPage/StoreMGM/theReport-Children/goodsBatch'], resolve),
                        },
                        {
                            path: 'inoutAmount',//进销存汇总
                            name: 'inoutAmount_A',
                            component: resolve => require(['@/components/childPage/StoreMGM/theReport-Children/inoutAmount'], resolve),
                        },
                        {
                            path: 'inoutAmountDetail',//进销存明细
                            name: 'inoutAmountDetail_A',
                            component: resolve => require(['@/components/childPage/StoreMGM/theReport-Children/inoutAmountDetail'], resolve),
                        },
                        {
                            path: 'profitLoss',//盘点盈亏表
                            name: 'profitLoss_A',
                            component: resolve => require(['@/components/childPage/StoreMGM/theReport-Children/profitLoss'], resolve),
                        },
                        {
                            path: 'stocktaking',//盘存明细表
                            name: 'stocktaking_A',
                            component: resolve => require(['@/components/childPage/StoreMGM/theReport-Children/stocktaking'], resolve),
                        },
                        {
                            path: 'supplier',//供应商统计表
                            name: 'supplier_A',
                            component: resolve => require(['@/components/childPage/StoreMGM/theReport-Children/supplier'], resolve),
                        },
                        {
                            path: 'orderDifference',//采购订单差异表
                            name: 'orderDifference_A',
                            component: resolve => require(['@/components/childPage/StoreMGM/theReport-Children/orderDifference'], resolve),
                        },
                        {
                            path: 'procurement',//采购物品差异表
                            name: 'procurement_A',
                            component: resolve => require(['@/components/childPage/StoreMGM/theReport-Children/procurement'], resolve),
                        },
                        {
                            path: 'transferDiffence',//调拨单差异表
                            name: 'transferDiffence_A',
                            component: resolve => require(['@/components/childPage/StoreMGM/theReport-Children/transferDiffence'], resolve),
                        },
                        {
                            path: 'transferGoodsDiffence',//调拨物品差异表
                            name: 'transferGoodsDiffence_A',
                            component: resolve => require(['@/components/childPage/StoreMGM/theReport-Children/transferGoodsDiffence'], resolve),
                        },
                    ]
                },
                {
                    path: 'StoreWH',//门店仓库
                    name: 'StoreWH',
                    component: resolve => require(['@/components/childPage/StoreMGM/StoreWH'], resolve),
                },
                {
                    path: 'material',//原材料管理
                    name: 'material',
                    component: resolve => require(['@/components/childPage/StoreMGM/material'], resolve),
                    children: [
                        {
                            path: 'goodsList',//物品列表
                            name: 'goodsList_H',
                            component: resolve => require(['@/components/childPage/StoreMGM/material-Children/goodsList'], resolve),
                        },
                        {
                            path: 'category',//物品类别
                            name: 'category_A',
                            component: resolve => require(['@/components/childPage/StoreMGM/material-Children/category'], resolve),
                        },
                        {
                            path: 'unit',//单位管理
                            name: 'unit_H',
                            component: resolve => require(['@/components/childPage/StoreMGM/material-Children/unit'], resolve),
                        },
                        {
                            path: 'priceAgreement',//价格协议
                            name: 'priceAgreement_H',
                            component: resolve => require(['@/components/childPage/StoreMGM/material-Children/priceAgreement'], resolve),
                        },
                    ]
                },
                {
                    path: 'MaterialPric',//原材料调价管理
                    name: 'MaterialPric',
                    component: resolve => require(['@/components/childPage/StoreMGM/MaterialPric'], resolve),
                    children: [
                        {
                            path: 'done',//已审核
                            name: 'done_LL',
                            component: resolve => require(['@/components/childPage/StoreMGM/MaterialPric-Children/done'], resolve),
                        },
                        {
                            path: 'audit',//待审核
                            name: 'audit_Ll',
                            component: resolve => require(['@/components/childPage/StoreMGM/MaterialPric-Children/audit'], resolve),
                        },
                        {
                            path: 'undone',//未提交
                            name: 'undone_LL',
                            component: resolve => require(['@/components/childPage/StoreMGM/MaterialPric-Children/undone'], resolve),
                        },
                    ]
                },
                {
                    path: 'storeSupplier',//门店供应商
                    name: 'storeSupplier',
                    component: resolve => require(['@/components/childPage/StoreMGM/storeSupplier'], resolve),
                },
                {
                    path: 'QrCode',//门店二维码
                    name: 'QrCode',
                    component: resolve => require(['@/components/childPage/StoreMGM/QrCode'], resolve),
                },
                // =======================================================会员管理
                {
                    path: 'sser_MGM',//用户管理
                    name: 'sser_MGM',
                    component: resolve => require(['@/components/childPage/MemberMGM/sser_MGM'], resolve),
                },
                {
                    path: 'AddVip',//新增会员
                    name: 'AddVip',
                    component: resolve => require(['@/components/childPage/MemberMGM/AddVip'], resolve),
                },
                {
                    path: 'vipCard',//会员卡
                    name: 'vipCard',
                    component: resolve => require(['@/components/childPage/MemberMGM/vipCard'], resolve),
                },
                {
                    path: 'vipLevel',//会员等级
                    name: 'vipLevel',
                    component: resolve => require(['@/components/childPage/MemberMGM/vipLevel'], resolve),
                },
                {
                    path: 'vipLabel',//会员标签
                    name: 'vipLabel',
                    component: resolve => require(['@/components/childPage/MemberMGM/vipLabel'], resolve),
                },
                {
                    path: 'addVipLabel',//添加自动会员标签
                    name: 'addVipLabel',
                    component: resolve => require(['@/components/childPage/MemberMGM/addVipLabel'], resolve),
                },
                {
                    path: 'manualLabel',//添加手动会员标签
                    name: 'manualLabel',
                    component: resolve => require(['@/components/childPage/MemberMGM/manualLabel'], resolve),
                },
                {
                    path: 'addPhysical',//新建实物商品
                    name: 'addPhysical',
                    component: resolve => require(['@/components/childPage/MemberMGM/IntegralMall_com/addPhysical'], resolve),
                },
                {
                    path: 'addVoucher',//新建卡券商品
                    name: 'addVoucher',
                    component: resolve => require(['@/components/childPage/MemberMGM/IntegralMall_com/addVoucher'], resolve),
                },
                {
                    path: 'IntegralMall',//积分商城
                    name: 'IntegralMall',
                    component: resolve => require(['@/components/childPage/MemberMGM/IntegralMall'], resolve),
                },
                {
                    path: 'StoredValue',//储值管理
                    name: 'StoredValue',
                    component: resolve => require(['@/components/childPage/MemberMGM/StoredValue'], resolve),
                },
                // =======================================================订单管理
                {
                    path: 'theOrder',//反结订单
                    name: 'theOrder',
                    component: resolve => require(['@/components/childPage/TheOrderMGM/theOrder'], resolve),
                },
                {
                    path: 'free',//免费订单
                    name: 'free',
                    component: resolve => require(['@/components/childPage/TheOrderMGM/free'], resolve),
                },
                {
                    path: 'foodBack',//退菜订单
                    name: 'foodBack',
                    component: resolve => require(['@/components/childPage/TheOrderMGM/foodBack'], resolve),
                },
                {
                    path: 'addFood',//增菜订单
                    name: 'addFood',
                    component: resolve => require(['@/components/childPage/TheOrderMGM/addFood'], resolve),
                },
                {
                    path: 'discount',//折扣订单
                    name: 'discount',
                    component: resolve => require(['@/components/childPage/TheOrderMGM/discount'], resolve),
                },
                {
                    path: 'Delivery',//外卖订单
                    name: 'Delivery',
                    component: resolve => require(['@/components/childPage/TheOrderMGM/Delivery'], resolve),
                },
                {
                    path: 'offline',//线下订单
                    name: 'offline',
                    component: resolve => require(['@/components/childPage/TheOrderMGM/offline'], resolve),
                },
                {
                    path: 'WeChatOrder',//微信点单
                    name: 'WeChatOrder',
                    component: resolve => require(['@/components/childPage/TheOrderMGM/WeChatOrder'], resolve),
                },
                // =======================================================收银管理
                {
                    path: 'OrderAmeal',//点餐
                    name: 'OrderAmeal',
                    component: resolve => require(['@/components/childPage/Cashier_MGM/OrderAmeal'], resolve),
                },
                {
                    path: 'numeral',//排号
                    name: 'numeral',
                    component: resolve => require(['@/components/childPage/Cashier_MGM/numeral'], resolve),
                },
                {
                    path: 'A_table',//桌位管理
                    name: 'A_table',
                    component: resolve => require(['@/components/childPage/Cashier_MGM/A_table'], resolve),
                },
                // =======================================================报表管理
                {
                    path: 'summary',//营收汇总报表
                    name: 'summary',
                    component: resolve => require(['@/components/childPage/theReport/summary'], resolve),
                },
                {
                    path: 'succession',//交班信息表
                    name: 'succession',
                    component: resolve => require(['@/components/childPage/theReport/succession'], resolve),
                },
                {
                    path: 'eatIn',//会员报表
                    name: 'eatIn',
                    component: resolve => require(['@/components/childPage/theReport/eatIn'], resolve),
                },
                // =======================================================数据分析
                {
                    path: 'business',//经营分析
                    name: 'business',
                    component: resolve => require(['@/components/childPage/dataAnalysis/business'], resolve),
                    children: [
                        {
                            path: 'index1',//门店分析
                            name: 'index1',
                            component: resolve => require(['@/components/childPage/dataAnalysis/business/index1'], resolve),
                        },
                        {
                            path: 'index2',//储值分析
                            name: 'index2',
                            component: resolve => require(['@/components/childPage/dataAnalysis/business/index2'], resolve),
                        },
                        {
                            path: 'index3',//积分分析
                            name: 'index3',
                            component: resolve => require(['@/components/childPage/dataAnalysis/business/index3'], resolve),
                        },
                        {
                            path: 'index4',//员工数据
                            name: 'index4',
                            component: resolve => require(['@/components/childPage/dataAnalysis/business/index4'], resolve),
                        },

                        // =======================================================
                    ]
                },
                {
                    path: 'goods',//商品分析
                    name: 'goods',
                    component: resolve => require(['@/components/childPage/dataAnalysis/goods'], resolve),
                },
                {
                    path: 'user',//用户分析
                    name: 'user',
                    component: resolve => require(['@/components/childPage/dataAnalysis/user'], resolve),
                },
                {
                    path: 'marketing',//营销分析
                    name: 'marketing',
                    component: resolve => require(['@/components/childPage/dataAnalysis/marketing'], resolve),
                },
                {
                    path: 'logistics',//物流数据
                    name: 'logistics',
                    component: resolve => require(['@/components/childPage/dataAnalysis/logistics'], resolve),
                },
                // =======================================================营销中心
                {
                    path: 'MarketingCenter',//营销中心
                    name: 'MarketingCenter',
                    component: resolve => require(['@/components/childPage/MarketingCenter'], resolve),
                },
                {
                    path: 'groupPurchase',//团购劵
                    name: 'groupPurchase',
                    component: resolve => require(['@/components/childPage/MarketingCenter/groupPurchase'], resolve),
                },
                {
                    path: 'addGroupPurchase',//添加团购劵
                    name: 'addGroupPurchase',
                    component: resolve => require(['@/components/childPage/MarketingCenter/addGroupPurchase'], resolve),
                },
                // =======================================================
            ]
        },
    ]
})
