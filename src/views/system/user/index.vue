<template>
   <div class="app-container">
      <el-row :gutter="20">
         <!--部门数据-->
         <el-col :span="4" :xs="24">
            <div class="head-container">
               <el-input
                  v-model="deptName"
                  :placeholder="$t('user.DeptPlaceholder')"
                  clearable
                  prefix-icon="Search"
                  style="margin-bottom: 20px"
               />
            </div>
            <div class="head-container">
               <el-tree
                  :data="deptOptions"
                  :props="{ label: 'label', children: 'children' }"
                  :expand-on-click-node="false"
                  :filter-node-method="filterNode"
                  ref="deptTreeRef"
                  node-key="id"
                  highlight-current
                  default-expand-all
                  @node-click="handleNodeClick"
               />
            </div>
         </el-col>
         <!--用户数据-->
         <el-col :span="20" :xs="24">
            <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" >
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
                     style="width: 240px"
                     @keyup.enter="handleQuery"
                  />
               </el-form-item>
               <el-form-item :label="$t('user.status')" prop="status">
                  <el-select
                     v-model="queryParams.status"
                     :placeholder="$t('user.statusPlaceholder')"
                     clearable
                     style="width: 240px"
                  >
                     <el-option
                        v-for="dict in sys_normal_disable"
                        :key="dict.value"
                        :label="dict.label"
                        :value="dict.value"
                     />
                  </el-select>
               </el-form-item>
               <el-form-item :label="$t('user.creationtime')" style="width: 308px;">
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
                     icon="Plus"
                     @click="handleAdd"
                     v-hasPermi="['system:user:add']"
                  >{{ $t('button.add') }}</el-button>
               </el-col>
               <el-col :span="1.5">
                  <el-button
                     type="success"
                     plain
                     icon="Edit"
                     :disabled="single"
                     @click="handleUpdate"
                     v-hasPermi="['system:user:edit']"
                  >{{ $t('button.edit') }}</el-button>
               </el-col>
               <el-col :span="1.5">
                  <el-button
                     type="danger"
                     plain
                     icon="Delete"
                     :disabled="multiple"
                     @click="handleDelete"
                     v-hasPermi="['system:user:remove']"
                  >{{ $t('button.delete') }}</el-button>
               </el-col>
               <el-col :span="1.5">
                  <el-button
                     type="info"
                     plain
                     icon="Upload"
                     @click="handleImport"
                     v-hasPermi="['system:user:import']"
                  >{{ $t('button.import')}}</el-button>
               </el-col>
               <el-col :span="1.5">
                  <el-button
                     type="warning"
                     plain
                     icon="Download"
                     @click="handleExport"
                     v-hasPermi="['system:user:export']"
                  >{{ $t('button.export') }}</el-button>
               </el-col>
               <right-toolbar v-model:showSearch="showSearch" @queryTable="getList" :columns="columns"></right-toolbar>
            </el-row>

            <el-table v-loading="loading" :data="userList" @selection-change="handleSelectionChange">
               <el-table-column type="selection" width="50" align="center" />
               <el-table-column :label="$t('user.id')" align="center" key="userId" prop="userId" v-if="columns[0].visible" />
               <el-table-column :label="$t('user.name')" align="center" key="userName" prop="userName" v-if="columns[1].visible" :show-overflow-tooltip="true" />
               <el-table-column :label="$t('user.nickname')" align="center" key="nickName" prop="nickName" v-if="columns[2].visible" :show-overflow-tooltip="true" />
               <el-table-column :label="$t('user.departement')" align="center" key="deptName" prop="dept.deptName" v-if="columns[3].visible" :show-overflow-tooltip="true" />
               <el-table-column :label="$t('user.phoneNumber')" align="center" key="phonenumber" prop="phonenumber" v-if="columns[4].visible" width="120" />
               <el-table-column :label="$t('user.status')" align="center" key="status" v-if="columns[5].visible">
                  <template #default="scope">
                     <el-switch
                        v-model="scope.row.status"
                        active-value="0"
                        inactive-value="1"
                        @change="handleStatusChange(scope.row)"
                     ></el-switch>
                  </template>
               </el-table-column>
               <el-table-column :label="$t('user.creationtime')" align="center" prop="createTime" v-if="columns[6].visible" width="160">
                  <template #default="scope">
                     <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d}') }}</span>
                  </template>
               </el-table-column>
               <el-table-column :label="$t('user.operate')" align="center" width="150" class-name="small-padding fixed-width">
                  <template #default="scope">
                     <el-tooltip :content="$t('button.edit')" placement="top" v-if="scope.row.userId !== 1">
                        <el-button
                           :type="buttonType"
                           icon="Edit"
                           @click="handleUpdate(scope.row)"
                           v-hasPermi="['system:user:edit']"
                           link
                        ></el-button>
                     </el-tooltip>
                     <el-tooltip :content="$t('button.delete')" placement="top" v-if="scope.row.userId !== 1">
                        <el-button
                           :type="buttonType"
                           icon="Delete"
                           @click="handleDelete(scope.row)"
                           v-hasPermi="['system:user:remove']"
                           link
                        ></el-button>
                     </el-tooltip>
                     <el-tooltip :content="$t('button.resetPW')" placement="top" v-if="scope.row.userId !== 1">
                        <el-button
                           :type="buttonType"
                           icon="Key"
                           @click="handleResetPwd(scope.row)"
                           v-hasPermi="['system:user:resetPwd']"
                           link
                        ></el-button>
                     </el-tooltip>
                     <el-tooltip :content="$t('button.authRole')" placement="top" v-if="scope.row.userId !== 1">
                        <el-button
                           :type="buttonType"
                           icon="CircleCheck"
                           @click="handleAuthRole(scope.row)"
                           v-hasPermi="['system:user:edit']"
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
         </el-col>
      </el-row>

      <!-- 添加或修改用户配置对话框 -->
      <el-dialog :title="title" v-model="open" width="600px" append-to-body>
         <el-form :model="form" :rules="rules" ref="userRef">
            <el-row>
               <el-col :span="12">
                  <el-form-item :label="$t('user.nickname')" prop="nickName">
                     <el-input v-model="form.nickName" :placeholder="$t('user.nickPlaceholder')" maxlength="30" />
                  </el-form-item>
               </el-col>
               <el-col :span="12">
                  <el-form-item :label="$t('user.dept')" prop="deptId">
                     <el-tree-select
                        v-model="form.deptId"
                        :data="deptOptions"
                        :props="{ value: 'id', label: 'label', children: 'children' }"
                        value-key="id"
                        :placeholder="$t('user.deptPlaceholder')"
                        check-strictly
                     />
                  </el-form-item>
               </el-col>
            </el-row>
            <el-row>
               <el-col :span="12">
                  <el-form-item :label="$t('user.phoneNumber')" prop="phonenumber">
                     <el-input v-model="form.phonenumber" :placeholder="$t('user.PhonePlaceholder')" maxlength="11" />
                  </el-form-item>
               </el-col>
               <el-col :span="12">
                  <el-form-item :label="$t('user.email')" prop="email">
                     <el-input v-model="form.email" :placeholder="$t('user.PhonePlaceholder')" maxlength="50" />
                  </el-form-item>
               </el-col>
            </el-row>
            <el-row>
               <el-col :span="12">
                  <el-form-item v-if="form.userId == undefined" :label="$t('user.name')" prop="userName">
                     <el-input v-model="form.userName" :placeholder="$t('user.UserPlaceholder')" maxlength="30" />
                  </el-form-item>
               </el-col>
               <el-col :span="12">
                  <el-form-item v-if="form.userId == undefined" :label="$t('user.password')" prop="password">
                     <el-input v-model="form.password" :placeholder="$t('user.PWPlaceholder')" type="password" maxlength="20" show-password />
                  </el-form-item>
               </el-col>
            </el-row>
            <el-row>
               <el-col :span="12">
                  <el-form-item :label="$t('user.gender')">
                     <el-select v-model="form.sex" :placeholder="$t('user.choosePlaceholder')">
                        <el-option
                           v-for="dict in sys_user_sex"
                           :key="dict.value"
                           :label="dict.label"
                           :value="dict.value"
                        ></el-option>
                     </el-select>
                  </el-form-item>
               </el-col>
               <el-col :span="12">
                  <el-form-item :label="$t('user.status')">
                     <el-radio-group v-model="form.status">
                        <el-radio
                           v-for="dict in sys_normal_disable"
                           :key="dict.value"
                           :label="dict.value"
                        >{{ dict.label }}</el-radio>
                     </el-radio-group>
                  </el-form-item>
               </el-col>
            </el-row>
            <el-row>
               <el-col :span="12">
                  <el-form-item :label="$t('user.post')">
                     <el-select v-model="form.postIds" multiple :placeholder="$t('user.choosePlaceholder')">
                        <el-option
                           v-for="item in postOptions"
                           :key="item.postId"
                           :label="item.postName"
                           :value="item.postId"
                           :disabled="item.status == 1"
                        ></el-option>
                     </el-select>
                  </el-form-item>
               </el-col>
               <el-col :span="12">
                  <el-form-item :label="$t('user.role')">
                     <el-select v-model="form.roleIds" multiple :placeholder="$t('user.choosePlaceholder')">
                        <el-option
                           v-for="item in roleOptions"
                           :key="item.roleId"
                           :label="item.roleName"
                           :value="item.roleId"
                           :disabled="item.status == 1"
                        ></el-option>
                     </el-select>
                  </el-form-item>
               </el-col>
            </el-row>
            <el-row>
               <el-col :span="24">
                  <el-form-item :label="$t('user.remark')">
                     <el-input v-model="form.remark" type="textarea" :placeholder="$t('user.remarkPlaceholder')"></el-input>
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

      <!-- 用户导入对话框 -->
      <el-dialog :title="upload.title" v-model="upload.open" width="400px" append-to-body>
         <el-upload
            ref="uploadRef"
            :limit="1"
            accept=".xlsx, .xls"
            :headers="upload.headers"
            :action="upload.url + '?updateSupport=' + upload.updateSupport"
            :disabled="upload.isUploading"
            :on-progress="handleFileUploadProgress"
            :on-success="handleFileSuccess"
            :auto-upload="false"
            drag
         >
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">{{ $t('user.dragUpload') }}<em>{{ $t('user.clickUpload') }}</em></div>
            <template #tip>
               <div class="el-upload__tip text-center">
                  <div class="el-upload__tip">
                     <el-checkbox v-model="upload.updateSupport" />{{ $t('user.updateAgree') }}
                  </div>
                  <span>{{ $t('user.fileFormat') }}</span>
                  <el-link type="primary" :underline="false" style="font-size:12px;vertical-align: baseline;" @click="importTemplate">{{ $t('user.template') }}</el-link>
               </div>
            </template>
         </el-upload>
         <template #footer>
            <div class="dialog-footer">
               <el-button type="primary" @click="submitFileForm">{{ $t('button.submit') }}</el-button>
               <el-button @click="upload.open = false">{{ $t('button.cancel') }}</el-button>
            </div>
         </template>
      </el-dialog>
   </div>
</template>

<script setup lang="ts" name="User">
import { getToken } from "@/utils/auth";
import { changeUserStatus, listUser, resetUserPwd, delUser, getUser, updateUser, addUser, deptTreeSelect } from "@/api/system/user";
import type { QueryParams, AddParams } from "@/api/system/user";
import i18n from '@/lang/index';
import { useRouter } from "vue-router";
import { ComponentInternalInstance, getCurrentInstance, reactive, ref, Ref, toRefs, watch } from "vue";
import type { ElForm, ElTree, ElUpload } from "element-plus";
import { parseTime } from "@/utils/ruoyi";
import { ElMessageBox } from 'element-plus';
import { RuleType } from 'async-validator';

const {t} = i18n.global;  
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const router = useRouter();
const uploadRef = ref<InstanceType<typeof ElUpload>>();
const queryRef = ref<InstanceType<typeof ElForm>>();
const userRef = ref<InstanceType<typeof ElForm>>();
const deptTreeRef = ref<InstanceType<typeof ElTree>>();

const { sys_normal_disable, sys_user_sex } = proxy?.useDict("sys_normal_disable", "sys_user_sex");

const userList: Ref<Row[]> = ref([]);
const open = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids: Ref<number[]> = ref([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const title = ref("");
const dateRange = ref([]);
const deptName = ref("");
const deptOptions = ref(undefined);
const initPassword = ref(undefined);
const postOptions: Ref<PostOptions[]> = ref([]);
const roleOptions: Ref<RoleOptions[]> = ref([]);
const buttonType = "primary";

interface Row {
   searchValue: string | null
   createBy: string
   createTime: string
   updateBy: string
   updateTime: string | null
   remark: string
   params: QueryParams;
   userId: number
   admin: boolean
   avatar: string
   delFlag: string
   deptId: number
   email: string
   loginDate: string
   loginIp: string
   nickName: string
   password: string
   phonenumber: string
   postIds: number
   roleId: number
   sex: string
   status: string
   userName: string
}

interface Data {
   form: AddParams;
   queryParams: QueryParams; 
   rules: {
    userName: [{
        required: boolean
        message: string
        trigger: string
     },
     {
        min: number
        max: number
        message: string
        trigger: string
     },
     {
        pattern: RegExp
        message: string
        trigger: string
     },
     {
        pattern: RegExp
        message: string
        trigger: string
     }]
     nickName: [{
        required: boolean
        message: string
        trigger: string
     }]
     password: [{
        required: boolean
        message: string
        trigger: string
     },
     {
        min: number
        max: number
        message: string
        trigger: string
     }]
     email: [{
        type: RuleType
        message: string
        trigger: string[]
     }]
     phonenumber: [{
        pattern: RegExp
        message: string
        trigger: string
     }]
   }
}

interface PostOptions {
   postId: number
   postName: string
   status: number
}

interface RoleOptions{
   roleId: number
   roleName: string
   status: number
}

/*** 用户导入参数 */
const upload = reactive({
  // 是否显示弹出层（用户导入）
  open: false,
  // 弹出层标题（用户导入）
  title: "",
  // 是否禁用上传
  isUploading: false,
  // 是否更新已经存在的用户数据
  updateSupport: 0,
  // 设置上传的请求头部
  headers: { Authorization: "Bearer " + getToken() },
  // 上传的地址
  url: import.meta.env.VITE_APP_BASE_API + "/system/user/importData"
});
// 列显隐信息
const columns = ref([
  { key: 0, label: t('user.id'), visible: true },
  { key: 1, label: t('user.name'), visible: true },
  { key: 2, label: t('user.nickname'), visible: true },
  { key: 3, label: t('user.departement'), visible: true },
  { key: 4, label: t('user.phoneNumber'), visible: true },
  { key: 5, label: t('user.status'), visible: true },
  { key: 6, label: t('user.creationtime'), visible: true }
]);

const data: Data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    userName: undefined,
    phonenumber: undefined,
    status: undefined,
    deptId: undefined
  },
  rules: {
    userName: [{ required: true, message: t('user.usernameRules'), trigger: "blur" }, 
      { min: 4, max: 16, message: t('user.usernameRules2'), trigger: "blur" }, 
      { pattern: /^[a-zA-Z]/, message: t('register.usernamePattern2'), trigger: "blur"}, 
      { pattern: /^[a-zA-Z0-9_-]+$/, message: t('register.usernamePattern'), trigger: "blur"}], 
    nickName: [{ required: true, message: t('user.nicknameRules'), trigger: "blur" }],
    password: [{ required: true, message: t('user.passwordRules'), trigger: "blur" }, 
      { min: 5, max: 20, message: t('register.passwordlength'), trigger: "blur" }],
    email: [{ type: "email", message: t('user.cemailRules'), trigger: ["blur", "change"] }],
    phonenumber: [{ pattern: /[0-9]+$/, message: t('user.pnumberRules'), trigger: "blur" }]
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 通过条件过滤节点  */
const filterNode = (value, data) => {
  if (!value) return true;
  return data.label.indexOf(value) !== -1;
};
/** 根据名称筛选部门树 */
watch(deptName, val => {
  deptTreeRef.value?.filter(val);
  deptTreeRef.value?.filter(val);
});
/** 查询部门下拉树结构 */
function getDeptTree() {
  deptTreeSelect().then(response => {
    deptOptions.value = response.data;
  });
};
/** 查询用户列表 */
function getList() {
  loading.value = true;
  listUser(proxy?.addDateRange(queryParams.value, dateRange.value)).then(res => {
    loading.value = false;
    userList.value = res.rows;
    total.value = res.total;
  });
};
/** 节点单击事件 */
function handleNodeClick(data) {
  queryParams.value.deptId = data.id;
  handleQuery();
};
/** 搜索按钮操作 */
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
};
/** 重置按钮操作 */
function resetQuery() {
  dateRange.value = [];
  queryRef.value?.resetFields();
//   proxy.resetForm("queryRef");
  queryParams.value.deptId = undefined;
  //proxy?.$refs.tree?.setCurrentKey(null);  
  deptTreeRef.value?.setCurrentKey(undefined);  
  handleQuery();
};
/** 删除按钮操作 */
function handleDelete(row: Row) {
  const userIds = row.userId || ids.value;
  proxy?.$modal.confirm(t('user.confirmDelete1') + userIds + t('user.confirmDelete2')).then(function () {
    return delUser(userIds);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess(t('user.succesDeleted'));
  }).catch(() => {});
};
/** 导出按钮操作 */
function handleExport() {
  proxy?.$download("system/user/export", {
    ...queryParams.value,
  },`user_${new Date().getTime()}.xlsx`);
};
/** 用户状态修改  */
function handleStatusChange(row: Row) {
  let text = row.status === "0" ? t('button.enable') : t('button.disable');
  proxy?.$modal.confirm(t('user.handleStatus1') + text + ' " " ' + row.userName + t('user.handleStatus2')).then(function () {
    return changeUserStatus(row.userId, row.status);
  }).then(() => {
    proxy.$modal.msgSuccess(text + t('button.success'));
  }).catch(function () {
    row.status = row.status === "0" ? "1" : "0";
  });
};
/** 更多操作 */
// function handleCommand(command: string, row) {
//   switch (command) {
//     case "handleResetPwd":
//       handleResetPwd(row);
//       break;
//     case "handleAuthRole":
//       handleAuthRole(row);
//       break;
//     default:
//       break;
//   }
// };
/** 跳转角色分配 */
function handleAuthRole(row: Row) {
  const userId = row.userId;
  router.push("/system/user-auth/role/" + userId);
};
/** 重置密码按钮操作 */
function handleResetPwd(row: Row) {
  ElMessageBox.prompt(
   t('user.resetPW1') + row.userName + t('user.resetPW2'), t('el.messagebox.title'), {
    confirmButtonText: t('el.messagebox.confirm'),
    cancelButtonText: t('el.messagebox.cancel'),
    closeOnClickModal: false,
    inputPattern: /^.{5,20}$/,
    inputErrorMessage: t('register.passwordlength'),
  }).then(({ value }) => {
    resetUserPwd(row.userId, value).then(response => {
      proxy?.$modal.msgSuccess(t('user.resetSucces') + value);
    });
  }).catch(() => {});
};
/** 选择条数  */
function handleSelectionChange(selection) {
  ids.value = selection.map(item => item.userId);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
};
/** 导入按钮操作 */
function handleImport() {
  upload.title = t('user.userImport');
  upload.open = true;
};
/** 下载模板操作 */
function importTemplate() {
  proxy?.$download("system/user/importTemplate", {
  }, `user_template_${new Date().getTime()}.xlsx`);
};
/**文件上传中处理 */
const handleFileUploadProgress = (event, file, fileList) => {
  upload.isUploading = true;
};
/** 文件上传成功处理 */
const handleFileSuccess = (response, file, fileList) => {
  upload.open = false;
  upload.isUploading = false;
  //proxy.$refs["uploadRef"].handleRemove(file);
  uploadRef.value?.handleRemove(file);
  ElMessageBox.alert("<div style='overflow: auto;overflow-x: hidden;max-height: 70vh;padding: 10px 20px 0;'>" + response.msg + "</div>", t('button.ImportResults'), { dangerouslyUseHTMLString: true });
  getList();
};
/** 提交上传文件 */
function submitFileForm() {
  //proxy.$refs["uploadRef"].submit();
  uploadRef.value?.submit();
};

/** 重置操作表单 */
function reset() {
  form.value = {
    userId: undefined,
    deptId: undefined,
    userName: undefined,
    nickName: undefined,
    password: undefined,
    phonenumber: undefined,
    email: undefined,
    sex: undefined,
    status: "0",
    remark: undefined,
    postIds: [],
    roleIds: []
  };
  userRef.value?.resetFields();
//   proxy.resetForm("userRef");
};
/** 取消按钮 */
function cancel() {
  open.value = false;
  reset();
};
/** 新增按钮操作 */
function handleAdd() {
  reset();
  getUser().then(response => {
    postOptions.value = response.posts;
    roleOptions.value = response.roles;
    open.value = true;
    title.value = t('user.addUser');
    form.value.password = initPassword.value;
  });
};
/** 修改按钮操作 */
function handleUpdate(row: Row) {
  reset();
  const userId = row.userId || ids.value;
  getUser(userId).then(response => {
    form.value = response.data;
    postOptions.value = response.posts;
    roleOptions.value = response.roles;
    form.value.postIds = response.postIds;
    form.value.roleIds = response.roleIds;
    open.value = true;
    title.value = t('user.modifyUser');
    form.value.password = "";
  });
};
/** 提交按钮 */
function submitForm() {
//   proxy.$refs["userRef"].validate(valid => {
  userRef.value?.validate(valid => {
    if (valid) {
      if (form.value.userId != undefined) {
        updateUser(form.value).then(response => {
          proxy?.$modal.msgSuccess(t('button.successModify'));
          open.value = false;
          getList();
        });
      } else {
        addUser(form.value).then(response => {
          proxy?.$modal.msgSuccess(t('button.AddSuccess'));
          open.value = false;
          getList();
        });
      }
    }
  });
};

getDeptTree();
getList();
</script>
