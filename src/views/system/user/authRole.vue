<template>
   <div class="app-container">
      <h4 class="form-header h4">{{ $t("user.BasicInfo") }}</h4>
      <el-form :model="form" label-width="80px">
         <el-row>
            <el-col :span="8" :offset="2">
               <el-form-item :label="$t('user.nickname')" prop="nickName">
                  <el-input v-model="form.nickName" disabled />
               </el-form-item>
            </el-col>
            <el-col :span="8" :offset="2">
               <el-form-item :label="$t('user.account')" prop="userName">
                  <el-input v-model="form.userName" disabled />
               </el-form-item>
            </el-col>
         </el-row>
      </el-form>

      <h4 class="form-header h4">{{ $t("user.RoleInfo") }}</h4>
      <el-table v-loading="loading" :row-key="getRowKey" @row-click="clickRow" ref="roleRef"
         @selection-change="handleSelectionChange" :data="roles.slice((pageNum - 1) * pageSize, pageNum * pageSize)">
         <el-table-column :label="$t('user.serialRole')" width="120" type="index" align="center">
            <template #default="scope">
               <span>{{ (pageNum - 1) * pageSize + scope.$index + 1 }}</span>
            </template>
         </el-table-column>
         <el-table-column type="selection" :reserve-selection="true" width="55"></el-table-column>
         <el-table-column :label="$t('role.id')" align="center" prop="roleId" />
         <el-table-column :label="$t('role.name')" align="center" prop="roleName" />
         <el-table-column :label="$t('role.key')" align="center" prop="roleKey" />
         <el-table-column :label="$t('user.creationtime')" align="center" prop="createTime" width="180">
            <template #default="scope">
               <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d}') }}</span>
            </template>
         </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" v-model:page="pageNum" v-model:limit="pageSize" />

      <el-form label-width="100px">
         <div style="text-align: center; margin-left: -120px; margin-top: 30px">
            <el-button type="primary" @click="submitForm()">{{
                  $t("button.submit2")
            }}</el-button>
            <el-button @click="close()">{{ $t("button.return") }}</el-button>
         </div>
      </el-form>
   </div>
</template>

<script setup lang="ts" name="AuthRole">
import { getAuthRole, updateAuthRole } from "@/api/system/user";
import type {  AddParams } from "@/api/system/user";
import i18n from "@/lang/index";
import { ComponentInternalInstance, getCurrentInstance, ref, Ref, nextTick } from "vue";
import { useRoute } from "vue-router";
import { ElForm, ElTable } from "element-plus";

const { t } = i18n.global;
const route = useRoute();
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const loading = ref(true);
const total = ref(0);
const pageNum = ref(1);
const pageSize = ref(10);
const roleIds = ref([]);
const roles = ref([]);
const form: Ref<AddParams> = ref({
   nickName: undefined,
   userName: undefined,
   userId: undefined,
});
const roleRef = ref<InstanceType<typeof ElTable>>();

interface Row {
   admin: boolean
   searchValue: string | null
   createBy: string | null
   createTime: string
   updateBy: string | null
   updateTime: string | null
   remark: string
   dataScope: string
   delFlag: string
   deptCheckStrictly: boolean
   deptIds: number[] | null
   flag: boolean
   menuCheckStrictly: boolean 
   menuIds: number[] | null
   roleId: number
   roleKey: string
   roleName: string
   roleSort: string
   status: string
}

/** 单击选中行数据 */
function clickRow(row: Row) {
   // @ts-expect-error
   roleRef.value?.toggleRowSelection(row, undefined);
   // proxy.$refs["roleRef"].toggleRowSelection(row);
}
/** 多选框选中数据 */
function handleSelectionChange(selection) {
   roleIds.value = selection.map((item) => item.roleId);
}
/** 保存选中的数据编号 */
function getRowKey(row: Row) {
   return String(row.roleId);
}
/** 关闭按钮 */
function close() {
   const obj = { path: "/system/user" };
   proxy?.$tab.closeOpenPage(obj.path);
}
/** 提交按钮 */
function submitForm() {
   const userId = form.value.userId;
   const rIds = roleIds.value.join(",");
   updateAuthRole({ userId: userId, roleIds: rIds }).then((response) => {
      proxy?.$modal.msgSuccess(t("button.Authorizationsucceeded"));
      close();
   });
}

(() => {
   const userId = route.params && route.params.userId;
   if (userId) {
      loading.value = true;
      getAuthRole(userId).then((response) => {
        
         form.value = response.user;
         roles.value = response.roles;
         total.value = roles.value.length;
         nextTick(() => {
            roles.value.forEach((row: Row) => {
               if (row.flag) {
                  // @ts-expect-error
                  roleRef.value?.toggleRowSelection(row, undefined);
                  // proxy.$refs["roleRef"].toggleRowSelection(row);
               }
            });
         });
         loading.value = false;
      });
   }
})();
</script>
