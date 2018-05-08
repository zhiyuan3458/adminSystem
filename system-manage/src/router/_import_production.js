module.exports = (directory, file) => () => import(`@/page/${directory}/${file}/${file}.vue`);
