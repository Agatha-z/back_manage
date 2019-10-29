<!-- 采购物品差异表 -->
<template>
    <div class="postPre">
        <!--头部搜索-->
        <div class="tab-content">
            <div class="query-form">
                <div class="form-group form-groupLeft">
                    <label>订货门店</label>
                    <storeSelect :inputWidth="290" :storeSelectData='storeSelectData' :placeholder="['请选择门店','已选择门店点击下拉按钮查看']"  @selectChange="selectStoreChange"></storeSelect> 
                </div>
                <div class="form-group form-groupRight">
                    <label>收货日期</label>
                    <el-date-picker
                        style="margin-right:20px;width:220px;"
                        v-model="value1"
                        type="date"
                        placeholder="选择日期">
                        </el-date-picker>
                        <!--  -->
                        <el-date-picker
                        v-model="value2"
                        type="date"
                        style="width:220px;"
                        placeholder="选择日期">
                    </el-date-picker>
                </div>
            </div>
            <div class="query-form">
                <div class="form-group form-groupLeft">
                    <label>物品类别</label>
                    <storeSelect :inputWidth="290" :storeSelectData='cateogoryData' :placeholder="['请选择物品类型','已选择物品点击下拉按钮查看']"></storeSelect> 
                </div>
                <div class="form-group form-groupRight">
                    <label>物品名称</label>
                    <el-input style="width:347.34px;" size="medium" clearable placeholder="根据编码,名称检索物品..."></el-input>
                </div>
            </div>
            <div class="query-form">
                <div class="form-group form-groupLeft">
                    <label>
                        <el-button type="primary" size="small" icon="el-icon-search" @click="seachAndClear(1)" style="margin-left:10px;">搜索</el-button>
                    </label>
                    <el-button type="info"  size="small" icon="el-icon-refresh" @click="seachAndClear(2)">重置</el-button>
                </div>
                <div class="form-group form-groupRight">
                </div>
            </div>
        </div>
        <!--打印导出-->
        <div> 
            <el-button type="primary">打印<i class="el-icon-printer el-icon--right"></i></el-button>
            <el-button type="primary"  @click="exportExcel">导出<i class="el-icon-download el-icon--right"></i></el-button>
        </div>
        <!--数据-->
        <div style="margin-top:10px;">
            <table border="0" cellspacing="0" class="table_list">
                <tr>
                    <th></th>
                    <th>门店</th>
	                <th>物品名称</th>
	                <th>物品类别</th>
                    <th>订货单位</th>
                    <th>订货总量</th>	
                    <th>订货总额</th>	
                    <th>发货总量</th>
                    <th>发货总额</th>	
                   	<th>实收总量</th>
                    <th>实收总额</th>	
                    <th>差异总量(实收-订货)</th>
                    <th>差异总额(实收-订货)</th>
                    <th>详情</th>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                value1:'',
                value2:'',
                nowStoreSelectOn:[],// 订货门店下拉弹框选中的项目
                storeSelectData: [
                    //组件传值订货门店
                    {
                    name: "合肥市安业餐饮管理有限公司",
                    id: "1",
                    children: [
                        { name: "安少爷米线(滨湖世纪金源店)(加盟店)", id: "1-1" },
                        { name: "安少爷米线(滨湖世纪金源店)(加盟店)", id: "1-2" },
                        { name: "安少爷米线(滨湖世纪金源店)(加盟店)", id: "1-3" },
                        { name: "安少爷米线(滨湖世纪金源店)(加盟店)", id: "1-4" },
                        { name: "安少爷米线(滨湖世纪金源店)(加盟店)", id: "1-5" },
                        { name: "安少爷米线(滨湖世纪金源店)(加盟店)", id: "1-6" },
                        { name: "安少爷米线(滨湖世纪金源店)(加盟店)", id: "1-7" }
                    ]
                    }
                ],
                cateogoryData:[
                    //组件传值物品类别
                    {
                    name: "所有物品类别",
                    id: "1",
                    children: [
                        { name: "开业用品", id: "1-1" },
                        { name: "常用物品", id: "1-2" },
                        { name: "冷冻产成品", id: "1-3" },
                        { name: "印字低值易耗品", id: "1-4" },
                        { name: "产成品", id: "1-5" },
                        { name: "低值易耗品", id: "1-6" },
                        { name: "门店原材料", id: "1-7" }
                    ]
                    }
                ]
            }
        },
        methods:{
            //点击订货门店选中事件
            selectStoreChange(data){
                this.nowStoreSelectOn=data;
            },
            //点击导出按钮
            exportExcel(){
                if(this.nowStoreSelectOn.length==0){
                    this.$message({
                        message: '请选择订货门店',
                        type: 'warning',
                        duration:'3000'
                    });
                }else{
                    console.log('导出数据')
                }
            }
        },
        created(){
            console.log('门店供应商')
        }
    }
</script>

<style scoped>
.postPre{
    padding:10px;
}
    /*头部搜索*/
.tab-content{
    padding:10px;
    width:100%;
}
.query-form{
    width:100%;
    display:flex;
}
.form-group{
    display:flex;
    align-items:center;
    margin-bottom:20px;
}
.form-group.form-groupLeft{
    width:40%;
}
.form-group.form-groupRight{
    width:40%;
}
.form-group label{
    width:20%;
    text-align:right;
    font-size:16px;
    font-weight:600;
    margin-right:10px;
}
table tr>th:last-child{
    width:auto;
}
</style>