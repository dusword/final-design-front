import Vue from 'vue'
import VueRouter from 'vue-router'
import UserManage from '../views/UserManage'
import UserAdd from '../views/UserAdd'
import Test from '../views/Test'
import ResultSend from '../views/ResultSend'
import Index from '../views/Index'
import PredictOne from "../views/PredictOne"
import Login from "../views/Login";
import MultiUpload from "@/views/MultiUpload";
import TaskManage from "@/views/TaskManage";
import Info from "@/views/Info";

Vue.use(VueRouter)

const  routes = [
    {
        path: "/",
        name: "任务管理",
        component: Index,
        redirect:"/info",
        children: [
            {
                path: "/taskManage",
                name: "任务查询",
                component: TaskManage,
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
            {
                path: "/multiUpload",
                name: "批量检测",
                component: MultiUpload,
                meta: {
                    isLogin: true
                }
            },
            {
                path: "/predictOne",
                name: "快速检测",
                component: PredictOne,
                meta: {
                    isLogin: false
                }
            },
        ]
    },
    {
        path: "/help",
        name: "帮助",
        component: Index,
        children: [
            {
                path: "/info",
                name: "帮助",
                component: Info,
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
