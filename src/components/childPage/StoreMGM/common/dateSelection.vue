<template>
    <div>
        <label style="font-size:18px;font-weight:600;margin-right:20px;">日期</label>
        <el-date-picker
            style="margin-right:20px;width:180px;"
            v-model="value1"
            type="date"
            >
            </el-date-picker>
            <!--  -->
            <el-date-picker
            v-model="value2"
            type="date"
            style="margin-right:20px;width:180px;"
            >
        </el-date-picker>
        <el-button type="primary" size="small" icon="el-icon-search" @click="seachAndClear(1)" style="margin-left:10px;">搜索</el-button>
        <el-button type="info"  size="small" icon="el-icon-refresh" @click="seachAndClear(2)">重置</el-button>
    </div>
</template>
<script>
export default {
    data(){
        return{
            value1:'',
            value2:'',
        }
    }
}
</script>
<style scoped>

</style>


