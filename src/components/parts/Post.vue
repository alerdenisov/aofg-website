<template>
  <mouse-parallax z='3'>
    <div class="nk-blog-post" data-mouse-parallax-speed="1" data-mouse-parallax-z="5">
      <div class="nk-post-thumb">
        <div class="nk-post-type">
          <span class="ic-gallery"></span>
        </div>
        <div class="nk-post-category">
          <router-link v-for='cat in categories' :key='cat' :to='cat'>{{cat}}</router-link>
        </div>
        <div class="nk-post-summary" v-if='summary'>
          <p>{{summary}}</p>
        </div>
        <a href="news-single-image.html">
          <img alt="" class="nk-img-stretch" :src="thumb">
        </a>
      </div>
      <div class="nk-post-content">
        <mouse-parallax z="2">
          <h2 class="nk-post-title h1"><router-link :to="title">{{title}}</router-link></h2>
          <div class="nk-post-date">
            {{date}}
          </div>
        </mouse-parallax>
      </div>
    </div>
  </mouse-parallax>
</template>

<script type="text/javascript">
  import MouseParallax from '@/components/misc/MouseParallax.vue'
  export default {
    name: 'aofg-post',
    props: ["title","categories","thumb","summary","date"],
    components: {
      MouseParallax,
    },
  }
</script>