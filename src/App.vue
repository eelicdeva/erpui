<template>
  <div class="app">
    <el-config-provider :locale="i18nLocale">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>

<script lang="ts" setup name="App">
import { computed } from 'vue';
import useAppStore from './stores/modules/app';
import zh from 'element-plus/lib/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en' 
import id from 'element-plus/lib/locale/lang/id' 

const langStore = useAppStore();

// element select lang setting 语言配置
const i18nLocale = computed(() => {
	if (langStore.lang == "zh") return zh;
	if (langStore.lang == "en") return en;
  if (langStore.lang == "id") return id;
});

</script>
<style scoped>
.app {
  height: 100%;
}
</style>