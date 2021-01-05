import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

/**
 * 在主框架内显示
 */
const frameIn = [
  {
    path: '/',
    redirect: { name: 'index' },
    component: layoutHeaderAside,
    children: [
      // 首页
      {
        path: 'index',
        name: 'index',
        meta: {
          auth: true
        },
        component: _import('system/index')
      },
      // 商品管理
      {
        path: 'goodsList',
        name: 'goodsList',
        meta: {
          title: '商品列表',
          auth: true
        },
        component: _import('goods/goodsList')
      },
      {
        path: 'goodsClass',
        name: 'goodsClass',
        meta: {
          title: '商品分类',
          auth: true
        },
        component: _import('goods/goodsClass')
      },
      {
        path: 'brandManage',
        name: 'brandManage',
        meta: {
          title: '品牌管理',
          auth: true
        },
        component: _import('goods/brandManage')
      },
      {
        path: 'freight',
        name: 'freight',
        meta: {
          title: '运费设置',
          auth: true
        },
        component: _import('goods/freight')
      },
      {
        path: 'inventory',
        name: 'inventory',
        meta: {
          title: '库存管理',
          auth: true
        },
        component: _import('goods/inventory')
      },
      {
        path: 'taoBaoAssistant',
        name: 'taoBaoAssistant',
        meta: {
          title: '淘宝助手',
          auth: true
        },
        component: _import('goods/taoBaoAssistant')
      },
      // 系统 前端日志
      {
        path: 'log',
        name: 'log',
        meta: {
          title: '前端日志',
          auth: true
        },
        component: _import('system/log')
      },
      // 刷新页面 必须保留
      {
        path: 'refresh',
        name: 'refresh',
        hidden: true,
        component: _import('system/function/refresh')
      },
      // 页面重定向 必须保留
      {
        path: 'redirect/:route*',
        name: 'redirect',
        hidden: true,
        component: _import('system/function/redirect')
      }
    ]
  }
]

/**
 * 在主框架之外显示
 */
const frameOut = [
  // 登录
  {
    path: '/login',
    name: 'login',
    component: _import('system/login')
  }
]

/**
 * 错误页面
 */
const errorPage = [
  {
    path: '*',
    name: '404',
    component: _import('system/error/404')
  }
]

// 导出需要显示菜单的
export const frameInRoutes = frameIn

// 重新组织后导出
export default [
  ...frameIn,
  ...frameOut,
  ...errorPage
]
