<template>
  <div class="addGroupPurchase">
    <div class="addGroupPurchase_content">
      <div class="nav_top">
        <h4>团购劵-添加团购卷</h4>
      </div>
      <div class="content">
        <form action="">
          <!--劵基本信息-->
          <div class="basicInformation">
            <h5>劵基本信息</h5>
            <ul>
              <li>
                <span>劵类型 <b>*</b></span>
                <div class="radios" style="display: inline-block;margin-left: 12px">
                  <el-radio v-model="radio" label="1" text-color="">代金劵</el-radio>
                  <el-radio v-model="radio" label="2" >团购劵</el-radio>
                </div>
              </li>
              <li>
                <span>劵名称 <b>*</b></span>
                <P class="disInput">
                  <el-input v-model="input" placeholder=""></el-input>
                </P>
                <i>请输入名称或信息，限9个字符或18个字符</i>
              </li>
              <li>
                <span>面值 <b>*</b></span>
                <p class="disInput">
                  <el-input v-model="input" placeholder=""></el-input>
                </p>
                <i>元</i>
              </li>
              <li>
                <span>售价 <b>*</b></span>
                <p class="disInput">
                  <el-input v-model="input" placeholder=""></el-input>
                </p>
                <i>元</i>
              </li>
              <li>
                <span>劵有效使用期 <b>*</b></span>
                <div class="fixedDate" style="display: inline-block;margin-left: 12px;">
                  <el-radio v-model="radio" label="1">固定日期</el-radio>
                </div>
                <div class="block" style="display: inline-block">
                  <el-date-picker
                    v-model="value7"
                    type="daterange"
                    align="right"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="pickerOptions2">
                  </el-date-picker>
                </div>
                <div class="setDate" style="margin-left: 125px;margin-top: 20px">
                  <el-radio v-model="radio" label="1">设定日期</el-radio>
                </div>
              </li>
              <li>
                <span>库存 <b>*</b></span>
                <p class="disInput">
                  <el-input v-model="input" placeholder=""></el-input>
                </p>
                <i>张</i>
              </li>
              <li>
                <span>每人限额 <b>*</b></span>
                <p class="disInput">
                  <el-input v-model="input" placeholder="50"></el-input>
                </p>
                <i>张</i>
                <div style="display: inline-block;color: #7c7c7c;margin-left: 10px">每个用户领劵上线，默认50张</div>
              </li>
              <li>
                <span style="vertical-align: top">劵首图 <b>*</b></span>
                <img src="../../../assets/png/updefault.png" class="disInput upimg " alt="">
                <div style="display: inline-block;vertical-align: top">
                  <el-upload
                    class="upload-demo"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    multiple
                    :limit="3"
                    :on-exceed="handleExceed"
                    :file-list="fileList">
                    <el-button size="small" type="primary"
                               style="background: white;color: #666666;border:1px solid #cccccc;font-size: 16px">上传图片
                    </el-button>
                  </el-upload>
                </div>
                <div slot="tip" class="el-upload__tip" style="margin-left: 125px;font-size: 16px;color: #999999">
                  图片尺寸800x800，且不超过1M
                </div>
              </li>
            </ul>
          </div>
          <!--使用条件-->
          <div class="conditionsOfUse">
            <h5>使用条件</h5>
            <ul>
              <li>
                <span>适用商品 </span>
                <div class="radios" style="display: inline-block;margin-left: 12px">
                  <el-radio v-model="radio" label="1">全部商品</el-radio>
                  <el-radio v-model="radio" label="2">指定商品</el-radio>
                </div>
              </li>
              <li>
                <span>可用时段</span>
                <div class="radios" style="display: inline-block;margin-left: 12px">
                  <el-radio v-model="radio" label="1">全部时段</el-radio>
                  <el-radio v-model="radio" label="2">可用时段</el-radio>
                </div>
              </li>
              <li>
                <span>可用门店 </span>
                <div class="radios" style="display: inline-block;margin-left: 12px">
                  <el-radio v-model="radio" label="1">全部门店</el-radio>
                  <el-radio v-model="radio" label="2">部分门店</el-radio>
                </div>
              </li>
              <li>
                <span>操作提示 <b>*</b></span>
                <P class="disInput">
                  <el-input v-model="input" placeholder=""></el-input>
                </P>
                <i>给用户操作提示，如'请按照这样XXX展示'16字</i>
              </li>
              <li>
                <span style="vertical-align: top">操作提示 <b>*</b></span>
                <P class="disInput" style="width: 360px;">
                  <el-input
                    type="textarea"
                    :autosize="{ minRows: 5, maxRows:7}"
                    placeholder=""
                    v-model="textarea3">
                  </el-input>
                </P>
                <i style="vertical-align: top;display: inline-block">给用户操作提示，如'请按照这样XXX展示'16字</i>
              </li>
            </ul>
          </div>
          <!--使用规则-->
          <div class="UsageRules">
            <h5>使用规则</h5>
            <ul>
              <li>
                <span>优惠同享 </span>
                <div class="radios" style="display: inline-block;margin-left: 12px">
                  <el-radio v-model="radio" label="2">不与其他优惠同享</el-radio>
                </div>
              </li>
            </ul>
          </div>
          <!--同步渠道-->
          <div class="SyncChannel">
            <h5>同步渠道</h5>
            <ul>
              <li>
                <span>同步至微信 </span>
                <div class="radios" style="display: inline-block;margin-left: 12px">
                  <el-radio v-model="radio" label="2">已绑定公众号可用，勾选后，可同步至微信-卡包</el-radio>
                </div>
              </li>
              <li>
                <span>同步详情 </span>
                <p class="disInput">
                  <el-switch
                    v-model="switchs"
                    active-color="#ffc41d"
                    inactive-color="#cccccc">
                  </el-switch>
                </p>
                <i style="color: #7865dc">预览</i>
              </li>
              <!--打开同步详情展示-->
              <li>
                <span>用户名称 <b>*</b></span>
                <p class="disInput" style="font-size: 16px;color:#666666 ">
                  安少爷米线
                </p>
              </li>
              <li>
                <span style="vertical-align: top">商户logo</span>
                <p class="disInput">
                  <img src="../../../assets/png/shopdefaultimg.png" alt="" style="width: 90px;height: 90px;display: inline-block">
                </p>
              </li>
              <li>
                <span style="vertical-align: top">卡面颜色 <b>*</b></span>
                <p class="disInput kamian">
                  <img src="../../../assets/png/kamian1.png" alt="" >
                  <img src="../../../assets/png/kamian2.png" alt="" >
                  <img src="../../../assets/png/kamian3.png" alt="" >
                  <img src="../../../assets/png/kamian4.png" alt="" >
                  <img src="../../../assets/png/kamian5.png" alt="" >
                  <img src="../../../assets/png/kamian6.png" alt="" >
                  <img src="../../../assets/png/kamian7.png" alt="" >
                  <img src="../../../assets/png/kamian8.png" alt="" >
                  <img src="../../../assets/png/kamian9.png" alt="" >
                </p>
              </li>
              <li>
                <span style="vertical-align: top">微信封面 <b>*</b></span>
                <img src="../../../assets/png/updefault.png" class="disInput upimg " alt="">
                <div style="display: inline-block;vertical-align: top">
                  <el-upload
                    class="upload-demo"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    multiple
                    :limit="3"
                    :on-exceed="handleExceed"
                    :file-list="fileList">
                    <el-button size="small" type="primary"
                               style="background: white;color: #666666;border:1px solid #cccccc;font-size: 16px">上传图片
                    </el-button>
                  </el-upload>
                </div>
                <div slot="tip" class="el-upload__tip" style="margin-left: 125px;font-size: 16px;color: #999999">
                  图片尺寸800像素x350像素，且不超过1M
                </div>
              </li>
              <li>
                <span style="vertical-align: top">中心入口</span>
                <div class="disInput centerEntrance">
                   <div class="centerEntrance_shang">
                     <span style="width: 70px;display: inline-block">入口名称</span>
                  <p class="disInput" style="width: 264px">
                     <el-input v-model="input" placeholder=""></el-input>
                   </p>
                   </div>
                  <div class="centerEntrance_shang">
                    <span style="width: 70px;display: inline-block">提示语</span>
                  <p class="disInput"  style="width: 264px">
                    <el-input v-model="input" placeholder=""></el-input>
                  </p>
                  </div>
                  <div class="centerEntrance_shang">
                    <span style="width: 70px;display: inline-block">链接跳转 </span>
                    <div class="radios" style="display: inline-block;margin-left: 12px;width: 264px">
                      <el-radio v-model="radio" label="1">系统链接</el-radio>
                      <el-radio v-model="radio" label="2">自定义链接</el-radio>
                    </div>
                  </div>
                  <div class="centerEntrance_shang">
                    <el-button plain style="width: 100px;height: 40px;display: inline-block;color: #7865dc;border:1px solid #7865dc" type="text" @click="dialogVisible = true">选择链接</el-button>
                  </div>

                </div>
              </li>
              <li>
                <span style="vertical-align: top">营销入口</span>
                <div class="disInput centerEntrance" >
                  <div class="centerEntrance_shang" style="text-align: right;margin-bottom: 0">
                    <el-button plain style="width: 100px;height: 40px;display: inline-block;color: #7865dc;border:1px solid #7865dc">增加入口</el-button>
                  </div>

                </div>
              </li>
              <li>
                <span style="vertical-align: top">图文介绍</span>
                <div class="disInput centerEntrance" style="overflow: hidden">
                  <span style="float: left;height: 40px;line-height: 40px">新增图文介绍</span>
                  <div class="centerEntrance_shang" style="text-align: right;margin-bottom: 0;float: right">
                    <el-button plain style="width: 100px;height: 40px;display: inline-block;color: #7865dc;border:1px solid #7865dc">新增图文</el-button>
                  </div>
                </div>
                <div style="margin-left: 125px;font-size: 16px;color: #999999;margin-top: 8px">
                  图片建议尺寸900像素x500像素，大小不超过1M,图文组数，最多上传20组，最多文字描述10247个字
                </div>
              </li>
              <li>
                <span>客服电话 </span>
                <p class="disInput">
                  <el-input v-model="input" placeholder=""></el-input>
                </p>
                <i>手机号码或者座机</i>
              </li>
              <li>
                <span>赠送好友 </span>
                <p class="disInput">
                  <el-switch
                    v-model="switchs1"
                    active-color="#ffc41d"
                    inactive-color="#cccccc">
                  </el-switch>
                </p>
                <i >用户领取后可赠送好友</i>
              </li>
            </ul>
          </div>
          <!--保存，取消-->
          <div class="footerSave">
            <el-button type="success">保存</el-button>
            <el-button type="info">取消</el-button>
          </div>
        </form>
      </div>
    </div>

    <!--选择业务链接-->
    <div class="businessLink">
      <el-dialog
        title="选择业务链接"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <div class="businessLink_content" >
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="微官网" name="first" style="font-size: 16px">
               <ul>
                 <li class="old">
                   <span>优惠买单</span>
                   <el-button plain  class="selectLink">选择链接</el-button>
                 </li>
                 <li>
                   <span>优惠买单</span>
                   <el-button plain class="selectLink">选择链接</el-button>
                 </li>
                 <li class="old">
                   <span>优惠买单</span>
                   <el-button plain class="selectLink">选择链接</el-button>
                 </li>
                 <li>
                   <span>优惠买单</span>
                   <el-button plain class="selectLink">选择链接</el-button>
                 </li>
               </ul>
            </el-tab-pane>
            <el-tab-pane label="网页素材" name="second" style="font-size: 16px">网页素材</el-tab-pane>
            <el-tab-pane label="营销活动" name="third" style="font-size: 16px">营销活动</el-tab-pane>
            <el-tab-pane label="功能链接" name="fourth" style="font-size: 16px">功能链接</el-tab-pane>
          </el-tabs>
        </div>
      </el-dialog >

    </div>
  </div>
</template>

<script>
  export default {
    name: "addGroupPurchase",
    data() {
      return {
        radio: '1',
        input: '',
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value6: '',
        value7: '',
        fileList: [],
        textarea3:'',
        switchs:false,
        switchs1:true,
        dialogVisible: false,//默认隐藏弹出框
        activeName: 'second',//tab默认选中的
      };
    },
    methods: {
      //选择业务链接关闭
      handleClose(done) {
        done();
      },
      //选择业务tab切换
      handleClick(tab, event) {
        console.log(tab, event);
      },

      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      }
    }
  }
</script>

<style scoped >
  .addGroupPurchase_content {
    background: white;
    padding: 30px;
  }

  .nav_top h4, .basicInformation h5, .conditionsOfUse h5,.UsageRules h5,.SyncChannel h5{
    color: #666666;
    font-size: 18px;
  }

  .content {
    background: #f2f2f6;
    padding: 20px;
    border-radius: 10px;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    margin: 20px 0;
  }

  .basicInformation h5, .conditionsOfUse h5,.UsageRules h5 ,.SyncChannel h5{
    font-size: 16px;
    margin-bottom: 20px;
  }

  .disInput {
    display: inline-block;
    margin: 0 10px;
  }

  .basicInformation ul li, .conditionsOfUse ul li,.UsageRules ul li,.SyncChannel ul li {
    font-size: 16px;
    margin: 20px 0;
  }

  .basicInformation ul li span, .conditionsOfUse ul li span,.UsageRules ul li span, .SyncChannel ul li span{
    width: 110px;
    text-align: right;
    display: inline-block;
    color: #666666;
  }

  .basicInformation ul li span b, .conditionsOfUse ul li b,.UsageRules ul li b, .SyncChannel ul li b{
    color: #fd6f70;
  }

  .basicInformation ul li i, .conditionsOfUse ul li i,.UsageRules ul li i, .SyncChannel ul li i{
    font-style: normal;
    color: #7c7c7c;
  }

  .block {
    margin-left: 15px;
  }

  .upimg {
    width: 89px;
    height: 55px;
    display: inline-block;
  }

  .footerSave{
    margin-top: 30px;
    text-align: center;
  }
  .footerSave button:nth-child(1),.footerSave button:nth-child(2){
    width: 150px;
    height: 50px;
    background: #7865dc;
    color: white;
    border: none;
    font-size: 16px;
  }
  .footerSave button:nth-child(2){
    background: white;
    color: #333333;
    border: 1px solid #cccccc;
  }

  /*预览开启时样式*/
  .kamian img{
    width: 24px;
    height: 24px;
    display: inline-block;
    margin-right: 6px;
  }

  .centerEntrance{
    width: 364px;
    padding: 20px 30px;
    background: white;
    border-radius: 10px;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;

  }
  .centerEntrance_shang{
    margin-bottom: 15px;
    text-align: center;
  }

  /*业务链接样式*/
  .businessLink_content ul li{
    width: 437px;
    height: 50px;
    padding: 0 50px 0 20px;
    overflow: hidden;
  }
  .old{
    background: #eeeeee;
  }
  .old:nth-child(1){
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    -webkit-border-top-left-radius: 5px;
   -webkit-border-top-right-radius: 5px;
  }
  .businessLink_content ul li span{
    font-size: 16px;
    line-height: 50px;
    float: left;
  }
  .businessLink_content ul li button{
    float: right;
    margin-top: 5px;
  }
  .selectLink{
    color:#ffc41d;
    border: 1px solid #ffc41d;
  }
  .selectLink:hover{
    color:#ffc41d;
    border: 1px solid #ffc41d;
  }
 
</style>
