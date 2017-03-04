import Vue from 'vue'

export default Vue.component('clone-node', {
  render(createElement) {
    return createElement(
      'span', [
        Vue.util.extend({}, this.node)
      ]
    );
  },

  props: {
    node: {
      required: true
    }
  }
})