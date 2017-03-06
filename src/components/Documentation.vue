<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-3">
        <aside class="nk-sidebar nk-sidebar-left nk-sidebar-sticky">
          <div class="nk-gap-4"></div>
          <div class="nk-doc-links">
            <input @keyup='searchInput'>
            <documentation-tree
            :selected='selected'
            :tree='menu'
            :path='path'
            :repositoryId='repositoryId' 
            :repositoriesDomain='repositoriesDomain' 
            :branch='branch'
            v-if='menu && selected' />
            <!--  -->
          </div>
          <div class="nk-gap-4"></div>
        </aside>
      </div>
      <div class="col-lg-9">
        <div class="nk-gap-4"></div>
        <!-- <div class="nk-doc nk-box-4 bg-dark-1">
          <div class="nk-doc-item">
            {{selected.path}} {{selected.url}} {{selected.sha}}
            <git-marked :content='content' v-if='content' />
          </div>
        </div> -->
        <div v-if='searchResults && searchResults.total_count'>
          <search-result v-for='result in searchResults.items' :result='result' path='/docs/' />
          <!-- <li v-for='result in searchResults.items'>
            <div>{{result.path}}</div>
            <ul>
              <li v-for='match in result.text_matches'>
                <div>{{match.fragment}}</div>
                <div><a :href='match.object_url'>{{match.object_url}}</a></div>
              </li>
            </ul>
          </li> -->
        </div>
        <documentation-body v-if='isPage' :page='selected' :repositoryId='repositoryId' :repositoriesDomain='repositoriesDomain' :branch='branch' />
        <div v-else class="nk-doc nk-box-4 bg-dark-1">
          <div class="nk-doc-item">
            <h2>Select page</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  import makeRequest from '@/requests'
  import DocumentationBody from '@/components/parts/DocumentationBody'
  import DocumentationTree from '@/components/parts/DocumentationTree'
  import SearchResult from '@/components/parts/SearchResult'
  import _ from 'lodash'

  export default {
    props: {
      repositoryId: { type: String, required: true },
      repositoriesDomain: { type: String, required: true },
      branch: { type: String, required: true }
    },

    data() {
      return {
        fetching: false,
        fetchingSearch: false,
        menu: null,
        query: null,
      }
    },

    // watch: {
    //   'path': 'fetch'
    // },

    mounted() {
      this.updateMenu();
      this.fetch();
    },

    computed: {
      isPage() {
        return this.selected && this.selected.type === 'blob' && this.selected.url.slice(-3) === '.md';
      },
      path() {
        return this.$route.params.path || "";
      },
      request() {
        return makeRequest('gitTree', this);
      },
      tree() {
        return this.$store.state.data[this.request.token];
      },
      selected() {
        if(!this.menu) return null;

        const self = this;
        function recursiveFind(node) {
          for(let key in node) {
            let child = node[key];
            if(child.path === self.path) return child;
            let found = recursiveFind(child.tree);
            if(found) return found;
          }

          return null;
        }

        return recursiveFind(this.menu);
      },
        
      searchResults() {
        return this.$store.state.data[this.searchRequest.token];
      },

      searchRequest() {
        const { repositoriesDomain, repositoryId, query } = this;
        const requestRaw = { 
          repositoriesDomain, 
          repositoryId, 
          query,
          path: 'en/',
          axios: {
            headers: {
              'Accept': 'application/vnd.github.v3.text-match+json'
            }
          }
        };   
        return makeRequest('search', requestRaw);
      }

    },
    components: {
      DocumentationBody,
      DocumentationTree,
      SearchResult
    },
    methods: {
      searchInput: _.debounce(function(e) {
        const query = this.query = e.target.value;
        if(query && query.length > 3) {
          console.log('search for: ' + query)
          this.searchFetch();
        }

      }, 1000),

      async searchFetch() {
        if(this.fetchingSearch) return;

        this.fetchingSearch = true;
        await this.$store.dispatch('fetch', this.searchRequest)
        this.fetchingSearch = false;
      },

      async fetch() {
        if(this.fetching) return;

        this.fetching = true;
        await this.$store.dispatch('fetch', this.request);
        this.fetching = false;
        this.updateMenu();
        // this.menu = this.parseMenu()
      },

      updateMenu() {
        this.menu = Object.assign({}, this.menu, this.parseMenu());
        console.log(this.menu);
      },

      parseMenu() {
        console.log('documentation menu')
        if(!this.tree || !this.tree.tree)
          return null;

        console.log('documentation menu parsing')
        const tree = this.tree.tree.reduce((menu, item) => {
          if(item.type !== 'tree' && item.path.slice(-3) !== '.md'){
            return menu;
          }

          item._url = item.path;

          const { sha, type } = item;
          const url = item.path;
          const path = type === 'blob' ? url.slice(0, -3) : url;
          const parts = path.split('/');
          let name;
          parts.push(name = parts.pop());

          let node = menu;
          // select or create deep 
          parts.forEach(part => { 
            node.tree = node.tree || {};
            node.tree[part]  = node.tree[part] || {};
            node = node.tree[part];
          });
          
          node.open = false;
          node.url = url;
          node.title = name;
          node.sha = sha;
          node.type = type;
          node.path = url;//parts.join('/');//item.path.replace('/', '__');

          return menu;
        }, {}).tree;

        return tree;
      }
    }
  }
  // import vue from 'vue'
  // import makeRequest from '@/requests'
  // import TreeNode from '@/components/elements/TreeNode'
  // import GitMarked from '@/components/misc/GitMarked'
  // export default {
  //   props: {
  //     // path: { type: String, required: true },
  //     repositoryId: { type: String, required: true },
  //     repositoriesDomain: { type: String, required: true },
  //     branch: { type: String, required: true }
  //   },

  //   data() {
  //     return {
  //       fetchDocsTree: false,
  //       fetchContent:  false,
  //       menu: {},
  //       selected: {}
  //     };
  //   },

  //   mounted() {
  //     console.log('documentation mounted')
  //     this.docsTreeFetch();
  //   },

  //   watch: {
  //     'docsTree':    'collectMenu',
  //     'path':        'pathUpdate', 
  //     'selected':    'contentFetch'
  //   },

  //   methods: {
  //     async docsTreeFetch() {
  //       this.fetchDocsTree = true;
  //       await this.$store.dispatch('fetch', this.docsTreeRequest);
  //       this.fetchDocsTree = false;
  //     },

  //     async contentFetch() {
  //       if(this.selected.type !== 'blob')
  //         return;

  //       this.fetchContent = true;
  //       await this.$store.dispatch('fetch', this.contentRequest);
  //       this.fetchContent = false;
  //     },

  //     pathUpdate() {
  //       this.selectTree();
  //       // this.contentFetch();
  //     },

  //     selectTree() {
  //       console.log('select');
  //       this.menu = this.selectTreeRecursive(this.menu);//vue.util.extend({}, this.menu));
  //     },

  //     selectTreeRecursive(root) {
  //       if(!root)
  //         return;

  //       Object.keys(root).forEach(key => {
  //         root[key].open = this.path.startsWith(root[key].path);
  //         if(this.path === root[key].path)
  //           this.selected = root[key];
  //         this.selectTreeRecursive(root[key].tree);
  //       })

  //       return root;
  //     },

  //     collectMenu() {
  //       console.log('documentation menu')
  //       if(!this.docsTree || !this.docsTree.tree)
  //         return null;

  //       let i = 1;

  //       const tree = this.docsTree.tree.reduce((menu, item) => {
  //         if(item.type !== 'tree' && item.path.slice(-3) !== '.md'){
  //           return menu;
  //         }

  //         item._url = item.path;

  //         const { sha, type } = item;
  //         const url = item.path;
  //         const path = type === 'blob' ? url.slice(0, -3) : url;
  //         const parts = path.split('/');
  //         let name;
  //         parts.push(name = parts.pop());

  //         let node = menu;

  //         // select or create deep 
  //         parts.forEach(part => { 
  //           node.tree = node.tree || {};
  //           node.tree[part] = node.tree[part] || {}
  //           node = node.tree[part]
  //         });

  //         node.url = url;
  //         node.title = name;
  //         node.sha = sha;
  //         node.type = type;
  //         node.path = parts.join('__');//item.path.replace('/', '__');

  //         return menu;
  //       }, {}).tree;

  //       this.menu = this.selectTreeRecursive(tree);
  //     }
  //   },

  //   computed: {
  //     path() {
  //       return this.$route.params.path;
  //     },
  //     sha() {
  //       return this.branch
  //     },
  //     docsTreeRequest() {
  //       return makeRequest('gitTree', this);
  //     },
  //     docsTree() {
  //       return this.$store.state.data[this.docsTreeRequest.token];
  //     },
  //     contentRequest() {
  //       const { url } = this.selected;
  //       const { repositoriesDomain, repositoryId } = this;
  //       return makeRequest('content', { path: url, repositoriesDomain, repositoryId });
  //     },
  //     content() {
  //       const data = this.$store.state.data[this.contentRequest.token];
  //       if(this.selected.type !== 'blob')
  //         return "# Selecte page";

  //       return data;
  //     }
  //   },

  //   components: {
  //     TreeNode,
  //     GitMarked
  //   }
  // }
</script>
<style> 
  .nk-doc-links ul ul {
    padding-left: 20px;
  }
</style>