<template>
  <li class="nav-element" :class="{ 'nk-drop-item': data.children }" @mouseenter='hover' @mouseleave='blur'>
    <router-link :to="{ path: data.path }">{{data.title}}</router-link >
    <ul v-if='data.children' class="nav-element__dropdown dropdown" :class="{ open: open }">
      <nav-element v-for='child in data.children' :key='child.title+child.path' :data='child'></nav-element>
    </ul>
  </li>
</template>

<script type="text/javascript">
  import NavElement from '@/components/parts/NavElement'

  export default {
    name: 'nav-element',

    props: ['data'],

    components: {
      NavElement
    },

    data() {
      return { open: false }
    },

    methods: {
      hover(e) {
        this.open = true;
      },

      blur(e) {
        this.open = false;
      }
    }
  }
</script>

<style scoped>
  .nav-element__dropdown.open { display: block; opacity: 1; }
</style>