<template>
    <div>
        <div class="commonHeader_style" :class="{'padd_cstop':!padding_c}">
            <div class="filesTop">
                <div class="text_flex">
                    <span>
                        <i>搜</i><i>索:</i>
                    </span>
                </div>
                <div class="margin_x">
                    <el-input size="small" :placeholder="placeholder_txt" v-model="Inputvalue" clearable style="width:200px;"></el-input>
                    <el-button size="small" type="primary"  icon="el-icon-search" @click="seachBtn(Inputvalue)">搜索</el-button>
                </div>
                <div class="state">
                    <span>状态: </span>
                    &nbsp;&nbsp;
                    <el-radio-group v-model="select" size="small" @change="stateChage">
                        <el-radio-button :label="v.index" v-for="(v,k) in select_data" :key="k">{{v.txt}}</el-radio-button>
                    </el-radio-group>
                </div>  
            </div>
            <!--  -->
            <div class="filesTop">
                <div class="text_flex">
                    <span>
                        <i>所</i><i>属</i><i>品</i><i>牌:</i>
                    </span>
                </div>
                &nbsp;
                <div>
                    <el-radio-group v-model="brand" @change="brandCahneg">
                        <el-radio :label="v.index" v-for="(v,k) in brand_data" :key="k">{{v.txt}}</el-radio>
                    </el-radio-group>
                </div>
            </div>
            <!--  -->
            <div class="filesTop">
                <div class="text_flex">
                    <span>
                        <i>所</i><i>属</i><i>区</i><i>域:</i>
                    </span>
                </div>
                &nbsp;
                <div>
                    <el-radio-group v-model="area" @change="areaChange">
                        <el-radio :label="v.index" v-for="(v,k) in area_data" :key="k">{{v.txt}}</el-radio>
                    </el-radio-group>
                </div>
            </div>
            <!--  -->
        </div>
    </div>
</template>

<script>
    export default {
        props:['brand_data','select_data','placeholder_txt','area_data','padding_c'],
        data(){
            return {
                Inputvalue:'',//搜索框数据
                select:0,//状态
                brand:0,//品牌
                area:0,//区域
            }
        },
        methods:{
            // 搜索按钮点击事件
            seachBtn(e){
                this.$emit('input-change',e);
            },
            //状态栏change事件
            stateChage(e){
                this.$emit('state-change',e);
            },
            //所属品牌change事件
            brandCahneg(e){
                this.$emit('brand-change',e);
            },
            //所属区域change事件
            areaChange(e){
                this.$emit('area-change',e); 
            }
        }
    }
</script>

<style scoped>
    .commonHeader_style{
        padding-left:100px;
    }
    .filesTop{
        height:50px;
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        align-items: center;
    }
    
    .filesTop>div{
        display: inline-block;
    }
    .text_flex{
        margin-right: 20px
    }
    .text_flex i{
        font-style: normal;
    }
    .text_flex span{
        display: inline-block;
        width:80px;
        height:50px;
        font-size:18px;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        font-weight: 600;
        align-items: center;
    }
    .margin_x{
        margin:0 30px 0 10px;
    }
    .state{
        font-size:18px;
        font-weight: 600;
    }
    .margin_tops{
        margin-top:-6px;
    }
    .padd_cstop{
        padding:0 0 0 80px;
        box-shadow: none;
    }
</style>