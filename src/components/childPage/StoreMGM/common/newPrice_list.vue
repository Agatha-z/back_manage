<template>
    <div class="newly_increased">
                    <h4>新增调价单</h4>
                    <div class="store-first-block store_block">
                        <p>第一步：调价策略</p>
                        <div class="first-table table">
                            <div class="float">
                                <span>调价策略:</span>
                            </div>
                            <el-select style="width:347.34px;margin-right:60px;"  v-model="name_in" placeholder="请选择" class="float">
                                <el-option label="按门店" :value="1"></el-option>
                                <el-option label="按物品" :value="2"></el-option>
                            </el-select>
                            <div class="clear"></div>
                        </div>
                    </div>
                    <div class="store-second-block store_block">
                        <p>第二步：调价门店选择</p>
                        <div class="second-table table">
                            <div class="float">
                                <span>调价门店:</span>
                            </div>
                            <!--组件-->
                            <div class="float">
                                <storeSelect :storeSelectData='storeSelectData' :inputWidth="290" :placeholder="['请选择门店','已选择门店点击下拉按钮查看']"></storeSelect>   
                            </div>
                            <div class="clear"></div>
                        </div>
                    </div>
                    <div class="store-three-block store_block">
                        <p>第三步：调价物料选择</p>
                        <div class="three-table table">
                            <!-- 左边 -->
                            <div class="panel-category">
                                <div class="panel-heading">
                                    <input type="text" placeholder="请选择调价物料" style="float:left;">
                                    <div class="search" style="float:left;">
                                        <i class="el-icon-search"></i>
                                    </div>
                                    <div style="clear:both;"></div>
                                </div>
                                <ul class="panel-body">
                                    <ul class="selectBox-title">
                                        <span style="margin-right:5px;float:left;" @click="selectUnfold"><i class="el-icon-circle-plus" style=" color:#FFD700;cursor: pointer;"></i></span>
                                        <span class="el-checkbox" style="float:left;"></span>
                                        <li>全部分类</li>
                                    </ul>
                                    <!--第一层子集数据-->
                                    <el-collapse-transition>
                                        <div v-show="isUnfold">
                                            <ul class="selectBox-inner" v-for="(item,index) in dataSab" :key="index">
                                                <li class="selectBoxInner_title" :class="{addPadding:item.data.length==0}">
                                                    <i :class="item.show?'el-icon-remove':'el-icon-circle-plus'" style=" color:#FFD700;float:left;margin-right:2px;margin-top:3px;cursor: pointer;" v-show="item.data.length!==0" @click="subset(item,index)"></i>
                                                    <span class="el-checkbox" v-if="item.titShow" @click="titPop(index)"></span>
                                                    <span class="el-checkbox__inner" v-else @click="titPop(index)"><i class="el-icon-check"></i></span>
                                                    <span :class="{selected:item.titShow==false}">{{item.title}}</span>
                                                    <!--第二层子集数据-->
                                                    <el-collapse-transition>
                                                        <ul class="select_Box_Inner" v-show="item.show">
                                                            <li v-for="(v,k) in item.data" :key="k" :class="{selected:v.show==true}">
                                                                <span class="el-checkbox__inner" v-if="v.show" @click="pop(index,k)" ><i class="el-icon-check"></i></span>
                                                                <span class="el-checkbox" v-else @click="pop(index,k)" ></span>
                                                                {{v.goods}}
                                                            </li>
                                                        </ul>
                                                    </el-collapse-transition>
                                                </li>
                                            </ul>
                                        </div>
                                    </el-collapse-transition>
                                </ul>
                            </div>
                            <!-- 右边 -->
                            <div class="tab_content">
                                <!-- 表格头部 -->
                                <div class='tab_top' style="height:16px;line-height:16px;">
                                    <span style="float:left;font-size:16px;margin-top:20px;">已选分类</span>
                                    <el-button type="text" style="float:right;font-size:16px;">删除</el-button>
                                </div>
                                <div>
                                    <table class="table_list" border="0" cellspacing="0">
                                        <tr>	
                                            <th>
                                                <input type="checkbox">
                                            </th>
                                            <th>订货门店</th>
                                            <th>原材料类别</th>
                                            <th>原材料名称</th>
                                            <th>库存单价(元)</th>
                                            <th>门店订货价格(元)</th>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="store-four-block store_block">
                        <p>第四步：调价方式选择</p>
                        <div class="four-table  table">
                            <div class="float fl">
                                <span>调价方式</span>
                            </div>
                            <!--组件-->
                            <select class="fl form-control" style="margin-top:2px;height:30px;margin-right:100px;">
                                <option value="1">比例加价%</option>
                                <option value="2">固定加价（元）</option>
                            </select>
                            <div class="float fl">
                                <span>调价系数（可为负数）</span>
                            </div>
                            <!--组件-->
                            <div class="fl" style="margin-right:100px;"> 
                                <input type="text" class="fl"  style="margin-top:2px;height:24px;">
                                <span class="input-group-addon fl">%</span>
                            </div>
                            <!-- 组件 -->
                            <div class="form-priceRound fl" style="margin-right:200px;">
                                <label class="checkox-inline" >
                                    <input type="checkbox">
                                    结果值是否向上取整
                                </label>
                                <p class="help-block" style="font-size: 13px;margin-top:0px;color:#666;">(结果值四舍五入到角)</p>
                            </div>
                            <el-button type="primary" class="fl">确定</el-button>
                            <div class="clear"></div>
                        </div>
                    </div>
                    <div class="store-five-block store_block">
                        <p>调价结果展示</p>
                        <div class="five-table  table">
                            <div style="width:60%;">
                                <table class="table_list" border="0" cellspacing="0">
                                    <tr>	
                                        <th></th>
                                        <th>订货门店</th>
                                        <th>原材料类别</th>
                                        <th>原材料名称</th>
                                        <th>库存单价(元)</th>
                                        <th>门店订货价格(元)</th>
                                        <th>操作</th>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div style="margin-top:40px;">
                        <el-button  type="primary">保存草稿</el-button>
                        <el-button  type="success">提交并审核通过</el-button>
                        <el-button type="info" @click="cancelToBack">取消</el-button>
                    </div>
                </div>
</template>
<script>
export default {
    data(){
        return{
            name_in:'',
                storeSelectData:[],
                show:true,
                isUnfold:true,//下拉弹框第一层子集数据
                dataSab:[//下拉菜单
                    {
                        title:'加盟店进货表',
                        show:false,
                        titShow:true,
                        data:[
                        ]  
                    },
                    {
                        title:'印字低值易耗品',
                        show:false,
                        titShow:true,
                        data:[
                            {
                            goods:'外卖打包保鲜膜',
                            show:false,
                            },
                            {
                                goods:'米线打包袋大',
                                show:false,
                            },
                            {
                                goods:'环保餐包',
                                show:false,
                            },
                            {
                                goods:'封口膜',
                                show:false,
                            },
                            {
                                goods:'餐巾纸',
                                show:false,
                            },
                            {
                                goods:'透明杯',
                                show:false,
                            },
                            {
                                goods:'米线打包袋小',
                                show:false,
                            },
                        ]
                    },
                    {
                        title:'冷冻原材料',
                        show:false,
                        titShow:true,
                        data:[
                        ]  
                    },
                    {
                        title:'产成品2',
                        show:false,
                        titShow:true,
                        data:[
                        ]  
                    },
                    {
                        title:'低值易耗品',
                        show:false,
                        titShow:true,
                        data:[
                            {
                            goods:'米线打包盒大',
                            show:false,
                            },
                            {
                                goods:'双杯打包带',
                                show:false,
                            },
                            {
                                goods:'洗涤剂',
                                show:false,
                            },
                            {
                                goods:'四色彩印碗',
                                show:false,
                            },
                            {
                                goods:'蓝筷',
                                show:false,
                            },
                            {
                                goods:'大垃圾袋',
                                show:false,
                            },
                            {
                                goods:'微笑口罩',
                                show:false,
                            },
                        ]
                    },
                ],
        
        }
    },
    methods:{
        //点击全部分类加减号
        selectUnfold(){
            this.isUnfold=!this.isUnfold;
        },
        // 点击取消
        cancelToBack(){
            this.$emit('toParCancel');//给父组件传递事件
        },
        // 第一层标题选中事件
        titPop(index){
            this.dataSab[index].titShow=! this.dataSab[index].titShow;
            if(this.dataSab[index].titShow){
                for(var i=0;i<this.dataSab[index].data.length;i++){
                    this.dataSab[index].data[i].show=false;
                }
            }else{
                for(var i=0;i<this.dataSab[index].data.length;i++){
                    this.dataSab[index].data[i].show=true;
                }
            }
        },
        // 点击第二层子集数据标题加号
        subset(item,index){
            this.dataSab[index].show=! this.dataSab[index].show;
        },
        // 第二层子集数据选中事件
        pop(index,k){
            this.dataSab[index].data[k].show=!this.dataSab[index].data[k].show;
        }
    }
}
</script>
<style scoped>
/* 新增变价单页面 */
.newly_increased{
    padding:0 20px;
}
.newly_increased h4{
    font-size:18px;
    font-weight:normal;
    margin:10px 0;
}
.newly_increased .store_block{
    margin-top:10px;
}
.store_block p{
    font-size:14px;
    line-height:14px;
    color: #333;
    margin-top:20px;
    font-weight:600;
}
.store_block .table{
    margin: auto;
    margin-top: 20px;
    padding-top:10px;
    border: 1px solid #ccc;
    padding-left:20px;
    padding-bottom:20px;
    width:100%;
}
.store_block .table .clear{
    clear: both;
}
.store_block .table .float{
    float: left;
}
.store_block .table .float span{
    margin-right:10px;
    line-height:36px;
    font-size:14px;
    font-weight:normal;  
}
.store_block  .three-table{
    overflow-x: hidden;
    overflow-y: hidden;
    height:290px;
}
/* 第三个表格左边 */
.store_block  .three-table .panel-category{
    float: left;
    height:400px;
    width:240px;
    overflow: hidden;
}
.store_block  .three-table .panel-category .panel-body{
    height:260px;
    border:1px solid #ccc;
    overflow-y: auto;
    overflow-x:hidden;
}
.panel-heading{
    height:30px;
    line-height:30px;
}
.panel-heading input{
    height:30px;
    padding-left:10px;
    width:210px;
    box-sizing:border-box;
}
.panel-heading .search{
    width:30px;
    height:30px;
    background:#016CDF;
    text-align:center;
    line-height:30px;
    color:#fff;
    font-size:18px;
}
.panel-body{
    width:100%;
    height:100%;
    padding:5px;
    box-sizing:border-box;
}
.panel-body li{
    font-size:14px;
    line-height:20px;
    color:#666;
}
.selectBox-title{
   height:20px;
}
.selectBox-title li{
    float: left;
    cursor: pointer;
}
.panel-body .selectBox-inner{
    padding-left:20px;
}
.panel-body .selectBox-inner .selectBoxInner_title{
    line-height:16px;
}
.panel-body .selectBox-inner .selectBoxInner_title.addPadding{
    padding-left:15px;
}
.panel-body .selectBox-inner .select_Box_Inner{
    margin-left:35px;
}
span.el-checkbox{
    display: inline-block;
    position: relative;
    border: 1px solid #dcdfe6;
    border-radius: 2px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 14px;
    height: 14px;
    background-color: #fff;
    margin-right:2px;
    margin-top:2px;
    cursor: pointer;
}
span.el-checkbox__inner{
    position: relative;
    display: inline-block;
    position: relative;
    border: 1px solid #dcdfe6;
    border-radius: 2px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 14px;
    height: 14px;
    background-color: #409EFF;
    border-color: #409EFF;
    margin-right:2px;
    margin-top:2px;
    cursor: pointer;
}
.el-checkbox__inner i.el-icon-check{
    position: absolute;
    left:-1px;
    top:-1px;
    color:#ffff;
}
span.input-group-addon{
    padding: 7px 12px;
    font-size: 14px;
    font-weight: 400;
    line-height: 1;
    color: #555;
    text-align: center;
    background-color: #eee;
    border: 1px solid #ccc;
    margin-top:2px;
}
span.selected{
    color:#409EFF;
}
li.selected{
    color:#409EFF;
}
/* 第三个表格右边 */
.tab_content{
    overflow:hidden;
    /* height:290px; */
    padding:0 40px;
    margin-top:-20px;
}
</style>
