<template>
   <div class="app-container">
      <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="68px">
         <el-form-item :label="$t('operLog.systemModule')" prop="title">
            <el-input
               v-model="queryParams.title"
               :placeholder="$t('operLog.systemModulePlaceholder')"
               clearable
               style="width: 240px;"
               @keyup.enter="handleQuery"
            />
         </el-form-item>
         <el-form-item :label="$t('notice.author')" prop="operName">
            <el-input
               v-model="queryParams.operName"
               :placeholder="$t('notice.authorPlaceholder')"
               clearable
               style="width: 240px;"
               @keyup.enter="handleQuery"
            />
         </el-form-item>
         <el-form-item :label="$t('notice.type')" prop="businessType">
            <el-select
               v-model="queryParams.businessType"
               :placeholder="$t('operLog.operType')"
               clearable
               style="width: 240px"
            >
               <el-option
                  v-for="dict in sys_oper_type"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
               />
            </el-select>
         </el-form-item>
         <el-form-item :label="$t('user.status')" prop="status">
            <el-select
               v-model="queryParams.status"
               :placeholder="$t('operLog.operStatus')"
               clearable
               style="width: 240px"
            >
               <el-option
                  v-for="dict in sys_common_status"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
               />
            </el-select>
         </el-form-item>
         <el-form-item :label="$t('operLog.operTime')" style="width: 308px">
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

      <el-table ref="operlogRef" v-loading="loading" :data="operlogList" @selection-change="handleSelectionChange" :default-sort="defaultSort" @sort-change="handleSortChange">
         <el-table-column type="selection" width="55" align="center" />
         <el-table-column :label="$t('Job.LogId')" align="center" prop="operId" />
         <el-table-column :label="$t('operLog.systemModule')" align="center" prop="title" />
         <el-table-column :label="$t('operLog.operType')" align="center" prop="businessType">
            <template #default="scope">
               <dict-tag :options="sys_oper_type" :value="scope.row.businessType" />
            </template>
         </el-table-column>
         <el-table-column :label="$t('operLog.reqMethod')" align="center" prop="requestMethod" />
         <el-table-column :label="$t('notice.author')" align="center" prop="operName" :show-overflow-tooltip="true" sortable="custom" :sort-orders="['descending', 'ascending']" width="100" />
         <el-table-column :label="$t('online.host')" align="center" prop="operIp" width="130" :show-overflow-tooltip="true" />
         <el-table-column :label="$t('operLog.operStatus')" align="center" prop="status">
            <template #default="scope">
               <dict-tag :options="sys_common_status" :value="scope.row.status" />
            </template>
         </el-table-column>
         <el-table-column :label="$t('operLog.operDate')" align="center" prop="operTime" sortable="custom" :sort-orders="['descending', 'ascending']" width="180">
            <template #default="scope">
               <span>{{ parseTime(scope.row.operTime) }}</span>
            </template>
         </el-table-column>
         <el-table-column :label="$t('user.operate')" align="center" class-name="small-padding fixed-width">
            <template #default="scope">
               <el-button
                  type="primary"
                  icon="View"
                  @click="handleView(scope.row)"
                  v-hasPermi="['system:operlog:query']"
                  link
               >{{ $t('Job.detailed') }}</el-button>
            </template>
         </el-table-column>
      </el-table>

      <pagination
         v-show="total > 0"
         :total="total"
         v-model:page="queryParams.pageNum"
         v-model:limit="queryParams.pageSize"
         @pagination="getList"
      />

      <!-- 操作日志详细 -->
      <el-dialog :title="$t('operLog.detailedOperLog')" v-model="open" width="700px" append-to-body>
         <el-form :model="form" label-width="100px">
            <el-row>
               <el-col :span="12">
                  <el-form-item :label="$t('operLog.operationModule')">{{ form.title }} / {{ typeFormat(form) }}</el-form-item>
                  <el-form-item
                    :label="$t('operLog.loginInfo')"
                  >{{ form.operName }} / {{ form.operIp }} / {{ form.operLocation }}</el-form-item>
               </el-col>
               <el-col :span="12">
                  <el-form-item :label="$t('operLog.reqAddress')">{{ form.operUrl }}</el-form-item>
                  <el-form-item :label="$t('operLog.reqMethod') + '：'">{{ form.requestMethod }}</el-form-item>
               </el-col>
               <el-col :span="24">
                  <el-form-item :label="$t('operLog.operMethod')">{{ form.method }}</el-form-item>
               </el-col>
               <el-col :span="24">
                  <el-form-item :label="$t('operLog.reqParams')">{{ form.operParam }}</el-form-item>
               </el-col>
               <el-col :span="24">
                  <el-form-item :label="$t('operLog.returnParams')">{{ form.jsonResult }}</el-form-item>
               </el-col>
               <el-col :span="12">
                  <el-form-item :label="$t('operLog.operStatus') + '：'">
                     <div v-if="form.status === 0">{{ $t('Job.normal') }}</div>
                     <div v-else-if="form.status === 1">{{ $t('Job.fail') }}</div>
                  </el-form-item>
               </el-col>
               <el-col :span="12">
                  <el-form-item :label="$t('operLog.operTime') + '：'">{{ parseTime(form.operTime) }}</el-form-item>
               </el-col>
               <el-col :span="24">
                  <el-form-item :label="$t('Job.ExceptionInfo') + '：'" v-if="form.status === 1">{{ form.errorMsg }}</el-form-item>
               </el-col>
            </el-row>
         </el-form>
         <template #footer>
            <div class="dialog-footer">
               <el-button @click="open = false">{{ $t('tagsView.close') }}</el-button>
            </div>
         </template>
      </el-dialog>
   </div>
</template>

<script lang="ts" setup name="Operlog">
import { list, delOperlog, cleanOperlog } from "@/api/monitor/operlog";
import type { QueryParams, AddParams } from "@/api/monitor/operlog";
import { ComponentInternalInstance, getCurrentInstance, ref, reactive, toRefs } from "vue";
import type { ElForm, ElTable } from "element-plus";
import i18n from '@/lang/index';

const {t} = i18n.global;
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { sys_oper_type, sys_common_status } = proxy?.useDict("sys_oper_type","sys_common_status");

const operlogList = ref([]);
const open = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref([]);
// const single = ref(true);
const multiple = ref(true);
const total = ref(0);
// const title = ref("");
const dateRange = ref([]);
const defaultSort = ref({ prop: "operTime", order: "descending" });
const queryRef = ref<InstanceType<typeof ElForm>>();
const operlogRef = ref<InstanceType<typeof ElTable>>();

interface Data {
   form: AddParams
   queryParams: QueryParams 
}

const data: Data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    title: undefined,
    operName: undefined,
    businessType: undefined,
    status: undefined
  }
});

const { queryParams, form } = toRefs(data);

/** 查询登录日志 */
function getList() {
  loading.value = true;
  list(proxy?.addDateRange(queryParams.value, dateRange.value)).then(response => {
    operlogList.value = response.rows;
    total.value = response.total;
    loading.value = false;
  });
}
/** 操作日志类型字典翻译 */
function typeFormat(row, column ?: any) {
  return proxy?.selectDictLabel(sys_oper_type.value, row.businessType);
}
/** 搜索按钮操作 */
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}
/** 重置按钮操作 */
function resetQuery() {
  dateRange.value = [];
  queryRef.value?.resetFields();
//   proxy.resetForm("queryRef");
  operlogRef.value?.sort(defaultSort.value.prop, defaultSort.value.order);
//   proxy.$refs["operlogRef"].sort(defaultSort.value.prop, defaultSort.value.order);
  handleQuery();
}
/** 多选框选中数据 */
function handleSelectionChange(selection) {
  ids.value = selection.map(item => item.operId);
  multiple.value = !selection.length;
}
/** 排序触发事件 */
function handleSortChange(column, prop, order) {
  queryParams.value.orderByColumn = column.prop;
  queryParams.value.isAsc = column.order;
  getList();
}
/** 详细按钮操作 */
function handleView(row) {
  open.value = true;
  form.value = row;
}
/** 删除按钮操作 */
function handleDelete(row) {
  const operIds = row.operId || ids.value;
  proxy?.$modal.confirm(t('operLog.confirmDelete') + operIds + t('role.confirmDelete2')).then(function () {
    return delOperlog(operIds);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess(t('user.succesDeleted'));
  }).catch(() => {});
}
/** 清空按钮操作 */
function handleClean() {
  proxy?.$modal.confirm(t('operLog.confirmClean')).then(function () {
    return cleanOperlog();
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess(t('Job.emptySuccess'));
  }).catch(() => {});
}
/** 导出按钮操作 */
function handleExport() {
  proxy?.$download("monitor/operlog/export",{
    ...queryParams.value,
  }, `config_${new Date().getTime()}.xlsx`);
}

getList();
</script>
