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
import i18n from '@/lang/index';

const {t} = i18n.global;

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
      this.$i18n.locale = lang
      useAppStore().setLanguage(lang)
      console.log('this')
      console.log(this)
      console.log(this.isActive)
      if(this.isActive){
        updateLang(lang);
        this.$modal.loading("正在设置语言 | Setting language...");
        setTimeout("window.location.reload()", 500);      
      }else{
        this.$emit('selectLangEvent');
      }
      this.$modal.msgSuccess(t('login.setlanguage'));
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