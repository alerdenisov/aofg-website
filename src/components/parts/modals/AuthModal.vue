<template>
  <div> 
    <transition name='fall'>
      <generic-modal v-if='isOpen' title="Unauthrized limits is over" uniqueId="authModal">
        <div>
          <p class='lead' style='margin-bottom: 10px'>
            We're using GitHub API to fetch data and limits is over.
          </p>
          <p>
            Please, authenticate in our application to get extra <strong>5,000</strong> calls per hour and more features:
          </p>
          <ul>
            <li>👍 👎 😄 ❤️ 🎉 everything</li>
            <li>Create new topic on forums</li>
            <li>Enjoy to discuss with others</li>
          </ul>
        </div>
        <div slot="footer">
          <small>Wait 41 minute for next 60 call or </small>&nbsp;&nbsp;&nbsp;<a href="gitAuth" class="nk-btn nk-btn-color-dark-1 nk-btn-bg-white nk-btn-x3">Auth with <span class="ic-github-2"></span></a>
        </div>
      </generic-modal>
    </transition>
  </div>
</template>

<script type="text/javascript">
  import GenericModal from '@/components/elements/GenericModal'
  import FadeTransition from '@/components/misc/FadeTransition'

  export default {
    name: 'aofg-auth-modal',
    components: {
      GenericModal,
      FadeTransition  
    },
    computed: {
      isOpen() { return this.$store.state.modal === 'login'; }
    }
  }
</script>
<style scoped>

  .fade-enter-active, .fade-leave-active,
  .fade-enter-active .modal-dialog, .fade-leave-active .modal-dialog {
    transition: opacity 2.5s, transform 2.5s;
  }

  .fall-enter-to, .fade-leave {
    /* State of active */
    opacity: 1
  }


  .fall-enter, .fade-leave-to {
    /* State of deactivated */
    opacity: 0
  }

  .fall-enter .modal-dialog, .fade-leave-to .modal-dialog {
    /* State of deactivated */
  }

  /*.transition-wrapper { position: relative; }
  .transition-wrapper > div {  }
  .fade-enter-active, .fade-leave-active {
    position: relative;
    top: 0;
    transition: opacity .6s, top .6s, max-height .4s;
  }
  .fade-enter-to, .fade-leave {
    max-height: 1600px;
    opacity: 1;
    top: 0;
  }
  .fade-enter, .fade-leave-to {
    position: relative;
    top: -20px;
    max-height: 50px;
    opacity: 0;
  }*/
</style>
