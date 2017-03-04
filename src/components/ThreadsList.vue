<template>
  <div class="relative">
    <fade-transition class="absolute" style="top: -30px;">
      <spinner-inline v-if='fetchThreads && threads' />
    </fade-transition>
    <fade-transition>
      <ul class="nk-forum" v-if='threads' key='showing'>
        <aofg-thread v-for='thread in threads' :key='thread.id' :thread='thread' />
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
  import ThreadBlock from '@/components/parts/ThreadBlock.vue'
  import SpinnerInline from '@/components/elements/SpinnerInline'
  import FadeTransition from '@/components/misc/FadeTransition'
  import makeRequest from '@/requests'
  import _ from 'lodash'

  export default {
    props: {
      repositoryId: { required: true },
      repositoriesDomain: { required: true }
    },
    data() {
      return { 
        fetchThreads: false
      }
    },

    mounted() {
      this.fetch();
    },

    methods: {
      async fetch() {
        this.fetchThreads = true;
        await this.$store.dispatch('fetch', this.request);

        // hack to perfomance
        this.$store.commit('inject_threads', { ...this, threads: this.$store.state.data[this.request.token] });

        this.fetchThreads = false;
      }
    },
    
    computed:{
      request() {
        return makeRequest('threads', this);
      },
      threads() {
        return this.$store.state.data[this.request.token];
      }
    },

    components: {
      SpinnerInline,
      FadeTransition,
      'aofg-thread': ThreadBlock
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .transition-wrapper { position: relative; }
  .transition-wrapper > div {  }
  .fade-enter-active, .fade-leave-active {
    position: relative;
    top: 0;
    transition: opacity .8s, top .8s, max-height .5s;
  }
  .fade-enter-to, .fade-leave {
    max-height: 1600px;
    opacity: 1;
    top: 0;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    position: relative;
    top: -20px;
    max-height: 50px;
    opacity: 0
  }
</style>