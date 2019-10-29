<template>
    <div>
       <div class="bounced_box"  v-if="show_box" @click="confirmOk('cancel')">
            <transition name="animate_box">
                <div class="center_box" @click.stop v-if="show_center" :style="style_name">
                     <!-- 定位 X -->
                    <div class="position_clear" @click="confirmOk('cancel')">
                        <i class="el-icon-circle-close"></i>
                    </div>
                    <!-- 头部 -->
                    <div class="title">{{title}}</div>
                    <!-- 内容部分 -->
                    <div class="content_scroll">
                        <!-- 插槽 -->
                        <slot></slot>
                        <!--  -->
                    </div>
                    <!-- 底部内容 -->
                    <div class="footer_btn">
                        <el-button v-for="(v,k) in button" :key="k" :type="v.type" size="medium" @click="confirmOk(v.events)">{{v.name}}</el-button>
                    </div>
                </div>
            </transition>
        </div> 
    </div>
</template>

<script>
    export default {
        props:{
            style_name:{   //样式
                default(){
                    return ''
                }
            },
            model:{ 
                default(){
                    return false
                }
            },
            title:{
                default(){
                    return '模态框'
                }
            },
            button:{
                default(){  //默认按钮   触发子组件事件
                    return [
                        {name:'取消',type:'info',events:'cancel'},
                        {name:'确认',type:'success',events:'confirm'}
                    ]
                }
            }
        },
        data(){
            return {
                show_box:false,//
                show_center:false,//弹框内层框是否显示
            }
        },
        mounted(){
            // 处理如果默认  传递为true时显示内部框
            if(this.model){
                this.show_box=true;
            }
        },
        watch:{
            model(){
                if(this.model){
                    this.show_box=true;
                }else{
                    this.show_center=false;
                }
            },
            // 监听动画
            show_box(){
                if(this.show_box){
                    setTimeout(()=>{
                        this.show_center=true
                    },0)
                }
            },
            show_center(){
                if(!this.show_center){
                    setTimeout(()=>{
                        this.show_box=false
                    },200)
                }
            }
        },
        methods: {
            //弹框事件 
            confirmOk(e){
                this.$emit(e)
            },
        },
    }
</script>

<style scoped>

</style>