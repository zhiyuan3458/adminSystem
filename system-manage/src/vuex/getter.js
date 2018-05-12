const getters = {
  projectList: state => state.tagsView.projectList,
  visitedViews: state => state.tagsView.visitedViews,
  sideBar: state => state.app.sideBar,
  addRouters: state => state.permission.addRouters,
  msg: state => state.permission.msg
};

export default getters;
