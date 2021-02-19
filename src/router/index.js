import Vue from 'vue'
import VueRouter from 'vue-router'
import Page1 from '../views/Page1'
import Page2 from '../views/Page2'
import Page3 from '../views/Page3'
import Page4 from '../views/Page4'
import Index from '../views/Index'

Vue.use(VueRouter)

const  routes = [
    {
        path: "/",
        name: "导航1",
        component: Index,
        redirect:"/page1",
        children: [
            {
                path: "/page1",
                name: "页面1",
                component: Page1
            },
            {
                path: "/page2",
                name: "页面2",
                component: Page2,
            },
        ]
    },
    {
        path: "/navigation",
        name: "导航2",
        component: Index,
        children: [
            {
                path: "/page3",
                name: "页面3",
                component: Page3
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
