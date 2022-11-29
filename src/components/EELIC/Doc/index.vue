<template>
  <div>
    <svg-icon icon-class="question" @click="goto" />
  </div>
</template>

<script lang="ts" setup name="Doc">
import { ref } from 'vue';

const url = ref('http://www.eelic.org/system/doc/'); //to-do need to add link doc eelic.org

function goto() {
  window.open(url.value)
}
</script>