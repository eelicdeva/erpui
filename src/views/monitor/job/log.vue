<template>
   <div class="app-container">
      <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="68px">
         <el-form-item :label="$t('Job.name')"  prop="jobName">
            <el-input
               v-model="queryParams.jobName"
               :placeholder="$t('Job.namePlaceholder')"
               clearable
               style="width: 240px"
               @keyup.enter="handleQuery"
            />
         </el-form-item>
         <el-form-item :label="$t('Job.groupName')" prop="jobGroup">
            <el-select
               v-model="queryParams.jobGroup"
               :placeholder="$t('Job.groupNamePlaceholder')"
               clearable
               style="width: 240px"
            >
               <el-option
                  v-for="dict in sys_job_group"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
               />
            </el-select>
         </el-form-item>
         <el-form-item :label="$t('Job.ExecutionStatus')" prop="status">
            <el-select
               v-model="queryParams.status"
               :placeholder="$t('Job.ExecutionStatusPlaceholder')"
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
         <el-form-item :label="$t('Job.ExecutionTime')" style="width: 308px">
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
               v-hasPermi="['monitor:job:remove']"
            >{{ $t('button.delete') }}</el-button>
         </el-col>
         <el-col :span="1.5">
            <el-button
               type="danger"
               plain
               icon="Delete"
               @click="handleClean"
               v-hasPermi="['monitor:job:remove']"
            >{{ $t('button.clean') }}</el-button>
         </el-col>
         <el-col :span="1.5">
            <el-button
               type="warning"
               plain
               icon="Download"
               @click="handleExport"
               v-hasPermi="['monitor:job:export']"
            >{{ $t('button.export') }}</el-button>
         </el-col>
         <el-col :span="1.5">
            <el-button 
               type="warning" 
               plain 
               icon="Close"
               @click="handleClose"
            >{{ $t('tagsView.close') }}</el-button>
         </el-col>
         <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
      </el-row>

      <el-table v-loading="loading" :data="jobLogList" @selection-change="handleSelectionChange">
         <el-table-column type="selection" width="55" align="center" />
         <el-table-column :label="$t('Job.LogId')" width="80" align="center" prop="jobLogId" />
         <el-table-column :label="$t('Job.name')" align="center" prop="jobName" :show-overflow-tooltip="true" />
         <el-table-column :label="$t('Job.groupName')" align="center" prop="jobGroup" :show-overflow-tooltip="true">
            <template #default="scope">
               <dict-tag :options="sys_job_group" :value="scope.row.jobGroup" />
            </template>
         </el-table-column>
         <el-table-column :label="$t('Job.callTarget')" align="center" prop="invokeTarget" :show-overflow-tooltip="true" />
         <el-table-column :label="$t('Job.LogInfo')" align="center" prop="jobMessage" :show-overflow-tooltip="true" />
         <el-table-column :label="$t('Job.ExecutionStatus')" align="center" prop="status">
            <template #default="scope">
               <dict-tag :options="sys_common_status" :value="scope.row.status" />
            </template>
         </el-table-column>
         <el-table-column :label="$t('Job.ExecutionTime')" align="center" prop="createTime" width="180">
            <template #default="scope">
               <span>{{ parseTime(scope.row.createTime) }}</span>
            </template>
         </el-table-column>
         <el-table-column :label="$t('user.operate')" align="center" class-name="small-padding fixed-width">
            <template #default="scope">
               <el-button
                  type="primary"
                  icon="View"
                  @click="handleView(scope.row)"
                  v-hasPermi="['monitor:job:query']"
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

      <!-- 调度日志详细 -->
      <el-dialog :title="$t('Job.logDetails')" v-model="open" width="700px" append-to-body>
         <el-form :model="form" label-width="100px">
            <el-row>
               <el-col :span="12">
                  <el-form-item :label="$t('Job.logNumber')">{{ form.jobLogId }}</el-form-item>
                  <el-form-item :label="$t('Job.name') + '：'">{{ form.jobName }}</el-form-item>
               </el-col>
               <el-col :span="12">
                  <el-form-item :label="$t('Job.group') + '：'">{{ form.jobGroup }}</el-form-item>
                  <el-form-item :label="$t('Job.ExecutionTime') + '：'">{{ form.createTime }}</el-form-item>
               </el-col>
               <el-col :span="24">
                  <el-form-item :label="$t('Job.callMethod') + '：'">{{ form.invokeTarget }}</el-form-item>
               </el-col>
               <el-col :span="24">
                  <el-form-item :label="$t('Job.LogInfo') + '：'">{{ form.jobMessage }}</el-form-item>
               </el-col>
               <el-col :span="24">
                  <el-form-item :label="$t('Job.ExecutionStatus') + '：'">
                     <div v-if="form.status == 0">{{ $t('Job.normal') }}</div>
                     <div v-else-if="form.status == 1">{{ $t('Job.fail') }}</div>
                  </el-form-item>
               </el-col>
               <el-col :span="24">
                  <el-form-item :label="$t('Job.ExceptionInfo')" v-if="form.status == 1">{{ form.exceptionInfo }}</el-form-item>
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

<script lang="ts" setup name="JobLog">
import { getJob } from "@/api/monitor/job";
import { listJobLog, delJobLog, cleanJobLog } from "@/api/monitor/jobLog";
import type { QueryParams } from "@/api/monitor/jobLog";
import { ComponentInternalInstance, getCurrentInstance, reactive, ref, toRefs, Ref } from "vue";
import { useRoute } from "vue-router";
import type { ElForm } from "element-plus";
import i18n from '@/lang/index';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { sys_common_status, sys_job_group } = proxy?.useDict("sys_common_status", "sys_job_group");
const {t} = i18n.global;

const jobLogList = ref([]);
const open = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids: Ref<number[]>  = ref([]);
const multiple = ref(true);
const total = ref(0);
const dateRange = ref([]);
const route = useRoute();
const queryRef = ref<InstanceType<typeof ElForm>>();

interface Row {
   searchValue: string | null
   createBy: string | null
   createTime: string
   updateBy: string | null
   updateTime: string | null
   remark: string | null
   status: number
   exceptionInfo: string | null
   invokeTarget: string | null
   jobGroup: string | null
   jobLogId: number | null
   jobMessage: string | null
   jobName: string | null
   params: QueryParams
   startTime: string | null
   stopTime: string | null
}



interface Data {
   form: any;
   queryParams: QueryParams;  
}

const data: Data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    dictName: undefined,
    dictType: undefined,
    status: undefined
  }
});

const { queryParams, form } = toRefs(data);

/** 查询调度日志列表 */
function getList() {
  loading.value = true;
  listJobLog(proxy?.addDateRange(queryParams.value, dateRange.value)).then(response => {
    jobLogList.value = response.rows;
    total.value = response.total;
    loading.value = false;
  });
}
// 返回按钮
function handleClose() {
  const obj = { path: "/monitor/job" };
  proxy?.$tab.closeOpenPage(obj.path);
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
  handleQuery();
}
// 多选框选中数据
function handleSelectionChange(selection) {
  ids.value = selection.map(item => item.jobLogId);
  multiple.value = !selection.length;
}
/** 详细按钮操作 */
function handleView(row: Row) {
  open.value = true;
  form.value = row;
}
/** 删除按钮操作 */
function handleDelete(row: Row) {
  proxy?.$modal.confirm(t('Job.confirmLogDelete') + ids.value + t('role.confirmDelete2')).then(function () {
    return delJobLog(ids.value);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess(t('user.succesDeleted'));
  }).catch(() => {});
}
/** 清空按钮操作 */
function handleClean() {
  proxy?.$modal.confirm(t('Job.confirmClearLog')).then(function () {
    return cleanJobLog();
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess(t('Job.emptySuccess'));
  }).catch(() => {});
}
/** 导出按钮操作 */
function handleExport() {
  proxy?.$download("monitor/jobLog/export", {
    ...queryParams.value,
  }, `job_log_${new Date().getTime()}.xlsx`);
}

(() => {
  const jobId = route.params && route.params.jobId;
  if (jobId !== undefined && jobId != "0") {
    getJob(jobId).then(response => {
      queryParams.value.jobName = response.data.jobName;
      queryParams.value.jobGroup = response.data.jobGroup;
      getList();
    });
  } else {
    getList();
  }
})();

getList();
</script>
