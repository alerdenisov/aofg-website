import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'

import * as getters from './getters';
import * as actions from './actions';
import * as mutations from './mutations';

Vue.use(Vuex);

const state = {
  count: 0,
  _fetches: {},
  _session: {},
  _last_route: null,
  data: {},
  githubStatus: {
    limit: 60,
    remaining: 60
  }
};

const store = new Vuex.Store({
  plugins: [createPersistedState()],
  state,
  getters,
  actions,
  mutations,
});


if (module.hot) {
  module.hot.accept([
    './getters',
    './actions',
    './mutations',
  ], () => {
    store.hotUpdate({
      getters: require('./getters'),
      actions: require('./actions'),
      mutations: require('./mutations'),
    });
  });
}

export default store;
