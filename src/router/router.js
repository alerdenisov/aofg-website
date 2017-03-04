import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/components/Hello';
import Repositories from '@/components/Repositories';
import ThreadsList from '@/components/ThreadsList';
import Repository from '@/components/Repository';
import Thread from '@/components/Thread';
import _Inside from '@/components/_Inside';
import _Middlewares from '@/components/_Middlewares';

Vue.use(Router);


const router = new Router({
  mode: 'history',
  routes: [
  { 
    path: '/',
    component: _Middlewares,
    children: [
    {
      path: '',
      name: 'Home',
      component: Hello,
    },
    {
      path: '/__inside',
      name: '_Inside',
      component: _Inside,
      children: [
      {
        path:'/repositories',
        name: 'Repositories',
        props: { repositoriesDomain: 'aofg', repositoriesType: 'orgs' },
        component: Repositories
      },
      {
        path: '/repo/:repositoryId',
        redirect: '/repo/:repositoryId/threads',
        name: 'Repository',
        component: Repository,
        props: true,
        children: [
        {
          path: 'threads',
          name: 'Threads',
          component: ThreadsList
        },
        {
          path: 'thread/:threadNumber',
          name: 'Thread',
          props: true,
          component: Thread
        }]
      }
      ]
    },
    ]
  }
  ]
});


router.afterEach(function (transition) {
  console.log('test')
  document.getElementById('app').focus();
});

export default router;