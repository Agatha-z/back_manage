<template>
  <div class="groupPurchase">
    <div class="Purchase">
      <p class="top">
        <el-button plain style="color: #7865dc;border:1px solid #7865dc;font-size: 16px">团购劵</el-button>
      </p>
      <div class="Purchase_content">
        <!--优惠劵-->
        <div class="Purchase_content_top">
          <div class="Purchase_content_text">
            <span>优惠劵名称</span>
            <div style="margin-top: 15px;display: inline-block">
              <el-input placeholder="请输入内容" v-model="input5" class="input-with-select">
                <el-button slot="append" style="color: black">搜索</el-button>
              </el-input>
            </div>
          </div>
          <div class="Purchase_content_text1">
            <div class="typeOf" style="margin-right: 65px">
              <span>劵类型</span>
              <el-select v-model="options.value" placeholder="全部" class="select_left" >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="status">
              <span>劵状态</span>
              <el-select v-model="options1.value" placeholder="全部" class="select_right">
                <el-option
                  v-for="item in options1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
        <!--新建优惠劵-->
        <div class="newCoupon">
          <router-link to="/HomePage/addGroupPurchase">
          <el-button type="primary" icon="el-icon-plus" >新建</el-button>
          </router-link>
          <el-button>删除按钮</el-button>
        </div>
        <!--新建内容区-->
        <div class="addContent">
           <div class="addContent_text">
              <span>暂无数据</span>
           </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "groupPurchase",
    data() {
      return {
        input5:"",
        options: [{
          value: '全部',
          label: '全部'
        }, {
          value: '代金券',
          label: '代金券'
        }, {
          value: '团购劵',
          label: '团购劵'
        }],
        options1:[{
          value: '全部',
          label: '全部'
        }, {
          value: '已开放',
          label: '已开放'
        }, {
          value: '未开放',
          label: '未开放'
        }]
      }
    }

  }
</script>

<style scoped>
  .groupPurchase {
    width: 97%;
    padding: 26px;
    background: white;
    overflow: hidden;
  }

  .top{
    width: 100%;
    background: white;
    padding-bottom: 20px;
  }

  .top span {
    display: inline-block;
    width: 76px;
    height: 40px;
    border: 1px solid #7865dc;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    color: #7865dc;
    text-align: center;
    line-height: 40px;
    font-size: 17px;
  }
  .Purchase_content, .Purchase_content_top,.newCoupon,.addContent{
    background: #f2f2f6;
    border-radius: 10px;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    padding: 10px;
    overflow: hidden;
  }

  .Purchase_content{
    min-height: 840px;
  }

  .Purchase_content_top,.newCoupon,.addContent{
    background: white;
    padding: 10px 20px;
  }

  .Purchase_content_text span {
    font-size: 16px;
    margin-right: 15px;
    display: inline-block;
  }

  .typeOf, .status {
    display: inline-block;
  }

  .Purchase_content_text1{
    margin: 15px 0;
  }

  .typeOf span, .status span {
    margin-right: 10px;
    display: inline-block;
    font-size: 16px;
  }

  .select_left,.select_right {
    width: 90px;
    display: inline-block;
    color: black;
  }

  .newCoupon{
    margin: 10px 0;
    overflow: hidden;
  }

  .newCoupon button{
    font-size: 16px;
  }
  .newCoupon button:nth-child(1){
    float: left;
    background: #7865dc;
    color: white;
    border: none;
  }

  .newCoupon button:nth-child(2){
    float: right;
  }

  .addContent{
    min-height: 470px;
    padding: 20px;
  }
  .addContent_text {
    border:1px solid #cccccc;
    text-align: center;
    height:349px;
  }

  .addContent_text span{
    color: #666666;
    padding-top:11%;
    display: inline-block;
    font-size: 16px;
  }
</style>

