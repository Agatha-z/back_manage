<!-- 经营分析 -->
<template>
  <div class="postPre">
    <div class="commonHeader_style">
      <!-- <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="/index1">门店分析</el-menu-item>
        <el-menu-item index="/index2">储值分析</el-menu-item>
        <el-menu-item index="/index3">积分分析</el-menu-item>
        <el-menu-item index="/index4">员工数据</el-menu-item>
      </el-menu>-->
      <el-tabs v-model="activeName" @tab-click="handleClick($event,activeName)">
        <el-tab-pane label="门店分析" name="1"></el-tab-pane>
        <el-tab-pane label="储值分析" name="2"></el-tab-pane>
        <el-tab-pane label="积分分析" name="3"></el-tab-pane>
        <el-tab-pane label="员工数据" name="4"></el-tab-pane>
      </el-tabs>
      <div class="main-container">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "1"
    };
  },
  methods: {
    // 标签页点击事件
    handleClick(data, k) {
      this.coomskip(k);
      // 保存tab标签 选中状态
      sessionStorage.tabs_select = k;
    },
    coomskip(k) {
      if (k == "1") {
        //门店分析
        this.$router.push("/HomePage/business/index1");
      } else if (k == "2") {
        // 储值分析
        this.$router.push("/HomePage/business/index2");
      } else if (k == "3") {
        //积分分析
        this.$router.push("/HomePage/business/index3");
      } else {
        //员工数据
        this.$router.push("/HomePage/business/index4");
      }
    }
  },
  created() {
    // 默认进入门店分析
    var ses_tab = sessionStorage.tabs_select;
    // console.log(ses_tab)
    if (ses_tab == undefined) {
      this.activeName = "1";
      this.$router.push("/HomePage/business/index1");
    } else {
      this.activeName = ses_tab;
      this.coomskip(ses_tab);
    }
  }
};
</script>

<style scoped>
.postPre {
  padding: 10px;
}
.main-container {
  background: #f2f2f6;
}
/* .el-menu.el-menu--horizontal {
  border: none;
}
.el-menu--horizontal > .el-menu-item {
  border-radius: 5px;
  height: 50px;
  line-height: 50px;
}
.el-menu--horizontal > .el-menu-item.is-active {
  background: #409eff !important;
  border: none;
  color: #fff !important;
} */
</style>