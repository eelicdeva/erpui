<template>
  <el-dropdown trigger="click" class="international" @command="handleSetLanguage" value="selectOk">
    <div class="size-icon--style">
      <svg-icon class-name="international-icon" icon-class="language" />
    </div>
        <template #dropdown>
    <el-dropdown-menu>
      <el-dropdown-item :disabled="language==='zh'" command="zh">
        中文
      </el-dropdown-item>
      <el-dropdown-item :disabled="language==='en'" command="en">
        English
      </el-dropdown-item>
      <el-dropdown-item :disabled="language==='id'" command="id">
        Indonesia
      </el-dropdown-item>
    </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

 <script lang="ts" name="selectLang">
import useAppStore from "@/stores/modules/app";
import { updateLang } from "@/api/system/user";
//import { ComponentInternalInstance, getCurrentInstance } from 'vue';
//const { proxy } = getCurrentInstance() as ComponentInternalInstance
//proxy?.$axios('')
//获取当前Vue实例的上下文
//const { appContext } = getCurrentInstance();
//const { $modal } = appContext.config.globalProperties;//全局属性解


//import modal from "@/plugins/modal";
export default {
  computed: {
    language() {
      return useAppStore().lang;
    },
  },

  props: {
    isActive: {
    type: Boolean,
    default: false
  },
  },
  created() {
    let langStore = useAppStore().lang;
    this.$i18n.locale = langStore;
    useAppStore().setLanguage(langStore);     
  },
  
  methods: {
    handleSetLanguage(lang: string) {
      //useAppStore().setdisableValidate(true)
      this.$i18n.locale = lang
      useAppStore().setLanguage(lang)
      if(this.isActive){
        updateLang(lang);
        //app.config.globalProperties.$modal.loading("正在设置语言，请稍候(Setting language, please wait)...");
        (this.$modal as any).loading("正在设置语言，请稍候(Setting language, please wait)...");
        setTimeout("window.location.reload()", 500);      
      }else{
        this.$emit('selectLangEvent');
      }
      this.$message({
        message: this.$t('login.setlanguage'),
        type: 'success'
      })     
    }
  }
 
}
</script>

<style lang='scss' scoped>
  .size-icon--style {
    font-size: 18px;
    line-height: 50px;
  }
  </style>