<!-- 新增会员 -->
<template>
    <div class="postPre">
        <div class="Warm_prompt">
                注：新增会员信息填写完成并保存成功后，此手机号对应的用户即为会员，商户可以对此会员进行权益赠送、调整等操作；<br>
                也可引导会员在微信公众号/小程序中绑定会员卡自主查询会员信息或进行权益使用
        </div>
        <br>
        <!--  -->
        <div class="commonHeader_style">
            <!--  -->
            <p style="color:#666;font-size:18px;font-weight:600;padding-bottom:20px;">新增会员</p>
            <!--  -->
            <div>
                <!-- 1 -->
                <div>
                    <div class="inlneBlock leftTitles">姓名</div>
                    <div class="inlneBlock">
                        <el-input v-model="uname" style="width:300px;" size="small" placeholder="请输入内容"></el-input>  
                    </div>
                </div>
                <br>
                <!-- 2 -->
                <div>
                    <div class="inlneBlock leftTitles">手机号</div>
                    <div class="inlneBlock">
                        <el-input v-model="phoneNumber" style="width:300px;" size="small" placeholder="请输入内容"></el-input>  
                    </div>
                </div>
                <br>
                <!-- 3 -->
                <div>
                    <div class="inlneBlock leftTitles">实充金额</div>
                    <div class="inlneBlock">
                        <el-input-number v-model="chargeAmount" size="small" placeholder="请输入实充金额" style="width:300px;" controls-position="right" :min="0"></el-input-number> 
                        &nbsp;
                        <span>元</span>
                        &nbsp;&nbsp;&nbsp;
                        <span class="tipsRight">
                            注：此字段对应会员的可用实充，不填写则默认为0
                        </span>
                    </div>
                </div>
                <br>
                <!-- 4 -->
                <div>
                    <div class="inlneBlock leftTitles">赠送金额</div>
                    <div class="inlneBlock">
                        <el-input-number v-model="givingMoney" size="small" placeholder="请输入赠送金额" style="width:300px;" controls-position="right" :min="0"></el-input-number> 
                        &nbsp;
                        <span>元</span>
                        &nbsp;&nbsp;&nbsp;
                        <span class="tipsRight">
                            注：此字段对应会员的可用赠送，不填写则默认为0
                        </span>
                    </div>
                </div>
                <br>
                <!-- 5 -->
                <div>
                    <div class="inlneBlock leftTitles">赠送积分</div>
                    <div class="inlneBlock">
                        <el-input-number v-model="PresentIntegral" size="small" placeholder="请输入赠送积分" style="width:300px;" controls-position="right" :min="0"></el-input-number> 
                        &nbsp;
                        <span>元</span>
                        &nbsp;&nbsp;&nbsp;
                        <span class="tipsRight">
                            注：此字段对应会员的可用赠送，不填写则默认为0
                        </span>
                    </div>
                </div>
                <br>
                <!-- 6 -->
                <div>
                    <div class="inlneBlock leftTitles">成长值</div>
                    <div class="inlneBlock">
                        <el-input-number v-model="GrowthValue" size="small" placeholder="请输入成长值" style="width:300px;" controls-position="right" :min="0"></el-input-number> 
                        &nbsp;
                        <span>元</span>
                        &nbsp;&nbsp;&nbsp;
                        <span class="tipsRight">
                            注：不填写则默认为0
                        </span>
                    </div>
                </div>
                <br>
                <!-- 7 -->
                <div>
                    <div class="inlneBlock leftTitles">性别</div>
                    <div class="inlneBlock">
                        <el-select v-model="gender" style="width:300px;" size="small" placeholder="请选择性别">
                            <el-option label="男" :value="0"></el-option>
                            <el-option label="女" :value="1"></el-option>
                        </el-select>
                    </div>
                </div>
                <br>
                <!-- 8 -->
                <div>
                    <div class="inlneBlock leftTitles">生日</div>
                    <div class="inlneBlock">
                        <el-date-picker
                        v-model="birthday"
                        style="width:300px;"
                        type="date"
                        size="small"
                        placeholder="选择日期">
                        </el-date-picker>
                    </div>
                </div>
                <br>
                <!--  -->
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
                birthday:'',//生日
                gender:'',//性别
                GrowthValue:'',//成长值
                PresentIntegral:'',//赠送积分
                givingMoney:'',//赠送金额
                chargeAmount:'',//实充金额
                uname:'',//姓名
                phoneNumber:'',//手机号
            }
        },
        created(){
            console.log('新增会员')
        },
        methods:{
            // 保存
            save(){
                this.$message({
                    message: '保存成功！',
                    type: 'success'
                });
                this.$router.push('/HomePage/sser_MGM')
            },
            // 取消按钮
            cancel(){
                this.$confirm('取消后,您本次操作所做的修改将不会保存,确定要取消么？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$router.push('/HomePage/sser_MGM')
                })
            }
        }
    }
</script>

<style scoped>
    .postPre{
        padding:10px;
    }
    .Warm_prompt{
        padding:20px;
        background:#FFF7EE;
        border:1px solid #FFE6C6;
        border-radius:5px;
        color:#666;
    }
    .inlneBlock{
        display: inline-block;
    }
    .leftTitles{
        width:69px;
        padding-right:20px;
        text-align: right;
        font-size:14px;
    }
    .tipsRight{
        color:#999;
    }
</style>