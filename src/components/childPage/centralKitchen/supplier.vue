<!-- 供应商 -->
<template>
    <div class="postPre">
        <div class="commonHeader_style">
            <!--新增供应商-->
            <el-button type="primary" icon="el-icon-plus" @click="Add">新增供应商</el-button>
            <!-- 数据 -->
            <div style="margin-top:20px;">
                <table border="0" cellspacing="0" class="table_list">
                    <tr>
                        <th></th>
                        <th>供应商编码</th>
                        <th>供应商名称</th>
                        <th>联系人</th>
                        <th>联系电话</th>
                        <th>结算方式</th>
                        <th>备注</th>
                        <th>操作</th>
                    </tr>
                    <tr v-for="(v,k) in data_list" :key="k">
                        <td>{{k+1}}</td>
                        <td>{{v.s_name}}</td>
                        <td>{{v.brand}}</td>
                        <td>{{v.liani}}</td>
                        <td>{{v.phone}}</td>
                        <td>{{v.moneny}}</td>
                        <td>{{v.beizhu}}</td>
                        <td>
                            <el-button type="primary" size="small" icon="el-icon-edit"  @click="operation(1,k,v)">编辑</el-button>
                            <el-button type="danger" size="small" icon="el-icon-delete" @click="operation(2,k,v)">删除</el-button>
                        </td>
                    </tr>
                    <!-- 无数据显示 -->
                    <tr v-if="data_list.length<=0">
                        <td colspan="8">
                            <p style="color:#999">暂无更多数据</p>
                        </td>
                    </tr>
                </table>
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
                                <div class="font fl">供应商编码</div>
                                <div style="float:left;">
                                    <el-input style="width:300px;margin-bottom:2px;" v-model="supplierCode" size="medium" clearable placeholder="供应商编码"></el-input>
                                    <p>(&nbsp;只能填数字或字母&nbsp;!&nbsp;例如:CK1001,CK1002...&nbsp;)</p>
                                </div>
                                <span style="color:red;padding-top:15px;margin-left:-16px;float:left">*</span>
                            </div>
                            <hr>
                            <!--  -->
                            <div class="box_input" v-bind:class="{isBlur:isBlur}">
                                <div class="font fl">供应商名称</div>
                                <div style="float:left;">
                                    <el-input  style="width:300px;margin-bottom:2px;"  size="medium" v-model="supplierName" placeholder="供应商名称"  @blur="blur">
                                    </el-input >
                                    <p v-if="!isBlur">(此项为必填项&nbsp;,&nbsp;不能填写已有的名称&nbsp;!&nbsp;)</p>
                                    <p v-else style="color:#A94442">必填信息</p>
                                </div>
                                <span style="color:red;padding-top:15px;margin-left:-15px;float:left;">*</span>
                            </div>
                            <hr>
                            <!--  -->
                            <div class="box_input">
                                <div class="font">结算方式</div>
                                <div style="display:flex;flex-direction:column;align-items:flex-start;color:#737373;font-size:12px;">
                                    <el-select style="width:300px;margin-bottom:2px;"  size="medium" v-model="payMethods" placeholder="货到付款" value>
                                        <el-option label="货到付款"  value="1"></el-option>
                                        <el-option label="日结"      value="2"></el-option>
                                        <el-option label="月结"      value="3"></el-option>
                                    </el-select>
                                </div>
                                <span style="color:red;padding-top:15px;">*</span>
                            </div>
                            <hr>
                            <!--  -->
                            <div class="box_input">
                                <div class="font">联系人</div>
                                <el-input  style="width:300px;margin-bottom:2px;"  size="medium" v-model="P_institutions" placeholder="联系人">
                                </el-input >
                            </div>
                            <hr>
                            <!--  -->
                            <div class="box_input">
                                <div class="font">联系电话</div>
                                <el-input  style="width:300px;margin-bottom:2px;"  size="medium" v-model="P_institutions" placeholder="联系电话">
                                </el-input>
                            </div>
                            <hr>
                            <!--  -->
                            <div class="box_input">
                                <div class="font">联系地址</div>
                                <el-input  style="width:300px;margin-bottom:2px;"  size="medium" v-model="P_institutions" placeholder="联系地址">
                                </el-input >
                            </div>
                            <hr>
                            <!--  -->
                            <div class="box_input">
                                <div class="font">备注</div>
                                <div style="width:300px;">
                                    <textarea name="" id="" cols="20" rows="5" maxlength="50" class="form-control" style="width:100%;padding:0;"></textarea>
                                </div>
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
                <span slot="title" style="float:left;font-size:16px;">是否确认删除?</span>
                <div slot="footer" class="dialog-footer;" style='height:30px;'>
                    <el-button @click="centerDialogVisible = false"  class="fr" style="margin-left:20px;">取 消</el-button>
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
                show_center:false,//弹框内层框是否显示
                show_bounced:false,//是否显示新增仓库弹框
                title:'',//弹框标题记录
                centerDialogVisible:false,//点击删除弹出对话框
                isBlur:false,//输入框焦点状态
                index:'',//删除数据下标记录
                supplierCode:'KS01',//供应商编码
                supplierName:'',//供应商名称
                payMethods:'',//结算方式
                data_list:[ //渲染数据
                    {s_name:'CY0004',brand:'蔬菜供应商',liani:'',phone:'',moneny:'月结',beizhu:'',},
                    {s_name:'BY0004',brand:'水果供应商',liani:'',phone:'',moneny:'日结',beizhu:'',},
                    {s_name:'HY0004',brand:'百货供应商',liani:'',phone:'',moneny:'货到付款',beizhu:'',},
                    {s_name:'YY0004',brand:'肉类供应商',liani:'',phone:'',moneny:'日结',beizhu:'',},
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
            // 点击新增供应商
            Add(){
                this.supplierCode='KS01',//供应商编码
                this.supplierName='',//供应商名称
                this.payMethods='',//结算方式
                this.title='新增总部供应商';//点击新增仓库弹框标题
                this.show_bounced=true;
                this.P_institutions='';//去除绑定数据
            },
            //点击编辑删除按钮
            operation(data,k,v){
                //点击编辑按钮
                if(data=='1'){
                    this.show_bounced=true;
                    this.supplierCode=this.data_list[k].s_name,//供应商编码
                    this.supplierName=this.data_list[k].brand,//供应商名称
                    this.payMethods=this.data_list[k].moneny,//结算方式
                    this.title='编辑总部供应商';//点击编辑弹框标题
                }
                //点击删除按钮
                if(data=='2'){
                    this.centerDialogVisible=true;
                    this.index=k;//删除下标记录
                }
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
            //点击删除弹框确定按钮
            sureDel(){
                this.data_list.splice(this.index,1);
                this.$message({
                    duration:1000,
                    type: 'success',
                    message: '删除成功'
                }); 
                this.centerDialogVisible=false;
            },
            //输入框失去焦点事件
            blur(){
                if(this.title=='新增总部供应商'){
                    this.isBlur=true;
                }else{
                    this.isBlur=false;
                }
            }
        },
        created(){
            console.log('供应商')
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
        overflow: hidden;
    }
    .box_input div{
        display: inline-block;
        margin-right:20px;
    }
    .box_input .font{
        width:80px;
        font-size:14px;
        color:#333;
        vertical-align: top;
        padding-top:5px;
        text-align:right;
    }
    .box_input div:last-child{
        margin-right:0;
    }
    .box_input.isBlur .font{
        color:#A94442;
    }
    .form-control{
        color: #555;
        overflow:auto;
        background:transparent;
        border:1px solid #ccc;
        height:50px;
    }
    /* .box_input.isBlur input.el-input__inner{
        border:1px solid #A94442;
    } */
    /* 放到App.vue中添加了 */
</style>