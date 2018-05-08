const getters = {
  visitedViews: state => state.tagsView.visitedViews,
  sideBar: state => state.app.sideBar,
  addRouters: state => state.permission.addRouters
};
export default getters;
