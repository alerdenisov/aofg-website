<template>
  <div> 
    <fade-transition>
      <generic-modal v-if='isOpen' uniqueId="githubLimitModal">
        <h1>githubLimit</h1>
      </generic-modal>
    </fade-transition>
  </div>
</template>

<script type="text/javascript">
  import GenericModal from '@/components/elements/GenericModal'
  import FadeTransition from '@/components/misc/FadeTransition'

  export default {
    name: 'aofg-github-limit-modal',
    components: {
      GenericModal,
      FadeTransition  
    },
    computed: {
      isOpen() { return this.$store.state.modal === 'githubLimit'; }
    }
  }
</script>