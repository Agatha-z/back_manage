<template>
    <div class="postPre">
        <!-- 头部显示数据总额 -->
        <div class="commonHeader_style commonHeader_style_s" onselectstart="return false">
            <div class="firstChild div">
                <div>
                    <img src="@/assets/png/index_user.png" alt="">
                </div>
                <div>
                    <div class="centers_s">
                        <div style="font-size:16px">集团号</div>
                        <div style="font-size:24px;">353411</div>
                    </div>
                </div>
            </div>
            <div class="twoChild commonChuild div">
               <p>营业总额(元)</p>
               <p class="money_font">25846.10</p>
               <p>
                   <span>客流量：1150</span>
                   |
                   <span>客单数：1150</span>
               </p>
            </div>
            <div class="threeChild commonChuild div">
                <p>单点最高营业额(元)</p>
                <p class="money_font">25846.10</p>
                <p>
                   <span>客流量：1150</span>
                   |
                   <span>客单数：1150</span>
                </p>
                <p>最高营业额单店：安少爷米线(天鹅湖店)</p>
            </div>
            <div class="lastChild commonChuild div">
                <p>优免总额(元)</p>
                <p class="money_font">25846.10</p>
                <p>
                   <span>优惠总额(元)：1150</span>
                   |
                   <span>免单总额(元)：1150</span>
                </p>
            </div>
            <!-- 清除浮动 -->
            <div style="clear:both"></div>
        </div>
        <br>
        <!-- 营业额图表 -->
        <div class="commonHeader_style commonHeader_style_s">
            <p class="title_header">营业额</p>
            <div class="show_Echart_excel">
                <div>
                    <!--  -->
                    <el-radio-group v-model="data_1">
                        <el-radio-button :label="0">今天</el-radio-button>
                        <el-radio-button :label="1">昨天</el-radio-button>
                        <el-radio-button :label="2">最近7天</el-radio-button>
                        <el-radio-button :label="3">最近30天</el-radio-button>
                    </el-radio-group>
                    <!--  -->
                    &nbsp;&nbsp;&nbsp;
                    <el-date-picker
                    style="vertical-align: top"
                    v-model="date_1"
                    type="date"
                    placeholder="选择日期">
                    </el-date-picker>
                    <!--  -->
                    <div style="float:right">
                        <el-radio-group v-model="store_s1">
                            <el-radio-button :label="0">门店</el-radio-button>
                            <el-radio-button :label="1">区域</el-radio-button>
                        </el-radio-group>
                    </div>
                    <!--  -->
                </div>
            </div>
            <div class="show_Echart_excel">
                <!-- 表格 -->
                <div id="Echart_index_area" class="Echart_index_food" style="width: 100%;height:400px;"></div>
            </div>
        </div>
        <!--  -->
        <br>
        <!-- 营业额图表 -->
        <div class="commonHeader_style commonHeader_style_s">
            <p class="title_header">菜品分类(堂食)</p>
            <div class="show_Echart_excel">
                <div>
                    <!--  -->
                    <el-radio-group v-model="data_2">
                        <el-radio-button :label="0">今天</el-radio-button>
                        <el-radio-button :label="1">昨天</el-radio-button>
                        <el-radio-button :label="2">最近7天</el-radio-button>
                        <el-radio-button :label="3">最近30天</el-radio-button>
                    </el-radio-group>
                    <!--  -->
                    &nbsp;&nbsp;&nbsp;
                    <el-date-picker
                    style="vertical-align: top"
                    v-model="date_2"
                    type="date"
                    placeholder="选择日期">
                    </el-date-picker>
                    <!--  -->
                    <div style="float:right">
                        <el-radio-group v-model="store_s2">
                            <el-radio-button :label="0">微信会员中心</el-radio-button>
                            <el-radio-button :label="1">安少爷米线</el-radio-button>
                        </el-radio-group>
                    </div>
                    <!--  -->
                </div>
            </div>
            <div class="show_Echart_excel">
                <!-- 表格 -->
                <div id="Echart_index_Class" class="Echart_index_Class" style="width: 100%;height:500px;"></div>
            </div>
        </div>
        <!--  -->
        <br>
        <!-- 菜品(堂食)图表 -->
        <div class="commonHeader_style commonHeader_style_s">
            <p class="title_header">菜品(堂食)</p>
            <div class="show_Echart_excel">
                <div>
                    <!--  -->
                    <el-radio-group v-model="data_3">
                        <el-radio-button :label="0">今天</el-radio-button>
                        <el-radio-button :label="1">昨天</el-radio-button>
                        <el-radio-button :label="2">最近7天</el-radio-button>
                        <el-radio-button :label="3">最近30天</el-radio-button>
                    </el-radio-group>
                    <!--  -->
                    &nbsp;&nbsp;&nbsp;
                    <el-date-picker
                    style="vertical-align: top"
                    v-model="date_3"
                    type="date"
                    placeholder="选择日期">
                    </el-date-picker>
                    <!--  -->
                    <div style="float:right">
                        <el-radio-group v-model="store_s3">
                            <el-radio-button :label="0">微信会员中心</el-radio-button>
                            <el-radio-button :label="1">安少爷米线</el-radio-button>
                        </el-radio-group>
                    </div>
                    <!--  -->
                </div>
            </div>
            <div class="show_Echart_excel">
                <!-- 表格 -->
                <div id="Echart_index_food" class="Echart_index_food" style="width: 100%;height:500px;"></div>
            </div>
        </div>
        <!--  -->
        <br>
        <!-- 收银异常数据（堂食）图表 -->
        <div class="commonHeader_style commonHeader_style_s">
            <p class="title_header">收银异常数据(堂食)</p>
            <div class="show_Echart_excel">
                <div>
                    <!--  -->
                    <el-radio-group v-model="data_4">
                        <el-radio-button :label="0">今天</el-radio-button>
                        <el-radio-button :label="1">昨天</el-radio-button>
                        <el-radio-button :label="2">最近7天</el-radio-button>
                        <el-radio-button :label="3">最近30天</el-radio-button>
                    </el-radio-group>
                    <!--  -->
                    &nbsp;&nbsp;&nbsp;
                    <el-date-picker
                    style="vertical-align: top"
                    v-model="date_4"
                    type="date"
                    placeholder="选择日期">
                    </el-date-picker>
                    <!--  -->
                </div>
            </div>
            <div class="show_Echart_excel">
            <!-- 表格 -->
            <div id="Echart_index_abnormal" class="Echart_index_abnormal" style="width: 100%;height:500px;"></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                store_s1:0,//微信会员中心/安少爷米线
                store_s2:0,//微信会员中心/安少爷米线
                store_s3:0,//微信会员中心/安少爷米线
                date_1:'',//选择日期 
                date_2:'',//选择日期 
                date_3:'',//选择日期 
                date_4:'',//选择日期 
                data_1:0,//选择今天  明天.......
                data_2:0,//选择今天  明天.......
                data_3:0,//选择今天  明天.......
                data_4:0,//选择今天  明天.......
                radio4:0,//门店，区域，选择
                Echart_area_data:[  //营业额  图表数据
                    {name:'安少爷米线(金中环广场店)',ShouldMoney:1768,actualMoney:1680},
                    {name:'安少爷米线(三里庵店)',ShouldMoney:768,actualMoney:2680},
                    {name:'安少爷米线(国购广场店)',ShouldMoney:2768,actualMoney:3680},
                    {name:'安少爷米线(之心城店)',ShouldMoney:1668,actualMoney:1380},
                    {name:'安少爷米线(绿地瀛海店)',ShouldMoney:1768,actualMoney:1120},
                    {name:'安少爷米线(天鹅湖店)',ShouldMoney:1368,actualMoney:1990},
                    {name:'安少爷米线(五里墩店)',ShouldMoney:1898,actualMoney:2180},
                    {name:'安少爷米线(五环国际店)',ShouldMoney:1758,actualMoney:3680},
                    {name:'安少爷米线(恒大绿洲店)',ShouldMoney:2238,actualMoney:1160},
                    {name:'安少爷米线(大润发店)',ShouldMoney:1768,actualMoney:1683},
                ],
                Echart_area_class:[ //环状图 菜品分类数据
                    {name:'米线',value:810},
                    {name:'套餐',value:120},
                    {name:'小食单加',value:429},
                    {name:'饮品类',value:191},
                    {name:'酸辣粉凉皮',value:66},
                    {name:'员工商品',value:29},
                ],
                Echart_area_food:[ //环状图 菜品堂食数据
                    {name:'鸡丁米线',value:10},
                    {name:'鸭丁米线',value:120},
                    {name:'馒头',value:429},
                    {name:'勇闯天涯',value:10},
                    {name:'麻辣粉丝',value:22},
                    {name:'其他',value:100},
                ],
                Echart_area_abnormal:[ //收银异常数据（堂食）图表
                    {name:'折扣',value:67},
                    {name:'挂账',value:89},
                    {name:'免单',value:34},
                    {name:'反结',value:23},
                    {name:'赠送',value:1},
                    {name:'手动抹零',value:34},
                    {name:'自动抹零',value:44},
                    {name:'退菜',value:98},
                ]
            }
        },
        mounted(){
            // 定时器防止刷新路由 图表异常（不出现）
            setTimeout(()=>{
                // 收银异常数据（堂食）图表
                this.Echart_abnormal()
                // 菜品(堂食) echart  初始化
                this.Echart_food()
                // 菜品分类 (堂食) echart  初始化
                this.Echart_Class()
                // 营业额 echart  初始化
                this.Echart_area()  
            },550)
        },
        methods:{
            // 收银异常数据（堂食）图表
            Echart_abnormal(){
                var data_list=this.Echart_area_abnormal;//实际渲染数据
                // 处理数据 
                var legend=[];//类名 展示
                var chartData=[];// 数据
                for(var i=0,len=data_list.length;i<len;i++){
                    legend.push(data_list[i].name);//类名 展示
                    chartData.push(data_list[i].value)
                }
                // 基于准备好的dom，初始化echarts实例
                var myChart = echarts.init(document.getElementById('Echart_index_abnormal'));
                var option = {
                    color: ['#3398DB'],
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis : [
                        {
                            type : 'category',
                            data : legend,//动态
                            axisTick: {
                                alignWithLabel: true
                            }
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value'
                        }
                    ],
                    series : [
                        {
                            name:'单数',
                            type:'bar',
                            barWidth: '50%',
                            data:chartData//动态
                        }
                    ]
                };
                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
            },
            // 菜品(堂食) echart  初始化
            Echart_food(){
                var data_list=this.Echart_area_food;//实际渲染数据
                // 处理数据 
                var legend=[];//类名 展示
                var title='微信会员中心'; //图表标题   待处理
                var chartData=[];// 占比数据 
                for(var i=0,len=data_list.length;i<len;i++){
                    legend.push(data_list[i].name);//类名 展示
                    chartData.push({
                        name:data_list[i].name,
                        value:data_list[i].value,
                    })
                }
                // 基于准备好的dom，初始化echarts实例
                var myChart = echarts.init(document.getElementById('Echart_index_food'));
                var option = {
                    title : {
                        text: title,//动态
                        x:'center'
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{b} <br/>销量 : {c} <br/> 应收占比({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: legend //动态
                    },
                    series : [
                        {   
                            type: 'pie',
                            radius: ['30%', '70%'],
                            center: ['50%', '60%'],
                            data:chartData,//动态
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                };
                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
            },
            // 菜品分类 (堂食) echart  初始化
            Echart_Class(){
                var data_list=this.Echart_area_class;//实际渲染数据
                // 处理数据 
                var legend=[];//类名 展示
                var title='微信会员中心'; //图表标题   待处理
                var chartData=[];// 占比数据 
                for(var i=0,len=data_list.length;i<len;i++){
                    legend.push(data_list[i].name);//类名 展示
                    chartData.push({
                        name:data_list[i].name,
                        value:data_list[i].value,
                    })
                }
                // 基于准备好的dom，初始化echarts实例
                var myChart = echarts.init(document.getElementById('Echart_index_Class'));
                var option = {
                    title : {
                        text: title,//动态
                        x:'center'
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{b} <br/>销量 : {c} <br/> 应收占比({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: legend //动态
                    },
                    series : [
                        {   
                            type: 'pie',
                            radius: ['30%', '70%'],
                            center: ['50%', '60%'],
                            data:chartData,//动态
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                };
                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
            },
            // 营业额 echart  初始化
            Echart_area(){
                // 处理    图表 数据
                var echartData=this.Echart_area_data
                var X_list_tit=[];//x轴标题
                var Should=[];//应该收取金额
                var actual=[];//实际收取金额
                // 循环处理  数据列表
                for(var i=0,len=echartData.length;i<len;i++){
                    X_list_tit.push(echartData[i].name);//x轴标题
                    Should.push(echartData[i].ShouldMoney);//应该收取金额
                    actual.push(echartData[i].actualMoney);//实际收取金额
                }
                // 基于准备好的dom，初始化echarts实例
                var myChart = echarts.init(document.getElementById('Echart_index_area'));
                var option = {
                    color: ['#409EFF','#FFC125'],
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '3%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis : [
                        {
                            type : 'category',
                            data : X_list_tit,  //动态
                            axisTick: {
                                alignWithLabel: true
                            },
                            axisLabel: {
                                formatter: function(value) {
                                    var res = value;
                                    if(res.length > 7) {
                                        res = res.substring(0, 6) + "..";
                                    }
                                    return res;
                                }
                            }
                        }
                    ],
                    legend: {
                        data: ['应收金额', '实收金额']
                    },
                    yAxis : [
                        {
                            type : 'value',
                            axisLabel: {
                                formatter: '{value} ¥'
                            }
                        }
                    ],
                    series : [
                        {
                            name:'应收金额',
                            type:'bar',
                            barWidth: '40px',
                            data: Should //动态
                        },
                        {
                            name:'实收金额',
                            type:'bar',
                            barWidth: '40px',
                            data: actual //动态
                        }
                    ]
                };
                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
            }
        }
    }
</script>

<style scoped>
    .postPre{
        padding:10px;
    }
    .firstChild,.twoChild,.threeChild,.lastChild{
        float: left;
        display: inline-block;
        min-height: 100px;
        vertical-align: top;
        box-sizing: border-box;
    }
    .firstChild{
        border:none!important;
        width:18%;
        background:#0675eb;
    }
    .twoChild,.threeChild,.lastChild{
        width:27%;
    }
    .firstChild>div{
        display: inline-block;
        vertical-align: top;
    }
    .firstChild>div:first-child{
        width:45%;
        height:100px;
        text-align: right;
        line-height: 100px;
    }
    .firstChild>div:last-child{
        width:53%;
        height:100px;
        position: relative;
    }
    .firstChild img{
        height:60%;
        vertical-align: middle;
    }
    .centers_s{
        color:#fff;
        height:52px;
        position: absolute;
        left:10px;
        top:0;
        bottom:0;
        margin:auto;
    }
    .commonHeader_style_s{
        padding:0;
        cursor: pointer;
        overflow: hidden;
    }
    .commonHeader_style_s>.div{
        border-right:2px solid #eee;
    }
    .lastChild{
        border:none!important;
    }
    .commonChuild{
        text-align: center;
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        color:#666;
    }
    .money_font{
        font-size:23px;
        color:#333;
    }
    .title_header{
        padding:10px;
        font-size:16px;
        border-bottom: 1px solid #eee; 
    }
    .show_Echart_excel{
        padding:15px;
    }
</style>