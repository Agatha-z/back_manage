<!--中央厨房·订单列表点击查看内容详情-->
<template>
    <div class="checkDetail">
        <!--头部内容-->
        <div class="checkTop">
            <div class="item">
                <!--  -->
                <label class="fl">供应商名称</label>
                <el-input style="width:20%;margin-right:10px;" size="medium" clearable  :placeholder="p_name1"    :disabled='disable'></el-input>
                <span style="color:red;padding-top:10px;font-size:16px;margin-right:60px;">*</span>
                <!--  -->
                <label>订单日期</label>
                <el-input style="width:20%;margin-right:60px;" size="medium" clearable placeholder="2018-12-14"   disabled></el-input>
            </div>
            <div class="item">
                <label class="fl">收货地址</label>
                <div class="form-wrap fl">
                    <textarea :placeholder="Txt1" :readonly='disable' class="form-control fl" maxlength="150"></textarea>
                </div>
            </div>
            <div class="item">
                <label class="fl">填写备注</label>
                <div  class="form-wrap fl">
                    <textarea :placeholder="Txt2" :readonly='disable' class="form-control fl" maxlength="150"></textarea>
                </div>
            </div>
        </div>
        <!--表格数据-->
        <div class="checkTable" style="margin-bottom:15px;">
            <!-- 数据 -->
            <table border="0" cellspacing="0" class="table_list">
                <tr>
                    <th></th>
                    <!--从哪里进来的进行判断是否添加-->
                    <th v-show="!disable"></th>
                    <th>物品编码</th>
                    <th>物品名称</th>
                    <th>规格型号</th>
                    <th>采购规格</th>
                    <th>采购单位</th>
                    <th>采购数量</th>
                    <th>收货数量</th>
                    <th>收货单价</th>
                    <th>收货金额</th>
                    <th>备注</th>
                </tr>
                <tr v-for="(v,k) in checkDetail_list" :key="k">
                    <td>{{k+1}}</td>
                    <!--从哪里进来的进行判断是否添加-->
                    <td v-show="!disable">+ -</td>
                    <td>{{v.code}}</td>
                    <td>{{v.name}}</td>
                    <td>{{v.version}}</td>
                    <td>{{v.size}}</td>
                    <td>{{v.unit}}</td>
                    <td>{{v.num}}</td>
                    <td>{{v.price}}</td>
                    <td>{{v.money}}</td>
                    <td>{{v.amount}}</td>
                    <td>{{v.per}}</td>
                </tr>
                <tr>
                    <td></td>
                    <td>合计</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>138.00</td>
                    <td>138.00</td>
                    <td></td>
                    <td>7416.00</td>
                    <!--从哪里进来的进行判断是否添加-->
                    <td v-show="!disable"></td>
                    <td></td>
                </tr>
                <!-- 无数据显示 -->
                <tr v-if="checkDetail_list.length<=0">
                    <td colspan="12">
                        <p style="color:#999">暂无更多数据</p>
                    </td>
                </tr>
            </table>
        </div>
        <!--底部打印与取消-->
        <div class="checkBottom">
            <el-button type="primary" v-if="disable" class="fl">打印</el-button>
            <div v-else class="fl">
                <el-button  type="primary" class="fl">保存草稿</el-button>
                <el-button  type="success" class="fl">提交并审核通过</el-button>
            </div>
            <el-button type="info" @click="toParent" class="fl">取消</el-button>
            <div style="float:left;"></div>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        disable:{//输入框状态接受父组件传值
            type:Boolean,
            default:true,
        },
        p_name1:{
            //供应商名称输入框接受父组件传值
            type:String,
            default:'',
        },
        Txt1:{
            //文本框占位符1接受父组件传值
            type:String,
            default:'',
        },
        Txt2:{
            //文本框占位符2接受父组件传值
            type:String,
            default:'',
        },
    },
    data(){
        return{
            checkDetail_list:[//点击查看的数据
                {code:'WP102',name:'酸辣粉',version:'',size:'',unit:'箱',num:'1',price:'200.000000',money:'200',amount:'1',per:'',},
                {code:'WP102',name:'酸辣粉',version:'',size:'',unit:'箱',num:'1',price:'200.000000',money:'200',amount:'1',per:'',},
                {code:'WP102',name:'酸辣粉',version:'',size:'',unit:'箱',num:'1',price:'200.000000',money:'200',amount:'1',per:'',},
                {code:'WP102',name:'酸辣粉',version:'',size:'',unit:'箱',num:'1',price:'200.000000',money:'200',amount:'1',per:'',},
            ]
        }
    },
    methods:{
        //点击取消按钮向父组件传递事件
        toParent(){
            this.$emit('fromchild');
        }
    },
    created(){
        console.log(this.disable)
    }
}
</script>
<style scoped>
    /*查看详情内容页样式*/
    .checkDetail .checkTop{
        padding:10px 0 0 100px;
        margin-bottom:20px;
    }
    .checkTop .item{
        height:50px;
        line-height:50px;
    }
    .checkTop .item label{
        width:100px;
        text-align:right;
        font-size:18px;
        font-weight:600;
        margin-right:30px;
    }
    .checkTop .item .line{
        flex:2;
        height:1px;
        background:#e5e8ea;
        margin-top:40px;
    }
    .form-wrap{
    	height:32px;
    	padding:5px;
    	width:90%;
    	border-bottom:1px solid #e5e8ea;
    }
    .form-control{
        outline: 0;
        width: 100%;
        border: 0;
        height: 32px;
        box-sizing:border-box;
        padding-top:15px;
        color: #555;
        border-right: 0;
        background-attachment: scroll;
        resize: none;
		padding-right: 20px;
		border-right: 0;               
		overflow:auto;
        background:transparent;
    }
    .checkBottom{
        height:50px;
        font-size:0;
    }
    .checkBottom button{
        margin-right:10px;
        margin-left:0;
    }
    textarea:-ms-input-placeholder{
    	
    }
</style>

