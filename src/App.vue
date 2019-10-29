<template>
  <div id="app">
    <router-view/>
    <div class="bounced_box"  v-if="show_bounced">
            <transition name="animate_box">
                <div class="center_box" v-if="show_center">
                    <!-- 头部 -->
                    <div class="title" style="color:red;">温馨提示！</div>
                    <!-- 内容部分 -->
                    <div class="content_scroll">
                        <!--  -->
                        <p style="color:red;font-size:18px;font-weight:600;text-align:center;padding:20px 0;">为了您更好的体验，我们建议您使用现代浏览器！</p>
                        <div class="show_box_App_alert">
                            <div>
                                <img src="@/assets/png/Chrome.png">
                                <br>
                                <el-button style="margin-left:80px" @click="skipDownload('https://www.google.cn/intl/zh-CN/chrome/')" type="primary">前往下载<i class="el-icon-download el-icon--right"></i></el-button>
                            </div>
                            <div>
                                <img src="@/assets/png/Filrefox.png">
                                <br>
                                <el-button style="margin-left:80px" @click="skipDownload('http://www.firefox.com.cn')" type="primary">前往下载<i class="el-icon-download el-icon--right"></i></el-button>
                            </div>
                        </div>
                    </div>
                    <!-- 底部内容 -->
                    <div class="footer_btn">
                        <el-button type="info" size="medium"  @click="quiet_box">关闭</el-button>
                    </div>
                </div>
            </transition>
        </div>
  </div>
</template>

<script>
export default {
    name: 'App',
    data(){
        return {
                show_center:false,//弹框内层框是否显示
                show_bounced:false,//是否显示增加岗位弹框
        }
    },
    watch:{
        // 监听动画
        show_bounced(){
            if(this.show_bounced){
                setTimeout(()=>{
                    this.show_center=true
                },0)
            }
        },
        show_center(){
            if(!this.show_center){
                setTimeout(()=>{
                    this.show_bounced=false
                },200)
            }
        }
    },
    methods:{
        // 弹框 关闭事件{
        quiet_box(){
            this.show_center=false;
        },
        // 前往浏览器下载
        skipDownload(e){
            // window.location.href=e
            window.open(e)
        }
    },
    created() {
            if(getBrowerInfo().client.isIE&&sessionStorage.bounced==undefined){
                var ie=getBrowerInfo().client.version
                if(parseInt(ie)<11){
                    this.show_bounced=true
                    sessionStorage.bounced=true
                }
            }
    },
}
</script>

<style>
    html,body{
        overflow: auto;
    }
    html,body,p,h1,h2,h3,h4,h5,h6,ul,ol{
        margin:0;
        padding:0;
        font-size:12px;
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    }
    ul,ol{
        list-style: none;
    }
    a{
        text-decoration: none;
    }
    .fl{
        float: left;
    }
    .fr{
        float: right;
    }
    .commonHeader_style{
        background:#fff;
        padding:20px;
        border-radius:5px;
        box-shadow: 0px 0px 6px 0px #eee
    }
    /*滚动条整体部分,必须要设置*/
    ::-webkit-scrollbar{
        width: 10px;
        height: 10px;
        background-color: #fff;
    }
    /*滚动条的轨道*/
    ::-webkit-scrollbar-track{
        box-shadow: inset 0 0 5px rgba(0,0,0,.0);
        background-color: rgba(225,225,225,.4);
    }
    /*滚动条的滑块按钮*/
    ::-webkit-scrollbar-thumb{
        background-color: rgba(192,204,218,.7);
        height: 50px;
        outline-offset: -2px;
        outline: 2px solid #fff;
        -webkit-border-radius: 4px;
    }
    /*滚动条的上下两端的按钮*/
    ::-webkit-scrollbar-button{
        height: 0px;
        background-color: #B0AEDA;
    }
    .table_list{
        width:100%;
        border:1px solid #ccc;
        border-radius: 5px;
        overflow: hidden;
    }
    .table_list>tr>td{
        border-top:1px solid #ccc;
    }
    .table_list th{
        background:#eee;
        height:40px;
    }
    .table_list th:first-child{
        min-width: 20px;
    }
    .table_list tr>th,.table_list tr>td{
        border-right:1px solid #ccc;
        font-size:14px;
    }
    .table_list tr>th:last-child,.table_list tr>td:last-child{
        border-right:none;
        width: 280px;
    }
    .table_list tr>td{
        text-align: center;
        padding:7px 5px;
        font-size:12px;
    }
    .table_list>tr:hover{
        background:rgba(240,250,255)
    }
    .bounced_box{
        width:100%;
        height:100%;
        position: fixed;
        top:0;
        left:0;
        z-index: 30;
        background:rgba(0, 0, 0, .3)
    }
    .center_box{
        width:810px;
        height:60%;
        max-height: 600px;
        min-height: 500px;
        background:#fff;
        position: absolute;
        top:0;
        left:0;
        right:0;
        bottom: 0;
        margin: auto;
        border-radius:5px;
        transition: all .15s cubic-bezier(.55,0,.1,1);
    }
    .animate_box-enter,.animate_box-leave-to{
        opacity: 0;
        transform:translate(0,100px);
    }
    .animate_box-enter-active,.animate_box-leave-active{
        opacity: 0;
        transform:translate(0,-100px);
    }
    .center_box .title{
        font-size: 22px;
        color:#333;
        font-weight: 600;
        background:#eeeeee;
        text-align: center;
        height:50px;
        line-height: 50px;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
    }
    .position_clear{
        display: inline-block;
        position: absolute;
        top:10px;
        font-size:26px;
        right:13px;
        color:#17233d;
        width:26px;
        cursor: pointer;
    }
    .content_scroll{
        height:calc(100% - 100px);
        overflow: auto;
    }
    .footer_btn{
        height:50px;
        background:#eeeeee;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
    }
    .footer_btn button{
        float: right;
        margin:7px 10px 0 5px;
    }
    .show_box_App_alert{
        width:600px;
        height:200px;
        margin:auto;
    }
    .show_box_App_alert>div:first-child{
        float: left;
        width:250px;
    }
    .show_box_App_alert>div:last-child{
        float: right;
        width:250px;
    }
    .show_box_App_alert>div img{
        width:100%;
    }
    .el-tooltip__popper.is-dark{
        width:200px;
        cursor: pointer;
    }
    .commonHeader_style .el-input-group__append{
        cursor: pointer;
    }
    
    /*中央厨房查看详情动画*/
    .animateCheckDetail-enter-active{
        animation-name: slideInUp;
        animation-duration: .5s;
        animation-fill-mode: both;
    }
    .animateCheckDetail-leav-active{
        animation-name: slideOutDown;
        animation-duration: .5s;
        animation-fill-mode: both
    }
    @keyframes slideInUp {
        0% {
            transform: translate3d(100%,0,0);
            visibility: visible
        }
        to {
            transform: translateZ(0)
        }
    }
    @keyframes slideOutDown {
        0% {
            transform: translateZ(0)
        }
        to {
            visibility: hidden;
            transform: translate3d(100%,0,0)
        }
    }
    /*弹框 仓库管理输入框失去焦点样式的改变*/
    .box_input.isBlur  input.el-input__inner{
        border-color:#A94442;
    }
    .box_input.unitBlur input.el-input__inner{
        border-color:#A94442;
    }
    .box_input.stocKeepUnitBlur input.el-input__inner{
        border-color:#A94442;
    }
    .box_input.buyUnit  input.el-input__inner{
        border-color:#A94442;
    }
    .box_input.convert  input.el-input__inner{
        border-color:#A94442;
    }
    .box_input.expendUnit input.el-input__inner{
        border-color:#A94442;
    }
    .box_input.transExpend .el-input__inner{
        border-color:#A94442;
    }
    .box_input.indentType .el-input__inner{
        border-color:#A94442;
    }
    .box_input.checkCountType .el-input__inner{
        border-color:#A94442;
    }
    .box_input.goodsCode .el-input__inner{
        border-color:#A94442;
    }
    .inlneBlock_all{
        display: inline-block;
    }
  /*营销中心里业务链接*/
    .businessLink .el-dialog__header{
      border-bottom: 1px solid #cccccc;
    }
    .businessLink .el-dialog__body{
      padding: 15px 20px;
    }
    .businessLink .el-tabs__nav-wrap::after{
      background: none;
    }
    .businessLink .el-tabs__item{
      font-size: 16px;
      color: #ffc41d;
    }
    .businessLink .el-tabs__active-bar{
      background-color:  #ffc41d;
    }
</style>
