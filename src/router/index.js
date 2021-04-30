import Vue from 'vue'
import VueRouter from 'vue-router'
import UserManage from '../views/UserManage'
import UserAdd from '../views/UserAdd'
import Test from '../views/Test'
import ResultSend from '../views/ResultSend'
import Index from '../views/Index'
import PredictOne from "../views/PredictOne"
import Login from "../views/Login";

Vue.use(VueRouter)

const  routes = [
    {
        path: "/",
        name: "用户管理",
        component: Index,
        redirect:"/login",
        children: [
            {
                path: "/userManage",
                name: "用户查询",
                component: UserManage,
                meta: {
                    isLogin: true
                }
            },
            {
                path: "/userAdd",
                name: "用户添加",
                component: UserAdd,
                meta: {
                    isLogin: true
                }
            },
        ]
    },
    {
        path: "/navigation",
        name: "图片检测",
        component: Index,
        children: [
            // {
            //     path: "/test",
            //     name: "Test",
            //     component: Test,
            //     meta: {
            //         isLogin: true
            //     }
            // },
            // {
            //     path: "/resultSend",
            //     name: "ResultSend",
            //     component: ResultSend,
            //     meta: {
            //         isLogin: true
            //     }
            // },
            {
                path: "/predictOne",
                name: "快速检测",
                component: PredictOne,
                meta: {
                    isLogin: false
                }
            },
            {
                path: "/login",
                name: "登录注册",
                component: Login,
                meta: {
                    isLogin: false
                }
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
