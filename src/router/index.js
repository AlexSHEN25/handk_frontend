import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'

Vue.use(VueRouter)

const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error => error)
}
const routerReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(location) {
    return routerReplace.call(this, location).catch(error => error)
}

const routes = [
    {
        path: '/home',
        name: 'home',
        meta: {title: '首页'},
        component: Home
    },
    {
        path: '/pdf',
        name: 'pdfs',
        meta: {title: 'pdf预览'},
        component: () => import(/* webpackChunkName: "intro" */ '../views/products/pdf.vue')
    },
    {
        path: '/intro/:id',
        name: 'intro',
        meta: {title: 'H&K合作商简介'},
        component: () => import(/* webpackChunkName: "intro" */ '../views/Intro.vue')
    },
    {
        path: '/brand_plist/:id?',
        name: 'brand_plist',
        meta: {title: '品牌产品册资料'},
        component: () => import(/* webpackChunkName: "brand_products" */ '../views/brand_products/List.vue')
    },
    {
        path: '/brand_pinfo/:id',
        name: 'brand_pinfo',
        meta: {title: '产品册资料'},
        component: () => import(/* webpackChunkName: "brand_products" */ '../views/brand_products/Info.vue')
    },
    {
        path: '/store',
        name: 'store',
        meta: {title: 'H&K商城'},
        redirect: '/store/list',
        component: () => import(/* webpackChunkName: "store" */ '../views/store/index.vue'),
        children: [
            {
                path: 'list',
                name: 'store_list',
                meta: {title: 'H&K商城'},
                component: () => import(/* webpackChunkName: "store" */ '../views/store/List.vue'),
            },
            {
                path: 'detail/:id',
                name: 'store_detail',
                meta: {title: 'H&K商城详情'},
                component: () => import(/* webpackChunkName: "store" */ '../views/store/Detail.vue'),
            },
        ]
    },
    {
        path: '/products_list/:id?',
        name: 'products_list',
        meta: {title: '产品册资料'},
        component: () => import(/* webpackChunkName: "products_info" */ '../views/products/List.vue')
    },
    {
        path: '/products_info/:id',
        name: 'products_info',
        meta: {title: '产品册资料'},
        component: () => import(/* webpackChunkName: "products_info" */ '../views/products/Info.vue')
    },
    {
        path: '/products_info1/:id',
        name: 'products_info1',
        meta: {title: '产品册资料'},
        component: () => import(/* webpackChunkName: "products_info" */ '../views/products/Info1.vue')
    },
    {
        path: '/japan_freight',
        name: 'japan_freight',
        meta: {title: '日本货运'},
        redirect: '/japan_freight/list',
        component: () => import(/* webpackChunkName: "japan_freight" */ '../views/japan_freight/index.vue'),
        children: [
            {
                path: 'list',
                name: 'japan_freight_list',
                meta: {title: '日本货运'},
                component: () => import(/* webpackChunkName: "japan_freight" */ '../views/japan_freight/List.vue'),
            },
            {
                path: 'detail/:id',
                name: 'japan_freight_detail',
                meta: {title: '日本货运详情'},
                component: () => import(/* webpackChunkName: "japan_freight" */ '../views/japan_freight/Detail.vue'),
            },
        ]
    },
    {
        path: '/helper',
        name: 'helper',
        meta: {title: '帮助中心'},
        component: () => import(/* webpackChunkName: "helper" */ '../views/Helper.vue')
    },
    {
        path: '/join_us',
        name: 'join_us',
        meta: {title: '加入我们'},
        component: () => import(/* webpackChunkName: "join_us" */ '../views/JoinUs.vue')
    },
    {
        path: '/my',
        name: 'my',
        meta: {title: '我的订单'},
        redirect: '/my/order/list',
        component: () => import(/* webpackChunkName: "order" */ '../views/my/order/index.vue')
    },
    {
        path: '/my',
        name: 'my',
        meta: {title: '个人中心'},
        redirect: '/my/account',
        component: () => import(/* webpackChunkName: "my" */ '../views/my/index.vue'),
        children: [
            {
                path: 'account',
                name: 'account',
                meta: {name: '账户安全'},
                component: () => import(/* webpackChunkName: "my" */ '../views/my/Account.vue'),
            },
            {
                path: 'order',
                name: 'order',
                redirect: '/my/order/list',
                component: () => import(/* webpackChunkName: "order" */ '../views/my/order/index.vue'),
                children: [
                    {
                        path: 'list',
                        name: 'order_list',
                        meta: {name: '订单列表'},
                        component: () => import(/* webpackChunkName: "order" */ '../views/my/order/List.vue'),
                    },
                    {
                        path: 'detail/:id',
                        name: 'order_detail',
                        meta: {name: '订单详情'},
                        component: () => import(/* webpackChunkName: "order" */ '../views/my/order/Detail.vue'),
                    },
                ]
            },
            {
                path: 'p_collect',
                name: 'p_collect',
                meta: {name: '产品册收藏'},
                component: () => import(/* webpackChunkName: "my" */ '../views/my/PCollect.vue'),
            },
            {
                path: 'a_collect',
                name: 'a_collect',
                meta: {name: '文章收藏'},
                component: () => import(/* webpackChunkName: "my" */ '../views/my/ACollect.vue'),
            },
        ]
    },
    {
        path: '/cart',
        name: 'cart',
        meta: {title: '购物车'},
        component: () => import(/* webpackChunkName: "cart" */ '../views/cart/index.vue')
    },
    {
        path: '/rich/:type',
        name: 'rich',
        meta: {title: ''},
        component: () => import(/* webpackChunkName: "rich" */ '../views/Rich.vue')
    },
    {
        path: '/about_us',
        name: 'about_us',
        meta: {title: ''},
        component: () => import(/* webpackChunkName: "about_us" */ '../views/AboutUs.vue')
    },
    {
        path: '/',
        redirect: '/home',
    }
]

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title || 'H&K商城'
    next()
})

export default router
