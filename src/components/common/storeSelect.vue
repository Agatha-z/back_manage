<template>
    <div class="selectBox_components">
        <div class="clickClose_box" v-if="showBox" @click="showBox=false"></div>
        <div v-show="false">{{index}}</div>
        <div class="selectBox_components-reletives" @click.stop>
            <el-input :style="'width:'+inputWidth+'px'" :placeholder="selectOn.length==0?placeholder[0]:placeholder[1]" :disabled="true" size="medium "></el-input>
            <el-button type="info" size="medium" style="margin-left:-2px" @click="openSelectBox">
                <i :class="!showBox?'el-icon-caret-bottom':'el-icon-caret-top'"></i>
            </el-button> 
            <!-- 下拉框 -->
            <el-collapse-transition>
                <div class="selectBox_components-showBox" :style="'min-width:'+(inputWidth+56)+'px;top:'+(alignment=='top'?'-205px':'40px')" v-if="showBox">
                    <div class="selectBox_components-list_data">
                        <ul style="padding-right:30px;">
                            <li v-for="(v,k) in selectData" :key="k">
                                <!-- 头 -->
                                <div class="selectBox_components-title">
                                    <!-- el-icon-remove -->
                                    <i :class="v.open?'el-icon-remove':'el-icon-circle-plus'" @click="openChild(k)"></i>
                                    &nbsp;
                                    <el-checkbox v-model="v.check" @change="parentChangeCheck($event,k)" :indeterminate="v.indeterminate">
                                        <span class="selectBox_components-decoration">{{v.name}}</span>
                                    </el-checkbox>
                                </div>
                                <!-- 子集数据 -->
                                <el-collapse-transition>
                                    <ul v-show="v.open">
                                        <li class="selectBox_components-children_list" v-for="(x,z) in v.children" :key="z">
                                            <el-checkbox v-model="x.check" @change="childCheck($event,k,z)">
                                                <span class="selectBox_components-decoration">{{x.name}}</span>
                                            </el-checkbox>
                                        </li>
                                    </ul>
                                </el-collapse-transition>
                            </li>
                        </ul>
                    </div>
                </div>
            </el-collapse-transition>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            alignment:{  //对其方式  向上对齐还是向下对齐
                default(){
                    return 'bottom'
                }
            },
            nowSelectOn:{//默认选中
                default(){
                    return []    //['1-1','1-3','2-2','3-2']
                }
            },
            inputWidth:{  //宽度
                default(){
                    return 235
                }
            },
            placeholder:{ //输入框内提示文字   第一个参数  未选中   第二个参数   选中
                default(){
                    return ['请选择门店','已选择门店点击下拉按钮查看']
                }
            },
            storeSelectData:{ //默认门店数据
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
            }
        },
        watch:{
            // nowSelectOn(){
            //     this.commomSelect();
            // } 
        },
        data(){
            return {
                showBox:false,//显示下拉弹框
                selectOn:[],
                selectData:[],
                index:0,//驱动视图更新
            }
        },
        created(){
            // 处理渲染数据
            var array=[];
            var list=JSON.parse(JSON.stringify(this.storeSelectData));
            var child=[];
            for(var i=0,len=list.length;i<len;i++){
                child=[];
                for(var j=0,len1=list[i].children.length;j<len1;j++){
                    child.push({
                        name:list[i].children[j].name,
                        id:list[i].children[j].id,
                        check:false,
                    })
                }
                array.push({
                    name:list[i].name,
                    id:list[i].id,
                    check:false,
                    indeterminate:false,
                    open:false,
                    children:child
                })
            }
            this.selectData=array;
            if(this.nowSelectOn.length>0){
                // 处理默认选中状态
                this.commomSelect();
            }
        },
        methods:{
            // 处理默认选中状态
            commomSelect(){
                for(var i=0,len=this.selectData.length;i<len;i++){
                    var parent=this.selectData[i].children
                    var num=0;
                    for(var j=0,lens=parent.length;j<lens;j++){
                        var ids=parent[j].id;
                        if(this.nowSelectOn.indexOf(ids)>=0){
                            this.selectData[i].children[j].check=true;
                            num++
                        }else{
                            this.selectData[i].children[j].check=false;
                        }
                    }
                    if(num==0){
                        // 一个未选中
                        this.selectData[i].check=false;
                        this.selectData[i].indeterminate=false;
                    }else if(num==parent.length){
                        // 全部选中
                        this.selectData[i].check=true;
                        this.selectData[i].indeterminate=false;
                    }else{
                        // 部分选中
                        this.selectData[i].check=false;
                        this.selectData[i].indeterminate=true;
                    }
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
            commonSubData(){
                // 提交给父组件
                this.$emit('selectChange',this.selectOn)
            },
            // 子集勾选
            childCheck(e,k,j){
                var ids=this.selectData[k].children[j].id
                if(e){
                    this.selectOn.push(ids)
                }else{
                    this.selectOn.splice(this.selectOn.indexOf(ids),1)
                }
                var len=this.selectData[k].children.length;
                var indexs=0;
                for(var i=0;i<len;i++){
                    if(this.selectData[k].children[i].check){
                        indexs++;
                    }
                }
                if(len==indexs){
                    // 已经全选
                    this.selectData[k].check=true;
                    this.selectData[k].indeterminate=false;
                }else if(indexs>0&&indexs<len){
                    // 部分选中
                    this.selectData[k].check=false;
                    this.selectData[k].indeterminate=true;
                }else{
                    // 无选中
                    this.selectData[k].check=false;
                    this.selectData[k].indeterminate=false;
                }
                // 驱动视图更新
                this.index++;
                this.commonSubData();
            },
            // 父级勾选
            parentChangeCheck(e,k){
                if(e){
                    // 全选
                    var list=this.selectData[k].children;
                    for(var i=0,len=list.length;i<len;i++){
                        if(this.selectOn.indexOf(list[i].id)==-1){
                            this.selectOn.push(list[i].id)
                            this.selectData[k].children[i].check=true;
                        }
                    }
                    this.selectData[k].check=true;
                    this.selectData[k].indeterminate=false;
                    // 开启下级
                    this.selectData[k].open=true;
                }else{
                    // 取消全选
                    var list=this.selectData[k].children;
                    for(var i=0,len=list.length;i<len;i++){
                        if(!(this.selectOn.indexOf(list[i].id)==-1)){
                            // 去除含有的id
                            this.selectOn.splice(this.selectOn.indexOf(list[i].id),1)
                            this.selectData[k].children[i].check=false;
                        }
                    }
                    this.selectData[k].check=false;
                    this.selectData[k].indeterminate=false;
                    // 关闭下级
                    this.selectData[k].open=false;
                }
                // 驱动视图更新
                this.index++;
                this.commonSubData();
            },
            // 打开子集项目
            openChild(k){
                this.selectData[k].open=!this.selectData[k].open;
                // 驱动视图更新
                this.index++;
            },
        }
    }
</script>

<style scoped>
    .selectBox_components .selectBox_components-reletives{
        position:relative;
        /* z-index:2; */
    }
    .selectBox_components .selectBox_components-showBox{
        transition: all .2s cubic-bezier(.55,0,.1,1);
        position: absolute;
        height: 200px;
        background:#fff;
        border-radius: 5px;
        box-shadow: 0 0 1px 1px #eee;
        z-index:2;
        overflow: hidden;
    }
    .selectBox_components .selectBox_components-list_data{
        height:100%;
        /* width:100%; */
        overflow: auto;
    }
    .selectBox_components .selectBox_components-title{
        padding:6px 10px;
        cursor: pointer;
    }
    .selectBox_components .selectBox_components-title .selectBox_components-decoration:hover,
    .selectBox_components-children_list .selectBox_components-decoration:hover{
        text-decoration: underline;
    }
    .selectBox_components .selectBox_components-children_list{
        cursor: pointer;
        padding: 0 0 6px 52px;
    }
    .selectBox_components .el-icon-remove,.el-icon-circle-plus{
        font-size:18px;
        vertical-align: bottom;
        transition: all linear 200ms;
    }
    .selectBox_components .el-icon-remove{
        color:#999
    }
    .selectBox_components .el-icon-circle-plus{
        color:#FFD700;
    }
    .clickClose_box{
        position: fixed;
        width:100%;
        height:100%;
        top:0;
        z-index:1;
        right:0;
        background:rgba(0,0,0,.05)
    }
</style>