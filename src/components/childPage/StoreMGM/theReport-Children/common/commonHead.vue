<template>
    <!--头部搜索功能-->
    <div class="tab-content">
        <div class="query-form fl">
            <div class="form-group form-groupLeft fl">
                <label class="fl">门店</label>
                <div class="fl" style="margin-right:60px;line-height:20px;">
                	<storeSelect :inputWidth="280" :storeSelectData='storeSelectData' @selectChange="selectChange"></storeSelect> 
                </div>
                <label class="fl">物品类别</label>
                <div class="fl" style="line-height:20px;">
                	<storeSelect :inputWidth="280" :storeSelectData='[]'></storeSelect> 
                </div>
                <div style="clear:both;"></div>
            </div>
        </div>
        <div class="query-form">
            <div class="form-group form-groupLeft">
                <label class='fl'>仓库</label>
                <el-select   size="medium" placeholder="请选择" style="width:337.34px;float:left;margin-right:60px;" v-model="value1">
                    <el-option label="请选择" :value="1"></el-option>
                </el-select>
                <label class="fl">物品名称</label>
                <el-input style="width:337.34px;float:left;" size="medium" clearable></el-input>
            </div>
            <div style="clear:both;height:20px;"></div>
        </div>
        <div class="query-form">
            <div class="form-group form-groupLeft fl" v-if="show">
                <label class="fl">预警状态</label>
                <el-select   size="medium" placeholder="请选择"  style="width:337.34px;float:left;margin-right:90px;" v-model="value2">
                    <el-option label="请选择"      :value="1"></el-option>
                    <el-option label="高于最高库存" :value="2"></el-option>
                    <el-option label="低于最低库存" :value="3"></el-option>
                </el-select>
            </div>
            <div class="form-group form-groupLeft fl" v-else>
                <label class="fl">日期</label>
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
            <div class="form-group form-groupRight">
                <label >
                    <el-button type="primary" size="small" icon="el-icon-search" @click="seachAndClear(1)" style="margin-left:10px;">搜索</el-button>
                </label>
                <el-button type="info"  size="small" icon="el-icon-refresh" @click="seachAndClear(2)">重置</el-button>
            </div>
        </div>
        <div> 
            <el-button type="primary" v-show="printState">打印<i class="el-icon-printer el-icon--right"></i></el-button>
            <el-button type="primary" @click="exportExcel">导出<i class="el-icon-download el-icon--right"></i></el-button>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        show:{//预警状态框显示与否
            type:Boolean,
            default:false
        },
        printState:{//打印按钮显示与否
            type:Boolean,
            default:false
        }
    },
    data(){
        return{
            value1:'',//时间选择器1
            value2:'',//时间选择器2
            nowSelectOn:[],// 下拉弹框选中的项目
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
        // 点击导出
        exportExcel(){
            if(this.nowSelectOn.length==0){
                this.$message({
                    message: '请先选择门店',
                    type: 'warning',
                    duration:'3000'
                });
            }else{
                console.log('导出数据')
            }
        },
        // 点击下拉菜单选择门店
        selectChange(data){
            this.nowSelectOn=data;
        }
    }
}
</script>
<style scoped>
/*头部搜索*/
.tab-content{
    padding:10px;
    width:100%;
}
.query-form{
    width:100%;
}
.form-group{
    margin-bottom:20px;
    height:50px;
    line-height:50px;
}

.form-group label{
    width:100px;
    text-align:right;
    font-size:16px;
    font-weight:600;
    margin-right:10px;
}
</style>

