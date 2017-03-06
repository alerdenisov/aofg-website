<template>
  <div class="aofg-background">
    <!-- <video-background 
      class="nk-page-background op-5" 
      mp4="/static/video/bg-2.mp4" 
      ogv="/static/video/bg-2.ogv" 
      poster="/static/video/bg-2.jpg" 
      webm="/static/video/bg-2.webm" /> -->
    <!-- <video-background 
      class="nk-page-background op-5" 
      poster="/static/video/bg-2.jpg" /> -->
    <div class="nk-page-border">
      <div class="nk-page-border-t"></div>
      <div class="nk-page-border-r"></div>
      <div class="nk-page-border-b"></div>
      <div class="nk-page-border-l"></div>
    </div>
  </div>
</template>

<script>
import VideoBackground from '@/components/elements/VideoBackground.vue'

export default {
  name: 'aofg-background',
  components: {
    VideoBackground
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>

