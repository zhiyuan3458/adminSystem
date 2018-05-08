const mongoose = require('mongoose');
const DB_URL = 'mongodb://localhost:27017';
mongoose.connect(DB_URL);
mongoose.connection.on('connected', function () {
  console.log('1243');
});

const models = {
  projects: {
    id: { type: String, require: true },
    name: {type: String, require: true},
    url: {type: String, require: true},
    component: {type: String, require: true}
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
