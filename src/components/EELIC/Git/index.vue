<template>
  <div>
    <svg-icon icon-class="github" @click="goto" />
  </div>
</template>

<script lang="ts" setup name="Git">
import { ref } from 'vue';

const url = ref('http://109.106.255.153:3000/eason/erp-ui-dev.git');

function goto() {
  window.open(url.value)
}
</script>
