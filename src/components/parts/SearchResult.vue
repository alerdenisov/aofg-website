<template>
  <div class='nk-search-result nk-box-2 bg-dark-1'>
    <router-link :to='finalRoute'>{{result.path}}</router-link>
    <div class="nk-search-match" v-for='match in matches'>
      <search-fragment :match='match' />
    </div>
    
    <!-- <ul>
      <div v-for='match in result.text_matches'>
        <div>{{match.fragment}}</div>
        <div><a :href='match.object_url'>{{match.object_url}}</a></div>
      </div>
    </ul> -->
  </div>
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
  .nk-search-result {
    margin-bottom: 20px;    
  }

  .nk-search-match {
    background-color: #222;
    margin-bottom: 14px;
    padding: 10px;
  }

  .nk-search-match code {
    color: #dcd6cf;
    background-color: #222;
    padding-left: 0;
    padding-right: 0;
  }

  .nk-search-match code.highlight {
    background-color: #564f2c;
    color: white;
  }
</style>