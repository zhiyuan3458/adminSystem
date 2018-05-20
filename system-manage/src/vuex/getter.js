const getters = {
  token: state => state.user.token,
  projectList: state => state.tagsView.projectList, // 子系统列表
  visitedViews: state => state.tagsView.visitedViews, // 底部导航栏显示的子系统列表
  sideBar: state => state.app.sideBar, // 菜单列表
  currentRoute: state => state.permission.currentRoute, // 当前路由信息
  addRouters: state => state.permission.addRouters, // 路由
  menus: state => state.tagsView.menus, // 菜单栏
  msg: state => state.permission.msg,
  test: state => state.permission.test
};

export default getters;
