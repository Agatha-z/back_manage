<template>
    <div class="transfer">
        <div class="left">
            <div class="headers">
                正在新增：14.8套餐，价格 {{sunPrice.toFixed(2)}} 元，会员价 {{vipprice.toFixed(2)}} 元
            </div>
            <div class="border_box">
                <div class="seach_div">
                    <el-input placeholder="请输入内容" size="small" v-model="seachTetx" style="width:300px" @change="inputChange(seachTetx)" clearable @keyup.enter.native="seachEvent(seachTetx)" prefix-icon="el-icon-search"></el-input>
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
                                <div class="table_div center">价格/规格</div>
                            </div>
                            <div class="detailsList">
                                <!-- 菜品数据 -->
                                <div v-show="false"> 此处驱动视图更新 {{index}}</div>
                                <div class="head_check lightBack" v-for="(v,k) in forList" :key="k" v-show="classList(v)">
                                    <div class="table_div" style="width:20px">
                                        <el-checkbox v-model="v.check" @change="iteamChange"></el-checkbox>
                                    </div>
                                    <div class="table_div center">{{v.name}}</div>
                                    <div class="table_div center" style="width:100px">{{v.money}}<span v-if="!(v.specifications=='')">/{{v.specifications}}</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="btns">
            <el-button style="margin:190px 0 0 2px;" type="primary" size="small" @click="addFootList">添加 <i class="el-icon-d-arrow-right"></i></el-button>
            <br>
            <el-button style="margin:10px 0 0 2px;" type="info" size="small" @click="restFootList">重置 <i class="el-icon-refresh"></i></el-button>
        </div>
        <div class="right">
            <div class="headers">
                套餐添加顺序会与收银小票、后厨小票顺序一致
            </div>
            <div class="footComList">
                <div class="header_tops">
                    <div class="tit" style="width:12%">序号</div>
                    <div class="tit">菜品</div>
                    <div class="tit">原价/规格</div>
                    <div class="tit">差价</div>
                    <div class="tit" style="width:20%">数量</div>
                    <div class="tit">操作</div>
                </div>
                <!-- 滚动内容 -->
                <div class="content_scroll">
                    <div v-for="(v,k) in addList" :key="k">
                        <div class="border_bottom">
                            <div class="tit" style="width:12%">{{k+1}}</div>
                            <div class="tit">{{v.name}}</div>
                            <div class="tit">{{v.money}}<span v-if="!(v.specifications=='')">/{{v.specifications}}</span></div>
                            <div class="tit">{{'--'}}</div>
                            <div class="tit" style="width:20%">
                                <el-input-number size="mini" :min="1" style="width:100%" v-model="v.num" @change="index++"></el-input-number>
                            </div>
                            <div class="tit">
                                <div style="color:dodgerblue;cursor:pointer" @click="operation(1,k)">加备选</div>
                                <div style="color:red;cursor:pointer" @click="operation(2,k)">删除</div>
                            </div>
                        </div>
                        <!-- 备选 -->
                        <div class="border_bottom" v-for="(j,x) in v.children" :key="x">
                            <div class="tit" style="width:12%">备选</div>
                            <div class="tit">{{j.name}}</div>
                            <div class="tit">{{j.money}}<span v-if="!(v.specifications=='')">/{{v.specifications}}</span></div>
                            <div class="tit">
                                <el-input-number size="mini" v-if="!(j.type==-1)" :min="0" style="width:100%" v-model="j.price" @change="index++"></el-input-number>
                                <span v-else>--</span>
                            </div>
                            <div class="tit" style="width:20%">
                                <el-input-number size="mini" v-if="!(j.type==-1)" :min="1" style="width:100%" v-model="j.num" @change="index++"></el-input-number>
                                <span v-else>--</span>
                            </div>
                            <div class="tit">
                                <div style="color:red;cursor:pointer" @click="operation(3,k,x)">删除备选</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div style="clear:both">
            <span style="color:red">*</span>
            <span>套餐价</span>
            &nbsp;
            <el-input-number v-model="sunPrice" :precision="2" style="width:200px" :min="0" label="套餐价"></el-input-number>
            <!--  -->
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <!--  -->
            <span style="color:red">*</span>
            <span>会员价格</span>
            &nbsp;
            <el-input-number v-model="vipprice" :precision="2" style="width:200px" :min="0" label="套餐价"></el-input-number>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            selectedList:{
                default(){
                    return [//默认已经添加的食品
                        {id: "1",money: 21,specifications:'大份',name: "好吃的饺子",num: 1,type: 1,children:[
                            {type:2,id:'7',name:'辣子鸡',money:21,price:0,num: 1,},//有备选内容时数据
                        ]},
                        {id: "1",money: 21,specifications:'大份',name: "好吃的饺子",num: 1,type: 1,children:[]},//无备选数据时
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
                        {type:1,id:'1',name:'好吃的饺子',money:21,specifications:'大份'},
                        {type:1,id:'2',name:'超级馒头',money:45,specifications:'大份'},
                        {type:1,id:'3',name:'无敌煎饼',money:21,specifications:'大份'},
                        {type:1,id:'4',name:'牛逼黄金油条',money:2,specifications:'大份'},
                        {type:1,id:'5',name:'12米面条',money:21,specifications:'大份'},
                        {type:1,id:'6',name:'1平方米煎饼果子',money:12,specifications:'大份'},
                        {type:2,id:'7',name:'辣子鸡',money:21,specifications:'大份'},
                        {type:2,id:'8',name:'豆浆',money:21,specifications:'大份'},
                        {type:2,id:'9',name:'拿铁咖啡',money:5,specifications:'大份'},
                        {type:2,id:'10',name:'拿钢饮料',money:22,specifications:'大份'},
                        {type:2,id:'11',name:'原味奶茶',money:12,specifications:'大份'},
                        {type:2,id:'12',name:'不要钱的酸奶',money:21,specifications:'大份'},
                        {type:3,id:'13',name:'炒面',money:2,specifications:'大份'},
                        {type:3,id:'14',name:'炒饭',money:21,specifications:'大份'},
                        {type:3,id:'15',name:'鸡腿',money:65,specifications:'大份'},
                        {type:4,id:'16',name:'大鸡腿',money:1,specifications:'大份'},
                        {type:4,id:'17',name:'小鸡腿',money:21,specifications:'大份'},
                        {type:4,id:'18',name:'牛肉面',money:21,specifications:'大份'},
                        {type:5,id:'19',name:'驴肉火烧',money:45,specifications:'大份'},
                        {type:5,id:'20',name:'煎饺',money:21,specifications:'大份'},
                        {type:5,id:'21',name:'牛蹄筋',money:67,specifications:'大份'},
                        {type:5,id:'22',name:'凤爪',money:21,specifications:'大份'},
                        {type:5,id:'23',name:'茶叶蛋',money:7,specifications:'大份'},
                        {type:5,id:'24',name:'钢圈',money:21,specifications:'大份'},
                        {type:5,id:'25',name:'甜甜圈',money:9,specifications:'大份'},
                        {type:6,id:'26',name:'98k',money:21,specifications:'大份'},
                        {type:6,id:'27',name:'ump9',money:7,specifications:'大份'},
                        {type:6,id:'28',name:'akm',money:23,specifications:'大份'},
                        {type:7,id:'29',name:'m416',money:4,specifications:'大份'},
                    ]
                }
            }
        },
        data(){
            return {
                sunPrice:0,//总价
                vipprice:0,//会员价格
                indeterminate:false,//头部复选框状态
                index:0,//驱动视图更新
                seachTetx:'',//搜索框绑定数据
                checkedTop:false,//顶部复选框绑定之
                activeName2:"0",//激活的tabs
                forList:[],//真实渲染数据
                addList:[],//已经添加过的渲染数据
                alternative:{
                    is:false,//是否为备选
                    parentIndex:-1,//父级 数据 位置
                    childIndex:-1,//子集位置
                },//添加备选时状态  此状态必须及时修改  用于判断  是否添加数据到备选数据中
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
                // 设置绑定复选状态
                this.forList[i].check=false;
                // 设置搜索关键词 显示
                this.forList[i].keywords=true;
            }
            // 设置编辑的时候已经添加过的食品数据
            this.addList=JSON.parse(JSON.stringify(this.selectedList))
            // 默认计算价格
            this.commonPrice()
        },
        watch:{
            sunPrice(){
                this.vipprice=this.sunPrice
            }
        },
        methods:{
            // 计算价格公共函数
            commonPrice(){
                var sunMoney=0;
                for(var i=0,len=this.addList.length;i<len;i++){
                    sunMoney+=this.addList[i].money;
                }
                this.sunPrice=sunMoney
            },
            // 提交给父组件数据的公共事件
            submitSetList(){
                this.$emit('change',this.addList,this.alternative.is)
            },
            // 重置按钮
            restFootList(){
                this.addList=[];
                // 重置也需要回复备选状态
                this.alternative.is=false;
                this.alternative.parentIndex=-1;
                this.alternative.childIndex=-1;
                this.$message({
                    message: '重置成功！',
                    type: 'success'
                });
                this.submitSetList()
                this.commonPrice()
            },
            // 删除 / 添加备选
            operation(e,k,j){
                if(e==1){
                    if(this.alternative.is){
                        // 已经有正在添加的备选状态
                        this.$message('序号为'+(this.alternative.parentIndex+1)+'的菜品正在添加备选菜品，请等待添加完成再进添加备选行操作');
                    }else{
                        // 添加备选   如果有正再添加的备选则不添加备选数据
                        for(var i=0,len=this.addList[k].children.length;i<len;i++){
                            if(this.addList[k].children[i].type<0){
                                return
                            }
                        }
                        this.addList[k].children.unshift({type:-1,id:'--',name:'--',money:'--',num:-1,price:0})
                        // 设置是备选时状态
                        this.alternative.is=true;
                        this.alternative.parentIndex=k;
                        this.alternative.childIndex=0;
                    }
                }else if(e==2){
                    // 如果删除的是正在添加的备选 则恢复非备选状态
                    if(k==this.alternative.parentIndex){
                        this.alternative.is=false;
                        this.alternative.parentIndex=-1;
                        this.alternative.childIndex=-1;
                    }   
                    // 删除
                    this.addList.splice(k,1);
                    this.$message({
                        message: '删除成功！',
                        type: 'success'
                    });
                }else{
                    // 如果删除的是正在添加的备选 则恢复非备选状态
                    if(k==this.alternative.parentIndex&&j==this.alternative.childIndex){
                        this.alternative.is=false;
                        this.alternative.parentIndex=-1;
                        this.alternative.childIndex=-1;
                    }
                    // 删除备选
                    this.addList[k].children.splice(j,1);
                    this.$message({
                        message: '删除成功！',
                        type: 'success'
                    });
                }
                // 驱动视图更新
                this.index++
                this.submitSetList()
            },
            // 公共设置全选非/全选
            commomCheck(){
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
            // tabs点击事件
            handleClick(e){
                this.activeName2=e;
                console.log(this.activeName2)
            },
            // 搜索框change事件
            inputChange(e){
                if(e==''){
                   this.seachEvent(e) 
                }
            },
            // 搜索框事件
            seachEvent(e){
                console.log(e)
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
                var arr=[];
                for(var i=0,len=this.forList.length;i<len;i++){
                    if(this.forList[i].check){
                        if(this.alternative.is){
                            arr.push({//备选时添加
                                type:this.forList[i].type,
                                id:this.forList[i].id,
                                name:this.forList[i].name,
                                money:this.forList[i].money,
                                specifications:this.forList[i].specifications,
                                num:1,
                                price:0,
                            })
                        }else{//非备选时添加
                            arr.push({
                                type:this.forList[i].type,
                                id:this.forList[i].id,
                                name:this.forList[i].name,
                                money:this.forList[i].money,
                                specifications:this.forList[i].specifications,
                                num:1,
                                children:[]
                            })
                        }
                        // 添加数据完毕后清除状态
                        this.forList[i].check=false;
                        // 刷新视图
                        this.commomCheck()
                    }
                }
                if(arr.length<=0){
                    this.$message('请勾选菜品！');
                    return;
                }
                if(this.alternative.is){
                    // 备选状态下添加到指定位置
                    this.addList[this.alternative.parentIndex].children.splice(0,1);
                    this.addList[this.alternative.parentIndex].children=arr.concat(this.addList[this.alternative.parentIndex].children)
                    // 回复备选状态
                    this.alternative.is=false;
                    this.alternative.parentIndex=-1;
                    this.alternative.childIndex=-1;
                }else{
                    // 此为非备选状态下添加数据
                    this.addList=this.addList.concat(arr)
                }
                // 驱动视图刷新
                this.index++;
                this.$message({
                    message: '添加成功！',
                    type: 'success'
                });
                this.submitSetList()
                this.commonPrice()
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
        height:calc(100% - 50px)
    }
    .transfer .left{
        float:left;
        height:100%;
        width:42%;
        
    }
    .transfer .right{
        float:right;
        height:100%;
        width:51%;

    }
    .transfer .btns{
        width:74px;
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
        height:calc(100% - 50px);
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
        width:16%;
        text-align: center;
        vertical-align:middle;
    }
    .content_scroll{
        height:calc(100% - 40px);
        overflow-y: auto;
    }
    .content_scroll .border_bottom{
        border-bottom: 1px solid #eee;
        padding:5px 0;
    }
</style>