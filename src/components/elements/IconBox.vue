<template>
  <div class="nk-ibox">
    <div class="nk-ibox-icon nk-ibox-icon-circle">
      <span :class="icon"></span>
    </div>
    <div class="nk-ibox-cont">
      <h2 class="nk-ibox-title">{{title}}</h2>
      <p>
        {{text}}
      </p>
      <div class="nk-gap-1"></div>
      <cut-button v-if='button' :url="button.path" :class="button.css">{{button.title}}</cut-button>
    </div>
  </div>
</template>

<script type="text/javascript">
  import CutButton from '@/components/elements/CutButton.vue'

  export default {
      name: 'icon-box'
    , props: ['title', 'text', 'icon', 'button']
    , components: {
      'cut-button': CutButton
    }
  }
</script>