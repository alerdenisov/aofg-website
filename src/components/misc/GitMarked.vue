<template>
  <div v-html='body' />
</template>

<script type="text/javascript">
  import marked from 'marked'
  import pify from 'pify'
  import highlight from 'highlight.js'

  const renderer = new marked.Renderer();
  const defaultTable = renderer.table;

  marked.setOptions({
    highlight(code, lang, cb) {
      return highlight.highlightAuto(code, lang ? [lang] : undefined).value;
    }
  })
  // const asyncMarked = pify(marked);

  renderer.table = (header, body) => {
    console.log(header, body)
    return `
    <table class='table table-striped'>
      <thead>
        ${header}
      </thread>
      <tbody>
        ${body}
      </tbody>
    </table>
    `;
  }
  renderer.heading = (text, level) => {
    level += 2;
    if(level > 5) level = 5;

    return `<h${level}>${text}</h${level}>`
  } 

  export default {
    name: 'git-marked',
    props: {
      content: { type: String, required: true }
    },

    computed: {
      body() {
        return marked(this.content, {
          renderer,
          gfm: true,
          tables: true,
          breaks: true,
          pedantic: true,
          smartypants: true
        });
      }
    }
  }
</script>