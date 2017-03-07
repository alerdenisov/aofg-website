<template>
  <div>
    <div class="nk-header-title nk-header-title-lg nk-header-title-parallax-opacity" style="
      background-color: transparent; 
      position: fixed;
      width: 100%; 
      min-height: 100vh; 
      top: 0;
      z-index: -2;">
      <div class="bg-image" style="" ref='bgimage'>
        <div style="background-image: url('/static/img/homepage-background.jpg');"></div>
      </div>
    </div>
    <router-view />
  </div>
</template>
<script type="text/javascript">

  let startingTime;
  let lastTime;
  let totalElapsedTime;
  let elapsedSinceLastLoop;

  export default {
    data() {
      return {
        currentPos: 0,
        scrollTop: window.scrollTop
      }
    },

    mounted() {
      // window.addEventListener('scroll', e => {
      //   this.scrollTop = window.pageYOffset || document.body.scrollTop;
      // });
    },

    computed: {
      targetPos() {
        // if((window.innerHeight + this.scrollTop + 300) >= document.body.offsetHeight)
          // return 0;

        return this.scrollTop ? 1 : 0;// / 250);
      }
    },

    watch: {
      targetPos() {
        const cssPosX = 0;//135 * this.targetPos;
        const cssPosY = 100 + (135 - 100) * this.targetPos;
        const cssAlf = 1 + (0 - 1) * this.targetPos;

        this.$refs.bgimage.style.opacity = cssAlf;

        // this.$refs.bgimage.setAttribute('style', `mask-position: ${cssPosX}% ${cssPosY}%; -webkit-mask-position: ${cssPosX}% ${cssPosY}%; opacity: ${cssAlf}`);
      }
    }
  }
</script>

<style type="text/css" scoped>
</style>