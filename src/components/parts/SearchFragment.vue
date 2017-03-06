<template>
 <div v-html='finalHtml'></div>
</template>

<script type="text/javascript">
  String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
  };
  export default {
    name: 'search-fragment',

    props: {
      match: { type: Object, required: true }
    },

    mounted() {

    },

    computed: {
      fragment() {
        this.match.fragment;
      },

      finalHtml() {
        return this.parts.map(part => `<code class="${part.highlight ? 'highlight' : ''}">${part.text.replaceAll('\n', '<br />')}</code>`).join('');
      },

      matches() {
        return this.match.matches;
      },

      parts() {
        let currentIndex = 0;
        const parts = [];

        for (var matchIndex = 0; matchIndex < this.matches.length; matchIndex++) {
          const match = this.matches[matchIndex];
          const start = match.indices[0];
          const end   = match.indices[1];
          if(currentIndex < start) {
            parts.push({ text: this.match.fragment.substring(currentIndex, start) });
          }

          parts.push({ text: this.match.fragment.substring(start, end), highlight: true });
          currentIndex = end;
        }

        if(currentIndex < this.match.fragment.length - 1) {
          parts.push({ text: this.match.fragment.substring(currentIndex) });
        }

        return parts;
      },

    },
  }
</script>