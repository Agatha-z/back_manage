<!-- 交班信息表 -->
<template>
    <div class="postPre">
        <div class="commonHeader_style" style="height:auto;">
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
                        <label>交班人:</label>
                        <el-input style="width:220px;" size="medium" clearable placeholder="请输入交班人姓名"></el-input>
                    </div>
                    <div>
                        <label>交班类型</label>
                        <el-select style="width:220px;"  size="medium" v-model="name_in3"  placeholder="请选择">
                            <el-option label="明交班" :value="1"></el-option>
                            <el-option label="盲交班" :value="2"></el-option>
                        </el-select>
                    </div>
                    <div>
                        <label>交班状态</label>
                        <el-select style="width:220px;"  size="medium" v-model="name_in3" placeholder="请选择">
                            <el-option label="正常" :value="1"></el-option>
                            <el-option label="异常" :value="2"></el-option>
                        </el-select>
                    </div>
                </div>
            </div>
        </div>
        <!-- 表格主体 -->
        <div class="commonHeader_style table-container">
            <!--导出-->
            <el-button type="primary">导出</el-button>
            <!-- 数据 -->
            <div  style="margin-top:10px;">
                <table  class="table_list" border="0" cellspacing="0" >
                    <tr>
                        <th></th>
                        <th>机构名称</th>
                        <th>交班类型</th>
                        <th>交班状态</th>
                        <th>交班人</th>
                        <th>班次</th>
                        <th>营业时段</th>
                        <th>交班时间</th>
                        <th>营业实收</th>
                        <th>会员充值统计</th>
                        <th>操作</th>
                    </tr>
                    <tr v-for="(v,k) in data_list" :key="k">
                        <td>{{k+1}}</td>
                        <td>{{v.store}}</td>
                        <td>{{v.ban}}</td>
                        <td>{{v.state}}</td>
                        <td>{{v.person}}</td>
                        <td>{{v.banci}}</td>
                        <td>{{v.shiduan}}</td>
                        <td>{{v.jiaoban}}</td>
                        <td>{{v.num}}</td>
                        <td>{{v.num1}}</td>
                        <td>
                            <el-button type="primary" size="small" @click='operation(k)'>详情</el-button>
                        </td>
                    </tr>
                </table>
            </div>
            <!-- 无数据显示状态 -->
            <div class="el-table__empty-block " v-show="data_list.length==0">
                <span class="el-table__empty-text">暂无数据</span>
            </div>
            <!-- 分页 -->
            <div class="pagingBTN">
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
        <!--详情数据源弹框-->
        <div class="bounced_box" v-if="show_bounced">
            <transition name="animate_box">
                <div class="center_box" v-if="show_center" @click.stop>
                    <!-- 头部 -->
                    <div class="title" style='border:1px solid #ccc;'>交班明细</div>
                    <!--主体内容-->
                    <div class="handover_content">
                        <!-- 头部数据 -->
                        <div class="handover_detailTop">
                            <ul>
                                <li>
                                    <span class="left">当班时间:</span>
                                    <span class="right">2017-12-06&nbsp;07:57:04&nbsp;至&nbsp;2017-12-06&nbsp;07:57:04</span>
                                </li>
                                <li>
                                    <span class="left">营业时段:</span>
                                    <span class="right"></span>
                                </li>
                                <li>
                                    <span class="left">备用金额:</span>
                                    <span class="right">0</span>
                                </li>
                                <li>
                                    <span class="left">已收押金:</span>
                                    <span class="right">0</span>
                                </li>
                                <li>
                                    <span class="left">备注:</span>
                                    <span class="right"></span>
                                </li>
                            </ul>
                            <ul>
                                <li style="width:0;"></li>
                                <li>
                                    <span class="left">应收金额:</span>
                                    <span class="right">2253</span>
                                </li>
                                <li>
                                    <span class="left">交班现金金额:</span>
                                    <span class="right">2253</span>
                                </li>
                                <li>
                                    <span class="left">已用押金:</span>
                                    <span class="right">0</span>
                                </li>
                                <li></li>
                            </ul>
                            <ul>
                                <li>
                                    <span class="left">交班类型:</span>
                                    <span class="right">明交班</span>
                                </li>
                                <li>
                                    <span class="left">实收金额:</span>
                                    <span class="right">2253</span>
                                </li>
                                <li>
                                    <span class="left">交班现金短款:</span>
                                    <span class="right">0</span>
                                </li>
                                <li></li>
                                <li></li>
                            </ul>
                            <ul>
                                <li>
                                    <span class="left">交班状态:</span>
                                    <span class="right">正常</span>
                                </li>
                                <li>
                                    <span class="left">班前金额:</span>
                                    <span class="right">0</span>
                                </li>
                                <li>
                                    <span class="left">交班现金长款:</span>
                                    <span class="right">0</span>
                                </li>
                                <li></li>
                                <li></li>
                            </ul>
                        </div>
                        <!-- 中间表格数据 -->
                        <div style="margin-top:10px;">
                            <table  class='table_list' border="0" cellspacing="0">
                                <tr>
                                    <th>收款类型</th>
                                    <th>收款次数</th>
                                    <th>金额</th>
                                </tr>
                                <tr>
                                    <td>现金支付</td>
                                    <td>129</td>
                                    <td>2253.00</td>
                                </tr>
                            </table>
                        </div>
                        <!-- 底部数据 -->
                        <div class="handover_detailTop">
                            <ul>
                                <li>
                                    <span class="left">消费单数:</span>
                                    <span class="right">129</span>
                                </li>
                                <li>
                                    <span class="left">赠菜金额:</span>
                                    <span class="right">0</span>
                                </li>
                                <li>
                                    <span class="left">免单:</span>
                                    <span class="right">0</span>
                                </li>
                                <li>
                                    <span class="left">会员情况:</span>
                                    <span class="right"></span>
                                </li>
                                <li>
                                    <span class="left">会员开卡数:</span>
                                    <span class="right"></span>
                                </li>
                                <li>
                                    <span class="left">会员卡押金:</span>
                                    <span class="right"></span>
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    <span class="left">单均消费:</span>
                                    <span class="right">2253</span>
                                </li>
                                <li>
                                    <span class="left">折扣金额:</span>
                                    <span class="right">2253</span>
                                </li>
                                <li>
                                    <span class="left">菜品合计:</span>
                                    <span class="right">0</span>
                                </li>
                                <li></li>
                                <li>
                                    <span class="left">折扣金额:</span>
                                    <span class="right">2253</span>
                                </li>
                                <li>
                                    <span class="left">退款金额:</span>
                                    <span class="right">0</span>
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    <span class="left">消费人数:</span>
                                    <span class="right">129</span>
                                </li>
                                <li>
                                    <span class="left">抹零金额:</span>
                                    <span class="right">0</span>
                                </li>
                                <li>
                                    <span class="left">外卖结算金额:</span>
                                    <span class="right">0(美团￥0,饿了么￥0)</span>
                                </li>
                                <li></li>
                                <li>
                                    <span class="left">赠送金额:</span>
                                    <span class="right">0</span>
                                </li>
                                <li></li>
                            </ul>
                            <ul>
                                <li>
                                    <span class="left">人均消费:</span>
                                    <span class="right">17.47</span>
                                </li>
                                <li>
                                    <span class="left">服务费:</span>
                                    <span class="right">0</span>
                                </li>
                                <li></li>
                                <li></li>
                                <li>
                                    <span class="left">赠送积分:</span>
                                    <span class="right">0</span>
                                </li>
                                <li></li>
                            </ul>
                        </div>
                    </div>
                    <!-- 尾部 -->
                    <div style='text-align:center;margin-top:20px;'>
                        <!-- 确定按钮 -->
                        <el-button type="primary" @click='sureFade'>确定</el-button>
                    </div>
                </div>
            </transition>
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
                pageIndex:1,//当前页数
                pageSize:10,//每页显示条数
                name_in3:'',
                selecTitle:'更多筛选',
                isUnfold:false,
                show_bounced:false,//是否显示详情数据弹框
                show_center:false,//弹框内层框是否显示
                time:[
                    {time:'今天',show:false,},
                    {time:'7天',show:true,},
                    {time:'15天',show:true,},
                    {time:'30天',show:true,},
                ],
                data_list:[//数据渲染
                    {store:'安少爷米线（尚泽大都会店）',ban:'明交班',state:'正常',person:'吴艳艳',banci:'9',shiduan:'',jiaoban:'2012-12-12 14:00:00',num:'0.00',num1:'0',},
                    {store:'安少爷米线（尚泽大都会店）',ban:'明交班',state:'正常',person:'吴艳艳',banci:'9',shiduan:'',jiaoban:'2012-12-12 14:00:00',num:'0.00',num1:'0',},
                    {store:'安少爷米线（尚泽大都会店）',ban:'明交班',state:'正常',person:'吴艳艳',banci:'9',shiduan:'',jiaoban:'2012-12-12 14:00:00',num:'0.00',num1:'0',},
                    {store:'安少爷米线（尚泽大都会店）',ban:'明交班',state:'正常',person:'吴艳艳',banci:'9',shiduan:'',jiaoban:'2012-12-12 14:00:00',num:'0.00',num1:'0',},
                    {store:'安少爷米线（尚泽大都会店）',ban:'明交班',state:'正常',person:'吴艳艳',banci:'9',shiduan:'',jiaoban:'2012-12-12 14:00:00',num:'0.00',num1:'0',},
                    {store:'安少爷米线（尚泽大都会店）',ban:'明交班',state:'正常',person:'吴艳艳',banci:'9',shiduan:'',jiaoban:'2012-12-12 14:00:00',num:'0.00',num1:'0',},
                    {store:'安少爷米线（尚泽大都会店）',ban:'明交班',state:'正常',person:'吴艳艳',banci:'9',shiduan:'',jiaoban:'2012-12-12 14:00:00',num:'0.00',num1:'0',},
                    {store:'安少爷米线（尚泽大都会店）',ban:'明交班',state:'正常',person:'吴艳艳',banci:'9',shiduan:'',jiaoban:'2012-12-12 14:00:00',num:'0.00',num1:'0',},
                    {store:'安少爷米线（尚泽大都会店）',ban:'明交班',state:'正常',person:'吴艳艳',banci:'9',shiduan:'',jiaoban:'2012-12-12 14:00:00',num:'0.00',num1:'0',},

                ]
            }
        },
        watch:{
            // 监听动画 
            show_bounced(){
                if(this.show_bounced){
                    setTimeout(()=>{
                        this.show_center=true;
                    },0)
                }
            },
            show_center(){
                if(!this.show_center){
                    setTimeout(()=>{
                        this.show_bounced=false;
                    },200)
                }
            },
        },
        methods:{
            // pageSize 改变时会触发
            handleSizeChange(data){
                console.log(data)
                this.pageSize=data
            },
            // pageIndex改变事件
            handleCurrentChange(data){
                console.log(data)
                this.pageIndex=data
            },
            // 点击时间
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
            // 点击详情
            operation(k){
                this.show_bounced=true;
            },
            // 点击弹框确认按钮
            sureFade(){
                this.show_center=false;
            }
        },
        created(){
            console.log('交班信息表')
        }
    }
</script>

<style scoped>
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
    }
    /* 主题表格 */
    .table-container{
        margin-top:10px;
    }
    /* 暂无数据 */
    .el-table__empty-block{
        min-height: 60px;
        text-align: center;
    }
    /* 分页样式 */
    .pagingBTN{
        margin: 20px auto 0 25%;
    }
    /*详情数据弹框 */
    .handover_content{
        padding:0 10px;
    }
    .handover_detailTop{
        padding-top:10px;
        overflow: hidden;
    }
    .handover_detailTop>ul{
        width:25%;
        float: left;
        font-size:12px;
        color:#666666;
    }
    .handover_detailTop>ul li{
        font-size:14px;
        height:30px;
        line-height:30px;
        white-space:nowrap;
        color:#666;
    }
    .handover_detailTop>ul li span.left{
        display:inline-block;
        width:90px;
        text-align:right;
        margin-right:2px;
    }
</style>