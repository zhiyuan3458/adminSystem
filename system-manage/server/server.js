const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
// 连接socket.io
const server = require('http').Server(app);
// Chat.remove({}, function () {
// });

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(cookieParser());

// 获取项目的名字等信息
const project = require('./project');
app.use('/ct-base-service', project);
// 创建一个model，相当于一个表
// const users = mongoose.model('users', new mongoose.Schema({
//     'name': {type: String, require: true},
//     'age': {type: Number, require: true}
// }));

// 新增一条记录
// users.create({
//     name: 'xiaoxi',
//     age: 16
// }, function (err, doc) {
//     if(!err) {
//         console.log(doc);
//     }else {
//         console.log(err);
//     }
// });

// 删除一条记录
// users.remove({name: 'xiaoxi'}, function (err, doc) {
//     console.log(doc);
// });

// 更新一条记录
// users.update({name: 'xiaohua'},{'$set': {age: 22}}, function (err, doc) {
//     if(!err) {
//         console.log(doc);
//     }else {
//         console.log(err);
//     }
// });

// find   查询记录
// app.use('/data', function (req, res) {
//     users.find({}, function (err, doc) {
//         console.log(doc);
//         return res.json(doc);
//     });
// });

server.listen(9094, function () {
  console.log('server is ok');
});
