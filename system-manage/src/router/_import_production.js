module.exports = (path) => () => import(`@/pages/${path}.vue`);
