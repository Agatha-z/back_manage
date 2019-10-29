<!--中央厨房-头部搜索组件-->
<template>
    <div>
        <div class="searchWrap">
            <div class="search-top">
                <div class="item" >
                    <span style="font-size:18px;font-weight:600;" class="fl">单据号</span>
                    <el-input style="margin-right:30px;width:200px;" size="medium" clearable placeholder="请输入单据号" class="fl"></el-input>
                    <span style="font-size:18px;font-weight:600;" class="fl">采购日期</span>
                    <el-date-picker
                    size="large"
                    style="margin-right:20px;width:180px;float:left;"
                    v-model="value1"
                    type="date"
                    placeholder="选择日期">
                    </el-date-picker>
                    <!--  -->
                    <el-date-picker
                    v-model="value2"
                    style="width:180px;float:left;"
                    type="date"
                    placeholder="选择日期">
                    </el-date-picker>
                    <!--  -->
                    <el-button type="primary" size="small" icon="el-icon-search" @click="seachAndClear(1)" style="margin-left:10px;">搜索</el-button>
                    <el-button type="info"  size="small" icon="el-icon-refresh" @click="seachAndClear(2)">重置</el-button>
                </div>
            </div>
            <div class="search-bottom" style="margin-top:20px;">
                <!--  -->
                <div v-show="status"  class="item">
                    <span style="font-size:18px;font-weight:600;" class="fl">状态</span>
                    <el-select style="width:200px;margin-right:30px;float:left;"  v-model="name_in" placeholder="请选择">
                        <el-option label="未提交" :value="1"></el-option>
                        <el-option label="待审核" :value="2"></el-option>
                        <el-option label="待收货" :value="3"></el-option>
                        <el-option label="已完成" :value="4"></el-option>
                    </el-select>
                    <span style="font-size:18px;font-weight:600;float:left;">供应商名称</span>
                    <el-select style="width:200px;float:left;"  size="medium" v-model="name_in" placeholder="请选择">
                        <el-option label="蔬菜供应商" :value="1"></el-option>
                        <el-option label="冻品供应商" :value="2"></el-option>
                        <el-option label="干货调料供应商" :value="3"></el-option>
                        <el-option label="中央厨房" :value="4"></el-option>
                    </el-select>
                </div>
            </div>
        </div>
        <!--分割线-->
        <hr>
    </div>
</template>
<script>
export default {
    props:{
        status:{
            type:Boolean,
            default:true
        }
    },
    data(){
        return{
            value1:'',//时间选择器1
            value2:'',//时间选择器2
            name_in:'',//顶部状态以及品牌供应商下拉框
        }
    },
    methods:{

    },
    created () {
        // console.log(this.status)
    }
}
</script>
<style scoped>
    hr{
        display:block;
        width:100%;
        margin:10px auto;
        border: 0;
        height: 1px;
        background:#eee;
    }
    .searchWrap .item{
        height:40px;
        line-height:40px;
    }
    .searchWrap .item span{
        display:inline-block;
        width:100px;
        text-align:right;
        margin-right:20px;
    }
</style>

