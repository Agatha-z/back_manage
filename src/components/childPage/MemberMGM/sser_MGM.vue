<!-- 用户管理 -->
<template>
    <div class="postPre">
        <!-- 头部搜索条件 -->
        <div class="commonHeader_style">
            <div class="padding_tops">
                <span class="title">搜索用户</span>
                <el-input placeholder="请输入手机号/卡号/姓名/昵称" size="medium" style="width:300px;" v-model="seachValue">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </div>
            <!--  -->
            <div class="padding_tops">
                <span class="title">是否关注</span>
                <!--  -->
                <el-radio-group v-model="radio4" size="medium">
                    <el-radio-button :label="0" >不限</el-radio-button>
                    <el-radio-button :label="1">是</el-radio-button>
                    <el-radio-button :label="2">否</el-radio-button>
                </el-radio-group>
                <!--  -->
                <span class="title">关注时间</span>
                <el-date-picker
                size="medium"
                v-model="dateValue1"
                type="date"
                placeholder="选择日期">
                </el-date-picker>
                <!--  -->
                <span class="title">关注门店</span>
                <div style="display: inline-block;">
                    <storeSelect></storeSelect>
                </div>
            </div>
            <!--  -->
            <div class="padding_tops">
                <span class="title">是否领卡</span>
                <!--  -->
                <el-radio-group v-model="radio5" size="medium">
                    <el-radio-button :label="0" >不限</el-radio-button>
                    <el-radio-button :label="1">是</el-radio-button>
                    <el-radio-button :label="2">否</el-radio-button>
                </el-radio-group>
                <!--  -->
                <span class="title">领卡时间</span>
                <el-date-picker
                size="medium"
                v-model="dateValue2"
                type="date"
                placeholder="选择日期">
                </el-date-picker>
                <!--  -->
                <span class="title">领卡门店</span>
                <div style="display: inline-block;">
                    <storeSelect></storeSelect>
                </div>
                <!--  -->
                <div style="display: inline-block;padding:10px 0">
                    <span class="title">领卡渠道</span>
                    <el-select style="width:100px" size="medium" v-model="channel" placeholder="请选择">
                        <el-option label="微信" :value="0"></el-option>
                        <el-option label="门店" :value="1"></el-option>
                    </el-select>
                </div>
            </div>
            <!--  -->
        </div>
        <!-- 中间按钮以及显示 查询道德数据 -->
        <br>
        <div class="commonHeader_style float_centers">
            <div class="div">
                本次为您查询到 <span style="color:red">332</span> 个用户 <span style="color:#999">（总用户数：20189，其中会员数：406）</span>
            </div>
            <div class="div divs2">
                <!-- 新增会员 -->
                <el-button size="small" type="primary" @click="$router.push('/HomePage/AddVip')">
                    新增会员
                    <i class="el-icon-plus"></i>
                </el-button>
                <!-- 导入 -->
                <el-button size="small" @click="openBox({name:'导入会员',index:0})" type="primary">
                    导入会员
                    <i class="el-icon-upload2"></i>
                </el-button>
                <!-- 导出 -->
                <el-button size="small" type="primary" @click="exportExcel">
                    导出用户数据
                    <i class="el-icon-printer"></i>
                </el-button>
            </div>
            <!-- 清除浮动 -->
            <div style="clear: both;"></div>
        </div>
        <!-- 底部显示table表格 以及分页器 -->
        <br>
        <div class="commonHeader_style">
            <table class="table_list table_list_box" border="0" cellspacing="0">
                    <tr>
                        <th></th>
                        <th>姓名</th>
                        <th>昵称</th>
                        <th>等级</th>
                        <th>手机号</th>
                        <th>会员卡号</th>
                        <th>可用余额</th>
                        <th>可用积分</th>
                        <th>操作</th>
                    </tr>
                    <!--  -->
                    <tr v-for="(v,k) in data_list" :key="k">
                        <td>{{k+1}}</td>
                        <td>{{v.name}}</td>
                        <td>{{v.nickname}}</td>
                        <td>{{v.level}}</td>
                        <td>{{v.phoneNumber}}</td>
                        <td>{{v.VipNumber}}</td>
                        <td>{{v.availableMoney}}</td>
                        <td>{{v.availableIntegral}}</td>
                        <td class="link_Font">
                            <a href="javascript:void(0)" @click="openBox({name:'打标签',index:1})">打标签</a>
                            &nbsp;
                            <a href="javascript:void(0)" @click="openBox({name:'充值',index:2})">充值</a>
                            &nbsp;
                            <a href="javascript:void(0)" @click="openBox({name:'调整余额',index:3})">调整余额</a>
                            &nbsp;
                            <a href="javascript:void(0)" @click="openBox({name:'调整积分',index:4})">调整积分</a>
                            &nbsp;
                            <a href="javascript:void(0)" @click="openBox({name:'调整等级',index:5})">调整等级</a>
                            &nbsp;
                            <a href="javascript:void(0)" @click="freeze">冻结</a>
                            &nbsp;
                            <a href="javascript:void(0)" @click="openBox({name:'送券',index:6})">送券</a>
                        </td>
                    </tr>
                    <!-- 无数据显示 -->
                    <tr v-if="data_list.length<=0">
                        <td colspan="9">
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
        <ModalDialog :model="showBox" :title="title_text" @cancel="showBox=false" @confirm="confirmOk">
            <!-- 导入会员 -->
            <div v-if="showIndex==0">
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
            <!-- 打标签 -->
            <div v-if="showIndex==1" style="height:100%">
                <div style="width:400px;margin:auto;height:100%;">
                    <theLabel></theLabel>
                </div>
            </div>
            <!-- 充值 -->
            <div v-if="showIndex==2" style="height:100%">
                <div class="topUp_Box">
                    <!-- 显示 -->
                    <div class="commons_box_s">
                        <sserHead></sserHead>
                        <!--  -->
                        <br>
                        <topUp></topUp>
                    </div>
                </div>
            </div>
            <!-- 调整余额 -->
            <div v-if="showIndex==3" style="height:100%">
                <div class="topUp_Box">
                    <!-- 显示 -->
                    <div class="commons_box_s">
                        <sserHead></sserHead>
                        <br>
                        <p style="color:#999">注：调整余额不触发储值规则，不额外赠送任何奖励</p>
                        <!--  -->
                        <br>
                        <balances></balances>
                    </div>
                </div>
            </div>
            <!-- 调整积分 -->
            <div v-if="showIndex==4" style="height:100%">
                <div class="topUp_Box">
                    <!-- 显示 -->
                    <div class="commons_box_s">
                        <sserHead></sserHead>
                        <!--  -->
                        <br>
                        <integral></integral>
                    </div>
                </div>
            </div>
            <!-- 调整等级 -->
            <div v-if="showIndex==5" style="height:100%">
                <div class="topUp_Box">
                    <!-- 显示 -->
                    <div class="commons_box_s">
                        <sserHead></sserHead>
                        <!--  -->
                        <br>
                        <level></level>
                    </div>
                </div>
            </div>
            <!-- 送券 -->
            <div v-if="showIndex==6" style="height:100%">
                <coupons></coupons>
            </div>
            <!--  -->
        </ModalDialog>
    </div>
</template>

<script>
    // 局部组件
    import balances from '@/components/childPage/MemberMGM/sser_MGM_com/balances.vue';//调整余额 
    import topUp from '@/components/childPage/MemberMGM/sser_MGM_com/topUp.vue';//充值
    import theLabel from '@/components/childPage/MemberMGM/sser_MGM_com/theLabel.vue';//打标签
    import sserHead from '@/components/childPage/MemberMGM/sser_MGM_com/sserHead.vue';//公共头部
    import integral from '@/components/childPage/MemberMGM/sser_MGM_com/integral.vue';//调整积分
    import level from '@/components/childPage/MemberMGM/sser_MGM_com/level.vue';//调整等级
    import coupons from '@/components/childPage/MemberMGM/sser_MGM_com/coupons.vue';//送券
    export default {
        components:{
            balances,
            sserHead,
            theLabel,
            topUp,
            integral,
            level,
            coupons
        },
        data(){
            return {
                showIndex:-1,//弹框显示第几个
                title_text:'',//打开弹框显示的标题
                showBox:false,//是否显示弹框
                channel:'',//领卡渠道
                dateValue1:'',//关注时间
                dateValue2:'',//领卡时间
                radio5:0,//是否领卡
                radio4:0,//是否关注 
                seachValue:'',//请输入手机号/卡号/姓名/昵称  绑定数据
                pageIndex:1,//当前页数
                pageSize:10,//每页显示条数
                data_list:[
                    {
                        name:'王健林',nickname:'万达',level:'会员',phoneNumber:'13245456344',
                        VipNumber:'82376736775755',availableMoney:2333,availableIntegral:99999
                    },
                    {
                        name:'王健林',nickname:'万达',level:'会员',phoneNumber:'13245456344',
                        VipNumber:'82376736775755',availableMoney:2333,availableIntegral:99999
                    },
                    {
                        name:'王健林',nickname:'万达',level:'会员',phoneNumber:'13245456344',
                        VipNumber:'82376736775755',availableMoney:2333,availableIntegral:99999
                    },
                    {
                        name:'王健林',nickname:'万达',level:'会员',phoneNumber:'13245456344',
                        VipNumber:'82376736775755',availableMoney:2333,availableIntegral:99999
                    },
                    {
                        name:'王健林',nickname:'万达',level:'会员',phoneNumber:'13245456344',
                        VipNumber:'82376736775755',availableMoney:2333,availableIntegral:99999
                    },
                    {
                        name:'王健林',nickname:'万达',level:'会员',phoneNumber:'13245456344',
                        VipNumber:'82376736775755',availableMoney:2333,availableIntegral:99999
                    },
                    {
                        name:'王健林',nickname:'万达',level:'会员',phoneNumber:'13245456344',
                        VipNumber:'82376736775755',availableMoney:2333,availableIntegral:99999
                    },
                    {
                        name:'王健林',nickname:'万达',level:'会员',phoneNumber:'13245456344',
                        VipNumber:'82376736775755',availableMoney:2333,availableIntegral:99999
                    },
                    {
                        name:'王健林',nickname:'万达',level:'会员',phoneNumber:'13245456344',
                        VipNumber:'82376736775755',availableMoney:2333,availableIntegral:99999
                    },
                    {
                        name:'王健林',nickname:'万达',level:'会员',phoneNumber:'13245456344',
                        VipNumber:'82376736775755',availableMoney:2333,availableIntegral:99999
                    },
                ],
            }
        },
        created(){
            console.log('用户管理')
        },
        methods:{
            // 冻结
            freeze(){
                this.$confirm('确定要冻结该用户吗？', '冻结用户', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '操作成功!'
                    });
                }).catch(()=>{
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                })
            },
            // 导出用户数据
            exportExcel(){
                this.$message({
                    message: '导出成功！已加入到下载队列',
                    type: 'success'
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
            // 文件上传成功时的钩子
            successExcel(response,file,fileList){
                console.log(response,file,fileList)
            },
            // 文件列表移除文件时的钩子
            removeExcel(file,fileList){
                console.log(file,fileList)
            },
            // 公共打开弹框事件
            openBox(e){
                // 开启弹框
                this.showBox=true;
                // 设置标题
                this.title_text=e.name;
                // 设置显示第几个模块
                this.showIndex=e.index;
            },
            // 弹框确认事件
            confirmOk(){
                
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
            }
        }
    }
</script>

<style scoped>
    .postPre{
        padding:10px;
    }
    .padding_tops{
        padding:10px 0;
    }
    .padding_tops .title{
        font-size:14px;
        display: inline-block;
        width:70px;
        text-align: right;
        padding:0 10px 0 0;
    }
    .float_centers>.div{
        float: left;
        height:35px;
        line-height: 35px;
    }
    .float_centers>.divs2{
        float: right;
    }
    .pageBtn{
        margin: 20px auto 0 auto;
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
    }
    .link_Font a{
        color:#409EFF;
    }
    .link_Font{
        width:325px!important;
    }
    .table_list_box tr td{
        padding: 10px 5px;
    }
    .box_input{
        width:425px;
        margin: auto;
        padding:5px 0;
    }
    .topUp_Box{
        width:500px;
        margin:auto;
        height:100%;
        padding:10px;
        box-sizing: border-box;
    }
    .commons_box_s{
        border:1px solid #eee;
        border-radius:5px;
        /* overflow: auto; */
        padding:10px;
    }
</style>