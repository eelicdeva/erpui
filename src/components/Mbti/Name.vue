<template>
  <section>
    <p>Silakan masukkan nama Anda</p>
    <div class="entry">
      <el-input
        v-model="name"
        type="text"
        @keyup.enter="nameEntry(), $emit('click')" />
      <el-button
        type="primary"
        style="margin-left: 6px;"
        @click="nameEntry(), $emit('click')">
        Konfirmasi
      </el-button>
    </div>
  </section>
</template>
<script>
import useAppStore from "@/store/modules/app";

export default {
  data() {
    return {
      name: ''
    }
  },
  emits: [
    'click'
  ],
  methods: {
    nameEntry() {
      useAppStore().setuserNameMbti(this.name)
    }
  }
}
</script>

<style lang="scss" scoped>
  section {
    position: absolute;
    margin: auto;
    right: 0;
    left: 0;
    border: 1px solid #409EFF;
    border-radius: 10px;
    width: 400px;
    margin-top: 1rem;
    p {
      text-align: center;
      margin: 1rem;
    }
    .entry {
      position: relative;
      display: flex;
      justify-content: center;
      align-content: center;
      margin : 20px;
    }
  }
</style>