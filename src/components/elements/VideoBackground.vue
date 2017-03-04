<template>
  <div class="vue-video-background" :class="{ 'video-poster': poster }" :style="{ 'background-image': posterCss }">
    <div id="holder">
      
    </div>
  </div>
</template>

<script type="text/javascript">
  export default {
    name: 'video-background',
    props: ['mp4', 'ogv', 'poster', 'webm'],

    computed: {
      posterCss() {
        return `url(${this.poster})`
      },

      workerUrl() {
        return [
          `mp4:${this.mp4}`,
          `webm:${this.webm}`,
          `ogv:${this.ogv}`
        ].join(',');
      },

      videoWorker() {
        return new VideoWorker(this.workerUrl, {
          autoplay: 1,
          loop: 1,
          mute: 1,
          controls: 0
        });
      }
    },

    asyncComputed: {
      embed: {
        get() {
          return new Promise(resolve => {
            this.videoWorker.getIframe(frame => resolve(frame));
          })
        },

        default: 'none yet'
      }      
    },

    watch: {
      embed(newEmbed) {
        // is DOM
        if(newEmbed.nodeType > 0) {
          newEmbed.style.minWidth = '100%';
          newEmbed.style.minHeight= '100%';
          document.querySelector('#holder').append(newEmbed);
        } else {
          // wait for a DOM
        }
      }
    },

    mounted() {
    }

  }
</script>

<style scoped>
  .video-poster {
    background-size: cover;
    background-position: 50% 50%;
  }  
  .vue-video-background {
    /*opacity: 1;*/
    mix-blend-mode: color-dodge;
  }
</style>