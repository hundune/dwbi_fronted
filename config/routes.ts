export default [
  {path: '/user/edit',name: '我的信息', icon: 'user',component: './User/UserEdit'},
  {
    path: '/user',
    layout: false,
    routes: [{ name: '登录', path: '/user/login', component: './User/Login' },
      {name: '注册', path: '/user/register', component: './User/Register'},
    ],

  },
  {path: '/chart', name: '智能分析图表', icon: 'pieChart',
    hideChildrenInMenu: false,
    routes: [
      {path: '/chart/add', name: '分析图表(同步)', component: './Chart/AddChart'},
      {path: '/chart/add_async', name: '分析图表(异步)', component: './Chart/AddChartAsync'},
      {path: '/chart/add_mq', name: '分析图表(队列)', component: './Chart/AddChartAsyncMq'},
      {path: '/chart/info/:id',component: './Chart/MyChartInfo'},
    ]},
  {path: '/text', name: '智能分析文本', icon: 'form',
    hideChildrenInMenu: false,
    routes: [
      {path: '/text/add', name: '分析文本(队列)', component: './Text/AddTextMQ'},
      {path: '/text/info/:id',component: './Text/MyTextInfo'},
    ]},
  {path: '/my_result', name: '智能分析结果', icon: 'barChart',
    hideChildrenInMenu: false,
    routes: [
      {path: '/my_result/my_chart',name: '我的图表', component: './Mine/MyChart'},
      {path: '/my_result/my_md',name: '我的文本', component: './Mine/MyText'},
    ]},
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      { path: '/admin', redirect: '/admin/sub-page' },
      { path: '/admin/sub-page', name: '二级管理页', component: './Admin' },
    ],
  },
  { path: '/', redirect: '/user/edit' },
  { path: '*', layout: false, component: './404' },
];
