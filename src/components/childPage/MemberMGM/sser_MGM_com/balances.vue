<template>
    <div>
        <!--  -->
        <el-row :gutter="10">
            <el-col :span="5">
                <div style="line-height:40px;">
                    选择方式
                    &nbsp;
                    <span style="color:red;font-size:18px;vertical-align:top">*</span>
                </div>
            </el-col>
            <el-col :span="19">
                <div>
                    <el-radio-group v-model="radio3">
                        <el-radio :label="0">增加金额</el-radio>
                        <el-radio :label="1">减少余额</el-radio>
                    </el-radio-group>        
                </div>
            </el-col>
        </el-row>
        <!--  -->
        <br>
        <el-row :gutter="10">
            <el-col :span="5">
                <div style="line-height:40px;">
                    选择门店
                    &nbsp;
                    <span style="color:red;font-size:18px;vertical-align:top">*</span>
                </div>
            </el-col>
            <el-col :span="19">
                <div>
                    <el-select v-model="storeSelect" placeholder="请选择" size="medium" style="width:300px;">
                        <el-option label="安少爷米线（天鹅湖店）" :value="0"></el-option>
                        <el-option label="安少爷米线（三里庵店）" :value="1"></el-option>
                        <el-option label="安少爷米线（之心城店）" :value="2"></el-option>
                        <el-option label="安少爷米线（绿地瀛海店）" :value="3"></el-option>
                        <el-option label="安少爷米线（后街食府店）" :value="4"></el-option>
                        <el-option label="安少爷米线（国购广场店）" :value="5"></el-option>
                        <el-option label="安少爷米线（大润发店）" :value="6"></el-option>
                        <el-option label="安少爷米线（万达广场店）" :value="7"></el-option>
                    </el-select> 
                </div>
            </el-col>
        </el-row>
        <!--  -->
        <br>
        <el-row :gutter="10">
            <el-col :span="5">
                <div style="line-height:40px;">
                    调整实充
                    &nbsp;
                    <span style="color:red;font-size:18px;vertical-align:top">*</span>
                </div>
            </el-col>
            <el-col :span="19">
                <div>
                    <el-input-number v-model="TheActual" placeholder="请输入内容" :min="0" size="medium" style="width:300px;"></el-input-number>
                    &nbsp;元
                </div>
            </el-col>
        </el-row>
        <!--  -->
        <br>
        <el-row :gutter="10">
            <el-col :span="5">
                <div style="line-height:40px;">
                    调整赠送
                    &nbsp;
                    <span style="color:red;font-size:18px;vertical-align:top"></span>
                </div>
            </el-col>
            <el-col :span="19">
                <div>
                    <el-input-number v-model="giving" placeholder="请输入内容" :min="0" size="medium" style="width:300px;"></el-input-number>
                    &nbsp;元
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
                giving:'',//调整赠送绑定数据
                TheActual:'',//调整实充绑定数据
                storeSelect:'',//门店选择绑定数据
                radio3:0,//调整余额绑定单选框
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