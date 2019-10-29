<template>
    <div>
        <div>
            
            <!-- <span style="font-size:18px;font-weight:600;">所属品牌</span>&nbsp;&nbsp;&nbsp;
            <el-select style="width:250px"  size="medium" v-model="name_in" placeholder="请选择">
                <el-option label="快餐" :value="1"></el-option>
                <el-option label="小吃" :value="2"></el-option>
                <el-option label="外卖" :value="3"></el-option>
            </el-select>
            
            &nbsp;&nbsp;&nbsp; -->
            <span style="font-size:18px;font-weight:600;">区域名称</span>&nbsp;&nbsp;&nbsp;
            <el-input style="width:250px" v-model="area_name" size="medium" clearable placeholder="请输入品牌名称"></el-input>
            <!--  -->
            &nbsp;&nbsp;&nbsp;
            <el-button type="primary" size="medium" icon="el-icon-search" @click="seachAndClear(1)">搜索</el-button>
            <el-button type="info"  size="medium" icon="el-icon-refresh" @click="seachAndClear(2)">重置</el-button>
        </div>
        <br>
        <div>
            <el-button type="primary" icon="el-icon-plus" @click="show_bounced=true">新增区域</el-button>
        </div>
        <br>
        <!-- 数据 -->
        <div>
            <table class="table_list" border="0" cellspacing="0">
                <tr>
                    <th></th>
                    <th>区域名称</th>
                    <th>所属品牌</th>
                    <th>业态</th>
                    <th>操作人</th>
                    <th>创建时间时间</th>
                    <th>操作</th>
                </tr>
                <tr v-for="(v,k) in data_list" :key="k">
                    <td>{{k+1}}</td>
                    <td>{{v.area[1].name}}</td>
                    <td>{{v.brand}}</td>
                    <td>{{v.formats}}</td>
                    <td>{{v.name}}</td>
                    <td>{{v.time}}</td>
                    <td>
                        <el-button type="primary" size="small" icon="el-icon-edit"  @click="operation(1,k,v)">编辑</el-button>
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
                <div class="center_box" v-if="show_center" @click.stop>
                     <!-- 定位 X -->
                    <div class="position_clear" @click="quiet_box">
                        <i class="el-icon-circle-close"></i>
                    </div>
                    <!-- 头部 -->
                    <div class="title">新增区域</div>
                    <!-- 内容部分 -->
                    <div class="content_scroll">
                        <br>
                        <!--  -->
                        <div class="box_input">
                            <div class="font">所&nbsp;&nbsp;属&nbsp;&nbsp;品&nbsp;&nbsp;牌&nbsp;</div>
                            <div>
                                <el-select style="width:300px"  size="medium" v-model="p_name_s" placeholder="请选择">
                                    <el-option label="安少爷" :value="1"></el-option>
                                    <el-option label="安少爷" :value="2"></el-option>
                                    <el-option label="安少爷" :value="3"></el-option>
                                </el-select>
                            </div>
                            <div class="font" style="color:red">*</div>
                        </div>
                        <hr>
                        <!--  -->
                        <div class="box_input">
                            <div class="font">区&nbsp;&nbsp;域&nbsp;&nbsp;名&nbsp;&nbsp;称&nbsp;</div>
                            <div>
                                <!-- <el-input style="width:300px" v-model="area_name" size="medium" clearable placeholder="请输入区域名称"></el-input> -->
                                <!-- 省市级公共组件 -->
                                <provincial
                                :Level='2'
                                :provinces_n="area_default[0].value"
                                :city_n="area_default[1].value"
                                :area_n="''"
                                @SelectChange="changeAreas"
                                >
                                </provincial>
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
                area_default:[{name:"",value:""},{name:"",value:""}],//省市默认选择的数据   默认必须为空
                area_arr:[],//省市提交数据
                name_in:'',//顶部所属品牌下拉框
                area_name: '',//顶部搜索框区域名称
                p_name_s:'',//弹框所属品牌
                P_institutions:'',//弹框所属业态
                show_center:false,//弹框内层框是否显示
                show_bounced:false,//是否显示增加岗位弹框
                pageIndex:1,//当前页数
                pageSize:10,//每页显示条数
                data_list:[ //渲染数据
                    {area:[ { "name": "天津市", "value": "120100" }, { "name": "天津市辖区", "value": "120000" } ],brand:'西红柿炒鸡蛋',formats:'外卖',name:'程序媛',time:'2018-10-11 20:55:34'},
                    {area:[ { "name": "山西省", "value": "140000" }, { "name": "长治市", "value": "140400" } ],brand:'西红柿炒鸡蛋',formats:'外卖',name:'程序媛',time:'2018-10-11 20:55:34'},
                    {area:[ { "name": "安徽省", "value": "340000" }, { "name": "合肥市", "value": "340100" } ],brand:'西红柿炒鸡蛋',formats:'外卖',name:'程序媛',time:'2018-10-11 20:55:34'},
                    {area:[ { "name": "安徽省", "value": "340000" }, { "name": "合肥市", "value": "340100" } ],brand:'西红柿炒鸡蛋',formats:'外卖',name:'程序媛',time:'2018-10-11 20:55:34'},
                    {area:[ { "name": "安徽省", "value": "340000" }, { "name": "合肥市", "value": "340100" } ],brand:'西红柿炒鸡蛋',formats:'外卖',name:'程序媛',time:'2018-10-11 20:55:34'},
                    {area:[ { "name": "安徽省", "value": "340000" }, { "name": "合肥市", "value": "340100" } ],brand:'西红柿炒鸡蛋',formats:'外卖',name:'程序媛',time:'2018-10-11 20:55:34'},
                    {area:[ { "name": "安徽省", "value": "340000" }, { "name": "合肥市", "value": "340100" } ],brand:'西红柿炒鸡蛋',formats:'外卖',name:'程序媛',time:'2018-10-11 20:55:34'},
                    {area:[ { "name": "安徽省", "value": "340000" }, { "name": "合肥市", "value": "340100" } ],brand:'西红柿炒鸡蛋',formats:'外卖',name:'程序媛',time:'2018-10-11 20:55:34'},
                    {area:[ { "name": "安徽省", "value": "340000" }, { "name": "合肥市", "value": "340100" } ],brand:'西红柿炒鸡蛋',formats:'外卖',name:'程序媛',time:'2018-10-11 20:55:34'},
                    {area:[ { "name": "安徽省", "value": "340000" }, { "name": "合肥市", "value": "340100" } ],brand:'西红柿炒鸡蛋',formats:'外卖',name:'程序媛',time:'2018-10-11 20:55:34'},
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
        created() {
            this.commonGetList()
        },
        methods:{
            // 公共查询
            commonGetList(){
                // this.$axios({
                //     url:'/system/diniArea/list',
                //     method:'get',
                //     params:{
                //         limit:10,
                //         offset:0,
                //         areaname:'',
                //     }
                // }).then((rel)=>{
                //     console.log(rel)
                // })
            },
            //省市级回调函数
            changeAreas(data){
                console.log(data)
                this.area_arr=data
            },
            //重置和搜索按钮
            seachAndClear(e){
                if(e==1){
                    // 搜索
                }else{
                    // 重置
                    this.name_in='';
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
                    // 打开弹框
                    this.show_bounced=true;
                    // 设置默认选择省市级
                    this.area_default=data.area;
                    // 设置提交地址
                    this.area_arr=data.area;
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