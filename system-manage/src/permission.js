import router from './router';
import store from './vuex';

router.beforeEach((to, from, next) => {
  console.log(3124);
  if (to.path === '/table') {
    store.dispatch('getRouters').then(() => {
      console.log(store.getters.addRouters);
      router.addRoutes(store.getters.addRouters);
      next({ ...to, replace: true });
    });
  }
});
