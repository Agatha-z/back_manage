// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "babel-polyfill"
import Vue from 'vue'
import App from './App'
import router from './router'
// 按需加载 element-ui
import { 
    Button,
    Select,
    Option,
    Input,
    Radio,
    RadioGroup,
    RadioButton,
    Tooltip,
    Badge,
    Pagination,
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup,
    MessageBox,
    Message, 
    Tabs,
    TabPane,
    Checkbox,
    Tree,
    CheckboxGroup,
    Switch,
    Upload,
    Rate,
    InputNumber,
    Loading,
    DatePicker,
    Dialog,
    Row,
    Col,
    Tag,
} from 'element-ui';
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'

// 打印插件引入与注册
import Print from 'vue-print-nb'
Vue.use(Print); 

Vue.config.productionTip = false
// 全局注册 axios
Vue.prototype.$axios=axios
//全局域名通用配置自动添加到url前面
axios.defaults.baseURL = 'http://192.168.2.177:8888'
//全局的 axios  请求头默认值
// axios.defaults.headers = {'Content-Type':'Access-Control-Allow-Origin'}
// axios.defaults.headers = {'Content-Type':'application/json;charset=UTF-8'}
// axios.defaults.headers. = {'Content-Type': 'text/plain;charset=UTF-8'},

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // console.log('在发送请求之前做些什么',config)
    config.headers={
        'Content-Type':'application/json;charset=UTF-8',
        // token:'22323232'
    }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    // console.log('对请求错误做些什么',error)
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    // console.log('对响应数据做点什么',response)
    return response;
  }, function (error) {
    // 对响应错误做点什么
    console.log('对响应错误做点什么',JSON.stringify(error))
    // 请求出错提示用户
    // Message.error('请求出现错误！');
    return Promise.reject(error);
  });

// 注册按需加载的element-ui组件
Vue.component(Button.name, Button);
Vue.component(Select.name, Select);
Vue.component(Option.name, Option);
Vue.component(Input.name, Input);
Vue.component(Radio.name, Radio);
Vue.component(RadioGroup.name, RadioGroup);
Vue.component(RadioButton.name, RadioButton);
Vue.component(Tooltip.name, Tooltip);
Vue.component(Badge.name, Badge);
Vue.component(Pagination.name, Pagination);
Vue.component(Menu.name, Menu);
Vue.component(Submenu.name, Submenu);
Vue.component(MenuItem.name, MenuItem);
Vue.component(MenuItemGroup.name, MenuItemGroup);
Vue.component(CollapseTransition.name, CollapseTransition);
Vue.component(Checkbox.name, Checkbox);
Vue.component(CheckboxGroup.name, CheckboxGroup);
Vue.component(Tree.name, Tree);
Vue.component(Tabs.name, Tabs);
Vue.component(TabPane.name, TabPane);
Vue.component(Switch.name, Switch);
Vue.component(Upload.name, Upload);
Vue.component(InputNumber.name, InputNumber);
Vue.component(Rate.name, Rate);
Vue.component(DatePicker.name, DatePicker);
Vue.component(Dialog.name, Dialog);
Vue.component(Row.name, Row);
Vue.component(Col.name, Col);
Vue.component(Tag.name, Tag);
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$loading = Loading.service;  //全局注册loading
// 开启 loding
// var loading=this.$loading({
//     target:'.content_scroll_loading',
// })
// ======================================
// 关闭 loading
// loading.close()
//
//====================全局注册loading==== 

// Vue.prototype.$closeLoading=Loading.service({fullscreen: true });
// 全局侧边栏组件
Vue.component('sidebars',resolve => require(['@/components/common/sidebar.vue'], resolve))
// 全局侧头部组件
Vue.component('headers',resolve => require(['@/components/common/header.vue'], resolve))

// 门店选择下拉框
// 属性  storeSelectData    门店数据          默认数据看组件
// 属性  alignment          接受两个字符串     top/bottom   默认下对其
// 属性  nowSelectOn        默认选中的项目     选中的id     数组      
// 属性  inputWidth         输入框的宽度      只能为数字      如   230   => 230px
// 属性  placeholder        输入框内提示文字   第一个参数  未选中   第二个参数   选中     数组   如   ['请选择门店','已选择门店点击下拉按钮查看']
// 事件  selectChange         状态栏变化事件    返回给父组件 选中的值
Vue.component('storeSelect',resolve => require(['@/components/common/storeSelect.vue'], resolve))

// 食品数据选择
// 属性   selectData  菜品数据    数据格式查看组件默认参数
// 属性   HasChosen   默认选中菜品  数据格式查看组件默认参数
// 事件   changeCheck 选中状态变化   传递给父组件  已选中菜品唯一标识
Vue.component('footCommon',resolve => require(['@/components/common/footCommon.vue'], resolve))

// 全局  复用顶部组件 
// 以下属性为必传
// 属性  padding_c          样式                必传   是否加边框
// 属性  placeholder_txt    输入框              placeholder 文字
// 属性  select_data        状态选择数据        [{inxex:'下标',txt:'文字'}]
// 属性  brand_data         品牌选择数据        [{inxex:'下标',txt:'文字'}]
// 属性  area_data          区域选择数据        [{inxex:'下标',txt:'文字'}]
// 事件  @input-change      搜索框按钮点击事件   附带参数 
// 事件  @state-change      状态change事件      附带参数 
// 事件  @brand-change      品牌change事件      附带参数 
// 事件  @area-change       区域change事件      附带参数 
Vue.component('comTopHeader',resolve => require(['@/components/common/reuseS.vue'], resolve))

// 菜品库 公共头部
// 属性  select_data        状态选择数据        [{inxex:'下标',txt:'文字'}]
// 属性  placeholder_txt    输入框placeholder         
// 属性  storeSelectData    门店数据                     默认数据看组件
// 事件  selectChange       返回给父组件 选中门店数据 id   
// 事件  seachBtn           搜索框点击搜索按钮      返回给父组件  搜索框内容
// 事件  stateChage         状态栏变化事件    返回给父组件 选中的值
Vue.component('dishesHeader',resolve => require(['@/components/common/dishesHeader.vue'], resolve))

// 全局注册省市级 复用组件
// 属性  provinces_n   默认选择的省份        值必须为省份代码
// 属性  city_n        默认选择的城市        值必须为城市代码 
// 属性  area_n        默认选择的地区        值必须为地区代码  
// 属性  Level         几级联动             值必须为数字         最高3级  
// 事件  SelectChange  选择框发生变化事件    返回省市级数据   
Vue.component('provincial',resolve => require(['@/components/common/provincial.vue'], resolve))

// 全局注册穿梭框 复用组件
// 属性  selectedList 已经添加的菜品         值必须
// 属性  footList     所有菜品json格式数据   注意格式结构 分类搜索全是js处理  值必须
// 属性  footClass    菜品分类  所有菜品关联  具体查看组件内部               值必须  
// 事件  @change      数据发生变化   返回两个参数   第一个参数  菜品明细操作后的数据 第二个 是否正在添加备选 用于用户提交时  阻止用户提交不完整数据  
Vue.component('transfer',resolve => require(['@/components/common/transfer.vue'], resolve))

// 全局注册 规格管理菜品关联穿梭框
// 属性  selectedList 已经添加的菜品         值必须
// 属性  footList     所有菜品json格式数据   注意格式结构 分类搜索全是js处理  值必须
// 属性  footClass    菜品分类  所有菜品关联  具体查看组件内部               值必须  
// 事件  @change      数据发生变化   返回菜品明细操作后的数据
Vue.component('associated',resolve => require(['@/components/common/transfer_2.vue'], resolve))

// 全局注册 规格管理菜品分类关联穿梭框
// 事件  @change      数据发生变化   返回分类关联菜品操作后的数据
Vue.component('ClassAssociated',resolve => require(['@/components/common/ClassAssociated.vue'], resolve))

// 全局注册 规格管理菜品关联穿梭框
// 事件  @change      数据发生变化   返回关联菜品操作后的数据
Vue.component('AsDishes',resolve => require(['@/components/common/AsDishes.vue'], resolve))

// 全局注册 加料管理菜品分类关联穿梭框
// 事件  @change      数据发生变化   返回关联菜品操作后的数据
Vue.component('associated1',resolve => require(['@/components/common/associated1.vue'], resolve))

// 全局注册 加料管理菜品关联穿梭框
// 事件  @change      数据发生变化   返回关联菜品操作后的数据
Vue.component('associated2',resolve => require(['@/components/common/associated2.vue'], resolve))

// 全局注册 菜品变价组件
// 属性 placeholder  input  输入框  placeholder
// 属性 inputWidth   输入框宽度    纯数字
// 属性 footList     菜品数据      数据结构查看组件
// 属性 already      默认已选中菜品 数据结构查看组件
// 事件 addChange    返回给父组件变化后的值   函数默认参数data
Vue.component('foodBase',resolve => require(['@/components/common/foodBase.vue'], resolve))

// 全局注册订单管理公共头部
// 属性  dayRadios    单选框 今天 明天  .....   值         参数类型参考组件默认参数
// 属性  storeData    门店选择数据参数                     参数类型参考组件默认参数
// 属性  inputsList   更多筛选的 输入框     数组           ['原因','操作人']......
// 事件  submitSeach  搜索条件变化   提交给父组件  所有输入框的内容
Vue.component('orderComHead',resolve => require(['@/components/common/orderComHead.vue'], resolve))

// 全局注册订单管理中间显示
// 属性  data_list  组件内显示数据    类型参考组件内部默认数据
Vue.component('orderCenter',resolve => require(['@/components/common/orderCenter.vue'], resolve))

// 全局注册模态框 自定义
// 属性 model  是否显示模态框   默认值  false
// 属性 title  模态框标题   
// 属性 style_name  弹框样式     
// 属性 button 按钮 默认值  查看组件内部样式   
// [
//   {name:'取消',type:'info',events:'cancel'},
//   {name:'确认',type:'success',events:'confirm'}
// ]
//  name   按钮文字     type   按钮样式   element   ui    
//  events  触发父组件的事件  按钮  如果需要取消按钮  events 必须传入  cancel字段
//  绑定事件 为events  里面的字段
Vue.component('ModalDialog',resolve => require(['@/components/common/ModalDialog.vue'], resolve))

// 会员标签   关注门店-选择门店组件
// 
Vue.component('SelectStores',resolve => require(['@/components/common/SelectStores.vue'], resolve))

// 全局注册 上传文件公共组件
Vue.component('UpdatFile',resolve => require(['@/components/common/UpdatFile.vue'], resolve))

import {store} from './store/store'
/* eslint-disable no-new */
new Vue({
    store:store,
    el: '#app',
    // render: h => h(App),
    router,
    components: { App },
    template: '<App/>'
})
