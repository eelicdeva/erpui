<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch">
      <el-form-item :label="$t('genTable.tableName')" prop="tableName">
        <el-input
          v-model="queryParams.tableName"
          :placeholder="$t('genTable.tableNamePlaceholder')"
          clearable
          style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('genTable.tableComment')" prop="tableComment">
        <el-input
          v-model="queryParams.tableComment"
          :placeholder="$t('genTable.descRules')"
          clearable
          style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('user.creationtime')" style="width: 308px">
        <el-date-picker
          v-model="dateRange"
          value-format="YYYY-MM-DD"
          type="daterange"
          range-separator="-"
          :start-placeholder="$t('user.startDate')"
          :end-placeholder="$t('user.endDate')"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">{{ $t('button.search') }}</el-button>
        <el-button icon="Refresh" @click="resetQuery">{{ $t('button.reset') }}</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="Download"
          @click="handleGenTable"
          v-hasPermi="['tool:gen:code']"
        >{{ $t('genTable.generate') }}</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="info"
          plain
          icon="Upload"
          @click="openImportTable"
          v-hasPermi="['tool:gen:import']"
        >{{ $t('button.import') }}</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="Edit"
          :disabled="single"
          @click="handleEditTable"
          v-hasPermi="['tool:gen:edit']"
        >{{ $t('button.edit') }}</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="Delete"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['tool:gen:remove']"
        >{{ $t('button.delete') }}</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="tableList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" align="center" width="55"></el-table-column>
      <el-table-column :label="$t('user.serialRole')" type="index" width="50" align="center">
        <template #default="scope">
          <span>{{(queryParams.pageNum - 1) * queryParams.pageSize + scope.$index + 1}}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('genTable.tableName')"
        align="center"
        prop="tableName"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        :label="$t('genTable.tableComment')" 
        align="center"
        prop="tableComment"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        :label="$t('genTable.entity')" 
        align="center"
        prop="className"
        :show-overflow-tooltip="true"
      />
      <el-table-column :label="$t('user.creationtime')" align="center" prop="createTime" width="160" />
      <el-table-column :label="$t('genTable.updateTime')" align="center" prop="updateTime" width="160" />
      <el-table-column :label="$t('user.operate')" align="center" width="330" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-tooltip :content="$t('genTable.preview')" placement="top">
            <el-button
              type="primary"
              icon="View"
              @click="handlePreview(scope.row)"
              v-hasPermi="['tool:gen:preview']"
              link
            ></el-button>
          </el-tooltip>
          <el-tooltip :content="$t('genTable.isEdit')" placement="top">
            <el-button
              type="primary"
              icon="Edit"
              @click="handleEditTable(scope.row)"
              v-hasPermi="['tool:gen:edit']"
              link
            ></el-button>
          </el-tooltip>
          <el-tooltip :content="$t('button.delete')" placement="top">
            <el-button
              type="primary"
              icon="Delete"
              @click="handleDelete(scope.row)"
              v-hasPermi="['tool:gen:remove']"
              link
            ></el-button>
          </el-tooltip>
          <el-tooltip :content="$t('genTable.sync')" placement="top">
            <el-button
              type="primary"
              icon="Refresh"
              @click="handleSynchDb(scope.row)"
              v-hasPermi="['tool:gen:edit']"
              link
            ></el-button>
          </el-tooltip>
          <el-tooltip :content="$t('genTable.genCode')" placement="top">
            <el-button
              type="primary"
              icon="Download"
              @click="handleGenTable(scope.row)"
              v-hasPermi="['tool:gen:code']"
              link
            ></el-button>
          </el-tooltip>
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
    <!-- 预览界面 -->
    <el-dialog :title="preview.title" v-model="preview.open" width="80%" top="5vh" append-to-body class="scrollbar">
      <el-tabs v-model="preview.activeName">
        <el-tab-pane
          v-for="(value, key) in preview.data"
          :label="key.substring(key.lastIndexOf('/')+1,key.indexOf('.vm'))"
          :name="key.substring(key.lastIndexOf('/')+1,key.indexOf('.vm'))"
          :key="value"
        >
          <el-link :underline="false" icon="DocumentCopy" v-copyText="value" v-copyText:callback="copyTextSuccess" style="float:right">&nbsp;{{ $t('button.copy') }}</el-link>
          <pre>{{ value }}</pre>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
    <import-table ref="importRef" @ok="handleQuery" />
  </div>
</template>

<script setup lang="ts" name="Gen">
import { listTable, previewTable, delTable, genCode, synchDb } from "@/api/tool/gen";
import type { QueryParams } from "@/api/tool/gen";
import router from "@/router";
import { getCurrentInstance, ComponentInternalInstance, ref, reactive, toRefs, onActivated } from 'vue';
import { useRoute } from 'vue-router';
import importTable from "./importTable.vue";
import type { ElForm } from "element-plus";
import i18n from '@/lang/index';

const {t} = i18n.global;
const route = useRoute();
const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const tableList = ref([]);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const tableNames = ref([]);
const dateRange = ref([]);
const uniqueId = ref("");
const queryRef = ref<InstanceType<typeof ElForm>>();
const importRef = ref<InstanceType<typeof importTable>>();

interface PreviewData {
  'vm/java/controller.java.vm'?: string
  'vm/java/domain.java.vm'?: string
  'vm/java/mapper.java.vm'?: string
  'vm/java/service.java.vm'?: string
  'vm/java/serviceImpl.java.vm'?: string
  'vm/js/api.js.vm'?: string
  'vm/sql/sql.vm'?: string
  'vm/vue/v3/index.vue.vm'?: string
  'vm/xml/mapper.xml.vm'?: string  
}

interface Preview {
  open: boolean
  title: string
  data: PreviewData
  activeName: string
}

interface Data {
  queryParams: QueryParams
  preview: Preview
}

const data: Data = reactive({
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    tableName: undefined,
    tableComment: undefined
  },
  preview: {
    open: false,
    title: t('genTable.codePreview'),
    data: {},
    activeName: "domain.java"
  }
});



const { queryParams, preview } = toRefs(data);

onActivated(() => {
  const time = route.query.t;
  if (time != null && time != uniqueId.value) {
    uniqueId.value = String(time);
    queryParams.value.pageNum = Number(route.query.pageNum);
    dateRange.value = [];
    proxy?.resetForm("queryForm");
    getList();
  }
})

/** 查询表集合 */
function getList() {
  loading.value = true;
  listTable(proxy?.addDateRange(queryParams.value, dateRange.value)).then(response => {
    tableList.value = response.rows;
    total.value = response.total;
    loading.value = false;
  });
  
}
/** 搜索按钮操作 */
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}
/** 生成代码操作 */
function handleGenTable(row) {
  const tbNames = row.tableName || tableNames.value;
  if (tbNames == "") {
    proxy?.$modal.msgError(t('genTable.msgErrorIndex'));
    return;
  }
  if (row.genType === "1") {
    genCode(row.tableName).then(response => {
      proxy?.$modal.msgSuccess(t('genTable.msgGenSuccess') + row.genPath);
    });
  } else {
    proxy?.$download.zip("/tool/gen/batchGenCode?tables=" + tbNames, "ruoyi.zip");
  }
}
/** 同步数据库操作 */
function handleSynchDb(row) {
  const tableName = row.tableName;
  proxy?.$modal.confirm(t('genTable.confirmSync1') + tableName + t('genTable.confirmSync2')).then(function () {
    return synchDb(tableName);
  }).then(() => {
    proxy.$modal.msgSuccess(t('genTable.syncSuccess'));
  }).catch(() => {});
}
/** 打开导入表弹窗 */
function openImportTable() {
  importRef.value?.show();
  // proxy.$refs["importRef"].show();
}
/** 重置按钮操作 */
function resetQuery() {
  dateRange.value = [];
  queryRef.value?.resetFields();
  // proxy.resetForm("queryRef");
  handleQuery();
}
/** 预览按钮 */
function handlePreview(row) {
  previewTable(row.tableId).then(response => {
    preview.value.data = response.data;
    preview.value.open = true;
    preview.value.activeName = "domain.java";
  });
  
}
/** 复制代码成功 */
function copyTextSuccess() {
  proxy?.$modal.msgSuccess(t('genTable.copySuccess'));
}
// 多选框选中数据
function handleSelectionChange(selection) {
  ids.value = selection.map(item => item.tableId);
  tableNames.value = selection.map(item => item.tableName);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}
/** 修改按钮操作 */
function handleEditTable(row) {
  const tableId = row.tableId || ids.value[0];
  router.push({ path: "/tool/gen-edit/index/" + tableId, query: { pageNum: queryParams.value.pageNum } });
}
/** 删除按钮操作 */
function handleDelete(row) {
  const tableIds = row.tableId || ids.value;
  proxy?.$modal.confirm(t('genTable.confirmDelete1') + tableIds + t('genTable.confirmDelete2')).then(function () {
    return delTable(tableIds);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess(t('user.succesDeleted'));
  }).catch(() => {});
}

getList();
</script>
