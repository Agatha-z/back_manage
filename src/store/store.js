import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state:{
        RoutingOverloading:'',//实现点击路由重载
        SmallScreen:false,//是否水平折叠侧边栏
    }
})