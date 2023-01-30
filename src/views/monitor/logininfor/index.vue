<template>
   <div class="app-container">
      <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="68px">
         <el-form-item :label="$t('loginInfor.loginAddress')" prop="ipaddr">
            <el-input
               v-model="queryParams.ipaddr"
               :placeholder="$t('loginInfor.loginAddressPlaceholder')"
               clearable
               style="width: 240px;"
               @keyup.enter="handleQuery"
            />
         </el-form-item>
         <el-form-item :label="$t('user.name')" prop="userName">
            <el-input
               v-model="queryParams.userName"
               :placeholder="$t('user.UserPlaceholder')"
               clearable
               style="width: 240px;"
               @keyup.enter="handleQuery"
            />
         </el-form-item>
         <el-form-item :label="$t('user.status')" prop="status">
            <el-select
               v-model="queryParams.status"
               :placeholder="$t('loginInfor.loginStatus')"
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
         <el-form-item :label="$t('loginInfor.loginTime')" style="width: 308px">
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
               v-hasPermi="['system:logininfor:remove']"
            >{{ $t('button.delete') }}</el-button>
         </el-col>
         <el-col :span="1.5">
            <el-button
               type="danger"
               plain
               icon="Delete"
               @click="handleClean"
               v-hasPermi="['system:logininfor:remove']"
            >{{ $t('button.clean') }}</el-button>
         </el-col>
         <el-col :span="1.5">
            <el-button
               type="warning"
               plain
               icon="Download"
               @click="handleExport"
               v-hasPermi="['system:logininfor:export']"
            >{{ $t('button.export') }}</el-button>
         </el-col>
         <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
      </el-row>

      <el-table ref="logininforRef" v-loading="loading" :data="logininforList" @selection-change="handleSelectionChange" :default-sort="defaultSort" @sort-change="handleSortChange">
         <el-table-column type="selection" width="55" align="center" />
         <el-table-column :label="$t('loginInfor.accessId')" align="center" prop="infoId" />
         <el-table-column :label="$t('user.name')" align="center" prop="userName" :show-overflow-tooltip="true" sortable="custom" :sort-orders="['descending', 'ascending']" />
         <el-table-column :label="$t('loginInfor.address')" align="center" prop="ipaddr" :show-overflow-tooltip="true" />
         <el-table-column :label="$t('loginInfor.loginLocation')" align="center" prop="loginLocation" :show-overflow-tooltip="true" />
         <el-table-column :label="$t('loginInfor.os')" align="center" prop="os" :show-overflow-tooltip="true" />
         <el-table-column :label="$t('loginInfor.browser')" align="center" prop="browser" :show-overflow-tooltip="true" />
         <el-table-column :label="$t('loginInfor.loginStatus')" align="center" prop="status">
            <template #default="scope">
               <dict-tag :options="sys_common_status" :value="scope.row.status" />
            </template>
         </el-table-column>
         <el-table-column :label="$t('loginInfor.description')" align="center" prop="msg" />
         <el-table-column :label="$t('loginInfor.interviewTime')" align="center" prop="loginTime" sortable="custom" :sort-orders="['descending', 'ascending']" width="180">
            <template #default="scope">
               <span>{{ parseTime(scope.row.loginTime) }}</span>
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
   </div>
</template>

<script setup lang="ts" name="Logininfor">
import { list, delLogininfor, cleanLogininfor } from "@/api/monitor/logininfor";
import { ComponentInternalInstance, getCurrentInstance, ref } from "vue";
import type { ElForm, ElTable } from "element-plus";
import i18n from '@/lang/index';

const {t} = i18n.global;
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { sys_common_status } = proxy?.useDict("sys_common_status");

const logininforList = ref([]);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref([]);
const multiple = ref(true);
const total = ref(0);
const dateRange = ref([]);
const defaultSort = ref({ prop: "loginTime", order: "descending" });
const queryRef = ref<InstanceType<typeof ElForm>>();
const logininforRef = ref<InstanceType<typeof ElTable>>();
      
// 查询参数
const queryParams = ref({
  pageNum: 1,
  pageSize: 10,
  ipaddr: undefined,
  userName: undefined,
  status: undefined,
  orderByColumn: undefined,
  isAsc: undefined
});

/** 查询登录日志列表 */
function getList() {
  loading.value = true;
  list(proxy?.addDateRange(queryParams.value, dateRange.value)).then(response => {
    logininforList.value = response.rows;
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
  dateRange.value = [];
  queryRef.value?.resetFields();
//   proxy.resetForm("queryRef");
  logininforRef.value?.sort(defaultSort.value.prop, defaultSort.value.order);
//   proxy.$refs["logininforRef"].sort(defaultSort.value.prop, defaultSort.value.order);
  handleQuery();
}
/** 多选框选中数据 */
function handleSelectionChange(selection) {
  ids.value = selection.map(item => item.infoId);
  multiple.value = !selection.length;
}
/** 排序触发事件 */
function handleSortChange(column, prop, order) {
  queryParams.value.orderByColumn = column.prop;
  queryParams.value.isAsc = column.order;
  getList();
}
/** 删除按钮操作 */
function handleDelete(row) {
  const infoIds = row.infoId || ids.value;
  proxy?.$modal.confirm(t('loginInfor.confirmLogDelete') + infoIds + t('role.confirmDelete2')).then(function () {
    return delLogininfor(infoIds);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess(t('user.succesDeleted'));
  }).catch(() => {});
}
/** 清空按钮操作 */
function handleClean() {
  proxy?.$modal.confirm(t('loginInfor.confirmClean')).then(function () {
    return cleanLogininfor();
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess(t('Job.emptySuccess'));
  }).catch(() => {});
}
/** 导出按钮操作 */
function handleExport() {
  proxy?.$download("monitor/logininfor/export", {
    ...queryParams.value,
  }, `config_${new Date().getTime()}.xlsx`);
}

getList();
</script>
