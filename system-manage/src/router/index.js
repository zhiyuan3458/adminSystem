import Vue from 'vue';
import Router from 'vue-router';
import MainFrame from '@/components/mainFrame/mainFrame.vue';
import Table from '@/pages/table/table.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MainFrame',
      component: MainFrame,
      children: [
        {path: '/table', component: Table}
      ]
    }
  ]
});
