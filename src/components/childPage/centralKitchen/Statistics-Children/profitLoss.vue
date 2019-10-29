<!--盘点盈亏表-->
<template>
    <div>
        <!--头部搜索-->
        <div class="searchWrap">
            <div class="search-top" style="display:flex;">
                <div class="item">
                    <span style="font-size:18px;font-weight:600;float:left;">总部仓库</span>
                    <el-select style="width:290px;margin-right:20px;float:left;"  v-model="name_in1" placeholder="请选择">
                        <el-option label="产成品仓" :value="1"></el-option>
                        <el-option label="低值易耗品仓" :value="2"></el-option>
                        <el-option label="百货用品仓" :value="3"></el-option>
                        <el-option label="原材料仓" :value="4"></el-option>
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
                    <!--  -->
                    <el-button type="primary" size="small" icon="el-icon-search" @click="seachAndClear(1)" style="margin-left:10px;">搜索</el-button>
                    <el-button type="info"  size="small" icon="el-icon-refresh" @click="seachAndClear(2)">重置</el-button>
                </div>
            </div>
            <div class="search-bottom" style="margin-top:20px;display:flex;">
                <!--  -->
                <div  class="item">
                    <span style="font-size:18px;font-weight:600;float:left;">物品类别</span>
                    <!--组件-->
                    <div class="fl">
                    	<storeSelect :storeSelectData='storeSelectData' style="margin-right:20px;"></storeSelect>
                    </div>
                    <span style="font-size:18px;font-weight:600;float:left;">物品名称</span>
                    <el-input style="margin-right:20px;width:310px;float:left;" size="medium" clearable></el-input>
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
                没有需要导出的数据
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
                    <th rowspan="2" style="width:30px;"></th>
                    <th rowspan="2">仓库</th>
                    <th rowspan="2">物品类别</th>
                    <th rowspan="2">物品名称</th>
                    <th rowspan="2">库存单位</th>
                    <th rowspan="2">盘点日期</th>
                    <th rowspan="2">标准用量</th>
                    <th rowspan="2">标注成本</th>
                    <th rowspan="2">实际用量</th>
                    <th rowspan="2">实际成本</th>
                    <th colspan="2">盘盈</th>
                    <th colspan="2">盘亏</th>
                    <th rowspan="2">详情</th>
                </tr>
                <tr class="addline">
                    <th>数量</th>
                    <th>金额</th>
                    <th>数量</th>
                    <th>金额</th>
                </tr>
                <!-- 无数据显示 -->
            </table>
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
        //点出导出事件
        Export(){
            this.centerDialogVisible=true;
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
    .pageBtn{
        margin: 20px auto 0 25%;
    }
    .addline th{
        border-top:1px solid #ccc;
        border-right:1px solid #ccc;
    }
</style>