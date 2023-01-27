<template>
   <div class="app-container">
      <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch">
         <el-form-item :label="$t('Job.name')" prop="jobName">
            <el-input
               v-model="queryParams.jobName"
               :placeholder="$t('Job.namePlaceholder')"
               clearable
               style="width: 200px"
               @keyup.enter="handleQuery"
            />
         </el-form-item>
         <el-form-item :label="$t('Job.groupName')" prop="jobGroup">
            <el-select v-model="queryParams.jobGroup" :placeholder="$t('Job.groupNamePlaceholder')" clearable style="width: 200px">
               <el-option
                  v-for="dict in sys_job_group"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
               />
            </el-select>
         </el-form-item>
         <el-form-item :label="$t('Job.status')" prop="status">
            <el-select v-model="queryParams.status" :placeholder="$t('Job.statusPlaceholder')" clearable style="width: 200px">
               <el-option
                  v-for="dict in sys_job_status"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
               />
            </el-select>
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
               icon="Plus"
               @click="handleAdd"
               v-hasPermi="['monitor:job:add']"
            >{{ $t('button.add') }}</el-button>
         </el-col>
         <el-col :span="1.5">
            <el-button
               type="success"
               plain
               icon="Edit"
               :disabled="single"
               @click="handleUpdate"
               v-hasPermi="['monitor:job:edit']"
            >{{ $t('button.edit') }}</el-button>
         </el-col>
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
               type="warning"
               plain
               icon="Download"
               @click="handleExport"
               v-hasPermi="['monitor:job:export']"
            >{{ $t('button.export') }}</el-button>
         </el-col>
         <el-col :span="1.5">
            <el-button
               type="info"
               plain
               icon="Operation"
               @click="handleJobLog"
               v-hasPermi="['monitor:job:query']"
            >{{ $t('button.log') }}</el-button>
         </el-col>
         <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
      </el-row>

      <el-table v-loading="loading" :data="jobList" @selection-change="handleSelectionChange">
         <el-table-column type="selection" width="55" align="center" />
         <el-table-column :label="$t('Job.id')" width="100" align="center" prop="jobId" />
         <el-table-column :label="$t('Job.name')" align="center" prop="jobName" :show-overflow-tooltip="true" />
         <el-table-column :label="$t('Job.groupName')" align="center" prop="jobGroup">
            <template #default="scope">
               <dict-tag :options="sys_job_group" :value="scope.row.jobGroup" />
            </template>
         </el-table-column>
         <el-table-column :label="$t('Job.callTarget')" align="center" prop="invokeTarget" :show-overflow-tooltip="true" />
         <el-table-column :label="$t('Job.cron')" align="center" prop="cronExpression" :show-overflow-tooltip="true" />
         <el-table-column :label="$t('user.status')" align="center">
            <template #default="scope">
               <el-switch
                  v-model="scope.row.status"
                  active-value="0"
                  inactive-value="1"
                  @change="handleStatusChange(scope.row)"
               ></el-switch>
            </template>
         </el-table-column>
         <el-table-column :label="$t('user.operate')" align="center" width="200" class-name="small-padding fixed-width">
            <template #default="scope">
               <el-tooltip :content="$t('button.edit')" placement="top">
                  <el-button
                     type="primary"
                     icon="Edit"
                     @click="handleUpdate(scope.row)"
                     v-hasPermi="['monitor:job:edit']"
                     link
                  ></el-button>
               </el-tooltip>
               <el-tooltip :content="$t('button.delete')" placement="top">
                  <el-button
                     type="primary"
                     icon="Delete"
                     @click="handleDelete(scope.row)"
                     v-hasPermi="['monitor:job:remove']"
                     link
                  ></el-button>
               </el-tooltip>
               <el-tooltip :content="$t('Job.execute')" placement="top">
                  <el-button
                     type="primary"
                     icon="CaretRight"
                     @click="handleRun(scope.row)"
                     v-hasPermi="['monitor:job:changeStatus']"
                     link
                  ></el-button>
               </el-tooltip>
               <el-tooltip :content="$t('Job.details')" placement="top">
                  <el-button
                     type="primary"
                     icon="View"
                     @click="handleView(scope.row)"
                     v-hasPermi="['monitor:job:query']"
                     link
                  ></el-button>
               </el-tooltip>
               <el-tooltip :content="$t('Job.schedule')" placement="top">
                  <el-button
                     type="primary"
                     icon="Operation"
                     @click="handleJobLog(scope.row)"
                     v-hasPermi="['monitor:job:query']"
                     link
                  ></el-button>
               </el-tooltip>
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

      <!-- 添加或修改定时任务对话框 -->
      <el-dialog :title="title" v-model="open" width="800px" append-to-body>
         <el-form ref="jobRef" :model="form" :rules="rules" label-width="120px">
            <el-row>
               <el-col :span="12">
                  <el-form-item :label="$t('Job.name')" prop="jobName">
                     <el-input v-model="form.jobName" :placeholder="$t('Job.namePlaceholder')" />
                  </el-form-item>
               </el-col>
               <el-col :span="12">
                  <el-form-item :label="$t('Job.group')" prop="jobGroup">
                     <el-select v-model="form.jobGroup" :placeholder="$t('user.choosePlaceholder')">
                        <el-option
                           v-for="dict in sys_job_group"
                           :key="dict.value"
                           :label="dict.label"
                           :value="dict.value"
                        ></el-option>
                     </el-select>
                  </el-form-item>
               </el-col>
               <el-col :span="24">
                  <el-form-item prop="invokeTarget">
                     <template #label>
                        <span>
                           {{ $t('Job.callMethod') }}
                           <el-tooltip placement="top">
                              <template #content>
                                 <div>
                                    {{ $t('Job.beanCall') }}
                                    <br />{{ $t('Job.classCall') }}
                                    <br />{{ $t('Job.paramDesc') }}
                                 </div>
                              </template>
                              <el-icon><question-filled /></el-icon>
                           </el-tooltip>
                        </span>
                     </template>
                     <el-input v-model="form.invokeTarget" :placeholder="$t('Job.callTargetPlaceholder')" />
                  </el-form-item>
               </el-col>
               <el-col :span="24">
                  <el-form-item :label="$t('Job.cronExpression')" prop="cronExpression">
                     <el-input v-model="form.cronExpression" :placeholder="$t('Job.cronExpressionPlaceholder')">
                        <template #append>
                           <el-button type="primary" @click="handleShowCron">
                              {{ $t('Job.generateExpression') }}
                              <i class="el-icon-time el-icon--right"></i>
                           </el-button>
                        </template>
                     </el-input>
                  </el-form-item>
               </el-col>
               <el-col :span="24">
                  <el-form-item :label="$t('Job.executionStrategy')" prop="misfirePolicy">
                     <el-radio-group v-model="form.misfirePolicy">
                        <el-radio-button label="1">{{ $t('Job.executeImmediately') }}</el-radio-button>
                        <el-radio-button label="2">{{ $t('Job.executeOnce') }}</el-radio-button>
                        <el-radio-button label="3">{{ $t('Job.abandonExecution') }}</el-radio-button>
                     </el-radio-group>
                  </el-form-item>
               </el-col>
               <el-col :span="12">
                  <el-form-item :label="$t('Job.concurrent')" prop="concurrent">
                     <el-radio-group v-model="form.concurrent">
                        <el-radio-button label="0">{{ $t('Job.allow') }}</el-radio-button>
                        <el-radio-button label="1">{{ $t('Job.prohibit') }}</el-radio-button>
                     </el-radio-group>
                  </el-form-item>
               </el-col>
               <el-col :span="12">
                  <el-form-item label="状态">
                     <el-radio-group v-model="form.status">
                        <el-radio
                           v-for="dict in sys_job_status"
                           :key="dict.value"
                           :label="dict.value"
                        >{{ dict.label }}</el-radio>
                     </el-radio-group>
                  </el-form-item>
               </el-col>
            </el-row>
         </el-form>
         <template #footer>
            <div class="dialog-footer">
               <el-button type="primary" @click="submitForm">{{ $t('button.submit') }}</el-button>
               <el-button @click="cancel">{{ $t('button.cancel') }}</el-button>
            </div>
         </template>
      </el-dialog>
 
      <!-- 任务日志详细 -->
      <el-dialog :title="$t('Job.details')" v-model="openView" width="700px" append-to-body>
         <el-form :model="form" label-width="120px">
            <el-row>
               <el-col :span="12">
                  <el-form-item :label="$t('Job.details') + '：'">{{ form.jobId }}</el-form-item>
                  <el-form-item :label="$t('Job.name') + '：'">{{ form.jobName }}</el-form-item>
               </el-col>
               <el-col :span="12">
                  <el-form-item :label="$t('Job.group') + '：'">{{ jobGroupFormat(form) }}</el-form-item>
                  <el-form-item :label="$t('user.creationtime') + '：'">{{ form.createTime }}</el-form-item>
               </el-col>
               <el-col :span="12">
                  <el-form-item :label="$t('Job.group') + '：'">{{ form.cronExpression }}</el-form-item>
               </el-col>
               <el-col :span="12">
                  <el-form-item :label="$t('Job.nextExec')">{{ parseTime(form.nextValidTime) }}</el-form-item>
               </el-col>
               <el-col :span="24">
                  <el-form-item :label="$t('Job.targetMethod')">{{ form.invokeTarget }}</el-form-item>
               </el-col>
               <el-col :span="12">
                  <el-form-item :label="$t('Job.status') + '：'">
                     <div v-if="form.status == 0">{{ $t('Job.normal') }}</div>
                     <div v-else-if="form.status == 1">{{ $t('Job.fail') }}</div>
                  </el-form-item>
               </el-col>
               <el-col :span="12">
                  <el-form-item :label="$t('Job.concurrent') + '：'">
                     <div v-if="form.concurrent == 0">{{ $t('Job.normal') }}</div>
                     <div v-else-if="form.concurrent == 1">{{ $t('Job.fail') }}</div>
                  </el-form-item>
               </el-col>
               <el-col :span="12">
                  <el-form-item label="执行策略：">
                     <div v-if="form.misfirePolicy == 0">{{ $t('Job.defaultPolicy') }}</div>
                     <div v-else-if="form.misfirePolicy == 1">{{ $t('Job.executeImmediately') }}</div>
                     <div v-else-if="form.misfirePolicy == 2">{{ $t('Job.executeOnce') }}</div>
                     <div v-else-if="form.misfirePolicy == 3">{{ $t('Job.abandonExecution') }}</div>
                  </el-form-item>
               </el-col>
            </el-row>
         </el-form>
         <template #footer>
            <div class="dialog-footer">
               <el-button @click="openView = false">{{ $t('tagsView.close') }}</el-button>
            </div>
         </template>
      </el-dialog>
   </div>
</template>

<script lang="ts" setup name="Job">
import { listJob, getJob, delJob, addJob, updateJob, runJob, changeJobStatus } from "@/api/monitor/job";
import type { QueryParams, AddParams } from "@/api/monitor/job";
import { ComponentInternalInstance, getCurrentInstance, reactive, ref, toRefs, Ref } from "vue";
import { useRouter } from "vue-router";
import i18n from '@/lang/index';
import type { ElForm } from "element-plus";

const {t} = i18n.global;
const router = useRouter();
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { sys_job_group, sys_job_status } = proxy?.useDict("sys_job_group", "sys_job_status");

const jobList = ref([]);
const open = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const title = ref("");
const openView = ref(false);
const openCron = ref(false);
const expression: Ref<string | null | undefined> = ref("");
const queryRef = ref<InstanceType<typeof ElForm>>();
const jobRef = ref<InstanceType<typeof ElForm>>();

interface Data {
   form: AddParams
   queryParams: QueryParams 
   rules:{
      jobName: [{
         required: boolean
         message: string
         trigger: string
      }];
      invokeTarget: [{
         required: boolean
         message: string
         trigger: string  
      }];
      cronExpression: [{
         required: boolean
         message: string
         trigger: string  
      }];
   };
}


const data: Data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    jobName: undefined,
    jobGroup: undefined,
    status: undefined
  },
  rules: {
    jobName: [{ required: true, message: t('Job.rules1'), trigger: "blur" }],
    invokeTarget: [{ required: true, message: t('Job.rules2'), trigger: "blur" }],
    cronExpression: [{ required: true, message: t('Job.rules3'), trigger: "blur" }]
  }
});

const { queryParams, form, rules } = toRefs(data);


/** 查询定时任务列表 */
function getList() {
  loading.value = true;
  listJob(queryParams.value).then(response => {
    jobList.value = response.rows;
    total.value = response.total;
    loading.value = false;
  });
}
/** 任务组名字典翻译 */
function jobGroupFormat(row, column?: any) {
  return proxy?.selectDictLabel(sys_job_group.value, row.jobGroup);
}
/** 取消按钮 */
function cancel() {
  open.value = false;
  reset();
}
/** 表单重置 */
function reset() {
  form.value = {
    jobId: undefined,
    jobName: undefined,
    jobGroup: undefined,
    invokeTarget: undefined,
    cronExpression: undefined,
    misfirePolicy: 1,
    concurrent: 1,
    status: "0"
  };
  jobRef.value?.resetFields();
//   proxy.resetForm("jobRef");
}
/** 搜索按钮操作 */
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}
/** 重置按钮操作 */
function resetQuery() {
  queryRef.value?.resetFields();
//   proxy.resetForm("queryRef");
  handleQuery();
}
// 多选框选中数据
function handleSelectionChange(selection) {
  ids.value = selection.map(item => item.jobId);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}
// 更多操作触发
// function handleCommand(command, row) {
//   switch (command) {
//     case "handleRun":
//       handleRun(row);
//       break;
//     case "handleView":
//       handleView(row);
//       break;
//     case "handleJobLog":
//       handleJobLog(row);
//       break;
//     default:
//       break;
//   }
// }

// 任务状态修改
function handleStatusChange(row) {
  let text = row.status === "0" ? t('button.enable') : t('button.disable');
  proxy?.$modal.confirm(t('user.handleStatus1') + text + '""' + row.jobName + t('Job.handleStatus')).then(function () {
    return changeJobStatus(row.jobId, row.status);
  }).then(() => {
    proxy.$modal.msgSuccess(text + t('button.success'));
  }).catch(function () {
    row.status = row.status === "0" ? "1" : "0";
  });
}
/* 立即执行一次 */
function handleRun(row) {
  proxy?.$modal.confirm(t('Job.confirm1') + row.jobName + t('Job.confirm2')).then(function () {
    return runJob(row.jobId, row.jobGroup);
  }).then(() => {
    proxy.$modal.msgSuccess(t('Job.executionSuccess'));})
  .catch(() => {});
}
/** 任务详细信息 */
function handleView(row) {
  getJob(row.jobId).then(response => {
    form.value = response.data;
    openView.value = true;
  });
}
/** cron表达式按钮操作 */
function handleShowCron() {
  expression.value = form.value.cronExpression;
  openCron.value = true;
}
/** 确定后回传值 */
// function crontabFill(value) {
//   form.value.cronExpression = value;
// }
/** 任务日志列表查询 */
function handleJobLog(row) {
  const jobId = row.jobId || 0;
  router.push('/monitor/job-log/index/' + jobId)
}
/** 新增按钮操作 */
function handleAdd() {
  reset();
  open.value = true;
  title.value = t('Job.addTask');
}
/** 修改按钮操作 */
function handleUpdate(row) {
  reset();
  const jobId = row.jobId || ids.value;
  getJob(jobId).then(response => {
    form.value = response.data;
    open.value = true;
    title.value =  t('Job.modifyTask');
  });
}
/** 提交按钮 */
function submitForm() {
//   proxy.$refs["jobRef"].validate(valid => {
   jobRef.value?.validate(valid => {
    if (valid) {
      if (form.value.jobId != undefined) {
        updateJob(form.value).then(response => {
          proxy?.$modal.msgSuccess(t('button.successModify'));
          open.value = false;
          getList();
        });
      } else {
        addJob(form.value).then(response => {
          proxy?.$modal.msgSuccess(t('button.AddSuccess'));
          open.value = false;
          getList();
        });
      }
    }
  });
}
/** 删除按钮操作 */
function handleDelete(row) {
  const jobIds = row.jobId || ids.value;
  proxy?.$modal.confirm(t('Job.confirmDelete') + jobIds + t('role.confirmDelete2')).then(function () {
    return delJob(jobIds);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess(t('Job.succesDeleted'));
  }).catch(() => {});
}
/** 导出按钮操作 */
function handleExport() {
  proxy?.$download("monitor/job/export", {
    ...queryParams.value,
  }, `job_${new Date().getTime()}.xlsx`);
}

getList();
</script>
