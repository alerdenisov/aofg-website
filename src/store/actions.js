export const increment = ({ commit }) => commit('increment');
export const decrement = ({ commit }) => commit('decrement');


import Axios from 'axios'
import sleep from 'sleep-promise'
import vue from 'vue'

// Fetch
export async function fetch({ commit, state }, request) {
  try {
    if(typeof request !== 'object')
      throw "Request should be an object";

    const { url, method, axios, token, config } = request;

    if(typeof url !== 'string') 
      throw "Request should contains a url " + request;

    if(typeof method !== 'string') 
      throw "Request should contains type of request method" + request;

    if(typeof token !== 'string') 
      throw "Request should contains token of request to cache results" + request;

    if(state._fetches[url]) 
    {
      console.log('request in progress: ', state._fetches[url].task)
      await state._fetches[url].task;
      return;
    }

    commit('fetchInit', { token, task: this });

    const answer = await Axios[method](url, axios);

    await sleep(1000);

    commit('fetch', { token, data: answer.data });

    commit('fetchDone', { token });

    commit('increment');

  } catch(err) {
    console.error(`[FETCH] ${err}`);
    commit('fetchDone', { token: request.token });
    throw err;
  }
}

// export async function fetchRepositories({ state, dispatch, commit }, {repositoriesDomain}) {
//   try {
//     if(typeof repositoriesDomain !== 'string')
//       throw "Request object must contains repositoriesDomain"

//     const url = `https://api.github.com/orgs/${repositoriesDomain}/repos`
//     const method = 'get'
    
//     await dispatch('fetch', { url, method })

//     const fetched = state.data[url];

//     commit('add_repository_domain', repositoriesDomain);
//     fetched.forEach(repository => commit('add_repository', { domain: repositoriesDomain, repository }));
    
//     commit('increment');
//   } catch (err) {
//     console.error(`[FETCH] ${err}`);
//     throw err;
//   }
// }

// export async function fetchThreads({ state, dispatch, commit }, {repositoriesDomain, repositoryId}) {
//   try {
//     if(typeof repositoriesDomain !== 'string')
//       throw "Request object must contains repositoriesDomain"
//     if(typeof repositoriesDomain !== 'string')
//       throw "Request object must contains repositoryId"

//     const url = `https://api.github.com/repos/${repositoriesDomain}/${repositoryId}/issues?sort=updated&state=open`
//     const method = 'get'
    
//     await dispatch('fetch', { url, method })

//     const fetched = state.data[url];

//     const proto = { domain: repositoriesDomain, repository: repositoryId };

//     commit('add_threads_domain', proto);
//     commit('add_threads_repository', proto);

//     fetched.forEach(thread => commit('add_thread', vue.util.extend(proto, { thread })));
    
//     commit('increment');

//   } catch (err) {
//     console.error(`[FETCH] ${err}`);
//     throw err;
//   }
// }