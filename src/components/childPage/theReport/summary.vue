<!-- 营业收入汇总表 -->
import { format } from 'path';
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
                        style="margin-right:20px;width:180px;float:left;"
                        v-model="value1"
                        type="date"
                        placeholder="选择日期">
                        </el-date-picker>
                        <label  class="labelRight">至</label>
                        <el-date-picker
                        v-model="value2"
                        style="width:180px;float:left;"
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
                </div>
                <div  class="store">
                    <label>门店</label>
                    <div style="float:left;margin-right:80px;">
                        <storeSelect :inputWidth='290'></storeSelect>
                    </div>
                    <el-button type="primary" size="small" icon="el-icon-search" @click="seachAndClear(1)" style="margin-left:10px;">搜索</el-button>
                    <el-button type="info"  size="small" icon="el-icon-refresh" @click="seachAndClear(2)">重置</el-button>
                </div>
            </div>
        </div>
        <!-- 导航-->
        <div class="total-area commonHeader_style">
            <div class="el-col">
                <div class="label">应收</div>
                <div class="value">19,605.90</div>
            </div>
            <span class="line"></span>
            <div class="el-col">
                <div class="label">实收</div>
                <div class="value">20,606.47</div>
            </div>
            <span class="line"></span>
            <div class="el-col">
                <div class="label">外卖结算金额
                    <!-- 问号提示文字 -->
                    <el-tooltip placement="top-start">
                        <div slot="content">因结算金额涉及多种场景（配送追加小费、餐损赔付、公益捐款信息等），此处结算金额仅作参考，结算金额以外卖平台为准。建议您通过商家端对账模块查询。</div>
                        <el-button style="padding:0;background:none;font-size:0px;width:0;height:0;"><i class="el-icon-question" style="color: #016cdf;font-size:16px;margin-left:2px;"></i></el-button>
                    </el-tooltip>
                </div>
                <div class="value">2,125.45</div>
            </div>
             <span class="line"></span>
            <div class="el-col">
                <div class="label">优免</div>
                <div class="value">1,293.13</div>
            </div>
             <span class="line"></span>
            <div class="el-col">
                <div class="label">挂账金额</div>
                <div class="value">0.00</div>
            </div>
             <span class="line"></span>
            <div class="el-col">
                <div class="label">赠菜</div>
                <div class="value">0.00</div>
            </div>
             <span class="line"></span>
            <div class="el-col">
                <div class="label">服务费</div>
                <div class="value">0.00</div>
            </div>
             <span class="line"></span>
            <div class="el-col">
                <div class="label">总人数</div>
                <div class="value">952</div>
            </div>
             <span class="line"></span>
            <div class="el-col">
                <div class="label">总单数</div>
                <div class="value">952</div>
            </div>
             <span class="line"></span>
            <div class="el-col">
                <div class="label">单均消费</div>
                <div class="value">18.65</div>
            </div>
             <span class="line"></span>
            <div class="el-col">
                <div class="label">人均消费</div>
                <div class="value">18.65</div>
            </div>
        </div>
        <!--数据-->
        <div class="table-container commonHeader_style">
            <!--导出按钮-->
            <el-button type="primary">导出</el-button>
            <div class="table_wrap">
                <div class="table-content">
                    <table border="0" cellspacing="0">
                        <!--表头第一行-->
                        <tr>
                            <th rowspan="2" style="width:30px;"></th>
                            <th rowspan="2" style="width:150px;">机构名称</th>
                            <th rowspan="2">应收</th>
                            <th rowspan="2">实收</th>
                            <th rowspan="2">服务费</th>
                            <th rowspan="2">菜品收入</th>

                            <th colspan="2">
                                外卖结算金额
                                <!-- 问号提示文字 -->
                                <el-tooltip placement="top-start">
                                    <div slot="content">因结算金额涉及多种场景（配送追加小费、餐损赔付、公益捐款信息等），此处结算金额仅作参考，结算金额以外卖平台为准。建议您通过商家端对账模块查询。</div>
                                    <el-button style="padding:0;background:none;font-size:0px;width:0;height:0;"><i class="el-icon-question" style="color: #016cdf;font-size:16px;margin-left:8px;"></i></el-button>
                                </el-tooltip>
                            </th>
                            <th colspan="17">优免</th>

                            <th rowspan="2">现金</th>
                            <th rowspan="2">刷卡</th>
                            <th rowspan="2">会员主账户消费</th>
                            <th rowspan="2">优惠卷</th>
                            <th rowspan="2">团购卷</th>
                            <th rowspan="2">挂账</th>
                            <th rowspan="2">支付宝</th>
                            <th rowspan="2">微信</th>

                            <th colspan="2">第三方支付</th>

                            <th rowspan="2">消费人数</th>
                            <th rowspan="2">人均消费</th>
                            <th rowspan="2">结账单数</th>
                            <th rowspan="2">单均消费</th>

                            <th colspan="4">其他收款</th>
                        </tr>
                        <!--表头 第二行 -->
                        <tr>
                            <th>美团</th>
                            <th>饿了么</th>
                            <th>全单折</th>
                            <th>方案折</th>
                            <th>会员折</th>
                            <th>菜品折</th>  
                            
                            <th>套餐优惠</th>
                            <th>免单</th>

                            <th>赠送菜品</th>
                            <th>自动抹零</th>
                            <th>手动抹零</th>
                            <th>会员价</th>
                            <th>会员储值赠送消费</th>
                            <th>会员积分抵现</th>
                            <th>优惠劵优免</th>
                            <th>团购劵优免</th>
                            <th>红包抵现</th>
                            <th>外卖优免</th>
                            <th>预点餐优免</th>
                            <th>第三方</th>
                            <th>美团点评预点餐</th>
                            <th>会员充值</th>
                            <th>会员退款</th>
                            <th>挂账收款</th>
                            <th>挂账减免</th>
                        </tr>
                        <tr v-for="(v,k) in data_list" :key="k">
                            <td>{{k+1}}</td>
                            <td>{{v.store}}</td>
                            <td>{{v.n1}}</td>
                            <td>{{v.n2}}</td>
                            <td>{{v.n3}}</td>
                            <td>{{v.n4}}</td>
                            <td>{{v.n5}}</td>
                            <td>{{v.n6}}</td>
                            <td>{{v.n7}}</td>
                            <td>{{v.n8}}</td>
                            <td>{{v.n9}}</td>
                            <td>{{v.n10}}</td> 
                            <td>{{v.n11}}</td>
                            <td>{{v.n12}}</td>
                            <td>{{v.n13}}</td>
                            <td>{{v.n14}}</td>
                            <td>{{v.n15}}</td>       
                            <td>{{v.n16}}</td>
                            <td>{{v.n17}}</td>

                            <td>{{v.n18}}</td>
                            <td>{{v.n19}}</td>
                            <td>{{v.n20}}</td>
                            <td>{{v.n21}}</td>
                            <td>{{v.n22}}</td>
                            <td>{{v.n23}}</td>
                            <td>{{v.n24}}</td>
                            <td>{{v.n25}}</td> 
                            <td>{{v.n26}}</td>
                            <td>{{v.n27}}</td>
                            <td>{{v.n28}}</td>
                            <td>{{v.n29}}</td>
                            <td>{{v.n30}}</td>       
                            <td>{{v.n31}}</td>
                            <td>{{v.n32}}</td>    
                            <td>{{v.n33}}</td>       
                            <td>{{v.n34}}</td>
                            <td>{{v.n35}}</td>   
                            <td>{{v.n36}}</td>       
                            <td>{{v.n37}}</td>
                            <td>{{v.n38}}</td>    
                            <td>{{v.n39}}</td>       
                            <td>{{v.n40}}</td>
                            <td>{{v.n41}}</td>  
                        </tr>
                    </table>
                </div>
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
                tabel_left:[// 表格左边固定数据
                    {store:'安少爷米线（尚泽大都会店）',},{store:'安少爷米线（绿地瀛海店）',},{store:'安少爷米线（天玥中心店）',},{store:'安少爷米线（万达茂店）',},{store:'安少爷米线（保利店）',},{store:'安少爷米线（天鹅湖店）',},{store:'安少爷米线（商之都店）',},{store:'安少爷米线（新华国际店）',},{store:'安少爷米线（步行街百盛店）',},{store:'安少爷米线（尚泽大都会店）',},
                ],
                data_list:[//表格渲染数据
                    {store:'安少爷米线（尚泽大都会店）',n1:'0.00',n2:'0.00',n3:'0.00',n4:'0.00',n5:'0.00',n6:'0.00',n7:'0.00',n8:'0.00',n9:'0.00',n10:'0.00',n11:'0.00',n12:'0.00',n13:'0.00',n14:'0.00',n15:'0.00',n16:'0.00',n17:'0.00',n18:'0.00',n19:'0.00',n20:'0.00',n21:'0.00',n22:'0.00',n23:'0.00',n24:'0.00',n25:'0.00',n26:'0.00',n27:'0.00',n28:'0.00',n29:'0.00',n30:'0.00',n31:'0.00',n32:'0.00',n33:'0.00',n34:'0.00',n35:'0.00',n36:'0.00',n37:'0.00',n38:'0.00',n39:'0.00',n40:'0.00',n41:'0.00',n42:'0.00'},
                    {store:'安少爷米线（尚泽大都会店）',n1:'0.00',n2:'0.00',n3:'0.00',n4:'0.00',n5:'0.00',n6:'0.00',n7:'0.00',n8:'0.00',n9:'0.00',n10:'0.00',n11:'0.00',n12:'0.00',n13:'0.00',n14:'0.00',n15:'0.00',n16:'0.00',n17:'0.00',n18:'0.00',n19:'0.00',n20:'0.00',n21:'0.00',n22:'0.00',n23:'0.00',n24:'0.00',n25:'0.00',n26:'0.00',n27:'0.00',n28:'0.00',n29:'0.00',n30:'0.00',n31:'0.00',n32:'0.00',n33:'0.00',n34:'0.00',n35:'0.00',n36:'0.00',n37:'0.00',n38:'0.00',n39:'0.00',n40:'0.00',n41:'0.00',n42:'0.00'},
                    {store:'安少爷米线（尚泽大都会店）',n1:'0.00',n2:'0.00',n3:'0.00',n4:'0.00',n5:'0.00',n6:'0.00',n7:'0.00',n8:'0.00',n9:'0.00',n10:'0.00',n11:'0.00',n12:'0.00',n13:'0.00',n14:'0.00',n15:'0.00',n16:'0.00',n17:'0.00',n18:'0.00',n19:'0.00',n20:'0.00',n21:'0.00',n22:'0.00',n23:'0.00',n24:'0.00',n25:'0.00',n26:'0.00',n27:'0.00',n28:'0.00',n29:'0.00',n30:'0.00',n31:'0.00',n32:'0.00',n33:'0.00',n34:'0.00',n35:'0.00',n36:'0.00',n37:'0.00',n38:'0.00',n39:'0.00',n40:'0.00',n41:'0.00',n42:'0.00'},
                    {store:'安少爷米线（尚泽大都会店）',n1:'0.00',n2:'0.00',n3:'0.00',n4:'0.00',n5:'0.00',n6:'0.00',n7:'0.00',n8:'0.00',n9:'0.00',n10:'0.00',n11:'0.00',n12:'0.00',n13:'0.00',n14:'0.00',n15:'0.00',n16:'0.00',n17:'0.00',n18:'0.00',n19:'0.00',n20:'0.00',n21:'0.00',n22:'0.00',n23:'0.00',n24:'0.00',n25:'0.00',n26:'0.00',n27:'0.00',n28:'0.00',n29:'0.00',n30:'0.00',n31:'0.00',n32:'0.00',n33:'0.00',n34:'0.00',n35:'0.00',n36:'0.00',n37:'0.00',n38:'0.00',n39:'0.00',n40:'0.00',n41:'0.00',n42:'0.00'},
                    {store:'安少爷米线（尚泽大都会店）',n1:'0.00',n2:'0.00',n3:'0.00',n4:'0.00',n5:'0.00',n6:'0.00',n7:'0.00',n8:'0.00',n9:'0.00',n10:'0.00',n11:'0.00',n12:'0.00',n13:'0.00',n14:'0.00',n15:'0.00',n16:'0.00',n17:'0.00',n18:'0.00',n19:'0.00',n20:'0.00',n21:'0.00',n22:'0.00',n23:'0.00',n24:'0.00',n25:'0.00',n26:'0.00',n27:'0.00',n28:'0.00',n29:'0.00',n30:'0.00',n31:'0.00',n32:'0.00',n33:'0.00',n34:'0.00',n35:'0.00',n36:'0.00',n37:'0.00',n38:'0.00',n39:'0.00',n40:'0.00',n41:'0.00',n42:'0.00'},
                    {store:'安少爷米线（尚泽大都会店）',n1:'0.00',n2:'0.00',n3:'0.00',n4:'0.00',n5:'0.00',n6:'0.00',n7:'0.00',n8:'0.00',n9:'0.00',n10:'0.00',n11:'0.00',n12:'0.00',n13:'0.00',n14:'0.00',n15:'0.00',n16:'0.00',n17:'0.00',n18:'0.00',n19:'0.00',n20:'0.00',n21:'0.00',n22:'0.00',n23:'0.00',n24:'0.00',n25:'0.00',n26:'0.00',n27:'0.00',n28:'0.00',n29:'0.00',n30:'0.00',n31:'0.00',n32:'0.00',n33:'0.00',n34:'0.00',n35:'0.00',n36:'0.00',n37:'0.00',n38:'0.00',n39:'0.00',n40:'0.00',n41:'0.00',n42:'0.00'},
                    {store:'安少爷米线（尚泽大都会店）',n1:'0.00',n2:'0.00',n3:'0.00',n4:'0.00',n5:'0.00',n6:'0.00',n7:'0.00',n8:'0.00',n9:'0.00',n10:'0.00',n11:'0.00',n12:'0.00',n13:'0.00',n14:'0.00',n15:'0.00',n16:'0.00',n17:'0.00',n18:'0.00',n19:'0.00',n20:'0.00',n21:'0.00',n22:'0.00',n23:'0.00',n24:'0.00',n25:'0.00',n26:'0.00',n27:'0.00',n28:'0.00',n29:'0.00',n30:'0.00',n31:'0.00',n32:'0.00',n33:'0.00',n34:'0.00',n35:'0.00',n36:'0.00',n37:'0.00',n38:'0.00',n39:'0.00',n40:'0.00',n41:'0.00',n42:'0.00'},
                    {store:'安少爷米线（尚泽大都会店）',n1:'0.00',n2:'0.00',n3:'0.00',n4:'0.00',n5:'0.00',n6:'0.00',n7:'0.00',n8:'0.00',n9:'0.00',n10:'0.00',n11:'0.00',n12:'0.00',n13:'0.00',n14:'0.00',n15:'0.00',n16:'0.00',n17:'0.00',n18:'0.00',n19:'0.00',n20:'0.00',n21:'0.00',n22:'0.00',n23:'0.00',n24:'0.00',n25:'0.00',n26:'0.00',n27:'0.00',n28:'0.00',n29:'0.00',n30:'0.00',n31:'0.00',n32:'0.00',n33:'0.00',n34:'0.00',n35:'0.00',n36:'0.00',n37:'0.00',n38:'0.00',n39:'0.00',n40:'0.00',n41:'0.00',n42:'0.00'},
                    {store:'安少爷米线（尚泽大都会店）',n1:'0.00',n2:'0.00',n3:'0.00',n4:'0.00',n5:'0.00',n6:'0.00',n7:'0.00',n8:'0.00',n9:'0.00',n10:'0.00',n11:'0.00',n12:'0.00',n13:'0.00',n14:'0.00',n15:'0.00',n16:'0.00',n17:'0.00',n18:'0.00',n19:'0.00',n20:'0.00',n21:'0.00',n22:'0.00',n23:'0.00',n24:'0.00',n25:'0.00',n26:'0.00',n27:'0.00',n28:'0.00',n29:'0.00',n30:'0.00',n31:'0.00',n32:'0.00',n33:'0.00',n34:'0.00',n35:'0.00',n36:'0.00',n37:'0.00',n38:'0.00',n39:'0.00',n40:'0.00',n41:'0.00',n42:'0.00'},
                    {store:'安少爷米线（尚泽大都会店）',n1:'0.00',n2:'0.00',n3:'0.00',n4:'0.00',n5:'0.00',n6:'0.00',n7:'0.00',n8:'0.00',n9:'0.00',n10:'0.00',n11:'0.00',n12:'0.00',n13:'0.00',n14:'0.00',n15:'0.00',n16:'0.00',n17:'0.00',n18:'0.00',n19:'0.00',n20:'0.00',n21:'0.00',n22:'0.00',n23:'0.00',n24:'0.00',n25:'0.00',n26:'0.00',n27:'0.00',n28:'0.00',n29:'0.00',n30:'0.00',n31:'0.00',n32:'0.00',n33:'0.00',n34:'0.00',n35:'0.00',n36:'0.00',n37:'0.00',n38:'0.00',n39:'0.00',n40:'0.00',n41:'0.00',n42:'0.00'},
                    {store:'安少爷米线（尚泽大都会店）',n1:'0.00',n2:'0.00',n3:'0.00',n4:'0.00',n5:'0.00',n6:'0.00',n7:'0.00',n8:'0.00',n9:'0.00',n10:'0.00',n11:'0.00',n12:'0.00',n13:'0.00',n14:'0.00',n15:'0.00',n16:'0.00',n17:'0.00',n18:'0.00',n19:'0.00',n20:'0.00',n21:'0.00',n22:'0.00',n23:'0.00',n24:'0.00',n25:'0.00',n26:'0.00',n27:'0.00',n28:'0.00',n29:'0.00',n30:'0.00',n31:'0.00',n32:'0.00',n33:'0.00',n34:'0.00',n35:'0.00',n36:'0.00',n37:'0.00',n38:'0.00',n39:'0.00',n40:'0.00',n41:'0.00',n42:'0.00'},
                ],
                time:[
                    {time:'今天',show:false,},
                    {time:'7天',show:true,},
                    {time:'15天',show:true,},
                    {time:'30天',show:true,},
                ]
            }
        },
        methods:{
            // 单选框时间选择事件
            radioChange(e){
                console.log(e)
            },
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
        },
        created(){
            console.log('营业收入汇总表')
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
    }
    .store label{
        float: left;
        font-size:18px;
        font-weight:bold;
        margin-right:10px;
        align-items:center;
    }
    /* 导航 */
    .total-area {
        margin-top:10px;
        height:100px;
        padding:30px 0;
        padding-left:40px;
        box-sizing:border-box;
    }
    .total-area span.line{
        display:inline-block;
        float: left;
        height:36px;
        width:1px;
        background:#ccc;
        margin-top:4px;
    }
    .total-area .el-col{
        width:8%;
        float: left;
        height:45px;
    }
    .total-area .el-col .label,.value{
        text-align:center;
        font-size:14px;
    }
    .total-area .el-col .value{
        margin-top:6px;
    }
    /* 数据 */
    .table_wrap{
        width:100%;
        overflow: hidden;
        margin-top:10px;
    }
    .table-content{
        width:100%;
        overflow-x: auto;
    }
    .table-content table{
        width: 3478px;
        border:1px solid #ccc;
    }
    .table-content table td,th{
        width:70px;
        height:60px;
        text-align:center;
    }
    .table-content table th{
        background:#eee;
    }
    .table-content table tr>th,table tr>td{
        border-right:1px solid #ccc;
        font-size:14px;
    }
    table>tr>td,th{
        border-top:1px solid #ccc;
    }
    table>tr:hover{
        background:rgba(240,250,255)
    }
    .pageBtn{
        margin: 20px auto 0 25%;
    }
</style>