const express = require('express');
const router = express.Router();
// const utility = require('utility');
const model = require('../mock/model');
const projects = model.getModel('projects');

// router.get('/list1', function (req, res) {
//     res.clearCookie('userid');
//     res.clearCookie('user');
//     Users.remove({}, function (err, doc) {
//         if(!err) {
//             res.json(doc);
//         }
//     });
// });

// projects.create({id: 1, name: '道路养护系统', url: '/roadMaintenanceSystem/list', component: 'index'}, function (err, doc) {
//   if (!err) {
//     console.log('chonggong');
//   } else {
//     console.log('fail');
//   }
// });

// projects.remove({}, function (err, doc) {
//   console.log(doc);
// });

/* 获取所有项目 */
router.get('/list', function (req, res) {
  projects.find({}, function (err, doc) {
    if (!err) {
      res.json({code: 0, data: doc});
    } else {
      res.json({code: 1, msg: '后台出错！'});
    }
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
