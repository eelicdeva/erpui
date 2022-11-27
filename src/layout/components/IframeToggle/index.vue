<template>
  <transition-group name="fade-transform" mode="out-in">
    <inner-link
      v-for="(item, index) in tagsViewStore.iframeViews"
      :key="item.path"
      :iframeId="'iframe' + index"
      v-show="route.path === item.path"
      :src="item.meta.link"
    ></inner-link>
  </transition-group>
</template>

<script lang="ts" setup name="IframeToggle">
import InnerLink from "@/layout/components/InnerLink/index.vue"
import useTagsViewStore from '@/stores/modules/tagsView'
import { useRoute } from "vue-router";

const route = useRoute();
const tagsViewStore = useTagsViewStore()
</script>
