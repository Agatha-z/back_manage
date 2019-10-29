<template>
    <div class="Food_base_components">
        <div v-show="false">{{index}}</div>
        <div class="clickClose_box" v-if="showBox" @click="showBox=false"></div>
        <el-input :style="'width:'+inputWidth+'px'" :placeholder="placeholder" :disabled="true" size="medium"></el-input>
        <el-button type="info" size="medium" style="margin-left:-2px" @click="openSelectBox">
            <i :class="!showBox?'el-icon-caret-bottom':'el-icon-caret-top'"></i>
        </el-button> 
        <!-- 弹框 -->
        <el-collapse-transition>
            <div class="show_base_foot_data" v-if="showBox">
                <div class="seach_div">
                    <el-input placeholder="请输入内容" size="small" v-model="seachTetx" style="width:300px" @change="inputChange(seachTetx)" clearable @keyup.enter.native="seachEvent(seachTetx)" prefix-icon="el-icon-search"></el-input>
                    <el-button type="primary" size="small" @click="seachEvent(seachTetx)" icon="el-icon-search">搜索</el-button>
                </div>
                <!-- 滚动区域 -->
                <div class="scroll_box">
                    <!-- 一条数据 -->
                    <div class="child_List" v-for="(v,k) in dataList" :key="k"  v-if="v.keywords">
                        <el-checkbox @change="index++" v-model="v.check">{{v.label}}</el-checkbox>  
                    </div>
                    <!-- 查询不到相关数据 -->
                    <div v-if="showNotData==0" style="text-align:center;color:#999;padding:15px">
                        查询不到相关数据
                    </div>
                </div>
                <!-- 按钮 -->
                <div style="padding:3px 0 0 150px;">
                    <el-button size="small" type="primary" @click="add_footData">确认</el-button>
                    <el-button size="small" type="info" @click="showBox=false">取消</el-button>
                </div>
            </div>
        </el-collapse-transition>
        <!-- 已添加数据 -->
        <div>
            <table class="table_list" border="0" cellspacing="0">
                <tr>
                    <th>已选菜品</th>
                    <th>原价标准</th>
                    <th>变后标准价</th>
                    <th>原会员价</th>
                    <th>变后会员价</th>
                    <th style="width:40px">操作</th>
                </tr>
                <tr v-for="(v,k) in add_list" :key="k">
                    <td>{{v.label}}</td>
                    <td>{{v.original_P.toFixed(2)}}</td>
                    <td>
                         <el-input-number size="small" style="width:100px;" v-model="v.change_O_P" @change="subChange" :min="0"></el-input-number>
                    </td>
                    <td>{{v.vip_P}}</td>
                    <td>
                        <el-input-number size="small" style="width:100px;" v-model="v.change_V_P" @change="subChange" :min="0"></el-input-number>
                    </td>
                    <td style="width:40px">
                        <span style="color:red;cursor: pointer;" @click="deleteList(k)">删除</span>
                    </td>
                </tr>
                <!-- 无数据显示 -->
                <tr v-if="add_list.length<=0">
                    <td colspan="6">
                        <p style="color:#999">暂无更多数据</p>
                    </td>
                </tr>
            </table>
            <br>
            <div>
                <el-button type="warning" round @click="restData">
                    <i class="el-icon-refresh"></i>
                    重置
                </el-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            placeholder:{ // input  输入框  placeholder
                default(){
                    return '选择菜品'
                }
            },
            inputWidth:{ // 输入框宽度
                default(){
                    return 244
                }
            },
            footList:{
                default(){
                    return [ //默认菜品数据
                        {label:'北冰洋(瓶装)',id:'1-1',original_P:5,vip_P:5},
                        {label:'赤豆糊(瓶装)',id:'1-2',original_P:5,vip_P:5},
                        {label:'砂糖(瓶装)',id:'1-3',original_P:5,vip_P:5},
                        {label:'赤豆酿酒(瓶装)',id:'1-4',original_P:5,vip_P:5},
                        {label:'打包费(瓶装)',id:'1-5',original_P:5,vip_P:5},
                        {label:'洋酒(瓶装)',id:'1-6',original_P:5,vip_P:5},
                        {label:'阿萨姆(瓶装)',id:'1-7',original_P:5,vip_P:5},
                        {label:'雀巢(瓶装)',id:'1-8',original_P:5,vip_P:5},
                        {label:'哇哈哈(瓶装)',id:'1-9',original_P:5,vip_P:5},
                        {label:'可口可乐(瓶装)',id:'1-10',original_P:5,vip_P:5},
                    ]
                }
            },
            already:{  //默认已选中菜品
                default(){
                    return [
                        {label:'北冰洋(瓶装)',id:'1-1',original_P:5,change_O_P:7,vip_P:5,change_V_P:7},
                    ]
                }
            }
        },
        data(){
            return {
                showNotData:0,//是否显示查询不到相关数据
                index:0,//驱动视图更新
                showBox:false,//显示下拉弹框
                seachTetx:'',//搜索框绑定数据
                dataList:[],//真实渲染数据
                add_list:[],//已经选择数据
            }
        },
        created(){
            // 处理数据
            var data_s=JSON.parse(JSON.stringify(this.footList));
            // 设置数据
            console.log(this.already)
            this.add_list=JSON.parse(JSON.stringify(this.already));
            // 
            var array=[];
            for(var i=0,len=data_s.length;i<len;i++){
                array.push({
                    label:data_s[i].label,
                    id:data_s[i].id,
                    keywords:true,
                    check:false,
                    original_P:data_s[i].original_P,
                    vip_P:data_s[i].vip_P,
                })
            }
            this.dataList=array;
            // 初始化显示是否查询到数据显示
            this.seachEvent('')
        },
        methods:{
            // 重置表格中数据
            restData(){
                // 如无数据阻止当前操作
                if(this.add_list.length<=0){
                    this.$message('表格中暂无数据！');
                    return;
                }
                // 异步操作数据
                this.$confirm('此操作将重置表格中'+this.add_list.length+'条已选菜品, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // 删除事件
                    this.add_list=[];
                    this.$message({
                        type: 'success',
                        message: '重置成功!'
                    });
                    // 提交父组件
                    this.submitCommon();
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });          
                });
            },
            // 数字输入框事件
            subChange(){
                // 提交父组件
                this.submitCommon();
            },
            // 公共change提交给父组件参数 事件
            submitCommon(){
                // 驱动视图更新
                this.index++;
                this.$emit('addChange',this.add_list)
            },
            // 添加菜品函数
            add_footData(){
                var array=[];
                var data_s=JSON.parse(JSON.stringify(this.dataList))
                for(var i=0,len=data_s.length;i<len;i++){
                    if(data_s[i].check){
                        array.push({
                            label:data_s[i].label,
                            id:data_s[i].id,
                            keywords:true,
                            check:false,
                            original_P:data_s[i].original_P,
                            change_O_P:data_s[i].original_P,
                            vip_P:data_s[i].vip_P, 
                            change_V_P:data_s[i].vip_P, 
                        })
                        // 清楚选中状态
                        this.dataList[i].check=false;
                    }
                }
                // 拼接数据
                this.add_list=array.concat(this.add_list);
                // 关闭下拉框
                this.showBox=false;
                // 提交父组件
                this.submitCommon();
            },
            // 删除已添加的数据
            deleteList(k){
                this.$confirm('此操作将删除该条数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // 删除事件
                    this.add_list.splice(k,1)
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    // 提交父组件
                    this.submitCommon();
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });          
                });
            },
            // 搜索框事件
            seachEvent(e){
                this.showNotData=0;
                for(var i=0,len=this.dataList.length;i<len;i++){
                    if(this.dataList[i].label.indexOf(e)==-1){
                        this.dataList[i].keywords=false
                    }else{
                        this.dataList[i].keywords=true
                        this.showNotData++
                    }
                }
                // 此为驱动视图更新
                this.index++
            },
            // 搜索框change事件
            inputChange(e){
                if(e==''){
                   this.seachEvent(e) 
                }
            },
            // 打开选择下拉框
            openSelectBox(){
                if(this.showBox){
                    for(var i=0,len=this.selectData.length;i<len;i++){
                        this.selectData[i].open=false;
                    }
                }
                this.showBox=!this.showBox
            },
        }
    }
</script>

<style scoped>
    .Food_base_components{
        position: relative;
    }
    .show_base_foot_data{
        width:430px;
        transition: all .08s linear;
        position: absolute;
        height: 310px;
        background:#fff;
        top:40px;
        border-radius: 5px;
        box-shadow: 0 0 1px 1px #eee;
        z-index:10;
        overflow: hidden;
    }
    .clickClose_box{
        position: fixed;
        width:100%;
        height:100%;
        top:0;
        z-index:8;
        right:0;
        background:rgba(0,0,0,.05)
    }
    .seach_div{
        border-bottom: 1px solid #eee;
        padding:8px 10px 2px 10px;
    }
    .scroll_box{
        height:calc(100% - 80px);
        border-bottom: 1px solid #eee;
        overflow: auto;
    }
    .child_List{
        padding:12px;
        border-bottom: 1px solid #eee;
    }
    .table_list{
        max-width:525px;
        margin-top:10px;
    }
</style>