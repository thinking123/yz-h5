import "@babel/polyfill"
import './compatibility/flexible'
// import jQuery from './libs/jquery'
// import './libs/load-image'
// import './libs/crop'
// import 'cropperjs'
// import 'cropper'
// import './debug'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import App from './App.vue'
import routes from './router'
import store from './store'
import VueAwesomeSwiper from 'vue-awesome-swiper'

import './assets/css/index.css'
// import 'weui'
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';

Vue.use(VueAwesomeSwiper, {
    direction: 'vertical', // 垂直切换选项
    loop: true,
})
Vue.config.productionTip = false
Vue.use(VueRouter)

const router = new VueRouter({
    // mode: 'history',
    routes
})

router.beforeEach((pageTo, pageFrom, next) => {


    let l = location;
    let h = l.href
    console.log('route 当前href' , h)
    const reg = /[?].*[#]/
    if(h.match(reg)){
        let r = l.href.replace(reg , '#')

        console.log('r' , r)
        l.href = r
        return

    }


    let {openid} = pageTo.query
    console.log('pageTo' , pageTo , pageTo.query)



    if(openid){
        console.log('get openid' , openid)
        store.commit('setOpenid' , openid)
    }
    next()
})

router.afterEach((route) => {
    document.title = route.meta.title;
});

new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app')
