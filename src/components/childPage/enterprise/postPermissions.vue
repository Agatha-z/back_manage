<!-- 岗位权限 -->
<template>
    <div class="postPre">
        <!-- 顶部公共组件 -->
        <comTopHeader
        :padding_c="true"
        :placeholder_txt="'输入岗位名/机构名'"
        :select_data="[{index:0,txt:'全部'},{index:1,txt:'启用'},{index:2,txt:'停用'}]"
        :brand_data="[{index:0,txt:'安少爷米线'},{index:1,txt:'黑暗料理吃不死人'}]"
        :area_data="[{index:0,txt:'合肥'},{index:1,txt:'铜陵'},{index:2,txt:'芜湖'}]"
        @input-change="seachBtn"
        @state-change="stateChange"
        @brand-change="brandChange"
        @area-change="areaChange"
        ></comTopHeader>
        <!--  -->
        <div class="commonHeader_style">
            <div>
                <el-button type="primary" @click="show_bounced=true,checkedTree=[],lowerLevel=[]" icon="el-icon-plus">新增岗位</el-button>
            </div>
            <br>
            <!-- 数据 -->
            <div>
                <table class="table_list" border="0" cellspacing="0">
                    <tr>
                        <th></th>
                        <th>岗位名称</th>
                        <th>所属机构</th>
                        <th>所属部门</th>
                        <th>操作人</th>
                        <th>操作时间</th>
                        <th>岗位状态</th>
                        <th>操作</th>
                    </tr>
                    <tr v-for="(v,k) in data_list" :key="k">
                        <td>{{k+1}}</td>
                        <td>{{v.name}}</td>
                        <td>{{v.institutions}}</td>
                        <td>{{v.office}}</td>
                        <td>{{v.user}}</td>
                        <td>{{v.time}}</td>
                        <td>
                            <span v-if="v.state==1" style="color:green">{{v.state==1?'启用':''}}</span>
                            <span v-else style="color:red">{{v.state==2?'停用':''}}</span>
                        </td>
                        <td>
                            <el-button type="primary" size="small" icon="el-icon-edit" @click="operation(1,k,v)">编辑</el-button>
                            <el-button type="warning" v-if="v.state==1" size="small" icon="el-icon-time" @click="operation(2,k)">停用</el-button>
                            <el-button type="success" v-if="v.state==2" size="small" icon="el-icon-time" @click="operation(4,k)">启用</el-button>
                            <el-button type="danger" size="small" icon="el-icon-delete" @click="operation(3,k)">删除</el-button>
                        </td>
                    </tr>
                    <!-- 无数据显示 -->
                    <tr v-if="data_list.length<=0">
                        <td colspan="8">
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
        <!--  -->
        <div class="bounced_box"  v-if="show_bounced" @click="quiet_box">
            <transition name="animate_box">
                <div class="center_box" v-if="show_center" @click.stop>
                     <!-- 定位 X -->
                    <div class="position_clear" @click="quiet_box">
                        <i class="el-icon-circle-close"></i>
                    </div>
                    <!-- 头部 -->
                    <div class="title">新增岗位</div>
                    <!-- 内容部分 -->
                    <div class="content_scroll">
                        <br>
                        <div class="box_input">
                            <div class="font">岗&nbsp;&nbsp;位&nbsp;&nbsp;名&nbsp;&nbsp;称&nbsp;</div>
                            <div>
                                <el-input style="width:300px" v-model="P_name" size="medium" clearable placeholder="请输入岗位名称"></el-input>
                            </div>
                            <div class="font" style="color:red">*</div>
                        </div>
                        <hr>
                        <!--  -->
                        <div class="box_input">
                            <div class="font">所&nbsp;&nbsp;属&nbsp;&nbsp;机&nbsp;&nbsp;构&nbsp;</div>
                            <div>
                                <el-select style="width:300px"  size="medium" v-model="P_institutions" placeholder="请选择">
                                    <el-option label="安少爷米线" :value="1"></el-option>
                                    <el-option label="小少爷米线" :value="2"></el-option>
                                    <el-option label="大少爷米线" :value="3"></el-option>
                                </el-select>
                            </div>
                            <div class="font" style="color:red">*</div>
                        </div>
                        <hr>
                        <!--  -->
                        <div class="box_input">
                            <div class="font">所&nbsp;&nbsp;属&nbsp;&nbsp;部&nbsp;&nbsp;门&nbsp;</div>
                            <div>
                                <el-select style="width:300px"  size="medium" v-model="P_department" placeholder="请选择">
                                    <el-option label="中央厨房" :value="1"></el-option>
                                    <el-option label="前台收银" :value="2"></el-option>
                                    <el-option label="仓库管理" :value="3"></el-option>
                                </el-select>
                            </div>
                            <div class="font" style="color:red">*</div>
                        </div>
                        <hr>
                        <!--  -->
                        <!--  -->
                        <div class="box_input">
                            <div class="font">功&nbsp;&nbsp;能&nbsp;&nbsp;权&nbsp;&nbsp;限</div>
                            <!-- 树形控件 -->
                            <div>
                                <el-tree
                                ref="tree"
                                :data="data2"
                                show-checkbox
                                node-key="id"
                                :default-checked-keys="checkedTree"
                                :props="defaultProps">
                                </el-tree>
                            </div> 
                        </div>
                        <hr>
                        <!--  -->
                        <div class="box_input">
                            <div class="font">不可查看下级</div>
                            <!-- 树形控件 -->
                            <div>
                                <el-tree
                                ref="lower"
                                :data="data3"
                                show-checkbox
                                node-key="id"
                                :default-checked-keys="lowerLevel"
                                :props="defaultProps2">
                                </el-tree>
                            </div>
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
                checkedTree:[],//功能权限默认选中状态
                data2: [{
                    id: '1',
                    label: '运营',
                    children: [{
                        id: '1-1',
                        label: '岗位权限',
                        children:[{
                            id: '1-1-1',
                            label: '查看'
                        },{
                            id: '1-1-2',
                            label: '增加'
                        },{
                            id: '1-1-3',
                            label: '修改'
                        },{
                            id: '1-1-4',
                            label: '删除'
                        },]
                    },{
                        id: '1-2',
                        label: '企业机构',
                        children:[{
                            id: '1-2-1',
                            label: '机构管理',
                            children:[{
                                id: '1-2-1-1',
                                label: '查看'
                            },{
                                id: '1-2-1-2',
                                label: '增加'
                            },{
                                id: '1-2-1-3',
                                label: '修改'
                            },{
                                id: '1-2-1-4',
                                label: '删除'
                            },]
                        },{
                            id: '1-2-2',
                            label: '部门管理',
                            children:[{
                                id: '1-2-2-1',
                                label: '查看'
                            },{
                                id: '1-2-2-2',
                                label: '增加'
                            },{
                                id: '1-2-2-3',
                                label: '修改'
                            },{
                                id: '1-2-2-4',
                                label: '删除'
                            },]
                        },{
                            id: '1-2-3',
                            label: '员工管理',
                            children:[{
                                id: '1-2-3-1',
                                label: '查看'
                            },{
                                id: '1-2-3-2',
                                label: '增加'
                            },{
                                id: '1-2-3-3',
                                label: '修改'
                            },{
                                id: '1-2-3-4',
                                label: '删除'
                            },]
                        }]
                    },{
                        id: '1-3',
                        label: '菜品管理',
                        children:[{
                           id: '1-3-1',
                            label: '菜品库',
                            children:[{
                                id: '1-3-1-1',
                                label: '查看'
                            },{
                                id: '1-3-1-2',
                                label: '增加'
                            },{
                                id: '1-3-1-3',
                                label: '修该'
                            },{
                                id: '1-3-1-4',
                                label: '删除'
                            },] 
                        },{
                           id: '1-3-2',
                            label: '菜谱',
                            children:[{
                                id: '1-3-2-1',
                                label: '查看'
                            },{
                                id: '1-3-2-2',
                                label: '增加'
                            },{
                                id: '1-3-2-3',
                                label: '修该'
                            },{
                                id: '1-3-2-4',
                                label: '删除'
                            },] 
                        },{
                           id: '1-3-3',
                            label: '变价设置',
                            children:[{
                                id: '1-3-3-1',
                                label: '查看'
                            },{
                                id: '1-3-3-2',
                                label: '增加'
                            },{
                                id: '1-3-3-3',
                                label: '修该'
                            },{
                                id: '1-3-3-4',
                                label: '删除'
                            },] 
                        },]
                    },{
                        id: '1-4',
                        label: '中央厨房',
                        children:[{
                            id: '1-4-1',
                            label: '总部订单管理',
                            children: [{
                                id: '1-4-1-1',
                                label: '查看'
                            },{
                                id: '1-4-1-2',
                                label: '增加'
                            },{
                                id: '1-4-1-3',
                                label: '修该'
                            },{
                                id: '1-4-1-4',
                                label: '删除'
                            },]
                        },{
                            id: '1-4-2',
                            label: '总部入库管理',
                            children: [{
                                id: '1-4-2-1',
                                label: '查看'
                            },{
                                id: '1-4-2-2',
                                label: '增加'
                            },{
                                id: '1-4-2-3',
                                label: '修该'
                            },{
                                id: '1-4-2-4',
                                label: '删除'
                            },]
                        },{
                            id: '1-4-3',
                            label: '总部出库管理',
                            children: [
                                {
                                id: '1-4-3-1',
                                label: '查看'
                            },{
                                id: '1-4-3-2',
                                label: '增加'
                            },{
                                id: '1-4-3-3',
                                label: '修该'
                            },{
                                id: '1-4-3-4',
                                label: '删除'
                            },
                            ]
                        },{
                            id: '1-4-4',
                            label: '总部调拨管理',
                            children: [{
                                id: '1-4-4-1',
                                label: '查看'
                            },{
                                id: '1-4-4-2',
                                label: '增加'
                            },{
                                id: '1-4-4-3',
                                label: '修该'
                            },{
                                id: '1-4-4-4',
                                label: '删除'
                            },]
                        },{
                            id: '1-4-5',
                            label: '总部盘点管理',
                            children: [{
                                id: '1-4-5-1',
                                label: '查看'
                            },{
                                id: '1-4-5-2',
                                label: '增加'
                            },{
                                id: '1-4-5-3',
                                label: '修该'
                            },{
                                id: '1-4-5-4',
                                label: '删除'
                            },]
                        },{
                            id: '1-4-6',
                            label: '总部报表统计',
                            children: [{
                                id: '1-4-6-1',
                                label: '查看'
                            },{
                                id: '1-4-6-2',
                                label: '增加'
                            },{
                                id: '1-4-6-3',
                                label: '修该'
                            },{
                                id: '1-4-6-4',
                                label: '删除'
                            },]
                        },{
                            id: '1-4-7',
                            label: '总部仓库管理',
                            children: [{
                                id: '1-4-7-1',
                                label: '查看'
                            },{
                                id: '1-4-7-2',
                                label: '增加'
                            },{
                                id: '1-4-7-3',
                                label: '修该'
                            },{
                                id: '1-4-7-4',
                                label: '删除'
                            },]
                        },{
                            id: '1-4-8',
                            label: '总部供应商',
                            children: [{
                                id: '1-4-8-1',
                                label: '查看'
                            },{
                                id: '1-4-8-2',
                                label: '增加'
                            },{
                                id: '1-4-8-3',
                                label: '修该'
                            },{
                                id: '1-4-8-4',
                                label: '删除'
                            },]
                        },]
                    },{
                        id: '1-5',
                        label: '门店管理',
                        children:[{
                            id: '1-5-1',
                            label: '门店采购',
                            children:[{
                                id: '1-5-1-1',
                                label: '查看'
                            },{
                                id: '1-5-1-2',
                                label: '增加'
                            },{
                                id: '1-5-1-3',
                                label: '修该'
                            },{
                                id: '1-5-1-4',
                                label: '删除'
                            },]
                        },{
                            id: '1-5-2',
                            label: '门店直配',
                            children:[{
                                id: '1-5-2-1',
                                label: '查看'
                            },{
                                id: '1-5-2-2',
                                label: '增加'
                            },{
                                id: '1-5-2-3',
                                label: '修该'
                            },{
                                id: '1-5-2-4',
                                label: '删除'
                            },]
                        },{
                            id: '1-5-3',
                            label: '门店报表',
                            children:[{
                                id: '1-5-3-1',
                                label: '查看'
                            },{
                                id: '1-5-3-2',
                                label: '增加'
                            },{
                                id: '1-5-3-3',
                                label: '修该'
                            },{
                                id: '1-5-3-4',
                                label: '删除'
                            },]
                        },{
                            id: '1-5-4',
                            label: '门店仓库',
                            children:[{
                                id: '1-5-4-1',
                                label: '查看'
                            },{
                                id: '1-5-4-2',
                                label: '增加'
                            },{
                                id: '1-5-4-3',
                                label: '修该'
                            },{
                                id: '1-5-4-4',
                                label: '删除'
                            },]
                        },{
                            id: '1-5-5',
                            label: '原材料管理',
                            children:[{
                                id: '1-5-5-1',
                                label: '查看'
                            },{
                                id: '1-5-5-2',
                                label: '增加'
                            },{
                                id: '1-5-5-3',
                                label: '修该'
                            },{
                                id: '1-5-5-4',
                                label: '删除'
                            },]
                        },{
                            id: '1-5-6',
                            label: '原材料调价管理',
                            children:[{
                                id: '1-5-6-1',
                                label: '查看'
                            },{
                                id: '1-5-6-2',
                                label: '增加'
                            },{
                                id: '1-5-6-3',
                                label: '修该'
                            },{
                                id: '1-5-6-4',
                                label: '删除'
                            },]
                        },{
                            id: '1-5-7',
                            label: '门店供应商',
                            children:[{
                                id: '1-5-7-1',
                                label: '查看'
                            },{
                                id: '1-5-7-2',
                                label: '增加'
                            },{
                                id: '1-5-7-3',
                                label: '修该'
                            },{
                                id: '1-5-7-4',
                                label: '删除'
                            },]
                        },{
                            id: '1-5-8',
                            label: '门店二维码',
                            children:[{
                                id: '1-5-8-1',
                                label: '查看'
                            },{
                                id: '1-5-8-2',
                                label: '增加'
                            },{
                                id: '1-5-8-3',
                                label: '修该'
                            },{
                                id: '1-5-8-4',
                                label: '删除'
                            },]
                        },]
                    },{
                        id: '1-6',
                        label: '会员管理',
                        children:[{
                            id :'1-6-1',
                            label: '会员信息',
                            children: [{
                                id: '1-6-1-1',
                                label: '查看'
                            },{
                                id: '1-6-1-2',
                                label: '增加'
                            },{
                                id: '1-6-1-3',
                                label: '修该'
                            },{
                                id: '1-6-1-4',
                                label: '删除'
                            },]
                        },{
                            id :'1-6-2',
                            label: '会员充值',
                            children: [{
                                id: '1-6-2-1',
                                label: '查看'
                            },{
                                id: '1-6-2-2',
                                label: '增加'
                            },{
                                id: '1-6-2-3',
                                label: '修该'
                            },{
                                id: '1-6-2-4',
                                label: '删除'
                            },]
                        },{
                            id :'1-6-3',
                            label: '会员分类',
                            children: [{
                                id: '1-6-3-1',
                                label: '查看'
                            },{
                                id: '1-6-3-2',
                                label: '增加'
                            },{
                                id: '1-6-3-3',
                                label: '修该'
                            },{
                                id: '1-6-3-4',
                                label: '删除'
                            },]
                        },]
                    },{
                        id: '1-7',
                        label: '微信餐厅',
                        children:[{
                          id: '1-7-1',
                            label: '微信门店',
                            children: [{
                                id: '1-7-1-1',
                                label: '查看'
                            },{
                                id: '1-7-1-2',
                                label: '增加'
                            },{
                                id: '1-7-1-3',
                                label: '修该'
                            },{
                                id: '1-7-1-4',
                                label: '删除'
                            },]  
                        },{
                          id: '1-7-2',
                            label: '我的订单',
                            children: [{
                                id: '1-7-2-1',
                                label: '查看'
                            },{
                                id: '1-7-2-2',
                                label: '增加'
                            },{
                                id: '1-7-2-3',
                                label: '修该'
                            },{
                                id: '1-7-2-4',
                                label: '删除'
                            },]  
                        },{
                          id: '1-7-3',
                            label: '个人中心',
                            children: [{
                                id: '1-7-3-1',
                                label: '查看'
                            },{
                                id: '1-7-3-2',
                                label: '增加'
                            },{
                                id: '1-7-3-3',
                                label: '修该'
                            },{
                                id: '1-7-3-4',
                                label: '删除'
                            },]  
                        },]
                    },{
                        id: '1-8',
                        label: '订单管理',
                        children:[{
                            id: '1-8-1',
                            label: '反结订单',
                            children:[{
                                id: '1-8-1-1',
                                label: '查看'
                            },{
                                id: '1-8-1-2',
                                label: '增加'
                            },{
                                id: '1-8-1-3',
                                label: '修该'
                            },{
                                id: '1-8-1-4',
                                label: '删除'
                            },]
                        },{
                            id: '1-8-2',
                            label: '免费订单',
                            children:[{
                                id: '1-8-2-1',
                                label: '查看'
                            },{
                                id: '1-8-2-2',
                                label: '增加'
                            },{
                                id: '1-8-2-3',
                                label: '修该'
                            },{
                                id: '1-8-2-4',
                                label: '删除'
                            },]
                        },{
                            id: '1-8-3',
                            label: '退菜订单',
                            children:[{
                                id: '1-8-3-1',
                                label: '查看'
                            },{
                                id: '1-8-3-2',
                                label: '增加'
                            },{
                                id: '1-8-3-3',
                                label: '修该'
                            },{
                                id: '1-8-3-4',
                                label: '删除'
                            },]
                        },{
                            id: '1-8-4',
                            label: '增菜订单',
                            children:[{
                                id: '1-8-4-1',
                                label: '查看'
                            },{
                                id: '1-8-4-2',
                                label: '增加'
                            },{
                                id: '1-8-4-3',
                                label: '修该'
                            },{
                                id: '1-8-4-4',
                                label: '删除'
                            },]
                        },{
                            id: '1-8-5',
                            label: '折扣订单',
                            children:[{
                                id: '1-8-5-1',
                                label: '查看'
                            },{
                                id: '1-8-5-2',
                                label: '增加'
                            },{
                                id: '1-8-5-3',
                                label: '修该'
                            },{
                                id: '1-8-5-4',
                                label: '删除'
                            },]
                        },{
                            id: '1-8-6',
                            label: '外卖订单',
                            children:[{
                                id: '1-8-6-1',
                                label: '查看'
                            },{
                                id: '1-8-6-2',
                                label: '增加'
                            },{
                                id: '1-8-6-3',
                                label: '修该'
                            },{
                                id: '1-8-6-4',
                                label: '删除'
                            },]
                        },{
                            id: '1-8-7',
                            label: '线下订单',
                            children:[{
                                id: '1-8-7-1',
                                label: '查看'
                            },{
                                id: '1-8-7-2',
                                label: '增加'
                            },{
                                id: '1-8-7-3',
                                label: '修该'
                            },{
                                id: '1-8-7-4',
                                label: '删除'
                            },]
                        },{
                            id: '1-8-8',
                            label: '微信点单',
                            children:[{
                                id: '1-8-8-1',
                                label: '查看'
                            },{
                                id: '1-8-8-2',
                                label: '增加'
                            },{
                                id: '1-8-8-3',
                                label: '修该'
                            },{
                                id: '1-8-8-4',
                                label: '删除'
                            },]
                        },]
                    },{
                        id: '1-9',
                        label: '收银管理',
                        children:[{
                                id: '1-9-1',
                                label: '查看'
                            },{
                                id: '1-9-2',
                                label: '增加'
                            },{
                                id: '1-9-3',
                                label: '修该'
                            },{
                                id: '1-9-4',
                                label: '删除'
                            },]
                    },{
                        id: '1-10',
                        label: '报表管理',
                        children:[{
                            id: '1-10-1',
                            label: '营收报表',
                            children: [{
                                id: '1-10-1-1',
                                label: '查看'
                            },{
                                id: '1-10-1-2',
                                label: '增加'
                            },{
                                id: '1-10-1-3',
                                label: '修该'
                            },{
                                id: '1-10-1-4',
                                label: '删除'
                            },] 
                        },{
                            id: '1-10-2',
                            label: '菜品销售报表',
                            children: [{
                                id: '1-10-2-1',
                                label: '查看'
                            },{
                                id: '1-10-2-2',
                                label: '增加'
                            },{
                                id: '1-10-2-3',
                                label: '修该'
                            },{
                                id: '1-10-2-4',
                                label: '删除'
                            },] 
                        },{
                            id: '1-10-3',
                            label: '会员报表',
                            children: [{
                                id: '1-10-3-1',
                                label: '查看'
                            },{
                                id: '1-10-3-2',
                                label: '增加'
                            },{
                                id: '1-10-3-3',
                                label: '修该'
                            },{
                                id: '1-10-3-4',
                                label: '删除'
                            },] 
                        },{
                            id: '1-10-4',
                            label: '收银异常',
                            children: [{
                                id: '1-10-4-1',
                                label: '查看'
                            },{
                                id: '1-10-4-2',
                                label: '增加'
                            },{
                                id: '1-10-4-3',
                                label: '修该'
                            },{
                                id: '1-10-4-4',
                                label: '删除'
                            },] 
                        },]
                    }]
                }],//功能权限树形控件
                defaultProps: {
                    children: 'children',
                    label: 'label',
                },//功能权限
                lowerLevel:[],//不可看下级默认选中
                data3: [{
                    id: '1',
                    label: '安少爷米线',
                    children: [{
                       id: '1-1',
                       label: '合肥',
                       children: [{
                           id: '1-1-1',
                           label: '安少爷米线（绿地赢海店）'
                       },{
                           id: '1-1-2',
                           label: '安少爷米线（金中环广场店）'
                       },{
                           id: '1-1-3',
                           label: '安少爷米线（三里庵店）'
                       },{
                           id: '1-1-4',
                           label: '安少爷米线（五里墩店）'
                       },{
                           id: '1-1-5',
                           label: '安少爷米线（七里塘店）'
                       },{
                           id: '1-1-6',
                           label: '安少爷米线（十里庙店）'
                       },]
                    }]
                },{
                    id: '2',
                    label: '微信会员中心',
                    children: [{
                        id: '2-1',
                        label: '线上来源',
                        children: [{
                           id: '2-1-1',
                           label: '微信会员中心'
                       }]
                    }]
                }],//不可查看下级权限
                defaultProps2: {
                    children: 'children',
                    label: 'label',
                },//不可查看下级
                P_department:'',//所属部门
                P_institutions:'',//所属机构
                show_center:false,//弹框内层框是否显示
                show_bounced:false,//是否显示增加岗位弹框
                pageIndex:1,//当前页数
                P_name:'',//新增岗位名称
                pageSize:10,//每页显示条数
                data_list:[
                   {name:'CEO',institutions:'合肥安业餐饮有限公司（蜀山区分公司）',office:'公司办公室',check:['1-8-1'],user:'魏大勋',time:'2018-10-30 23:00',state:1},
                   {name:'CEO',institutions:'合肥安业餐饮有限公司（蜀山区分公司）',office:'公司办公室',check:['1-8-1'],user:'邓超他爸',time:'2018-10-30 23:00',state:1},
                   {name:'CEO',institutions:'合肥安业餐饮有限公司（蜀山区分公司）',office:'公司办公室',check:['1-8-1'],user:'江疏影男朋友',time:'2018-10-30 23:00',state:2},
                   {name:'CEO',institutions:'合肥安业餐饮有限公司（蜀山区分公司）',office:'公司办公室',check:['1-8-1'],user:'黄渤他二大爷',time:'2018-10-30 23:00',state:1},
                   {name:'CEO',institutions:'合肥安业餐饮有限公司（蜀山区分公司）',office:'公司办公室',check:['1-8-1'],user:'小猪',time:'2018-10-30 23:00',state:2},
                   {name:'CEO',institutions:'合肥安业餐饮有限公司（蜀山区分公司）',office:'公司办公室',check:['1-8-1'],user:'绝地求生',time:'2018-10-30 23:00',state:2},
                   {name:'CEO',institutions:'合肥安业餐饮有限公司（蜀山区分公司）',office:'公司办公室',check:['1-8-1'],user:'英雄联盟',time:'2018-10-30 23:00',state:1},
                   {name:'CEO',institutions:'合肥安业餐饮有限公司（蜀山区分公司）',office:'公司办公室',check:['1-8-1'],user:'吃饭要吃鸡',time:'2018-10-30 23:00',state:2},
                   {name:'CEO',institutions:'合肥安业餐饮有限公司（蜀山区分公司）',office:'公司办公室',check:['1-8-1'],user:'天王盖地虎',time:'2018-10-30 23:00',state:1},
                   {name:'CEO',institutions:'合肥安业餐饮有限公司（蜀山区分公司）',office:'公司办公室',check:['1-8-1'],user:'张嘉欣',time:'2018-10-30 23:00',state:1},
                ] 
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
        created(){
            console.log('岗位权限')
            this.commonAxios()
        },
        methods:{
            commonAxios(){
                // this.$axios.get('/institution/pageFindBrand', {
                //     params: {
                //         currPage:this.pageIndex,
                //         pageSize:this.pageSize,
                //         brabdname:'老乡鸡'
                //     }
                // })
                // .then(function (response) {
                //     console.log(response);
                // })
                // .catch(function (error) {
                //     console.log(error);
                // });
            },
            // 选择事件变化
            // checkChange(data){
            //     // console.log(1)
            //     console.log(this.$refs.tree.getCheckedKeys());
            // },
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
            // 操作按钮 启用/停用/删除
            operation(e,k,data){
                if(e==1){
                    // 编辑
                    this.checkedTree=data.check;
                    this.show_bounced=true;
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
                console.log(this.checkedTree)
                console.log(this.$refs.tree.getCheckedKeys())
            }
        }
    }
</script>

<style scoped>
    .postPre{
        padding:10px;
    }
    .commonHeader_style{
        margin-top:10px;
    }
    .pageBtn{
        margin: 20px auto 0 auto;
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
    }
    .header_modal{
        text-align: center;
        font-size: 20px;
        font-weight: 600;
        border-bottom: 1px solid #eee;
    }
    .modal_box{
        width:500px;
        margin: auto;
        padding:10px 0;
    }
    .modal_box>div{
        display: inline-block;
        margin-right:20px;
        vertical-align: middle;
    }
    .modal_box .divs1{
        font-size:18px;
        font-weight:600;
        padding-top:2px;
    }
    .modal_box .divs3{
        font-size:40px;
        color:red;
        height:27px;
        line-height: 30px;
        vertical-align: bottom;
        margin-bottom: -5px;
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
    .titles_head{
        font-size: 14px;
        color:#666;
    }
</style>