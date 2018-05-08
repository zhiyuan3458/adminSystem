<template>
  <ul>
    <diuni-tree :model="treeData"></diuni-tree>
  </ul>
</template>

<script>
import diuniTree from '@/components/diuniTree/diuniTree.vue';
import { treeData } from '@/components/lzyTree/mock.js';

export default {
  components: {
    diuniTree
  },
  data () {
    return {
      treeData: treeData
    };
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
