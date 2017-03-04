<template>
  <div class="mnt-80">
    <div class="rev_slider_wrapper fullscreen-container" data-alias="photography-carousel48" style="padding:0px">
      <div class="rev_slider fullscreenbanner" data-version="5.0.7" ref="slider" style="display:none">
        <ul>
          <li v-for="image in images" :key="image.key" data-easein="default" date-easeout="default" :data-index="`rs-${image.key}`" data-masterspeed="1500" data-rotate="0" data-saveperfomance="off" data-slotamount="7" :data-thumb="image.src" data-transition="slideoverhorizontal">
            <img :src="image.retina" alt="" class="rev-slidebg" data-bgfit="cover" data-bgposition="center center" data-bgrepeat="no-repeat" data-no-retina="">
          </li>
        </ul>
        <div class="tp-bannertimer tp-bottom" style="visibility: hidden !important"></div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  export default {
    name: 'aofg-megaslider',
    data() {
      return {
        images: [
        { src: '/static/images/gallery-3-thumb.jpg', retina: '/static/images/gallery-3.jpg', key: 0 },
        { src: '/static/images/gallery-4-thumb.jpg', retina: '/static/images/gallery-4.jpg', key: 1 },
        { src: '/static/images/gallery-5-thumb.jpg', retina: '/static/images/gallery-5.jpg', key: 2 },
        { src: '/static/images/gallery-1-thumb.jpg', retina: '/static/images/gallery-1.jpg', key: 3 }
        ]
      }
    },
    mounted() {
      $(this.$refs.slider).show().revolution({
        sliderType:"carousel",
        jsFileLocation:"assets/plugins/revolution/js/",
        sliderLayout:"auto",
        dottedOverlay:"none",
        delay:9000,
        navigation: {
          keyboardNavigation:"off",
          keyboard_direction: "horizontal",
          onHoverStop:"off",
        },
        carousel: {
          maxRotation: 8,
          vary_rotation: "off",
          minScale: 20,
          vary_scale: "off",
          horizontal_align: "center",
          vertical_align: "center",
          fadeout: "off",
          vary_fade: "off",
          maxVisibleItems: 3,
          infinity: "on",
          space: -90,
          stretch: "off"
        },
        responsiveLevels:[1240,1024,778,480],
        gridwidth:[800,600,400,320],
        gridheight:[600,400,320,280],
        lazyType:"none",
        shadow:0,
        spinner:"off",
        stopLoop:"on",
        stopAfterLoops:0,
        stopAtSlide:1,
        shuffle:"off",
        autoHeight:"off",
        fullScreenAlignForce:"off",
        fullScreenOffsetContainer: "",
        fullScreenOffset: "",
        disableProgressBar:"on",
        hideThumbsOnMobile:"off",
        hideSliderAtLimit:0,
        hideCaptionAtLimit:0,
        hideAllCaptionAtLilmit:0,
        debugMode:false,
        fallbacks: {
          simplifyAll:"off",
          nextSlideOnWindowFocus:"off",
          disableFocusListener:false,
        }
      });
    }
  }
</script>