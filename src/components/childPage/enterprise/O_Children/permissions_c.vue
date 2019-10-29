<template>
    <div>
        <div>
            <el-button type="primary" icon="el-icon-plus" @click="show_bounced_2=true">新增模板</el-button>
        </div>
        <br>
        <!-- 数据 -->
        <div>
            <table class="table_list" border="0" cellspacing="0">
                <tr>
                    <th></th>
                    <th>模板名称</th>
                    <th>已关联门店</th>
                    <th>操作人</th>
                    <th>创建时间</th>
                    <th>操作</th>
                </tr>
                <tr v-for="(v,k) in data_list" :key="k">
                    <td>{{k+1}}</td>
                    <td>{{v.name}}</td>
                    <td>{{v.associated}}</td>
                    <td>{{v.user}}</td>
                    <td>{{v.timer}}</td>
                    <td>
                        <el-button type="primary" size="small" icon="el-icon-edit"  @click="operation(1,k,v)">编辑</el-button>
                    </td>
                </tr>
                <!-- 无数据显示 -->
                <tr v-if="data_list.length<=0">
                    <td colspan="6">
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
        <!-- 增加模板弹框 -->
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
                        <br>
                        <div class="box_input">
                            <div class="font">详细地址</div>
                            <div>
                                <el-input style="width:300px" v-model="template_Name" size="medium" clearable placeholder="请输入详细地址"></el-input>
                            </div>
                        </div>
                        <!--  -->
                        <br>
                        <div class="box_input">
                            <el-tabs type="border-card">
                                <el-tab-pane v-for="(v,k) in data2" :key="k">
                                    <div slot="label"><el-checkbox @change="H_check($event,k)" :indeterminate="v.indeterminate" v-model="v.checkeds"></el-checkbox>&nbsp;{{v.tit}}</div>
                                    <div style="width:400px">
                                        <el-checkbox-group v-model="checkedCities" @change="childChange">
                                            <el-checkbox style="margin:0 10px 10px 0" border v-for="(j,l) in v.children" :label="j.val" :key="l">{{j.tit}}</el-checkbox>
                                        </el-checkbox-group>
                                    </div>
                                </el-tab-pane>
                            </el-tabs>
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
                data2:[
                    {   tit:'餐厅管理',
                        indeterminate:false,
                        checkeds:false,
                        children:[
                            {tit:'菜单管理',val:'1-1'},
                            {tit:'原因备注',val:'1-2'},
                            {tit:'支付管理',val:'1-3'},
                            {tit:'折扣管理',val:'1-4'},
                            {tit:'服务费管理',val:'1-5'},
                        ]
                    },
                    {   tit:'会员管理',
                        indeterminate:false,
                        checkeds:false,
                        children:[
                            {tit:'积分兑换方案',val:'2-1'},
                        ]
                    },
                    {   tit:'库存管理',
                        indeterminate:false,
                        checkeds:false,
                        children:[
                            {tit:'原材料管理',val:'3-1'},
                            {tit:'成本卡管理',val:'3-2'},
                            {tit:'店间调拨',val:'3-3'},
                        ]
                    }
                ],
                checkedCities:[],//默认选中checked
                template_Name:'',//弹框输入模板名称
                show_center_2:false,//弹框内层框是否显示
                show_bounced_2:false,//是否显示增加模板弹框
                pageIndex:1,//当前页数
                pageSize:10,//每页显示条数
                data_list:[
                    {name:'安少爷米线',associated:'安少爷米线（天玥中心店）,安少爷米线（包河万达店）,安少爷米线（万达茂店）',user:'涨的飙',timer:'2018-10-6 23:33:01',sel:['3-1','2-1','1-1']},
                    {name:'安少爷米线',associated:'安少爷米线（天玥中心店）,安少爷米线（包河万达店）,安少爷米线（万达茂店）',user:'涨的飙',timer:'2018-10-6 23:33:01',sel:['3-1','2-1','1-1']},
                    {name:'安少爷米线',associated:'安少爷米线（天玥中心店）,安少爷米线（包河万达店）,安少爷米线（万达茂店）',user:'涨的飙',timer:'2018-10-6 23:33:01',sel:['3-1','2-2','1-1']},
                    {name:'安少爷米线',associated:'安少爷米线（天玥中心店）,安少爷米线（包河万达店）,安少爷米线（万达茂店）',user:'涨的飙',timer:'2018-10-6 23:33:01',sel:['3-1','2-1','1-1']},
                    {name:'安少爷米线',associated:'安少爷米线（天玥中心店）,安少爷米线（包河万达店）,安少爷米线（万达茂店）',user:'涨的飙',timer:'2018-10-6 23:33:01',sel:['3-1','2-1','1-1']},
                    {name:'安少爷米线',associated:'安少爷米线（天玥中心店）,安少爷米线（包河万达店）,安少爷米线（万达茂店）',user:'涨的飙',timer:'2018-10-6 23:33:01',sel:['3-1','2-1','1-1']},
                    {name:'安少爷米线',associated:'安少爷米线（天玥中心店）,安少爷米线（包河万达店）,安少爷米线（万达茂店）',user:'涨的飙',timer:'2018-10-6 23:33:01',sel:['3-1','2-1','1-1']},
                    {name:'安少爷米线',associated:'安少爷米线（天玥中心店）,安少爷米线（包河万达店）,安少爷米线（万达茂店）',user:'涨的飙',timer:'2018-10-6 23:33:01',sel:['3-1','2-1','1-1']},
                    {name:'安少爷米线',associated:'安少爷米线（天玥中心店）,安少爷米线（包河万达店）,安少爷米线（万达茂店）',user:'涨的飙',timer:'2018-10-6 23:33:01',sel:['3-1','2-1','1-1']},
                    {name:'安少爷米线',associated:'安少爷米线（天玥中心店）,安少爷米线（包河万达店）,安少爷米线（万达茂店）',user:'涨的飙',timer:'2018-10-6 23:33:01',sel:['3-1','2-1','1-1']},
                ]
            }
        },
        created(){
            this.coomom()
        },
        methods:{
            // 默认勾选状态
            coomom(){
                var data=this.data2;
                var check=this.checkedCities;
                for(var i=0,len=data.length;i<len;i++){
                    var child=data[i].children;
                    var sel=0;
                    for(var j=0,lens=child.length;j<lens;j++){
                        if(check.indexOf(child[j].val)>=0){
                            sel++
                        }
                    }
                    if(sel>0&&sel<child.length){
                        this.data2[i].indeterminate=true;
                        this.data2[i].checkeds=false;
                    }else if(sel==child.length){
                        this.data2[i].indeterminate=false;
                        this.data2[i].checkeds=true;
                    }else{
                       this.data2[i].indeterminate=false;
                        this.data2[i].checkeds=false; 
                    }
                }
            },
            // 取消全选状态
            H_check(data,k){
                var data_s=this.data2[k].children;
                if(data){
                    // 设置全选 状态
                    this.data2[k].indeterminate=false;
                    this.data2[k].checkeds=true;
                    // 添加到选中数组中
                    for(var i=0,len=data_s.length;i<len;i++){
                        if(this.checkedCities.indexOf(data_s[i].val)<0){
                            this.checkedCities.push(data_s[i].val)
                        }
                    }
                }else{
                    // 取消全选
                    this.data2[k].indeterminate=false;
                    this.data2[k].checkeds=false;
                    // 删除数组中含有值得元素
                    for(var i=0,len=data_s.length;i<len;i++){
                        if(this.checkedCities.indexOf(data_s[i].val)>=0){
                            this.checkedCities.splice(this.checkedCities.indexOf(data_s[i].val),1)
                        }
                    }
                }
            },
            childChange(data){
                this.coomom()
            },
            // 数据按钮事件
            operation(e,k,data){
                if(e==1){
                    // 编辑
                    // 打卡弹框
                    this.show_bounced_2=true;
                    // 
                    this.checkedCities=data.sel
                    this.coomom()
                }
            },
            // 增加模板确认事件
            okPermissions(){
                console.log(232323)
            },
            // 弹框 关闭事件{
            quiet_box(){
                this.show_center_2=false;
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
        },
        watch:{
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
    .pageBtn{
        margin: 20px auto 0 auto;
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
    }
    .box_input{
        width:400px;
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
</style>