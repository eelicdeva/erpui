<template>
   <!-- 授权用户 -->
   <el-dialog :title="$t('user.select')" v-model="visible" width="800px" top="5vh" append-to-body>
      <el-form :model="queryParams" ref="queryRef" :inline="true">
         <el-form-item :label="$t('user.name')" prop="userName">
            <el-input
               v-model="queryParams.userName"
               :placeholder="$t('user.UserPlaceholder')"
               clearable
               @keyup.enter="handleQuery"
            />
         </el-form-item>
         <el-form-item :label="$t('user.phoneNumber')" prop="phonenumber">
            <el-input
               v-model="queryParams.phonenumber"
               :placeholder="$t('user.PhonePlaceholder')"
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
         <el-table :row-key="getRowKey" @row-click="clickRow" ref="refTable" :data="userList" @selection-change="handleSelectionChange" height="260px">
            <el-table-column type="selection" width="55" :reserve-selection="true" ></el-table-column>
            <el-table-column :label="$t('user.name')" prop="userName" :show-overflow-tooltip="true" />
            <el-table-column :label="$t('user.nickname')" prop="nickName" :show-overflow-tooltip="true" />
            <el-table-column :label="$t('user.email')" prop="email" :show-overflow-tooltip="true" />
            <el-table-column :label="$t('user.cellphone')" prop="phonenumber" :show-overflow-tooltip="true" />
            <el-table-column :label="$t('user.status')" align="center" prop="status">
               <template #default="scope">
                  <dict-tag :options="sys_normal_disable" :value="scope.row.status" />
               </template>
            </el-table-column>
            <el-table-column :label="$t('user.creationtime')" align="center" prop="createTime" width="180">
               <template #default="scope">
                  <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d}') }}</span>
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
      </el-row>
      <template #footer>
         <div class="dialog-footer">
            <el-button type="primary" @click="handleSelectUser">{{ $t('button.submit') }}</el-button>
            <el-button @click="visible = false">{{ $t('button.cancel') }}</el-button>
         </div>
      </template>
   </el-dialog>
</template>

<script setup lang="ts" name="SelectUser">
import { authUserSelectAll, unallocatedUserList } from "@/api/system/role";
import type { QueryParams } from "@/api/system/role";
import { ComponentInternalInstance, getCurrentInstance, reactive, ref, Ref } from "vue";
import i18n from '@/lang/index';
import { ElForm, ElTable } from "element-plus";

const {t} = i18n.global;

const props = defineProps({
  roleId: {
    type: [Number, String]
  }
});

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { sys_normal_disable } = proxy?.useDict("sys_normal_disable");

const userList = ref([]);
const visible = ref(false);
const total = ref(0);
const userIds: Ref<number[]> = ref([]);
const queryRef = ref<InstanceType<typeof ElForm>>();
const refTable = ref<InstanceType<typeof ElTable>>();
const queryParams: QueryParams = reactive({
  pageNum: 1,
  pageSize: 10,
  roleId: undefined,
  userName: undefined,
  phonenumber: undefined
});

//get id rows
function getRowKey(row) {
      return row.userId;
}

// 显示弹框
function show() {
  queryParams.roleId = props.roleId;
  getList();
  visible.value = true;
}
/**选择行 */
function clickRow(row) {
   // @ts-expect-error
   refTable.value?.toggleRowSelection(row, undefined);
}
// 多选框选中数据
function handleSelectionChange(selection) {
  userIds.value = selection.map(item => item.userId);
}
// 查询表数据
function getList() {
  unallocatedUserList(queryParams).then(res => {
    userList.value = res.rows;
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
//   proxy.resetForm("queryRef");
  handleQuery();
}
const emit = defineEmits(["ok"]);
/** 选择授权用户操作 */
function handleSelectUser() {
  const roleId = queryParams.roleId;
  const uIds = userIds.value.join(",");
  if (uIds == "") {
    proxy?.$modal.msgError(t('user.selectError'));
    return;
  }
  authUserSelectAll({ roleId: roleId, userIds: uIds }).then(res => {
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
