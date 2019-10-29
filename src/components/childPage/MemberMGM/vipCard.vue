<!-- 会员卡 -->
<template>
    <div class="postPre">
        <div class="commonHeader_style">
            <div class="starts">
                会员卡状态: <span>创建成功</span>
            </div>
            <!--  -->
            <div class="ends">
                <el-button type="primary" size="small" icon="el-icon-edit">编辑会员卡</el-button>
            </div>
            <!-- 清除浮动 -->
            <div style="clear:both"></div>
        </div>
        <br>
        <!--  -->
        <div class="commonHeader_style">
            <!--  -->
            <div class="starts">
                <!--  -->
                <el-row :gutter="10">
                    <el-col :span="4">
                        <div class="titles_vip">
                            会员卡公用字段
                        </div>
                    </el-col>
                    <el-col :span="20">
                        <div class="content_vips">
                            <div>
                                <div class="left inlneBlock_all">
                                    会员卡名称
                                </div>
                                <div class="right inlneBlock_all">
                                    安少爷会员卡
                                </div>
                            </div>
                            <!--  -->
                            <div>
                                <div class="left inlneBlock_all">
                                    卡有效期
                                </div>
                                <div class="right inlneBlock_all">
                                    永久有效
                                </div>
                            </div>
                            <!--  -->
                            <div>
                                <div class="left inlneBlock_all">
                                    适用门店
                                </div>
                                <div class="right inlneBlock_all">
                                    全部门店
                                </div>
                            </div>
                            <!--  -->
                            <div>
                                <div class="left inlneBlock_all">
                                    使用须知
                                </div>
                                <div class="right inlneBlock_all">
                                    一人一卡
                                </div>
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <br>
                <!--  -->
                <el-row :gutter="10">
                    <el-col :span="4">
                        <div class="titles_vip">
                            微信渠道专用字段
                        </div>
                    </el-col>
                    <el-col :span="20">
                         <div class="content_vips">
                            <div>
                                <div class="left inlneBlock_all">
                                    卡面图片
                                </div>
                                <div class="right inlneBlock_all">
                                    <img style="width:160px;" src="/static/vip.png" alt="">
                                </div>
                            </div>
                            <!--  -->
                            <div>
                                <div class="left inlneBlock_all">
                                    栏位信息
                                </div>
                                <div class="right inlneBlock_all">
                                    <span>积分</span>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <span>等级</span>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <span>优惠券</span>
                                </div>
                            </div>
                            <!--  -->
                            <div>
                                <div class="left inlneBlock_all">
                                    等级卡面
                                </div>
                                <div class="right inlneBlock_all">
                                    无（未配置此字段信息）
                                </div>
                            </div>
                            <!--  -->
                            <div>
                                <div class="left inlneBlock_all">
                                    快捷入口
                                </div>
                                <div class="right inlneBlock_all" style="min-width:500px;">
                                    <table class="table_list" border="0" cellspacing="0">
                                        <tr>
                                            <th></th>
                                            <th>入口名称</th>
                                            <th>跳转链接</th>
                                            <th>入口提示语</th>
                                        </tr>
                                        <!--  -->
                                        <tr>
                                            <td>入口1</td>
                                            <td>优惠买单</td>
                                            <td>功能链接>优惠买单</td>
                                            <td>点此买单</td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                            <!--  -->
                            <div>
                                <div class="left inlneBlock_all">
                                    营销入口
                                </div>
                                <div class="right inlneBlock_all">
                                    无（未配置此字段信息）
                                </div>
                            </div>
                            <!--  -->
                        </div>
                    </el-col>
                </el-row>
                 <br>
                <!--  -->
                <el-row :gutter="10">
                    <el-col :span="4">
                        <div class="titles_vip">
                            会员卡详情
                        </div>
                    </el-col>
                    <el-col :span="20">
                        <div class="content_vips">
                            <!--  -->
                            <div>
                                <div class="left inlneBlock_all">
                                    操作提示
                                </div>
                                <div class="right inlneBlock_all">
                                    请在会员引导下进行使用
                                </div>
                            </div>
                            <!--  -->
                            <div>
                                <div class="left inlneBlock_all">
                                    特权说明
                                </div>
                                <div class="right inlneBlock_all">
                                    <p>充值100元赠送100积分</p>
                                    <p>充值300元赠送300积分</p>
                                </div>
                            </div>
                            <!--  -->
                            <div>
                                <div class="left inlneBlock_all">
                                    客服电话
                                </div>
                                <div class="right inlneBlock_all">
                                    4008397009
                                </div>
                            </div>
                            <!--  -->
                            <div>
                                <div class="left inlneBlock_all">
                                    商户服务
                                </div>
                                <div class="right inlneBlock_all">
                                    免费wifi
                                </div>
                            </div>
                            <!--  -->
                        </div>
                    </el-col>
                </el-row>
                <!--  -->
            </div>
            <!--  -->
            <div class="ends">
                <div class="phone_boxs commonHeader_style" onselectstart="return false">
                    <img style="width:100%" src="/static/download.png" alt="">
                    <!-- 会员卡图案 -->
                    <div class="vipCardPic">
                        <div class="showDetails">
                            <!-- 头像 -->
                            <div class="floatLeft">
                                <img src="/static/touxiang.png" alt="">
                            </div>
                            <!-- 内容 -->
                            <div class="floatLeft" style="margin-left:3px;">
                                <!--  -->
                                <p>安少爷米线</p>
                                <!--  -->
                                <p>安少爷会员卡</p>
                            </div>
                        </div>
                    </div>
                    <!--  -->
                    <div>
                        <div style="margin:auto;width:200px;padding-left:3px">
                            <div class="inlneBlock_all_s inlneBlock_all">
                                <p>积分</p>
                                <p>0</p>
                            </div>
                            <!--  -->
                            <div class="inlneBlock_all_s inlneBlock_all">
                                <p>等级</p>
                                <p>查看</p>
                            </div>
                            <!--  -->
                            <div class="inlneBlock_all_s inlneBlock_all">
                                <p>优惠券</p>
                                <p>查看</p>
                            </div>
                        </div>
                    </div>
                    <!--  -->
                    <div class="border-tops">
                        <div class="listBox">
                            <p>会员中心</p>
                            <p>更多服务></p>
                        </div>
                        <div class="listBox">
                            <p>会员卡详情</p>
                            <p>></p>
                        </div>
                        <div class="listBox">
                            <p>适合门店</p>
                            <p>100米></p>
                        </div>
                        <div class="listBox">
                            <p>公众号</p>
                            <p>></p>
                        </div>
                    </div>
                    <!--  -->
                </div>
            </div>
            <!-- 清除浮动 -->
            <div style="clear:both"></div>
        </div>
        <!--  -->
        <br>
        <div class="commonHeader_style">
            <div class="starts">
                <!--  -->
                <el-row :gutter="10">
                    <el-col :span="4">
                        <div class="titles_vip">
                            开卡资料
                        </div>
                    </el-col>
                    <el-col :span="20">
                        <div class="content_vips">
                            <!--  -->
                            <div>
                                <div class="left inlneBlock_all">
                                    必填信息
                                </div>
                                <div class="right inlneBlock_all">
                                    <span>姓名</span>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <span>手机号</span>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <span>生日</span>
                                </div>
                            </div>
                            <!--  -->
                            <div>
                                <div class="left inlneBlock_all">
                                    选填信息
                                </div>
                                <div class="right inlneBlock_all">
                                    无（未配置此字段信息）
                                </div>
                            </div>
                            <!--  -->
                        </div>
                    </el-col>
                </el-row>
                <!--  -->
            </div>
            <!-- 清除浮动 -->
            <div style="clear:both"></div>
        </div>
    </div>
</template>

<script>
    export default {
        created(){
            console.log('会员卡')
        }
    }
</script>

<style scoped>
    .postPre{
        padding:10px;
    }
    .starts{
        float:left;
        line-height: 32px;
        width: calc(100% - 300px);
    }
    .ends{
        float:right;
    }
    .phone_boxs{
        width:264px;
        height:450px;
        padding:0;
        padding:10px;
        box-sizing: border-box;
        overflow:auto;
    }
    .vipCardPic{
        width:201px;
        height:120px;
        background:url('/static/vip.png');
        background-size:100%;
        margin:10px auto;
        position: relative;
    }
    .showDetails{
        position: absolute;
        top:10px;
        left:6px;
        width:calc(100% - 6px);
        height:30px;
    }
    .floatLeft{
        float: left;
        color:#f2f2f2;
        font-size:12px;
    }
    .floatLeft img{
        width:32px;
        height:32px;
        border-radius:50%;
    }
    .inlneBlock_all_s{
        vertical-align: top;
        width:32%;
        text-align: center;
    }
    .inlneBlock_all_s p:first-child{
        font-size:14px;
        color:#666;
    }
    .inlneBlock_all_s p:last-child{
        font-size:12px;
        color:#409EFF;
        line-height: 24px;
        cursor: pointer;
    }
    .border-tops{
        margin-top:5px;
        border-top:2px dashed #999;
    }
    .border-tops .listBox{
        width:85%;
        margin: auto;
        height:30px;
        line-height: 30px;
        border-top:1px solid #ccc;
        cursor: pointer;
    }
    .border-tops .listBox:first-child{
        border-top:0;
    }
    .border-tops .listBox p:first-child{
        float: left;
        color:#666;
    }
    .border-tops .listBox p:last-child{
        float: right;
        color:#999;
    }
    .titles_vip{
        font-size:16px;
        font-weight: 600;
        color:#666;
    }
    .content_vips{
        padding-top:30px;
        color:#666;
    }
    .content_vips .left{
        width:100px;
        text-align: right;
        padding-right:10px;
    }
    .content_vips .left,.content_vips .right{
        vertical-align: top;
    }
    .table_list tr>th:last-child, .table_list tr>td:last-child{
        width:auto;
    }
</style>