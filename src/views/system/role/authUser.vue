
<template>
   <div class="app-container">
      <el-form :model="queryParams" ref="queryRef" v-show="showSearch" :inline="true">
         <el-form-item :label="$t('user.name')" prop="userName">
            <el-input
               v-model="queryParams.userName"
               :placeholder="$t('user.UserPlaceholder')"
               clearable
               style="width: 240px"
               @keyup.enter="handleQuery"
            />
         </el-form-item>
         <el-form-item :label="$t('user.phoneNumber')" prop="phonenumber">
            <el-input
               v-model="queryParams.phonenumber"
               :placeholder="$t('user.PhonePlaceholder')"
               clearable
               style="width: 240px"
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
               type="primary"
               plain
               icon="Plus"
               @click="openSelectUser"
               v-hasPermi="['system:role:add']"
            >{{ $t('user.addUser') }}</el-button>
         </el-col>
         <el-col :span="1.5">
            <el-button
               type="danger"
               plain
               icon="CircleClose"
               :disabled="multiple"
               @click="cancelAuthUserAll"
               v-hasPermi="['system:role:remove']"
            >{{ $t('role.deauth') }}</el-button>
         </el-col>
         <el-col :span="1.5">
            <el-button 
               type="warning" 
               plain 
               icon="Close"
               @click="handleClose"
            >{{ $t('button.close') }}</el-button>
         </el-col>
         <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
      </el-row>

      <el-table v-loading="loading" :data="userList" @selection-change="handleSelectionChange">
         <el-table-column type="selection" width="55" align="center" />
         <el-table-column :label="$t('user.name')" prop="userName" :show-overflow-tooltip="true" />
         <el-table-column :label="$t('user.nickname')" prop="nickName" :show-overflow-tooltip="true" />
         <el-table-column :label="$t('user.email')" prop="email" :show-overflow-tooltip="true" />
         <el-table-column :label="$t('user.cellphone')" prop="phonenumber" :show-overflow-tooltip="true" />
         <el-table-column :label="$t('user.status')" align="center" prop="status">
            <template #default="scope">
               <dict-tag :options="sys_normal_disable" :value="scope.row.status" />
            </template>
         </el-table-column>
         <el-table-column :label="$t('user.creationtime')"  align="center" prop="createTime" width="180">
            <template #default="scope">
               <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d}') }}</span>
            </template>
         </el-table-column>
         <el-table-column :label="$t('user.operate')" align="center" class-name="small-padding fixed-width">
            <template #default="scope">
               <el-button
                  type="text"
                  icon="CircleClose"
                  @click="cancelAuthUser(scope.row)"
                  v-hasPermi="['system:role:remove']"
               >{{ $t('role.cancelauth') }}</el-button>
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
      <select-user ref="selectRef" :roleId="queryParams.roleId" @ok="handleQuery" />
   </div>
</template>

<script setup lang="ts" name="AuthUser">
import selectUser from "./selectUser.vue";
import { allocatedUserList, authUserCancel, authUserCancelAll } from "@/api/system/role";
import type { QueryParams } from "@/api/system/role";
import i18n from '@/lang/index';
import { useRoute } from "vue-router";
import { ElForm } from "element-plus";
import { ComponentInternalInstance, getCurrentInstance, reactive, ref, Ref } from "vue";

const {t} = i18n.global;
const queryRef = ref<InstanceType<typeof ElForm>>();
const selectRef = ref<InstanceType<typeof selectUser>>();
const route = useRoute();
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { sys_normal_disable } = proxy?.useDict("sys_normal_disable");

const userList = ref([]);
const loading = ref(true);
const showSearch = ref(true);
const multiple = ref(true);
const total = ref(0);
const userIds: Ref<number[]> = ref([]);

const queryParams: QueryParams = reactive({
  pageNum: 1,
  pageSize: 10,
  roleId: Number(route.params.roleId),
  userName: undefined,
  phonenumber: undefined,
});

/** 查询授权用户列表 */
function getList() {
  loading.value = true;
  allocatedUserList(queryParams).then(response => {
    userList.value = response.rows;
    total.value = response.total;
    loading.value = false;
  });
}
// 返回按钮
function handleClose() {
  const obj = { path: "/system/role" };
  proxy?.$tab.closeOpenPage(obj.path);
}
/** 搜索按钮操作 */
function handleQuery() {
  queryParams.pageNum = 1;
  getList();
}
/** 重置按钮操作 */
function resetQuery() {
  queryRef.value?.resetFields()
//   proxy.resetForm("queryRef");
  handleQuery();
}
// 多选框选中数据
function handleSelectionChange(selection) {
  userIds.value = selection.map(item => item.userId);
  multiple.value = !selection.length;
}
/** 打开授权用户表弹窗 */
function openSelectUser() {
  selectRef.value?.show();
//   proxy?.$refs["selectRef"]?.show();
}
/** 取消授权按钮操作 */
function cancelAuthUser(row) {
  proxy?.$modal.confirm(t('role.cancelConfirm1') + row.userName + t('role.cancelConfirm2')).then(function () {
    return authUserCancel({ userId: row.userId, roleId: queryParams.roleId });
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess(t('button.cancelSuccess'));
  }).catch(() => {});
}
/** 批量取消授权按钮操作 */
function cancelAuthUserAll(row) {
  const roleId = queryParams.roleId;
  const uIds = userIds.value.join(",");
  proxy?.$modal.confirm(t('role.cancelauthall')).then(function () {
    return authUserCancelAll({ roleId: roleId, userIds: uIds });
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess(t('button.cancelSuccess'));
  }).catch(() => {});
}

getList();
</script>
