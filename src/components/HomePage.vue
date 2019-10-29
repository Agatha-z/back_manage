<template>
    <div class="HomePage">
        <!-- 头部 -->
        <div class="header_top">
            <headers></headers>
        </div>
        <!-- 主体内容 -->
        <div class="Content_body">
            <!-- 侧边栏 -->
            <div class="sidebar_box" :class="{'small_sidebar':SmallScreen}">
                <div class="sidebar">
                    <sidebars></sidebars>
                </div>
            </div>
            <!-- 子页面Box -->
            <div class="content_box" :class="{'small_contentBox':SmallScreen}">
                <div class="box_Scroll">
                    <transition name="routerAnimate">
                        <router-view class="child-view" :key="timer"></router-view>
                    </transition>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // import sidebars from './common/sidebar.vue'
    export default {
        computed:{
            timer(){
                return this.$store.state.RoutingOverloading
            },
            SmallScreen(){
                return this.$store.state.SmallScreen
            }
        }
    }
</script>

<style scoped>
    .HomePage{
        min-width: 1350px;
        height:100vh;
    }
    .header_top{
        height:70px;
        background:#17233d;
    }
    .Content_body{
        height:calc(100vh - 70px);
    }
    .sidebar_box{
        width:200px;
        height:100%;
        overflow: hidden;
        float: left;
    }
    .sidebar{
        width:217px;
        height:100%;
        background:#17233d;
        overflow-y: auto;
        overflow-x: hidden;
    }
    .content_box{
        width:calc(100% - 200px);
        min-width: 1000px;
        height:100%;
        background:#eeeeee;
        float: left;
        overflow-y: auto;
        overflow-x: hidden;
    }
    .small_contentBox{
        width:calc(100% - 65px);
    }
    .box_Scroll{
        width:100%;
        min-height:calc(100vh - 70px);
        overflow-x: hidden;
        overflow-y: auto;
        position: relative;
        background:#eeeeee;
    }
    .child-view {
        width:calc(100% - 20px);
        position: absolute;
        transition: all 0.5s cubic-bezier(.55,0,.1,1);
    }
    .routerAnimate-enter{
        opacity: 0;
        transform: translate(100%, 0);
    }
    .routerAnimate-leave-to{
        opacity: 0;
        transform: translate(-100%, 0);
    }
    .routerAnimate-leave-active {
        opacity: 0;
        transform: translate(100%, 0);
    }
    .routerAnimate-enter{
        opacity: 0;
        transform: translate(-100%, 0);
    }
    .small_sidebar{
        width:65px;
    }
</style>