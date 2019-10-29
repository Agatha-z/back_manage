<!-- 堂食时段账单 -->
<template>
    <div class="postPre">
        <div class="commonHeader_style">
            <!--头部搜索-->
            <div>
                <div class="grounp">
                    <div class="divs">
                        <label class="labelRight">时间</label>
                        <el-date-picker
                        size="large"
                        style="margin-right:10px;width:140px;float:left;"
                        v-model="value1"
                        type="date"
                        placeholder="选择日期">
                        </el-date-picker>
                        <label  class="labelRight">至</label>
                        <el-date-picker
                        v-model="value2"
                        style="width:140px;float:left;"
                        type="date"
                        placeholder="选择日期">
                        </el-date-picker>
                    </div>
                    <div class="labelTime divs">
                        <!-- <label v-for="(item,index) in time" :key="index"  :class="{selectColor:item.show==true}" @click="selectTime(index)">{{item.time}}</label> -->
                        <el-radio-group v-model="radio_in" @change='radioChange'>
                            <el-radio-button label="今天"></el-radio-button>
                            <el-radio-button label="7天"></el-radio-button>
                            <el-radio-button label="15天"></el-radio-button>
                            <el-radio-button label="30天"></el-radio-button>
                        </el-radio-group>
                    </div>
                    <!--更多筛选-->
                    <el-button type="primary"  style="float:right;margin-right:60px;" @click="filtrate" :class="isUnfold?'el-icon-arrow-up':'el-icon-arrow-down'">{{selecTitle}}</el-button>
                </div>
                <div  class="store">
                    <label>门店</label>
                    <div style="float:left;margin-right:106px;line-height:10px;">
                        <storeSelect ></storeSelect>
                    </div>
                    <el-button type="primary" size="small" icon="el-icon-search" @click="seachAndClear(1)" style="margin-left:10px;">搜索</el-button>
                    <el-button type="info"  size="small" icon="el-icon-refresh" @click="seachAndClear(2)">重置</el-button>
                </div>
                <div class="unfoldSelect" v-show="isUnfold">
                    <div>
                        <label>时段间隔：</label>
                        <el-select style="width:220px;"  size="medium" v-model="name_in3"  placeholder="请选择">
                            <el-option label="每30分钟" :value="1"></el-option>
                            <el-option label="每60分钟" :value="2"></el-option>
                            <el-option label="每2个小时" :value="2"></el-option>
                            <el-option label="每4个小时" :value="2"></el-option>
                        </el-select>
                    </div>
                    <div>
                        <label>时段：</label>
                        <div style="float:left;line-height:10px;margin-top:6px;">
                            <storeSelect :storeSelectData='storeSelectData2' :nowSelectOn="nowSelectOn2" :placeholder="[selectNum]"></storeSelect>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 账单 -->
        <div class="commonHeader_style total-area">
            <div class="item">
                <div class="label">账单总数</div>
                <div class="value">893</div>
            </div>
            <div class="item">
                <div class="label">消费总额</div>
                <div class="value">18,114.00</div>
            </div>
        </div>
        <!-- 表格数据 -->
        <div class="commonHeader_style table-container">
            <!--导出-->
            <el-button type="primary">导出</el-button>
            <div style="margin-top:10px;">
                <table class="table_list" border="0" cellspacing="0">
                    <tr>
                        <th></th>
                        <th>时段</th>
                        <th>账单总数</th>
                        <th>账单占比</th>
                        <th>消费金额</th>
                        <th>消费占比</th>
                        <th>单均</th>
                    </tr>
                    <tr v-for="(v,k) in data_list" :key="k">
                        <td>{{k+1}}</td>
                        <td>{{v.name1}}</td>
                        <td>{{v.name2}}</td>
                        <td>{{v.name3}}</td>
                        <td>{{v.name4}}</td>
                        <td>{{v.name5}}</td>
                        <td>{{v.name6}}</td>
                    </tr>
                </table>
            </div>
        </div>
        <!-- 图表 -->
        <div class="commonHeader_style" style='margin-top:20px;'>
            <!-- 图表容器 -->
            <div id="myChart" style="width:100%;height:500px;"></div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                radio_in:'今天',//今天，7天，15天，30天
                value1:'',//时间选择器1
                value2:'',//时间选择器2
                isUnfold:false,
                selecTitle:'更多筛选',
                name_in3:'',
                selectNum:'已选择24个时段',
                nowSelectOn2:[],//时段默认选中数组
                time:[
                    {time:'今天',show:false,},
                    {time:'7天',show:true,},
                    {time:'15天',show:true,},
                    {time:'30天',show:true,},
                ],
                storeSelectData2:[//门店下拉菜单数据
                    //组件传值
                    {
                    name: "全部",
                    id: "1",
                    children: [
                        { name: "00:00-01:00", id: "1-1" },
                        { name: "01:00-02:00", id: "1-2" },
                        { name: "02:00-03:00", id: "1-3" },
                        { name: "03:00-04:00", id: "1-4" },
                        { name: "04:00-05:00", id: "1-5" },
                        { name: "05:00-06:00", id: "1-6" },
                        { name: "06:00-07:00", id: "1-7" },
                        { name: "07:00-08:00", id: "1-8" },
                        { name: "09:00-10:00", id: "1-9" },
                        { name: "10:00-11:00", id: "1-10" },
                        { name: "11:00-12:00", id: "1-11" },
                        { name: "12:00-13:00", id: "1-12" },
                        { name: "13:00-14:00", id: "1-13" },
                        { name: "14:00-15:00", id: "1-14" },
                        { name: "15:00-16:00", id: "1-15" },
                        { name: "16:00-17:00", id: "1-16" },
                        { name: "17:00-18:00", id: "1-17" },
                        { name: "18:00-19:00", id: "1-18" },
                        { name: "19:00-20:00", id: "1-19" },
                        { name: "20:00-21:00", id: "1-20" },
                        { name: "21:00-22:00", id: "1-21" },
                        { name: "22:00-23:00", id: "1-22" },
                        { name: "23:00-00:00", id: "1-23" },
                    ]
                    }
                ],
                data_list:[//表格数据渲染
                 {name1:'09:00-10:00',name2:'11 ',name3:'1.23%',name4:'255.00',name5:'1.41%',name6:'23.18'},
                 {name1:'09:00-10:00',name2:'11 ',name3:'1.23%',name4:'255.00',name5:'1.41%',name6:'23.18'},
                 {name1:'09:00-10:00',name2:'11 ',name3:'1.23%',name4:'255.00',name5:'1.41%',name6:'23.18'},
                 {name1:'09:00-10:00',name2:'11 ',name3:'1.23%',name4:'255.00',name5:'1.41%',name6:'23.18'},
                 {name1:'09:00-10:00',name2:'11 ',name3:'1.23%',name4:'255.00',name5:'1.41%',name6:'23.18'},
                 {name1:'09:00-10:00',name2:'11 ',name3:'1.23%',name4:'255.00',name5:'1.41%',name6:'23.18'},
                 {name1:'09:00-10:00',name2:'11 ',name3:'1.23%',name4:'255.00',name5:'1.41%',name6:'23.18'},
                 {name1:'09:00-10:00',name2:'11 ',name3:'1.23%',name4:'255.00',name5:'1.41%',name6:'23.18'},
                ],
                // Echart_area_abnormal:[ //时段账单统计图表
                //     {name:'9:00-10:00',value:11},
                //     {name:'10:00-11:00',value:29},
                // ]
            }
        },
        methods:{
            // 单选框时间选择事件
            radioChange(e){
                console.log(e)
            },
            // 点击更多筛选
            filtrate(){
                if(this.isUnfold){
                    this.selecTitle='更多筛选';
                    this.isUnfold=!this.isUnfold;
                }else{
                    this.selecTitle='收起筛选';
                    this.isUnfold=!this.isUnfold;
                }
            },
            // 时段账单统计图表
            Echart_abnormal(){
                // var data_list=this.Echart_area_abnormal;//实际渲染数据
                 // 处理数据 
                // var legend=[];//类名 展示
                // var chartData=[];// 数据 
                // for(var i=0,len=data_list.length;i<len;i++){
                //     legend.push(data_list[i].name);//类名 展示
                //     chartData.push(data_list[i].value)
                // }
                // 基于准备好的dom，初始化echarts实例
                var myChart = echarts.init(document.getElementById('myChart'));
                var option = {
                    title : {
                        text: '时段账单统计',
                    },
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                       // 右边点击选择
                    legend: {
                        orient: 'vertical ',
                        x: 'right',
                        y : '30%',
                        align: 'right',
                        data:['账单总数','消费总额','单均',],
                        selected:{
                            '账单总数':true,
                            '消费总额':false,
                            '单均':false,
                        }
                    },
                    toolbox: {
                        show : true,
                        feature : {
                            magicType : {show: true, type: ['line', 'bar']},
                            restore : {show: true},
                            saveAsImage : {show: true}
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '10%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis : [
                        {
                            type : 'category',
                            data : ['9:00-10:00','10:00-11:00','11:00-12:00']
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value'
                        }
                    ],
                    series : [
                        {
                            name:'账单总数',
                            type:'bar',
                            color:'#04c0f1',
                            data:[11, 29,9]
                        },
                        {
                            name:'消费总额',
                            type:'bar',
                            color:'#24ddd3',
                            data:[183.00, 554.00,199.00,]
                        },
                        {
                            name:'单均',
                            type:'bar',
                            color:'#2589ff',
                            data:[16.64, 19.00,16.11]
                        },
                    ],
                };
                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
            }
        },
        created(){
            // 默认选中所有门店
            for(var i=0;i<this.storeSelectData2[0].children.length;i++){
                this.nowSelectOn2.push(this.storeSelectData2[0].children[i].id)
            }
            var length2=this.nowSelectOn2.length+1;
            this.selectNum='已选择'+length2+'个时段';
            console.log('堂食时段账单')
        },
        mounted(){
            // 定时器防止刷新路由 图表异常（不出现）
            setTimeout(()=>{
                // 时段账单统计图表
                this.Echart_abnormal()
            },550)
        },
    }
</script>

<style scoped>
/* 头部搜索 */
    .postPre{
        padding:10px;
    }
    .grounp{
        height:60px;
    }
    .grounp>div{
        float: left;
        height:50px;
    }
    .divs{
        line-height:50px;
        margin-right:90px;
    }
    .grounp>div label{
        float: left;
        font-size:18px;
        cursor: pointer;
    }
    .grounp>div label.labelRight{
        margin-right:10px;
        font-weight:bold;
    }
    /* div.labelTime label{
        border:1px solid #ccc;
        height:40px;
        line-height:40px;
        padding:0 20px;
        margin-top:3px;
    }
    div.labelTime label:last-child{
        margin-right:0;
    }
    .divs label.selectColor{
        background-color: #016cdf;
        color:#fff;
    } */
    .store{
        height:50px;
        margin-top:10px;
    }
    .store label{
        float: left;
        font-size:18px;
        font-weight:bold;
        margin-right:10px;
        align-items:center;
    }
    .unfoldSelect{
        height:50px;
        line-height:50px;
    }
    .unfoldSelect>div{
        float: left;
        height:50px;
        line-height:50px;
        margin-right:60px;
    }
    .unfoldSelect>div label{
        font-weight:bold;
        font-size:18px;
        margin-right:10px;
        float: left;
    }
/* 消费账单总数 */
.total-area{
    height:80px;
    margin:20px 0;
    padding:15px 0;
    box-sizing:border-box;
}
.total-area .item{
   float: left;
   width:49%;
   height:50px;
   text-align: center;
}
.total-area .item div{
    font-size:16px;
}
.total-area .item div.value{
    font-weight:bold;
    margin-top:10px;
}
.total-area .item:first-child{
  border-right:1px solid #cccccc;
}
</style>