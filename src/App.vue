<template>
  <div id="app" @keyup.enter='login' tabindex="-1">
    <!-- <aofg-preloader/> -->
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

    <div class="nk-modal modal fade" tabindex="0" role="dialog" ref='modal'>
      <!-- <div aria-hidden="true" aria-labelledby="myModalLabel" class="modal nk-modal fade show" id="myModal" role="dialog" tabindex="-1"> -->
      <div class="modal-dialog" role="document">
        <!-- <div class="modal-icon">
          😞 
        </div> -->
        <div class="modal-content">
          <div class="modal-header">
            <button aria-label="Close" class="close" data-dismiss="modal" type="button"><span class="ion-android-close"></span></button>
            <h4 class="modal-title nk-title" id="myModalLabel">Unauthrized limits is over</h4>
          </div>
          <div class="modal-body">
            <p class='lead' style='margin-bottom: 10px'>
              We're using GitHub API to fetch data and limits is over.
            </p>
            <p>
              Please, authenticate in our application to get extra <strong>5,000</strong> calls per hour and more features:
            </p>
            <ul>
              <li>👍 👎 😄 ❤️ 🎉 everything</li>
              <li>Create new topic on forums</li>
              <li>Enjoy to discuss with others</li>
            </ul>
          </div>
          <div class="modal-footer">
            <small>Wait 41 minute for next 60 call or </small>&nbsp;&nbsp;&nbsp;<a href="gitAuth" class="nk-btn nk-btn-color-dark-1 nk-btn-bg-white nk-btn-x3">Auth with <span class="ic-github-2"></span></a>

          </div>
        </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
    </div>
  </div>
</template>

<script>
  import AofgPreloader from '@/components/parts/Preloader.vue'
  import AofgBackground from '@/components/parts/Background.vue'
  import AofgHeader from '@/components/parts/Header.vue'
  import AofgFooter from '@/components/parts/Footer.vue'
  import FadeTransition from '@/components/misc/FadeTransition'

  let animateModalTimeout;

  export default {
    name: 'app',

    components: {
      AofgPreloader,
      AofgBackground,
      AofgHeader,
      AofgFooter,
      FadeTransition
    },

    methods: {
      login() {
        clearTimeout(animateModalTimeout);
        if (document.body.classList.toggle('modal-open')) {
          // open
          this.$refs.modal.classList.remove('out')
          this.$refs.modal.classList.add('in')

          document.body.setAttribute('style', 'margin-right: ${this.scrollbarWidth}px;');
          animateModalTimeout = setTimeout(() => this.$refs.modal.style.display = 'block', 50);
        } else {
          // close
          this.$refs.modal.classList.remove('in')
          this.$refs.modal.classList.add('out')
          document.body.setAttribute('style', `margin-right: 0;`);
          animateModalTimeout = setTimeout(() => this.$refs.modal.style.display = 'none', 1000);
        }
      },
      
    },

    computed: {
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
