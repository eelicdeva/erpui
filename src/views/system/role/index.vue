<template>
   <div class="app-container">
      <el-form :model="queryParams" ref="queryRef" v-show="showSearch" :inline="true" >
         <el-form-item :label="$t('role.name')" prop="roleName">
            <el-input
               v-model="queryParams.roleName"
               :placeholder="$t('role.RolePlaceholder')"
               clearable
               style="width: 240px"
               @keyup.enter="handleQuery"
            />
         </el-form-item>
         <el-form-item :label="$t('role.key')" prop="roleKey">
            <el-input
               v-model="queryParams.roleKey"
               :placeholder="$t('role.KeyPlaceholder')"
               clearable
               style="width: 240px"
               @keyup.enter="handleQuery"
            />
         </el-form-item>
         <el-form-item :label="$t('user.status')" prop="status">
            <el-select
               v-model="queryParams.status"
               :placeholder="$t('role.statusPlaceholder')"
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
         <el-form-item :label="$t('user.creationtime')" style="width: 308px">
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
               v-hasPermi="['system:role:add']"
            >{{ $t('button.add') }}</el-button>
         </el-col>
         <el-col :span="1.5">
            <el-button
               type="success"
               plain
               icon="Edit"
               :disabled="single"
               @click="handleUpdate"
               v-hasPermi="['system:role:edit']"
            >{{ $t('button.edit') }}</el-button>
         </el-col>
         <el-col :span="1.5">
            <el-button
               type="danger"
               plain
               icon="Delete"
               :disabled="multiple"
               @click="handleDelete"
               v-hasPermi="['system:role:remove']"
            >{{ $t('button.delete') }}</el-button>
         </el-col>
         <el-col :span="1.5">
            <el-button
               type="warning"
               plain
               icon="Download"
               @click="handleExport"
               v-hasPermi="['system:role:export']"
            >{{$t('button.export')}}</el-button>
         </el-col>
         <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
      </el-row>

      <!-- 表格数据 -->
      <el-table v-loading="loading" :data="roleList" @selection-change="handleSelectionChange">
         <el-table-column type="selection" width="55" align="center" />
         <el-table-column :label="$t('role.id')" prop="roleId" width="120" />
         <el-table-column :label="$t('role.name')" prop="roleName" :show-overflow-tooltip="true" width="200" />
         <el-table-column :label="$t('role.key')" prop="roleKey" :show-overflow-tooltip="true" width="150" />
         <el-table-column :label="$t('role.sort')" prop="roleSort" width="180" />
         <el-table-column :label="$t('user.status')" align="center" width="100">
            <template #default="scope">
               <el-switch
                  v-model="scope.row.status"
                  active-value="0"
                  inactive-value="1"
                  @change="handleStatusChange(scope.row)"
               ></el-switch>
            </template>
         </el-table-column>
         <el-table-column :label="$t('user.creationtime')" align="center" prop="createTime">
            <template #default="scope">
               <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d}') }}</span>
            </template>
         </el-table-column>
         <el-table-column :label="$t('user.operate')" align="center" class-name="small-padding fixed-width">
            <template #default="scope">
              <el-tooltip :content="$t('button.edit')" placement="top" v-if="scope.row.roleId !== 1">
                <el-button
                  :type="buttonType"
                  icon="Edit"
                  @click="handleUpdate(scope.row)"
                  v-hasPermi="['system:role:edit']"
                  link
                ></el-button>
              </el-tooltip>
              <el-tooltip :content="$t('button.delete')" placement="top" v-if="scope.row.roleId !== 1">
                <el-button
                  :type="buttonType"
                  icon="Delete"
                  @click="handleDelete(scope.row)"
                  v-hasPermi="['system:role:remove']"
                  link
                ></el-button>
              </el-tooltip>
              <el-tooltip :content="$t('button.dataPerms')" placement="top" v-if="scope.row.roleId !== 1">
                <el-button
                  :type="buttonType"
                  icon="CircleCheck"
                  @click="handleDataScope(scope.row)"
                  v-hasPermi="['system:role:edit']"
                  link
                ></el-button>
              </el-tooltip>
              <el-tooltip :content="$t('button.AssignUser')" placement="top" v-if="scope.row.roleId !== 1">
                <el-button
                  :type="buttonType"
                  icon="User"
                  @click="handleAuthUser(scope.row)"
                  v-hasPermi="['system:role:edit']"
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

      <!-- 添加或修改角色配置对话框 -->
      <!-- Add or modify role configuration dialog -->
      <el-dialog :title="title" v-model="open" width="500px" append-to-body>
         <el-form ref="roleRef" :model="form" :rules="rules" label-width="100px">
            <el-form-item :label="$t('role.name')" prop="roleName">
               <el-input v-model="form.roleName" :placeholder="$t('role.RolePlaceholder')" />
            </el-form-item>
            <el-form-item prop="roleKey">
               <template #label>
                  <span>
                     <el-tooltip :content="$t('role.Content')" placement="top">
                        <el-icon><question-filled /></el-icon>
                     </el-tooltip>
                     {{ $t('role.key') }}
                  </span>
               </template>
               <el-input v-model="form.roleKey" :placeholder="$t('role.KeyPlaceholder')" />
            </el-form-item>
            <el-form-item :label="$t('role.order')" prop="roleSort">
               <el-input-number v-model="form.roleSort" controls-position="right" :min="0" />
            </el-form-item>
            <el-form-item :label="$t('user.status')">
               <el-radio-group v-model="form.status">
                  <el-radio
                     v-for="dict in sys_normal_disable"
                     :key="dict.value"
                     :label="dict.value"
                  >{{ dict.label }}</el-radio>
               </el-radio-group>
            </el-form-item>
            <el-form-item :label="$t('role.menuPerms')">
               <el-checkbox v-model="menuExpand" @change="handleCheckedTreeExpand($event, 'menu')">{{ $t('button.expand') }}</el-checkbox>
               <el-checkbox v-model="menuNodeAll" @change="handleCheckedTreeNodeAll($event, 'menu')">{{ $t('button.select') }}</el-checkbox>
               <el-checkbox v-model="form.menuCheckStrictly" @change="handleCheckedTreeConnect($event, 'menu')">{{ $t('button.relation') }}</el-checkbox>
               <el-tree
                  class="tree-border"
                  :data="menuOptions"
                  show-checkbox
                  ref="menuRef"
                  node-key="id"
                  :check-strictly="!form.menuCheckStrictly"
                  :empty-text="$t('role.loading')"
                  :props="{ label: 'label', children: 'children' }"
               ></el-tree>
            </el-form-item>
            <el-form-item :label="$t('user.remark')">
               <el-input v-model="form.remark" type="textarea" :placeholder="$t('user.remarkPlaceholder')"></el-input>
            </el-form-item>
         </el-form>
         <template #footer>
            <div class="dialog-footer">
               <el-button type="primary" @click="submitForm">{{ $t('button.submit') }}</el-button>
               <el-button @click="cancel">{{ $t('button.cancel') }}</el-button>
            </div>
         </template>
      </el-dialog>

      <!-- 分配角色数据权限对话框 -->
      <!-- Assign role data permission dialog -->
      <el-dialog :title="title" v-model="openDataScope" width="500px" append-to-body>
         <el-form :model="form" label-width="80px">
            <el-form-item :label="$t('role.name')">
               <el-input v-model="form.roleName" :disabled="true" />
            </el-form-item>
            <el-form-item :label="$t('role.key')">
               <el-input v-model="form.roleKey" :disabled="true" />
            </el-form-item>
            <el-form-item :label="$t('role.scope')">
               <el-select v-model="form.dataScope" @change="dataScopeSelectChange">
                  <el-option
                     v-for="item in dataScopeOptions"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value"
                  ></el-option>
               </el-select>
            </el-form-item>
            <el-form-item :label="$t('button.dataPerms')" v-show="form.dataScope == '2'">
               <el-checkbox v-model="deptExpand" @change="handleCheckedTreeExpand($event, 'dept')">{{ $t('button.expand') }}</el-checkbox>
               <el-checkbox v-model="deptNodeAll" @change="handleCheckedTreeNodeAll($event, 'dept')">{{ $t('button.select') }}</el-checkbox>
               <el-checkbox v-model="form.deptCheckStrictly" @change="handleCheckedTreeConnect($event, 'dept')">{{ $t('button.relation') }}</el-checkbox>
               <el-tree
                  class="tree-border"
                  :data="deptOptions"
                  show-checkbox
                  default-expand-all
                  ref="deptRef"
                  node-key="id"
                  :check-strictly="!form.deptCheckStrictly"
                  :empty-text="$t('role.loading')"
                  :props="{ label: 'label', children: 'children' }"
               ></el-tree>
            </el-form-item>
         </el-form>
         <template #footer>
            <div class="dialog-footer">
               <el-button type="primary" @click="submitDataScope">{{ $t('button.submit') }}</el-button>
               <el-button @click="cancelDataScope">{{ $t('button.cancel') }}</el-button>
            </div>
         </template>
      </el-dialog>
   </div>
</template>

<script setup lang="ts" name="Role">
import { ComponentInternalInstance, getCurrentInstance, reactive, Ref, ref, toRefs, nextTick } from "vue";
import { useRouter } from "vue-router";
import { ElTree, ElForm } from "element-plus";
import type Node from 'element-plus/es/components/tree/src/model/node';
import i18n from '@/lang/index';
import { addRole, changeRoleStatus, dataScope, delRole, getRole, listRole, updateRole, deptTreeSelect } from "@/api/system/role";
import type { QueryParams, AddParams } from "@/api/system/role";
import { roleMenuTreeselect, treeselect as menuTreeselect } from "@/api/system/menu";

const {t} = i18n.global;
const queryRef = ref<InstanceType<typeof ElForm>>()
const roleRef = ref<InstanceType<typeof ElForm>>()
const router = useRouter();
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { sys_normal_disable } = proxy?.useDict("sys_normal_disable");

const roleList: Ref<any[]> = ref([]);
const open = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const title = ref("");
const dateRange = ref([]);
const menuOptions: Ref<Node[]> = ref([]);
const menuExpand = ref(false);
const menuNodeAll = ref(false);
const deptExpand = ref(true);
const deptNodeAll = ref(false);
const deptOptions: Ref<Node[]> = ref([]);
const openDataScope = ref(false);
const menuRef = ref<InstanceType<typeof ElTree>>();
const deptRef = ref<InstanceType<typeof ElTree>>();
const buttonType = "primary";

interface Row {
   admin: boolean
   searchValue: string | null
   createBy: string | null
   createTime: string
   updateBy: string | null
   updateTime: string | null
   remark: string
   params: QueryParams
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

interface Data {
   form: AddParams
   queryParams: QueryParams 
   rules:{
      roleName: [{
         required: boolean
         message: string
         trigger: string
      }]
      roleKey: [{
         required: boolean
         message: string
         trigger: string 
      }]
      roleSort: [{
         required: boolean
         message: string
         trigger: string  
      }]
   };
}

/** 数据范围选项*/
const dataScopeOptions = ref([
  { value: "1", label: t('role.dataScope1') },
  { value: "2", label: t('role.dataScope2') },
  { value: "3", label: t('role.dataScope3') },
  { value: "4", label: t('role.dataScope4') },
  { value: "5", label: t('role.dataScope5') }
]);

const data: Data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    roleName: undefined,
    roleKey: undefined,
    status: undefined
  },
  rules: {
    roleName: [{ required: true, message: t('role.nameRules'), trigger: "blur" }],
    roleKey: [{ required: true, message: t('role.keyRules'), trigger: "blur" }],
    roleSort: [{ required: true, message: t('role.sortRules'), trigger: "blur" }]
  },
});

const { queryParams, form, rules } = toRefs(data);

/** 查询角色列表 */
function getList() {
  loading.value = true;
  listRole(proxy?.addDateRange(queryParams.value, dateRange.value)).then(response => {
    roleList.value = response.rows;
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
  // proxy.resetForm("queryRef");
  handleQuery();
}
/** 删除按钮操作 */
function handleDelete(row: Row) {
  const roleIds = row.roleId || ids.value;
  proxy?.$modal.confirm(t('role.confirmDelete1') + roleIds + t('role.confirmDelete2')).then(function () {
    return delRole(roleIds);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess(t('user.succesDeleted'));
  }).catch(() => {});
}
/** 导出按钮操作 */
function handleExport() {
  proxy?.$download("system/role/export", {
    ...queryParams.value,
  }, `role_${new Date().getTime()}.xlsx`);
}
/** 多选框选中数据 */
function handleSelectionChange(selection) {
  ids.value = selection.map(item => item.roleId);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}
/** 角色状态修改 */
function handleStatusChange(row: Row) {
  let text = row.status === "0" ? t('button.enable') : t('button.disable');
  proxy?.$modal.confirm(t('role.handleStatus1') + text + ' " " ' + row.roleName + t('role.handleStatus2')).then(function () {
    return changeRoleStatus(row.roleId, row.status);
  }).then(() => {
    proxy.$modal.msgSuccess(text + t('button.success'));
  }).catch(function () {
    row.status = row.status === "0" ? "1" : "0";
  });
}

// /** 更多操作 */
// function handleCommand(command, row: Row) {
//   switch (command) {
//     case "handleDataScope":
//       handleDataScope(row);
//       break;
//     case "handleAuthUser":
//       handleAuthUser(row);
//       break;
//     default:
//       break;
//   }
// }

/** 分配用户 */
function handleAuthUser(row: Row) {
  router.push("/system/role-auth/user/" + row.roleId);
}
/** 查询菜单树结构 */
function getMenuTreeselect() {
  menuTreeselect().then(response => {
    menuOptions.value = response.data;
  });
}
/** 所有部门节点数据 */
function getDeptAllCheckedKeys() {
  // 目前被选中的部门节点
  let checkedKeys = deptRef.value?.getCheckedKeys();
  // 半选中的部门节点
  let halfCheckedKeys = deptRef.value?.getHalfCheckedKeys();
  if (halfCheckedKeys !== undefined) {
    checkedKeys?.unshift.apply(checkedKeys, halfCheckedKeys);
  }
  return checkedKeys;
}
/** 重置新增的表单以及其他数据  */
function reset() {
  if (menuRef.value != undefined) {
    menuRef.value.setCheckedKeys([]);
  }
  menuExpand.value = false;
  menuNodeAll.value = false;
  deptExpand.value = true;
  deptNodeAll.value = false;
  form.value = {
    roleId: undefined,
    roleName: undefined,
    roleKey: undefined,
    roleSort: 0,
    status: "0",
    menuIds: [],
    deptIds: [],
    menuCheckStrictly: true,
    deptCheckStrictly: true,
    remark: undefined
  };
  roleRef.value?.resetFields();
  // proxy.resetForm("roleRef");
}
/** 添加角色 */
function handleAdd() {
  reset();
  getMenuTreeselect();
  open.value = true;
  title.value = t('role.addRole');
}
/** 修改角色 */
function handleUpdate(row: Row) {
  reset();
  const roleId = row.roleId || ids.value;
  const roleMenu = getRoleMenuTreeselect(roleId);
  getRole(roleId).then(response => {
    form.value = response.data;
    form.value.roleSort = Number(form.value.roleSort);
    open.value = true;
    nextTick(() => {
      roleMenu.then((res) => {
        let checkedKeys = res.checkedKeys;
        checkedKeys.forEach((v) => {
          nextTick(() => {
            menuRef.value?.setChecked(v, true, false);
          });
        });
      });
    });
    title.value = t('role.modifyRole');
  });
}
/** 根据角色ID查询菜单树结构 */
function getRoleMenuTreeselect(roleId) {
  return roleMenuTreeselect(roleId).then(response => {
    menuOptions.value = response.menus;
    return response;
  });
}
/** 根据角色ID查询部门树结构 */
function getDeptTree(roleId) {
  return deptTreeSelect(roleId).then(response => {
    deptOptions.value = response.depts;
    return response;
  });
}
/** 树权限（展开/折叠）*/
function handleCheckedTreeExpand(value, type) {
  if (type == "menu") {
    let treeList = menuOptions.value;
    for (let i = 0; i < treeList.length; i++) {
      if ( menuRef.value !== undefined)
        menuRef.value.store.nodesMap[treeList[i].id].expanded = value;
    }
  } else if (type == "dept") {
    let treeList = deptOptions.value;
    for (let i = 0; i < treeList.length; i++) {
      if ( deptRef.value !== undefined)
        deptRef.value.store.nodesMap[treeList[i].id].expanded = value;
    }
  }
}
/** 树权限（全选/全不选） */
function handleCheckedTreeNodeAll(value, type) {
  if (type == "menu") {
    menuRef.value?.setCheckedNodes(value ? menuOptions.value : []);
  } else if (type == "dept") {
    deptRef.value?.setCheckedNodes(value ? deptOptions.value : []);
  }
}
/** 树权限（父子联动） */
function handleCheckedTreeConnect(value, type) {
  if (type == "menu") {
    form.value.menuCheckStrictly = value ? true : false;
  } else if (type == "dept") {
    form.value.deptCheckStrictly = value ? true : false;
  }
}
/** 所有菜单节点数据 */
function getMenuAllCheckedKeys() {
  // 目前被选中的菜单节点
  let checkedKeys = menuRef.value?.getCheckedKeys();
  // 半选中的菜单节点
  let halfCheckedKeys = menuRef.value?.getHalfCheckedKeys();
  if (halfCheckedKeys !== undefined) {
    checkedKeys?.unshift.apply(checkedKeys, halfCheckedKeys);
  }
  return checkedKeys;
}
/** 提交按钮 */
function submitForm() {
  // proxy.$refs["roleRef"].validate(valid => {
    roleRef.value?.validate(valid => {
    if (valid) {
      if (form.value.roleId != undefined) {
        form.value.menuIds = getMenuAllCheckedKeys();
        updateRole(form.value).then(response => {
          proxy?.$modal.msgSuccess(t('button.successModify'));
          open.value = false;
          getList();
        });
      } else {
        form.value.menuIds = getMenuAllCheckedKeys();
        addRole(form.value).then(response => {
          proxy?.$modal.msgSuccess(t('button.AddSuccess'));
          open.value = false;
          getList();
        });
      }
    }
  });
}
/** 取消按钮 */
function cancel() {
  open.value = false;
  reset();
}
/** 选择角色权限范围触发 */
function dataScopeSelectChange(value) {
  if (value !== "2") {
    deptRef.value?.setCheckedKeys([]);
  }
}
/** 分配数据权限操作 */
function handleDataScope(row) {
  reset();
  const deptTreeSelect = getDeptTree(row.roleId);
  getRole(row.roleId).then(response => {
    form.value = response.data;
    openDataScope.value = true;
    nextTick(() => {
      deptTreeSelect.then(res => {
        nextTick(() => {
          if (deptRef.value) {
            deptRef.value.setCheckedKeys(res.checkedKeys);
          }
        });
      });
    });
    title.value = t('role.dataperms');
  });
}
/** 提交按钮（数据权限） */
function submitDataScope() {
  if (form.value.roleId != undefined) {
    form.value.deptIds = getDeptAllCheckedKeys();
    dataScope(form.value).then(response => {
      proxy?.$modal.msgSuccess(t('button.successModify'));
      openDataScope.value = false;
      getList();
    });
  }
}
/** 取消按钮（数据权限）*/
function cancelDataScope() {
  openDataScope.value = false;
  reset();
}

getList();
</script>
