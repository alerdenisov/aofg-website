<template>
  <div class="transition-wrapper">
    <transition name="fade" :mode="mode">
      <slot/>
    </transition>
  </div>
</template>

<script type="text/javascript">
  export default {
    props: {
      mode: {
        default: 'out-in'
      }
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
    transition: opacity .6s, top .6s, max-height .4s;
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
    opacity: 0;
  }
</style>
