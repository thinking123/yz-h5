import axios from 'axios'
import store from '../store'
const pro = process.env.NODE_ENV === 'production'
axios.defaults.timeout = 20000;
axios.defaults.baseURL = pro ?'http://psbc.ysmine.com/' : '/' ;

let timer = []

axios.interceptors.request.use(
    config => {
        // timer.push(setTimeout(() => {
        //     store.commit('CHANGE_LOADING_BAR', true)
        // }, 100))
        // store.commit('CHANGE_LOADING_BAR', true)
        config.headers['token'] =store.state.openid

        console.log('request' , config)
        return config;
    },
    err => {
        // clearTimeout(timer.splice(0, 1))
        // store.commit('CHANGE_LOADING_BAR', false)
        return Promise.reject(err);
    });

axios.interceptors.response.use(
    response => {
        // clearTimeout(timer.splice(0, 1))
        // store.commit('CHANGE_LOADING_BAR', false)

        return response.data
    },
    error => {
        // clearTimeout(timer.splice(0, 1))
        // console.log("网络异常")
        // store.commit('CHANGE_LOADING_BAR', false)
        return Promise.reject(error.response && error.response.data)
    });

export default axios;
