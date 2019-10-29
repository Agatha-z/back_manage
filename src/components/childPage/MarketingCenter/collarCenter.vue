<template>
    <div class="collarCenter">
      <div class="coupon">
        <p class="top">
          <el-button plain style="color: #7865dc;border:1px solid #7865dc;font-size: 16px">领劵中心</el-button>
        </p>
        <div class="coupon_content">
          <!--优惠劵搜索-->
          <div class="coupon_content_top">
            <div class="coupon_content_text">
              <span>优惠劵名称</span>
              <div style="margin-top: 15px;display: inline-block">
                <el-input placeholder="请输入内容" v-model="input5" class="input-with-select">
                  <el-button slot="append" style="color: black">搜索</el-button>
                </el-input>
              </div>
            </div>
            <!--劵类型，劵状态-->
            <div class="coupon_content_text1">
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
            <router-link to="">
              <el-button type="primary" icon="el-icon-plus" class="addJuan">添加劵</el-button>
            </router-link>
            <div class="selects">
              <el-button>批量删除</el-button>
              <el-button>设置排序</el-button>
            </div>
          </div>
          <!--添加劵数据列表-->
          <div class="addContent">
            <!-- 数据 -->
            <div>
              <table class="table_list" border="0" cellspacing="0">
                <tr>
                  <th><el-checkbox label=""></el-checkbox></th>
                  <th>劵名称</th>
                  <th>劵类型</th>
                  <th>劵有效期</th>
                  <th>上架状态</th>
                  <th>库存</th>
                  <th>操作</th>
                </tr>
                <!--<tr v-for="(v,k) in data_list" :key="k">-->
                  <!--<td>{{k+1}}</td>-->
                  <!--<td>{{v.s_name}}</td>-->
                  <!--<td>{{v.brand}}</td>-->
                  <!--<td>{{v.areaName}}</td>-->
                  <!--<td>{{v.attribute}}</td>-->
                  <!--<td>{{v.formats}}</td>-->
                  <!--<td>-->
                    <!--<el-button type="primary" size="small" icon="el-icon-search"  @click="operation(1,k,v)">查看</el-button>-->
                  <!--</td>-->
                <!--</tr>-->
                <!-- 无数据显示 -->
                <tr style="height: 400px">
                  <td colspan="10">
                    <p style="color:#999">暂无更多数据</p>
                  </td>
                </tr>
              </table>
            </div>
            <!--<div class="addContent_text">-->
              <!--<span>暂无数据</span>-->
            <!--</div>-->
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "collarCenter",
        data(){
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
            }],
            // data_list:[ //渲染数据
            //   {s_name:'18121415450025',brand:'自采',attribute:'安少爷米线（瑶海万达店）',areaName:'总部配送中心',formats:'2018-12-20',user:'3364.50',time:'2018-12-20 11:16:32',time1:'2018-10-07 08:23:32'},
            //   {s_name:'18121415450025',brand:'自采',attribute:'安少爷米线（瑶海大海店）',areaName:'分布配送中心',formats:'2014-12-20',user:'3364.50',time:'2018-12-20 11:16:32',time1:'2018-10-07 08:23:32'},
            //   {s_name:'18121415450025',brand:'自采',attribute:'安少爷米线（冰壶万达店）',areaName:'黑给配送中心',formats:'2013-12-20',user:'3364.50',time:'2018-12-20 11:16:32',time1:'2018-10-07 08:23:32'},
            //   {s_name:'18121415450025',brand:'自采',attribute:'安少爷米线（前后万达店）',areaName:'痕迹配送中心',formats:'2012-12-20',user:'3364.50',time:'2018-12-20 11:16:32',time1:'2018-10-07 08:23:32'},
            // ],
          }
        }
    }
</script>

<style scoped>
  .coupon {
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
  .coupon_content, .coupon_content_top,.newCoupon,.addContent{
    background: #f2f2f6;
    border-radius: 10px;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    padding: 10px;
    overflow: hidden;
  }

  .coupon_content{
    min-height: 840px;
  }

  .coupon_content_top,.newCoupon,.addContent{
    background: white;
    padding: 10px 20px;
  }

  .coupon_content_text span {
    font-size: 16px;
    margin-right: 15px;
    display: inline-block;
  }

  .typeOf, .status {
    display: inline-block;
  }

  .coupon_content_text1{
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
  .addJuan{
    float: left;
    background: #7865dc;
    color: white;
    border: none;
  }

  .selects{
    float: right;
  }

  .selects button:nth-child(1){
    color: #cccccc;
  }


  .addContent_text span{
    color: #666666;
    padding-top:11%;
    display: inline-block;
    font-size: 16px;
  }
</style>
