import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';
import MainLayout from '@/layouts/MainLayout/MainLayout.vue';
import PageAuth from '@/views/PageAuth/PageAuth.vue';
import PageChat from '@/views/PageChat/PageChat.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MainLayout',
      component: MainLayout,
      redirect: '/auth',
      children: [
        {
          path: '/auth',
          name: 'PageAuth',
          component: PageAuth,
        },
        {
          path: '/chat',
          name: 'PageChat',
          component: PageChat,
          beforeEnter: (to, from, next) => {
            if (store.state.user === '') {
              next('/auth');
            } else {
              next();
            }
          },
        },
      ],
    },
  ],
});
