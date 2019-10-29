<!-- 积分商城 -->
<template>
    <div class="postPre">
        <!-- 驱动视图更新 -->
        <div v-show="false">{{index}}</div>
        <div class="commonHeader_style" onselectstart="return false">
            <el-tabs v-model="activeName" @tab-click="handleClick($event,activeName)">
                <el-tab-pane label="我的商品" name="1"></el-tab-pane>
                <el-tab-pane label="全部订单" name="2"></el-tab-pane>
            </el-tabs>
            <div>
                <el-button type="primary" size="medium" @click="showModal_t=true">
                    <i class="el-icon-plus"></i>
                    新建商品
                </el-button>
                <!--  -->
                <el-button type="info" size="medium">
                    批量上架
                </el-button>
                <!--  -->
                <el-button type="info" size="medium">
                    批量下架
                </el-button>
                <!-- 刷新删除按钮 -->
                <el-button icon="el-icon-refresh" size="medium" class="bottn_els"></el-button>
                <el-button icon="el-icon-delete" size="medium" class="bottn_els_r"></el-button>
                &nbsp;
                <!-- 商品状态 -->
                <el-select v-model="stateValue" placeholder="商品状态" size="medium" style="width:105px;">
                    <el-option label="全部" :value="0"></el-option>
                    <el-option label="已上架" :value="1"></el-option>
                    <el-option label="已下架" :value="2"></el-option>
                    <el-option label="已售完" :value="3"></el-option>
                </el-select>
                &nbsp;
                <!-- 商品类型 -->
                <el-select v-model="typeValue" placeholder="商品类型" size="medium" style="width:105px;">
                    <el-option label="全部" :value="0"></el-option>
                    <el-option label="实物商品" :value="1"></el-option>
                    <el-option label="卡券商品" :value="2"></el-option> 
                </el-select>
                <!-- 商品价格类型 -->
                <el-select v-model="priceValue" placeholder="商品价格类型" size="medium" style="width:130px;">
                    <el-option label="全部" :value="0"></el-option>
                    <el-option label="纯积分" :value="1"></el-option>
                    <el-option label="积分+人民币" :value="2"></el-option> 
                </el-select>
                <!-- 搜索框 -->
                <div style="float:right">
                    <el-input placeholder="请输入商品名称" v-model="seachWords" size="medium" class="input-with-select">
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </div>
            </div>
        </div>
        <br>
        <!--  -->
        <div class="commonHeader_style">
            <table class="table_list" border="0" cellspacing="0">
                <tr>
                    <th>
                        <el-checkbox v-model="parentCheck" :indeterminate="parentIndeterminate" @change="parentSelect"></el-checkbox>
                    </th>
                    <th>商品信息</th>
                    <th>商品类型</th>
                    <th>库存</th>
                    <th>兑换数</th>
                    <th>状态</th>
                    <th>操作</th>
                </tr>
                <!--  -->
                <tr v-for="(v,k) in data_list" :key="k">
                    <td>
                        <el-checkbox v-model="v.check" @change="chechIteam($event,k)"></el-checkbox>
                    </td>
                    <td>
                        <div class="flex_Trs">
                            <div class="inlneBlock_all">
                                <img :src="v.src" alt="">
                            </div>
                            <div class="inlneBlock_all name_texts">
                                <p>{{v.name}}</p>
                                <div style="height:10px;"></div>
                                <p>{{v.integral}}</p>
                            </div>
                        </div>
                    </td>
                    <td>{{v.type}}</td>
                    <td>{{v.inventory}}</td>
                    <td>{{v.exchange}}</td>
                    <td>
                        <span v-if="v.state==1">上架</span>
                        <span v-else>下架</span>
                    </td>
                    <td>
                        <!-- 编辑按钮 -->
                        <el-button type="primary" size="medium">编辑</el-button>
                        <!-- 上架 -->
                        <el-button type="success" size="medium" v-if="v.state==2" @click="shelves(k)">上架</el-button>
                        <!-- 下架按钮 -->
                        <el-button type="warning" size="medium" v-if="v.state==1" @click="theShelves(k)">下架</el-button>
                        <!-- 删除按钮 -->
                        <el-button type="danger" size="medium" @click="deletes(k)">删除</el-button>
                        <!-- 预览按钮 -->
                        <el-button type="info" size="medium" @click="QrModal(k)">二维码</el-button>
                    </td>
                </tr>
                <!-- 无数据显示 -->
                <tr v-if="data_list.length<=0">
                    <td colspan="7">
                        <p style="color:#999">暂无更多数据</p>
                    </td>
                </tr>
            </table>
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
        <!-- 预览二维码模态框 -->
        <ModalDialog
        style_name="height:291px;min-height:291px"
        @cancel="showModal=false"
        title="二维码下载"
        :button="[{name:'关闭',type:'info',events:'cancel'}]"
        :model="showModal">
            <div class="showQr_Modal">
                <img src="/static/qr.png" alt="">
                <el-button size="medium" style="vertical-align: bottom">
                    <i class="el-icon-download"></i>
                    下载二维码
                </el-button>
            </div>
        </ModalDialog>
        <!-- 新建商品模态框 -->
        <ModalDialog
        style_name="height:291px;min-height:291px;width:600px;"
        @cancel="showModal_t=false"
        @confirm="confirmOk(goodsRadio)"
        title="新建商品"
        :model="showModal_t">
            <div style="width:200px;margin:60px;">
                <el-radio-group v-model="goodsRadio">
                    <el-radio :label="0" style="margin-bottom:20px;">实物商品</el-radio>
                    <br>
                    <el-radio :label="1">卡券商品</el-radio>
                </el-radio-group>
            </div>
        </ModalDialog>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                selectOn:[],//选中的id；
                parentIndeterminate:false,//父级是否选中
                parentCheck:false,//父级是全选/未全选
                seachWords:'',//商品名称绑定数据
                priceValue:'',//商品价格类型绑定数据
                typeValue:'',//商品类型绑定数据
                stateValue:'',//商品状态绑定数据
                activeName:'1',//默认激活顶部tab
                data_list:[
                    {id:'1-1',check:false,src:'./static/touxiang.png',name:'7折券',integral:'1积分',type:'卡券商品',inventory:4992,exchange:0,state:1},
                    {id:'1-2',check:false,src:'./static/touxiang.png',name:'7折券',integral:'1积分',type:'卡券商品',inventory:4992,exchange:0,state:2},
                    {id:'1-3',check:false,src:'./static/touxiang.png',name:'7折券',integral:'1积分',type:'卡券商品',inventory:4992,exchange:0,state:1},
                    {id:'1-4',check:false,src:'./static/touxiang.png',name:'7折券',integral:'1积分',type:'卡券商品',inventory:4992,exchange:0,state:2},
                    {id:'1-5',check:false,src:'./static/touxiang.png',name:'7折券',integral:'1积分',type:'卡券商品',inventory:4992,exchange:0,state:2},
                    {id:'1-6',check:false,src:'./static/touxiang.png',name:'7折券',integral:'1积分',type:'卡券商品',inventory:4992,exchange:0,state:1},
                    {id:'1-7',check:false,src:'./static/touxiang.png',name:'7折券',integral:'1积分',type:'卡券商品',inventory:4992,exchange:0,state:2},
                    {id:'1-8',check:false,src:'./static/touxiang.png',name:'7折券',integral:'1积分',type:'卡券商品',inventory:4992,exchange:0,state:1},
                    {id:'1-9',check:false,src:'./static/touxiang.png',name:'7折券',integral:'1积分',type:'卡券商品',inventory:4992,exchange:0,state:2},
                    {id:'1-10',check:false,src:'./static/touxiang.png',name:'7折券',integral:'1积分',type:'卡券商品',inventory:4992,exchange:0,state:1},
                ],//渲染数据
                pageIndex:1,//当前页数
                pageSize:10,//每页显示条数
                showModal:false,//是否显示模态框 - 预览二维码
                showModal_t:false,//是否显示模态框 - 新建商品
                index:0,//驱动视图更新
                goodsRadio:0,//实物商品/卡券商品  绑定单选框
            }
        },
        created(){
            console.log('积分商城')
        },
        methods:{
            // 新建商品 确定事件
            confirmOk(e){
                console.log(e);
                if(e==0){
                    // 实物商品
                    this.$router.push('/HomePage/addPhysical')
                }else{
                    // 卡券商品
                    this.$router.push('/HomePage/addVoucher')
                }
                // 关闭弹框
                this.showModal_t=false;
            },
            // 删除
            deletes(k){
                this.$confirm('确定删除吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    //  
                });
            },
            // 下架
            theShelves(k){
                this.$confirm('确定下架吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '下架成功!'
                    });
                }).catch(() => {
                    //  
                });
            },
            // 上架
            shelves(k){
                this.$confirm('确定上架吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '上架成功!'
                    });
                }).catch(() => {
                    //  
                });
            },
            // 二维码预览按钮
            QrModal(k){
                // 开启模态框
               this.showModal=true; 
            },
            // 全选取消全选
            parentSelect(data){
                var data_s=JSON.parse(JSON.stringify(this.data_list))
                var id;
                for(var i=0,len=data_s.length;i<len;i++){
                    // 数据id
                    id=data_s[i].id;
                    if(data){
                        // 选中
                        if(this.selectOn.indexOf(id)<0){
                            this.selectOn.push(id);
                        }
                    }else{
                        // 取消选中
                        if(this.selectOn.indexOf(id)>=0){
                            this.selectOn.splice(this.selectOn.indexOf(id),1);
                        }
                    } 
                    this.data_list[i].check=data
                }
                // 
                this.comcheck();
            },
            // 公共处理全选/未选中/部分选中   状态
            comcheck(){
                if(this.selectOn.length==0){
                    // 一个未选
                    this.parentCheck=false;
                    this.parentIndeterminate=false;
                }else if(this.selectOn.length==this.data_list.length){
                    //全部选中
                    this.parentCheck=true;
                    this.parentIndeterminate=false;
                }else{
                    // 部分选中
                    this.parentCheck=false;
                    this.parentIndeterminate=true;
                }
                // 驱动视图更新
                this.index++;
                console.log(this.selectOn)
            },
            // 子集选中
            chechIteam(data,k){
                var id=JSON.parse(JSON.stringify(this.data_list[k].id));
                if(data){
                    // 选中
                    if(this.selectOn.indexOf(id)<0){
                        this.selectOn.push(id);
                    }
                }else{
                    // 取消选中
                    if(this.selectOn.indexOf(id)>=0){
                        this.selectOn.splice(this.selectOn.indexOf(id),1);
                    }
                }
                // 
                this.comcheck();
            },
            // 公共跳转链接
            coomskip(k){
                if(k=='1'){
                    // 我的商品
                    // this.$router.push('/HomePage/foodLibrary/Food_MGM')
                }else if(k=='2'){
                    // 全部订单
                    // this.$router.push('/HomePage/foodLibrary/Specification_MGM')
                }
            },
            // 标签页点击事件
            handleClick(data,k){
                this.coomskip(k)
                // 保存tab标签 选中状态
                sessionStorage.foot_select=k;
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
        }
    }
</script>

<style scoped>
    .postPre{
        padding:10px;
    }
    .bottn_els{
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    }
    .bottn_els_r{
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        margin-left:-4px;
    }
    .name_texts{
        vertical-align: top;
        margin-left:5px;
        color:#409EFF;
    }
    .flex_Trs{
        display: flex;
        justify-content: center;
        flex-flow: row nowrap;
        align-items: center;
        cursor: pointer;
    }
    .flex_Trs img{
        max-height: 70px;
    }
    .table_list tr>th:last-child, .table_list tr>td:last-child{
        width:335px;
    }
    .pageBtn{
        margin: 20px auto 0 auto;
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
    }
    .showQr_Modal{
        margin: auto;
        width:290px;
        padding:20px;
    }
    .showQr_Modal img{
        vertical-align: top;
    }
</style>