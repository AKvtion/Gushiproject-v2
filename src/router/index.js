import Vue from 'vue'
import Router from 'vue-router'
// import Home from '../components/Home.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login',
            name: '首页',
            hidden: true,
            component: () => import('@/components/Login')
        },
        {
            path: '/login',
            name: 'Login',
            hidden: true,
            component: () => import('@/components/Login')
        },
        {
            path: '*',
            name: 'NotFound',
            hidden: true,
            component: () => import('@/components/NotFound')
        },
        
        {
            path: '/home',
            name: '文档管理',
            iconClass: 'fa fa-users',
            redirect: '/home/poetry',
            component: () => import('@/components/Home'),
            children: [
                {
                    path: '/home/poetry',
                    name: '古诗管理',
                    iconClass: 'fa fa-list',
                    component: () => import('@/components/poetry/poetryList')
                },
                {
                    path: '/home/sentence',
                    name: '诗句管理',
                    iconClass: 'fa fa-list-ul',
                    component: () => import('@/components/sentence/sentenceList')
                },
                {
                    path: '/home/carousel',
                    name: '轮播图管理',
                    iconClass: 'fa fa-align-center',
                    component: () => import('@/components/carousel/CarouselList')
                },
                
            ]
        },
        {
            path: '/home',
            name: '用户中心',
            iconClass: 'fa fa-bar-chart',
            component: () => import('@/components/Home'),
            children: [
                {
                    path: '/home/user',
                    name: '用户管理',
                    iconClass: 'fa fa-list-alt',
                    component: () => import('@/components/user/UserList')
                },
                
            ]
        },
        // {
        //     path: '/users',
        //     name: '用户中心',
        //     iconClass: 'fa fa-user',
        //     component: () => import('@/components/Home'),
        //     children: [
        //         {
        //             path: '/users/user',
        //             name: '权限管理',
        //             iconClass: 'fa fa-user',
        //             component: () => import('@/components/users/User')
        //         }
        //     ]
        // }
    ],
    mode: 'history'
})