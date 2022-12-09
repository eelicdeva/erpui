<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item :label="$t('SysLang.zhCn')" prop="zhCn" >
        <el-input
          v-model="queryParams.zhCn"
          :placeholder="$t('lang.SysLang.zhCnPlaceholder')"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('SysLang.enUs')" prop="enUs" >
        <el-input
          v-model="queryParams.enUs"
          :placeholder="$t('lang.SysLang.enUsPlaceholder')"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('SysLang.idId')" prop="idId" >
        <el-input
          v-model="queryParams.idId"
          :placeholder="$t('lang.SysLang.idIdPlaceholder')"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('SysLang.langIdx')" prop="langIdx" >
        <el-input
          v-model="queryParams.langIdx"
          :placeholder="$t('lang.SysLang.langIdxPlaceholder')"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('SysLang.langKey')" prop="langKey" >
        <el-input
          v-model="queryParams.zhCn"
          :placeholder="$t('lang.SysLang.langKeyPlaceholder')"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('SysLang.langTb')" prop="langTb" >
        <el-input
          v-model="queryParams.langTb"
          :placeholder="$t('lang.SysLang.langTbPlaceholder')"
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
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList" ></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="langList">
      <el-table-column :label="$t('SysLang.zhCn')" align="center" prop="zhCn"  />
      <el-table-column :label="$t('SysLang.enUs')" align="center" prop="enUs"  />
      <el-table-column :label="$t('SysLang.idId')" align="center" prop="idId"  />
      <el-table-column :label="$t('SysLang.langIdx')" align="center" prop="langIdx"  />
      <el-table-column :label="$t('SysLang.langKey')" align="center" prop="langKey"  />
      <el-table-column :label="$t('SysLang.langTb')" align="center" prop="langTb"  />
      <el-table-column :label="$t('SysLang.langFn')" align="center" prop="langFn"  />
      <el-table-column :label="$t('user.operate')" align="center" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-button
            type="primary"
            icon="Edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['sysLang:lang:edit']"
            link
          >{{ $t('button.edit') }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改lang对话框 -->
    <el-dialog :title="title" v-model="open" width="500px" append-to-body>
      <el-form ref="langRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item :label="$t('SysLang.zhCn')" prop="zhCn">
          <el-input v-model="form.zhCn" :placeholder="$t('lang.SysLang.zhCnPlaceholder')" />
        </el-form-item>
        <el-form-item :label="$t('SysLang.enUs')" prop="enUs">
          <el-input v-model="form.enUs" :placeholder="$t('lang.SysLang.enUsPlaceholder')" />
        </el-form-item>
        <el-form-item :label="$t('SysLang.idId')" prop="idId">
          <el-input v-model="form.idId" :placeholder="$t('lang.SysLang.idIdPlaceholder')" />
        </el-form-item>
        <el-form-item :label="$t('user.remark')" prop="remark">
          <el-input v-model="form.remark" :placeholder="$t('lang.SysLang.idIdPlaceholder')" type="textarea" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitForm">{{ $t('button.submit') }}</el-button>
          <el-button @click="cancel">{{ $t('button.cancel') }}</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="Lang">
import { listLang, updateLang } from "@/api/sysLang/lang";
import i18n from '@/lang/index';

const {t} = i18n.global;
const { proxy } = getCurrentInstance();

const langList = ref([]);
const open = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const title = ref("");

const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    zhCn: null,
    enUs: null,
    idId: null,
    langIdx: null,
    langKey: null,
    langTb: null,
    status: null,
    createby: null,
    createtime: null,
    updateby: null,
    updatetime: null,
  },
  rules: {
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询lang列表 */
function getList() {
  loading.value = true;
  listLang(queryParams.value).then(response => {
    langList.value = response.rows;
    total.value = response.total;
    loading.value = false;
  });
}

// 取消按钮
function cancel() {
  open.value = false;
  reset();
}

// 表单重置
function reset() {
  form.value = {
    langId: null,
    zhCn: null,
    enUs: null,
    idId: null,
    langIdx: null,
    langKey: null,
    langTb: null,
    status: "0",
    createby: null,
    createtime: null,
    updateby: null,
    updatetime: null,
    remark: null
  };
  proxy.resetForm("langRef");
}

/** 搜索按钮操作 */
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}

/** 重置按钮操作 */
function resetQuery() {
  proxy.resetForm("queryRef");
  handleQuery();
}

// 多选框选中数据
// function handleSelectionChange(selection) {
//   ids.value = selection.map(item => item.langIdx);
//   console.log(ids.value);
//   single.value = selection.length != 1;
//   multiple.value = !selection.length;

// }

/** 修改按钮操作 */
function handleUpdate(row) {
  reset();
  const _langId = row.langId || ids.value
  console.log("row :");
  console.log(row);
  
  form.value.langId = row.langId,
  form.value.zhCn = row.zhCn,
  form.value.enUs = row.enUs,
  form.value.idId = row.idId,
  form.value.langIdx = row.langIdx,
  form.value.langKey = row.langKey,
  form.value.langTb = row.langTb,
  form.value.langFn = row.langFn,
  open.value = true;
  title.value = "修改lang";
  console.log(form.value);
 
}

/** 提交按钮 */
function submitForm() {
  proxy.$refs["langRef"].validate(valid => {
    if (valid) {
      if (form.value.langIdx != null) {
        updateLang(form.value).then(response => {
          proxy.$modal.msgSuccess(t('button.successModify'));
          open.value = false;
          getList();
        });
      } 
    }
  });
}

getList();
</script>
