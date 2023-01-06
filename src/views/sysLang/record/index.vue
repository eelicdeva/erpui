<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item :label="$t('SysLang.zhCn')" prop="zhCn">
        <el-input
          v-model="queryParams.zhCn"
          placeholder="请输入"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('SysLang.enUs')" prop="enUs">
        <el-input
          v-model="queryParams.enUs"
          placeholder="请输入"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('SysLang.idId')" prop="idId" >
        <el-input
          v-model="queryParams.idId"
          placeholder="请输入"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('SysLang.langIdx')" prop="langIdx">
        <el-input
          v-model="queryParams.langIdx"
          placeholder="请输入"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('SysLang.langKey')" prop="langKey">
        <el-input
          v-model="queryParams.langKey"
          placeholder="请输入"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('SysLang.langTb')" prop="langTb">
        <el-input
          v-model="queryParams.langTb"
          placeholder="请输入"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('SysLang.langFn')" prop="langFn">
        <el-input
          v-model="queryParams.langFn"
          placeholder="请输入${comment}"
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
      <el-table-column label="Status" align="center" prop="status" />
      <el-table-column label="Memo" align="center" prop="remark" />

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
        <el-form-item label="" prop="zhCn">
          <el-input v-model="form.zhCn" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="" prop="enUs">
          <el-input v-model="form.enUs" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="" prop="langIdx">
          <el-input v-model="form.langIdx" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="" prop="langKey">
          <el-input v-model="form.langKey" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="" prop="langTb">
          <el-input v-model="form.langTb" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="${comment}" prop="langFn">
          <el-input v-model="form.langFn" placeholder="请输入${comment}" />
        </el-form-item>
        <el-form-item label="" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="Lang">
import { delLang, addLang, updateLang, listLangRecord, cleanLangRecord } from "@/api/sysLang/lang";
import type { QueryParams, AddParams } from "@/api/sysLang/lang";
import { ComponentInternalInstance, getCurrentInstance, ref, reactive, toRefs } from "vue";
import type { ElForm } from "element-plus";

const { proxy } = getCurrentInstance() as ComponentInternalInstance;

// const recordList = ref([]);
const langList = ref([]);
const open = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const title = ref("");
const queryRef = ref<InstanceType<typeof ElForm>>();
const langRef = ref<InstanceType<typeof ElForm>>();

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

const { queryParams, form, rules } = toRefs(data);

/** 查询lang列表 */
function getList() {
  loading.value = true;
  listLangRecord(queryParams.value).then(response => {
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
    langFn: null,
    status: "0",
    createby: null,
    createtime: null,
    updateby: null,
    updatetime: null,
    remark: null
  };
  langRef.value?.resetFields();
  // proxy.resetForm("langRef");
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





/** 提交按钮 */
function submitForm() {
  // proxy.$refs["langRef"].validate(valid => {
  langRef.value?.validate(valid => {
    if (valid) {
      if (form.value.langId != null) {
        updateLang(form.value).then(response => {
          proxy?.$modal.msgSuccess("修改成功");
          open.value = false;
          getList();
        });
      } else {
        addLang(form.value).then(response => {
          proxy?.$modal.msgSuccess("新增成功");
          open.value = false;
          getList();
        });
      }
    }
  });
}

/** 删除按钮操作 */
function handleDelete(row) {
  const _langIds = row.langId || ids.value;
  proxy?.$modal.confirm('是否确认删除lang编号为"' + _langIds + '"的数据项？').then(function() {
    return delLang(_langIds);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess("删除成功");
  }).catch(() => {});
}

/** 清空按钮操作 */
function handleClean() {
  proxy?.$modal.confirm("是否确认清空所有操作日志数据项?").then(function () {
    return cleanLangRecord();
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess("清空成功");
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
