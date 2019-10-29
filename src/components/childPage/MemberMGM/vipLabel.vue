<!-- 会员标签 -->
<template>
    <div class="postPre">
        <div class="commonHeader_style">
            <el-radio-group v-model="lable_radio3" size="medium" @change="lableRadioChange(lable_radio3)">
                <el-radio-button :label="0">自动标签</el-radio-button>
                <el-radio-button :label="1">手动标签</el-radio-button>
            </el-radio-group>
            <hr>
            <!--  -->
            <div>
                <div class="inlneBlock_all left">
                    <el-button type="primary" size="medium" v-if="lable_radio3==0" @click="$router.push('/HomePage/addVipLabel')">
                        <i class="el-icon-plus"></i> 新建自动标签
                    </el-button>
                    <el-button type="primary" size="medium" v-else @click="$router.push('/HomePage/manualLabel')">
                        <i class="el-icon-plus"></i> 新建手动标签
                    </el-button>
                </div>
                <!--  -->
                <div class="inlneBlock_all right">
                    <el-input placeholder="请输入标签名称" size="medium" style="width:350px;" v-model="seachValue">
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </div>
                <!-- 清除浮动 -->
                <div style="clear:both"></div>
            </div>
        </div>
        <br>
        <!-- 自动标签 -->
        <div v-if="lable_radio3==0">
            <!-- 系统推荐标签 -->
            <div class="commonHeader_style">
                <p class="vipLabel_title">
                    <span style="font-weight:600;">系统推荐标签</span>
                    &nbsp;&nbsp;
                    <span style="color:#666">注：每天 5:00 系统更新数据</span>
                </p>
                <!-- 标签 -->
                <div>
                    <members
                    v-for="(v,k) in systemLabel" 
                    :key="k" 
                    :detailData="v"
                    :buttonData="[{name:'手动更新',events:'update'},{name:'标签详情',events:'details'}]">
                    </members>
                </div>
            </div>
            <br>
            <!-- 商家2自定义标签 -->
            <div class="commonHeader_style">
                <p class="vipLabel_title">
                    <span style="font-weight:600;">商家自定义标签</span>
                    &nbsp;&nbsp;
                    <span style="color:#666">注：每天 5:00 系统更新数据</span>
                </p>
                <!-- 标签 -->
                <div>
                    <members
                    v-for="(v,k) in merchantsLabel" 
                    :key="k" 
                    :detailData="v">
                    </members>
                </div>
            </div>
        </div>
        <!-- 手动标签 -->
        <div v-if="lable_radio3==1">
            <!-- 手动标签 -->
            <div class="commonHeader_style">
                <p class="vipLabel_title">
                    <span style="font-weight:600;">手动标签</span>
                    &nbsp;&nbsp;
                    <span style="color:#666">注：永久性手动标签</span>
                </p>
                <!-- 标签 -->
                <div>
                    <members
                    v-for="(v,k) in manualLabel" 
                    :showUpdateTime="false"
                    :key="k" 
                    :detailData="v">
                    </members>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    //标签组件 
    import members from './viplabel_com/members.vue' 
    export default {
        components:{
           members,
        },
        created(){
            // 如果 浏览器存储中有labelRadio值 则设置为 lable_radio3 （切换手动标签自动标签）为该值 没有则不进行操作
            if(!(sessionStorage.labelRadio==undefined)){
                this.lable_radio3=parseInt(sessionStorage.labelRadio)
            }
        },
        data(){
            return {
                seachValue:'',//搜索框绑定
                systemLabel:[// 系统推荐标签数据
                    {title:'导入/手动新增的会员',userNumber:1,updateTime:'2019-01-02 05:00:42',createTime:'2018-11-02 15:00:42'},
                    {title:'30天及以上未消费的会员',userNumber:209,updateTime:'2019-01-02 05:00:42',createTime:'2018-11-02 15:00:42'},
                    {title:'开卡从未消费过的会员',userNumber:190,updateTime:'2019-01-02 05:00:42',createTime:'2018-11-02 15:00:42'},
                ],
                merchantsLabel:[ //商家自定义标签数据
                    {title:'10个有效会员信息',userNumber:1,updateTime:'2019-01-02 05:00:42',createTime:'2018-11-02 15:00:42'}
                ],
                manualLabel:[
                    {title:'用户手动1',userNumber:1,createTime:'2018-11-02 15:00:42'},
                    {title:'用户手动2',userNumber:1,createTime:'2018-11-02 15:00:42'},
                    {title:'用户手动3',userNumber:1,createTime:'2018-11-02 15:00:42'},
                    {title:'用户手动',userNumber:1,createTime:'2018-11-02 15:00:42'},
                ],
                lable_radio3:0,//切换手动标签自动标签
            }
        },
        methods:{
            // 自动标签/手动标签选择change事件
            lableRadioChange(e){
                // 浏览器存储保存单选框的值
                sessionStorage.labelRadio=e;
            }
        }
    }
</script>

<style scoped>
    .postPre{
        padding:10px;
    }
    hr{
        color:#eee;
        height:1px;
        border:0px;
        border-top:1px solid #eee;
        margin:15px 0;
        padding:0px;
        overflow:hidden;
    }
    .inlneBlock_all.left{
        float: left;
    }
    .inlneBlock_all.right{
        float: right;
    }
    .vipLabel_title{
        line-height: 30px;
    }
</style>