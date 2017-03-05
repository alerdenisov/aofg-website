<template>
  <div class="nk-doc nk-box-4 bg-dark-1">
    <!-- START: Getting Started -->
    <div class="nk-doc-item">
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