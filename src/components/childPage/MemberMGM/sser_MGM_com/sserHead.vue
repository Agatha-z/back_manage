<template>
    <div>
        <!-- 头部显示 -->
        <el-row :gutter="0">
            <el-col :span="6">
                <div class="Head_portrait" onselectstart="return false">
                    <img src="/static/user.png" alt="">
                </div>
            </el-col>
            <el-col :span="18">
                <div class="Head_content">
                    <p style="font-size:16px;font-weight:600;">揪你小jiji</p>
                    <br>
                    <p>
                        <span>手机号：1328564733</span>
                        &nbsp;&nbsp;&nbsp; 
                        <span>会员卡号：81838485768448444</span>
                    </p>
                    <br>
                    <p>
                        可用余额：<span style="color:red;"> 0元 （实充0元，赠送0元）</span>
                    </p>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        props:{

        }
    }
</script>

<style scoped>
    .Head_portrait{
        width:100px;
        height:100px;
    }
    .Head_content{
        padding:6px 0;
        box-sizing: border-box;
        height:100px;
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-between;
    }
</style>