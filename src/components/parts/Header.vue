<template>
  <div class="aofg-header">
    <header class="nk-header nk-header-opaque">
      <aofg-contacts/>
      <aofg-navigation/>
    </header>
  </div>
</template>

<script>
  import AofgContacts from '@/components/parts/Contacts.vue'
  import AofgNavigation from '@/components/parts/Navigation.vue'

  export default {
    name: 'aofg-header',
    components: {
      AofgContacts,
      AofgNavigation
    }
  }
</script>