<!-- 原材料管理/物品类别-->
<template>
    <div class="postPre">
        <div>
            <!--头部搜索 -->
            <div class="searchTop">
                <label>类别信息</label>
                <el-input style="width:337.34px;" size="medium" clearable placeholder="根据名称检索..."></el-input>
                <el-button type="primary" size="small" icon="el-icon-search" @click="seachAndClear(1)" style="margin-left:10px;">搜索</el-button>
                <el-button type="info"  size="small" icon="el-icon-refresh" @click="seachAndClear(2)">重置</el-button>
            </div>
            <!--nav-->
            <div>
                <el-button type="primary"  style="margin-top:20px;" @click="addGoods">新增类别<i class="el-icon-plus el-icon-plus-right"></i></el-button>
            </div>
            <div class="tab-content">
            <!--主体左边-->
                <div class="list-tree">
                    <div class="panel-wrap">
                        <div class="panel-category">
                            <div class="panel-heading">物品类别</div>
                            <ul class="panel-body" v-for="(item,index) in  dataSab" :key="index">
                                <ul class="selectBox-title" @click="pop(item, index)">
                                    <li style="margin-right:5px;"><i :class="item.show?'el-icon-remove':'el-icon-circle-plus'" style=" color:#FFD700;"></i></li>
                                    <li>{{item.title}}</li>
                                </ul>
                                <ul class="selectBox-inner" :class="{addActive:item.show==true}">
                                    <li v-for="(v,k) in item.data"  :key="k" @click="changeSelct(k,index)" :class="{selected:v.show==false}"><span class="el-checkbox" v-if="v.show"></span>
                                        <span class="el-checkbox__inner" v-else><i class="el-icon-check"></i></span>
                                        {{v.goods}}</li>
                                </ul>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="ui-jqgrid-view">
                    <div class="table_wrap">
                        <div class="table-inner">
                            <table class="table_list" border="0" cellspacing="0">
                                <tr>	
                                    <th></th>
                                    <th>类别编码</th>
                                    <th>类别名称</th>
                                    <th>上级类别</th>
                                    <th>创建时间</th>
                                    <th>操作</th>
                                </tr>
                                <tr v-for="(v,k) in data_list" :key="k">
                                    <td>{{k+1}}</td>
                                    <td>{{v.s_name}}</td>
                                    <td>{{v.brand}}</td>
                                    <td>{{v.areaName}}</td>
                                    <td>{{v.attribute}}</td>
                                    <td>
                                        <el-button type="primary" size="small" icon="el-icon-search"  @click="operation(1,k,v)">编辑</el-button>
                                        <el-button type="danger" size="small" icon="el-icon-goods" @click="operation(2,k,v)">删除</el-button>
                                    </td>
                                </tr>
                                <!-- 无数据显示 -->
                                <tr v-if="data_list.length<=0">
                                    <td colspan="12">
                                        <p style="color:#999">暂无更多数据</p>
                                    </td>
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
            <!--点击删除对话框-->
            <el-dialog
            :visible.sync="centerDialogVisible"
            width="30%"
            center>
            <span slot="title" style="float:left;font-size:16px;">是否确认删除?</span>
            <div slot="footer" class="dialog-footer;" style='height:30px;'>
                <el-button @click="centerDialogVisible = false"  class="fr" style="margin-left:20px;">取 消</el-button>
                <el-button type="primary" @click="sureDel" class="fr">确 定</el-button>
            </div>
            </el-dialog>
            <!--弹框-->
            <ModalDialog  :model="show_uint" title="新增类别" @cancel="show_uint = false">
                <div class="uint_code" style="border-bottom:1px solid #eee;">
                    <label>类别编码</label>
                    <div class="code_input">
                        <input type="text" value="DW39" id="code" style="width:270px;">
                        <p>(只能填数字或字母！例如：A1001,A1002...)</p>
                    </div>
                    <span class="after"></span>
                </div>
                <div class="uint_code" style="border-bottom:1px solid #eee;">
                    <label>类别名称</label>
                    <div class="code_input">
                        <input type="text" id="name" placeholder="填写类别名称" style="width:270px;">
                        <p>(此项为必填项，不能填写已有的名称！)</p>
                    </div>
                    <span class="after"></span>
                </div>
                <div class="uint_code">
                    <label>上级类别</label>
                    <div class="code_input">
                        <storeSelect :placeholder="['请选择上级类别','已选择上级类别点击下拉按钮查看']" :storeSelectData="storeSelectData"></storeSelect>
                    </div>
                </div>
            </ModalDialog>
        </div>
    </div>
</template>

<script>
    export default {
        // :class="{addActive:item.show==true}"
        data(){
            return{
                show:true,
                pageIndex:1,//当前页数
                pageSize:10,//每页显示条数
                centerDialogVisible:false,
                show_uint:false,//新增类别,
                change_SelctBox:true,//物品分类单个选择条件
                storeSelectData:[
                    {
                        name:'物品分类',
                        id:'1',
                        children:[
                            {name:'产成品',id:'1-1'},
                            {name:'低值易耗品',id:'1-2'},
                            {name:'门店原材料',id:'1-3'},
                            {name:'开业用品',id:'1-4'},
                            {name:'常用物品',id:'1-5'},
                            {name:'冷冻产成品',id:'1-6'},
                            {name:'印字低值易耗品',id:'1-7'},
                        ]
                    },
                ],
                dataSab:[//下拉菜单
                    {
                        title:'物品类别',
                        show:true,
                        data:[
                            {
                               goods:'产成品',
                               show:true,
                            },
                            {
                                goods:'低值易耗品',
                                show:true,
                            },
                            {
                                goods:'门店原材料',
                                show:true,
                            },
                            {
                                goods:'开业用品',
                                show:true,
                            },
                            {
                                goods:'常用物品',
                                show:true,
                            },
                            {
                                goods:'冷冻产成品',
                                show:true,
                            },
                            {
                                goods:'印字低值易耗品',
                                show:true,
                            },
                        ]
                    },
                ],
                data_list:[ //渲染数据
                    {s_name:'18121415450025',brand:'中央厨房',attribute:'7416.00',areaName:'吴燕燕',formats:'吴燕燕',user:'已完成',time:'2018-12-14',state:'2018-12-14',template:'2018-12-14',time1:'2018-12-14 15:45:33',},
                    {s_name:'18121415450025',brand:'中央厨房',attribute:'7416.00',areaName:'吴燕燕',formats:'吴燕燕',user:'已完成',time:'2018-12-14',state:'2018-12-14',template:'2018-12-14',time1:'2018-12-14 15:45:33',},
                    {s_name:'18121415450025',brand:'中央厨房',attribute:'7416.00',areaName:'吴燕燕',formats:'吴燕燕',user:'已完成',time:'2018-12-14',state:'2018-12-14',template:'2018-12-14',time1:'2018-12-14 15:45:33',},
                    {s_name:'18121415450025',brand:'中央厨房',attribute:'7416.00',areaName:'吴燕燕',formats:'吴燕燕',user:'已完成',time:'2018-12-14',state:'2018-12-14',template:'2018-12-14',time1:'2018-12-14 15:45:33',},
                    {s_name:'18121415450025',brand:'中央厨房',attribute:'7416.00',areaName:'吴燕燕',formats:'吴燕燕',user:'已完成',time:'2018-12-14',state:'2018-12-14',template:'2018-12-14',time1:'2018-12-14 15:45:33',},
                    {s_name:'18121415450025',brand:'中央厨房',attribute:'7416.00',areaName:'吴燕燕',formats:'吴燕燕',user:'已完成',time:'2018-12-14',state:'2018-12-14',template:'2018-12-14',time1:'2018-12-14 15:45:33',},
                    {s_name:'18121415450025',brand:'中央厨房',attribute:'7416.00',areaName:'吴燕燕',formats:'吴燕燕',user:'已完成',time:'2018-12-14',state:'2018-12-14',template:'2018-12-14',time1:'2018-12-14 15:45:33',},
                    {s_name:'18121415450025',brand:'中央厨房',attribute:'7416.00',areaName:'吴燕燕',formats:'吴燕燕',user:'已完成',time:'2018-12-14',state:'2018-12-14',template:'2018-12-14',time1:'2018-12-14 15:45:33',},
                    {s_name:'18121415450025',brand:'中央厨房',attribute:'7416.00',areaName:'吴燕燕',formats:'吴燕燕',user:'已完成',time:'2018-12-14',state:'2018-12-14',template:'2018-12-14',time1:'2018-12-14 15:45:33',},
                    {s_name:'18121415450025',brand:'中央厨房',attribute:'7416.00',areaName:'吴燕燕',formats:'吴燕燕',user:'已完成',time:'2018-12-14',state:'2018-12-14',template:'2018-12-14',time1:'2018-12-14 15:45:33',},
                    {s_name:'18121415450025',brand:'中央厨房',attribute:'7416.00',areaName:'吴燕燕',formats:'吴燕燕',user:'已完成',time:'2018-12-14',state:'2018-12-14',template:'2018-12-14',time1:'2018-12-14 15:45:33',},
                    {s_name:'18121415450025',brand:'中央厨房',attribute:'7416.00',areaName:'吴燕燕',formats:'吴燕燕',user:'已完成',time:'2018-12-14',state:'2018-12-14',template:'2018-12-14',time1:'2018-12-14 15:45:33',},
                    {s_name:'18121415450025',brand:'中央厨房',attribute:'7416.00',areaName:'吴燕燕',formats:'吴燕燕',user:'已完成',time:'2018-12-14',state:'2018-12-14',template:'2018-12-14',time1:'2018-12-14 15:45:33',},
                    {s_name:'18121415450025',brand:'中央厨房',attribute:'7416.00',areaName:'吴燕燕',formats:'吴燕燕',user:'已完成',time:'2018-12-14',state:'2018-12-14',template:'2018-12-14',time1:'2018-12-14 15:45:33',},
                    {s_name:'18121415450025',brand:'中央厨房',attribute:'7416.00',areaName:'吴燕燕',formats:'吴燕燕',user:'已完成',time:'2018-12-14',state:'2018-12-14',template:'2018-12-14',time1:'2018-12-14 15:45:33',},
                    {s_name:'18121415450025',brand:'中央厨房',attribute:'7416.00',areaName:'吴燕燕',formats:'吴燕燕',user:'已完成',time:'2018-12-14',state:'2018-12-14',template:'2018-12-14',time1:'2018-12-14 15:45:33',},
                    {s_name:'18121415450025',brand:'中央厨房',attribute:'7416.00',areaName:'吴燕燕',formats:'吴燕燕',user:'已完成',time:'2018-12-14',state:'2018-12-14',template:'2018-12-14',time1:'2018-12-14 15:45:33',},
                    {s_name:'18121415450025',brand:'中央厨房',attribute:'7416.00',areaName:'吴燕燕',formats:'吴燕燕',user:'已完成',time:'2018-12-14',state:'2018-12-14',template:'2018-12-14',time1:'2018-12-14 15:45:33',},
                ],
            }
        },
        methods: {
            //点击编辑或者删除
            operation(data,k,v){
                //点击编辑
                if(data=='1'){
                    this.show_uint=true;  
                }
                // 点击删除
                if(data=='2'){
                    this.centerDialogVisible=true;
                }
            },
            // 点击确认删除
            sureDel(){
                this.centerDialogVisible=false;
            },
            addGoods(){
                this.show_uint=true;
            },
            // 点击物品类别
            pop(item, index){
                this.dataSab[index].show= !this.dataSab[index].show;
            },
            //点击物品分类
            changeSelct(k,index){
                for(var i=0;i<this.dataSab[index].data.length;i++){
                    this.dataSab[index].data[i].show=true;
                }
                if(this.change_SelctBox){
                    this.change_SelctBox=!this.change_SelctBox;
                    this.dataSab[index].data[k].show=this.change_SelctBox;
                }else{
                    this.dataSab[index].data[k].show=!this.change_SelctBox;
                    this.change_SelctBox=!this.change_SelctBox; 
                }
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
            // 确认删除事件
            sure_del(){
                alert('你点击了确认删除')
            }
        },
        created(){
            console.log('原材料管理')
        }
    }
</script>

<style scoped>
    .postPre{
        padding:10px;
    }
    .searchTop{
        padding-left:100px;
    }
    .searchTop label{
        font-size:18px;
        font-weight:600;
        margin-right:30px;
    }
    .tab-content{
        margin-top:20px;
        width:100%;
        background: #ffffff;
        height:500px;
    }
    .list-tree{
        width:240px;
        height:432px;
        margin-right:10px;
        border:2px solid #e2e2e2;
        box-sizing:border-box;
        float: left;
    }
    .panel-heading{
        height:50px;
        line-height:50px;
        padding-left:15px;
        background:#f5f5f5;
        font-size:18px;
        border-bottom:1px solid #e2e2e2;
        box-sizing:border-box;
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
    }
    .selectBox-inner{
        height:0;
        padding-left:30px;
        overflow: hidden;
        transition: all .5s ease;
    }
    .selectBox-inner li.selected{
        color:#409EFF;
    }
    .selectBox-inner.addActive{
        height:200px;
    }
    .selectBox-inner li{
        line-height:20px;
        cursor: pointer;
    }
    .selectBox-inner li span{
        display:inline-block;
        vertical-align:middle;
    }
    .selectBox-inner li span{
        margin-right:10px;
    }
    .selectBox-title{
        cursor: pointer;
        height:20px;
    }
    .selectBox-title li{
        float:left;
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
        z-index: 1;
    }
    .ui-jqgrid-view{
        overflow:hidden;
        height:432px;
    }
    .table_wrap{
        height:80%;
        margin-bottom:10px;
        overflow:hidden;
    }
    .table_wrap .table-inner{
        height:100%;
        overflow-y:auto;
    }
    .pageBtn{
        margin-top:40px;
        height:10%;
        padding-left:20%;
    }
    .el-checkbox__inner{
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
    }
    .el-checkbox__inner i.el-icon-check{
        position: absolute;
        left:-1px;
        top:-1px;
        color:#ffff;
    }
    /* 弹框 */
     .uint_code{
        width: 100%;
        padding: 30px 0;
        position: relative;
    }
    .uint_code label{
        width: 25%;
        font-size:18px;
        font-weight:bold;
        margin-bottom: 23px;
        text-align: right;
        position: absolute;
        top: 34%;
        left: 20px;
    }

    .code_input{
        display: inline-block;
        padding: 0 0 0 28%;
        width: 39%;
    }

    .code_input input{
        width: 90%;
        height: 20px;
        padding: 5px 10px;
    }

    .code_input p{
        margin: 4px 0;
    }

    .after{
        color: #d16e6c;
        position: absolute;
        top: 40%;
        margin-left: 1%;
    }

    .after::after{
        content: '*'
    }
</style> 