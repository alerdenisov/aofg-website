<template>
  <b class="nk-action-reaction" :class='{ zero : !count }'>
    <i class="nk-badge bg-main-3" v-if='count'>{{count}}</i> 
    {{emodji}}
  </b>
</template>

<script type="text/javascript">
// 👍🏻👎🏻👌🏻🖕🏻🤘🏻👏🏻
  const EMODJIES = {
    'likes': '👍',
    'dislikes': '👎',
    'happy': '😄',
    'sad': '😔',
    'hearts': '❤️',
    'hooray': '🎉',
  }
  export default {
    props: {
      count: { type: Number, required: true },
      type:  { type: String, required: true }
    },

    mounted() {},

    computed: {
      emodji() {
        return EMODJIES[this.type];
      }
    }
  }
</script>


<style scoped>
</style>