<template>
  <router-link :to="{ path: url }" class="nk-btn link-effect-4" :class="extraCss">
    <span class="link-effect-inner">
      <span class="link-effect-l">
        <clone-node :node="this.$slots.default[0]"/>
      </span>
      <span class="link-effect-r">
        <clone-node :node="this.$slots.default[0]"/>
      </span>
      <span class="link-effect-shade">
        <clone-node :node="this.$slots.default[0]"/>
      </span>
    </span>
  </router-link>
</template>

<script>
  import Clone from '@/components/misc/CloneEl.js'

  export default { 
    name: 'cut-button',
    props: ['text', 'url', 'extraCss'],
    computed: {
      _label() {
        return this.text || this.$slots.default[0].context.$el.innerText;
      },
      extraCss() {
        if(!this.class)
          return {};

        return this.class.split(' ').reduce((acc, current) => { acc[currect] = true; return acc; }, {})
      }
    },
    components: {
      'clone-node': Clone
    }
  }
</script>