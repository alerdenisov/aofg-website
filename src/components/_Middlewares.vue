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
        if(process.env.GITHUB_TOKEN) {
          this.$store.commit('github_token', process.env.GITHUB_TOKEN);
          return;
        }
        // no auth data
        if(!this.$route.query.code)
        {
          this.$store.commit('last_route', this.$route);
          // let auth him
          throw this.gitAuth
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
        const answer = await axios.post(process.env.GITHUB_TOKEN_ENDPOINT, {
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_SECRET,
          redirect_uri: process.env.GITHUB_CALLBACK,
          code,
        })
        console.log('git token', answer)
      }
    },
    computed: {

      gitAuth() {
        return [
        process.env.GITHUB_CODE_ENDPOINT,
        '?client_id=' + process.env.GITHUB_CLIENT_ID,
        '&scope=public_repo user',
        '&redirect_uri=' + process.env.GITHUB_CALLBACK].join('')
      },
    }
  }
</script>