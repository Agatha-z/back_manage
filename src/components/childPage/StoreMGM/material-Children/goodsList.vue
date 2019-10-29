<!-- 原材料管理/物品列表 -->
<template>
    <div class="postPre">
        <div>
            <!--头部搜索 -->
            <div class="searchTop">
                <label>物品信息</label>
                <el-input style="width:337.34px;" size="medium" clearable placeholder="根据编码或名称检索..."></el-input>
                <el-button type="primary" size="small" icon="el-icon-search" @click="seachAndClear(1)" style="margin-left:10px;">搜索</el-button>
                <el-button type="info"  size="small" icon="el-icon-refresh" @click="seachAndClear(2)">重置</el-button>
            </div>
            <!--nav-->
            <div>
                <el-button type="primary"  style="margin-top:20px;" @click="addGoods">新增物品</el-button>
                <el-button type="primary"  style="margin-top:20px;">批量导入<i class="el-icon-plus el-icon-plus-right"></i></el-button>
                <el-button type="primary"  style="margin-top:20px;">批量导出<i class="el-icon-plus el-icon-plus-right"></i></el-button>
            </div>
            <!--数据-->
            <div style="margin-top:20px;">
                <table border="0" cellspacing="0" class="table_list">
                    <tr>
                        <th></th>
                        <th>物品编码</th>
                        <th>物品名称</th>
                        <th>规格型号</th>
                        <th>库存单位</th>
                      	<th>总部最低库存</th>
	                    <th>总部最高库存</th>
	                    <th>所属类别</th>
	                    <th>采购规格</th>
	                    <th>采购单价</th>
	                    <th>状态</th>
	                    <th>操作</th>
                    </tr>
                    <tr v-for="(v,k) in data_list" :key="k">
                        <td>{{k+1}}</td>
                        <td>{{v.s_name}}</td>
                        <td>{{v.brand}}</td>
                        <td>{{v.attribute}}</td>
                        <td>{{v.uniot}}</td>
                        <td>{{v.di}}</td>
                        <td>{{v.num}}</td>
                        <td>{{v.product}}</td>
                        <td>{{v.guige}}</td>
                        <td>{{v.money}}</td>
                        <td>{{v.state}}</td>
                        <td>
                            <el-button type="primary" size="small" icon="el-icon-edit"  @click="operation(1,k,v)">编辑</el-button>
                            <el-button type="danger" size="small" icon="el-icon-delete" @click="operation(2,k,v)">删除</el-button>
                        </td>
                    </tr>
                </table>
            </div>
<!--==============================================================================================弹框-->
            <div class="bounced_box" @click="quiet_box" v-if="show_bounced">
                <transition name="animate_box">
                    <div class="center_box" v-if="show_center" @click.stop>
                        <!-- 定位 -->
                        <div class="position_clear" @click="quiet_box">
                            <i class="el-icon-circle-close"></i>
                        </div>
                        <!-- 头部 -->
                        <div class="title">{{title}}</div>
                        <!--内容部分-->
                        <div class="content_scroll">
                            <br>
                            <div class="box_input" v-bind:class="{goodsCode:goodsCode}">
                                <div class="font">物品编码</div>
                                <div style="display:flex;flex-direction:column;align-items:flex-start;color:#737373;font-size:14px;width:347.34px;">
                                    <el-input style="width:347.34px;margin-bottom:10px;" v-model="name_goodsCode" size="medium" clearable placeholder="填写物品编码" @blur="goodsCode_blur"></el-input>
                                    <span v-show="!goodsCode">(只能填数字或字母&nbsp;!&nbsp;例如:CK1001,CK1002...)</span>
                                    <span v-show="goodsCode_wrong" style="color:#A94442">请输入字母数字或下划线</span>
                                    <span v-show="goodsCode_null" style="color:#A94442">必填信息</span>
                                </div>
                                <span style="color:red;padding-top:10px;font-size:14px;">*</span>
                            </div>
                            <hr>
                            <!--  -->
                            <div class="box_input" v-bind:class="{isBlur:isBlur}">
                                <div class="font">物品名称</div>
                                <div style="display:flex;flex-direction:column;align-items:flex-start;color:#737373;font-size:14px;width:347.34px;">
                                    <el-input style="width:347.34px;margin-bottom:10px;"  size="medium" v-model="name_goods" placeholder="填写物品名称" @input="desInput" @blur="blur">
                                    </el-input>
                                    <span v-if="!isBlur">(此项为必填项&nbsp;,&nbsp;不能填写已有的名称&nbsp;!&nbsp;)</span>
                                    <span v-else style="color:#A94442">必填信息</span>
                                </div>
                                <span style="color:red;padding-top:10px;font-size:14px;">*</span>
                            </div>
                            <hr>
                            <!--  -->
                            <div class="box_input" v-bind:class="{categorySelect:categorySelect}">
                                <div class="font">类别名称</div>
                                <div style="display:flex;flex-direction:column;align-items:flex-start;color:#737373;font-size:14px;">
                                    <storeSelect :inputWidth="290" :storeSelectData="categorySelectData" :placeholder="['请选择类别名称','已选择类别名称点击下拉按钮查看']" @selectChange="categoryChange"></storeSelect>
                                    <span v-if="!categorySelect" style="margin-top:10px;">(此项为必填项&nbsp;,&nbsp;请选择所需的类别&nbsp;!&nbsp;)</span>
                                    <span v-else style="color:#A94442;margin-top:10px;">必填信息</span>
                                </div>
                                <span style="color:red;padding-top:10px;font-size:14px;margin-left:-20px;">*</span>
                            </div>
                            <hr>
                            <!--  -->
                            <div class="box_input">
                                <div class="font">规格型号</div>
                                <div style="display:flex;flex-direction:column;align-items:flex-start;color:#737373;font-size:14px;width:347.34px;">
                                    <el-input style="width:347.34px;margin-bottom:10px;"  size="medium" v-model="P_institutions" placeholder="填写规格型号" @input="desInput" @blur="blur">
                                    </el-input>
                                    <span>（可填写任意内容,非必填！）</span>
                                </div>
                            </div>
                            <hr>
                            <!--  -->
                            <div class="box_input" v-bind:class="{stocKeepUnitBlur:stocKeepUnitBlur}">
                                <div class="font">库存单位</div>
                                <div style="display:flex;flex-direction:column;align-items:flex-start;color:#737373;font-size:14px;width:347.34px;">
                                    <el-select style="width:347.34px;margin-bottom:10px;"  size="medium" v-model="nameStocKeepUnit" @focus="stocKeepUnit" @change="changeStocKeepUnit">
                                        <el-option label="对" value="1"></el-option>
                                        <el-option label="个" value="2"></el-option>
                                        <el-option label="支" value="3"></el-option>
                                        <el-option label="米" value="4"></el-option>
                                        <el-option label="条" value="5"></el-option>
                                    </el-select>
                                    <span v-if="!stocKeepUnitBlur">（选择所需库存单位，不能不选！）</span>
                                    <span v-else style="color:#A94442">必填信息</span>
                                </div>
                                <span style="color:red;padding-top:10px;font-size:14px;">*</span>
                            </div>
                            <hr>
                            <!--  -->
                            <div class="box_input">
                                <div class="font">总部最低库存</div>
                                <div style="display:flex;flex-direction:column;align-items:flex-start;color:#737373;font-size:14px;width:347.34px;">
                                    <el-input style="width:347.34px;margin-bottom:10px;"  size="medium" v-model="P_institutions" placeholder="总部最低库存">
                                    </el-input>
                                    <span>（不足最低库存时，库存报表以红色标识）</span>
                                </div>
                            </div>
                            <hr>
                            <!--  -->
                            <div class="box_input">
                                <div class="font">总部最高库存</div>
                                <div style="display:flex;flex-direction:column;align-items:flex-start;color:#737373;font-size:14px;width:347.34px;">
                                    <el-input style="width:347.34px;margin-bottom:10px;"  size="medium" v-model="P_institutions" placeholder="总部最高库存">
                                    </el-input>
                                    <span>（高于最高库存时，库存报表以绿色标识）</span>
                                </div>
                            </div>
                            <hr>
                            <!--  -->
                            <div class="box_input">
                                <div class="font">储存方式</div>
                                <div style="display:flex;flex-direction:column;align-items:flex-start;color:#737373;font-size:14px;width:347.34px;">
                                    <el-select style="width:347.34px;margin-bottom:10px;"  size="medium" v-model="name_in3"  placeholder="请选择">
                                        <el-option label="冷冻" :value="1"></el-option>
                                        <el-option label="冷藏" :value="2"></el-option>
                                        <el-option label="常温" :value="3"></el-option>
                                    </el-select>
                                    <span>（根据所需选择储存方式，非必选！）</span>
                                </div>
                            </div>
                            <hr>
                            <!--  -->
                            <div class="box_inner">
                                <div class="box_input box_input-inner">
                                    <div class="font">采购规格1</div>
                                    <el-input style="width:347.34px;margin-bottom:10px;"  size="medium" v-model="P_institutions" placeholder="填写规格名称">
                                    </el-input>
                                </div>
                                <div class="box_input box_input-inner" v-bind:class="{buyUnit:buyUnit}">
                                    <div class="font">采购单位</div>
                                    <div style="display:flex;flex-direction:column;align-items:flex-start;color:#737373;font-size:14px;width:347.34px;">
                                        <el-select style="width:347.34px;margin-bottom:5px;"  size="medium" v-model="name_buyUnit" @focus="buyUnit_focus" @change="changebuyUnit" placeholder="请选择">
                                            <el-option label="对" :value="1"></el-option>
                                            <el-option label="个" :value="2"></el-option>
                                            <el-option label="支" :value="3"></el-option>
                                            <el-option label="米" :value="4"></el-option>
                                            <el-option label="条" :value="5"></el-option>
                                        </el-select>
                                        <span v-if="!buyUnit">（选择所需订货单位，不能不选！）</span>
                                        <span v-else style="color:#A94442">必填信息</span>
                                    </div>
                                    <span style="color:red;padding-top:10px;font-size:14px;">*</span>
                                </div>
                                <div class="box_input box_input-inner" v-bind:class="{convert:convert}">
                                    <div class="font">采购单位换算值</div>
                                    <div style="display:flex;flex-direction:column;align-items:flex-start;color:#737373;font-size:14px;width:347.34px;">
                                        <el-input style="width:347.34px;margin-bottom:10px;"  size="medium" v-model="name_convert" @blur="convertBlur" placeholder="填写订货单位换算值">
                                        </el-input>
                                        <span v-if="!convert">（大单位转换小单位,如：1箱啤酒12瓶，这里填写小单位换算值，只能填写正数）</span>
                                        <span v-else style="color:#A94442">必填信息</span>
                                    </div>
                                    <span style="color:red;padding-top:10px;font-size:14px;">*</span>
                                </div>
                                <div class="box_input box_input-inner">
                                    <div class="font">采购单价</div>
                                    <div style="display:flex;flex-direction:column;align-items:flex-start;color:#737373;font-size:14px;width:347.34px;">
                                        <el-input style="width:347.34px;margin-bottom:10px;"  size="medium" v-model="P_institutions" placeholder="填写采购单价">
                                        </el-input>
                                        <span>（填写采购单价，例如：1，1.5...）</span>
                                    </div>
                                </div>
                            </div>
                            <!--  -->
                            <div class="box_input" v-bind:class="{expendUnit:expendUnit}">
                                <div class="font">消耗单位</div>
                                <div style="display:flex;flex-direction:column;align-items:flex-start;color:#737373;font-size:14px;width:347.34px;">
                                    <el-select style="width:347.34px;margin-bottom:10px;"  size="medium" v-model="name_expendUnit"  placeholder="请选择" @focus="expendUnit_focus" @change="change_expendUnit">
                                        <el-option label="对" :value="1"></el-option>
                                        <el-option label="个" :value="2"></el-option>
                                        <el-option label="支" :value="3"></el-option>
                                        <el-option label="米" :value="4"></el-option>
                                        <el-option label="条" :value="5"></el-option>
                                    </el-select>
                                    <span v-if="!expendUnit">（选择所需消耗单位，不能不选！）</span>
                                    <span v-else style="color:#A94442">必填信息</span>
                                </div>
                                <span style="color:red;padding-top:10px;font-size:14px;">*</span>
                            </div>
                            <hr>
                            <!--  -->
                            <div  class="box_input" v-bind:class="{transExpend:transExpend}">
                                <div class="font">消耗单位换算值</div>
                                <div style="display:flex;flex-direction:column;align-items:flex-start;color:#737373;font-size:14px;width:347.34px;">
                                    <el-input style="width:347.34px;margin-bottom:10px;"  size="medium" v-model="name_transExpend"  @blur="transExpend_blur"   placeholder="填写消耗单位换算值">
                                    </el-input>
                                    <span v-if="!transExpend">（大单位转换小单位,如：1箱啤酒12瓶，这里填写小单位换算值，只能填写正数）</span>
                                    <span v-else style="color:#A94442">必填信息</span>
                                </div>
                                <span style="color:red;padding-top:10px;font-size:14px;">*</span>
                            </div>
                            <hr>
                            <!--  -->
                            <div  class="box_input" v-bind:class="{unitBlur:unitBlur}">
                                <div class="font">成本卡标准单价</div>
                                <div style="display:flex;flex-direction:column;align-items:flex-start;color:#737373;font-size:14px;width:347.34px;">
                                    <el-input style="width:347.34px;margin-bottom:10px;"  size="medium" v-model="name_costCard" placeholder="填写采购单价" @blur="unit_blur">
                                    </el-input>
                                    <span v-if="!unitBlur">（填写成本卡标准单价，例如：1，1.5...）</span>
                                    <span v-else style="color:#A94442">必填信息</span>
                                </div>
                                <span style="color:red;padding-top:10px;font-size:14px;">*</span>
                            </div>
                            <hr>
                            <!--  -->
                            <div  class="box_input" v-bind:class="{indentType:indentType}">
                                <div class="font">订货类型</div>
                                <div style="display:flex;flex-direction:column;align-items:flex-start;color:#737373;font-size:14px;width:347.34px;">
                                    <el-select style="width:347.34px;margin-bottom:10px;"  size="medium" v-model="name_indentType" @focus="indentType_focus" @change="changeindentType" placeholder="请选择">
                                        <el-option label="日订货" :value="1"></el-option>
                                        <el-option label="周订货" :value="2"></el-option>
                                        <el-option label="月订货" :value="3"></el-option>
                                    </el-select>
                                    <span v-if="!indentType">（选择所需订货类型，不能不选！）</span>
                                    <span v-else style="color:#A94442">必填信息</span>
                                </div>
                                <span style="color:red;padding-top:10px;font-size:14px;">*</span>
                            </div>
                            <hr>
                            <!--  -->
                            <div  class="box_input" v-bind:class="{checkCountType:checkCountType}">
                                <div class="font">盘点类型</div>
                                <div style="display:flex;flex-direction:column;align-items:flex-start;color:#737373;font-size:14px;width:347.34px;">
                                    <el-select style="width:347.34px;margin-bottom:10px;"  size="medium" v-model="name_checkCountType"  @focus="checkCountType_focus"  @change="changecheckCountType"   placeholder="请选择">
                                        <el-option label="日订货" :value="1"></el-option>
                                        <el-option label="周订货" :value="2"></el-option>
                                        <el-option label="月订货" :value="3"></el-option>
                                    </el-select>
                                    <span v-if="!checkCountType">（选择所需盘点类型，不能不选！）</span>
                                    <span v-else style="color:#A94442">必填信息</span>
                                </div>
                                <span style="color:red;padding-top:10px;font-size:14px;">*</span>
                            </div>
                            <hr>
                            <!--  -->
                            <div class="box_input" v-show="statusShow">
                                <div class="font">状态</div>
                                <div style="margin-top:7px;">
                                    <el-switch
                                    @change="changeSwitch"
                                    v-model="stateValue"
                                    active-color="#13ce66"
                                    inactive-color="#ff4949"
                                    active-text="启用"
                                    inactive-text="停用">
                                    </el-switch>
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
                    <el-button @click="centerDialogVisible = false" v-show="hasCancel" class="fr" style="margin-left:20px;">取 消</el-button>
                    <el-button type="primary" @click="sureDel" class="fr">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                P_name:'CK02',//仓库编码
                P_institutions:'',//仓库名称
// ====================================================================点击新增物品弹框变量
                show_bounced:false,//是否显示新增仓库弹框
                show_center:false,//弹框内层框是否显示
                title:'新增物品',//弹框标题记录
                // 物品编码
                goodsCode:false,
                goodsCode_wrong:false,
                goodsCode_null:false,
                name_goodsCode:'',
                stocKeepUnitBlur:false,//库存单位焦点状态
                centerDialogVisible:false,//点击删除弹框
                hasCancel:true,//取消按钮显示状态
                name_in3:'',//多选框	
                nameStocKeepUnit:'',//库存单位多选框绑定值	
                // 类别名称下拉菜单
                category_Select:[],//选中的变量存数组
                categorySelect:false,//是否选中
                // 物品名称
                name_goods:'',//绑定值
                isBlur:false,//输入框焦点状态
                // 采购单位变量
                buyUnit:false,//聚焦状态
                name_buyUnit:'',//输入框绑定值
                // 采购单位换算值
                convert:false,//失去焦点与否的状态
                name_convert:'',//输入框绑定值
                //消耗单位变量
                expendUnit:false,//聚焦状态
                name_expendUnit:'',//输入框绑定值
                // 消耗单位换算值
                transExpend:false,//失去焦点的状态
                name_transExpend:'',//输入框绑定值
                // 成本卡标准单价
                name_costCard:'',
                unitBlur:false,//成本卡标准单价焦点状态
                // 订货类型
                indentType:false,//订货类型
                name_indentType:'',//订货类型绑定值
                // 盘点类型 
                checkCountType:false,
                name_checkCountType:'',
                stateValue:true,//启用状态
                statusShow:false,//状态栏显示问题
// ===============================================================删除弹框
                centerDialogVisible:false,
                data_list:[ //表格渲染数据
                    {s_name:'WP189',brand:'啵啵鱼骨汤',attribute:'袋',uniot:'袋',di:'1',num:'9999',product:'产成品',guige:'',money:'45.000000',state:'启用'},
                    {s_name:'WP187',brand:'巴沙鱼',attribute:'箱',uniot:'箱',di:'1',num:'99',product:'冷冻产成品',guige:'',money:'40.000000',state:'启用'},
                    {s_name:'WP186',brand:'秋冬季工作服',attribute:'100个',uniot:'套',di:'1',num:'999',product:'开业用品',guige:'',money:'225.000000',state:'启用'},
                    {s_name:'WP185',brand:'凉皮甜萝卜干',attribute:'22个一袋     22克/个',uniot:'盒',di:'1',num:'99999',product:'门店原材料',guige:'',money:'100.000000',state:'启用'},
                ],
                categorySelectData:[//类别名称下拉菜单数据
                    {
                        name:'菜品类别',
                        id:'1',
                        children:[
                            {name:'产成品',id:'1-1'},
                            {name:'低值易耗品',id:'1-2'},
                            {name:'门店原材料',id:'1-3'},
                            {name:'开业用品',id:'1-4'},
                            {name:'常用物品',id:'1-5'},
                            {name:'冷冻产成品',id:'1-6'},
                            {name:'印字低值易耗品',id:'1-7'},
                        ]
                    },
                ],
                options:[
                    {value: '选项1',label: '对'}, {value: '选项2',label: '个'}, {value: '选项3',label: '支'}, {value: '选项4',
label: '米'}, {value: '选项5',label: '条'}]
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
            // 点击新增物品
            addGoods(){
                this.title='新增物品';//点击新增仓库弹框标题
                this.statusShow=false;//启用状态栏隐藏
                this.show_bounced=true;
            },
            //弹框确定事件
            confirmOk(){
                if(this.name_goodsCode==''){//物品编码
                    this.goodsCode=true;//物品编码
                    this.goodsCode_wrong=false;//物品编码
                    this.goodsCode_null=true;//物品编码
                }
                if(this.name_goods==''){//物品名称
                    this.isBlur=true;
                }
                if(this.category_Select.length==0){//类别名称
                    this.categorySelect=true;
                }
                if(this.nameStocKeepUnit==''){//库存单位
                    this.stocKeepUnitBlur=true;
                }
                if(this.name_buyUnit==''){//采购单位
                    this.buyUnit=true;
                }
                if(this.name_convert==''){//采购单位换算值
                    this.convert=true;
                }
                if( this.name_expendUnit==''){//消耗单位
                    this.expendUnit=true;
                }
                if(this.name_transExpend==''){//消耗单位换算值
                    this.transExpend=true;
                }
                if(this.name_costCard==''){//成本卡标准单价
                    this.unitBlur=true;
                }
                if(this.name_indentType==''){//订货类型
                    this.indentType=true;
                }
                if( this.name_checkCountType==''){//盘点类型
                    this.checkCountType=true;
                }
            },
            // 弹框 关闭事件{
            quiet_box(){ 
                this.show_center=false;
                this.name_goodsCode='';//物品编码
                this.goodsCode=false;//物品编码
                this.goodsCode_wrong=false;//物品编码
                this.goodsCode_null=false;//物品编码
                this.unitBlur=false;//成本卡标准单价
                this.name_costCard='',//成本卡标准单价
                this.name_goods='';//物品名称
                this.isBlur=false;//物品名称
                this.category_Select=[];//类别名称
                this.categorySelect=false;//类别名称
                this.stocKeepUnitBlur=false;//库存单位
                this.nameStocKeepUnit='';//库存单位
                this.buyUnit=false;//采购单位
                this.name_buyUnit='';//采购单位
                this.convert=false;//采购单位换算值
                this.name_convert='';//采购单位换算值
                this.expendUnit=false;//消耗单位
                this.name_expendUnit='';//消耗单位
                this.transExpend=false;//消耗单位换算值
                this.name_transExpend='';//消耗单位换算值
                this.indentType=false;//订货类型
                this.name_indentType='';//订货类型
                this.checkCountType=false;//盘点类型
                this.name_checkCountType='';//盘点类型
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
                    this.statusShow=true;//启用状态栏显示
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
// ======================================================================================================弹框里面的事件
            //点击新增仓库仓库名称输入内容事件
            desInput(){
                this.blur();
            },
            // 类别名称下拉菜单事件
            categoryChange(e){
                this.category_Select=e;//选中的数据存变量
            },
            // 物品编码失去焦点事件
            goodsCode_blur(){
                if(/[^\x00-\xff]/g.test(this.name_goodsCode)){//正则判断汉字
                    this.goodsCode=true;
                    this.goodsCode_wrong=true;
                }else{
                    this.goodsCode=false;
                    this.goodsCode_wrong=false;
                }
            },
            //物品名称输入框失去焦点事件
            blur(){
                if(this.name_goods==''){//物品名称
                    this.isBlur=true;
                }else{
                    this.isBlur=false;
                }
            },
            //成本卡标准单价输入框失去焦点事件
            unit_blur(){
                if(this.name_costCard==''){
                    this.unitBlur=true;
                }else{
                    this.unitBlur=false;
                }
            },
            // 库存单位聚焦事件
            stocKeepUnit(){
                if(this.nameStocKeepUnit==''){
                    this.stocKeepUnitBlur=true;
                }else{
                    this.stocKeepUnitBlur=false;
                }
            },
            // 库存单位选择触发事件
            changeStocKeepUnit(e){
                this.nameStocKeepUnit=e;
                if(this.nameStocKeepUnit==''){
                    this.stocKeepUnitBlur=true;
                }else{
                    this.stocKeepUnitBlur=false;
                }
            },
            // 采购单位聚焦事件
            buyUnit_focus(){
                if(this.name_buyUnit==''){
                    this.buyUnit=true;
                }else{
                    this.buyUnit=false;
                }
            },
            //采购单位选择触发事件
            changebuyUnit(e){
                this.name_buyUnit=e;
                this.buyUnit_focus();
            },
            // 采购单位换算值失去焦点状态
            convertBlur(){
                console.log(this.name_convert)
                if(this.name_convert==''){
                    this.convert=true;
                }else{
                    this.convert=false;
                }
            },
            // 消耗单位聚焦事件@focus="expendUnit_focus" @change="change_expendUnit"
            expendUnit_focus(){
                if(this.name_expendUnit==''){
                    this.expendUnit=true;
                }else{
                    this.expendUnit=false;
                }
            },
            change_expendUnit(e){
                this.name_expendUnit=e;
                this.expendUnit_focus();
            },
            // 消耗单位换算值失去焦点事件
            transExpend_blur(){
                if(this.name_transExpend==''){
                    this.transExpend=true;
                }else{
                    this.transExpend=false;
                }
            },
            // 订货类型聚焦事件
            indentType_focus(){
                if(this.name_indentType==''){
                    this.indentType=true;
                }else{
                    this.indentType=false;
                }
            },
            // 订货类型触发事件
            changeindentType(e){
                this.name_indentType=e;
                this.indentType_focus();
            },
            // 盘点类型聚焦事件
            checkCountType_focus(){
                if(this.name_checkCountType==''){
                    this.checkCountType=true;
                }else{
                    this.checkCountType=false;
                }
            },
            changecheckCountType(e){
                this.name_checkCountType=e;
                this.checkCountType_focus();
            },
            // 状态栏事件
            changeSwitch(e){
                console.log(this.stateValue)
                //e的状态false或者true,跟stateValue的状态一样
            },
        },
        created(){
            // console.log('原材料管理')
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
    /*新增物品弹框*/
    .box_input{
        display:flex;
        width:600px;
        margin: auto;
        padding:15px 0;
    }
    .box_input.box_input-inner{
        padding:5px 0;
    }
    .box_inner{
        border: 1px #cbcbcb solid;
        padding: 5px;
        margin: 20px 30px;
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
        width:140px;
        text-align:right;
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
    .box_input.isBlur .font{
        color:#A94442;
    }
    .box_input.unitBlur .font{
        color:#A94442;
    }
    .box_input.stocKeepUnitBlur .font{
        color:#A94442;
    }
    .box_input.buyUnit .font{
        color:#A94442;
    }
    .box_input.convert .font{
        color:#A94442;
    }
    .box_input.expendUnit .font{
        color:#A94442;
    }
    .box_input.transExpend .font{
        color:#A94442;
    }
    .box_input.indentType .font{
        color:#A94442;
    }
    .box_input.checkCountType  .font{
        color:#A94442;
    }
    .box_input.categorySelect  .font{
        color:#A94442;
    }
    .box_input.goodsCode .font{
        color:#A94442;
    }
</style>