<template>
  <div class="relative">
    <fade-transition class="absolute" style="top: -30px;">
      <spinner-inline v-if='fetchComments && comments' />
    </fade-transition>
    <fade-transition>
      <ul class="nk-forum nk-forum-topic" v-if='comments' key='showing'>
        <aofg-thread-comment :key='thread.id' :comment='thread'></aofg-thread-comment>
        <aofg-thread-comment v-for='comment in comments' v-if='comment' :key='comment.id' :comment='comment'></aofg-thread-comment>
      </ul>
      <div class="row row-loading" v-else key='loading'>
        <div class="col-md-6 col-md-offset-3">
          <h2><span>Loading</span><spinner-inline /></h2>
        </div>
      </div>
    </fade-transition>
  </div>
</template>

<script type="text/javascript">
  import ThreadComment from '@/components/parts/ThreadComment'
  import FadeTransition from '@/components/misc/FadeTransition'
  import SpinnerInline from '@/components/elements/SpinnerInline'
  import makeRequest, { makeToken } from '@/requests'

  export default {
    props: {
      repositoryId: { required: true },
      repositoriesDomain: { required: true },
      threadNumber: {required: true}
    },

    data() {
      return { 
        fetchComments: false,
        fetchThread: false,
      }
    },

    mounted() {
      this.fetch();
    },

    methods: {
      async fetch() {
        this.fetchComments = true;
        this.fetchThreads  = true;
        await Promise.all([
          this.$store.dispatch('fetch', this.threadRequest), 
          this.$store.dispatch('fetch', this.commentsRequest)
        ]);
        this.fetchThreads  = false;
        this.fetchComments = false;
      }
    },
    
    computed:{
      threadRequest() {
        return makeRequest('thread', this);
      },
      thread() {
        return this.$store.state.data[this.threadRequest.token];
      },
      commentsRequest() {
        return makeRequest('comments', this);
      },
      comments() {
        return this.$store.state.data[this.commentsRequest.token];
      }
    },

    components: {
      'aofg-thread-comment': ThreadComment,
      FadeTransition,
      SpinnerInline
    }
  }
</script>