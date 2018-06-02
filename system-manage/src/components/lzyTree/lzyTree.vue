<template>
  <ul>
    <tree-item :model="treeData"></tree-item>
  </ul>
</template>

<script>
import treeItem from '@/components/lzyTree/components/treeItem';

export default {
  components: {
    treeItem
  },
  props: {
    treeData: []
  },
  methods: {
    assignData (data) {
      this.treeData = data;
    },
    curNodeClicked (model, component) {
      // 当前被点击节点的主要信息
    }
  }
};
</script>

<style>

</style>
