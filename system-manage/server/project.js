const express = require('express');
const router = express.Router();
// const utility = require('utility');
const model = require('../mock/model');
const projects = model.getModel('projects');
const menus = model.getModel('menus');
// const json = [
//   {
//     id: 1,
//     name: '道路养护系统',     // 子系统名称
//     path: '/roadMaintenanceSystem',  // 子系统路径
//     component: 'mainFrame',   // 必须为这个值，直接默认值为它
//     children: [              // 首页信息
//        {
//           // 对应的首页路径，默认值为空即可
//           path: '',
//           // 首页组件
//           component: 'roadMaintenanceSystem/index',
//           // 首页名称
//           name: '道路养护系统首页',
//         },
//         {
//           path: '/standard',
//           name: '规范标准管理',
//           imgUrl: 'standard',
//           // 二级导航栏名称名称
//           componentName: 'roadMaintenanceSystem/standard',
//         },
//         {
//           path: '/basicData',
//           name: '基础数据管理',
//           imgUrl: 'database',
//           componentName: 'roadMaintenanceSystem/basicData'
//         },
//         {
//           path: '/maintenanceService',
//           name: '养护业务管理',
//           imgUrl: 'daily-maintenance',
//           componentName: 'roadMaintenanceSystem/maintenanceService'
//         },
//         {
//           path: '/monitorAndGuard',
//           name: '监测及应急保障',
//           imgUrl: 'safeguard',
//           componentName: 'roadMaintenanceSystem/monitorAndGuard'
//         },
//         {
//           path: '/scienceDecision',
//           name: '科学决策',
//           imgUrl: 'gradmale_avatar',
//           componentName: 'roadMaintenanceSystem/scienceDecision'
//         },
//         {
//           path: '/scienceDecision',
//           name: '综合查询',
//           imgUrl: 'earth_search',
//           componentName: 'roadMaintenanceSystem/scienceDecision',
//         },
//         {
//           path: '/informationSharing',
//           name: '信息共享',
//           imgUrl: 'share_service',
//           componentName: 'roadMaintenanceSystem/informationSharing'
//         },
//         {
//           path: '/systemManage',
//           name: '系统管理',
//           imgUrl: 'tool',
//           componentName: 'roadMaintenanceSystem/systemManage'
//         }
//     ]
// },
//   {
//     id: 2,
//     name: '桥梁监测系统'
//   }
// ];

// projects.remove({}, function (err, doc) {
//   console.log(1234);
// });

// projects.create({
//   name: '道路养护系统',
//   path: '/roadMaintenanceSystem',
//   componentName: 'mainFrame',
//   children: [
//     {
//       path: '/',
//       name: '道路养护系统',
//       componentName: 'roadMaintenanceSystem/index',
//       meta: {
//         title: '道路养护系统'
//       }
//     },
//     {
//       path: '/standard',
//       name: '道路养护系统',
//       imgUrl: 'standard',
//       componentName: 'roadMaintenanceSystem/standard',
//       meta: {
//         title: '规范标准管理'
//       }
//     },
//     {
//       path: '/basicData',
//       name: '道路养护系统',
//       imgUrl: 'database',
//       componentName: 'roadMaintenanceSystem/basicData',
//       meta: {
//         title: '基础数据管理'
//       }
//     },
//     {
//       path: '/maintenanceService',
//       name: '道路养护系统',
//       imgUrl: 'daily-maintenance',
//       componentName: 'roadMaintenanceSystem/maintenanceService',
//       meta: {
//         title: '养护业务管理'
//       }
//     },
//     {
//       path: '/monitorAndGuard',
//       name: '道路养护系统',
//       componentName: 'roadMaintenanceSystem/monitorAndGuard',
//       imgUrl: 'safeguard',
//       meta: {
//         title: '监测及应急保障'
//       }
//     },
//     {
//       path: '/scienceDecision',
//       name: '道路养护系统',
//       imgUrl: 'gradmale_avatar',
//       componentName: 'roadMaintenanceSystem/scienceDecision',
//       meta: {
//         title: '科学决策'
//       }
//     },
//     {
//       path: '/scienceDecision',
//       name: '道路养护系统',
//       imgUrl: 'earth_search',
//       componentName: 'roadMaintenanceSystem/scienceDecision',
//       meta: {
//         title: '综合查询'
//       }
//     },
//     {
//       path: '/informationSharing',
//       name: '道路养护系统',
//       imgUrl: 'share_service',
//       componentName: 'roadMaintenanceSystem/informationSharing',
//       meta: {
//         title: '信息共享'
//       }
//     },
//     {
//       path: '/systemManage',
//       name: '道路养护系统',
//       imgUrl: 'tool',
//       componentName: 'roadMaintenanceSystem/systemManage',
//       meta: {
//         title: '系统管理'
//       }
//     }
//   ]
// }, function (err, doc) {
//   console.log(1234);
// });

// menus.remove({}, function (err, doc) {
//   console.log(doc);
// });
//
// menus.create({projectId: 1, name: '基础数据管理', imgUrl: 'database', children: [{name: '道路养护系统', imgUrl: 'earth_search', path: '/table', componentName: 'roadMaintenanceSystem/table', meta: {title: '区间路段信息'}}, {name: '道路养护系统', imgUrl: 'share_service', path: '/charts/charts', componentName: 'charts/charts', meta: {title: '养护路段信息'}}]}, function (err, doc) {
//   console.log(213);
// });

/* 获取所有项目 */
router.get('/list', function (req, res) {
  projects.find({}, function (err, doc) {
    if (!err) {
      res.json({code: 200, data: doc});
    } else {
      res.json({code: 1, msg: '后台出错！'});
    }
  });
});

// 获取子列表
router.get('/menu', function (req, res) {
  let { id } = req.query;
  menus.find({projectId: id}, function (err, doc) {
    res.json({code: 200, data: doc});
  });
});
// 完善boss或者genius信息
// router.post('/update', function (req, res) {
//   const { userid } = req.cookies;
//   if(!userid) {
//     res.json({code: 1});
//   }
//   const body = req.body;
//   Users.findByIdAndUpdate(userid, body, function (err, doc) {
//     if(!err) {
//       const data = Object.assign({},{
//         user: doc.name,
//         type: doc.type
//       }, body);
//       return res.json({code: 0, data});
//     }
//   });
// });

module.exports = router;
