<template>
    <!--头部内容-->
    <div class="checkTop">
        <div class="item" style="line-height:60px;">
            <!--  -->
            <label class="fl">供应商名称</label>
            <el-input style="width:20%;margin-right:10px;" size="medium" clearable  placeholder="供应商名称" disabled v-model="supplierName" class="fl"></el-input>
            <span style="color:red;padding-top:2px;font-size:16px;margin-right:60px;float:left;">*</span>
            <!--  -->
            <label  class="fl">订单日期</label>
            <el-date-picker
                style="margin-right:20px;width:180px;float:left;"
                type="date"
                disabled
                v-model="orderDate"
                placeholder="2018-12-14">
            </el-date-picker>
        </div>
        <div v-if="isdeliver">
            <div class="item" style="line-height:60px;">
                <!--  -->
                <label  class="fl">采购门店</label>
                <el-input style="width:20%;margin-right:10px;float:left;" size="medium" clearable  placeholder="采购门店" disabled v-model="purchaseShop"></el-input>
                <span style="color:red;padding-top:10px;font-size:16px;margin-right:60px;visibility: hidden;float:left;">*</span>
                <!--  -->
                <label class="fl">收货仓库</label>
                <el-input style="width:20%;margin-right:10px;float:left;" size="medium" clearable  placeholder="供应商名称" disabled></el-input>
            </div>
            <div class="item">
                <label class="fl">收货地址</label>
                <div style="float:left;border-bottom:1px solid #e5e8ea;width:90%;">
                    <textarea   placeholder="在此填写收货地址..."    readonly class="form-control" maxlength="150"></textarea>
                </div>
            </div>
            <div class="item">
                <label class="fl">填写备注</label>
                <div style="float:left;border-bottom:1px solid #e5e8ea;width:90%;">
                    <textarea   placeholder="在此填写备注信息..." readonly class="form-control" maxlength="150"></textarea>
                </div>
            </div>
        </div>
        <div class="item" v-else>
            <label class="fl">发货日期</label>
            <el-date-picker
                style="margin-right:20px;width:180px;float:left;"
                v-model="value1"
                type="date"
                placeholder="2018-12-20">
            </el-date-picker>
        </div>
    </div>
</template>
<script  scoped>
export default {
    props: {
        supplierName:{//供应商名称传值
            type:String,
            default:''
        },
        purchaseShop:{//采购门店传值
            type:String,
            default:''
        },
        isdeliver:{//是否是点击发货进来
            type:Boolean,
            default:true,
        },
        orderDate:{//订单日期
            type:String,
            default:''
        }
    },
    data () {
        return {
            value1:"",//时间选择器
            
        }
    }
}
</script>
<style>
.checkTop {
  padding: 10px 0 0 100px;
  margin-bottom: 20px;
}
.checkTop .item {
    height:60px;
    margin-bottom:10px;
  /* height: 70px;
  line-height:70px; */
}
.checkTop .item label {
  width: 100px;
  text-align: right;
  font-size: 18px;
  font-weight: 600;
  margin-right: 30px;
}
.checkTop .item .line {
  flex: 2;
  height: 1px;
  background: #e5e8ea;
  margin-top: 40px;
}
.form-control {
  outline: 0;
  width: 100%;
  border: 0;
  height: 32px;
  box-sizing: border-box;
  padding-top: 15px;
  color: #555;
  border-right: 0;
  background-attachment: scroll;
  resize: none;
  background:transparent;
  overflow:auto;
}
.checkBottom {
  display: flex;
  font-size: 0;
}
</style>


