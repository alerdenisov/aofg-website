<template>
  <div class="hello">
    <div class="nk-header-title nk-header-title-lg nk-header-title-parallax-opacity">
      <div class="bg-image">
        <div style="background-image: url('/static/img/homepage-background.jpg')"></div>
      </div>
      <div class="nk-header-table">
        <div class="nk-header-table-cell">
          <div class="container">
            <div class="nk-header-text">
              <mouse-parallax z='3'>
                <img src="/static/img/homepage-logotype.png">
                <div class="nk-gap-2"></div>
                <mouse-parallax z='6'>

                  <cut-button v-for='btn in header.buttons' :key="btn.path + btn.title" :url="btn.path" :class="btn.css" style="min-width: 200px">
                    <span>{{btn.title}}</span>
                  </cut-button>

                </mouse-parallax>
              </mouse-parallax>
              <div class="nk-gap-6"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <aofg-megaslider/>

    <div class="container">
      <div class="nk-gap-6"></div>
      <div class="nk-gap-2"></div>
      <div class="row vertical-gap lg-gap">
        <div class="col-md-4" v-for="box in features" :key='box.title'>
          <aofg-iconbox :title='box.title' :text='box.text' :icon='box.icon' :button='box.button'/>
        </div>
      </div>
      <div class="nk-gap-2"></div>
      <div class="nk-gap-6"></div>
    </div>

    <div class="nk-box bg-dark-1">
      <div class="container text-xs-center">
        <div class="nk-gap-6"></div>
        <div class="nk-gap-2"></div>
        <h2 class="nk-title h1">{{about.title}}</h2>
        <div class="nk-gap-3"></div>
        <div class="lead" v-html="aboutText"></div>
        <div class="nk-gap-2"></div>
        <div class="row equal-height no-gap multi-columns-row">
          <div class="col-md-4" v-for='item in about.metrics' :key='item.title'>
            <aofg-counter :amount='item.amount' :title='item.title' :raw='1' />
          </div>
        </div>
        <div class="nk-gap-2"></div>
        <cut-button url="/about" class="nk-btn-x4 nk-btn-color-main-1">Learn More</cut-button>
        <div class="nk-gap-6"></div>
      </div>
    </div>

    <div class="container">
      <div class="nk-gap-4"></div><!-- START: Posts List -->
      <div class="nk-blog-list">

        <aofg-post v-for="item in posts" :key='item' 
                  :title="item.title" 
                  :date='item.date' 
                  :categories='item.categories' 
                  :thumb='item.thumb' 
                  :summary='item.summary' />

        <div class="nk-pagination nk-pagination-center">
          <a class="nk-btn nk-btn-lg nk-btn-circle" href="#">Load More ...</a>
        </div><!-- END: Pagination -->
      </div><!-- END: Posts List -->
    </div>

  </div>
</template>

<script>
  import marked from 'marked'
  import CutButton from '@/components/elements/CutButton.vue'
  import MouseParallax from '@/components/misc/MouseParallax.vue'
  import Post from '@/components/parts/Post.vue'
  import MegaSlider from '@/components/elements/MegaSlider.vue'
  import IconBox from '@/components/elements/IconBox.vue'
  import CounterBox from '@/components/elements/CounterBox.vue'

  export default {
    name: 'hello',

    data() {
      return { 
        header: {
          buttons: [
            { title: 'Early access', path: '/', css: 'nk-btn-color-main-1 nk-btn-x3' },
            { title: 'Documentation', path: '/test', css: 'nk-btn-x3' },
          ]
        },

        about: {
          title: 'About The Game',
          text: "The world's first massively multiplayer role play game with unlimited possibilities to customize. \n\nPerfect mix of classic (old school) RPG and modern technologies such as point cloud geometry, unlimited character and item customizing",
          metrics: [
            { amount: 'Old school', title: 'Top Down RPG' },
            { amount: 'Unlimited', title: 'Unique Worlds' },
            { amount: 'Full drop', title: 'Hardcore PVP' },
          ]
        },

        features: [
          { 
            title: 'Open Source', 
            text: 'Each part of our game is completely open-source and friendly to fork', 
            button: { title: 'Early access', path: '/docs' },
            icon: 'ic-github'
          },
          { 
            title: 'Unity', 
            text: 'Based on most popular game engine with nice learning curve to novice', 
            button: { title: 'Early access', path: '/docs' },
            icon: 'ic-unity'
          },
          { 
            title: 'Mod Free', 
            text: 'We\'re very excited about your ideas and makes everything to bring them to live', 
            button: { title: 'Early access', path: '/docs' },
            icon: 'ic-heart'
          },
        ],

        spotlightedImages: [
          { src: '/static/images/gallery-3-thumb.jpg', retina: '/static/images/gallery-3.jpg'},
          { src: '/static/images/gallery-4-thumb.jpg', retina: '/static/images/gallery-4.jpg' },
          { src: '/static/images/gallery-5-thumb.jpg', retina: '/static/images/gallery-5.jpg' },
          { src: '/static/images/gallery-1-thumb.jpg', retina: '/static/images/gallery-1.jpg' }
        ],

        posts: [
          {
            title: 'Hello world',
            thumb: '/static/images/post-1-mid.jpg',
            date: Date.now(),
            categories: ['News', 'Update'],
            summary: 'Billy is an accomplished artist/designer that lives and breathes creative development. His biggest strengths include brand building and user experience which he has provided to dozens of games on mobile, PC and console for nearly 15 years.  Billy\'s love for retro games, good art and 80s cartoons is second to none.'
          },
          {
            title: 'Hello world',
            thumb: '/static/images/post-1-mid.jpg',
            date: Date.now(),
            categories: ['News', 'Update'],
            summary: 'Billy is an accomplished artist/designer that lives and breathes creative development. His biggest strengths include brand building and user experience which he has provided to dozens of games on mobile, PC and console for nearly 15 years.  Billy\'s love for retro games, good art and 80s cartoons is second to none.'
          },
          {
            title: 'Hello world',
            thumb: '/static/images/post-1-mid.jpg',
            date: Date.now(),
            categories: ['News', 'Update'],
            summary: 'Billy is an accomplished artist/designer that lives and breathes creative development. His biggest strengths include brand building and user experience which he has provided to dozens of games on mobile, PC and console for nearly 15 years.  Billy\'s love for retro games, good art and 80s cartoons is second to none.'
          },
        ]
      };
    },

    components: {
      CutButton,
      MouseParallax,
      'aofg-megaslider': MegaSlider,
      'aofg-post': Post,
      'aofg-iconbox': IconBox,
      'aofg-counter': CounterBox
    },

    computed: {
      aboutText() {
        return marked(this.about.text, { sanitize: true })
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
