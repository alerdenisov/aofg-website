<template>
  <div class="mouse-parallaxed">
    <div class="mouse-parallaxed__pivot" ref="pivot" :class="{ debug: debug }">
      <pre class="mouse-parallaxed__info" style="width: 300px" v-if="debug">
        {{rect}}
      </pre>
    </div>
    <div class="mouse-parallaxed__wrapper" ref="content">
      <slot/>
    </div>
  </div>
</template>

<script type="text/javascript">
  import Vue from 'vue'
  export default {
    // props: ['z', 'speed'],
    data() {
      return {
        debug: false,
        z: 2,
        speed: 2,
        elements: {},
        rect: null
      }
    },

    watch: {
      elements: 'getPivotRect'
    },

    mounted() {
      // document.body.addEventListener('mousemove', this.animate.bind(this));
      // setTimeout(() => this.rect = this.$el.getBoundingClientRect(), 1000);
      setTimeout(() => {
        this.elements = Vue.util.extend({}, this.$refs);
        this.elements = this.$refs;
        this.animate();
      },1000);
    },

    methods: {
      getPivotRect() {
        if(!this.elements.pivot)
          return;
        // console.log(this.elements.pivot.getBoundingClientRect());
        // const { pivot } = this.elements;
        // this.rect = { y: pivot.offsetTop, x: pivot.offsetLeft };//Vue.util.extend({}, this.elements.pivot.getBoundingClientRect());
      },
      animate(event) {
        window.requestAnimFrame(this.animate.bind(this));
        
        if(!this.elements.pivot)
          return;

        const screen = window.screen;

        const content = this.elements.content.getBoundingClientRect();

        if(content.top + content.height < 0 || content.top > screen.h) {
          return;
        }

        const pivot   = this.elements.pivot.getBoundingClientRect();
        const element = {
          x: pivot.left,
          y: pivot.top,

          w: content.width,
          h: content.height
        };

        const mouse = {
          x: window.mouse.x,
          y: window.mouse.y
        };

        const offset = {
          absX: mouse.x - element.x,
          absY: mouse.y - element.y,
          relX: (mouse.x - element.x) / screen.w,
          relY: (mouse.y - element.y) / screen.h,
        };

        this.rect = {
          element,
          mouse,
          offset
        }
        TweenMax.to(this.elements.content, this.speed, {
          x: -offset.relX * 30,
          y: -offset.relY * 30,
          z: (-2 + this.z) * 5,
          rotationY: 15 * offset.relX,
          rotationX: 15 * -offset.relY,
          transformOrigin:"50% 50%",
          force3D: true
        })
      }
    }
  }
</script>

<style type="text/css" scoped>
  .mouse-parallaxed { position: relative; perspective: 1500px; }
  .mouse-parallaxed__pivot { position: absolute; top: 50%; left: 50%; }
  .mouse-parallaxed__pivot.debug { width: 10px; height: 10px;  z-index: 99; background-color: red; }
  .mouse-parallaxed__info { position: absolute; top: 30px; left: 30px; }
  .mouse-parallaxed.anination { position: absolute; }
</style>