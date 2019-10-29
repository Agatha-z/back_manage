<template>
    <div>
        <!--表格数据-->
        <div style="margin-bottom:15px;">
            <!-- 数据 -->
            <table border="0" cellspacing="0" class="table_list">
                <tr>
                    <th></th>
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
                    <td></td>
                </tr>
                <!-- 无数据显示 -->
                <tr v-if="checkDetail_list.length<=0">
                    <td colspan="11">
                        <p style="color:#999">暂无更多数据</p>
                    </td>
                </tr>
            </table>
        </div>
        <!--底部打印与取消-->
        <div class="checkBottom">
            <el-button type="primary" v-show="isCheckDetail">打印</el-button>
            <div v-show="isAudit" class="fl">
                <el-button type="success">审核通过</el-button>
                <el-button type="warning">驳回</el-button>
            </div>
            <el-button type="success" v-show="buttondeliver">确认发货</el-button>
            <el-button type="info" @click="toParent">取消</el-button>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        isCheckDetail:{//点击查看时进来显示
            type:Boolean,
            default:true,
        },
        isAudit:{//点击审核时进来显示
            type:Boolean,
            default:false,
        },
        buttondeliver:{//点击发货时进来才显示
            type:Boolean,
            default:false,
        }
    },
    data () {
        return {
            checkDetail_list:[//点击查看的数据
                {code:'WP102',name:'酸辣粉',version:'',size:'',unit:'箱',num:'1',price:'200.000000',money:'200',amount:'1',per:'',},
                {code:'WP102',name:'酸辣粉',version:'',size:'',unit:'箱',num:'1',price:'200.000000',money:'200',amount:'1',per:'',},
                {code:'WP102',name:'酸辣粉',version:'',size:'',unit:'箱',num:'1',price:'200.000000',money:'200',amount:'1',per:'',},
                {code:'WP102',name:'酸辣粉',version:'',size:'',unit:'箱',num:'1',price:'200.000000',money:'200',amount:'1',per:'',},
            ]
        }
    },
    methods: {
        // 给父组件传递事件
        toParent(){
            this.$emit('fromchild');
        },
    }
}
</script>
<style scoped>
.checkBottom button {
  margin-right: 10px;
  margin-left: 0;
}

@media print {
#printTest .table_list tr{
   border-top:1px solid #cccccc;
}
}
</style>
