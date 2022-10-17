<template>
  <el-dropdown trigger="click" class="international" @command="handleSetLanguage">
    <div>
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
import useAppStore from '@/store/modules/app'
export default {
  computed: {
    language() {
      return useAppStore().lang;
      
    }
  },
  
  methods: {
    handleSetLanguage(lang) {
      this.$i18n.locale = lang
      useAppStore().setLanguage(lang)
      this.$message({
        message:  this.$t('login.setlanguage'),
        type: 'success'
      })
    }
  }
 
}
</script>