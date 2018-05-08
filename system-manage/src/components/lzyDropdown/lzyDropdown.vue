<template>
<div class="lzy-dropdown-wrapper">
  <slot name="dropdownSpan"></slot>
  <div class="dropdown-menu">
    <ul>
      <li v-for="(item, index) in dropdownItems"
          @click="handleClick(item)"
          :key="index"
      >
        {{item.name}}
      </li>
    </ul>
  </div>
</div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    dropdownItems: {
      type: Array
    }
  }
};
</script>

<style lang="less">
.lzy-dropdown-wrapper {
  position: relative;
  .dropdown-menu {
    width: 300px;
    height: 300px;
    position: absolute;
    top: 36px;
    left: 0;
    background: blue;
    border: 1px solid black;
    box-shadow: #ddd;

    li {
      padding: 10px 5px;

      &:hover {
        color: white;
        background: #56A2E8;
      }
    }
  }
}
</style>
