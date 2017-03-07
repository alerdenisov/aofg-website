<template>
  <div class="fluid-container" style="padding: 0 30px; max-width: 1890px; margin: 0 auto;">
    <div class="row">
      <div class="col-xl-4 col-lg-5">
        <div class="nk-gap-4"></div>
        <div class="nk-box-1 bg-dark-1">
          <div class="nk-doc-links">
            <div class="nk-doc-search" :class='{ "active" : query }'>
              <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                <input v-model='query' class='form-control' placeholder="Search...">
                <div class="input-group-addon"><span class="ic-search"></span></div>
              </div>
              <div v-if='searchResults || query'>
                <fade-transition>
                  <div v-if='searchResults' key='results'>
                    <fade-transition>
                      <search-result v-if='searchResults.total_count' v-for='result in searchResults.items' :key='result.sha' :result='result' path='/docs/' />
                      <div v-else key='no-result'>
                        <h6>No results, sorry</h6>
                      </div>
                    </fade-transition>
                  </div>
                  <div class="row row-loading" v-else key='loading'>
                    <div class="col-xs-12 col-md-6 col-md-offset-3">
                      <div v-if='fetchingSearch' style='padding: 5px 10px;'>
                        <spinner-inline />
                      </div>
                    </div>
                  </div>
                </fade-transition>
              </div>
            </div>
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
        </div>
        <div class="nk-gap-4"></div>
      </div>
      <div class="col-xl-8 col-lg-7">
        <div class="nk-gap-4"></div>
        <!-- <div class="nk-doc nk-box-4 bg-dark-1">
          <div class="nk-doc-item">
            {{selected.path}} {{selected.url}} {{selected.sha}}
            <git-marked :content='content' v-if='content' />
          </div>
        </div> -->
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
  import FadeTransition from '@/components/misc/FadeTransition'
  import SpinnerInline from '@/components/elements/SpinnerInline'
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

    watch: {
      '$route': 'moved',
      'query': 'searchInput'
    },

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
      SpinnerInline,
      FadeTransition,
      SearchResult
    },
    methods: {
      moved() {
        this.query = null;
        console.log(this.selected.path);
        if(this.selected && this.selected.tree && this.selected.type === 'tree') {
          for(let key in this.selected.tree) {
            const node = this.selected.tree[key];
            let title = node.title.toLowerCase();
            if(title === 'readme' || title === 'index') 
            {
              this.$router.push('/docs/' + node.path);
              return;
            }
          }
        }
      },
      searchInput: _.throttle(function() {
        const query = this.query;
        if(query && query.length > 3) {
          console.log('search for: ' + query)
          this.searchFetch();
        }
      }, 100),

      async searchFetch() {
        // if(this.fetchingSearch) return;
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
</script>
<style> 
  .nk-doc-search {
    margin-bottom: 20px;
  }

  .nk-doc-search.active {
    background-color: #222;
  }

  .nk-doc-links ul ul {
    padding-left: 20px;
  }
  .input-group-addon {
    background-color: transparent;
    color: white;
  }
</style>