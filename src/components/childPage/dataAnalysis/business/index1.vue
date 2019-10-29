<template>
  <div class="postPre">
    <el-tabs v-model="activeName">
      <el-tab-pane label="门店概况" name="first">
        <div class="stores_profiles">
          <!-- 时间选择 -->
          <div class="stores_select" style="margin-right:40px;">
            <!--  -->
            <span style="padding:0 10px;">时间选择</span>
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                @change="blur(item.value)"
              ></el-option>
            </el-select>
            <!-- 日期选择 -->
            <el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
            <el-date-picker
              v-model="value1"
              type="week"
              format="yyyy 第 WW 周"
              placeholder="选择周"
              v-show="num == 2"
            ></el-date-picker>
            <el-date-picker v-model="value1" type="month" placeholder="选择月" v-show="num == 3"></el-date-picker>
            <el-date-picker v-model="value1" type="year" placeholder="选择年" v-show="num == 4"></el-date-picker>
          </div>
          <!-- 门店及业务选择 -->
          <div class="stores_select">
            <!-- 门店选择 -->
            <span style="padding:0 10px;">门店选择</span>
            <el-select v-model="value2" placeholder="请选择">
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <!-- 业务选择 -->
            <span style="padding:0 10px;">业务类型</span>
            <el-select v-model="value3" placeholder="请选择">
              <el-option
                v-for="item in options3"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="data_interpretation">
            <b>数据解读：</b>
            <p>针对门店业务交易订单数据的分析统计，其订单统计范围来自解决方案下的业务，您可在全部业务筛选下了解统计的业务范围。（注意：门店筛选项只会展示当前未被删除的门店，如门店被删除，则数据会统计在全部门店下，所以会出现全部门店值>当前各门店加和值的情况）。</p>
          </div>
        </div>
        <!-- 趋势图 -->
        <div class="essential_data">
          <div style="padding:10px 0;">基础数据</div>
          <div class="essential_data_bottom">
            <div class="chart_indicator">
              <div class="chart_select" :class="num==0?'active':''">
                <div class="indicator">
                  门店营收（实收）
                  <i class="el-icon-warning"></i>
                </div>
                <div class="chart_num">30</div>
                <div class="tendency">较上一日</div>
              </div>
              <div class="chart_select">
                <div class="indicator">
                  营业额（实收）
                  <i class="el-icon-warning"></i>
                </div>
                <div class="chart_num">97</div>
                <div class="up">
                  较上一日
                  <span>410.53%↑</span>
                </div>
              </div>
              <div class="chart_select">
                <div class="indicator">
                  优惠抵扣
                  <i class="el-icon-warning"></i>
                </div>
                <div class="chart_num">30</div>
                <div class="down">
                  较上一日
                  <span>410.53%↓</span>
                </div>
              </div>
              <div class="chart_select">
                <div class="indicator">
                  实充余额消费
                  <i class="el-icon-warning"></i>
                </div>
                <div class="chart_num">30</div>
                <div class="down">
                  较上一日
                  <span>410.53%↓</span>
                </div>
              </div>
              <div class="chart_select">
                <div class="indicator">
                  退款金额
                  <i class="el-icon-warning"></i>
                </div>
                <div class="chart_num">0</div>
                <div class="tendency">较上一日</div>
              </div>
              <div class="chart_select">
                <div class="indicator">
                  营业额（应收）
                  <i class="el-icon-warning"></i>
                </div>
                <div class="chart_num">97</div>
                <div class="up">
                  较上一日
                  <span>410.53%↑</span>
                </div>
              </div>
            </div>
            <div class="tendency_chart">
              <div style="font-size:15px;padding:10px 35px;">趋势图</div>
              <div id="main" style="width: 100%;height:400px;"></div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="门店运营" name="second">
        <div class="stores_profiles">
          <!-- 时间选择 -->
          <div class="stores_select" style="margin-right:40px;">
            <!--  -->
            <span style="padding:0 10px;">时间选择</span>
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                @change="blur(item.value)"
              ></el-option>
            </el-select>
            <!-- 日期选择 -->
            <el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
            <el-date-picker
              v-model="value1"
              type="week"
              format="yyyy 第 WW 周"
              placeholder="选择周"
              v-show="num == 2"
            ></el-date-picker>
            <el-date-picker v-model="value1" type="month" placeholder="选择月" v-show="num == 3"></el-date-picker>
            <el-date-picker v-model="value1" type="year" placeholder="选择年" v-show="num == 4"></el-date-picker>
          </div>
          <!-- 门店选择 -->
          <div class="stores_select">
            <span style="padding:0 10px;">门店选择</span>
            <el-select v-model="value2" placeholder="请选择">
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="essential_data">
          <div style="padding:10px 0;">业务营收</div>
          <div class="essential_data_bottom">
            <div class="turnover">
              <div>营业额</div>
              <div id="turnover_chart" style="width:600px;height:400px;"></div>
            </div>
            <div class="turnover">
              <div>订单折扣</div>
              <div id="discount_chart" style="width:600px;height:400px;"></div>
            </div>
          </div>
        </div>
        <div class="essential_data">
          <div style="width:5.5%;">
            会员拉新
            <i class="el-icon-warning" style="padding-top:3px;"></i>
          </div>
          <div id="essential_data" style="width: 1200px;height:400px;"></div>
        </div>
        <div class="essential_data">
          <div style="width:5.5%;">交易拉新</div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="实时看板" name="third">角色管理</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: "first",
      // 时间选择
      options: [
        {
          value: "选项1",
          label: "按天"
        },
        {
          value: "选项2",
          label: "按周"
        },
        {
          value: "选项3",
          label: "按月"
        },
        {
          value: "选项4",
          label: "按年"
        }
      ],
      // 门店选择
      options2: [
        {
          value: "选项1",
          label: "全部门店"
        },
        {
          value: "选项2",
          label: "金中环广场店"
        },
        {
          value: "选项3",
          label: "万达店"
        }
      ],
      // 业务类型
      options3: [
        {
          value: "选项1",
          label: "全部类型"
        },
        {
          value: "选项2",
          label: "全部"
        },
        {
          value: "选项3",
          label: "类型"
        }
      ],
      value: "", //时间选择
      value1: "", //日期选择
      value2: "", //门店选择
      value3: "", //业务类型
      num: 1,
      main_data: [
        { time: "2018/12/04", received: 0, receivable: 0 },
        { time: "2018/12/05", received: 0, receivable: 0 },
        { time: "2018/12/06", received: 0, receivable: 0 },
        { time: "2018/12/07", received: 0, receivable: 0 },
        { time: "2018/12/08", received: 0, receivable: 0 },
        { time: "2018/12/09", received: 0, receivable: 0 },
        { time: "2018/12/10", received: 0, receivable: 0 },
        { time: "2018/12/11", received: 0, receivable: 0 },
        { time: "2018/12/12", received: 0, receivable: 0 }
      ]
    };
  },
  methods: {
    // 时间选择事件
    blur(value) {
      console.log(this.value);
      if (this.value == "选项2") {
        this.num = 2;
      } else if (this.value == "选项3") {
        this.num = 3;
      } else if (this.value == "选项4") {
        this.num = 4;
      }
    },
    Echart_abnormal() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("main"));

      var option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "line" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: [
            "门店营收（实收）",
            "营业额（应收）",
            "订单数",
            "优惠折扣",
            "实冲余额消耗",
            "退款金额",
            "退款订单"
          ],
          left: "10%"
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            axisPointer: {
              label: {
                formatter: function(params) {
                  return "2018-" + params.value;
                }
              }
            },
            data: [
              "12-04",
              "12-05",
              "12-06",
              "12-07",
              "12-08",
              "12-09",
              "12-10",
              "12-11",
              "12-12"
            ]
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "门店营收（实收）",
            type: "line",
            smooth: true,
            data: [0, 0, 70, 0, 40, 0, 20, 0, 0],
            color: "#1dc6f2"
          },
          {
            name: "营业额（应收）",
            type: "line",
            smooth: true,
            data: [0, 0, 90, 0, 40, 0, 20, 0, 0],
            color: "#2589ff"
          },
          {
            name: "订单数",
            type: "line",
            smooth: true,
            data: [0, 0, 30, 0, 40, 0, 20, 0, 0],
            color: "#ffb5a2"
          },
          {
            name: "优惠折扣",
            type: "line",
            smooth: true,
            data: [0, 0, 50, 0, 30, 0, 20, 0, 0],
            color: "#b8f4ff"
          },
          {
            name: "实冲余额消耗",
            type: "line",
            smooth: true,
            data: [0, 33, 0, 0, 30, 0, 20, 0, 0],
            color: "#6dc45d"
          },
          {
            name: "退款金额",
            type: "line",
            smooth: true,
            data: [0, 40, 0, 0, 30, 0, 20, 0, 0],
            color: "#ec3838"
          },
          {
            name: "退款订单",
            type: "line",
            smooth: true,
            data: [0, 30, 0, 20, 30, 0, 20, 0, 0],
            color: "#5fd9ce"
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    Echart_operate() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("turnover_chart"));
      var option = {
        tooltip: {
          trigger: "item"
        },
        legend: {
          orient: "vertical",
          x: "80%",
          y: "center",
          icon: "circle",
          data: ["买单收款", "POS", "APP补充交易", "食堂", "外卖", "APP收款"]
        },
        series: [
          {
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 335, name: "买单收款" },
              { value: 310, name: "POS" },
              { value: 234, name: "APP补充交易" },
              { value: 135, name: "食堂" },
              { value: 1548, name: "外卖" },
              { value: 148, name: "APP收款" }
            ]
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    Echart_discount() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("discount_chart"));
      var option = {
        tooltip: {
          trigger: "item"
        },
        legend: {
          orient: "vertical",
          x: "80%",
          y: "center",
          icon: "circle",
          data: [
            "满减活动",
            "会员折扣",
            "优惠券抵扣",
            "抵扣券抵扣",
            "积分抵扣",
            "余额消耗"
          ]
        },
        series: [
          {
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 335, name: "满减活动" },
              { value: 310, name: "会员折扣" },
              { value: 234, name: "优惠券抵扣" },
              { value: 135, name: "抵扣券抵扣" },
              { value: 1548, name: "积分抵扣" },
              { value: 1548, name: "余额消耗" }
            ]
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    Echart_member() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("essential_data"));

      var option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "line" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            axisPointer: {
              label: {
                formatter: function(params) {
                  return "2018-" + params.value;
                }
              }
            },
            data: [
              "12-04",
              "12-05",
              "12-06",
              "12-07",
              "12-08",
              "12-09",
              "12-10",
              "12-11",
              "12-12"
            ]
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "会员拉新",
            type: "line",
            smooth: true,
            data: [0, 0, 70, 0, 40, 0, 20, 0, 0],
            color: "#3390fe"
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }
  },
  mounted() {
    // 定时器防止刷新路由 图表异常（不出现）
    setTimeout(() => {
      //门店营收 门店概况图表
      this.Echart_abnormal();
      //门店运营 营业额图表
      this.Echart_operate();
      // 门店运营 订单折扣图表
      this.Echart_discount();
      // 会员拉新图表
      this.Echart_member();
    });
  },
  created() {}
};
</script>
<style scoped>
.postPre {
  padding: 10px;
}
.stores_profiles {
  background: #fff;
  padding: 12px 22px;
  color: #666666;
  font-size: 15px;
}
.stores_select {
  display: inline-block;
  padding-bottom: 20px;
}
.data_interpretation {
  padding: 15px 0 20px 0;
  line-height: 30px;
  font-size: 12px;
  border-top: 1px solid #eee;
}
.data_interpretation p {
  width: 94%;
  float: right;
}
.essential_data {
  background: #fff;
  margin: 10px 0;
  padding: 20px;
}
.essential_data_bottom {
  border-top: 1px solid #eee;
  padding: 20px 0;
}
.chart_select {
  display: inline-block;
  border: 1px solid #eee;
  border-radius: 5px;
  padding: 20px;
  margin: 0 8px;
  width: 125px;
  margin-bottom: 10px;
}
.chart_num {
  padding: 15px 0;
  font-weight: bolder;
  font-size: 20px;
}
.indicator {
  color: #666666;
}
.up span {
  color: #ec3838;
}
.down span {
  color: #6dc45d;
}
.tendency {
  color: transparent;
}
.el-icon-warning {
  float: right;
}
.turnover {
  display: inline-block;
  width: 48%;
}
</style>

