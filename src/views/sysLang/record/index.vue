<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item :label="$t('SysLang.zhCn')" prop="zhCn">
        <el-input
          v-model="queryParams.zhCn"
          :placeholder="$t('SysLang.zhCnPlaceholder')"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('SysLang.enUs')" prop="enUs">
        <el-input
          v-model="queryParams.enUs"
          :placeholder="$t('SysLang.enUsPlaceholder')"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('SysLang.idId')" prop="idId" >
        <el-input
          v-model="queryParams.idId"
          :placeholder="$t('SysLang.idIdPlaceholder')"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('SysLang.langIdx')" prop="langIdx">
        <el-input
          v-model="queryParams.langIdx"
          :placeholder="$t('SysLang.langIdxPlaceholder')"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('SysLang.langKey')" prop="langKey">
        <el-input
          v-model="queryParams.langKey"
          :placeholder="$t('SysLang.langKeyPlaceholder')"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('SysLang.langTb')" prop="langTb">
        <el-input
          v-model="queryParams.langTb"
          :placeholder="$t('SysLang.langTbPlaceholder')"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('SysLang.langFn')" prop="langFn">
        <el-input
          v-model="queryParams.langFn"
          :placeholder="$t('SysLang.langFnPlaceholder')"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">{{ $t('button.search') }}</el-button>
        <el-button icon="Refresh" @click="resetQuery">{{ $t('button.reset') }}</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
         <el-button
            type="danger"
            plain
            icon="Delete"
            :disabled="multiple"
            @click="handleDelete"
            v-hasPermi="['system:operlog:remove']"
         >{{ $t('button.delete') }}</el-button>
      </el-col>
      <el-col :span="1.5">
         <el-button
            type="danger"
            plain
            icon="Delete"
            @click="handleClean"
            v-hasPermi="['system:operlog:remove']"
         >{{ $t('button.clean') }}</el-button>
      </el-col>
      <el-col :span="1.5">
         <el-button
            type="warning"
            plain
            icon="Download"
            @click="handleExport"
            v-hasPermi="['system:operlog:export']"
         >{{ $t('button.export') }}</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
   </el-row>

    <el-table v-loading="loading" :data="langList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="" align="center" prop="langId" />
      <el-table-column :label="$t('SysLang.zhCn')" align="center" prop="zhCn"  />
      <el-table-column :label="$t('SysLang.enUs')" align="center" prop="enUs"  />
      <el-table-column :label="$t('SysLang.idId')" align="center" prop="idId"  />
      <el-table-column :label="$t('SysLang.langIdx')" align="center" prop="langIdx"  />
      <el-table-column :label="$t('SysLang.langKey')" align="center" prop="langKey"  />
      <el-table-column :label="$t('SysLang.langTb')" align="center" prop="langTb"  />
      <el-table-column :label="$t('SysLang.langFn')" align="center" prop="langFn"  />
      <el-table-column :label="$t('user.status')" align="center" prop="status" />
      <el-table-column :label="$t('user.remark')" align="center" prop="remark" />
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />

  </div>
</template>

<script setup lang="ts" name="Lang">
import { delLang, listLangRecord, cleanLangRecord } from "@/api/sysLang/lang";
import type { QueryParams, AddParams } from "@/api/sysLang/lang";
import { ComponentInternalInstance, getCurrentInstance, ref, reactive, toRefs } from "vue";
import type { ElForm } from "element-plus";
import i18n from '@/lang/index';

const {t} = i18n.global;
const { proxy } = getCurrentInstance() as ComponentInternalInstance;

// const recordList = ref([]);
const langList = ref([]);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const queryRef = ref<InstanceType<typeof ElForm>>();

interface Data {
  form: AddParams
  queryParams: QueryParams
  rules: any
}

const data: Data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    zhCn: null,
    enUs: null,
    langIdx: null,
    langKey: null,
    langTb: null,
    langFn: null,
    status: null,
  },
  rules: {
  }
});

const { queryParams } = toRefs(data);

/** 查询lang列表 */
function getList() {
  loading.value = true;
  listLangRecord(queryParams.value).then(response => {
    langList.value = response.rows;
    total.value = response.total;
    loading.value = false;
  });
}

/** 搜索按钮操作 */
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}

/** 重置按钮操作 */
function resetQuery() {
  queryRef.value?.resetFields();
  // proxy.resetForm("queryRef");
  handleQuery();
}

// 多选框选中数据
function handleSelectionChange(selection) {
  ids.value = selection.map(item => item.langId);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 删除按钮操作 */
function handleDelete(row) {
  const _langIds = row.langId || ids.value;
  proxy?.$modal.confirm(t('SysLang.confirmDeleteRecord1') + _langIds + t('SysLang.confirmDeleteRecord2')).then(function() {
    return delLang(_langIds);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess(t('user.succesDeleted'));
  }).catch(() => {});
}

/** 清空按钮操作 */
function handleClean() {
  proxy?.$modal.confirm(t('SysLang.cleanRecord')).then(function () {
    return cleanLangRecord();
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess(t('Job.emptySuccess'));
  }).catch(() => {});
}

/** 导出按钮操作 */
function handleExport() {
  proxy?.$download('sysLang/lang/export', {
    ...queryParams.value
  }, `lang_${new Date().getTime()}.xlsx`)
}

getList();
</script>
