<template>
  <button
    :style="{ borderColor: color }"
    class="btn">
    <slot></slot>
  </button>
</template>


<script lang="ts">
export default {
  props: {
    color: {
      type: String,
      default: 'tomato'
    }
  },
  mounted(){
  }
}
</script>

<style lang="scss" scoped>
  .btn {
    font-size: 20px;
    width: 7rem;
    height: 4rem;
    background-color: #409EFF;
    color: white;
    border-radius: 5px;
    text-align: center;
    border: 1px solid #409EFF;
    transition: .2s;
    box-sizing: border-box;
    margin: 10px;
    &:hover {
      cursor: pointer;
      background-color: white;
      color: #409EFF;
    }
  }
</style>