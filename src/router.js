import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入路由组件文件
const Home = () => import(/* webpackChunkName: 'home' */'./views/Home.vue')
const Ant = () => import(/* webpackChunkName: 'ant' */'./views/Ant.vue')
const Cases = () => import('./views/Cases.vue')

Vue.use(VueRouter)
const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/ant',
        name: 'ant',
        component: Ant
    },
    {
        path: '/cases',
        name: 'Cases',
        component: Cases
    }
]

export default new VueRouter({
    routes
})

