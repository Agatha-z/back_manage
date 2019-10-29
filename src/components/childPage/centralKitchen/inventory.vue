<!-- 盘点管理 -->
import { constants } from 'http2';
<template>
    <div class="postPre">
 <!-- =============================================================主页面-->
            <div class="inventory" v-show="inventoryShow">
                <div class="commonHeader_style">
                    <div class="inventory-top">
                        <div class="item">
                            <span style="font-size:18px;font-weight:600;">单据号</span>
                            <el-input style="margin-right:20px;width:200px;" size="medium" clearable></el-input>
                            <!--  -->
                            <span style="font-size:18px;font-weight:600;">采购日期</span>
                            <el-date-picker
                            size="large"
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
                            <!--  -->
                            <el-button type="primary" size="small" icon="el-icon-search" @click="seachAndClear(1)" style="margin-left:10px;">搜索</el-button>
                            <el-button type="info"  size="small" icon="el-icon-refresh" @click="seachAndClear(2)">重置</el-button>
                        </div>
                        <div class="item" style="margin-top:20px;">
                            <span style="font-size:18px;font-weight:600;">盘点类型</span>
                            <el-select style="width:200px;margin-right:60px;"  v-model="name_in1" placeholder="请选择">
                                <el-option label="日盘点" value="1"></el-option>
                                <el-option label="周盘点" value="2"></el-option>
                                <el-option label="月盘点" value="3"></el-option>
                                <el-option label="其他盘点" value="4"></el-option>
                            </el-select>
                        </div>
                    </div>
                </div>
                <div class="inventory-main commonHeader_style" style="margin-top:10px;">
                    <!--新增盘点单-->
                    <el-button type="primary"  @click="append" style="margin-bottom:10px;">新增盘点单</el-button>
                    <br>
                    <!-- 主页面数据 -->
                    <div>
                        <table class="table_list" border="0" cellspacing="0">
                            <tr>
                                <th></th>
                                <th>单据号</th>
                                <th>盘点类型</th>
                                <th>仓库名称</th>
                                <th>盘点日期</th>
                                <th>未盘处理</th>
                                <th>状态</th>
                                <th>操作时间</th>
                                <th>操作</th>
                            </tr>
                            <tr v-for="(v,k) in data_list" :key="k">
                                <td>{{k+1}}</td>
                                <td>{{v.brand}}</td>
                                <td>{{v.formats}}</td>
                                <td>{{v.name}}</td>
                                <td>{{v.time}}</td>
                                <td>{{v.ontime}}</td>
                                <td>{{v.statue}}</td>
                                <td>{{v.optime}}</td>
                                <td>
                                    <el-button type="primary" size="small" icon="el-icon-search"  @click="operation(k,v)">查看</el-button>
                                       <!--新增盘点单点击保存草稿以后显示-->
                                    <div v-show="false">
                                        <el-button type="primary" size="small" icon="el-icon-edit"   @click="operation(k,v)">编辑</el-button>
                                        <el-button type="primary" size="small" icon="el-icon-delete" @click="operation(k,v)">删除</el-button>
                                    </div>
                                </td>
                            </tr>
                            <!-- 无数据显示 -->
                            <tr v-if="data_list.length<=0">
                                <td colspan="9">
                                    <p style="color:#999">暂无更多数据</p>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <!--分页-->
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
 <!-- =============================================================查看详情页面-->
            <!--点击查看详情-->
            <div class="commonHeader_style checkDetail" v-show="checkShow">
                <!--头部-->
                <div class="checkTop">
                    <div class="item">
                        <!--  -->
                        <div style="flex:2;display:flex;align-items:center;">
                            <label class="fl">盘点仓库</label>
                            <el-select style="width:200px;margin-right:20px;" size="medium" clearable placeholder="产成品仓"   :disabled="disable">
                                <el-option label="产成品仓" value="1"></el-option>
                                <el-option label="低值易耗品仓" value="2"></el-option>
                                <el-option label="百货用品仓" value="3"></el-option>
                                <el-option label="原材料仓" value="4"></el-option>
                            </el-select>
                            <!--  -->
                            <label style="margin-right:20px;">盘点类型</label>
                            <el-select style="width:210px;margin-right:20px;"  v-model="name_in2" placeholder="月盘点"  :disabled="disable">
                                <el-option label="日盘点" value="1"></el-option>
                                <el-option label="周盘点" value="2"></el-option>
                                <el-option label="月盘点" value="3"></el-option>
                                <el-option label="其他盘点" value="4"></el-option>
                            </el-select>
                            <!--  -->
                            <label  style="margin-right:20px;">盘点日期</label>               
                            <el-date-picker
                            disabled
                            size="large"
                            style="margin-right:30px;"
                            v-model="value3"
                            type="date"
                            placeholder="2018-9-24">
                            </el-date-picker>
                        </div>
                    </div>
                    <div class="item">
                        <label class="fl">未盘处理</label>
                        <label class="radio-inline radio-group fl" >
                            <input  name="dealWith"  type="radio" :disabled="disable" :checked="selected"><span>按库存处理</span>
                        </label>
                        <label class="radio-inline radio-group fl">
                            <input  name="dealWith"   type="radio" :disabled="disable" :checked="selected" ><span>按零处理</span>
                        </label>
                    </div>
                    <div class="item">
                        <label class="fl">填写备注</label> 
                        <div style="line-height:12px;border-bottom:1px solid #e5e8ea;width:90%;" class="fl">
                            <textarea   placeholder="在此填写备注信息"  :readonly='disable' class="form-control" maxlength="150" ></textarea>
                        </div>
                    </div>
                </div>
                <!--查看详情数据 -->
                <div>
                    <table class="table_list" border="0" cellspacing="0">
                        <tr>
                            <th></th>
                            <th>物品编码</th>
                            <th>物品名称</th>
                            <th>规格型号</th>
                            <th>库存单位</th>
                            <th>理论数</th>
                            <th>实盘数</th>
                            <th>实盘金额</th>
                            <th>理论差异</th>
                            <th>差异金额</th>
                            <th>盘点标识</th>
                            <th>备注</th>
                        </tr>
                        <tr v-for="(v,k) in check_list" :key="k">
                            <td>{{k+1}}</td>
                            <td>{{v.brand}}</td>
                            <td>{{v.formats}}</td>
                            <td>{{v.name}}</td>
                            <td>{{v.time}}</td>
                            <td>{{v.ontime}}</td>
                            <td>{{v.statue}}</td>
                            <td>{{v.optime}}</td>
                            <td>{{v.ddii}}</td>
                            <td>{{v.moneny}}</td>
                            <td>{{v.biao}}</td>
                            <td>{{v.bei}}</td>
                        </tr>
                        <!-- 无数据显示 -->
                        <tr v-if="data_list.length<=0">
                            <td colspan="12">
                                <p style="color:#999">暂无更多数据</p>
                            </td>
                        </tr>
                    </table>
                </div>
                <!--底部打印与取消-->
                <div class="checkBottom" style="margin-top:20px;display:flex;">
                    <el-button type="primary" style="margin-right:20px;" v-if="disable" class="fl">打印</el-button>
                    <div v-else class="fl">
                        <el-button type="primary" class="fl"> 保存草稿</el-button>
                        <el-button type="success" style="margin-right:20px;" class="fl">完成</el-button>
                    </div>
                    <el-button type="info" @click="cancel" class="fl">取消</el-button>
                </div>
            </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                value1:'',//时间选择器1
                value2:'',//时间选择器2
                value3:'',//查看详情时间选择器3
                name_in1:'',//顶部状态以及品牌供应商下拉框
                name_in2:'',//顶部状态以及品牌供应商下拉框
                pageIndex:1,//当前页数
                pageSize:10,//每页显示条数
                inventoryShow:true,//主页面状态
                checkShow:false,//查看详情页面状态
                textarea:'在此填写备注信息',//文本框填写备注内容
                disable:true,//输入框是否禁止
                selected:false,//多选按钮状态
                data_list:[ //主页面渲染数据
                    {brand:'18092422000052',formats:'月盘点',name:'产成品仓',time:'2018-09-24',ontime:'按库存处理',statue:'已完成',optime:'2018-09-24 22:00:52',},
                    {brand:'18092422000052',formats:'月盘点',name:'产成品仓',time:'2018-09-24',ontime:'按库存处理',statue:'已完成',optime:'2018-09-24 22:00:52',},
                    {brand:'18092422000052',formats:'月盘点',name:'产成品仓',time:'2018-09-24',ontime:'按库存处理',statue:'已完成',optime:'2018-09-24 22:00:52',},
                    {brand:'18092422000052',formats:'月盘点',name:'产成品仓',time:'2018-09-24',ontime:'按库存处理',statue:'已完成',optime:'2018-09-24 22:00:52',},
                    {brand:'18092422000052',formats:'月盘点',name:'产成品仓',time:'2018-09-24',ontime:'按库存处理',statue:'已完成',optime:'2018-09-24 22:00:52',},
                    {brand:'18092422000052',formats:'月盘点',name:'产成品仓',time:'2018-09-24',ontime:'按库存处理',statue:'已完成',optime:'2018-09-24 22:00:52',},
                    {brand:'18092422000052',formats:'月盘点',name:'产成品仓',time:'2018-09-24',ontime:'按库存处理',statue:'已完成',optime:'2018-09-24 22:00:52',},
                    {brand:'18092422000052',formats:'月盘点',name:'产成品仓',time:'2018-09-24',ontime:'按库存处理',statue:'已完成',optime:'2018-09-24 22:00:52',},
                    {brand:'18092422000052',formats:'月盘点',name:'产成品仓',time:'2018-09-24',ontime:'按库存处理',statue:'已完成',optime:'2018-09-24 22:00:52',},
                    {brand:'18092422000052',formats:'月盘点',name:'产成品仓',time:'2018-09-24',ontime:'按库存处理',statue:'已完成',optime:'2018-09-24 22:00:52',},
                ],
                check_list:[ //点击查看详情页面渲染数据
                    {brand:'WP100',formats:'花甲米线料杯（箱）',name:'一箱8杯',time:'箱',ontime:'78.00',statue:'100.00',optime:'20000.00',ddii:"22.00",moneny:'4400.00',biao:'是',bei:""},
                    {brand:'WP100',formats:'花甲米线料杯（箱）',name:'一箱8杯',time:'箱',ontime:'78.00',statue:'100.00',optime:'20000.00',ddii:"22.00",moneny:'4400.00',biao:'是',bei:""},
                    {brand:'WP100',formats:'花甲米线料杯（箱）',name:'一箱8杯',time:'箱',ontime:'78.00',statue:'100.00',optime:'20000.00',ddii:"22.00",moneny:'4400.00',biao:'是',bei:""},
                    {brand:'WP100',formats:'花甲米线料杯（箱）',name:'一箱8杯',time:'箱',ontime:'78.00',statue:'100.00',optime:'20000.00',ddii:"22.00",moneny:'4400.00',biao:'是',bei:""},
                    {brand:'WP100',formats:'花甲米线料杯（箱）',name:'一箱8杯',time:'箱',ontime:'78.00',statue:'100.00',optime:'20000.00',ddii:"22.00",moneny:'4400.00',biao:'是',bei:""},
                    {brand:'WP100',formats:'花甲米线料杯（箱）',name:'一箱8杯',time:'箱',ontime:'78.00',statue:'100.00',optime:'20000.00',ddii:"22.00",moneny:'4400.00',biao:'是',bei:""},
                    {brand:'WP100',formats:'花甲米线料杯（箱）',name:'一箱8杯',time:'箱',ontime:'78.00',statue:'100.00',optime:'20000.00',ddii:"22.00",moneny:'4400.00',biao:'是',bei:""},
                    {brand:'WP100',formats:'花甲米线料杯（箱）',name:'一箱8杯',time:'箱',ontime:'78.00',statue:'100.00',optime:'20000.00',ddii:"22.00",moneny:'4400.00',biao:'是',bei:""},
                    {brand:'WP100',formats:'花甲米线料杯（箱）',name:'一箱8杯',time:'箱',ontime:'78.00',statue:'100.00',optime:'20000.00',ddii:"22.00",moneny:'4400.00',biao:'是',bei:""},
                    {brand:'WP100',formats:'花甲米线料杯（箱）',name:'一箱8杯',time:'箱',ontime:'78.00',statue:'100.00',optime:'20000.00',ddii:"22.00",moneny:'4400.00',biao:'是',bei:""},
                    {brand:'WP100',formats:'花甲米线料杯（箱）',name:'一箱8杯',time:'箱',ontime:'78.00',statue:'100.00',optime:'20000.00',ddii:"22.00",moneny:'4400.00',biao:'是',bei:""},
                    {brand:'WP100',formats:'花甲米线料杯（箱）',name:'一箱8杯',time:'箱',ontime:'78.00',statue:'100.00',optime:'20000.00',ddii:"22.00",moneny:'4400.00',biao:'是',bei:""},
                    {brand:'WP100',formats:'花甲米线料杯（箱）',name:'一箱8杯',time:'箱',ontime:'78.00',statue:'100.00',optime:'20000.00',ddii:"22.00",moneny:'4400.00',biao:'是',bei:""},
                    {brand:'WP100',formats:'花甲米线料杯（箱）',name:'一箱8杯',time:'箱',ontime:'78.00',statue:'100.00',optime:'20000.00',ddii:"22.00",moneny:'4400.00',biao:'是',bei:""},
                    {brand:'WP100',formats:'花甲米线料杯（箱）',name:'一箱8杯',time:'箱',ontime:'78.00',statue:'100.00',optime:'20000.00',ddii:"22.00",moneny:'4400.00',biao:'是',bei:""},
                    {brand:'WP100',formats:'花甲米线料杯（箱）',name:'一箱8杯',time:'箱',ontime:'78.00',statue:'100.00',optime:'20000.00',ddii:"22.00",moneny:'4400.00',biao:'是',bei:""},
                    {brand:'WP100',formats:'花甲米线料杯（箱）',name:'一箱8杯',time:'箱',ontime:'78.00',statue:'100.00',optime:'20000.00',ddii:"22.00",moneny:'4400.00',biao:'是',bei:""},
                    {brand:'WP100',formats:'花甲米线料杯（箱）',name:'一箱8杯',time:'箱',ontime:'78.00',statue:'100.00',optime:'20000.00',ddii:"22.00",moneny:'4400.00',biao:'是',bei:""},
                    {brand:'WP100',formats:'花甲米线料杯（箱）',name:'一箱8杯',time:'箱',ontime:'78.00',statue:'100.00',optime:'20000.00',ddii:"22.00",moneny:'4400.00',biao:'是',bei:""},
                   {brand:'WP100',formats:'花甲米线料杯（箱）',name:'一箱8杯',time:'箱',ontime:'78.00',statue:'100.00',optime:'20000.00',ddii:"22.00",moneny:'4400.00',biao:'是',bei:""},
                ],
            }
        },
        methods:{
//========================主页面方法
            // 点击查看按钮
            operation(k,v){
                //进入数据详情页
                this.inventoryShow=false;//主页面状态
                this.checkShow=true;//查看详情页面状态
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
//========================查看详情页面方法
            // 点击底部取消
            cancel(){
                //回到主页面
                this.disable=true;//输入框状态改变
                this.inventoryShow=true;//主页面状态
                this.checkShow=false;//查看详情页面状态
            },
           //点击新增盘点订单
           append(){
                this.disable=false;//输入框状态改变
                this.inventoryShow=false;//主页面状态
                this.checkShow=true;//查看详情页面状态
           },
        },
        created(){
            console.log('盘点管理')
        }
    }
</script>

<style scoped>
/*主页面样式*/
    .postPre{
        padding:10px;
    }
    .inventory-top .item{
        display:flex;
        align-items:center;
    }
    .inventory-top .item span{
        display:inline-block;
        width:100px;
        text-align:right;
        margin-right:10px;
    }
    .pageBtn{
        margin: 20px auto 0 25%;
    }
/*点击查看详情样式*/
    .checkDetail{
        margin-bottom:5%;
        overflow:hidden;
    }
    .checkDetail .checkTop{
        padding:10px 0 0 0;
        margin-bottom:20px;
    }
    .checkDetail .checkTop .item{
        line-height:50px;
        height:50px;
    }
    .checkTop .item label{
        font-weight: 600;
        width:100px;
        text-align:right;
        font-size:18px;
        font-weight:600;
        margin-right:30px;
    }
    .checkTop .item label.radio-inline.radio-group{
        cursor: not-allowed;
        font-size:14px;
        font-weight:normal;
        color:#b1b1b1;
        line-height:50px;
    }
    .checkTop .item label.radio-inline.radio-group input{
        zoom: 1.4;
        margin-left:0;
        vertical-align:middle;
        margin-bottom:4px;
    }
    .form-control{
        outline: 0;
        width: 100%;
        border: 0;
        height: 32px;
        box-sizing:border-box;
        padding-top:15px;
        color: #555;
        border-right: 0;
        background-attachment: scroll;
        resize: none;
        overflow:auto;
        background:transparent;
    }
/*动画效果的实现*/
    .checkDetail,.inventory{
        animation: slideInUp .4s;
    }
    @keyframes slideInUp{
        0% {
            transform: translate3d(100%,0,0);
        }
        to {
            transform: translateZ(0)
        }
    }   
</style>