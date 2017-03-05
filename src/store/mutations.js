import vue from 'vue'
import { makeToken } from '@/requests'

export const increment = (state) => {
  state.count += 1;
};

export const decrement = (state) => {
  state.count -= 1;
};


export const fetch = (state, {token, data}) => {
  vue.set(state.data, token, data);
}
export const fetchInit = (state, {token}) => {
  vue.set(state._fetches, token, true);
}
export const fetchDone = (state, {token}) => {
  vue.set(state._fetches, token, undefined);
}

export function inject_threads(state, { threads, repositoriesDomain, repositoryId }) {
  threads.forEach(thread => {
    const { number } = thread;
    const token = makeToken('thread', { repositoriesDomain, repositoryId, threadNumber: number });    
    vue.set(state.data, token, thread);
  })
}

export function last_route(state, route) {
  const { fullPath, hash, name, path, query } = route;
  state._last_route = { fullPath, hash, name, path, query };
}

export function github_limits(state, status) {
  state.githubStatus = status;
}