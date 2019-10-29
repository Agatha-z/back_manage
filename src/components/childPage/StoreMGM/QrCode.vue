<!-- 库存数据下发 -->
<template>
    <div class="postPre">
        <div class="commonHeader_style">
            <!--新增供应商-->
            <el-button type="primary" icon="el-icon-upload" style="margin-bottom:20px;">批量下发</el-button>
            <!-- 数据 -->
            <div>
                <table class="table_list" border="0" cellspacing="0">
                    <tr>
                        <th></th>
                        <th>门店名称 </th>
                        <th>上次下发时间 </th>
                        <th>最新下发时间	</th>
                        <th>状态	</th>
                        <th>操作</th>
                    </tr>
                    <tr v-for="(v,k) in data_list" :key="k">
                        <td>{{k+1}}</td>
                        <td>{{v.s_name}}</td>
                        <td>{{v.brand}}</td>
                        <td>{{v.liani}}</td>
                        <td>{{v.phone}}</td>
                        <td>
                            <el-button type="primary" size="small" icon="el-icon-download"  @click="operation(v,k,1)">重新下发</el-button>
                            <el-button type="primary" size="small" icon="el-icon-search"  @click="operation(v,k,2)">查看</el-button>
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
            <div class="pagingBTN">
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
            <!--点击查看/弹框数据-->
            <div class="bounced_box" v-if="show_bounced" @click="quiet_box">
                <transition name="animate_box">
                    <div class="center_box" v-if="show_center" @click.stop>
                        <!-- 定位 -->
                        <div class="position_clear" @click="quiet_box">
                            <i class="el-icon-circle-close"></i>
                        </div>
                        <!-- 头部 -->
                        <div class="title">下发记录</div>
                        <!-- 弹框数据内容 -->
                        <div class="content_scroll">
                            <table class="table_list" border="0" cellspacing="0">
                                <tr>
                                    <th></th>
                                    <th>下发时间</th>
                                    <th>状态</th>
                                </tr>
                                <tr v-for="(v,k) in check_list" :key="k">
                                    <td>{{k+1}}</td>
                                    <td>{{v.s_name}}</td>
                                    <td>{{v.brand}}</td>
                                </tr>
                                <!-- 无数据显示 -->
                                <tr v-if="data_list.length<=0">
                                    <td colspan="12">
                                        <p style="color:#999">暂无更多数据</p>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <!-- 底部内容 -->
                        <div class="footer_btn">
                            <!-- 分页 -->
                            <div class="footPage">
                                <el-pagination
                                :background="true"
                                @size-change="handleSizeChange1"
                                @current-change="handleCurrentChange1"
                                :current-page="pageIndex1"
                                :page-sizes="[10, 20, 30, 40, 50]"
                                :page-size="pageSize1"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="9990"
                                >
                                </el-pagination>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{		
                show_bounced:false,//查看弹框	
                show_center:true,//弹框内层
                pageIndex:1,//当前页数
                pageSize1:10,
                pageSize:10,//每页显示条数
                pageIndex1:1,
                data_list:[ //渲染数据
                    {s_name:'安少爷米线（尚泽大都会店）',brand:'2019-01-02 18:59:42',liani:'2019-01-04 17:34:07',phone:'下发成功'},
                    {s_name:'安少爷米线（尚泽大都会店）',brand:'2019-01-02 18:59:42',liani:'2019-01-04 17:34:07',phone:'下发成功'},
                    {s_name:'安少爷米线（尚泽大都会店）',brand:'2019-01-02 18:59:42',liani:'2019-01-04 17:34:07',phone:'下发成功'},
                    {s_name:'安少爷米线（尚泽大都会店）',brand:'2019-01-02 18:59:42',liani:'2019-01-04 17:34:07',phone:'下发成功'},
                ],
                check_list:[//查看弹框数据
                    {s_name:'2019-01-04 17:34:07',brand:'成功'},
                    {s_name:'2019-01-04 17:34:07',brand:'成功'},
                    {s_name:'2019-01-04 17:34:07',brand:'成功'},
                    {s_name:'2019-01-04 17:34:07',brand:'成功'},
                    {s_name:'2019-01-04 17:34:07',brand:'成功'},
                    {s_name:'2019-01-04 17:34:07',brand:'成功'},
                    {s_name:'2019-01-04 17:34:07',brand:'成功'},
                    {s_name:'2019-01-04 17:34:07',brand:'成功'},
                    {s_name:'2019-01-04 17:34:07',brand:'成功'},
                    {s_name:'2019-01-04 17:34:07',brand:'成功'},
                    {s_name:'2019-01-04 17:34:07',brand:'成功'},
                    {s_name:'2019-01-04 17:34:07',brand:'成功'},
                    {s_name:'2019-01-04 17:34:07',brand:'成功'},
                    {s_name:'2019-01-04 17:34:07',brand:'成功'},
                    {s_name:'2019-01-04 17:34:07',brand:'成功'},
                ]
            }
        },
        watch:{
            // 监听动画 
            show_bounced(){
                if(this.show_bounced){
                    setTimeout(()=>{
                        this.show_center=true
                    },0)
                }
            },
            show_center(){
                if(!this.show_center){
                    setTimeout(()=>{
                        this.show_bounced=false
                    },200)
                }
            },
        },
        methods:{
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
            // 弹框
            handleSizeChange1(data){
                this.pageSize1=data
            },
            // 弹框
            handleCurrentChange1(data){
                console.log(data)
                this.pageIndex1=data
            },
            // 点击重新下发/查看
            operation(v,k,data){
                if(data=='1'){
                    // 点击重新下发
                    console.log('你点击了重新下发');
                }else{
                    // 点击查看
                    this.show_bounced=true;
                }
            },
            //点击弹框叉号-关闭弹框事件
            quiet_box(){
                this.show_center=false;
                this.$message({
                    duration:1000,
                    type: 'info',
                    message: '已取消'
                }); 
            }
        },
        created(){
            console.log('门店二维码')
        }
    }
</script>

<style scoped>
    .postPre{
        padding:10px;
    }
    table th{
        background:#fff;
    }
    /* 分页样式 */
    .pagingBTN{
        margin: 20px auto 0 25%;
    }
    /* 查看详情内容底部分页样式*/
    .footPage{
        padding:0 40px;
        padding-top:10px;
    }
</style>