<template>
   <div class="app-container">
      <el-form :model="queryParams" ref="queryRef" :inline="true">
         <el-form-item :label="$t('loginInfor.loginAddress')" prop="ipaddr">
            <el-input
               v-model="queryParams.ipaddr"
               :placeholder="$t('loginInfor.loginAddressPlaceholder')"
               clearable
               style="width: 200px"
               @keyup.enter="handleQuery"
            />
         </el-form-item>
         <el-form-item :label="$t('user.name')" prop="userName">
            <el-input
               v-model="queryParams.userName"
               :placeholder="$t('user.UserPlaceholder')"
               clearable
               style="width: 200px"
               @keyup.enter="handleQuery"
            />
         </el-form-item>
         <el-form-item>
            <el-button type="primary" icon="Search" @click="handleQuery">{{ $t('button.search') }}</el-button>
            <el-button icon="Refresh" @click="resetQuery">{{ $t('button.reset') }}</el-button>
         </el-form-item>
      </el-form>
      <el-table
         v-loading="loading"
         :data="onlineList.slice((pageNum - 1) * pageSize, pageNum * pageSize)"
         style="width: 100%;"
      >
         <el-table-column :label="$t('user.name')" width="50" type="index" align="center">
            <template #default="scope">
               <span>{{ (pageNum - 1) * pageSize + scope.$index + 1 }}</span>
            </template>
         </el-table-column>
         <el-table-column :label="$t('online.sessionNumber')" align="center" prop="tokenId" :show-overflow-tooltip="true" />
         <el-table-column :label="$t('online.loginName')" align="center" prop="userName" :show-overflow-tooltip="true" />
         <el-table-column :label="$t('user.departementName')" align="center" prop="deptName" :show-overflow-tooltip="true" />
         <el-table-column :label="$t('online.host')" align="center" prop="ipaddr" :show-overflow-tooltip="true" />
         <el-table-column :label="$t('loginInfor.loginLocation')" align="center" prop="loginLocation" :show-overflow-tooltip="true" />
         <el-table-column :label="$t('loginInfor.os')" align="center" prop="os" :show-overflow-tooltip="true" />
         <el-table-column :label="$t('loginInfor.browser')" align="center" prop="browser" :show-overflow-tooltip="true" />
         <el-table-column :label="$t('loginInfor.loginTime')" align="center" prop="loginTime" width="180">
            <template #default="scope">
               <span>{{ parseTime(scope.row.loginTime) }}</span>
            </template>
         </el-table-column>
         <el-table-column :label="$t('user.operate')" align="center" class-name="small-padding fixed-width">
            <template #default="scope">
               <el-button
                  type="primary"
                  icon="Delete"
                  @click="handleForceLogout(scope.row)"
                  link
                  v-hasPermi="['monitor:online:forceLogout']"
               >{{ $t('online.forceLogout') }}</el-button>
            </template>
         </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" v-model:page="pageNum" v-model:limit="pageSize" />
   </div>
</template>

<script setup lang="ts" name="Online">
import { forceLogout, list as initData } from "@/api/monitor/online";
import { ComponentInternalInstance, getCurrentInstance, ref } from "vue";
import type { ElForm } from "element-plus";
import i18n from '@/lang/index';

const {t} = i18n.global;  
const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const onlineList = ref([]);
const loading = ref(true);
const total = ref(0);
const pageNum = ref(1);
const pageSize = ref(10);
const queryRef = ref<InstanceType<typeof ElForm>>();
const queryParams = ref({
  ipaddr: undefined,
  userName: undefined
});

/** 查询登录日志列表 */
function getList() {
  loading.value = true;
  initData(queryParams.value).then(response => {
    onlineList.value = response.rows;
    total.value = response.total;
    loading.value = false;
  });
}
/** 搜索按钮操作 */
function handleQuery() {
  pageNum.value = 1;
  getList();
}
/** 重置按钮操作 */
function resetQuery() {
  queryRef.value?.resetFields();
//   proxy.resetForm("queryRef");
  handleQuery();
}
/** 强退按钮操作 */
function handleForceLogout(row) {
    proxy?.$modal.confirm(t('online.confirm1') + row.userName + t('online.confirm2')).then(function () {
  return forceLogout(row.tokenId);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess(t('user.succesDeleted'));
  }).catch(() => {});
}

getList();
</script>
