<template>
  <router-link :to='finalRoute' class='nk-search-result nk-box-2 bg-dark-1'>
    <div class="nk-search-path">{{result.path}}</div>
    <div class="nk-search-match" v-for='match in matches'>
      <search-fragment :match='match' />
    </div>
  </router-link>
</template>

<script type="text/javascript">
  import SearchFragment from '@/components/parts/SearchFragment'
  export default {
    name: 'search-result',
    props: {
      result: { type: Object, required: true },
      path: { type: String, required: true },
    },

    computed: {
      fragment() {
        return this.result.fragment;
      },

      finalRoute() {
        return this.path + this.result.path;
      },

      matches() {
        return this.result.text_matches;
      }
    },
    components: {
      SearchFragment
    }
  }
</script>

<style type="text/css">
  .nk-search-result:focus,
  .nk-search-result:active,
  .nk-search-result {
    margin-bottom: 5px;    
    padding: 15px;
    text-decoration: none;
  }

  .nk-search-result:hover {
    background-color: #000 !important;
    text-decoration: none;
  }

  .nk-search-match {
    background-color: #222;
    margin-top: 5px;
    padding: 10px;
  }

  .nk-search-match code {
    color: #dcd6cf;
    background-color: #222;
    padding-left: 0;
    padding-right: 0;
    font-size: 12px;
  }

  .nk-search-match code.highlight {
    background-color: #564f2c;
    color: white;
  }

  .nk-search-match:hover code,
  .nk-search-match:hover {
    background-color: #2F2F2F;
  }

  .nk-search-match:hover code.highlight {
    background-color: #61582f;
  }

</style>