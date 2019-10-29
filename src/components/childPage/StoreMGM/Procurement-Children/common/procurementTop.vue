<template>
    <!--头部搜索-->
    <div class="searchWrap">
        <div style="display:flex;">
            <div class="item" style="margin-right:30px;">
                <span style="font-size:18px;font-weight:600;float:left;">采购门店</span>
                <!--组件-->
                <div class="fl" style="line-height:20px;">
                    <storeSelect :storeSelectData='storeSelectData' :inputWidth="290" :placeholder="['请选择门店','已选择门店点击下拉按钮查看']" @selectChange="selectChange"></storeSelect>
                </div>
                <span style="font-size:18px;font-weight:600;float:left;">采购日期</span>
                <el-date-picker
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
                
            </div>
        </div>
        <div style="display:flex;margin-top:20px;">
            <div class="item"  style="margin-right:50px;">
                <span style="font-size:18px;font-weight:600;">单据号</span>
                <el-input style="width:350px;" size="medium" clearable></el-input>
                <el-button type="primary" size="small" icon="el-icon-search" @click="seachAndClear(1)" style="margin-left:10px;">搜索</el-button>
                <el-button type="info"  size="small" icon="el-icon-refresh" @click="seachAndClear(2)">重置</el-button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
//====================================================================================头部搜索组件
            value1: "", //时间选择器1
            value2: "", //时间选择器2
            name_in3: "",
            // 下拉菜单传值
            storeSelectData: [
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
        // 子组件传递过来的下拉菜单事件
        selectChange(e){
            console.log(e)
        }
    }
}

</script>
<style scoped>
/*组件头部搜索*/
.searchWrap .item {
  display: flex;
  align-items: center;
  line-height:40px;
}
.searchWrap .item span {
  display: inline-block;
  width: 100px;
  text-align: right;
  margin-right: 20px;
}
</style>


