<!-- 仓库管理 -->
<template>
    <div class="postPre">
        <div class="commonHeader_style">
            <!--头部搜索-->
            <div class="head" style="padding-left:40px;">
                <span style="font-size:18px;font-weight:600;margin-right:20px;">仓库信息</span>
                <el-input style="margin-right:20px;width:300px;" size="medium" clearable placeholder="根据名称检索"></el-input>
                <!--  -->
                <el-button type="primary" size="medium" icon="el-icon-search" @click="seachAndClear(1)">搜索</el-button>
                <el-button type="info"  size="medium" icon="el-icon-refresh" @click="seachAndClear(2)">重置</el-button>
            </div>
            <!--主体-->
            <div style="margin-top:20px;">
                <!--新增仓库-->
                <el-button type="primary" icon="el-icon-plus" @click="Add">新增仓库</el-button>
                <!-- 数据 -->
                <div style="margin-top:20px;">
                    <table border="0" cellspacing="0" class="table_list">
                        <tr>
                            <th></th>
                            <th>仓库编码</th>
                            <th>仓库名称</th>
                            <th>创建时间</th>
                            <th>操作</th>
                        </tr>
                        <tr v-for="(v,k) in data_list" :key="k">
                            <td>{{k+1}}</td>
                            <td>{{v.s_name}}</td>
                            <td>{{v.brand}}</td>
                            <td>{{v.attribute}}</td>
                            <td>
                                <el-button type="primary" size="small" icon="el-icon-edit"  @click="operation(1,k,v)">编辑</el-button>
                                <el-button type="danger" size="small" icon="el-icon-delete" @click="operation(2,k,v)">删除</el-button>
                            </td>
                        </tr>
                        <!-- 无数据显示 -->
                        <tr v-if="data_list.length<=0">
                            <td colspan="5">
                                <p style="color:#999">暂无更多数据</p>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            <!-- 弹框 -->
            <div class="bounced_box"  v-if="show_bounced" @click="quiet_box">
                <transition name="animate_box">
                    <div class="center_box" v-if="show_center" @click.stop>
                        <!-- 定位 -->
                        <div class="position_clear" @click="quiet_box">
                            <i class="el-icon-circle-close"></i>
                        </div>
                        <!-- 头部 -->
                        <div class="title">{{title}}</div>
                        <!-- 内容部分 -->
                        <div class="content_scroll">
                            <br>
                            <div class="box_input">
                                <div class="font">仓&nbsp;&nbsp;库&nbsp;&nbsp;编&nbsp;&nbsp;码&nbsp;</div>
                                <div style="display:flex;flex-direction:column;align-items:flex-start;color:#737373;font-size:14px;width:300px;">
                                    <el-input style="width:300px;margin-bottom:10px;" v-model="P_name" size="medium" clearable placeholder="填写仓库编码"></el-input>
                                    (只能填数字或字母&nbsp;!&nbsp;例如:CK1001,CK1002...)
                                </div>
                                <span style="color:red;padding-top:10px;font-size:14px;">*</span>
                            </div>
                            <hr>
                            <!--  -->
                            <div class="box_input" v-bind:class="{isBlur:isBlur}">
                                <div class="font">仓&nbsp;&nbsp;库&nbsp;&nbsp;名&nbsp;&nbsp;称&nbsp;</div>
                                <div style="display:flex;flex-direction:column;align-items:flex-start;color:#737373;font-size:14px;width:300px;">
                                    <el-input style="width:300px;margin-bottom:10px;"  size="medium" v-model="P_institutions" placeholder="填写仓库名称" @input="desInput" @blur="blur">
                                    </el-input>
                                    <span v-if="!isBlur">(此项为必填项&nbsp;,&nbsp;不能填写已有的名称&nbsp;!&nbsp;)</span>
                                    <span v-else style="color:#A94442">必填信息</span>
                                </div>
                                <span style="color:red;padding-top:10px;font-size:14px;">*</span>
                            </div>
                        </div>
                        <!-- 底部内容 -->
                        <div class="footer_btn">
                            <el-button type="info"    size="medium"  @click="quiet_box">取消</el-button>
                            <el-button type="success" size="medium"  @click="confirmOk">确认</el-button>
                        </div>
                    </div>
                </transition>
            </div>
            <!--点击删除对话框-->
            <el-dialog
                :visible.sync="centerDialogVisible"
                width="30%"
                center>
                <span slot="title" style="float:left;font-size:16px;">{{delTitle}}</span>
                <div slot="footer" class="dialog-footer;" style='height:30px;'>
                    <el-button @click="centerDialogVisible = false" v-show="hasCancel" class="fr" style="margin-left:20px;">取 消</el-button>
                    <el-button type="primary" @click="sureDel" class="fr">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                P_name:'CK02',//仓库编码
                P_institutions:'百货用品仓',//仓库名称
                show_center:false,//弹框内层框是否显示
                show_bounced:false,//是否显示新增仓库弹框
                centerDialogVisible:false,//点击删除弹框
                title:'',//弹框标题记录
                delTitle:'是否确认删除?',//删除框标题
                hasCancel:true,//取消按钮显示状态
                isBlur:false,//输入框焦点状态
                data_list:[ //渲染数据
                    {s_name:'CK02',brand:'百货用品仓',attribute:'2018-04-30 17:00:28',},
                    {s_name:'CCPC',brand:'产成品仓',attribute:'2018-04-30 17:00:28',},
                    {s_name:'C67D',brand:'原材料仓',attribute:'2018-04-30 17:00:28',},
                    {s_name:'CD98',brand:'牛胜利',attribute:'2018-04-30 17:00:28',},
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
            },
        },
        methods: {
            //点击新增仓库
            Add(){
                this.title='新增总部仓库';//点击新增仓库弹框标题
                this.show_bounced=true;
                this.P_institutions='';//去除绑定数据
            },
            //弹框确定事件
            confirmOk(){
                console.log(23232323)
            },
            // 弹框 关闭事件{
            quiet_box(){
                this.show_center=false;
                this.isBlur=false;
                this.$message({
                    duration:1000,
                    type: 'info',
                    message: '已取消'
                }); 
            },
            //点击表格中的编辑或者删除
            operation(data,k,v){
                //点击编辑按钮
                if(data=='1'){
                    this.show_bounced=true;
                    this.title='编辑总部仓库';//点击编辑弹框标题
                    this.P_name=this.data_list[k].s_name;//获取当前仓库编码
                    this.P_institutions=this.data_list[k].brand;//获取当前仓库名称
                }
                //点击删除按钮
                if(data=='2'){
                    this.delTitle='是否确认删除?';
                    this.hasCancel=true;
                    this.centerDialogVisible=true;
                }
            },
            //删除弹出框点击确认按钮
            sureDel(){
                if(this.hasCancel){
                    this.centerDialogVisible=false;
                    setTimeout(()=>{
                        this.delTitle='已使用，不允许删除';
                        this.hasCancel=false;
                    },300)
                    setTimeout(()=>{
                        this.centerDialogVisible=true;
                    },500)
                }else{
                    this.centerDialogVisible=false;
                }
            },
            //点击新增仓库仓库名称输入内容事件
            desInput(){
                console.log(this.P_institutions)
            },
            //输入框失去焦点事件
            blur(){
                if( this.title=='新增门店仓库'){//只有在新增仓库的前提下失去焦点事件才出发
                    this.isBlur=true;
                }
            }
        },
        created(){
            console.log('仓库管理')
        }
    }
</script>

<style scoped>
    .postPre{
        padding:10px;
    }
    .box_input{
        display:flex;
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
    .box_input.isBlur .font{
        color:#A94442;
    }
    hr{
        width:90%;
        margin:8px auto;
        border: 0;
        height: 1px;
        background:#eee;;
    }
    /* .box_input.isBlur input.el-input__inner{
        border:1px solid #A94442;
    } */
    /* 放到App.vue中添加了 */
</style>