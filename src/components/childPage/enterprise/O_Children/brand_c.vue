<template>
    <div>
        <div>
            <el-button type="primary" icon="el-icon-plus" @click="show_bounced=true">新增品牌</el-button>
        </div>
        <br>
        <!-- 数据 -->
        <div>
            <table class="table_list" border="0" cellspacing="0">
                <tr>
                    <th></th>
                    <th>品牌名称</th>
                    <th>业态</th>
                    <th>操作人</th>
                    <th>创建时间时间</th>
                    <th>操作</th>
                </tr>
                <tr v-for="(v,k) in data_list" :key="k">
                    <td>{{k+1}}</td>
                    <td>{{v.brand}}</td>
                    <td>{{v.formats}}</td>
                    <td>{{v.name}}</td>
                    <td>{{v.time}}</td>
                    <td>
                        <el-button type="primary" size="small" icon="el-icon-edit"  @click="operation(1,k)">编辑</el-button>
                        <el-button type="danger" size="small" icon="el-icon-delete" @click="operation(2,k)">删除</el-button>
                    </td>
                </tr>
                <!-- 无数据显示 -->
                <tr v-if="data_list.length<=0">
                    <td colspan="6">
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
        <!-- 弹框 -->
        <div class="bounced_box"  v-if="show_bounced" @click="quiet_box">
            <transition name="animate_box">
                <div class="center_box" v-if="show_center" @click.stop>
                     <!-- 定位 X -->
                    <div class="position_clear" @click="quiet_box">
                        <i class="el-icon-circle-close"></i>
                    </div>
                    <!-- 头部 -->
                    <div class="title">新增品牌</div>
                    <!-- 内容部分 -->
                    <div class="content_scroll">
                        <br>
                        <div class="box_input">
                            <div class="font">品&nbsp;&nbsp;牌&nbsp;&nbsp;名&nbsp;&nbsp;称&nbsp;</div>
                            <div>
                                <el-input style="width:300px" v-model="P_name" size="medium" clearable placeholder="请输入品牌名称"></el-input>
                            </div>
                            <div class="font" style="color:red">*</div>
                        </div>
                        <hr>
                        <!--  -->
                        <div class="box_input">
                            <div class="font">所&nbsp;&nbsp;属&nbsp;&nbsp;业&nbsp;&nbsp;态&nbsp;</div>
                            <div>
                                <el-select style="width:300px"  size="medium" v-model="P_institutions" placeholder="请选择">
                                    <el-option label="快餐" :value="1"></el-option>
                                    <el-option label="小吃" :value="2"></el-option>
                                    <el-option label="外卖" :value="3"></el-option>
                                </el-select>
                            </div>
                            <div class="font" style="color:red">*</div>
                        </div>
                    </div>
                    <!-- 底部内容 -->
                    <div class="footer_btn">
                        <el-button type="info" size="medium"  @click="quiet_box">取消</el-button>
                        <el-button type="success" size="medium" @click="confirmOk">确认</el-button>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                P_name:'',//品牌名称
                P_institutions:'',//所属业态
                show_center:false,//弹框内层框是否显示
                show_bounced:false,//是否显示增加岗位弹框
                pageIndex:1,//当前页数
                pageSize:10,//每页显示条数
                data_list:[ //渲染数据
                    {brand:'安少爷米线',formats:'快餐',name:'谢黛玛',time:'2018-10-11 20:55:34'},
                    {brand:'安少爷米线',formats:'快餐',name:'谢黛玛',time:'2018-10-11 20:55:34'},
                    {brand:'安少爷米线',formats:'快餐',name:'谢黛玛',time:'2018-10-11 20:55:34'},
                    {brand:'安少爷米线',formats:'快餐',name:'谢黛玛',time:'2018-10-11 20:55:34'},
                    {brand:'安少爷米线',formats:'快餐',name:'谢黛玛',time:'2018-10-11 20:55:34'},
                    {brand:'安少爷米线',formats:'快餐',name:'谢黛玛',time:'2018-10-11 20:55:34'},
                    {brand:'安少爷米线',formats:'快餐',name:'谢黛玛',time:'2018-10-11 20:55:34'},
                    {brand:'安少爷米线',formats:'快餐',name:'谢黛玛',time:'2018-10-11 20:55:34'},
                    {brand:'安少爷米线',formats:'快餐',name:'谢黛玛',time:'2018-10-11 20:55:34'},
                    {brand:'安少爷米线',formats:'快餐',name:'谢黛玛',time:'2018-10-11 20:55:34'},
                ],
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
            }
        },
        methods:{
            //弹框确定事件
            confirmOk(){
                console.log(23232323)
            },
            // 弹框 关闭事件{
            quiet_box(){
                this.show_center=false;
                this.$message({
                    duration:1000,
                    type: 'info',
                    message: '已取消'
                }); 
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
            // 操作按钮 启用/停用/删除
            operation(e,k,data){
                if(e==1){
                    // 编辑
                    this.show_bounced=true
                }else if(e==2){
                    // 删除
                    this.$confirm('此操作将删除该岗位, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        // 删除该条数据
                        this.data_list.splice(k,1);
                        this.$message({
                            duration:1000,
                            type: 'success',
                            message: '删除成功!'
                        });
                    }).catch(() => {
                        this.$message({
                            duration:1000,
                            type: 'info',
                            message: '已取消'
                        });          
                    });
                }
            },
        }
    }
</script>

<style scoped>
    .pageBtn{
        margin: 20px auto 0 auto;
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
    }
    .box_input{
        width:500px;
        margin: auto;
        padding:15px 0;
    }
    .box_input div{
        display: inline-block;
        margin-right:20px;
    }
    .box_input .font{
        font-size:18px;
        font-weight: 600;
        color:#333;
        vertical-align: top;
        padding-top:5px;
    }
    .box_input div:last-child{
        margin-right:0;
    }
    hr{
        width:90%;
        margin:8px auto;
        border: 0;
        height: 1px;
        background:#eee;;
    }
</style>