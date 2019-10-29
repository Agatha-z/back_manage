<!-- 变价设置 -->
<template>
    <div class="postPre">
        <dishesHeader
        @selectChange="selectChange"
        @state-change="stateChange"
        @input-change="seachChange"
        :placeholder_txt="'输入菜品名称/变价原因'"
        :select_data="[{index:0,txt:'全部'},{index:1,txt:'启用'},{index:2,txt:'停用'}]"></dishesHeader>
        <br>
        <div class="commonHeader_style">
            <div>
                <el-button type="primary" @click="show_bounced=true,popBox={index:0,title:'新增变价单'}" icon="el-icon-plus">新增变价单</el-button>
                <el-button type="primary" size="medium" @click="exportExcel">批量导出<i class="el-icon-printer el-icon--right"></i></el-button>
            </div>
            <br>
            <!-- 数据 -->
            <div>
                <table class="table_list" border="0" cellspacing="0">
                    <tr>
                        <th></th>
                        <th>菜品名称</th>
                        <th>原价标准</th>
                        <th>变后标准价</th>
                        <th>原会员价</th>
                        <th>变后会员价</th>
                        <th>变价原因</th>
                        <th>生效时间</th>
                        <th>状态</th>
                        <th>操作人</th>
                        <th>操作时间</th>
                        <th>操作</th>
                    </tr>
                    <!-- {name:'鸭血',original_P:7.00,Later_P:5.00,
                    original_Vip:7.00,Later_Vip:5.00,user:'魏大勋',effect_time:'2018-10-30 23:00',state:1,set_time:'2018-11-30 23:00'} -->
                    <tr v-for="(v,k) in data_list" :key="k">
                        <td>{{k+1}}</td>
                        <td>{{v.name}}</td>
                        <td>{{v.original_P.toFixed(2)}}</td>
                        <td>
                            <span>{{v.Later_P.toFixed(2)}}</span>
                            <span style="color:#428bca;cursor:pointer;" @click="TrendChart(k)">趋势图</span>
                        </td>
                        <td>{{v.original_Vip.toFixed(2)}}</td>
                        <td>{{v.Later_Vip.toFixed(2)}}</td>
                        <td>{{v.why}}</td>
                        <td>{{v.effect_time}}</td>
                        <td>
                            <span v-if="v.state==1" style="color:green">{{v.state==1?'启用':''}}</span>
                            <span v-else style="color:red">{{v.state==2?'停用':''}}</span>
                        </td>
                        <td>{{v.user}}</td>
                        <td>{{v.set_time}}</td>
                        <td>
                            <el-button type="primary" size="small" icon="el-icon-edit" @click="operation(1,k,v)">编辑</el-button>
                            <el-button type="warning" v-if="v.state==1" size="small" icon="el-icon-time" @click="operation(2,k)">停用</el-button>
                            <el-button type="success" v-if="v.state==2" size="small" icon="el-icon-time" @click="operation(4,k)">启用</el-button>
                            <el-button type="info" size="small" icon="el-icon-tickets" @click="operation(3,k)">查看历史</el-button>
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
        </div>
        <div class="bounced_box"  v-if="show_bounced" @click="quiet_box">
            <transition name="animate_box">
                <div class="center_box" v-if="show_center" @click.stop>
                     <!-- 定位 X -->
                    <div class="position_clear" @click="quiet_box">
                        <i class="el-icon-circle-close"></i>
                    </div>
                    <!-- 头部 -->
                    <div class="title">{{popBox.title}}</div>
                    <!-- 内容部分 -->
                    <div class="content_scroll">
                        <div v-if="popBox.index==0">
                            <br>
                            <div class="box_input">
                                <div class="font firstName">选择菜谱</div>
                                <div>
                                    <el-select size="medium" style="width:300px;" v-model="footBindVal" placeholder="请选择">
                                        <el-option v-for="(v,k) in footSelectData" :label="v.label" :value="v.value" :key="k"></el-option>
                                    </el-select>
                                </div>
                            </div>
                            <hr>
                            <!--  -->
                            <div class="box_input">
                                <div class="font firstName">菜品变价</div>
                                <div>
                                    <foodBase
                                    @addChange="addChange">
                                    </foodBase>
                                </div>
                            </div>
                            <hr>
                            <!--  -->
                            <div class="box_input">
                                <div class="font firstName">变价原因</div>
                                <div>
                                    <el-input size="medium" style="width:300px;" v-model="reasonValue" placeholder="请输入内容"></el-input>
                                </div>
                            </div>
                            <hr>
                            <!--  -->
                            <div class="box_input">
                                <div class="font firstName">生效日期</div>
                                <div>
                                    <el-date-picker
                                    size="medium"
                                    style="width:300px;"
                                    v-model="dataValues"
                                    type="date"
                                    placeholder="选择日期">
                                    </el-date-picker>
                                </div>
                            </div>
                            <hr>
                            <!--  -->
                            <div class="box_input" onselectstart="return false">
                                <div class="font firstName">生效机构</div>
                                <div>
                                    <storeSelect
                                    :placeholder="['请选择机构','已选择机构点击下拉按钮查看']"
                                    alignment="top"
                                    :inputWidth="244"></storeSelect>
                                </div>
                            </div>
                            <!--  -->
                        </div>
                        <!-- 编辑弹框 -->
                        <div v-if="popBox.index==1">
                            <br>
                            <div class="box_input">
                                <div class="font firstName">已选菜品</div>
                                <div>
                                    <p class="showNotEditor">{{editorList.name}}</p>
                                </div>
                            </div>
                            <hr>
                            <!--  -->
                            <div class="box_input">
                                <div class="font firstName">原价标准</div>
                                <div>
                                    <p class="showNotEditor">{{editorList.original_P.toFixed(2)}}</p>
                                </div>
                            </div>
                            <hr>
                            <!--  -->
                            <div class="box_input">
                                <div class="font firstName">变后标准价</div>
                                <div>
                                    <el-input-number :precision="2" style="width:300px;" @change="index++" size="medium" v-model="editorList.Later_P" :min="0" label="描述文字"></el-input-number>
                                </div>
                            </div>
                            <hr>
                            <!--  -->
                            <div class="box_input">
                                <div class="font firstName">原会员价</div>
                                <div>
                                    <p class="showNotEditor">{{editorList.original_Vip.toFixed(2)}}</p>
                                </div>
                            </div>
                            <hr>
                            <!--  -->
                            <div class="box_input">
                                <div class="font firstName">变后会员价</div>
                                <div>
                                    <el-input-number @change="index++" style="width:300px;" :precision="2" size="medium" v-model="editorList.Later_Vip" :min="0" label="描述文字"></el-input-number>
                                </div>
                            </div>
                            <hr>
                            <!--  -->
                            <div class="box_input">
                                <div class="font firstName">变价原因</div>
                                <div>
                                    <el-input clearable style="width:300px;" @change="index++" size="medium" v-model="editorList.why" placeholder="请输入内容"></el-input>
                                </div>
                            </div>
                            <hr>
                            <!--  -->
                            <div class="box_input">
                                <div class="font firstName">生效日期</div>
                                <div>
                                    <el-date-picker
                                    @change="index++"
                                    size="medium"
                                    style="width:300px;"
                                    v-model="editorList.effect_time"
                                    type="date"
                                    placeholder="选择日期">
                                    </el-date-picker>
                                </div>
                            </div>
                            <hr>
                            <!--  -->
                            <div class="box_input">
                                <div class="font firstName">生效机构</div>
                                <div>
                                    <storeSelect
                                    :placeholder="['请选择机构','已选择机构点击下拉按钮查看']"
                                    alignment="top"
                                    :inputWidth="244"></storeSelect>
                                </div>
                            </div>
                            <br>
                            <!--  -->
                        </div>
                        <!-- 查看历史弹框 -->
                        <div v-if="popBox.index==2" style="height:100%">
                            <p style="height:40px;line-height:40px;color:red;font-size:18px;padding:0 10px">已选择菜品"鸭血"</p>
                            <div class="box_scroll_tabel">
                                <table class="table_list" border="0" cellspacing="0">
                                    <tr>
                                        <th>原价标准</th>
                                        <th>变后标准价</th>
                                        <th>原会员价</th>
                                        <th>变后会员价</th>
                                        <th>变价原因</th>
                                        <th>生效时间</th>
                                        <th>操作人</th>
                                        <th>操作时间</th>
                                    </tr>
                                    <!-- {name:'鸭血',original_P:7.00,Later_P:5.00,
                                    original_Vip:7.00,Later_Vip:5.00,user:'魏大勋',effect_time:'2018-10-30 23:00',state:1,set_time:'2018-11-30 23:00'} -->
                                    <tr v-for="(v,k) in historyList" :key="k">
                                        <td>{{v.original_P.toFixed(2)}}</td>
                                        <td>{{v.Later_P.toFixed(2)}}</td>
                                        <td>{{v.original_Vip.toFixed(2)}}</td>
                                        <td>{{v.Later_Vip.toFixed(2)}}</td>
                                        <td>{{v.why}}</td>
                                        <td>{{v.effect_time}}</td>
                                        <td>{{v.user}}</td>
                                        <td>{{v.set_time}}</td>
                                    </tr>
                                    <!-- 无数据显示 -->
                                    <tr v-if="historyList.length<=0">
                                        <td colspan="8">
                                            <p style="color:#999">暂无操作历史</p>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                        <!-- 菜品趋势图 -->
                        <div v-if="popBox.index==3">
                            <div id="container" style="width: 600px;height:400px;margin:auto;"></div>
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
                historyList:[ //查看历史数据
                    {original_P:7.00,Later_P:5.00,original_Vip:7.00,Later_Vip:5.00,user:'魏大勋',why:'加价',effect_time:'2018-10-30 23:00',set_time:'2018-11-30 23:00'},
                ],
                index:0,//驱动视图更新
                editorList:{name:'',original_P:0,Later_P:0,original_Vip:0,Later_Vip:0,why:'',effect_time:''},//编辑中的数据
                dataValues:'',//选择生效日期绑定数据
                reasonValue:'',//下拉框变价原因
                footSelectData:[ //菜谱下拉框数据
                    {label:'门店通用菜谱',value:1},
                    {label:'门店通用菜谱1',value:2},
                    {label:'门店通用菜谱2',value:3},
                    {label:'门店通用菜谱3',value:4},
                    {label:'门店通用菜谱4',value:5},
                    {label:'门店通用菜谱5',value:6},
                ],
                footBindVal:1,//新增变价菜谱选择
                popBox:{index:-1,title:''},//弹出框娴熟
                dateValue:'',//弹框选择的时间
                P_name:'',//新增菜谱名称
                data_list:[
                   {name:'鸭血',original_P:7.00,Later_P:5.00,original_Vip:7.00,Later_Vip:5223.00,user:'魏大勋',why:'加价',effect_time:'2018-10-30 23:00',state:1,set_time:'2018-11-30 23:00'},
                   {name:'鸡血',original_P:17.00,Later_P:85.00,original_Vip:799.00,Later_Vip:5223.00,user:'邓超',why:'加价乍地',effect_time:'2018-10-30 23:00',state:1,set_time:'2018-11-30 23:00'},
                   {name:'鹅血',original_P:27.00,Later_P:75.00,original_Vip:897.00,Later_Vip:5123.00,user:'赵丽颖',why:'加价怎么了',effect_time:'2018-10-30 23:00',state:1,set_time:'2018-11-30 23:00'},
                   {name:'鸟血',original_P:37.00,Later_P:65.00,original_Vip:777.00,Later_Vip:512.00,user:'杨幂',why:'我他妈加价',effect_time:'2018-10-30 23:00',state:1,set_time:'2018-11-30 23:00'},
                   {name:'猪血',original_P:47.00,Later_P:55.00,original_Vip:67.00,Later_Vip:545.00,user:'江疏影',why:'物理加价',effect_time:'2018-10-30 23:00',state:1,set_time:'2018-11-30 23:00'},
                   {name:'猫血',original_P:57.00,Later_P:45.00,original_Vip:237.00,Later_Vip:5234.00,user:'宋祖儿',why:'化学加价',effect_time:'2018-10-30 23:00',state:1,set_time:'2018-11-30 23:00'},
                   {name:'狗血',original_P:67.00,Later_P:53.00,original_Vip:27.00,Later_Vip:523.00,user:'倪妮',why:'加价不服',effect_time:'2018-10-30 23:00',state:1,set_time:'2018-11-30 23:00'},
                   {name:'猴血',original_P:77.00,Later_P:52.00,original_Vip:37.00,Later_Vip:566.00,user:'黄家驹',why:'加价了乍地',effect_time:'2018-10-30 23:00',state:1,set_time:'2018-11-30 23:00'},
                   {name:'蛇血',original_P:87.00,Later_P:534.00,original_Vip:117.00,Later_Vip:2235.00,user:'陈乔恩',why:'加了价怎么滴了',effect_time:'2018-10-30 23:00',state:1,set_time:'2018-11-30 23:00'},
                   {name:'虎血',original_P:97.00,Later_P:58.00,original_Vip:127.00,Later_Vip:1225.00,user:'王八蛋',why:'就他妈加价',effect_time:'2018-10-30 23:00',state:1,set_time:'2018-11-30 23:00'},
                ],
                show_center:false,//弹框内层框是否显示
                show_bounced:false,//是否显示增加岗位弹框
                pageIndex:1,//当前页数
                pageSize:10,//每页显示条数

            }
        },
        created(){
            console.log('变价设置')
        },
        methods:{
            // 趋势图按钮
            TrendChart(k){
                // 打开弹框
                this.show_bounced=true;
                this.popBox={index:3,title:'菜品趋势图'}
                // 设置echart 图标数据
                var data=[
                    {name:'吃',value:12},
                    {name:'饭',value:3},
                    {name:'不',value:13},
                    {name:'吃',value:8},
                    {name:'鸡',value:9},
                ];
                this.EchartCommon(data)
            },
            // 公共图标趋势图---初始化  Echart
            EchartCommon(data){
                var data_s=JSON.parse(JSON.stringify(data));
                var X_data=[];//纵轴 显示name
                var Y_data=[];//横轴 数据value
                for(var i=0,len=data_s.length;i<len;i++){
                    X_data.push(data_s[i].name);
                    Y_data.push(data_s[i].value);
                }
                setTimeout(()=>{
                    var dom = document.getElementById("container");
                    var myChart = echarts.init(dom);
                    var app = {};
                    var option = null;
                    var option = {
                        tooltip : {
                            trigger: 'axis',
                            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                                type : 'line'        // 默认为直线，可选为：'line' | 'shadow'
                            }
                        },
                        xAxis: {
                            type: 'category',
                            data: X_data
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: [{
                            name:'趋势图',
                            data: Y_data,
                            type: 'line'
                        }]
                    };
                    if (option && typeof option === "object") {
                        myChart.setOption(option, true);
                    }
                },150)
            },
            // 菜品变价事件
            addChange(data){
                console.log(data)
            },
            // 批量导出数据
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            },
            exportExcel(){
                this.$confirm('此操作将导出全部菜品数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'info'
                }).then(() => {
                    //excel数据导出
                    require.ensure([], () => {
                        const {
                            export_json_to_excel
                        } = require('../../../vendor/Export2Excel');
                        const tHeader = ['菜品名称','原价标准','变后标准价','原会员价','便后会员价','变价原因','生效时间','状态','操作人','操作时间'];
                        const filterVal = ['name', 'original_P', 'Later_P', 'original_Vip', 'Later_Vip', 'why', 'effect_time', 'state', 'user', 'set_time' ];
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
            // 弹框门店选择事件
            TBoxstateChage(data){
                console.log(data)
            },
            // 搜索框事件
            seachChange(e){
                console.log(e)
            },
            // 状态栏事件
            stateChange(e){
                console.log(e)
            },
            // 门店选择事件
            selectChange(e){
                console.log(e)
            },
            // 操作按钮 启用/停用/删除
            operation(e,k,data){
                if(e==1){
                    // 编辑
                    this.show_bounced=true;
                    // 设置编辑数据
                    this.editorList=JSON.parse(JSON.stringify(this.data_list[k]))
                    // 打开弹框
                    this.popBox={index:1,title:'编辑'};
                }else if(e==2){
                    // 停用
                    this.$confirm('此操作将停用该岗位, 是否继续?', '提示', {
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
                    // 查看历史
                    this.show_bounced=true;
                    // 打开弹框
                    this.popBox={index:2,title:'查看历史'};
                }else{
                    // 启用
                    this.$confirm('此操作将启用该岗位, 是否继续?', '提示', {
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
                console.log(e,k)
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
            // 弹框 关闭事件{
            quiet_box(){
                this.show_center=false;
                this.$message({
                    duration:1000,
                    type: 'info',
                    message: '已取消'
                }); 
            },
            //弹框确定事件
            confirmOk(){
                console.log('确认新增菜谱')
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
    }
</script>

<style scoped>
    .postPre{
        padding:10px;
    }
    .pageBtn{
        margin: 20px auto 0 auto;
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
    }
    .box_input{
        width:700px;
        margin: auto;
        padding:4px 0;
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
    .titles_head{
        font-size: 14px;
        color:#666;
    }
    .firstName{
        width:150px;
        text-align: right;
    }
    .showNotEditor{
        width:282px;
        padding:8px;
        text-indent: 7px;
        border:1px solid #eee;
        border-radius:5px;
        color:#666;
        background:#f2f2f2;
        font-size:14px;
    }
    .box_scroll_tabel{
        height:calc(100% - 40px);
        width:100%;
        padding:5px 10px;
        box-sizing: border-box;
        overflow: auto;
    }
</style>