<!--订单列表-->
<template>
    <div>
        <transition name="animateCheckDetail">
<!-- ========================================================================================主页面-->
            <div class="orderAnimate"  v-if="orderShow" key="save">
                <!--头部搜索-->
                <div class="searchWrap">
                    <div style="display:flex;">
                        <div class="item" style="margin-right:60px;">
                            <span style="font-size:18px;font-weight:600;float:left;">采购门店</span>
                            <!--组件-->
                            <div class="fl" style="line-height:20px;">
                              <storeSelect :storeSelectData='storeSelectData' :inputWidth="290" :placeholder="['请选择门店','已选择门店点击下拉按钮查看']" @selectChange="selectChange"></storeSelect>
                            </div>
                            <span style="font-size:18px;font-weight:600;float:left;">单据号</span>
                            <el-input style="width:220px;" size="medium" clearable></el-input>
                            <el-button type="primary" size="small" icon="el-icon-search" @click="seachAndClear(1)" style="margin-left:10px;">搜索</el-button>
                            <el-button type="info"  size="small" icon="el-icon-refresh" @click="seachAndClear(2)">重置</el-button>
                        </div>
                    </div>
                    <div style="display:flex;margin-top:20px;">
                        <div class="item"  style="margin-right:60px;">
                            <span style="font-size:18px;font-weight:600;float:left;">状态</span>
                            <el-select style="width:350px;"  size="medium" v-model="name_in3">
                                <el-option label="未提交" :value="1"></el-option>
                                <el-option label="待审核" :value="2"></el-option>
                                <el-option label="待发货" :value="3"></el-option>
                                <el-option label="已发货" :value="4"></el-option>
                                <el-option label="已完成" :value="5"></el-option>
                            </el-select>
                            <span style="font-size:18px;font-weight:600;">采购日期</span>
                            <el-date-picker
                                style="margin-right:20px;width:180px;"
                                v-model="value1"
                                type="date"
                                placeholder="选择日期">
                                </el-date-picker>
                                <!--  -->
                                <el-date-picker
                                v-model="value2"
                                type="date"
                                style="width:180px;"
                                placeholder="选择日期">
                            </el-date-picker>
                        </div>
                    </div>
                </div>
                <!-- 数据 -->
                <div style="margin-top:20px;">
                    <table class="table_list" border="0" cellspacing="0">
                        <tr>
                            <th></th>
                            <th>单据号</th>
                            <th>订单类型</th>
                            <th>采购门店</th>
                            <th>供应商名称</th>
                            <th>采购金额</th>
                            <th>采购人</th>
                            <th>审核人</th>
                            <th>状态</th>
                            <th>采购日期</th>
                            <th>审核日期</th>
                            <th>操作</th>
                        </tr>
                        <tr v-for="(v,k) in data_list" :key="k">
                            <td>{{k+1}}</td>
                            <td>{{v.s_name}}</td>
                            <td>{{v.brand}}</td>
                            <td>{{v.areaName}}</td>
                            <td>{{v.attribute}}</td>
                            <td>{{v.formats}}</td>
                            <td>{{v.user}}</td>
                            <td>{{v.time}}</td>
                            <td>{{v.state}}</td>
                            <td>{{v.template}}</td>
                            <td>{{v.time1}}</td>
                            <td>
                                <el-button type="primary" size="small" icon="el-icon-search"  @click="operation(1,k,v)">查看</el-button>
                                <el-button type="primary" size="small" icon="el-icon-search"  @click="operation(2,k,v)" v-show="true">审核</el-button>
                            </td>
                        </tr>
                        <!-- 无数据显示 -->
                        <tr v-if="data_list.length<=0">
                            <td colspan="12">
                                <p style="color:#999">暂无更多数据</p>
                            </td>
                        </tr>
                    </table>
                </div>
                <!-- 分页 -->
                <div class="pageBtn">
                    <el-pagination
                    :background="true"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageIndex"
                    :page-sizes="[10, 20, 30, 40, 50]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="9990">
                    </el-pagination>
                </div>
            </div>
<!-- =============================================================查看详情或者审核页面-->
            <div  class='checkDetailAnimate' v-else key="edit">
                <!--头部搜索栏-->
                <checkTop :supplierName="supplierName" :purchaseShop="purchaseShop"></checkTop>
                <!--表格数据展示 -->
                <checkDetail @fromchild="fromchild"  :isCheckDetail="isCheckDetail" :isAudit="isAudit"></checkDetail>
            </div>
        </transition>
    </div>
</template>

<script>
import checkTop from '@/components/childPage/StoreMGM/Procurement-Children/common/checkTop.vue';//引入查看详情页头部搜索组件
import checkDetail from '@/components/childPage/StoreMGM/Procurement-Children/common/checkDetail.vue';//引入查看详情页表格数据组件
export default {
  data() {
    return {
      value1: "", //时间选择器1
      value2: "", //时间选择器2
      name_in3: "",
      pageIndex: 1, //当前页数
      pageSize: 10, //每页显示条数
      orderShow:true, //主页面状态
      supplierName:"",//供应商名称给子组件传值
      purchaseShop:'',//采购门店给子组件传值
      isCheckDetail:true,//点击查看传值
      isAudit:false,//点击审核传值
      storeSelectData: [
        //组件传值
        {
          name: "合肥市安业餐饮管理有限公司",
          id: "1",
          children: [
            { name: "安少爷米线(滨湖世纪金源店)(加盟店)", id: "1-1" },
            { name: "安少爷米线(滨湖世纪金源店)(加盟店)", id: "1-2" },
            { name: "安少爷米线(滨湖世纪金源店)(加盟店)", id: "1-3" },
            { name: "安少爷米线(滨湖世纪金源店)(加盟店)", id: "1-4" },
            { name: "安少爷米线(滨湖世纪金源店)(加盟店)", id: "1-5" },
            { name: "安少爷米线(滨湖世纪金源店)(加盟店)", id: "1-6" },
            { name: "安少爷米线(滨湖世纪金源店)(加盟店)", id: "1-7" }
          ]
        }
      ],
      data_list: [
        //渲染数据
        {
          s_name: "18121415450025",
          brand: "中央厨房",
          attribute: "总部配送中心",
          areaName: "安少爷米线（银泰城店）",
          formats: "吴燕燕",
          user: "已完成",
          time: "2018-12-14",
          state: "2018-12-14",
          template: "2018-12-14",
          time1: "2018-12-14 15:45:33"
        },
        {
          s_name: "18121415450025",
          brand: "中央厨房",
          attribute: "分布配送中心",
          areaName: "安少爷米线（万达茂店）",
          formats: "吴燕燕",
          user: "已完成",
          time: "2018-12-14",
          state: "2018-12-14",
          template: "2018-12-14",
          time1: "2018-12-14 15:45:33"
        },
        {
          s_name: "18121415450025",
          brand: "中央厨房",
          attribute: "小店配送中心",
          areaName: "	安少爷米线（高新银泰店）",
          formats: "吴燕燕",
          user: "已完成",
          time: "2018-12-14",
          state: "2018-12-14",
          template: "2018-12-14",
          time1: "2018-12-14 15:45:33"
        },
        {
          s_name: "18121415450025",
          brand: "中央厨房",
          attribute: "合肥配送中心",
          areaName: "安少爷米线（绿地瀛海店）",
          formats: "吴燕燕",
          user: "已完成",
          time: "2018-12-14",
          state: "2018-12-14",
          template: "2018-12-14",
          time1: "2018-12-14 15:45:33"
        },
        {
          s_name: "18121415450025",
          brand: "中央厨房",
          attribute: "北京配送中心",
          areaName: "安少爷米线（天鹅湖店）",
          formats: "吴燕燕",
          user: "已完成",
          time: "2018-12-14",
          state: "2018-12-14",
          template: "2018-12-14",
          time1: "2018-12-14 15:45:33"
        },
        {
          s_name: "18121415450025",
          brand: "中央厨房",
          attribute: "7416.00",
          areaName: "吴燕燕",
          formats: "吴燕燕",
          user: "已完成",
          time: "2018-12-14",
          state: "2018-12-14",
          template: "2018-12-14",
          time1: "2018-12-14 15:45:33"
        },
        {
          s_name: "18121415450025",
          brand: "中央厨房",
          attribute: "7416.00",
          areaName: "吴燕燕",
          formats: "吴燕燕",
          user: "已完成",
          time: "2018-12-14",
          state: "2018-12-14",
          template: "2018-12-14",
          time1: "2018-12-14 15:45:33"
        },
        {
          s_name: "18121415450025",
          brand: "中央厨房",
          attribute: "7416.00",
          areaName: "吴燕燕",
          formats: "吴燕燕",
          user: "已完成",
          time: "2018-12-14",
          state: "2018-12-14",
          template: "2018-12-14",
          time1: "2018-12-14 15:45:33"
        },
        {
          s_name: "18121415450025",
          brand: "中央厨房",
          attribute: "7416.00",
          areaName: "吴燕燕",
          formats: "吴燕燕",
          user: "已完成",
          time: "2018-12-14",
          state: "2018-12-14",
          template: "2018-12-14",
          time1: "2018-12-14 15:45:33"
        },
        {
          s_name: "18121415450025",
          brand: "中央厨房",
          attribute: "7416.00",
          areaName: "吴燕燕",
          formats: "吴燕燕",
          user: "已完成",
          time: "2018-12-14",
          state: "2018-12-14",
          template: "2018-12-14",
          time1: "2018-12-14 15:45:33"
        }
      ],
    };
  },
  methods: {
    // pageSize 改变时会触发
    handleSizeChange(data) {
      console.log(data);
      this.pageSize = data;
    },
    // pageIndex改变事件
    handleCurrentChange(data) {
      console.log(data);
      this.pageIndex = data;
    },
    //点击查看或者审核
    operation(data,k,v){
        if(data=='1'){
            // 点击查看
            this.supplierName=this.data_list[k].attribute;//供应商给子组件传值
            this.purchaseShop=this.data_list[k].areaName;//采购门店给子组件传值
            this.isCheckDetail=true;//打印按钮显示
            this.isAudit=false;//审核通过与驳回按钮隐藏
            this.orderShow=false;//查看内容显示
        }else{
            //点击发货
            this.supplierName=this.data_list[k].attribute;//供应商给子组件传值
            this.purchaseShop=this.data_list[k].areaName;//采购门店给子组件传值
            this.isCheckDetail=false;//打印按钮隐藏
            this.isAudit=true;//审核通过与驳回按钮出现
            this.orderShow=false;//审核内容显示
        }
    },
    // 下拉菜单选中事件
    selectChange(){
      console.log(e)
    },
    // 接受来自子组件的事件
    fromchild(){
      this.orderShow=true;
    }
  },
  created() {
    console.log("订单列表");
  },
  components: {
    checkDetail,
    checkTop
  }
};
</script>

<style scoped>
/*头部搜索样式*/
hr {
  width: 100%;
  margin: 10px auto;
  border: 0;
  height: 1px;
  background: #eee;
}
.searchWrap .item {
  height:50px;
  line-height:50px;
  display: flex;
  align-items: center;
}
.searchWrap .item span {
  display: inline-block;
  width: 100px;
  text-align: right;
  margin-right: 20px;
}
.pageBtn {
 margin: 20px auto 0 25%;
}
</style>