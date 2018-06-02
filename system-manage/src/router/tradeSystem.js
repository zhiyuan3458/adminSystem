/* 交易平台系统的路由 */

/* 主框，永远不变 */
const mainFrame = (resolve) => import('@/pages/mainFrame/mainFrame');
const index = (resolve) => import('@/pages/tradeSystem/index');
const listCompanyInfo = (resolve) => import('@/pages/tradeSystem/cydwxxtbjwh/listCompanyInfo');
const listMemberInfo = (resolve) => import('@/pages/tradeSystem/cydwxxtbjwh/listMemberInfo');

export const tradeystemRouters = [
  {
    path: 'tradeSystem',
    component: mainFrame,
    children: [
      {
        path: '',
        component: index,
        name: '交易平台首页',
        meta: {
          subSystemName: '交易平台系统'
        }
      },
      {
        path: '/listCompanyInfo',
        component: listCompanyInfo,
        name: '企业信息填报及维护',
        meta: {
          subSystemName: '交易平台系统'
        }
      },
      {
        path: '/listMemberInfo',
        component: listMemberInfo,
        name: '人员信息填报及维护',
        meta: {
          subSystemName: '交易平台系统'
        }
      }
    ]
  }
];
