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

/**
for the error link: ../tool/demo/www.eelic.org
change to link: ../tool/demo/eelicorg
使用iframe标签，嵌入外部网页http://www.eelic.org
菜单设置路由地址： eelicorg
菜单设置组件路径： eelicorg
新建组件 eelicorg如下：
<template>
    <iframe class="iframe" src="http://www.eelic.org/" frameborder="0" scrolling="auto"></iframe>
</template>
 * 
 */


</script>
