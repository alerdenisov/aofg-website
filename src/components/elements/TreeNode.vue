<template> 
  <li>
    <router-link :to='`${pathRoot}${path}`' class='nk-doc-tree-link' :class='classes'>
      <h6 :class='type'>{{path.split('/').slice(-1)[0]}}</h6>
    </router-link>
    <ul v-if='open && tree' class="opened">
      <tree-node v-for='child in tree' :type='child.type' :key='child.sha' :title='child.title' :open='child.open' :path='child.path' :pathRoot='pathRoot' :tree='child.tree' />
    </ul>
  </li>
</template>

<script type="">
  import TreeNode from '@/components/elements/TreeNode'
  export default {
    name: 'tree-node',
    props: {
      title: { required: true },
      path: { required: true },
      tree: { required: false },
      open: { required: true },
      type: { required: false },
      pathRoot: { required: false }
    },

    components: {
      TreeNode
    },

    computed: {
      classes() {
        const { type } = this;
        return {
          type,
          active: this.open
        }
      }
    }
  }
</script>

<style>
  .nk-doc-tree-link:focus,
  .nk-doc-tree-link {
    color: #aaa;
    text-decoration: none;
  }

  .nk-doc-tree-link.active,
  .nk-doc-tree-link.active.open,
  .nk-doc-tree-link:active,
  .nk-doc-tree-link:hover {
    color: #fff;
    text-decoration: none;
  }

  .nk-doc-tree-link .blob {
    font-family: inherit;
    font-weight: inherit;
  }
</style>