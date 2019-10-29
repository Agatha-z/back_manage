<!-- 添加手动会员标签 -->
<template>
    <div class="postPre">
        <div class="commonHeader_style">
            <p style="font-size:17px;font-weight:550">新建手动标签</p>
            <br>
            <!--  -->
            <div>
                <div class="inlneBlock_all leftTitles">标签名称</div>
                <div class="inlneBlock_all">
                    <el-input v-model="labelName" style="width:300px;" size="small" placeholder="请输入内容"></el-input>  
                </div>
            </div>
        </div>
        <br>
        <!--  -->
        <div class="commonHeader_style" style="text-align:center">
            <el-button type="success" size="medium" @click="save">
                <i class="el-icon-download"></i>
                保存
            </el-button>
            <el-button type="info" size="medium" @click="cancel">
                <i class="el-icon-circle-close-outline"></i>
                取消
            </el-button>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                labelName:'',//标签名称
            }
        },
       created(){
           console.log('添加手动会员标签')
       },
       methods:{
            // 保存
            save(){
                this.$message({
                    message: '保存成功！',
                    type: 'success'
                });
                this.$router.push('/HomePage/vipLabel')
            },
            // 取消按钮
            cancel(){
                this.$confirm('取消后,您本次操作所做的修改将不会保存,确定要取消么？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$router.push('/HomePage/vipLabel')
                })
            }
       }
    }
</script>

<style scoped>
    .postPre{
        padding:10px;
    }
    .leftTitles{
        width:69px;
        padding-right:20px;
        text-align: right;
        font-size:14px;
    }
</style>