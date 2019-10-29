<template>
    <div>
        <div class="commonHeader_style">
            <div class="filesTop">
                <div class="text_flex">
                    <span>
                        <i>搜</i><i>索:</i>
                    </span>
                </div>
                <div class="margin_x">
                    <el-input size="medium " :placeholder="placeholder_txt" v-model="Inputvalue" clearable style="width:200px;"></el-input>
                    <el-button size="medium " type="primary"  icon="el-icon-search" @click="seachBtn(Inputvalue)">搜索</el-button>
                </div>
                <div class="state">
                    <span>状态: </span>
                    &nbsp;&nbsp;
                    <el-radio-group v-model="select" size="medium " @change="stateChage">
                        <el-radio-button :label="v.index" v-for="(v,k) in select_data" :key="k">{{v.txt}}</el-radio-button>
                    </el-radio-group>
                </div>  
            </div>
            <!--  -->
            <div class="filesTop" onselectstart="return false;">
                <div class="text_flex">
                    <span>
                        <i>门</i><i>店:</i>
                    </span>
                    
                </div>
                &nbsp;&nbsp;&nbsp;
                <storeSelect
                :storeSelectData="storeSelectData"
                @selectChange="selectChange">
                </storeSelect>
                <!--  -->
            </div>
        </div>
        
    </div>
</template>

<script>
    export default {
        props:{
            storeSelectData:{
                default(){
                    return [
                        {
                            name:'合肥市安业餐饮有限公司',
                            id:'1',
                            children:[
                                {name:'安少爷米线（1祥源广场店）（直营店）',id:'1-1'},
                                {name:'安少爷米线（2祥源广场店）（直营店）',id:'1-2'},
                                {name:'安少爷米线（3祥源广场店）（直营店）',id:'1-3'},
                            ]
                        },
                        {
                            name:'铜陵市安业餐饮有限公司',
                            id:'2',
                            children:[
                                {name:'安少爷米线（4祥源广场店）（直营店）',id:'2-1'},
                                {name:'安少爷米线（5祥源广场店）（直营店）',id:'2-2'},
                                {name:'安少爷米线（6祥源广场店）（直营店）',id:'2-3'},
                            ]
                        },
                        {
                            name:'南京市安业餐饮有限公司',
                            id:'3',
                            children:[
                                {name:'安少爷米线（7祥源广场店）（直营店）',id:'3-1'},
                                {name:'安少爷米线（8祥源广场店）（直营店）',id:'3-2'},
                                {name:'安少爷米线（9祥源广场店）（直营店）',id:'3-3'},
                            ]
                        }
                    ]
                }
            },
            select_data:{},
            placeholder_txt:{
                default(){
                    return '请输入内容'
                }
            }
        },
        data(){
            return {
                Inputvalue:'',//搜索框数据
                select:0,//状态
                
                
            }
        },
        methods:{
            // 搜索按钮点击事件
            seachBtn(e){
                this.$emit('input-change',e);
            },
            //状态栏change事件
            selectChange(data){
                this.$emit('selectChange',data)
            },
            stateChage(e){
                this.$emit('state-change',e);
            },
        }
    }
</script>

<style scoped>
    .commonHeader_style{
        padding:20px 0 20px 100px;
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
    
    

    
    
    
    
</style>