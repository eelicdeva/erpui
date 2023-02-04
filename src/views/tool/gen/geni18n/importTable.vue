<template>
  <!-- 导入表 -->
  <el-dialog :title="$t('genTable.importTable')" v-model="visible" width="800px" top="5vh" append-to-body>
    <el-form :model="queryParams" ref="queryRef" :inline="true">
      <el-form-item :label="$t('genTable.tableName')" prop="tableName">
        <el-input
          v-model="queryParams.tableName"
          :placeholder="$t('genTable.tableNamePlaceholder2')"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('genTable.tableComment')" prop="tableComment">
        <el-input
          v-model="queryParams.tableComment"
          :placeholder="$t('genTable.descRules')"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">{{ $t('button.search') }}</el-button>
        <el-button icon="Refresh" @click="resetQuery">{{ $t('button.reset') }}</el-button>
      </el-form-item>
    </el-form>
    <el-row>
      <el-table @row-click="clickRow" ref="table" :data="dbTableList" @selection-change="handleSelectionChange" height="260px">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="tableName" :label="$t('genTable.tableName')" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="tableComment" :label="$t('genTable.tableComment')" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="createTime" :label="$t('user.creationtime')"></el-table-column>
        <el-table-column prop="updateTime" :label="$t('genTable.updateTime')"></el-table-column>
      </el-table>
      <pagination
        v-show="total>0"
        :total="total"
        v-model:page="queryParams.pageNum"
        v-model:limit="queryParams.pageSize"
        @pagination="getList"
      />
    </el-row>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="handleImportTable">{{ $t('button.submit') }}</el-button>
        <el-button @click="visible = false">{{ $t('button.cancel') }}</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { listDbTable, importTable } from "@/api/tool/geni18n";
import { ComponentInternalInstance, getCurrentInstance, ref, reactive } from 'vue';
import { ElForm, ElTable } from "element-plus";
import i18n from '@/lang/index';

const {t} = i18n.global;
const total = ref(0);
const visible = ref(false);
const tables = ref([]);
const dbTableList = ref([]);
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const table = ref<InstanceType<typeof ElTable>>();
const queryRef = ref<InstanceType<typeof ElForm>>();

const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,
  tableName: undefined,
  tableComment: undefined
});

const emit = defineEmits(["ok"]);

/** 查询参数列表 */
function show() {
  getList();
  visible.value = true;
}
/** 单击选择行 */
function clickRow(row) {
  // @ts-expect-error
  table.value?.toggleRowSelection(row, undefined);
  // proxy.$refs.table.toggleRowSelection(row);
}
/** 多选框选中数据 */
function handleSelectionChange(selection) {
  tables.value = selection.map(item => item.tableName);
}
/** 查询表数据 */
function getList() {
  listDbTable(queryParams).then(res => {
    dbTableList.value = res.rows;
    total.value = res.total;
  });
}
/** 搜索按钮操作 */
function handleQuery() {
  queryParams.pageNum = 1;
  getList();
}
/** 重置按钮操作 */
function resetQuery() {
  queryRef.value?.resetFields();
  // proxy.resetForm("queryRef");
  handleQuery();
}
/** 导入按钮操作 */
function handleImportTable() {
  const tableNames = tables.value.join(",");
  if (tableNames == "") {
    proxy?.$modal.msgError(t('genTable.msgImportTable'));
    return;
  }
  importTable({ tables: tableNames }).then(res => {
    proxy?.$modal.msgSuccess(res.msg);
    if (res.code === 200) {
      visible.value = false;
      emit("ok");
    }
  });
}

defineExpose({
  show,
});
</script>
