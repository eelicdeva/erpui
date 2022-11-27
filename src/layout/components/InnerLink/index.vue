<template>
  <div :style="'height:' + height">
    <iframe
      :id="iframeId"
      style="width: 100%; height: 100%"
      :src="src"
      frameborder="no"
    ></iframe>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { Ref } from 'vue';


interface InnerLinkProps {
  src: string;
  iframeId: string;
};
const { src = '/', iframeId } = defineProps<InnerLinkProps>();

const height: Ref<string> = ref(document.documentElement.clientHeight - 94.5 + "px");
</script>