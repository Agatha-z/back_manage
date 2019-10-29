<template>
    <div>
        <el-row :gutter="10">
            <el-col :span="5">
                <div style="line-height:40px;">
                    选择等级
                    &nbsp;
                    <span style="color:red;font-size:18px;vertical-align:top">*</span>
                </div>
            </el-col>
            <el-col :span="19">
                <div>
                    <el-select v-model="level" placeholder="请选择" size="medium" style="width:300px;">
                        <el-option label="青铜" :value="0"></el-option>
                        <el-option label="白银" :value="1"></el-option>
                        <el-option label="黄金" :value="2"></el-option>
                        <el-option label="铂金" :value="3"></el-option>
                        <el-option label="钻石" :value="4"></el-option>
                        <el-option label="星耀" :value="5"></el-option>
                        <el-option label="王者" :value="6"></el-option>
                    </el-select> 
                </div>
            </el-col>
        </el-row>
        <!--  -->
        <br>
        <el-row :gutter="10">
            <el-col :span="5">
                <div style="line-height:40px;">
                    调整原因
                    &nbsp;
                    <span style="color:red;font-size:18px;vertical-align:top">*</span>
                </div>
            </el-col>
            <el-col :span="19">
                <div>
                    <el-input
                    style="margin-top:10px;"
                    type="textarea"
                    :autosize="{ minRows: 3, maxRows: 4}"
                    placeholder="请输入内容"
                    v-model="textarea3">
                    </el-input>

                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                textarea3:'',//调整原因绑定数据
                level:'',//等级
            }
        }
    }
</script>

<style scoped>
    .el-radio{
        margin-left:0;
        margin-right:30px;
        margin-top:10px;
    }
</style>