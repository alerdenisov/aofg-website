<template>
  <div class="hello">
    <div class="container">
      <div class="nk-gap-4"></div>
      <div class="relative">
        <fade-transition class="absolute" style="top: -30px;">
          <spinner-inline v-if='fetchRepositories && repositories' />
        </fade-transition>
        <fade-transition>
          <div class="row row-equals" v-if='repositories' key='showing'>
            <div class="col-md-6" v-for='repository in repositories' :key='repository.id'>
              <aofg-repository-block :repository='repository' />
            </div>
          </div>  
          <div class="row row-loading" v-else key='loading'>
            <div class="col-md-6 col-md-offset-3">
              <h2><span>Loading</span><spinner-inline /></h2>
            </div>
          </div>
        </fade-transition>
      </div>
    </div>
  </div>
</template>

<script>
  import CutButton from '@/components/elements/CutButton.vue'
  import RepositoryBlock from '@/components/parts/RepositoryBlock.vue'
  import SpinnerInline from '@/components/elements/SpinnerInline'
  import FadeTransition from '@/components/misc/FadeTransition'
  import makeRequest from '@/requests'
  import _ from 'lodash'

  export default {
    name: 'hello',
    props: [ 'repositoriesDomain', 'repositoriesType' ],
    data() {
      return {
        fetchRepositories: false
      };
    },

    mounted() {
      this.fetch();
    },

    methods: {
      async fetch() {
        this.fetchRepositories = true;
        await this.$store.dispatch('fetch', this.request);
        this.fetchRepositories = false;
      }
    },

    computed: {
      request() {
        return makeRequest('repositories', this);
      },
      repositories() {
        return this.$store.state.data[this.request.token];
      }
    },
    components: {
      CutButton,
      SpinnerInline,
      FadeTransition,
      'aofg-repository-block': RepositoryBlock
    }
  };
</script>