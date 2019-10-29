<template>
    <div class="headers">
        <div class="lefts">
            <router-link to="/">合肥市安业餐饮管理有限公司</router-link>
        </div>
        <div class="rights">
            <!-- 下拉 -->
            <div class="select_bottom">
                <div @click.stop="showSelect=!showSelect">
                    <span>欢迎您、卡路里</span> 
                    <i class="el-icon-caret-bottom"></i>
                </div>
                <div class="tran_box">
                    <transition name="select">
                        <div class="select_iteam" v-if="showSelect">
                            <i class="el-icon-caret-top el-icon-caret-tops"></i>
                            <div @click.stop="dropdown(1)">修改密码</div>
                            <div @click.stop="dropdown(2)">退出系统</div>
                        </div>   
                    </transition>
                </div>
            </div>
            <!--  -->
            <div class="Margin_top" @mouseenter="mouseEnter" @mouseleave="showBoxIf=false">
                <el-badge :value="count" :max="99" class="item">
                    <router-link to="/">
                        <i style="font-size:26px" class="el-icon-bell"></i>
                    </router-link>
                </el-badge>
                <div class="showBox">
                    <transition name="tan_animate">   
                        <div class="MessageBox" v-if="showBoxIf">
                            <i class="el-icon-caret-top el-icon-caret-tops"></i>
                            <p class="titles">消息中心</p>
                            <div class="scrollBox">
                                <div class="article_tit" v-for="(v,k) in MessageList" :key="k">
                                    <p class="top">
                                        <router-link to="">【安少爷】哔哩哔哩主播卡哇伊~伊~伊~</router-link><br>
                                        <span>2018-3-14 21:22</span>
                                    </p>
                                    <p class="timer"></p>
                                </div>
                            </div>
                            <div class="article_tit article_tits">
                                <p>
                                    <router-link to="">查看更多</router-link>
                                </p>
                                <p><i class="el-icon-arrow-down"></i></p>
                            </div>
                        </div>
                    </transition>
                </div>  
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                showBoxIf:false,//消息中心小框是否显示
                count:109,//未读消息个数
                showSelect:false,//显示/隐藏切换按钮
                MessageList:[
                    {title:'【安少爷】哔哩哔哩主播卡哇伊~伊~伊~',time:'2018-3-14 21:22'},
                    {title:'【安少爷】哔哩哔哩主播卡哇伊~伊~伊~',time:'2018-3-14 21:22'},
                    {title:'【安少爷】哔哩哔哩主播卡哇伊~伊~伊~',time:'2018-3-14 21:22'},
                    {title:'【安少爷】哔哩哔哩主播卡哇伊~伊~伊~',time:'2018-3-14 21:22'},
                    {title:'【安少爷】哔哩哔哩主播卡哇伊~伊~伊~',time:'2018-3-14 21:22'}
                ]
            }
        },
        methods:{
            // 下拉菜单内元素点击事件
            dropdown(data){
                if(data==1){
                    // 修改密码
                    console.log('修改密码')
                }else{
                    // 退出系统
                    sessionStorage.clear()
                    this.$router.push('/login')
                }
                // 关闭下拉菜单
                this.showSelect=false;
            },
            // 鼠标移入事件
            mouseEnter(){
                this.showBoxIf=true
            }
        },
        mounted(){
            // 点击任意一处关闭下拉菜单
            document.onclick=()=>{
                this.showSelect=false
            }
        }
    }
</script>

<style scoped>
    .headers{
        width:100%;
        height:100%;
        color:#fff;
    }
    .lefts{
        float: left;
        font-size:22px;
        line-height: 70px;
        text-indent: 10px;
    }
    .lefts a{
        color:#fff;
    }
    .rights{
        height:100%;
        float:right;
    }
    .rights a{
        color:#fff
    }
    .Margin_top{
        margin:25px 40px 0 0;;
        float: right;
        position: relative;
    }
    .select_bottom{
        margin:30px 10px 0 0;
        cursor: pointer;
        position: relative;
        float: right;
    }
    .tran_box{
        position: absolute;
        width:150px;
        right:0;
        margin:auto;
        z-index: 999;
    }
    .select_iteam{
        color:#333;
        width:100px;
        box-shadow: 0px 0px 4px 0px #eee;
        background:#fff;
        border-radius:5px;
        padding:5px 0;
        position: absolute;
        top:15px;
        right:0;
    }
    .select_iteam div{
        padding:0 10px;
        text-align: center;
        line-height: 28px;
    }
    .select_iteam div:hover{
        background:#eee;
    }   
    .select_iteam .el-icon-caret-tops{
        position: absolute;
        width:28px;
        font-size:28px;
        color:#fff;
        top:-15px;
        left:0;
        right:0;
        margin:auto;
    }
    .select-enter,.select-leave-to{
        margin-right:80px;
        opacity: 0;
    }
    .select-enter-active,.select-leave-active,.select-enter-to{
        transition: all linear 300ms;
    }
    .Margin_top .showBox{
        width:300px;
        position: absolute;
        top:22px;
        right:0;
        z-index: 999;
    }
    .MessageBox{
        background:#fff;
        padding:10px 0;
        margin-top:15px;
        border-radius:5px;
        box-shadow: 0px 0px 4px 0px #eee;
        color:#333;
    }
    .MessageBox .titles{
        font-size:17px;
        font-weight: 600;
        text-align: center;
        line-height: 30px;
        border-bottom:1px solid #eee;
    }
    .article_tit{
        padding:10px 10px 0px 10px;
    }
    .article_tit .top{
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .article_tit .top a{
        color:#7864dd;
        font-size:16px;
        text-decoration: underline;
    }
    .article_tit .top span{
        color:#999;
        font-size:14px;
    }
    .scrollBox{
        max-height:250px;
        overflow-y: scroll;
    }
    .article_tits{
        text-align: center;
        color:#999;
    }
    .article_tits a{
        color:#999;
    }
    .article_tits a:hover{
        color:#7864dd;
    }
    .tan_animate-enter,.tan_animate-leave-to{
        opacity: 0;
    }
    .tan_animate-enter-active,.tan_animate-leave-active{
        transition: all linear 200ms;
    }
    .el-icon-caret-tops{
        position: absolute;
        top:-2px;
        right:3px;
        font-size:28px;
        color:#fff;
    }
</style>