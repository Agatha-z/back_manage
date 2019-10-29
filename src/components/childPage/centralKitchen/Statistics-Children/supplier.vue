<!--盘存明细表-->
<template>
    <div>
        <!--头部搜索-->
        <div class="searchWrap">
            <div class="search-top" style="display:flex;">
                <div class="item">
                    <span style="font-size:18px;font-weight:600;float:left;">供应商名称</span>
                    <el-select style="width:290px;margin-right:20px;float:left;"  v-model="name_in1" placeholder="请选择">
                        <el-option label="蔬菜供应商" :value="1"></el-option>
                        <el-option label="冻品供应商" :value="2"></el-option>
                        <el-option label="干货调料供应商" :value="3"></el-option>
                        <el-option label="中央厨房" :value="4"></el-option>
                    </el-select>
                    <span style="font-size:18px;font-weight:600;float:left;">日期</span>
                    <el-date-picker
                    style="margin-right:20px;width:180px;"
                    size="medium"
                    v-model="value1"
                    type="date"
                    placeholder="选择日期">
                    </el-date-picker>
                    <!--  -->
                    <el-date-picker
                    v-model="value2"
                    style="width:180px;"
                    type="date"
                    size="medium"
                    placeholder="选择日期">
                    </el-date-picker>
                </div>
            </div>
            <div class="search-bottom" style="margin-top:20px;display:flex;">
                <!--  -->
                <div  class="item">
                    <span style="font-size:18px;font-weight:600;float:left;">物品类别</span>
                    <!--组件-->
                    <div class="fl" style="margin-right:50px;">
                    	<storeSelect :storeSelectData='storeSelectData' style="margin-right:20px;"></storeSelect>
                    </div>
                    <el-button type="primary" size="small" icon="el-icon-search" @click="seachAndClear(1)" style="margin-left:10px;">搜索</el-button>
                    <el-button type="info"  size="small" icon="el-icon-refresh" @click="seachAndClear(2)">重置</el-button>
                </div>
            </div>
        </div>
        <!--分割线-->
        <hr>
        <!--导出-->
        <div>
            <el-button type="primary" icon="el-icon-upload" @click="Export" style="margin-bottom:20px;">导出</el-button>
        </div>
        <!--点出导出对话框-->
        <el-dialog
            :visible.sync="centerDialogVisible"
            width="30%"
            top="5vh"
            center>
            <span slot="title" class="dialog-title" style="display:flex;justify-content:flex-start;font-size:16px;color:#333;">
                没有数据需要导出
            </span>
            <span slot="body" class="dialog-body" style="display:none;">
            </span>
            <span slot="footer" class="dialog-footer"  style="display:flex;justify-content:flex-end;">
                <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
        <!--数据-->
        <div>
            <table border="0" cellspacing="0" class="table_list"> 
                <tr>
                    <th></th>
                    <th>供应商名称</th>
                    <th>总部仓库</th>
                    <th>物品名称</th>
                    <th>物品类别</th>
                    <th>订货单位</th>
                    <th>采购数量</th>
                    <th>采购金额(元)</th>
                    <th>退货数量</th>
                    <th>退货金额(元)</th>
                </tr>
                <tr v-for="(v,k) in data_list" :key="k" v-show="data_list.length!==0">
                    <td>{{k+1}}</td>
                    <td>{{v.s_name}}</td>
                    <td>{{v.brand}}</td>
                    <td>{{v.areaName}}</td>
                    <td>{{v.attribute}}</td>
                    <td>{{v.formats}}</td>
                    <td>{{v.user}}</td>
                    <td>{{v.time}}</td>
                    <td>{{v.state}}</td>
                    <td>{{v.template}}</td>
                    <td>{{v.time1}}</td>
                    <td>{{v.time2}}</td>
                    <td>{{v.time3}}</td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            value1:'',//时间选择器1
            value2:'',//时间选择器2
            name_in1:'',
            name_in2:'',
            name_in3:'',
            pageIndex:1,//当前页数
            pageSize:10,//每页显示条数
            centerDialogVisible: false,//对话框
            storeSelectData:[//组件传值
                {
                    name:'所有物品分类',
                    id:'1',
                    children:[
                        {name:'开业物品',id:'1-1'},
                        {name:'常用物品',id:'1-2'},
                        {name:'冷冻产成品',id:'1-3'},
                        {name:'印字低值易耗品',id:'1-4'},
                        {name:'产成品',id:'1-5'},
                        {name:'低值易耗品',id:'1-6'},
                        {name:'门店原料品',id:'1-7'},
                    ]
                },
            ],
            data_list:[ //渲染数据
                // {s_name:'',brand:'',attribute:'',areaName:'',formats:'',user:'',time:'',state:'',template:'',time1:'',time2:'',time3:'',},
            ],
        }
    },
    methods:{
        //点击导出事件
        Export(){
            this.centerDialogVisible=true;
        }
    },
    components:{
    }
}
</script>
<style scoped>
    /*头部搜索样式*/
    hr{
        width:100%;
        margin:10px auto;
        border: 0;
        height: 1px;
        background:#eee;
    }
    .searchWrap .item{
        height:50px;
        line-height:50px;
    }
    .searchWrap .item span{
        display:inline-block;
        width:100px;
        text-align:right;
        margin-right:20px;
    }
</style>