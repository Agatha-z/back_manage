<template>
    <div class="transfer">
        <div class="left">
            <div class="headers">
                加料【分类1】可选择关联菜品
            </div>
            <div class="border_box">
                <div class="seach_div">
                    <el-input placeholder="请输入内容" size="small" v-model.trim="seachTetx" style="width:300px" @change="inputChange(seachTetx)" clearable @keyup.enter.native="seachEvent(seachTetx)" prefix-icon="el-icon-search"></el-input>
                    <el-button type="primary" size="small" @click="seachEvent(seachTetx)" icon="el-icon-search">搜索</el-button>
                </div>
                <div class="saild_rl">
                    <!-- 菜品分类 -->
                    <div class="div ld">
                        <div class="iteam_sele" :class="{select_ite:activeName2==v.name}" @click="handleClick(v.name)" v-for="(v,k) in footClass" :key="k">{{v.label}}</div>      
                    </div>
                    <!-- 菜品数据 -->
                    <div class="div rd">
                        <div class="checked_box">
                            <!-- header -->
                            <div class="head_check">
                                <div class="table_div" style="width:20px">
                                    <el-checkbox v-model="checkedTop" :indeterminate="indeterminate" @change="parentChange"></el-checkbox>
                                </div>
                                <div class="table_div center">菜品</div>
                                <div class="table_div center">价格</div>
                            </div>
                            <div class="detailsList">
                                <!-- 菜品数据 -->
                                <div v-show="false"> 此处驱动视图更新 {{index}}</div>
                                <div class="head_check lightBack" v-for="(v,k) in forList" :key="k" v-show="classList(v)">
                                    <div class="table_div" style="width:20px">
                                        <el-checkbox v-model="v.check" @change="iteamChange" :disabled="v.desable"></el-checkbox>
                                    </div>
                                    <div class="table_div center">{{v.name}}</div>
                                    <div class="table_div center" style="width:100px">{{v.money}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="btns">
            <!--  -->
            <el-button style="margin:170px 0 0 55px;" type="primary" size="small" @click="addFootList">添加 <i class="el-icon-d-arrow-right"></i></el-button>
            <br>
            <el-button style="margin:10px 0 0 55px;" type="info" size="small" @click="restFootList">重置 <i class="el-icon-refresh"></i></el-button>
        </div>
        <div class="right">
            <div class="headers"></div>
            <div class="footComList">
                <div class="header_tops">
                    <div class="tit firstName">菜品名称</div>
                    <div class="tit">加价金额/元</div>
                    &nbsp;
                    <div class="tit">加价后价格/元</div>
                    <div class="tit">操作</div>
                </div>
                <!-- 滚动内容 -->
                <div class="content_scroll">
                    <div v-for="(v,k) in addList" :key="k">
                        <div class="border_bottom">
                            <div class="tit firstName">{{v.name}}</div>
                            <div class="tit">
                                {{v.price}}
                            </div>
                            &nbsp;
                            <div class="tit">
                                {{v.money}}
                            </div>
                            <div class="tit">
                                <div style="color:red;cursor:pointer" @click="operation(k)">删除</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            selectedList:{
                default(){
                    return [//默认已经添加的食品
                        {id: "1",money: 23,viPrice:2,name: "好吃的饺子",type: 1,premium:0,price:2},
                        {id: "5",money: 23,viPrice:2,name: "12米面条",type: 1,premium:0,price:2},
                    ]
                }
            },
            footClass:{
                default(){
                    return  [ //分类数据
                        {label:'全部',name:'0'},
                        {label:'套餐',name:'1'},
                        {label:'早餐',name:'2'},
                        {label:'饮品类',name:'3'},
                        {label:'米线',name:'4'},
                        {label:'小食单加',name:'5'},
                        {label:'酸辣粉皮&凉皮',name:'6'},
                        {label:'员工商品',name:'7'},
                    ]
                },
            },
            footList:{ //菜品数据
                default(){
                    return [
                        {type:1,id:'1',name:'好吃的饺子',money:21},
                        {type:1,id:'2',name:'超级馒头',money:45},
                        {type:1,id:'3',name:'无敌煎饼',money:21},
                        {type:1,id:'4',name:'牛逼黄金油条',money:2},
                        {type:1,id:'5',name:'12米面条',money:21},
                        {type:1,id:'6',name:'1平方米煎饼果子',money:12},
                        {type:2,id:'7',name:'辣子鸡',money:21},
                        {type:2,id:'8',name:'豆浆',money:21},
                        {type:2,id:'9',name:'拿铁咖啡',money:5},
                        {type:2,id:'10',name:'拿钢饮料',money:22},
                        {type:2,id:'11',name:'原味奶茶',money:12},
                        {type:2,id:'12',name:'不要钱的酸奶',money:21},
                        {type:3,id:'13',name:'炒面',money:2},
                        {type:3,id:'14',name:'炒饭',money:21},
                        {type:3,id:'15',name:'鸡腿',money:65},
                        {type:4,id:'16',name:'大鸡腿',money:1},
                        {type:4,id:'17',name:'小鸡腿',money:21},
                        {type:4,id:'18',name:'牛肉面',money:21},
                        {type:5,id:'19',name:'驴肉火烧',money:45},
                        {type:5,id:'20',name:'煎饺',money:21},
                        {type:5,id:'21',name:'牛蹄筋',money:67},
                        {type:5,id:'22',name:'凤爪',money:21},
                        {type:5,id:'23',name:'茶叶蛋',money:7},
                        {type:5,id:'24',name:'钢圈',money:21},
                        {type:5,id:'25',name:'甜甜圈',money:9},
                        {type:6,id:'26',name:'98k',money:21},
                        {type:6,id:'27',name:'ump9',money:7},
                        {type:6,id:'28',name:'akm',money:23},
                        {type:7,id:'29',name:'m416',money:4},
                    ]
                }
            }
        },
        data(){
            return {
                indeterminate:false,//头部复选框状态
                index:0,//驱动视图更新
                seachTetx:'',//搜索框绑定数据
                checkedTop:false,//顶部复选框绑定之
                activeName2:"0",//激活的tabs
                forList:[],//真实渲染数据
                addList:[],//已经添加过的渲染数据
            }
        },
        computed:{
            classList(){
                return (v)=>{
                    var x;
                    if(v.keywords){
                        if(this.activeName2==0){
                            x=true
                        }else{
                            x=this.activeName2==v.type
                        }
                    }else{
                        x=false
                    }
                    return x
                }
            }
        },
        created(){
            // 设置真实渲染数据 防止保存为内存中数据
            this.forList=JSON.parse(JSON.stringify(this.footList));
            for(var i=0,len=this.forList.length;i<len;i++){
                // 设置搜索关键词 显示
                this.forList[i].check=false;
                this.forList[i].keywords=true;
                // 是否禁用
                this.forList[i].desable=false;
            }
            // 设置编辑的时候已经添加过的食品数据
            this.addList=JSON.parse(JSON.stringify(this.selectedList))
            // 默认设置渲染左侧选中状态
            this.commomCheck()
        },
        methods:{
            // 公共获取 原始价格
            getMoney(id){
                var resurt=id;
                for(var i=0,len=this.forList.length;i<len;i++){
                    if(this.forList[i].id==resurt){
                        return this.forList[i].money;
                    }
                }
                
            },
            // 提交给父组件数据的公共事件
            submitSetList(){
                this.$emit('change',this.addList)
            },
            // 重置按钮
            restFootList(){
                this.addList=[];
                // 重置也需要回复备选状态
                this.$message({
                    message: '重置成功！',
                    type: 'success'
                });
                for(var j=0,len2=this.forList.length;j<len2;j++){
                    // 清除被禁用以及被选中的数据
                    this.forList[j].desable=false;
                    this.forList[j].check=false;
                }
                // 清除顶部选中状态
                this.indeterminate=false;
                this.checkedTop=false;
                this.submitSetList()
            },
            // 删除 
            operation(k){
                let ids=this.addList[k].id;
                this.addList.splice(k,1);
                for(var j=0,len2=this.forList.length;j<len2;j++){
                    if(this.forList[j].id==ids){
                        // 清除禁用
                        this.forList[j].desable=false;
                        this.forList[j].check=false;
                    }
                }
                this.commomCheck()
                this.submitSetList()
            },
            // 公共设置全选非/全选
            commomCheck(){
                for(var j=0,len2=this.forList.length;j<len2;j++){
                    var ids=this.forList[j].id;
                    for(var x=0,len3=this.addList.length;x<len3;x++){
                        if(ids==this.addList[x].id){
                            this.forList[j].check=true;
                            // 设置已添加地方禁止选中
                            this.forList[j].desable=true;
                        }
                    }
                }
                // 设置 头部cheke状态
                var index_length=0;
                for(var i=0,len=this.forList.length;i<len;i++){
                    if(this.forList[i].check){
                        index_length++
                    }
                }
                if(index_length==0){
                    this.indeterminate=false;
                }else if(index_length==this.forList.length){
                    this.indeterminate=false;
                    this.checkedTop=true;
                }else{
                    this.indeterminate=true;
                    this.checkedTop=false;
                }
            },
            // 头部复选框功能
            parentChange(data){
                for(var i=0,len=this.forList.length;i<len;i++){
                    this.forList[i].check=data;
                }
                this.commomCheck()
            },
            // 子集复选框项目
            iteamChange(data){
                this.index++;
                this.commomCheck()
            },
            // tabs点击事件  设置分类显示
            handleClick(e){
                this.activeName2=e;
            },
            // 搜索框change事件
            inputChange(e){
                if(e==''){
                   this.seachEvent(e) 
                }
            },
            // 搜索框事件
            seachEvent(e){
                for(var i=0,len=this.forList.length;i<len;i++){
                    if(this.forList[i].name.indexOf(e)==-1){
                        this.forList[i].keywords=false
                    }else{
                        this.forList[i].keywords=true
                    }
                }
                // 此为驱动视图更新
                this.index++
            },
            // 添加按钮 
            addFootList(){
                var array=[];
                for(var i=0,len=this.forList.length;i<len;i++){
                    if(this.forList[i].check&&!this.forList[i].desable){
                        array.push({
                            id:this.forList[i].id,
                            price:4,
                            money:this.forList[i].money,
                            name:this.forList[i].name,
                            type:this.forList[i].type,
                        })
                    }
                }
                this.addList=array.concat(this.addList);
                this.commomCheck();
                this.submitSetList()
            },
        }  
    }
</script>

<style scoped>
    .transfer{
        width:100%;
        height:calc(60vh - 150px);
        min-height: 350px;
        max-height: 500px;
        padding:0 10px;
        box-sizing: border-box;
        position: relative;
    }
    .headers{
        height:40px;
        font-size:16px;
        line-height: 40px;
        color:deeppink;
    }
    .border_box{
        border:1px solid #eee;
        /* padding:10px; */
        box-sizing: border-box;
        height:100%;
    }
    .transfer .left{
        float:left;
        height:100%;
        width:42%;
    }
    .transfer .right{
        float:right;
        height:100%;
        width:42%;

    }
    .transfer .btns{
        width:170px;
        float: left;
    }
    .seach_div{
        border-bottom: 1px solid #eee;
        padding:10px;
    }
    .saild_rl{
        height:calc(100% - 53px);
    }
    .saild_rl .div{
        display: inline-block;
    }
    .saild_rl .ld{
        width:130px;
        height:100%;
        overflow-y: auto;
        background:#eee;
        border-right:1px solid #eee;
    }
    .iteam_sele{
        text-align: right;
        line-height: 30px;
        font-size:14px;
        box-sizing: border-box;
        padding-right:10px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        cursor: pointer;
    }
    .select_ite{
        background:#fff;
        color:dodgerblue;
    }
    .saild_rl .rd{
        height:100%;
        width:calc(100% - 151px);
        float: right;
        box-sizing: border-box;
        border-left:1px solid #eee;
    }
    .checked_box{
        height:100%; 
    }
    .head_check{
       padding: 10px 15px;
       background:#eee; 
    }
    .table_div{
        display: inline-block;
    }
    .table_div.center{
        width:105px;
        text-align: center;
    }
    .lightBack{
        background:#fff;
        border-bottom:1px solid #eee;
    }
    .detailsList{
        height:calc(100% - 38px);
        overflow-y: auto;
    }
    .footComList{
        height:100%;
        border:1px  solid #eee
    }
    .header_tops{
        height:40px;
        line-height: 40px;
        border-bottom: 1px solid #eee;
        background:#eee;
    }
    .header_tops .tit,.content_scroll .tit{
        display: inline-block;
        width:24%;
        text-align: center;
        vertical-align:middle;
    }
    .content_scroll{
        height:calc(100% - 40px);
        overflow-y: auto;
    }
    .firstName{
        text-align: left!important;
        box-sizing: border-box;
        padding-left:15px;
    }
    .content_scroll .border_bottom{
        border-bottom: 1px solid #eee;
        padding:12px 0;
    }
</style>