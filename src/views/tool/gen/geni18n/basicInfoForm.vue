<template>
  <el-form ref="basicInfoForm" :model="info" :rules="rules" label-width="150px">
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('genTable.tableName')" prop="tableName">
          <el-input :placeholder="$t('genTable.tableNamePlaceholder2')" v-model="info.tableName" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('genTable.tableComment')" prop="tableComment">
          <el-input :placeholder="$t('genTable.pleaseEnter')" v-model="info.tableComment" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('genTable.className')" prop="className">
          <el-input :placeholder="$t('genTable.pleaseEnter')" v-model="info.className" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('genTable.author')" prop="functionAuthor">
          <el-input :placeholder="$t('genTable.pleaseEnter')" v-model="info.functionAuthor" />
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item :label="$t('user.remark')" prop="remark">
          <el-input type="textarea" :rows="3" v-model="info.remark"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElForm } from "element-plus";
import i18n from '@/lang/index';
defineProps({
  info: {
    type: Object,
    default: null
  }
});

const {t} = i18n.global;
const basicInfoForm = ref<InstanceType<typeof ElForm>>();

// 表单校验
const rules = ref({
  tableName: [{ required: true, message: t('genTable.tableNamePlaceholder'), trigger: "blur" }],
  tableComment: [{ required: true, message: t('genTable.descRules'), trigger: "blur" }],
  className: [{ required: true, message: t('genTable.entityRules'), trigger: "blur" }],
  functionAuthor: [{ required: true, message: t('genTable.authorRules'), trigger: "blur" }]
});

defineExpose({
  basicInfoForm
});

</script>
