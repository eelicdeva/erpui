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
        Bahasa Indonesia
      </el-dropdown-item>
    </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script>
import useAppStore from "@/store/modules/app";
import { updateLang } from "@/api/system/user";
//import variable from "@/assets/styles/variables.module.scss";

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
    if(useAppStore().lang == null){
      this.$i18n.locale = 'en'
      useAppStore().setLanguage('en')
       
    }
    
  },
  
  methods: {
    handleSetLanguage(lang) {
      //useAppStore().setdisableValidate(true)
      this.$i18n.locale = lang
      useAppStore().setLanguage(lang)
      if(this.isActive){
        updateLang(lang);
        this.$modal.loading("正在设置语言，请稍候(Setting language, please wait)...");
        setTimeout("window.location.reload()", 1000);

        
        
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