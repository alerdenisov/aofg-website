<template>
  <div class="vue-middleware">
    <router-view />
  </div>
</template>

<script type="text/javascript">

  import axios from 'axios'
  export default {
    mounted() {
      // console.log("__MIDDLEWARE");
      // this.auth();
      // console.log()

      if(!this.$store.state._session.token) {
        // no auth data
        if(!this.$route.query.code)
        {
          this.$store.commit('last_route', this.$route);
          // let auth him
          window.location.href = this.gitAuth;
          return;

        } else {
          // obtain a code
          const { code } = this.$route.query;

          this.access_token(code);

        }
      }

      this.$store.commit('last_route', this.$route);
    },
    methods: {
      async auth() {
        const answer = await axios.get(this.gitAuth);
        console.log('git auth', answer);
      },

      async access_token(code) {
        const answer = await axios.post('https://github.com/login/oauth/access_token', {
          client_id: '',
          client_secret: '',
          redirect_uri: 'http://localhost:8080/',
          code,
        })
        console.log('git token', answer)
      }
    },
    computed: {

      gitAuth() {
        return [
        'https://github.com/login/oauth/authorize',
        '?client_id=571c999335478c6742dd',
        '&scope=public_repo user',
        '&redirect_uri=http://localhost:8080/'].join('')
      },
    }
  }
</script>