<!--订单列表-->
<template>
    <div>
        <transition name="animateCheckDetail">
            <div class="orderList" v-if="show">
                <!--头部搜索-->
                <centerSearch :status="status"></centerSearch >
                <div>
                    <el-button type="primary" icon="el-icon-plus" @click="addOrder">新增订单</el-button>
                </div>
                <br>
                <!-- 数据 -->
                <div>
                    <table class="table_list" border="0" cellspacing="0">
                        <tr>
                            <th></th>
                            <th>单据号</th>
                            <th>供应商名称</th>
                            <th>采购金额</th>
                            <th>采购人</th>
                            <th>审核人</th>
                            <th>状态</th>
                            <th>采购日期</th>
                            <th>审核日期</th>
                            <th>收货日期</th>
                            <th>操作时间</th>
                            <th>操作</th>
                        </tr>
                        <tr v-for="(v,k) in data_list" :key="k">
                            <td>{{k+1}}</td>
                            <td>{{v.s_name}}</td>
                            <td>{{v.brand}}</td>
                            <td>{{v.areaName}}</td>
                            <td>{{v.attribute}}</td>
                            <td>{{v.formats}}</td>
                            <td>{{v.user}}</td>
                            <td>{{v.time}}</td>
                            <td>{{v.state}}</td>
                            <td>{{v.template}}</td>
                            <td>{{v.time1}}</td>
                            <td>
                                <el-button type="primary" size="small" icon="el-icon-search"  @click="operation(1,k,v)">查看</el-button>
                                <el-button type="danger" size="small" icon="el-icon-goods" @click="operation(2,k,v)">再次采购</el-button>
                            </td>
                        </tr>
                        <!-- 无数据显示 -->
                        <tr v-if="data_list.length<=0">
                            <td colspan="12">
                                <p style="color:#999">暂无更多数据</p>
                            </td>
                        </tr>
                    </table>
                </div>
                <!-- 分页 -->
                <div class="pageBtn">
                    <el-pagination
                    :background="true"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageIndex"
                    :page-sizes="[10, 20, 30, 40, 50]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="9990">
                    </el-pagination>
                </div>
            </div>
            <!--查看内容详情--> 
            <checkDetail @fromchild="fromchild"   v-else :disable='disable'  :Txt1='Txt1' :Txt2='Txt2' :p_name1="p_name1"></checkDetail>
        </transition>
    </div>
</template>
<script>
import  centerSearch from '@/components/common/centerSearch.vue';//引入头部公共搜索组件
import  checkDetail  from '@/components/common/check.vue';//引入查看内容详情组件
export default {
    data(){
        return{
            pageIndex:1,//当前页数
            pageSize:10,//每页显示条数
            show:true,//点击查看本条数据详情
            status:true,//向子组件传值
            disable:true,//给子组件传递输入框的状态
            p_name1:'',//给子组件传递供应商名称占位内容
            Txt1:'',//给子组件传递占位符1
            Txt2:'',//给子组件传递占位符2
            data_list:[ //渲染数据
                {s_name:'18121415450025',brand:'中央厨房',attribute:'7416.00',areaName:'吴燕燕',formats:'吴燕燕',user:'已完成',time:'2018-12-14',state:'2018-12-14',template:'2018-12-14',time1:'2018-12-14 15:45:33',},
                {s_name:'18121415450025',brand:'中央厨房',attribute:'7416.00',areaName:'吴燕燕',formats:'吴燕燕',user:'已完成',time:'2018-12-14',state:'2018-12-14',template:'2018-12-14',time1:'2018-12-14 15:45:33',},
                {s_name:'18121415450025',brand:'中央厨房',attribute:'7416.00',areaName:'吴燕燕',formats:'吴燕燕',user:'已完成',time:'2018-12-14',state:'2018-12-14',template:'2018-12-14',time1:'2018-12-14 15:45:33',},
                {s_name:'18121415450025',brand:'中央厨房',attribute:'7416.00',areaName:'吴燕燕',formats:'吴燕燕',user:'已完成',time:'2018-12-14',state:'2018-12-14',template:'2018-12-14',time1:'2018-12-14 15:45:33',},
                {s_name:'18121415450025',brand:'中央厨房',attribute:'7416.00',areaName:'吴燕燕',formats:'吴燕燕',user:'已完成',time:'2018-12-14',state:'2018-12-14',template:'2018-12-14',time1:'2018-12-14 15:45:33',},
                {s_name:'18121415450025',brand:'中央厨房',attribute:'7416.00',areaName:'吴燕燕',formats:'吴燕燕',user:'已完成',time:'2018-12-14',state:'2018-12-14',template:'2018-12-14',time1:'2018-12-14 15:45:33',},
                {s_name:'18121415450025',brand:'中央厨房',attribute:'7416.00',areaName:'吴燕燕',formats:'吴燕燕',user:'已完成',time:'2018-12-14',state:'2018-12-14',template:'2018-12-14',time1:'2018-12-14 15:45:33',},
                {s_name:'18121415450025',brand:'中央厨房',attribute:'7416.00',areaName:'吴燕燕',formats:'吴燕燕',user:'已完成',time:'2018-12-14',state:'2018-12-14',template:'2018-12-14',time1:'2018-12-14 15:45:33',},
                {s_name:'18121415450025',brand:'中央厨房',attribute:'7416.00',areaName:'吴燕燕',formats:'吴燕燕',user:'已完成',time:'2018-12-14',state:'2018-12-14',template:'2018-12-14',time1:'2018-12-14 15:45:33',},
                {s_name:'18121415450025',brand:'中央厨房',attribute:'7416.00',areaName:'吴燕燕',formats:'吴燕燕',user:'已完成',time:'2018-12-14',state:'2018-12-14',template:'2018-12-14',time1:'2018-12-14 15:45:33',},
            ],
        }
    },
    methods:{
        //操作按钮 查看/再次购买
        operation(e,k,data){
            if(e==1){
                // 查看内容详情
                this.show=false;
                this.disable=true;//子组件输入框状态
                this.p_name1='中央厨房';//改变子组件供应商名称输入框
                this.Txt1='';//改变子组件文本框占位内容1
                this.Txt2='';//改变子组件文本框占位内容2
            }else{
                //再次采购
                this.show=false;
                this.disable=false;//子组件输入框状态
            }
        },
        //点击新增订单
        addOrder(){
            this.show=false;
            this.disable=false;//子组件输入框状态
            this.p_name1='供应商名称';//改变子组件供应商名称输入框
            this.Txt1='在此填写收货地址';//改变子组件文本框占位内容1
            this.Txt2='在此填写备注信息';//改变子组件文本框占位内容2
        },
        //接受查看详情页面传过来的事件
        fromchild(){
            this.show=true;
        },
        // pageSize 改变时会触发
        handleSizeChange(data){
            console.log(data)
            this.pageSize=data
        },
        // pageIndex改变事件
        handleCurrentChange(data){
            console.log(data)
            this.pageIndex=data
        },
    },
    created(){
    //    console.log(this.status)
    },
    components:{
        checkDetail,
        centerSearch
    }
}
</script>
<style scoped>
    .pageBtn{
        margin: 20px auto 0 25%;
    }
</style>


