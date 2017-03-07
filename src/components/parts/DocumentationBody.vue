<template>
  <div class="nk-doc nk-box-4 bg-dark-1">
    <!-- START: Getting Started -->
    <div class="nk-doc-item">
      <h1 v-if='title' style="margin-top: 0;">{{title}}</h1>
      <git-marked :content='body' v-if='body' />
    </div>
  </div>
</template>

<script>
  import fm from 'front-matter'
  import makeRequest from '@/requests'
  import GitMarked from '@/components/misc/GitMarked'
  export default {
    name: 'documentation-body',
    props: {
      page: { type: Object, required: true },
      repositoryId: { type: String, required: true },
      repositoriesDomain: { type: String, required: true },
      branch: { type: String, required: true }
    },

    data() {
      return {
        fetching: false
      }
    },

    mounted() {
      this.fetch();
    },

    watch: {
      'page': 'fetch'
    },

    computed: {
      path() { return this.page.path },
      url()  { return this.page.url },
      sha()  { return this.page.sha },

      request() {
        return makeRequest('content', this);
      },

      body() {
        return this.content.body;
      },

      title() {
        return this.content.attributes["title"];
      },

      content() {
        return fm(this.$store.state.data[this.request.token]);
      }
    },

    methods: {
      async fetch() {
        this.fetching = true;
        await this.$store.dispatch('fetch', this.request);
        this.fetching = false;
      }
    },

    components: {
      GitMarked
    }
  }
</script>

<style type="text/css">
  .nk-doc-item .h1, 
  .nk-doc-item .h2, 
  .nk-doc-item .h3, 
  .nk-doc-item .h4, 
  .nk-doc-item .h5, 
  .nk-doc-item .h6, 
  .nk-doc-item h1, 
  .nk-doc-item h2, 
  .nk-doc-item h3, 
  .nk-doc-item h4, 
  .nk-doc-item h5, 
  .nk-doc-item h6 {
    margin-top: 2rem;
    margin-bottom: 1.5rem;
  }
</style>