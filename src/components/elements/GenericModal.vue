<template>
  <div class="nk-modal modal fade" tabindex="0" role="dialog" :ref='uniqueId'>
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <slot name='header' />
          <button aria-label="Close" class="close" data-dismiss="modal" type="button"><span class="ion-android-close"></span></button>
          <h4 class="modal-title nk-title" v-if='title'>{{title}}</h4>
        </div>
        <div class="modal-body">
          <slot />
        </div>
        <div class="modal-footer" v-if='this.$slots.footer'>
          <slot name='footer' />
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  export default {
    name: 'generic-modal',
    props: {
      title: { type: String, required: false },
      uniqueId: { type: String, required: true}
    },

    data() {
      return { animateModalTimeout: null }
    },

    computed: {
      element() { return this.$refs[this.uniqueId]; }
    },

    mounted() {
        this.element.classList.remove('out')
        this.element.classList.add('in')
    },
  }
</script>