<template> 
  <li>
    <router-link :to='`${pathRoot}${path}`'>{{title}}</router-link>
    <ul v-if='open && tree' class="opened">
      <tree-node v-for='child in tree' :key='child.sha' :title='child.title' :open='child.open' :path='child.path' :pathRoot='pathRoot' :tree='child.tree' />
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
      pathRoot: {required: false}
    },

    components: {
      TreeNode
    }
  }
</script>
