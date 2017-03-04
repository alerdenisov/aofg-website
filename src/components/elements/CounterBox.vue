<template>
  <div class="nk-box-2 nk-box-line">
    <!-- START: Counter -->
    <div class="nk-counter-3">
      <div class="nk-count">
        {{ amount }}
      </div>
      <h3 class="nk-counter-title h4">{{ title }}</h3>
      <div class="nk-gap-1"></div>
    </div><!-- END: Counter -->
  </div>
</template>

<script type="text/javascript">
  export default {
    name: 'counter-box',
    props: {
      'amount': { default: 0 },
      'title': { default: 'unknown' },
      'raw': { default: false }
    }
  }
</script>