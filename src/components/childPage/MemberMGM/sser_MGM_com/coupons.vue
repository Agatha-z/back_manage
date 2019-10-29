<template>
    <div class="coupons_box">
        <div class="seachAll_box">
            <!--  -->
            <div style="float:left">
                <el-radio-group v-model="radio3">
                    <el-radio-button size="medium" :label="0">普通券</el-radio-button>
                    <el-radio-button :label="1">券包</el-radio-button>
                </el-radio-group>
            </div>
            <!--  -->
            <div style="float:right">
                 <el-select v-model="class_q" v-show="radio3==0" size="medium" style="width:200px;" placeholder="请选择">
                    <el-option label="全部" :value="0"></el-option>
                    <el-option label="折扣券" :value="1"></el-option>
                    <el-option label="礼品券" :value="2"></el-option>
                    <el-option label="优惠券" :value="3"></el-option>
                </el-select>
                <!--  -->
                <el-input placeholder="券名称" size="medium" style="width:200px;" v-model="seachValue">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </div>
            <!--  -->
        </div>   
        <!-- 普通券 -->
        <div class="contents_box" v-show="radio3==0">
            <table class="table_list table_list_box" border="0" cellspacing="0">
                <tr>
                    <th></th>
                    <th>券名称</th>
                    <th>数量</th>
                    <th>券类型</th>
                    <th>有效期</th>
                    <th>库存</th>
                    <th>每人限额</th>
                </tr>
                <!--  -->
                <tr>
                    <td>
                        <el-checkbox></el-checkbox>
                    </td>
                    <td>
                        游戏畅玩券
                    </td>
                    <td>
                        <el-input-number size="mini" :min="1" label="描述文字"></el-input-number>
                    </td>
                    <td>
                        礼品券
                    </td>
                    <td>
                        领券后1天内有效
                    </td>
                    <td>
                        8987
                    </td>
                    <td>
                        1
                    </td>
                </tr>
                <!-- 无数据显示 -->
                <tr v-if="false">
                    <td colspan="7">
                        <p style="color:#999">暂无更多数据</p>
                    </td>
                </tr>
            </table>
        </div>
        <!-- 券包 -->
        <div class="contents_box" v-show="radio3==1">
            <table class="table_list table_list_box" border="0" cellspacing="0">
                <tr>
                    <th></th>
                    <th>券名称</th>
                    <th>数量</th>
                    <th>含券总数</th>
                    <th>有效期至</th>
                    <th>库存</th>
                </tr>
                <!--  -->
                <tr v-if="false">
                    
                </tr>
                <!-- 无数据显示 -->
                <tr>
                    <td colspan="6">
                        <p style="color:#999">暂无更多数据</p>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                class_q:0,//分类查询绑定数据
                seachValue:'',//搜索框查询数据
                radio3:0,//选择券类型
            }
        }
    }
</script>

<style scoped>
    .coupons_box{
        padding:10px;
        height:100%;
        box-sizing: border-box;
    }
    .seachAll_box{
        height:50px;
    }
    .contents_box{
        height:calc(100% - 50px);
        overflow: auto;
    }
</style>