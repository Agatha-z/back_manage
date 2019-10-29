<!-- 菜品管理 -->
<template>
    <div>
        <!-- 按钮组 -->
        <div>
            <!--  -->
            <el-button type="primary" size="medium" @click="activateMenu({index:1,title:'批量导入'})">批量导入<i class="el-icon-document el-icon--right"></i></el-button> 
            <!--  -->
            <el-button type="primary" size="medium" @click="activateMenu({index:2,title:'添加分类'})">添加分类<i class="el-icon-plus el-icon--right"></i></el-button> 
            <!--  -->
            <el-button type="primary" size="medium" @click="activateMenu({index:3,title:'编辑分类'})">编辑分类<i class="el-icon-edit el-icon--right"></i></el-button> 
            <!--  -->
            <el-button type="primary" size="medium" @click="addPackage">添加套餐<i class="el-icon-plus el-icon--right"></i></el-button> 
            <!--  -->
            <el-button type="primary" size="medium" @click="ExportData">批量导出<i class="el-icon-printer el-icon--right"></i></el-button> 
            <div class="float_right">
                <el-input style="width:250px" v-model="area_name" size="medium" @keyup.enter.native="seachAndClear(1)" clearable placeholder="请输入菜品名称 / 按回车搜索"></el-input>
                <!--  -->
                &nbsp;&nbsp;&nbsp;
                <el-button type="primary" size="medium" icon="el-icon-search" @click="seachAndClear(1)">搜索</el-button>
                <el-button type="info"  size="medium" icon="el-icon-refresh" @click="seachAndClear(2)">重置</el-button>
            </div>
        </div>
        <br>
        <!-- 显示区 -->
        <div>
            <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
                <el-tab-pane :label="v.label" :name="v.name" v-for="(v,k) in footClass" :key="k"></el-tab-pane>
            </el-tabs>
            <!-- 数据显示 -->
            <div class="tabel_list_body">
                <table class="table_list" border="0" cellspacing="0">
                    <tr>
                        <th></th>
                        <th>套餐名</th>
                        <th>套餐类型</th>
                        <th>菜品明细</th>
                        <th>原价(元)</th>
                        <th>套餐价/套餐优惠价(元)</th>
                        <th>会员价/会员优惠价(元)</th>
                        <th>图片</th>
                        <th>状态</th>
                        <th>更多</th>
                        <th>操作</th>
                    </tr>
                    <!--  -->
                    <tr v-for="(v,k) in data_list" :key="k">
                        <td>{{k+1}}</td>
                        <td>
                            <span v-if="!v.editor">{{v.name}}</span>
                            <el-input v-else v-model="EditSubmission.name" placeholder="请输入套餐名"></el-input>
                        </td>
                        <td>
                            <span v-if="!v.editor">{{v.PackageType}}</span>
                            <el-select v-else v-model="EditSubmission.PackageType" placeholder="请选择">
                                <el-option value="简易套餐"></el-option>
                                <el-option value="超级套餐"></el-option>
                                <el-option value="奶茶套餐"></el-option>
                                <el-option value="水果套餐"></el-option>
                            </el-select>
                        </td>
                        <td>
                            <span v-if="!v.editor">{{v.dishesSub}}</span>
                            <el-button v-else type="primary"  size="small" @click="activateMenu({index:6,title:'菜品明细'})" icon="el-icon-edit"></el-button>
                        </td>
                        <td>{{v.price}}</td>
                        <td>{{v.PackagePrice}}</td>
                        <td>{{v.VipPrice}}</td>
                        <td>
                            <el-button v-if="v.editor"  size="small" type="primary"  @click="activateMenu({index:7,title:'上传图片'})">上传<i class="el-icon-upload el-icon--right"></i></el-button>
                        </td>
                        <td>
                            <div v-if="!v.editor">
                                <span v-if="v.state==1" style="color:green">{{v.state==1?'启用':''}}</span>
                                <span v-else style="color:red">{{v.state==2?'停用':''}}</span>
                            </div>
                            <div v-else>
                                <el-switch
                                v-model="value2"
                                @change="switchChange"
                                active-color="#13ce66"
                                inactive-color="#ff4949">
                                </el-switch>
                            </div>
                        </td>
                        <td style="width:100px">
                            <el-button v-if="!v.editor" type="info" size="small" icon="el-icon-setting" @click="activateMenu({index:9,title:'查看更多设置'},v.MoreAM)">查看</el-button>
                            <el-button v-else type="primary" size="small" icon="el-icon-setting" @click="activateMenu({index:8,title:'更多设置'})">更多</el-button>
                        </td>
                        <td>
                            <el-button type="primary" v-if="!v.editor" @click="TheEditor(1,k,v)" size="small" icon="el-icon-setting">编辑</el-button>
                            <el-button type="success" v-if="v.editor" @click="TheEditor(2,k,v)" size="small" icon="el-icon-download">保存</el-button>
                            <el-button type="info" v-if="v.editor" @click="TheEditor(3,k,v)" size="small" icon="el-icon-close">取消</el-button>
                            <el-button type="danger" v-if="!v.editor" @click="TheEditor(4,k,v)" size="small" icon="el-icon-delete">删除</el-button>
                        </td>
                    </tr>
                    <!-- 无数据显示 -->
                    <tr v-if="data_list.length<=0">
                        <td colspan="11">
                            <p style="color:#999">暂无更多数据</p>
                        </td>
                    </tr>
                </table>
                <!--  -->
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
            <!--  -->
            </div>
        </div>
        <!-- 弹框 -->
        <div class="bounced_box"  v-if="show_bounced" @click="quiet_box">
            <transition name="animate_box">
                <div class="center_box" v-if="show_center" @click.stop :class="{showLongBox:showModule.index==6}">
                    <!-- 定位 X -->
                    <div class="position_clear" @click="quiet_box">
                        <i class="el-icon-circle-close"></i>
                    </div>
                    <!-- 头部 -->
                    <div class="title">{{showModule.title}}</div>
                    <!-- 内容部分 -->
                    <div class="content_scroll">
                       <!-- 批量导入模块 -->
                        <div v-if="showModule.index==1">
                            <p style="color:red;padding:10px;text-align:center;font-size:18px;font-weight:600;">
                                请先下载模板，并按照模板格式上传菜谱
                                <el-button type="info" size="small" @click="downloadExcel">下载模板<i class="el-icon-download el-icon--right"></i></el-button>
                            </p>
                            <div class="box_input">
                                <el-upload
                                accept=".xls"
                                :on-remove="removeExcel"
                                :on-success="successExcel"
                                :on-error="errorExcel"
                                class="upload-demo"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :limit="1">
                                <el-button size="small" type="primary">选择文件<i class="el-icon-upload el-icon--right"></i></el-button>
                                &nbsp;&nbsp;
                                <div slot="tip" class="el-upload__tip">只能上传xls文件</div>
                                </el-upload>
                            </div>
                        </div>
                        <!-- 添加分类模块 -->
                        <div v-if="showModule.index==2">
                            <br>
                            <div class="box_input">
                                <div class="font">分类名称</div>
                                <div>
                                    <el-input style="width:250px" @keyup.enter.native="confirmOk(showModule.index)" v-model.trim="Class_name" size="medium" clearable placeholder="请输入分类名称"></el-input>
                                </div>
                                <div class="font" style="color:red">*</div>
                            </div>
                        </div>
                        <!-- 编辑分类模块 -->
                        <div v-if="showModule.index==3">
                            <br>
                            <div v-for="(v,k) in editorClass" :key="k">
                                <hr v-if="!(k==0)">
                                <div class="box_input" style="width:500px">
                                    <div class="font" style="width:100px;text-align:right">分类{{k+1}}</div>
                                    <div>
                                        <el-input style="width:250px" v-model.trim="v.label" size="medium" clearable placeholder="请输入分类名称"></el-input>
                                    </div>
                                    <div class="font" style="color:red">
                                        <el-button size="small" style="margin-top:-2px;" type="danger" @click="editorClassDelete(k)">删除<i class="el-icon-delete el-icon--right"></i></el-button>
                                    </div>
                                </div>
                            </div>
                            <hr>
                            <div class="box_input" style="width:500px">
                                <!-- 添加一条分类 -->
                                <el-button style="width:250px;margin-left:120px;" @click="addClassEditor" type="primary" size="small ">添加分类<i class="el-icon-plus el-icon--right"></i></el-button>
                            </div>
                            <br>
                        </div>
                        <!-- 菜品明细框 -->
                        <div v-if="showModule.index==6">
                           <!--  -->
                            <transfer 
                            :selectedList="submitList"
                            :footList="[{type:1,id:'1',name:'好吃的饺子',money:21,specifications:'大份'},{type:2,id:'2',name:'吃西瓜撑不死你',money:11,specifications:'小份'}]"
                            :footClass="[{label:'全部',name:'0'},{label:'套餐',name:'1'},{label:'简餐',name:'2'}]"
                            @change="transferChange">
                            </transfer>
                            <!--  -->
                        </div>
                        <!-- 上传照片模块 -->
                        <div v-if="showModule.index==7">
                            <div class="commonC" style="margin-left:2%;width:30%">
                                <el-upload
                                    class="upload-demo"
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    accept='.png,.jpeg,.jpg'
                                    :on-success="updataImg"
                                    list-type="picture">
                                    <el-button size="small" type="primary">点击上传</el-button>
                                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                                </el-upload>   
                            </div>
                            <div class="commonC" style="width:65%">
                                <div class="commonCtwo" v-if="ImgList.length>0">
                                    <!--  -->
                                    <div class="commonCtwoBody">
                                        <div class="swiper-container">
                                            <div class="swiper-wrapper">
                                                <div class="swiper-slide" v-for="(v,k) in ImgList" :key="k" @mouseenter="showDeletBtn=k" @mouseleave="isShowDeletBtn?showDeletBtn=-1:''">
                                                    <img :src="v" />
                                                    <!-- 删除按钮 -->
                                                    <div class="delet_Img" v-show="showDeletBtn==k">
                                                        <div class="btns_imgs" @click="deleteImgList(k)">
                                                            <i class="el-icon-delete"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- 如果需要导航按钮 -->
                                            <div class="swiper-button-prev"></div>
                                            <div class="swiper-button-next"></div>
                                        </div>
                                        <!-- 如果需要滚动条 -->
                                        <div style="height:5px" class="swiper-scrollbar"></div>
                                    </div>
                                </div>
                                <p style="font-size:18px;padding:10px 0;font-weight:600">已上传 <span style="color:red">{{ImgList.length}}</span> 张图片</p>
                            </div>
                        </div>
                        <!--  -->
                        <!-- 更多设置模块 -->
                        <div v-if="showModule.index==8">
                            <!--  -->
                            <br>
                            <div class="box_input box_input8">
                                <div class="font indexEleven">辣度</div>
                                <div style="vertical-align: bottom">
                                   <el-rate
                                   :disabled="EditPlay"
                                   :show-text="true"
                                   @change="indexs++"
                                   v-model="EditPlayData.spicy"
                                   :texts="['不辣','微辣','中辣','很辣','巨辣']"
                                   ></el-rate> 
                                </div>
                            </div>
                            <hr>
                            <!--  -->
                            <div class="box_input box_input8">
                                <div class="font indexEleven">推荐度</div>
                                <div style="vertical-align: bottom">
                                    <el-rate
                                    @change="indexs++"
                                    :disabled="EditPlay"
                                    :show-text="true"
                                    v-model="EditPlayData.recommended"
                                    :texts="['不推荐','一般','推荐','很推荐','非常推荐']"
                                    ></el-rate>
                                </div>
                            </div>
                            <hr>
                            <!--  -->
                            <div class="box_input box_input8">
                                <div class="font indexEleven">拼音助记</div>
                                <div>
                                    <el-input @change="indexs++" :disabled="EditPlay" v-model="EditPlayData.pinyin" size="medium" style="width:325px" placeholder="请输入内容"></el-input>
                                </div>
                            </div>
                            <hr>
                            <!--  -->
                            <div class="box_input box_input8">
                                <div class="font indexEleven">数字助记</div>
                                <div>
                                    <el-input-number @change="indexs++" :disabled="EditPlay" v-model="EditPlayData.number" style="width:150px" size="medium" :min="1" :max="99" label="描述文字"></el-input-number>
                                </div>
                                <div v-if="!EditPlay" style="color:red;display:inline-block">(编码为2位数字，不可重复)</div>
                            </div>
                            <!--  -->
                        </div>
                    </div>
                    <!-- 底部内容 -->
                    <div class="footer_btn">
                        <el-button type="info" size="medium"  @click="quiet_box">取消</el-button>
                        <el-button type="success" v-if="!EditPlay" size="medium" @click="confirmOk(showModule.index)">确认</el-button>
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
                EditPlayData:{spicy:0,recommended:0,pinyin:'',number:''},// 更多设置绑定数据
                EditPlay:false,// 弹框是否为查看状态    可编辑/不可编辑
                isShowDeletBtn:true,// 删除时显示控制删除按钮
                showDeletBtn:-1,//上传图片鼠标移入显示删除按钮
                ImgList:[],
                indexs:0,//驱动视图更新
                isAddPackage:null,//添加取消还是编辑时取消 true 添加   false  编辑时
                editorClass:[],//编辑中的分类  用于修改
                Class_name:'',//弹框增加分类输入的分类名称
                footClass:[ //分类数据
                    {label:'套餐',name:'1'},
                    {label:'早餐',name:'2'},
                    {label:'饮品类',name:'3'},
                    {label:'米线',name:'4'},
                    {label:'小食单加',name:'5'},
                    {label:'酸辣粉皮&凉皮',name:'6'},
                    {label:'员工商品',name:'7'},
                ],
                showModule:{},//弹框层显示的模块
                show_center:false,//弹框内层框是否显示
                show_bounced:false,//是否显示增加岗位弹框
                value2:true,//switch开关
                EditSubmission:{}, //编辑或者添加套餐时数据
                area_name: '',//顶部搜索框区域名称
                activeName2:'1',//tabs选择
                pageIndex:1,//当前页数
                pageSize:10,//每页显示条数
                data_list:[
                   {name:'14.8套餐',PackageType:'简易套餐',dishesSub:'鸡丁米线，赤豆酿酒',MoreAM:{spicy:4,recommended:3,pinyin:'158TC',number:67},price:'19.001',PackagePrice:'14.80',VipPrice:'14.80',picture:['http://imgsrc.baidu.com/imgad/pic/item/a686c9177f3e670901b39ad730c79f3df8dc5563.jpg','http://img.zcool.cn/community/01dc55572d6d8b6ac725b690771103.jpg@3000w_1l_2o_100sh.jpg','http://imgsrc.baidu.com/imgad/pic/item/37d12f2eb9389b50c1ba3e7a8e35e5dde7116e55.jpg'],state:1,editor:false},
                   {name:'14.8套餐',PackageType:'水果套餐',dishesSub:'鸡丁米线，赤豆酿酒',MoreAM:{spicy:3,recommended:1,pinyin:'168TC',number:25},price:'19.002',PackagePrice:'14.80',VipPrice:'14.80',picture:['http://img.zcool.cn/community/013c4b595c63c2a8012193a3879fd9.jpg@1280w_1l_2o_100sh.jpg','http://imgsrc.baidu.com/imgad/pic/item/37d12f2eb9389b50c1ba3e7a8e35e5dde7116e55.jpg'],state:1,editor:false},
                   {name:'14.8套餐',PackageType:'简易套餐',dishesSub:'鸡丁米线，赤豆酿酒',MoreAM:{spicy:4,recommended:3,pinyin:'178TC',number:28},price:'19.001',PackagePrice:'14.80',VipPrice:'14.80',picture:['http://imgsrc.baidu.com/imgad/pic/item/a686c9177f3e670901b39ad730c79f3df8dc5563.jpg','http://img.zcool.cn/community/01dc55572d6d8b6ac725b690771103.jpg@3000w_1l_2o_100sh.jpg'],state:1,editor:false},
                   {name:'14.8套餐',PackageType:'水果套餐',dishesSub:'鸡丁米线，赤豆酿酒',MoreAM:{spicy:4,recommended:2,pinyin:'198TC',number:11},price:'19.002',PackagePrice:'14.80',VipPrice:'14.80',picture:['http://img.zcool.cn/community/013c4b595c63c2a8012193a3879fd9.jpg@1280w_1l_2o_100sh.jpg','http://imgsrc.baidu.com/imgad/pic/item/37d12f2eb9389b50c1ba3e7a8e35e5dde7116e55.jpg'],state:1,editor:false},
                   {name:'14.8套餐',PackageType:'简易套餐',dishesSub:'鸡丁米线，赤豆酿酒',MoreAM:{spicy:2,recommended:3,pinyin:'108TC',number:23},price:'19.001',PackagePrice:'14.80',VipPrice:'14.80',picture:['http://imgsrc.baidu.com/imgad/pic/item/a686c9177f3e670901b39ad730c79f3df8dc5563.jpg','http://img.zcool.cn/community/01dc55572d6d8b6ac725b690771103.jpg@3000w_1l_2o_100sh.jpg'],state:1,editor:false},
                   {name:'14.8套餐',PackageType:'水果套餐',dishesSub:'鸡丁米线，赤豆酿酒',MoreAM:{spicy:4,recommended:5,pinyin:'128TC',number:22},price:'19.002',PackagePrice:'14.80',VipPrice:'14.80',picture:['http://img.zcool.cn/community/013c4b595c63c2a8012193a3879fd9.jpg@1280w_1l_2o_100sh.jpg','http://imgsrc.baidu.com/imgad/pic/item/37d12f2eb9389b50c1ba3e7a8e35e5dde7116e55.jpg'],state:1,editor:false},
                   {name:'14.8套餐',PackageType:'简易套餐',dishesSub:'鸡丁米线，赤豆酿酒',MoreAM:{spicy:3,recommended:3,pinyin:'118TC',number:66},price:'19.001',PackagePrice:'14.80',VipPrice:'14.80',picture:['http://imgsrc.baidu.com/imgad/pic/item/a686c9177f3e670901b39ad730c79f3df8dc5563.jpg','http://img.zcool.cn/community/01dc55572d6d8b6ac725b690771103.jpg@3000w_1l_2o_100sh.jpg'],state:1,editor:false},
                   {name:'14.8套餐',PackageType:'水果套餐',dishesSub:'鸡丁米线，赤豆酿酒',MoreAM:{spicy:4,recommended:3,pinyin:'138TC',number:29},price:'19.002',PackagePrice:'14.80',VipPrice:'14.80',picture:['http://img.zcool.cn/community/013c4b595c63c2a8012193a3879fd9.jpg@1280w_1l_2o_100sh.jpg','http://imgsrc.baidu.com/imgad/pic/item/37d12f2eb9389b50c1ba3e7a8e35e5dde7116e55.jpg'],state:1,editor:false},
                   {name:'14.8套餐',PackageType:'简易套餐',dishesSub:'鸡丁米线，赤豆酿酒',MoreAM:{spicy:1,recommended:3,pinyin:'248TC',number:88},price:'19.001',PackagePrice:'14.80',VipPrice:'14.80',picture:['http://imgsrc.baidu.com/imgad/pic/item/a686c9177f3e670901b39ad730c79f3df8dc5563.jpg','http://img.zcool.cn/community/01dc55572d6d8b6ac725b690771103.jpg@3000w_1l_2o_100sh.jpg'],state:1,editor:false},
                   {name:'14.8套餐',PackageType:'水果套餐',dishesSub:'鸡丁米线，赤豆酿酒',MoreAM:{spicy:0,recommended:1,pinyin:'348TC',number:25},price:'19.002',PackagePrice:'14.80',VipPrice:'14.80',picture:['http://img.zcool.cn/community/013c4b595c63c2a8012193a3879fd9.jpg@1280w_1l_2o_100sh.jpg','http://imgsrc.baidu.com/imgad/pic/item/37d12f2eb9389b50c1ba3e7a8e35e5dde7116e55.jpg'],state:1,editor:false},
                ],
                submitList:[
                    {id: "1",money: 21,specifications:'大份',name: "好吃的饺子",num: 1,type: 1,children:[
                        {type:1,id:'7',name:'吃西瓜撑不死你',money:11,specifications:'大份',price:0,num: 1,},//有备选内容时数据
                    ]},
                    {id: "1",money: 21,specifications:'大份',name: "好吃的饺子",num: 1,type: 1,children:[]},//无备选数据时
                ],//提交的数据/已经选择的数据
                isOperation:false,//是否正在备选操作
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
        mounted(){
               
        },
        created(){
            
        },
        methods:{
            // 删除上传图片list 中某个图片
            deleteImgList(k){
                this.isShowDeletBtn=false;
                this.$confirm('此操作将删除此图片, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // 
                    this.ImgList.splice(k,1);
                    // 
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    // 控制删除按钮是否显示
                    this.isShowDeletBtn=true; 
                    this.showDeletBtn=-1;
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });   
                    // 控制删除按钮是否显示
                    this.isShowDeletBtn=true; 
                    this.showDeletBtn=-1;      
                });
            },
            // 初始化swiper 
            Initialize(){
                var mySwiper = new Swiper ('.swiper-container', {
                    observer:true,//将observe应用于Swiper的父元素。
                    observeParents:true,//当Swiper的父元素变化时，例如window.resize，Swiper更新。
                    slidesPerView : 'auto',
                    // 如果需要前进后退按钮
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                    // 如果需要滚动条
                    scrollbar: {
                        el: '.swiper-scrollbar',
                    },
                })        
            }, 
            // 上传图片成功时函数
            updataImg(response, file, fileList){
                console.log(response, file, fileList)
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            },
            // 导出数据事件
            ExportData(){
                this.$confirm('此操作将导出全部菜品数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'info'
                }).then(() => {
                    //excel数据导出
                    require.ensure([], () => {
                        const {
                            export_json_to_excel
                        } = require('../../../../vendor/Export2Excel');
                        const tHeader = ['套餐名','套餐类型','菜品明细','原价（元）','套餐价/套餐优惠价','会员价/会员优惠价','状态'];
                        const filterVal = ['name', 'PackageType', 'dishesSub', 'price', 'PackagePrice', 'VipPrice', 'state' ];
                        const list = this.data_list;
                        const data = this.formatJson(filterVal, list);
                        export_json_to_excel(tHeader, data, '列表excel');
                    })
                    this.$message({
                        type: 'success',
                        message: '已添加到下载队列'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });          
                });
            },
            // 菜品明细change事件
            transferChange(data,e){
                console.log(data)
                this.submitList=data;
                this.isOperation=e;
            },
            // 添加套餐按钮
            addPackage(){
                for(var i=0,len=this.data_list.length;i<len;i++){
                    if(this.data_list[i].editor){
                        this.$message('当前列表中含有正在编辑的内容,请结束后再添加套餐');
                        return 
                    }
                }
                // 设置为添加状态
                this.isAddPackage=true;
                // 在选择区添加一个空套餐
                this.data_list.unshift(
                    {   name:'',
                        PackageType:'',
                        dishesSub:'',
                        price:'',
                        PackagePrice:'',
                        VipPrice:'',
                        picture:[],
                        state:1,
                        editor:true,
                        MoreAM:{spicy:0,recommended:0,pinyin:'',number:''}
                    },
                );
                // 设置编辑编辑数据   防止数据等于内存中的数据
                this.EditSubmission=JSON.parse(JSON.stringify(this.data_list[0]))
            },
            // 弹框内编辑分类 增加分类
            addClassEditor(){
                this.$confirm('此操作将添加一个分类, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // 添加一个分类
                    this.editorClass.push({
                        label:'',
                        name: new Date().getTime()+''// 此数据待定根据接口应变

                    });
                    // 
                    this.$message({
                        type: 'success',
                        message: '已添加'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });          
                });
            },
            // 弹框编辑分类  删除事件
            editorClassDelete(e){
                this.$confirm('此操作将删除该分类以及该分类下所有套餐, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // 删除编辑中的数据
                    this.editorClass.splice(e,1);
                    // 
                    this.$message({
                        type: 'success',
                        message: '已删除'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });          
                });
            },
            // 下载excel模板
            downloadExcel(){
                console.log('下载')
            },
            // 文件上传失败时的钩子
            errorExcel(err, file, fileList){
                console.log(err, file, fileList)
            },
            // 文件列表移除文件时的钩子
            removeExcel(file,fileList){
                console.log(file,fileList)
            },
            // 文件上传成功时的钩子
            successExcel(response,file,fileList){
                console.log(response,file,fileList)
            },
            // 点击显示弹框设置显示模块
            activateMenu(e,data){
                // 设置弹框显示哪个模块
                this.showModule=e;
                // 开启弹框
                this.show_bounced=true
                // 编辑分类时使用
                if(e.index==3){
                    // 先设置 一个对象保存分类所有信息  用于修改  绑定input
                    this.editorClass=JSON.parse(JSON.stringify(this.footClass));
                }
                // 此处异步初始化 swiper 
                if(e.index==7){
                    // 设置编辑 上传图片数据  保存已经添加过的图片给用户浏览 
                    this.ImgList=JSON.parse(JSON.stringify(this.EditSubmission.picture))
                    setTimeout(()=>{
                        this.Initialize()
                    },200)
                    console.log(23)
                }
                // 编辑时
                if(e.index==8){
                    // 设置编辑数据绑定
                    this.EditPlayData=JSON.parse(JSON.stringify(this.EditSubmission.MoreAM))
                }
                // 查看 时
                if(e.index==9){
                    // 设置绑定数据预览
                    this.EditPlayData=JSON.parse(JSON.stringify(data))
                    // 设置禁用
                    this.EditPlay=true;
                    // 设置显示弹框   
                    this.showModule.index=8;
                    // 驱动视图更新 
                    this.indexs++;
                }
            },
            //弹框确定事件
            confirmOk(e){
                console.log(e)
                if(e==1){
                    // 批量导入
                }else if(e==2){
                    // 增加分类
                    // 如果为空  则提醒用户
                    if(this.Class_name==''){
                        this.$message({
                            message: '分类名称不可为空,请填写分类',
                            type: 'warning'
                        });
                        return;
                    }
                    // 判断分类中是否含有当前填写的分类名称
                    for(var i=0,len=this.footClass.length;i<len;i++){
                        if(this.footClass[i].label===this.Class_name){
                            this.$message({
                                message: '当前分类中已经含有该分类,请更换分类名称',
                                type: 'warning'
                            });
                            return;
                        }
                    }
                    // 此处填写请求 成功后添加到this.footClass数组中
                    this.footClass.push({
                        label:this.Class_name+'',
                        name:  new Date().getTime()+''//此处更具接口来应变
                    })
                    this.$message({
                        message: '添加成功!',
                        type: 'success'
                    });
                    // 关闭弹框   且清除输入框内容
                    this.show_center=false;
                    this.Class_name='';
                }else if(e==3){
                    // 编辑分类
                    console.log(this.editorClass)
                    var arr=[];
                    // 判断是否有重复值
                    for(var i=0,len=this.editorClass.length;i<len;i++){
                        if(arr.indexOf(this.editorClass[i].label)==-1){
                            arr.push(this.editorClass[i].label)
                        }else{
                            this.$message({
                                message: '分类 '+(i+1)+' 与分类 '+(arr.indexOf(this.editorClass[i].label)+1)+' 名称重复,请更换其他分类名称',
                                type: 'warning'
                            }); 
                            return;
                        }
                    }
                    // 
                    this.$confirm('此操作将会改变原菜品分类, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        // 执行请求   请求完成  赋值给 this.footClass
                        this.footClass=JSON.parse(JSON.stringify(this.editorClass))
                        // 关闭弹框  且清除编辑中的数据
                        this.show_center=false;
                        this.editorClass=[];
                        this.$message({
                            type: 'success',
                            message: '修改成功!'
                        });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消'
                        });          
                    });
                }else if(e==6){
                    // 菜品明细操作
                    if(this.isOperation){
                        // 正在操作备选框
                        this.$message({
                            type: 'info',
                            message: '当前正在操作备用选项，请等待操作完成完成再提交！'
                        });          
                    }else{
                        // 提交
                        console.log('操作的数据',this.submitList)
                    }
                }
            },
            // 弹框 关闭事件{
            quiet_box(){
                this.show_center=false;
                this.EditPlay=false;
                this.$message({
                    duration:1000,
                    type: 'info',
                    message: '已取消'
                }); 
            },
            // swich开关事件
            switchChange(data){
                if(data){
                    this.EditSubmission.state=1 
                }else{
                    this.EditSubmission.state=2
                }
                console.log(this.EditSubmission.state)
            },
            deleteCoom(k,data){
                this.$confirm('此操作将删除第'+(k+1)+'条数据, 是否继续?', '提示', {
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
            },
            // 编辑 / 保存
            TheEditor(e,k,datas){
                // 防止传递过来的datas值为内存中保存的原数据
                var data=JSON.parse(JSON.stringify(datas))
                // 如果有正在编辑的项目 则 阻断此次编辑
                for(var i=0,len=this.data_list.length;i<len;i++){
                    if(this.data_list[i].editor==true&&!(k==i)){
                        if(e==1){
                            this.$confirm('是否放弃第'+(i+1)+'条编辑的内容？', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'warning'
                            }).then(() => {
                                this.data_list[i].editor=false
                                this.data_list[k].editor=true
                                this.EditSubmission=data;
                                // 设置swich开关是否开启
                                this.value2=this.EditSubmission.state==1;
                                
                                // 恢复状态
                                if(this.isAddPackage){
                                    this.data_list.splice(0,1);
                                }
                                this.isAddPackage=false;

                                this.$message({
                                    type: 'success',
                                    message: '放弃成功!'
                                });
                            }).catch(() => {
                                this.$message({
                                    type: 'info',
                                    message: '已取消放弃'
                                });          
                            });
                        }else{
                            this.deleteCoom(k,data)        
                        }
                        return
                    }
                }
                if(e==1){
                    // 编辑
                    // 设置为添加状态
                    this.isAddPackage=false;
                    // 修改状态
                    this.data_list[k].editor=true
                    this.EditSubmission=data;
                    // 设置swich开关是否开启
                    this.value2=this.EditSubmission.state==1;

                }else if(e==2){
                    console.log(this.EditSubmission)
                    // 验证不能为空
                    if(this.EditSubmission.name==''){
                        // 套餐名不能为空
                        this.$message({
                            message: '套餐名不能为空',
                            type: 'warning'
                        });
                        return
                    }else if(this.EditSubmission.PackageType==''){
                        // 请选择套餐类型
                        this.$message({
                            message: '请选择套餐类型',
                            type: 'warning'
                        });
                        return
                    }
                    // 保存
                    if(this.isAddPackage){
                        // 添加时 保存
                        // activeName2  分类tab  唯一标识
                        this.data_list[k]=this.EditSubmission;
                        this.EditSubmission.editor=false
                        // this.data_list[k]
                    }else{
                        // 编辑时 保存
                        console.log(k)
                        this.data_list[k]=this.EditSubmission;
                        this.data_list[k].editor=false
                    }
                    this.EditSubmission={}
                }else if(e==3){
                    // 取消
                    if(this.isAddPackage){
                        // 添加时
                        this.data_list.splice(0,1);
                    }else{
                        // 编辑时
                        this.data_list[k].editor=false;
                    }
                    this.EditSubmission={}
                }else{
                    // 删除
                    this.deleteCoom(k,data)  
                }
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
            // tabs点击事件
            handleClick(){
                console.log(this.activeName2)
            },
            //重置和搜索按钮
            seachAndClear(e){
                if(e==1){
                    // 搜索
                    console.log(this.area_name)
                }else{
                    // 重置
                    this.area_name='';
                }
            },
        }
    }
</script>

<style scoped>
    .float_right{
        float: right;
    }
    .tabel_list_body{
        margin-top:10px;
    }
    .pageBtn{
        margin: 20px auto 0 auto;
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
    }
    table>tr>td:last-child{
        width:200px;
    }
    .box_input{
        width:425px;
        margin: auto;
        padding:5px 0;
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
    .showLongBox{
        width:1100px;
    }
    .commonC{
        display: inline-block;
        margin-top:20px;
        box-sizing: border-box;
        /* padding:10px; */
        vertical-align: top;
    }
    .swiper-container {
        width: 100%;
        height: calc(100% - 5px);
        background:#fff;
    }
    .swiper-slide{
        width:auto;
        position: relative;  
    }  
    .swiper-slide img{
        height:100%;
    }
    .commonCtwo{
        height:200px;
        border:10px solid #eee;
        border-radius:5px;
    }
    .commonCtwoBody{
        width:100%;
        height:100%;
    }
    .swiper-button-prev{
        left:0;
        background-image: url('../../../../assets/png/left.png');
    }
    .swiper-button-next{
        right:0;
        background-image: url('../../../../assets/png/right.png');
    }
    .swiper-button-next,.swiper-button-prev{
        background-color:rgba(0,0,0,0.5);
        background-size: 80%
    }
    .swiper-button-next.swiper-button-disabled, .swiper-button-prev.swiper-button-disabled{
        opacity: .3;
    }
    .delet_Img{
        width:100%;
        height:100%;
        background: rgba(0,0,0,0.5);
        position: absolute;
        top:0;
        left:0;
    }
    .btns_imgs{
        width:50px;
        height:50px;
        position: absolute;
        top:0;
        left:0;
        right:0;
        bottom: 0;
        margin: auto;
        font-size: 45px;
        color:#fff;
        cursor: pointer;
    }
    .indexEleven{
        width:100px;
        text-align: right;
        padding-right: 10px;
    }
    .box_input8{
        width:545px;
    }
</style>