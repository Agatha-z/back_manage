<!--门店采购统计-->
<template>
    <div class="postPre">
        <transition name="animateCheckDetail">
<!--=============================================================================================主页面-->
            <div v-if="show" key="main">
                <div class="commonHeader_style">
                    <span style="font-size:18px;font-weight:600;">门店采购统计</span>
                </div>
                <div class="commonHeader_style">
                    <!--头部搜索-->
                    <div style="display:flex;">
                        <div class="item" style="margin-right:60px;">
                            <span style="font-size:18px;font-weight:600;float:left;">订货门店</span>
                            <div style="float:left;line-height:20px;">
                                <storeSelect :storeSelectData="storeSelectData" :inputWidth="290" :placeholder="['请选择门店','已选择门店点击下拉按钮查看']" @selectChange="storeSelectChange"></storeSelect> 
                            </div>
                            <span style="font-size:18px;font-weight:600;float:left;">订货日期</span>
                            <el-date-picker
                                style="margin-right:20px;width:180px;"
                                v-model="value1"
                                type="date"
                                placeholder="选择日期">
                                </el-date-picker>
                                <!--  -->
                                <el-date-picker
                                v-model="value2"
                                type="date"
                                style="width:180px;"
                                placeholder="选择日期">
                            </el-date-picker>
                        </div>
                    </div>
                    <div style="display:flex;margin-top:20px;">
                        <div class="item" style="margin-right:60px;">
                            <span style="font-size:18px;font-weight:600;float:left;">物品类别</span>
                            <div class="fl" style="line-height:20px;">
                                <storeSelect :storeSelectData="cateogorySelectData" :inputWidth="290" :placeholder="['请选择物品类别','已选择物品类别点击下拉按钮查看']" @selectChange="cateogorySelectChange"></storeSelect> 
                            </div>
                            <span style="font-size:18px;font-weight:600;float:left;">物品名称</span>
                            <el-input style="width:210px;float:left;" size="medium" clearable placeholder="根据编码.名称检索物品..."></el-input>
                            <el-button type="primary" size="small" icon="el-icon-search" @click="seachAndClear(1)" style="margin-left:10px;">搜索</el-button>
                            <el-button type="info"  size="small" icon="el-icon-refresh" @click="seachAndClear(2)">重置</el-button>
                        </div>
                    </div>
                    <!--导出打印-->
                    <div style="margin-top:40px;" class="purchaseTable">
                        <div class="exportTableLeft fl">
                            <el-button type="primary"  @click="exportExcel">采购统计表导出<i class="el-icon-printer el-icon--right"></i></el-button>
                            <el-button type="primary" >打印<i class="el-icon-printer el-icon--right"></i></el-button>
                        </div>
                        <div style="float:right;">
                            <el-button type="primary"  @click="exportExcel" >门店分货单导出<i class="el-icon-printer el-icon--right"></i></el-button>
                        </div>
                        <div style="clear:both;"></div>
                    </div>
                    <!--数据 -->
                    <div style="margin-top:20px;">
                        <table class="table_list" border="0" cellspacing="0">
                            <tr>
                                <th></th>
                                <th>物品类型</th>
                                <th>物品名称</th>
                                <th>门店订货数量</th>
                                <th>当前库存总量</th>
                                <th>已配送总量</th>
                                <th>总部最低采购量</th>
                                <th>订货单位</th>
                                <th>操作</th>
                            </tr>
                            <tr v-for="(v,k) in data_list" :key="k">
                                <td v-if="k<data_list.length-1">{{k+1}}</td>
                                <td v-else></td>
                                <td>{{v.name}}</td>
                                <td>{{v.associated}}</td>
                                <td>{{v.user}}</td>
                                <td>{{v.timer}}</td>
                                <td>{{v.sel}}</td>
                                <td>{{v.user1}}</td>
                                <td>{{v.time1}}</td>
                                <td>
                                    <el-button type="primary" size="small" icon="el-icon-search"  @click="operation(k,v)">查看</el-button>
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
            </div>
 <!--=============================================================================================详情页-->
            <div v-else  key="detail">
                <div class="page-body">
                    <div class="form-group">
                        <div class="group groupLeft">
                            <label>订货日期</label>
                            <span>2018-12-21 至  2018-12-22</span>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="group groupLeft">
                            <label>物品类型</label>
                            <span>印字低值易耗品</span>
                        </div>
                        <div class="group groupRight"> 
                            <label>物品名称</label>
                            <span>米线打包袋小</span>
                        </div>
                    </div>
                    <!--数据-->
                    <div>
                        <table class="table_list" border="0" cellspacing="0">
                            <tr>
                                <th></th>
                                <th>订货门店</th>
                                <th>单据号</th>
                                <th>订单数量</th>
                                <th>发货数量</th>
                                <th>实收数量</th>
                                <th>订货单位</th>
                                <th>订货日期</th>
                                <th>状态</th>
                            </tr>
                            <tr>
                                <td></td>
                                <td>合计</td>
                                <td></td>
                                <td>1.00</td>
                                <td>1.00</td>
                                <td>0.00</td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </table>
                        <!--打印与取消-->
                        <div style="margin-top:20px">
                            <el-button type="primary">打印</el-button>
                            <el-button type="info" @click="cancel">取消</el-button>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        data(){
           return{
                value1:'',
                value2:'',
                pageIndex: 1, //当前页数
                pageSize: 10, //每页显示条数
                show:true,
                storeSelectData: [
                    //组件传值选择门店
                    {
                    name: "合肥市安业餐饮管理有限公司",
                    id: "1",
                    children: [
                        { name: "安少爷米线(滨湖世纪金源店)(加盟店)", id: "1-1" },
                        { name: "安少爷米线(滨湖世纪金源店)(加盟店)", id: "1-2" },
                        { name: "安少爷米线(滨湖世纪金源店)(加盟店)", id: "1-3" },
                        { name: "安少爷米线(滨湖世纪金源店)(加盟店)", id: "1-4" },
                        { name: "安少爷米线(滨湖世纪金源店)(加盟店)", id: "1-5" },
                        { name: "安少爷米线(滨湖世纪金源店)(加盟店)", id: "1-6" },
                        { name: "安少爷米线(滨湖世纪金源店)(加盟店)", id: "1-7" }
                    ]
                    }
                ],
                cateogorySelectData:[
                    //组件传值物品类别
                    {
                    name: "所有物品分类",
                    id: "1",
                    children: [
                        { name: "开业用品", id: "1-1" },
                        { name: "常用物品", id: "1-2" },
                        { name: "冷冻产成品", id: "1-3" },
                        { name: "印字低值易耗品", id: "1-4" },
                        { name: "产成品", id: "1-5" },
                        { name: "低值易耗品", id: "1-6" },
                        { name: "门店原材料", id: "1-7" }
                    ]
                    }
                ],
                data_list:[//数据渲染
                    {name:'印字低值易耗品',associated:'环保餐包',user:'2.00',timer:'18.00',sel:'1.00',user1:'0.00',time1:'箱'},
                    {name:'印字低值易耗品',associated:'环保餐包',user:'2.00',timer:'18.00',sel:'1.00',user1:'0.00',time1:'箱'},
                    {name:'印字低值易耗品',associated:'环保餐包',user:'2.00',timer:'18.00',sel:'1.00',user1:'0.00',time1:'箱'},
                    {name:'印字低值易耗品',associated:'环保餐包',user:'2.00',timer:'18.00',sel:'1.00',user1:'0.00',time1:'箱'},
                    {name:'印字低值易耗品',associated:'环保餐包',user:'2.00',timer:'18.00',sel:'1.00',user1:'0.00',time1:'箱'},
                    {name:'印字低值易耗品',associated:'环保餐包',user:'2.00',timer:'18.00',sel:'1.00',user1:'0.00',time1:'箱'},
                    {name:'印字低值易耗品',associated:'环保餐包',user:'2.00',timer:'18.00',sel:'1.00',user1:'0.00',time1:'箱'},
                    {name:'印字低值易耗品',associated:'环保餐包',user:'2.00',timer:'18.00',sel:'1.00',user1:'0.00',time1:'箱'},
                    {name:'印字低值易耗品',associated:'环保餐包',user:'2.00',timer:'18.00',sel:'1.00',user1:'0.00',time1:'箱'},
                    {name:'合计',associated:'',user:'122.00',timer:'4318.00',sel:'97.00',user1:'',time1:''},
                ]
           }
        },
        methods:{
            // pageSize 改变时会触发
            handleSizeChange(data) {
            console.log(data);
            this.pageSize = data;
            },
            // pageIndex改变事件
            handleCurrentChange(data) {
            console.log(data);
            this.pageIndex = data;
            },
            // 订货门店下拉菜单选中事件
            storeSelectChange(){
            console.log(e)
            },
            //选择物品下拉菜单事件
            cateogorySelectChange(){
                console.log(e)
            },
            //点击查看
            operation(){
                this.show=false;
            },
            //点击取消
            cancel(){
                this.show=true;
            },
            // 批量导出数据
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            },
            exportExcel(){//点击导出按钮
                this.$confirm('此操作将导出全部采购数据，是否继续?','提示',{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'info'
                }).then(()=>{
                    //excel数据导出
                    require.ensure([], () => {
                        const {
                            export_json_to_excel
                        } = require('../../../vendor/Export2Excel');
                        const tHeader = ['物品类型','物品名称','门店订货数量','当前库存总量','已配送总量','总部最低采购量','订货单位',];
                        const filterVal = ['name', 'associated', 'user', 'timer', 'sel', 'user1', 'time1', ];
                        const list = this.data_list;
                        const data = this.formatJson(filterVal, list);
                        export_json_to_excel(tHeader, data, '列表excel');
                    })
                    this.$message({
                        type: 'success',
                        message: '已添加到下载队列'
                    });
                }).catch(()=>{
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });      
                })
            },
        },
        created(){
            console.log('门店直配')
        }
    }
</script>

<style scoped>
/*主页面*/
    .postPre{
        padding:10px;
    }
    .item {
        height:50px;
        line-height:50px;
        display: flex;
        align-items: center;
    }
    .item span {
        display: inline-block;
        width: 100px;
        text-align: right;
        margin-right: 20px;
    }
    .pageBtn {
        margin: 20px auto 0 25%;
    }
/* 查看详情页 */
.page-body{
    background: #ffffff;
    padding:20px 10px;
}
.page-body .form-group{
    display:flex;
    font-size:16px;
    margin-bottom:20px;
}
.form-group .group{
    display:flex;
}
.form-group .groupLeft{
    width:30%;
}
.form-group .groupRight{
    width:20%;
}
.form-group .group label{
   width:30%;
   text-align:right;
   margin-right:20px;
}
</style>