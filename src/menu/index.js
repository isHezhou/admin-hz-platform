import { uniqueId } from 'lodash'

/**
 * @description 给菜单数据补充上 path 字段
 * @description https://github.com/d2-projects/d2-admin/issues/209
 * @param {Array} menu 原始的菜单数据
 */
function supplementPath (menu) {
  return menu.map(e => ({
    ...e,
    path: e.path || uniqueId('d2-menu-empty-'),
    ...e.children ? {
      children: supplementPath(e.children)
    } : {}
  }))
}

export const menuHeader = supplementPath([
  { path: '/index', title: '首页', icon: 'home' },
  {
    title: '微信生态',
    icon: 'weixin',
    children: [
      {
        title: '轮播图配置',
        children: [
          { path: '/page1', title: '轮播图列表' }
        ]
      },
      {
        path: '/page2',
        title: '小程序设置',
        children: [
          { path: '/page1', title: '接口配置' },
          { path: '/page1', title: '引导图' },
          { path: '/page1', title: '授权设置' },
          { path: '/page1', title: '模板消息' }
        ]
      },
      {
        path: '/page3',
        title: '大数据管理',
        children: [
          { path: '/page1', title: '商品列表' },
          { path: '/page1', title: '订单列表' },
          { path: '/page1', title: '会员数据' }
        ]
      }
    ]
  }
])

export const menuAside = supplementPath([
  { path: '/index', title: '系统首页', icon: 'home' },
  {
    title: '商品管理',
    icon: 'shopping-basket',
    children: [
      { path: '/goodsList', title: '商品列表' },
      { path: '/goodsClass', title: '商品分类' },
      { path: '/brandManage', title: '品牌管理' },
      { path: '/freight', title: '运费设置' },
      { path: '/inventory', title: '库存管理' },
      { path: '/taoBaoAssistant', title: '淘宝助手' }
    ]
  },
  {
    title: '订单管理',
    icon: 'fa fa-shopping-basket',
    children: [
      { path: '/goods', title: '订单列表' },
      { path: '/page2', title: '退货列表' },
      { path: '/page3', title: '评价管理' },
      { path: '/page3', title: '打印单据' },
      { path: '/page3', title: '订单设置' }
    ]
  },
  {
    title: '会员管理',
    icon: 'folder-o',
    children: [
      { path: '/goods', title: '会员列表' },
      { path: '/page2', title: '提现管理' },
      { path: '/page3', title: '充值列表' },
      { path: '/page3', title: '资金管理' },
      { path: '/page3', title: '积分管理' }
    ]
  },
  {
    title: '数据管理',
    icon: 'folder-o',
    children: [
      { path: '/goods', title: '报表管理' },
      { path: '/page2', title: '订单报表' },
      { path: '/page3', title: '商品报表' }
    ]
  },
  {
    title: '权限管理',
    icon: 'folder-o',
    children: [
      { path: '/goods', title: '管理员列表' },
      { path: '/page2', title: '管理员日志' },
      { path: '/page3', title: '角色管理' }
    ]
  },
  {
    title: '营销插件',
    icon: 'folder-o',
    children: [
      { path: '/goods', title: '卡卷' },
      { path: '/page2', title: '满减' },
      { path: '/page3', title: '店铺' },
      { path: '/page3', title: '签到' },
      { path: '/page3', title: '分销' },
      { path: '/page3', title: '拼团' },
      { path: '/page3', title: '砍价' },
      { path: '/page3', title: '竞拍' },
      { path: '/page3', title: '积分商城' },
      { path: '/page3', title: '秒杀' },
      { path: '/page3', title: '平台活动管理' },
      { path: '/page3', title: '首页DIY' }
    ]
  },
  {
    title: '系统管理',
    icon: 'folder-o',
    children: [
      { path: '/goods', title: '地址管理' },
      { path: '/page2', title: '支付管理' },
      { path: '/page3', title: '短信配置' },
      { path: '/page3', title: '系统设置' },
      { path: '/page3', title: '搜索设置' }
    ]
  },
  {
    title: '广告管理',
    icon: 'folder-o',
    children: [
      { path: '/goods', title: '广告列表' }
    ]
  }
])
