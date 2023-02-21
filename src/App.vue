<template>
  <div class="app">
    <el-config-provider :locale="i18nLocale">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>

<script lang="ts" setup name="App">
import { computed, nextTick, onMounted  } from 'vue';
import useAppStore from '@/stores/modules/app';
import useSettingsStore from '@/stores/modules/settings';
import zh from 'element-plus/lib/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en' 
import id from 'element-plus/lib/locale/lang/id' 
import { handleThemeStyle } from '@/utils/theme';

const langStore = useAppStore();

// element select lang setting 语言配置
const i18nLocale = computed(() => {
	if (langStore.lang == "zh") { 
    document.documentElement.style.setProperty('--sidebar-width', '200px')  
    return zh;
  }
	if (langStore.lang == "en"){ 
    document.documentElement.style.setProperty('--sidebar-width', '250px')  
    return en;
  }
  if (langStore.lang == "id"){ 
    
    document.documentElement.style.setProperty('--sidebar-width', '260px')  
    return id;
  }
});

onMounted(() => {
    nextTick(() => {
        // 初始化主题样式
        handleThemeStyle(useSettingsStore().theme);
    });
});

</script>
<style scoped>
.app {
  height: 100%;
}
</style>