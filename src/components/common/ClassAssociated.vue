<template>
    <div class="transfer">
        <div class="left">
            <div class="headers">
                <span>选择做法分类</span>
                <el-select v-model="practice" size="small" @change="index++" placeholder="请选择">
                    <el-option label="冰度" :value="1"></el-option>
                    <el-option label="辣度" :value="2"></el-option>
                </el-select>
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
                                <div class="table_div center">价格/元</div>
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
            <div style="padding:8px 0;color:red">
                菜品配置做法后必选，请为菜品配置不加价的做法作为默认做法。
            </div>
        </div>
        <div class="btns">
            <el-button style="margin:180px 0 0 55px;" type="primary" size="small" @click="addFootList">添加 <i class="el-icon-d-arrow-right"></i></el-button>
            <br>
            <el-button style="margin:10px 0 0 55px;" type="info" size="small" @click="restFootList">重置 <i class="el-icon-refresh"></i></el-button>
        </div>
        <div class="right">
            <div class="headers"></div>
            <div class="footComList">
                <div class="header_tops">
                    <div class="tit firstText">做法名称</div>
                    <div class="tit">加价方式</div>
                    <div class="tit" style="width:30%">加价金额/比例</div>
                    &nbsp;
                    <div class="tit" style="width:18%">加价后价格/元</div>
                </div>
                <!-- 滚动内容 -->
                <div class="content_scroll content_scroll_loading">
                    <div v-for="(v,k) in addList" :key="k">
                        <div class="border_bottom">
                            <div class="titles_top">
                                <div style="color:#409EFF">{{v.name}}</div>
                                <div style="color:red;cursor:pointer" @click="operation(k)">删除</div>
                            </div>
                            <!--  -->
                            <div style="padding:5px 0" v-for="(j,z) in v.children" :key="z">
                                <div class="tit firstText">
                                    <el-checkbox style="margin-left:-22px" @change="checkChange" v-model="j.check"></el-checkbox>
                                    &nbsp;
                                    {{j.title}}
                                </div>
                                <div class="tit">
                                    <el-select size="small" v-model="j.premium"  placeholder="请选择" @change="moneyChange(1,k,z)" :disabled="!j.check">
                                        <el-option label="不加价" :value="0"></el-option>
                                        <el-option label="比例加价" :value="1"></el-option>
                                        <el-option label="固定加价" :value="2"></el-option>
                                    </el-select>
                                </div>
                                <div class="tit" style="width:30%">
                                    <el-input-number @change="moneyChange(2,k,z)" :disabled="!j.check||j.premium==0" v-model="j.price" style="width:80%" size="small" :min="0" label="描述文字"></el-input-number>
                                    <span v-if="j.premium==0||j.premium==2">元</span>
                                    <span v-else>%</span>
                                </div>
                                &nbsp;
                                <div class="tit" style="width:18%">
                                    {{j.money.toFixed(2)}}
                                </div>
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
                        {id: "1",money: 21,viPrice:33,name: "好吃的饺子",type: 1,
                            children:[
                                {check:true,title:'常温',premium:1,price:0,money:14.00},
                                {check:true,title:'温热',premium:1,price:0,money:14.00},
                                {check:true,title:'冰',premium:1,price:0,money:14.00},
                            ],
                        },
                        {id: "5",money: 21,viPrice:33,name: "12米面条",type: 1,
                            children:[
                                {check:true,title:'常温',premium:1,price:0,money:14.00},
                                {check:true,title:'温热',premium:1,price:0,money:14.00},
                                {check:true,title:'冰',premium:1,price:0,money:14.00},
                            ],
                        },
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
                practice:1,//做法分类
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
            // 右侧复选框变化事件
            checkChange(){
                this.submitSetList()
            },
            // 右侧 已添加分类关联菜品
            moneyChange(e,k,j){
                // e 操作的类型  1 加价方式  2加价金额/比例
                // k 操作的 父级 数据 下标 --- this.addList
                // j 操作的 子集 数据 下标 --- 
                // x 1--冰度   2--辣度
                if(e==1){
                    this.addList[k].children[j].price=0;
                    this.addList[k].children[j].money=this.addList[k].money
                }else{
                    var originalP=this.addList[k].money; //原价
                    var preP=this.addList[k].children[j].price;//加价 框的值
                    var premium=this.addList[k].children[j].premium;//加价方式  0 不加价   1 比例加价  2 固定加价
                    if(premium==0){
                        this.addList[k].children[j].money=this.addList[k].money
                    }else if(premium==1){
                        this.addList[k].children[j].money=parseFloat((originalP+originalP*preP/100).toFixed(2))
                    }else{
                        this.addList[k].children[j].money=originalP+preP
                    }
                }
                this.submitSetList()
                // 驱动视图更新
                this.index++;
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
                            money:this.forList[i].money,
                            name:this.forList[i].name,
                            type:this.forList[i].type,
                            children:[
                                {check:true,title:'常温',premium:0,price:0,money:this.forList[i].money,},
                                {check:true,title:'温热',premium:0,price:0,money:this.forList[i].money,},
                                {check:true,title:'冰',premium:0,price:0,money:this.forList[i].money,},
                            ],
                        })
                    }
                }
                // 循环添加vip 价格等于 规格价格
                for(var j=0,len1=array.length;j<len1;j++){
                    array[j].viPrice=array[j].money
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
        height:58px;
        font-size:18px;
        line-height: 40px;
        color:#666;
        font-weight: 600;
        box-sizing: border-box;
        padding-top:10px;
    }
    .border_box{
        border:1px solid #eee;
        /* padding:10px; */
        box-sizing: border-box;
        height:100%;
    }
    .transfer .left{
        float:left;
        height:calc(100% - 10px);
        width:42%;
    }
    .transfer .right{
        float:right;
        height:calc(100% - 10px);
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
        font-weight: 600;
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
    .content_scroll .border_bottom{
        border-bottom: 1px solid #eee;
        /* padding:5px 0; */
    }
    .firstText{
        text-align: left!important;
        text-indent: 10px;
        width:20%!important;
    }
    .titles_top{
        height:40px;
        line-height: 40px;
        padding:0 10px;
        background:#ccc;
    }
    .titles_top>div:first-child{
        float: left;
    }
    .titles_top>div:last-child{
        float: right;
    }
</style>