<template>
  <div class="vue-repository">
    <div class="container nk-repository">
      <div class="nk-gap-4"></div>
      <h1>Repository {{repositoriesDomain}}/{{repositoryId}}</h1>
      <div class="nk-gap-2"></div>
      <router-view :repositoryId='repositoryId' :repositoriesDomain='repositoriesDomain'></router-view>
    </div>
  </div>
</template>

<script type="text/javascript">
  export default {
    props: ['repositoryId', 'domain'],
    computed: {
      repositoriesDomain() {
        return this.domain || 'aofg';
      }
    }
  }
</script>