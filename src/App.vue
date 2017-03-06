<template>
  <div id="app">
    <div style="position: fixed; top: 0; left: 0; z-index: 3000">
      <button @click='login'>login Modal</button>
      <button @click='requireAuth'>requireAuth Modal</button>
      <button @click='githubLimit'>githubLimit Modal</button>
    </div>
    <!-- <aofg-preloader/> -->
    <aofg-auth-modal/>
    <aofg-github-limit-modal/>
    <aofg-require-auth-modal />

    <aofg-background/>
    <aofg-header/>
    <div class="nk-main">
      <!-- <fade-transition mode="in-out"> -->
      <router-view></router-view>
      <!-- </fade-transition> -->
    </div>

    <div class="nk-gap-4"></div>
    <div class="nk-gap-3"></div>
    <aofg-footer/>

  </div>
</template>

<script>
  import vue from 'vue'
  import AofgPreloader from '@/components/parts/Preloader.vue'
  import AofgBackground from '@/components/parts/Background.vue'
  import AofgHeader from '@/components/parts/Header.vue'
  import AofgFooter from '@/components/parts/Footer.vue'
  import FadeTransition from '@/components/misc/FadeTransition'

  import AuthModal from '@/components/parts/modals/AuthModal'
  import GithubLimitModal from '@/components/parts/modals/GithubLimitModal'
  import RequireAuthModal from '@/components/parts/modals/RequireAuthModal'

  let animateModalTimeout;

  export default {
    name: 'app',

    components: {
      AofgPreloader,
      AofgBackground,
      AofgHeader,
      AofgFooter,
      FadeTransition,

      'aofg-auth-modal': AuthModal,
      'aofg-github-limit-modal': GithubLimitModal,
      'aofg-require-auth-modal': RequireAuthModal
    },

    watch: {
      'modal': function() {      
        document.body.classList.toggle('modal-open', !!this.modal)
      }
    },

    methods: {
      login() { 
        console.log(this.modal);
        this.$store.commit('modal', this.modal === 'login' ? false : 'login');
      },
      requireAuth() { 
        console.log(this.modal);
        this.$store.commit('modal', this.modal === 'requireAuth' ? false : 'requireAuth');
      },
      githubLimit() { 
        console.log(this.modal);
        this.$store.commit('modal', this.modal === 'githubLimit' ? false : 'githubLimit');
      },
    },

    computed: {
      modal() { return this.$store.state.modal; },
      scrollbarWidth() {
        const outer = document.createElement("div");
        outer.style.visibility = "hidden";
        outer.style.width = "100px";
        document.body.appendChild(outer);

        const widthNoScroll = outer.offsetWidth;
        outer.style.overflow = "scroll";
        const inner = document.createElement("div");
        inner.style.width = "100%";
        outer.appendChild(inner);        

        const widthWithScroll = inner.offsetWidth;

          // remove divs
          outer.parentNode.removeChild(outer);
          console.log(widthNoScroll - widthWithScroll);
          return widthNoScroll - widthWithScroll;
        }
      },

      mounted() {
        window.mouse  = window.mouse  || {};
        window.scrollTop = window.pageYOffset || document.body.scrollTop;
        window.screen = {
          w: window.innerWidth,
          h: window.innerHeight
        }

        window.addEventListener('mousemove', e => {
          window.mouse.x = e.clientX;
          window.mouse.y = e.clientY;
        });

        window.addEventListener('scroll', e => {
          window.scrollTop = window.pageYOffset || document.body.scrollTop;
        });

        console.log('scroll is ' + this.scrollbarWidth);

        window.requestAnimFrame = (function(){
          return  window.requestAnimationFrame       || 
          window.webkitRequestAnimationFrame || 
          window.mozRequestAnimationFrame    || 
          window.oRequestAnimationFrame      || 
          window.msRequestAnimationFrame     || 
          function(/* function */ callback, /* DOMElement */ element){
            window.setTimeout(callback, 1000 / 60);
          };
        })();

      // let tick = 0;
      // let mouseParalaxed = [];
      
      // function animate() {
      //   if(tick++ % 40 == 0)
      //     mouseParalaxed = document.querySelectorAll('.parallaxed');
      
      //   mouseParalaxed
      //   window.requestAnimFrame(animate);
      // }      
    }
  };
</script>

<style>
</style>
