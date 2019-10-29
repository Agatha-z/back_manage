<template>
    <div class="store_c">
        <!-- 顶部公共组件 -->
        <comTopHeader
        :padding_c="false"
        :placeholder_txt="'输入门店名称'"
        :select_data="[{index:0,txt:'全部'},{index:1,txt:'直营'},{index:2,txt:'加盟'}]"
        :brand_data="[{index:0,txt:'安少爷米线'},{index:1,txt:'黑暗料理吃不死人'}]"
        :area_data="[{index:0,txt:'合肥'},{index:1,txt:'铜陵'},{index:2,txt:'芜湖'}]"
        @input-change="seachBtn"
        @state-change="stateChange"
        @brand-change="brandChange"
        @area-change="areaChange"
        ></comTopHeader>
        <!--  -->
        <hr>
        <br>
        <div>
            <el-button type="primary" icon="el-icon-plus" @click="show_bounced=true">新增门店</el-button>
        </div>
        <br>
        <!-- 数据 -->
        <div>
            <table class="table_list" border="0" cellspacing="0">
                <tr>
                    <th></th>
                    <th>门店名称</th>
                    <th>所属品牌</th>
                    <th>所属区域</th>
                    <th>门店属性</th>
                    <th>业态</th>
                    <th>操作人</th>
                    <th>创建时间</th>
                    <th>状态</th>
                    <th>使用模板</th>
                    <th>操作</th>
                </tr>
                <tr v-for="(v,k) in data_list" :key="k">
                    <td>{{k+1}}</td>
                    <td>{{v.s_name}}</td>
                    <td>{{v.brand}}</td>
                    <td>{{v.area[0].name+'--'+v.area[1].name+'--'+v.area[2].name}}</td>
                    <td>{{v.attribute}}</td>
                    <td>{{v.formats}}</td>
                    <td>{{v.user}}</td>
                    <td>{{v.time}}</td>
                    <td>
                        <span v-if="v.state==1" style="color:green">{{v.state==1?'启用':''}}</span>
                        <span v-else style="color:red">{{v.state==2?'停用':''}}</span>
                    </td>
                
                    <td>{{v.template}}</td>
                    <td>
                        <el-button type="primary" size="small" icon="el-icon-edit"  @click="operation(1,k,v)">编辑</el-button>
                        <el-button type="warning" v-if="v.state==1" size="small" icon="el-icon-time" @click="operation(2,k)">停用</el-button>
                        <el-button type="success" v-if="v.state==2" size="small" icon="el-icon-time" @click="operation(4,k)">启用</el-button>
                        <el-button type="danger" size="small" icon="el-icon-setting" @click="operation(3,k)">设置权限</el-button>
                    </td>
                </tr>
                <!-- 无数据显示 -->
                <tr v-if="data_list.length<=0">
                    <td colspan="11">
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
        <!-- 新增门店弹框 -->
        <div class="bounced_box"  v-if="show_bounced" @click="quiet_box">
            <transition name="animate_box">
                <div class="center_box" v-if="show_center" @click.stop>
                     <!-- 定位 X -->
                    <div class="position_clear" @click="quiet_box">
                        <i class="el-icon-circle-close"></i>
                    </div>
                    <!-- 头部 -->
                    <div class="title">新增门店</div>
                    <!-- 内容部分 -->
                    <div class="content_scroll">
                        <br>
                        <!--  -->
                        <div class="box_input">
                            <div class="font font_s">所属区域</div>
                            <div>
                                <el-select style="width:300px"  size="medium" v-model="area_select" placeholder="请选择">
                                    <el-option label="合肥" :value="1"></el-option>
                                    <el-option label="铜陵" :value="2"></el-option>
                                    <el-option label="安庆" :value="3"></el-option>
                                </el-select>
                            </div>
                            <div class="font" style="color:red">*</div>
                        </div>
                        <hr>
                        <!--  -->
                        <div class="box_input">
                            <div class="font font_s">门店名称</div>
                            <div>
                                <el-input style="width:300px" v-model="store_name" size="medium" clearable placeholder="请输入区域名称"></el-input>
                            </div>
                            <div class="font" style="color:red">*</div>
                        </div>
                        <hr>
                        <!--  -->
                        <div class="box_input">
                            <div class="font font_s">所属业态</div>
                            <div>
                                <el-select style="width:300px"  size="medium" v-model="P_institutions" placeholder="请选择">
                                    <el-option label="快餐" :value="1"></el-option>
                                    <el-option label="小吃" :value="2"></el-option>
                                    <el-option label="外卖" :value="3"></el-option>
                                </el-select>
                            </div>
                            <div class="font" style="color:red">*</div>
                        </div>
                        <hr>
                        <!--  -->
                        <div class="box_input">
                            <div class="font font_s">门店属性</div>
                            <div style="padding-top:10px;">
                                <el-radio-group v-model="P_radio2">
                                    <el-radio :label="1">直营</el-radio>
                                    <el-radio :label="2">加盟</el-radio>
                                </el-radio-group>
                            </div>
                        </div>
                        <hr>
                        <!--  -->
                        <div class="box_input">
                            <div class="font font_s">权限模板</div>
                            <div>
                                <el-select style="width:300px"  size="medium" v-model="P_template" placeholder="请选择">
                                    <el-option label="直营店模板（系统默认）" :value="1"></el-option>
                                    <el-option label="加盟店店模板（系统默认）" :value="2"></el-option>
                                    <el-option label="高级模板模板" :value="3"></el-option>
                                </el-select>
                            </div>
                        </div>
                        <hr>
                        <!--  -->
                        <div class="box_input">
                            <div class="font font_s">手机号</div>
                            <div>
                                <el-input style="width:300px" v-model="P_phone" size="medium" clearable placeholder="请输入手机号"></el-input>
                            </div>
                            <div class="font" style="color:red">*</div>
                        </div>
                        <hr>
                        <!--  -->
                        <div class="box_input">
                            <div class="font font_s">地理位置</div>
                            <div>
                                <!-- 省市级公共组件 -->
                                <provincial
                                :Level='3'
                                :provinces_n="area_default[0].value"
                                :city_n="area_default[1].value"
                                :area_n="area_default[2].value"
                                @SelectChange="changeAreas"
                                >
                                </provincial>
                            </div>
                        </div>
                        <hr>
                        <!--  -->
                        <div class="box_input">
                            <div class="font font_s">详细地址</div>
                            <div>
                                <el-input style="width:300px" v-model="area_details" size="medium" clearable placeholder="请输入详细地址"></el-input>
                            </div>
                            <div class="font" style="color:red">*</div>
                        </div>
                        <hr>
                        <!--  -->
                        <div class="box_input">
                            <div class="font font_s">激活码</div>
                            <div>
                                <el-input style="width:300px" v-model="Activation_Code" size="medium" clearable placeholder="请输入激活码"></el-input>
                            </div>
                            <div class="font" style="color:red">*</div>
                        </div>
                        <hr>
                        <!--  -->
                        <div class="box_input">
                            <div class="font font_s">用户名</div>
                            <div>
                                <el-input style="width:300px" v-model="user_Name" size="medium" clearable placeholder="请输入用户名"></el-input>
                            </div>
                            <div class="font" style="color:red">*</div>
                        </div>
                        <hr>
                        <!--  -->
                        <div class="box_input">
                            <div class="font font_s">密码</div>
                            <div>
                                <el-input style="width:300px" type="password" v-model="password" size="medium" clearable placeholder="请输入密码"></el-input>
                            </div>
                            <div class="font" style="color:red">*</div>
                        </div>
                        <hr>
                        <!--  -->
                        <div class="box_input">
                            <div class="font font_s">确认密码</div>
                            <div>
                                <el-input style="width:300px" type="password" v-model="ok_password" size="medium" clearable placeholder="请输入确认密码"></el-input>
                            </div>
                            <div class="font" style="color:red">*</div>
                        </div>
                        <hr>
                        <!--  -->
                    </div>
                    <!-- 底部内容 -->
                    <div class="footer_btn">
                        <el-button type="info" size="medium"  @click="quiet_box">取消</el-button>
                        <el-button type="success" size="medium" @click="confirmOk">确认</el-button>
                    </div>
                </div>
            </transition>
        </div>
        <!-- 设置权限弹框 -->
        <div class="bounced_box"  v-if="show_bounced_2" @click="quiet_box">
            <transition name="animate_box">
                <div class="center_box" v-if="show_center_2" @click.stop>
                     <!-- 定位 X -->
                    <div class="position_clear" @click="quiet_box">
                        <i class="el-icon-circle-close"></i>
                    </div>
                    <!-- 头部 -->
                    <div class="title">权限设置</div>
                    <!-- 内容部分 -->
                    <div class="content_scroll">
                        <div class="box_input">
                            <div class="font font_s" style="width:200px;text-align:left;">请选择权限模板</div>
                        </div>
                        <!--  -->
                        <br>
                        <div class="box_input">
                            <el-radio-group v-model="radioPermissions">
                                <el-radio :label="1">备选项1</el-radio>
                                <el-radio :label="2">备选项2</el-radio>
                                <el-radio :label="3">备选项3</el-radio>
                            </el-radio-group>
                        </div>
                    </div>
                    <!-- 底部内容 -->
                    <div class="footer_btn">
                        <el-button type="info" size="medium"  @click="quiet_box">取消</el-button>
                        <el-button type="success" size="medium" @click="okPermissions">确认</el-button>
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
                radioPermissions:1,//设置权限弹框单选绑定值
                ok_password:'',//弹框确认密码
                password:'',//弹框输入密码
                user_Name:'',//弹框用户名
                Activation_Code:'',//弹框激活码
                area_details:'',//弹框详细地址
                area_default:[{name:"",value:""},{name:"",value:""},{name:"",value:""}],//省市级默认选择的数据   默认必须为空
                area_arr:[],//省市级提交数据
                P_phone:'',//弹框手机号
                P_template:1,//弹框权限模板
                P_radio2:1,//弹框门店属性单选框
                P_institutions:'',//弹框所属业态
                store_name:'',//弹框门店名称
                area_select:'',//弹框所属区域选择
                show_center:false,//新增弹框内层框是否显示
                show_bounced:false,//是否显示增加岗位弹框
                show_center_2:false,//弹框内层框是否显示
                show_bounced_2:false,//是否显示增加岗位弹框
                pageIndex:1,//当前页数
                pageSize:10,//每页显示条数
                data_list:[ //渲染数据
                    {s_name:'安少爷米线（三里庵店）',brand:'安少爷米线',attribute:'直营',area:[ { "name": "安徽省", "value": "340000" }, { "name": "铜陵市", "value": "340700" }, { "name": "义安区", "value": "340706" } ],formats:'快餐',user:'魏大勋',time:'2018-10-23 20:23:45',state:1,template:'直营店模板（系统默认）'},
                    {s_name:'安少爷米线（三里庵店）',brand:'安少爷米线',attribute:'直营',area:[ { "name": "安徽省", "value": "340000" }, { "name": "合肥市", "value": "340100" }, { "name": "蜀山区", "value": "340104" } ],formats:'快餐',user:'魏大勋',time:'2018-10-23 20:23:45',state:1,template:'直营店模板（系统默认）'},
                    {s_name:'安少爷米线（三里庵店）',brand:'安少爷米线',attribute:'直营',area:[ { "name": "安徽省", "value": "340000" }, { "name": "合肥市", "value": "340100" }, { "name": "长丰县", "value": "340121" } ],formats:'快餐',user:'魏大勋',time:'2018-10-23 20:23:45',state:1,template:'直营店模板（系统默认）'},
                    {s_name:'安少爷米线（三里庵店）',brand:'安少爷米线',attribute:'直营',area:[ { "name": "安徽省", "value": "340000" }, { "name": "芜湖市", "value": "340200" }, { "name": "三山区", "value": "340208" } ],formats:'快餐',user:'魏大勋',time:'2018-10-23 20:23:45',state:1,template:'直营店模板（系统默认）'},
                    {s_name:'安少爷米线（三里庵店）',brand:'安少爷米线',attribute:'直营',area:[ { "name": "安徽省", "value": "340000" }, { "name": "铜陵市", "value": "340700" }, { "name": "义安区", "value": "340706" } ],formats:'快餐',user:'魏大勋',time:'2018-10-23 20:23:45',state:1,template:'直营店模板（系统默认）'},
                    {s_name:'安少爷米线（三里庵店）',brand:'安少爷米线',attribute:'直营',area:[ { "name": "黑龙江省", "value": "230000" }, { "name": "齐齐哈尔市", "value": "230200" }, { "name": "梅里斯达斡尔族区", "value": "230208" } ],formats:'快餐',user:'魏大勋',time:'2018-10-23 20:23:45',state:1,template:'直营店模板（系统默认）'},
                    {s_name:'安少爷米线（三里庵店）',brand:'安少爷米线',attribute:'直营',area:[ { "name": "黑龙江省", "value": "230000" }, { "name": "齐齐哈尔市", "value": "230200" }, { "name": "梅里斯达斡尔族区", "value": "230208" } ],formats:'快餐',user:'魏大勋',time:'2018-10-23 20:23:45',state:1,template:'直营店模板（系统默认）'},
                    {s_name:'安少爷米线（三里庵店）',brand:'安少爷米线',attribute:'直营',area:[ { "name": "黑龙江省", "value": "230000" }, { "name": "齐齐哈尔市", "value": "230200" }, { "name": "梅里斯达斡尔族区", "value": "230208" } ],formats:'快餐',user:'魏大勋',time:'2018-10-23 20:23:45',state:1,template:'直营店模板（系统默认）'},
                    {s_name:'安少爷米线（三里庵店）',brand:'安少爷米线',attribute:'直营',area:[ { "name": "黑龙江省", "value": "230000" }, { "name": "齐齐哈尔市", "value": "230200" }, { "name": "梅里斯达斡尔族区", "value": "230208" } ],formats:'快餐',user:'魏大勋',time:'2018-10-23 20:23:45',state:1,template:'直营店模板（系统默认）'},
                ],
            }
        },
        methods:{
            //省市级回调函数
            changeAreas(data){
                console.log(data)
                this.area_arr=data
            },
            // 权限设置确认事件
            okPermissions(){
                console.log(232323)
            },
            // 弹框 关闭事件{
            quiet_box(){
                this.show_center=false;
                this.show_center_2=false;
                this.$message({
                    duration:1000,
                    type: 'info',
                    message: '已取消'
                }); 
            },
            //新增弹框确定事件
            confirmOk(){
                console.log(23232323)
            },
            // 搜索框按钮点击事件
            seachBtn(data){
                console.log(data)
            },
            //状态栏change事件
            stateChange(data){
                console.log(data)
            },
            //所属品牌change事件
            brandChange(e){
                console.log(e)
            },
            //所属品牌change事件
            areaChange(e){
                console.log(e)
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
            // 操作按钮 启用/停用/设置权限
            operation(e,k,data){
                if(e==1){
                    // 编辑
                    // 打开弹框
                    this.show_bounced=true;
                    // 设置默认选择省市级
                    this.area_default=data.area;
                    // 设置提交地址
                    this.area_arr=data.area;
                }else if(e==2){
                    // 停用
                    this.$confirm('此操作将停用该门店, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        // 停用当前数据
                        this.data_list[k].state=2;
                        this.$message({
                            duration:1000,
                            type: 'success',
                            message: '停用成功!'
                        });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            duration:1000,
                            message: '已取消'
                        });          
                    });
                }else if(e==3){
                    // 设置权限
                    // 打开弹框
                    this.show_bounced_2=true;
                }else{
                    // 启用
                    this.$confirm('此操作将启用该门店, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        // 停用当前数据
                        this.data_list[k].state=1;
                        this.$message({
                            duration:1000,
                            type: 'success',
                            message: '启用成功!'
                        });
                    }).catch(() => {
                        this.$message({
                            duration:1000,
                            type: 'info',
                            message: '已取消'
                        });          
                    });
                }
            }
        },
        watch:{
            // 监听动画
            show_center(){
                if(!this.show_center){
                    setTimeout(()=>{
                        this.show_bounced=false
                    },200)
                }
            },
            // 监听动画
            show_bounced(){
                if(this.show_bounced){
                    setTimeout(()=>{
                        this.show_center=true
                    },0)
                }
            },
            // 监听动画
            show_center_2(){
                if(!this.show_center_2){
                    setTimeout(()=>{
                        this.show_bounced_2=false
                    },200)
                }
            },
            // 监听动画
            show_bounced_2(){
                if(this.show_bounced_2){
                    setTimeout(()=>{
                        this.show_center_2=true
                    },0)
                }
            },
        },
    }
</script>

<style scoped>
    hr{
        width:100%;
        margin:8px auto;
        border: 0;
        height: 1px;
        background:#eee;
    }
    .pageBtn{
        margin: 20px auto 0 auto;
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
    }
    .box_input{
        width:550px;
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
    .box_input .font_s{
        width:100px;
        text-align: right;
    }
    .box_input div:last-child{
        margin-right:0;
    }
</style>