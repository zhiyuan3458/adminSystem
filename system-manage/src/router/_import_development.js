module.exports = (directory, file) => require('@/pages/' + directory + '/' + file + '/' + file + '.vue').default; // vue-loader at least v13.0.0+
