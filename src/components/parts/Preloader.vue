<template>
  <div class="nk-preloader">
   <div class="nk-preloader-bg" style="background-color: #000" ref="bg"></div>
   <div class="nk-preloader-content">
    <div>
      <img alt="GodLike - Gaming Bootstrap 4 Template" class="nk-img" src="/static/img/overlay.png" width="170">
      <div class="nk-preloader-animation"></div>
    </div>
  </div>
  <div class="nk-preloader-skip" @click='state = !state;'>
    Skip {{state}}
  </div>
</div>
</template>

<script type="text/javascript">
  export default {
    data() {
      return {
        state: true,
        close: { 
          sprite: "/static/images/preloader-bg.png",
          frames: 23,
          time: 1.2,
          dir: 1
        },
        open: {
          sprite: "/static/images/preloader-bg-bw.png",
          frames: 23,
          time: 1.2,
          dir: 0
        }
      }
    },

    watch: {
      state: 'onStateChange'
    },

    methods: {
      onStateChange() {
        this.animate(this.state ? this.open : this.close);
      },
      animate(config) {
        console.log(config);
        TweenMax.set(this.$refs.bg, {
          'background-image': `url(${config.sprite})`,
          'background-color': 'transparent',
          'width': config.frames * 100 + '%',
          'force3D': !!1,
          'x': 100 * Math.abs(config.dir - 1) + '%'
        })

        TweenMax.to(this.$refs.bg, 1.2, {
          ease: SteppedEase.config( config.frames ),
          x: 100 * config.dir + '%',
          'force3D': !!1,
        })
      }
    }
  }
</script>