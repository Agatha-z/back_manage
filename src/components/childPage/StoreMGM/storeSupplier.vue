<!-- 门店供应商 -->
<template>
    <div class="postPre">
        <!--数据-->
        <div>
            <table class="table_list" border="0" cellspacing="0">
                <tr>
                    <th></th>
                    <th>供应商编码</th>
                    <th>供应商名称</th>
                    <th>联系人	</th>
                    <th>联系电话</th>
                    <th>结算方式</th>
                    <th>备注</th>
                    <th>操作</th>
                </tr>
                <tr v-for="(v,k) in data_list" :key="k">
                    <td>{{k+1}}</td>
                    <td>{{v.s_name}}</td>
                    <td>{{v.brand}}</td>
                    <td>{{v.areaName}}</td>
                    <td>{{v.attribute}}</td>
                    <td>{{v.formats}}</td>
                    <td>{{v.user}}</td>
                    <td>
                        <el-button type="primary" size="small" icon="el-icon-edit"  @click="operation(v,k)">编辑</el-button>
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
        <!--编辑弹框-->
        <ModalDialog :model="show_uint" title="编辑门店供应商" @cancel="show_uint = false">
            <div class="uint_code" style="border-bottom:1px solid #eee;">
                <div class="fl font">供&nbsp;应&nbsp;商&nbsp;编&nbsp;码</div>
                <div class="code_input fl">
                    <input type="text" value="DW39" class="txtInput">
                    <p>(只能填数字或字母！例如：KS1001,KS002...)</p>
                </div>
                <span class="after fl">*</span>
                <div class="clear"></div>
            </div>
            <div class="uint_code" style="border-bottom:1px solid #eee;">
                <div class="fl font">供&nbsp;应&nbsp;商&nbsp;名&nbsp;称</div>
                <div class="code_input fl">
                    <input type="text" value="总部配送中心" class="txtInput">
                    <p>(此项为必填项，不能填写已有的名称！)</p>
                </div>
                <span class="after fl">*</span>
                <div class="clear"></div>
            </div>
            <div class="uint_code" style="border-bottom:1px solid #eee;">
                <div class="fl font">结&nbsp;算&nbsp;方&nbsp;式</div>
                <div class="code_input fl">
                    <select name="" id="" class="txtInput" >
                        <option value="1">货到付款</option>
                        <option value="2">日结</option>
                        <option value="3">月结</option>
                    </select>
                </div>
                <span class="after fl">*</span>
                <div class="clear"></div>
            </div>
            <div class="uint_code" style="border-bottom:1px solid #eee;">
                <div class="fl font">联&nbsp;系&nbsp;人</div>
                <div class="code_input fl">
                    <input type="text" value="吴显斌" class="txtInput">
                </div>
                <span class="after fl"></span>
                <div class="clear"></div>
            </div>
            <div class="uint_code" style="border-bottom:1px solid #eee;">
                <div class="fl font">联&nbsp;系&nbsp;电&nbsp;话</div>
                <div class="code_input fl">
                    <input type="text" value="18056031415" class="txtInput">
                </div>
                <span class="after fl"></span>
                <div class="clear"></div>
            </div>
            <div class="uint_code" style="border-bottom:1px solid #eee;">
                <div class="fl font">联&nbsp;系&nbsp;地&nbsp;址</div>
                <div class="code_input fl">
                    <input type="text" value="合肥市肥西县桃花镇泰山路与汤口路交口明昊公司综合楼" class="txtInput">
                </div>
                <span class="after fl"></span>
                <div class="clear"></div>
            </div>
            <div class="uint_code" style="border-bottom:1px solid #eee;">
                <div class="fl font">备&nbsp;注</div>
                <div class="code_input fl">
                    <textarea name="" id="" cols="5" rows="20" maxlength='50' class="txtInput" style="height:80px;overflow:auto;"></textarea>
                </div>
                <span class="after fl"></span>
                <div class="clear"></div>
            </div>
        </ModalDialog>
    </div>
</template>

<script>
export default {
    data(){
        return{
            show_uint:false,//编辑弹框
            pageIndex:1,//当前页数
            pageSize:10,//每页显示条数
            data_list:[ //渲染数据					 	
                {s_name:'ZB001',brand:'总部配送中心',attribute:'吴显斌',areaName:'18056031415',formats:'月结',user:'',}
            ],
        }
    },
    methods:{
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
        // 点击编辑
        operation(v,k){
            this.show_uint=true;
        }
    },
    created() {
        console.log("门店供应商");
    }
};
</script>

<style scoped>
.postPre {
  padding: 10px;
}
.pageBtn{
    margin: 20px auto 0 25%;
}
.clear{
    clear: both;
}
/* 编辑门店供应商 */
.uint_code{
    margin:0 50px;
    padding:20px 0;
    padding-left:6%;
}
.uint_code .font{
    width:20%;
    text-align:right;
    font-size: 18px;
    font-weight: 600;
    color: #333;
    vertical-align: top;
    padding-top: 5px;
    margin-right:20px;
}
.uint_code  .code_input{
    width:400px;
    /* padding:0 20px;
    box-sizing:border-box; */
}
.uint_code  .code_input .txtInput{
    width:100%;
    height:30px;
    padding-left:10px;
    box-sizing:border-box;
}
.uint_code  .code_input p{
    color:#989898;
    font-size:14px;
    line-height:26px;
}
span.after{
    display:inline-block;
    color: #d16e6c;
    margin-left:10px;
    margin-top:8px;
}
/* 分页样式 */
.pagingBTN{
    margin: 20px auto 0 25%;
}
</style>