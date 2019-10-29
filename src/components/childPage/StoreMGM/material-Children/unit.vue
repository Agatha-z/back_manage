<!-- 原材料管理/单位管理-->
<template>
    <div class="postPre">
        <div class="commonHeader_style">
            <!--头部搜索 -->
            <div class="searchTop">
                <label>物品信息</label>
                <el-input style="width:337.34px;" size="medium" clearable placeholder="根据编码或名称检索..."></el-input>
                <el-button type="primary" size="small" icon="el-icon-search" @click="seachAndClear(1)" style="margin-left:10px;">搜索</el-button>
                <el-button type="info"  size="small" icon="el-icon-refresh" @click="seachAndClear(2)">重置</el-button>
            </div>
            <!--nav-->
            <div>
                <el-button type="primary"  style="margin-top:20px;" @click="show_uint=true">新增单位<i class="el-icon-plus el-icon-plus-right"></i></el-button>
                <el-button type="success"  style="margin-top:20px;" @click="defaultDialogVisible =true">获取默认单位<i class="el-icon-plus el-icon-plus-right"></i></el-button>
            </div>
            <!--数据-->
            <div style="margin-top:20px;">
                <table border="0" cellspacing="0" class="table_list">
                    <tr>
                        <th></th>
                        <th>单位编码</th>
                        <th>单位名称</th>
                        <th>创建时间</th>
                        <th>操作</th>
                    </tr>
                    <tr v-for="(v,k) in data_list" :key="k">
                        <td>{{k+1}}</td>
                        <td>{{v.s_name}}</td>
                        <td>{{v.brand}}</td>
                        <td>{{v.time}}</td>
                        <td>
                            <el-button type="primary" size="small" icon="el-icon-edit"  @click="operation(1,k,v)">编辑</el-button>
                            <el-button type="danger" size="small" icon="el-icon-delete" @click="operation(2,k,v)">删除</el-button>
                        </td>
                    </tr>
                </table>
            </div>
            <!-- 弹框 -->
            <ModalDialog  :model="show_uint" title="单位" @cancel="show_uint = false">
                <div class="uint_pop_up">
                    <div class="uint_code" style="border-bottom:1px solid #eee;">
                        <label>单位编码</label>
                        <div class="code_input">
                            <input type="text" value="DW39" id="code">
                            <p>(只能填数字或字母，例如A1001.A1002...)</p>
                        </div>
                        <span class="after"></span>
                    </div>
                    <div class="uint_code">
                        <label>单位名称</label>
                        <div class="code_input">
                            <input type="text" id="name">
                            <p>(此项为必填项，不能填写已有的名称)</p>
                        </div>
                        <span class="after"></span>
                    </div>
                </div>
            </ModalDialog>
            <!-- 编辑弹框 -->
            <ModalDialog  :model="show_editor" title="单位" @cancel="show_editor = false">
                    
            </ModalDialog>
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
            <!-- 获取默认单位 -->
            <el-dialog
                :visible.sync="defaultDialogVisible"
                width="30%"
                center>
                <span slot="title" style="display:flex;font-size:16px;">是否确定初始化系统默认单位？</span>
                <span slot="footer" class="dialog-footer;" style="display:flex; justify-content: flex-end;">
                    <el-button @click="defaultDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="surebtn">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                show_uint:false, //新增单位
                show_editor:false, //编辑
                data_list:[ //表格渲染数据
                    {s_name:'WP189',brand:'杯',time:'2017-2-13 00:23:57'},
                    {s_name:'WP187',brand:'个',time:'2018-1-13 00:23:57'},
                    {s_name:'WP186',brand:'捆',time:'2018-6-13 00:23:57'},
                    {s_name:'WP185',brand:'瓶',time:'2018-8-13 00:23:57'},
                ],
                centerDialogVisible:false,//点击删除弹框
                defaultDialogVisible:false, //获取默认单位
            }
        },
        methods:{
            // 新增单位弹框确认事件
            uintPop(){
                var code = $('#code').val(); //单位编码输入框值
                var name = $('#name').val(); //单位名称输入框值
                console.log($('#code').val(),$('#name').val())
                if(code && name){
                    this.show_uint = false;
                }
            },
            //点击表格中的编辑或者删除
            operation(data,k,v){
                //点击编辑按钮
                if(data=='1'){
                    this.show_editor=true;//启用状态栏显示
                    this.title='编辑物品';//点击编辑弹框标题
                    this.show_bounced=true;
                    // this.name_goodsCode=//物品编码
                    // this.name_goods=//物品名称
                    // this.category_Select=//类别名称
                }
                //点击删除按钮
                if(data=='2'){
                    this.centerDialogVisible=true;
                }
            },
            //删除弹出框点击确认按钮
            sureDel(){
                this.centerDialogVisible=false;
            },
            // 默认单位弹出框点击确认按钮
            surebtn(){
                this.defaultDialogVisible=false;
            }
        },
        created(){
            console.log('原材料管理')
        }
    }
</script>

<style scoped>
    .postPre{
        padding:10px;
    }
    .searchTop{
        display:flex;
        align-items:center;
        padding-left:100px;
    }
    .searchTop label{
        font-size:18px;
        font-weight:600;
        margin-right:30px;
    }
    .uint_pop_up{
        width: 90%;
        height: 100%;
        margin: 0 auto;
        font-size: 18px;
    }
    .uint_code{
        width: 100%;
        padding: 9% 0;
        position: relative;
    }
    .uint_code label{
        width: 25%;
        margin-bottom: 23px;
        text-align: right;
        position: absolute;
        top: 43%;
        left: 0;
    }

    .code_input{
        display: inline-block;
        /* position: absolute;
        top: 36%;
        left: 35%; */
        padding: 0 0 0 28%;
        width: 39%;
    }

    .code_input input{
        width: 90%;
        height: 20px;
        padding: 5px 10px;
    }

    .code_input p{
        margin: 4px 0;
    }

    .after{
        color: #d16e6c;
        position: absolute;
        top: 40%;
        margin-left: 1%;
    }

    .after::after{
        content: '*'
    }
</style>