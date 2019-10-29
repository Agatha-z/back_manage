<!-- 做法管理 -->
<template>
    <div>
        <!-- 此处驱动视图更新 -->
        <div v-show="false">{{indexS}}</div>
        <div>
            <span style="font-size:18px;font-weight:600;">规格名称</span>&nbsp;&nbsp;&nbsp;
            <el-input style="width:250px" v-model="area_name" size="medium" clearable placeholder="请输入规格名称"></el-input>
            <!--  -->
            &nbsp;&nbsp;&nbsp;
            <el-button type="primary" size="medium" icon="el-icon-search" @click="seachAndClear(1)">搜索</el-button>
            <el-button type="info"  size="medium" icon="el-icon-refresh" @click="seachAndClear(2)">重置</el-button>
        </div>
        <br>
        <br>
        <div>
            <span style="font-size:18px;font-weight:600;">做法分类</span>&nbsp;&nbsp;&nbsp;
            <el-radio-group v-model="radio4" size="medium" @change="practiceChange(radio4)">
                <el-radio-button :label="v.value" v-for="(v,k) in practice" :key="k">{{v.txt+'（'+v.num+'）'}}</el-radio-button>
            </el-radio-group>
        </div>
        <br>
        <br>
        <div>
            <!-- show_bounced=true -->
            <el-button type="primary" icon="el-icon-plus" @click="addCommon({index:1,title:'新增分类'})">新增分类</el-button>
            <el-button type="primary" icon="el-icon-plus" @click="addCommon({index:2,title:'新增做法'})">新增做法</el-button>
            <el-button type="primary" icon="el-icon-plus" @click="addCommon({index:3,title:'编辑分类'})">编辑分类</el-button>
            <el-button type="primary" icon="el-icon-plus" @click="addCommon({index:4,title:'分类关联菜品'})">分类关联菜品</el-button>
        </div>
        <br>
        <!-- 数据 -->
        <div>
            <table class="table_list" border="0" cellspacing="0">
                <tr>
                    <th></th>
                    <th>做法名称</th>
                    <th>做法分类</th>
                    <th>默认加价方式</th>
                    <th>默认加价金额/加价比例</th>
                    <th>关联菜品数量</th>
                    <th>操作</th>
                </tr>
                <tr v-for="(v,k) in data_list" :key="k">
                    <td>{{k+1}}</td>
                    <td>{{v.name}}</td>
                    <td>
                        <span v-if="v.class==1">辣度</span>
                        <span v-else>冰度</span>
                    </td>
                    <td>
                        <span v-if="v.markup==1">加价</span>
                        <span v-else>不加价</span>
                    </td>
                    <td>{{v.money}} 元</td>
                    <td>{{v.num}}</td>
                    <td>
                        <el-button type="primary" size="small" icon="el-icon-edit"  @click="operation(3,k)">编辑</el-button>
                        <el-button type="primary" size="small" icon="el-icon-edit"  @click="operation(1,k)">关联菜品</el-button>
                        <el-button type="danger" size="small" icon="el-icon-delete" @click="operation(2,k)">删除</el-button>
                    </td>
                </tr>
                <!-- 无数据显示 -->
                <tr v-if="data_list.length<=0">
                    <td colspan="7">
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
                <div class="center_box" v-if="show_center" @click.stop :class="{showLongBox:commonBox.index==4||commonBox.index==5}">
                     <!-- 定位 X -->
                    <div class="position_clear" @click="quiet_box">
                        <i class="el-icon-circle-close"></i>
                    </div>
                    <!-- 头部 -->
                    <div class="title">{{commonBox.title}}</div>
                    <!-- 内容部分 -->
                    <div class="content_scroll">
                        <!-- 新增分类模块 -->
                        <div v-if="commonBox.index==1">
                            <br>
                            <div class="box_input">
                                <div class="font">规格名称</div>
                                <div>
                                    <el-input class="Class_name_gui" style="width:250px" v-model.trim="Class_name" size="medium" clearable placeholder="请输入规格名称"></el-input>
                                </div>
                                <div class="font" style="color:red;width:20px">*</div>
                            </div>
                            <hr>
                            <!--  -->
                            <div class="box_input">
                                <div class="font">选择方式
                                    <el-tooltip 
                                    class="item" 
                                    :enterable="false" 
                                    effect="dark" 
                                    content="该分类下做法互斥时请选择单选，反之请选择多选，如甜度分类下有多糖，半糖，少糖，无糖四种互斥做法，此时选择方式为单选" 
                                    placement="bottom">
                                        <i class="el-icon-info"></i>
                                    </el-tooltip>
                                </div>
                                <div style="padding-top:10px;">
                                    <el-radio-group v-model="radio2">
                                        <el-radio :label="1">单选</el-radio>
                                        <el-radio :label="2">多选</el-radio>
                                    </el-radio-group>
                                </div>
                            </div>
                        </div>
                        <!--  -->
                        <!-- 新增分类 -->
                        <div v-if="commonBox.index==2">
                            <br>
                            <div class="box_input">
                                <div class="font">做法名称</div>
                                <div>
                                    <el-input class="Class_name_gui" style="width:300px" v-model.trim="Class_practice" size="medium" clearable placeholder="请输入规格名称"></el-input>
                                </div>
                                <div class="font" style="color:red;width:20px">*</div>
                            </div>
                            <hr>
                            <!--  -->
                            <div class="box_input">
                                <div class="font">做法分类</div>
                                <div>
                                    <el-select style="width:196px" v-model="options" placeholder="请选择">
                                        <el-option v-if="!(k==0)" v-for="(v,k) in practice" :key="k" :label="v.txt" :value="v.value"></el-option>
                                    </el-select>
                                    <el-button type="primary" @click="addCommon({index:1,title:'新增分类'})">新增分类</el-button>
                                </div>
                            </div>
                            <hr>
                            <!--  -->
                            <div class="box_input">
                                <div class="font">默认加价方式</div>
                                <div>
                                    <el-select style="width:300px" v-model="premiumClass" placeholder="请选择" @change="PremiumRate=0">
                                        <el-option v-for="(v,k) in premium" :key="k" :label="v.txt" :value="v.value"></el-option>
                                    </el-select>
                                </div>
                            </div>
                            <hr>
                            <!--  -->
                            <div class="box_input">
                                <div class="font">
                                    <span v-if="premiumClass==0">默认加价金额/比例</span>
                                    <span v-if="premiumClass==1">默认加价比例</span>
                                    <span v-if="premiumClass==2">默认加价金额</span>
                                </div>
                                <div style="width:300px;">
                                    <el-input :disabled="premiumClass==0" placeholder="请输入内容" style="width:300px" v-model="PremiumRate">
                                        <template slot="append">
                                            <span v-if="premiumClass==0"></span>
                                            <span v-if="premiumClass==1">%</span>
                                            <span v-if="premiumClass==2">元</span>
                                        </template>
                                    </el-input>
                                </div>
                            </div>
                        </div>
                        <!--  -->
                        <div v-if="commonBox.index==3">
                            <div class="box_input">
                                <table class="table_list" border="0" cellspacing="0">
                                    <tr>
                                        <th>分类名称</th>
                                        <th>
                                            选择方式
                                            <el-tooltip 
                                            class="item" 
                                            :enterable="false" 
                                            effect="dark" 
                                            content="该分类下做法互斥时请选择单选，反之请选择多选，如甜度分类下有多糖，半糖，少糖，无糖四种互斥做法，此时选择方式为单选" 
                                            placement="top">
                                                <i class="el-icon-info"></i>
                                            </el-tooltip>
                                        </th>
                                        <th>操作</th>
                                    </tr>
                                    <!--  -->
                                    <tr v-if="!(k==0)" v-for="(v,k) in practice" :key="k">
                                        <td>{{v.txt}}</td>
                                        <td>
                                            <el-radio-group v-model="v.radio" @change="indexS++">
                                                <el-radio :label="1">单选</el-radio>
                                                <el-radio :label="2">多选</el-radio>
                                            </el-radio-group>
                                        </td>
                                        <td>
                                            <el-button type="danger" size="small" icon="el-icon-delete" @click="practiceDelete(k,v)">删除</el-button> 
                                        </td>
                                    </tr>
                                    <!-- 无数据显示 -->
                                    <tr v-if="practice.length<=0">
                                        <td colspan="3">
                                            <p style="color:#999">暂无更多数据</p>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                        <!-- 分类关联菜品 -->
                        <div v-if="commonBox.index==4">
                            <ClassAssociated
                            @change="As_Change"
                            >
                            </ClassAssociated>
                        </div>
                        <!-- 关联菜品 -->
                        <div v-if="commonBox.index==5">
                            <AsDishes
                            @change="Ad_cgange"></AsDishes>
                        </div>
                    </div>
                    <!-- 底部内容 -->
                    <div class="footer_btn">
                        <el-button type="info" size="medium"  @click="quiet_box">取消</el-button>
                        <el-button v-if="commonBox.index==2" type="primary" size="medium"  @click="associated">马上关联菜品</el-button>
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
                PremiumRate:0,//默认加价比例
                premiumClass:0,//新增做法 默认加价方式绑定选中数据
                premium:[//新增做法 默认加价方式渲染数据
                    {value:0,txt:'不加价'},
                    {value:1,txt:'比例加价'},
                    {value:2,txt:'固定加价'},
                ],
                indexS:0,//驱动视图更新
                options:'',//新增做法  绑定下拉菜单数据
                Class_practice:'',//新增做法  绑定做法名称
                radio2:1,//新增分类  单选框
                radio4:0,//做法分类单选绑定事件
                practice:[//做法分类渲染数据
                    {value:0,txt:'全部',num:999},
                    {value:1,txt:'辣度',num:9,radio:1},
                    {value:2,txt:'冰度',num:2,radio:2},
                ],
                Class_name:'',//新增分类名称
                commonBox:{index:-1,title:''},//设置弹框显示
                area_name: '',//顶部搜索框做法名称
                show_center:false,//弹框内层框是否显示
                show_bounced:false,//是否显示弹框
                pageIndex:1,//当前页数
                pageSize:10,//每页显示条数
                data_list:[ //渲染数据
                    {name:'中辣',class:1,markup:1,money:23.00,num:1},
                    {name:'中辣',class:1,markup:1,money:23.00,num:1},
                    {name:'中辣',class:1,markup:1,money:23.00,num:1},
                    {name:'中辣',class:1,markup:1,money:23.00,num:1},
                    {name:'中辣',class:1,markup:1,money:23.00,num:1},
                    {name:'中辣',class:1,markup:1,money:23.00,num:1},
                    {name:'中辣',class:1,markup:1,money:23.00,num:1},
                    {name:'中辣',class:1,markup:1,money:23.00,num:1},
                    {name:'中辣',class:1,markup:1,money:23.00,num:1},
                    {name:'中辣',class:1,markup:1,money:23.00,num:1},
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
            // 关联菜品 change事件
            Ad_cgange(data){
                console.log(data)
            },
            // 分类关联菜品change事件
            As_Change(data){
                console.log(data)
            },
            // 删除编辑分类 中的数据
            practiceDelete(k,data){
                console.log(k,data)
                this.$confirm('此操作将删除该条数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.practice.splice(k,1)
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });          
                });
            },
            // 做法分类change事件
            practiceChange(e){
                console.log(e)
            },
            // 公共弹框事件
            addCommon(e){
                // 设置显示哪块
                this.commonBox=e;
                // 开启弹框
                this.show_bounced=true
            },
            // 马上关联菜品
            associated(){
                if(this.Class_practice==''){
                    this.$message({
                        message: '请填写做法名称',
                        type: 'warning'
                    });
                    return   
                }
                if(this.options==''){
                    this.$message({
                        message: '请选择做法分类',
                        type: 'warning'
                    });
                    return   
                }
                // 请求成功后
                // 设置弹框
                this.commonBox={index:2,title:'关联菜品'}
            },
            //重置和搜索按钮
            seachAndClear(e){
                if(e==1){
                    // 搜索
                }else{
                    // 重置
                    this.area_name='';
                }
            },
            //弹框确定事件
            confirmOk(){
                console.log(23232323)
            },
            // 弹框 关闭事件{
            quiet_box(){
                this.show_center=false;
                this.Class_name='';
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
                    // 关联菜品
                    // 打开弹框
                    this.show_bounced=true;
                    // 设置弹框
                    this.commonBox={index:5,title:'关联菜品'}
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
                }else if(e==3){
                    // 编辑
                    // 打开弹框
                    this.show_bounced=true;
                    // 设置显示弹框模块
                    this.commonBox={index:2,title:'编辑做法信息'}
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
    .showLongBox{
        width:1100px;
        height:700px;
    }
    .box_input{
        width:600px;
        margin: auto;
        padding:5px 0;
    }
    .box_input>div{
        display: inline-block;
        margin-right:10px;
    }
    .box_input .font{
        width:180px;
        text-align: right;
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
    .el-icon-info{
        cursor: pointer;
    }
    .el-tooltip__popper.is-dark{
        width:100px;
    }
</style>