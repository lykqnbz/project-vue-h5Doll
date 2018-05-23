import Nav from '@/views/nav.vue'

export default [
  {
    path: '/room/index',
    share:true,
    title:'房间列表',
    component: resolve => require(['@/views/room/index.vue'], resolve)
  },
  {
    path: '/live/index',
    share:true,
    title:'直播房间',
    component: resolve => require(['@/views/live/index.vue'], resolve)
  },

  {
    path: '/invite/code',
    title:'我的邀请码',
    component: resolve => require(['@/views/personal/invite/code.vue'], resolve)
  },
  {
    path: '/invite/gonglve',
    title:'邀请攻略',
    component: resolve => require(['@/views/personal/invite/gonglve.vue'], resolve)
  },
  {
    path: '/cost/index',
    title:'娃娃币消费记录',
    component: resolve => require(['@/views/personal/cost/index.vue'], resolve)
  },

  {
    path: '/mydoll/choose',
    title:'选择娃娃',
    component: resolve => require(['@/views/mydoll/choose.vue'], resolve)
  },
  {
    path: '/mydoll/exchange',
    title:'兑换娃娃',
    component: resolve => require(['@/views/mydoll/exchange.vue'], resolve)
  },
  {
    path: '/invite/input',
    title:'输入邀请码',
    component: resolve => require(['@/views/personal/invite/input.vue'], resolve)
  },
  {
    path: '/feedback/index',
    title:'用户反馈',
    component: resolve => require(['@/views/personal/feedback/index.vue'], resolve)
  },
  {
    path: '/logistics/index',
    title:'查看物流',
    component: resolve => require(['@/views/personal/logistics/index.vue'], resolve)
  },
  {
    path: '/logistics/seekResults',
    title:'物流详情',
    component: resolve => require(['@/views/personal/logistics/seekResults.vue'], resolve)
  },
  {
    path: '/banner/index',
    component: resolve => require(['@/views/banner/index.vue'], resolve)
  },
  {
    path: '/service/index',
    title:'联系客服',
    component: resolve => require(['@/views/personal/service/index.vue'], resolve)
  },
  {
    path: '/config/index',
    title:'系统设置',
    component: resolve => require(['@/views/personal/config/index.vue'], resolve)
  },
  {
    path: '/about/index',
    title:'关于我们',
    component: resolve => require(['@/views/personal/about/index.vue'], resolve)
  },
  {
    path: '/message/index',
    title:'系统管理',
    component: resolve => require(['@/views/personal/message/index.vue'], resolve)
  },
  {
    path: '/share/index',
    innerShare:true,
    title:'分享',
    component: resolve => require(['@/views/share/index.vue'], resolve)
  },
  {
    path: '/rank/edit',
    title:'我的秀',
    component: resolve => require(['@/views/rank/edit.vue'], resolve)
  },
  {
    path: '/share/index_failure',
    title:'失败分享',
    innerShare:true,
    component: resolve => require(['@/views/share/index_failure.vue'], resolve)
  },
  {
    path: '/share/index_mydoll',
    title:'我的娃娃分享',
    innerShare:true,
    component: resolve => require(['@/views/share/index_mydoll.vue'], resolve)
  },
  {
    path: '/recharge/index',
    title:'充值',
    component: resolve => require(['@/views/recharge/index.vue'], resolve)
  },
  {
    path: '/',
    component: Nav,
    children: [
      {
        path: 'index',
        share:true,
        title:'首页',
        component: resolve => require(['@/views/index.vue'], resolve)
      },
      {
        path: 'rank/index',
        title:'排行榜',
        share:true,
        component: resolve => require(['@/views/rank/index.vue'], resolve)
      },
      {
        path: 'mydoll/index',
        title:'我的娃娃',
        share:true,
        component: resolve => require(['@/views/mydoll/index.vue'], resolve)
      },
      {
        path: 'personal/index',
        share:true,
        title:'我的',
        component: resolve => require(['@/views/personal/index.vue'], resolve)
      },
    ]
  },

  //活动页面
  {
    path: '/yuandan/index',
    title:'元旦活动',
    component: resolve => require(['@/views/onlineActivity/yuandan/index.vue'], resolve)
  },
  {
    path: '/tourist/index',
    title:'',
    component: resolve => require(['@/views/tourist/index.vue'], resolve)
  },
  {
    path: '/newYear/index',
      title:'春节活动',
    component: resolve => require(['@/views/onlineActivity/newYear/index.vue'], resolve)
  },
  {
    path: '/gonglv/index',
    share:true,
    title:'大神攻略',
    component: resolve => require(['@/views/onlineActivity/gonglv/index.vue'], resolve)
  },
  {
    path: '/foolsDay/index',
    share:true,
    title:'幸运积分抽奖活动',
    component: resolve => require(['@/views/onlineActivity/foolsDay/index.vue'], resolve)
  }
]

