<!-- 供应商统计表 -->
<template>
    <div class="postPre">
        <!--头部搜索功能-->
        <div class="tab-content">
            <div class="query-form">
                <div class="form-group form-groupLeft">
                    <label>门店</label>
                    <storeSelect :inputWidth="290" :storeSelectData='storeSelectData'  @selectChange="selectStoreChange"></storeSelect> 
                </div>
                <div class="form-group form-groupRight">
                    <label>物品类别</label>
                    <storeSelect :inputWidth="290" :storeSelectData='[]'></storeSelect> 
                </div>
            </div>
            <div class="query-form">
                <div class="form-group form-groupLeft">
                    <label>供应商名称</label>
                    <el-select   size="medium" placeholder="请选择" style="width:347.34px;" v-model="value1">
                        <el-option label="请选择" :value="1"></el-option>
                    </el-select>
                </div>
                <div class="form-group form-groupRight">
                    <label>日期</label>
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
            <div class="form-group form-groupLeft">
                <label></label>
                <el-button type="primary" size="small" icon="el-icon-search" @click="seachAndClear(1)" style="margin-left:10px;">搜索</el-button>
                <el-button type="info"  size="small" icon="el-icon-refresh" @click="seachAndClear(2)">重置</el-button>
            </div>
        </div>
        <!--导出-->
        <div>
            <el-button type="primary" @click="exportExcel">导出<i class="el-icon-download el-icon--right"></i></el-button>
        </div>
        <!--数据-->
        <div style="margin-top:10px;">
            <table border="0" cellspacing="0" class="table_list">
                <tr>
                    <th></th>
                    <th>供应商名称</th>	
                    <th>门店</th>	
                    <th>物品名称</th>	
                    <th>物品类别</th>	
                    <th>订货单位</th>	
                    <th>采购数量</th>	
                    <th>采购金额(元)</th>	
                    <th>退货数量</th>	
                    <th>退货金额(元)</th>	
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
                nowStoreSelectOn:[],// 门店下拉弹框选中的项目
                storeSelectData: [
                    //组件传值
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
            }
        },
        methods:{
            //  点击选择门店事件
            selectStoreChange(data){
                this.nowStoreSelectOn=data;
            },
            // 点击导出
            exportExcel(){
                if(this.nowStoreSelectOn.length==0){
                    this.$message({
                        message: '请先选择门店',
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
</style>