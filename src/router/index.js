import Vue from 'vue'
import VueRouter from 'vue-router'
import UserManage from '../views/UserManage'
import UserAdd from '../views/UserAdd'
import Test from '../views/Test'
import Page4 from '../views/Page4'
import Index from '../views/Index'

Vue.use(VueRouter)

const  routes = [
    {
        path: "/",
        name: "用户管理",
        component: Index,
        redirect:"/UserManage",
        children: [
            {
                path: "/userManage",
                name: "用户查询",
                component: UserManage
            },
            {
                path: "/userAdd",
                name: "用户添加",
                component: UserAdd
            },
        ]
    },
    {
        path: "/navigation",
        name: "导航2",
        component: Index,
        children: [
            {
                path: "/test",
                name: "Test",
                component: Test
            },
            {
                path: "/page4",
                name: "页面4",
                component: Page4
            },
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
})

export default router
