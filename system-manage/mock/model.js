const mongoose = require('mongoose');
const DB_URL = 'mongodb://localhost:27017';
mongoose.connect(DB_URL);
mongoose.connection.on('connected', function () {
  console.log('1243');
});

const models = {
  projects: {
    name: {type: String, require: true},
    path: {type: String, require: true},
    componentName: {type: String, require: true, default: 'mainFrame'},
    iconUrl: {type: String, require: true, default: 'mainFrame'},
    children: [
      {
        path: {type: String, require: true, default: '/index'},
        name: {type: String, require: true},
        iconUrl: {type: String, default: ''},
        componentName: {type: String, require: true},
        meta: {
          title: {type: String, require: true}
        },
        children: [
          {
            path: {type: String, default: '/index'},
            name: {type: String},
            iconUrl: {type: String, default: ''},
            componentName: {type: String}
          }
        ]
      }
    ]
  },
  menus: {
    subsystemId: {type: String, require: true},
    name: {type: String, require: true},
    iconUrl: {type: String, require: true},
    children: [
      {
        name: {type: String, require: true, default: '道路养护系统'},
        iconUrl: {type: String, require: true},
        path: {type: String, require: true},
        componentName: {type: String, require: true},
        meta: {
          title: {type: String}
        }
      }
    ]
  }
};

// 创建一个model，相当于一个表
for (var m in models) {
  mongoose.model(m, new mongoose.Schema(models[m]));
}

module.exports = {
  getModel: function (name) {
    return mongoose.model(name);
  }
};
