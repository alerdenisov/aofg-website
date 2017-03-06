// var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}

const Base64 = { encode(str) { return str; } };

const GITHUB = process.env.GITHUB_API;

const CONFIGS = {
  repositories({ repositoriesType, repositoriesDomain }) {
    return { repositoriesType, repositoriesDomain };
  },
  threads({ repositoriesDomain, repositoryId, since }) {
    return { repositoriesDomain, repositoryId, since };
  },
  thread({ repositoriesDomain, repositoryId, threadNumber }) {
    return { repositoriesDomain, repositoryId, threadNumber };
  },
  comments({ repositoriesDomain, repositoryId, threadNumber }) {
    return { repositoriesDomain, repositoryId, threadNumber };
  },
  gitTree({ repositoriesDomain, repositoryId, branch }) {
    return { repositoriesDomain, repositoryId, branch };
  },
  content({ repositoriesDomain, repositoryId, url }) {
    return { repositoriesDomain, repositoryId, url };
  },
  search({ repositoriesDomain, repositoryId, query, path, extension  })  {
    return { repositoriesDomain, repositoryId, query, path, extension };
  },
}

const METHODS = {
  repositories() {
    return 'get';
  },
  threads() {
    return 'get';
  },
  thread() {
    return 'get';
  },
  comments() {
    return 'get';
  },
  gitTree() {
    return 'get';
  },
  content() {
    return 'get';
  },
  search()  {
    return 'get';
  },
}

const ENDPOINTS = {
  repositories({ repositoriesType, repositoriesDomain }) {
    return `${GITHUB}/${repositoriesType}/${repositoriesDomain}/repos`
  },
  threads({ repositoriesDomain, repositoryId, since }) {
    return `${GITHUB}/repos/${repositoriesDomain}/${repositoryId}/issues?sort=updated&state=open` + (since ? `&since=${since}` : '');
  },
  thread({ repositoriesDomain, repositoryId, threadNumber }) {
    return `${GITHUB}/repos/${repositoriesDomain}/${repositoryId}/issues/${threadNumber}`;
  },
  comments({ repositoriesDomain, repositoryId, threadNumber }) {
    return `${GITHUB}/repos/${repositoriesDomain}/${repositoryId}/issues/${threadNumber}/comments`;
  },
  gitTree({ repositoriesDomain, repositoryId, branch }) {
    return `${GITHUB}/repos/${repositoriesDomain}/${repositoryId}/git/trees/${branch}?recursive=1`;
  },
  content({ repositoriesDomain, repositoryId, url }) {
    return `https://raw.githubusercontent.com/${repositoriesDomain}/${repositoryId}/master/${url}`;
  },
  search({ repositoriesDomain, repositoryId, query, path, extension })  {
    extension = extension || 'md';

    return [`${GITHUB}/search/code?q=${query}`,
            `extension:${extension}`,
            `repo:${repositoriesDomain}/${repositoryId}`,
            `in:file`,
            path ? `path:${path}` : ''].join("+");
  },
}

const TOKENS = {
  repositories({ repositoriesType, repositoriesDomain }) {
    return Base64.encode(`_rep_${repositoriesType}_${repositoriesDomain}`);
  },
  threads({ repositoriesDomain, repositoryId, since }) {
    return Base64.encode(`_thr_${repositoriesDomain}_${repositoryId}_${since ? since : ''}`);
  },
  thread({ repositoriesDomain, repositoryId, threadNumber }) {
    return Base64.encode(`_th_${repositoriesDomain}_${repositoryId}_${threadNumber}`);
  },
  comments({ repositoriesDomain, repositoryId, threadNumber }) {
    return Base64.encode(`_com_${repositoriesDomain}_${repositoryId}_${threadNumber}`);
  },
  gitTree({ repositoriesDomain, repositoryId, branch }) {
    return Base64.encode(`_tree_${repositoriesDomain}_${repositoryId}_${branch}`);
  },
  content({ repositoriesDomain, repositoryId, url }) {
    return Base64.encode(`_cont_${repositoriesDomain}_${repositoryId}_${url}`);
  },
  search({ repositoriesDomain, repositoryId, query, path, extension  })  {
    return Base64.encode(`_search_${repositoriesDomain}_${repositoryId}_${path}_${query}`);
  },
}

export function makeConfig(type, raw) {
  return CONFIGS[type](raw);
}
export function makeToken(type, config) {
  return TOKENS[type](config);
}
export function makeUrl(type, config) {
  return ENDPOINTS[type](config);
}
export default function makeRequest(type, raw) {
  const config = makeConfig(type, raw);
  const { axios } = raw;
  const result = {
    url: makeUrl(type, config),
    token: makeToken(type, config),
    method: METHODS[type](),
    axios: {
      headers: {
        'Accept': 'application/vnd.github.squirrel-girl-preview'
      },
      ...axios
    },
    config,
  }

  return result;
}