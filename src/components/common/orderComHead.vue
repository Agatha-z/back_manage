<template>
    <div>
        <div v-show="false">{{index}}</div>
        <div class="commonHeader_style">
            <div>
                <div style="display:inline-block;margin-bottom:15px;">
                    <div style="display:inline-block;text-align:right;width:78px">
                        <span class="font_title">结账时间：</span>
                    </div>
                    <el-date-picker
                    size="medium"
                    @change="index++"
                    v-model="data_All.StartDate"
                    type="date"
                    placeholder="选择起始日期">
                    </el-date-picker>
                    <!--  -->
                    &nbsp;
                    <span class="font_title">至</span>
                    &nbsp;
                    <!--  -->
                    <el-date-picker
                    size="medium"
                    @change="index++"
                    v-model="data_All.EndDate"
                    type="date"
                    placeholder="选择结束日期">
                    </el-date-picker>
                    <!--  -->
                    &nbsp;&nbsp;&nbsp;
                    <span class="font_title">门店：</span>
                    &nbsp;
                    <div style="display:inline-block;width:280px" onselectstart="return false">
                        <div v-if="datas">
                            <storeSelect
                            :storeSelectData="storeData"
                            @selectChange="selectChange"
                            :inputWidth="220">
                            </storeSelect>
                        </div>
                    </div>
                    &nbsp;&nbsp;
                </div>
                <div style="display:inline-block;margin-bottom:15px;">
                    <el-radio-group v-model="data_All.radio" size="medium" style="margin-left:80px">
                        <el-radio-button @change="index++" :label="v.value" v-for="(v,k) in radios_data" :key="k">{{v.label}}</el-radio-button>
                    </el-radio-group>
                    &nbsp;&nbsp;
                    <!-- 展开收起按钮 -->
                    <span v-if="data_All.input.length>0" class="font_title" onselectstart="return false" style="color:#016cdf;cursor:pointer" @click="openMore=!openMore">{{openMore?'收起':'更多'}}筛选
                        <i :class="!openMore?'el-icon-arrow-down':'el-icon-arrow-up'"></i>
                    </span>
                </div>
            </div>
            <!-- 更多筛选输入框 -->
            <el-collapse-transition>
                <div v-show="openMore" class="transition_open">
                    <div style="display:inline-block" v-for="(v,k) in data_All.input" :key="k">
                        <div style="display:inline-block;text-align:right;width:78px">
                            <span class="font_title">{{v.name}}：</span>
                        </div>
                        <el-input size="medium" style="width:220px;" @change="index++" v-model="v.value" placeholder="请输入内容"></el-input>
                        <!--  -->
                        &nbsp;&nbsp;&nbsp;
                    </div>
                </div>
            </el-collapse-transition>
            <!--  -->
            <div style="padding:10px 0 0 72px;" class="z_indexTop">
                <el-button size="medium" type="success" @click="seachBtn(1)">
                    <i class="el-icon-search"></i> 搜索
                </el-button>
                <el-button size="medium" type="info" @click="seachBtn(2)">
                    <i class="el-icon-refresh"></i> 重置
                </el-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            dayRadios:{   //单选 今天 明天  .....   值
                default(){
                    return [
                        {label:'今天',value:0},
                        {label:'7天',value:1},
                        {label:'15天',value:2},
                        {label:'30天',value:3},
                    ]
                }
            },
            storeData:{
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
                        }
                    ]
                }
            },
            inputsList:{
                default(){
                    return ['操作人','反结原因','菜品名称']
                }
            }
        },
        data(){
            return {
                datas:true,//刷新门店选择
                index:0,//驱动视图更新
                radios_data:[],//今天 7天。。。。。单选框数据
                openMore:false,//是否展开更多
                data_All:{
                    radio:0,//选择的今天   7天   ......
                    StartDate:'',//起始日期
                    EndDate:'',//结束日期
                    storeData:'',//门店选择
                }
            }
        },
        created(){
            // 设置单选框数据渲染
            this.radios_data=JSON.parse(JSON.stringify(this.dayRadios));
            // 设置天数选择默认数据
            this.radio3=JSON.parse(JSON.stringify(this.dayRadios[0].value));
            // 处理隐藏输入框 数据
            var inputsList_S=this.inputsList;
            var array=[];
            for(var i=0,len=inputsList_S.length;i<len;i++){
                array.push({
                    name:inputsList_S[i],
                    value:''
                })
            }
            this.data_All.input=array;//渲染  输入框内容
        },
        methods:{
            seachBtn(e){
                if(e==2){
                    this.datas=false;
                    // 重置按钮
                    var array=[];
                    // 清空输入框内容
                    var fors_list=JSON.parse(JSON.stringify(this.data_All.input));
                    for(var i=0,len=fors_list.length;i<len;i++){
                        array.push({
                            name:fors_list[i].name,
                            value:''
                        })
                    }
                    this.data_All={
                        input:array, //提交给父组件  输入框内容
                        radio:0,//选择的今天   7天   ......
                        StartDate:'',//起始日期
                        EndDate:'',//结束日期
                        storeData:[],//门店选择
                    }
                    // 异步重置门店组件
                    setTimeout(()=>{
                        this.datas=true;
                    },0)
                    // 驱动视图更新
                    this.index++
                }
                this.$emit('submitSeach',this.data_All)
            },
            // 门店选择下拉框
            selectChange(data){
                this.data_All.storeData=data;
                // 驱动视图更新
                this.index++;
            }
        }
    }
</script>

<style scoped>
    .font_title{
        font-size:14px;
        color:#666;
    }
    .transition_open{
        transition: all .2s linear;
    }
    .z_indexTop{
        display: inline-block;
        position: relative;
        z-index: 5;
    }
</style>