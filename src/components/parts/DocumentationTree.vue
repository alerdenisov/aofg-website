<template>
  <ul v-if='menu'>
    <tree-node v-for='(item, key) in menu' :key='item.sha' :open='item.open' :title='item.title' :path='item.path' pathRoot='/docs/' :tree='item.tree' />
  </ul>
</template>

<script>
  import TreeNode from '@/components/elements/TreeNode'
  export default {
    name: 'documentation-tree',
    props: {
      selected: { type: Object, required: true },
      tree: { type: Object, required: true },
      path: { type: String, required: true }
    },

    components: {
      TreeNode
    },

    computed: {
      menu() {
        this.path;
        return this.selectTreeRecursive(this.tree);
      }
    },

    'watch': {
      'path': 'updateMenu'
    },

    methods: {
      updateMenu() {
        console.log('path updated ' + this.path);
        this.menu = this.selectTreeRecursive(this.tree);
        this.$forceUpdate();
      },
      selectTreeRecursive(root) {
        if(!root)
          return;

        Object.keys(root).forEach(key => {
          root[key].open = this.path.startsWith(root[key].path);
          this.selectTreeRecursive(root[key].tree);
        })

        return root;
      },
    }
  }
</script>