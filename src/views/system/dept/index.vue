<template>
   <div class="app-container">
      <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch">
         <el-form-item :label="$t('dept.name')" prop="deptName">
            <el-input
               v-model="queryParams.deptName"
               :placeholder="$t('user.DeptPlaceholder')"
               clearable
               @keyup.enter="handleQuery"
            />
         </el-form-item>
         <el-form-item :label="$t('user.status')" prop="status">
            <el-select v-model="queryParams.status" :placeholder="$t('dept.statusPlaceholder')" clearable style="width: 200px">
               <el-option
                  v-for="dict in sys_normal_disable"
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
               v-hasPermi="['system:dept:add']"
            >{{ $t('button.add')}}</el-button>
         </el-col>
         <el-col :span="1.5">
            <el-button
               type="info"
               plain
               icon="Sort"
               @click="toggleExpandAll"
            >{{ $t('button.expand')}}</el-button>
         </el-col>
         <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
      </el-row>

      <el-table
         v-if="refreshTable"
         v-loading="loading"
         :data="deptList"
         row-key="deptId"
         :default-expand-all="isExpandAll"
         :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
         <el-table-column prop="deptName" :label="$t('dept.name')" width="260"></el-table-column>
         <el-table-column prop="orderNum" :label="$t('menu.sort')" width="200"></el-table-column>
         <el-table-column prop="status" :label="$t('user.status')" width="100">
            <template #default="scope">
               <dict-tag :options="sys_normal_disable" :value="scope.row.status" />
            </template>
         </el-table-column>
         <el-table-column :label="$t('user.creationtime')" align="center" prop="createTime" width="200">
            <template #default="scope">
               <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d}') }}</span>
            </template>
         </el-table-column>
         <el-table-column :label="$t('user.operate')" align="center" class-name="small-padding fixed-width">
            <template #default="scope">
               <el-button
                  v-for="button in buttons"
                  :key="button.text"
                  :type="button.type"
                  :icon="button.icon"
                  @click="handleButtonText(scope.row, button.act)"
                  :v-hasPermi="button.permi"
                  link
                  >{{ button.text }}</el-button>
            </template>
         </el-table-column>
      </el-table>

      <!-- 添加或修改部门对话框 -->
      <el-dialog :title="title" v-model="open" width="600px" append-to-body>
         <el-form ref="deptRef" :model="form" :rules="rules">
            <el-row>
               <el-col :span="24" v-if="form.parentId !== 0">
                  <el-form-item :label="$t('dept.higheroffice')" prop="parentId">
                     <el-tree-select
                        v-model="form.parentId"
                        :data="deptOptions"
                        :props="{ value: 'deptId', label: 'deptName', children: 'children' }"
                        value-key="deptId"
                        :placeholder="$t('dept.HOPlaceholder')"
                        check-strictly
                     />
                  </el-form-item>
               </el-col>
               <el-col :span="12">
                  <el-form-item :label="$t('dept.name')" prop="deptName">
                     <el-input v-model="form.deptName" :placeholder="$t('user.DeptPlaceholder')" />
                  </el-form-item>
               </el-col>
               <el-col :span="12">
                  <el-form-item :label="$t('menu.displaySort')" prop="orderNum">
                     <el-input-number v-model="form.orderNum" controls-position="right" :min="0" />
                  </el-form-item>
               </el-col>
               <el-col :span="12">
                  <el-form-item :label="$t('dept.leader')" prop="leader">
                     <el-input v-model="form.leader" :placeholder="$t('dept.leaderPlaceholder')" maxlength="20" />
                  </el-form-item>
               </el-col>
               <el-col :span="12">
                  <el-form-item :label="$t('dept.contact')" prop="phone">
                     <el-input v-model="form.phone" :placeholder="$t('dept.contactPlaceholder')" maxlength="11" />
                  </el-form-item>
               </el-col>
               <el-col :span="12">
                  <el-form-item :label="$t('user.email')" prop="email">
                     <el-input v-model="form.email" :placeholder="$t('user.emailPlaceholder')" maxlength="50" />
                  </el-form-item>
               </el-col>
               <el-col :span="12">
                  <el-form-item :label="$t('dept.statusPlaceholder')">
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
         </el-form>
         <template #footer>
            <div class="dialog-footer">
               <el-button type="primary" @click="submitForm">{{ $t('button.submit') }}</el-button>
               <el-button @click="cancel">{{ $t('button.cancel') }}</el-button>
            </div>
         </template>
      </el-dialog>
   </div>
</template>

<script lang="ts" setup name="Dept">
import { listDept, getDept, delDept, addDept, updateDept, listDeptExcludeChild } from "@/api/system/dept";
import type { QueryParams, AddParams } from "@/api/system/dept";
import i18n from '@/lang/index';
import { ComponentInternalInstance, getCurrentInstance, nextTick, reactive, ref, toRefs } from "vue";
import { ElForm } from "element-plus";
import { parseTime } from "@/utils/ruoyi";
import { RuleType } from 'async-validator';

const {t} = i18n.global;
const queryRef = ref<InstanceType<typeof ElForm>>()
const deptRef = ref<InstanceType<typeof ElForm>>()
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { sys_normal_disable } = proxy?.useDict("sys_normal_disable");

const deptList = ref([]);
const open = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const title = ref("");
const deptOptions = ref([]);
const isExpandAll = ref(true);
const refreshTable = ref(true);

interface Row {
   searchValue: string | null
   createBy: string
   createTime: string
   updateBy: string
   updateTime: string | null
   remark: string
   params: QueryParams
   deptId: number
   deptName: string
   email: string
   leader: string
   orderNum: number
   parentId: number
   parentName: string
   phone: string
   delFlag: string
   ancestors: string
   status: string
   childern: Row | null  
}

interface Data {
   form: AddParams;
   queryParams: QueryParams; 
   rules:{
      parentId: [{
         required: boolean
         message: string
         trigger: string
      }]
      deptName: [{
         required: boolean
         message: string
         trigger: string 
      }]
      orderNum: [{
         required: boolean
         message: string
         trigger: string 
      }]
      email: [{
         type: RuleType
         message: string
         trigger: string[]
      }]
      phone: [{
         pattern: RegExp
         message: string
         trigger: string
      }]

   };
}

const data: Data = reactive({
  form: {},
  queryParams: {
    deptName: undefined,
    status: undefined
  },
  rules: {
    parentId: [{ required: true, message: t('dept.HORules'), trigger: "blur" }],
    deptName: [{ required: true, message: t('dept.nameRules'), trigger: "blur" }],
    orderNum: [{ required: true, message: t('dept.sortRules'), trigger: "blur" }],
    email: [{ type: "email", message: t('user.cemailRules'), trigger: ["blur", "change"] }],
    phone: [{ pattern: /[0-9]+$/, message: t('user.pnumberRules'), trigger: "blur" }]
  },
});

const { queryParams, form, rules } = toRefs(data);

const buttons = [
   {type: 'primary', text: t('button.edit'), icon: 'Edit', act : 'edit', permi: ['system:dept:edit']}, 
   {type: 'primary', text: t('button.add'), icon: 'Plus', act : 'add', permi: ['system:dept:add']},
   {type: 'primary', text: t('button.delete'), icon: 'Delete', act : 'delete', permi: ['system:dept:remove']},
] as const

function handleButtonText(row: Row, act: string) {
    if( act == "edit" ){
      return handleUpdate(row);
    }
    if( act == "add" ){
      return handleAdd(row);
    }
    if( act == "delete" ){
      return handleDelete(row);
    }
}

/** 查询部门列表 */
function getList() {
  loading.value = true;
  listDept(queryParams.value).then(response => {
    deptList.value = proxy?.handleTree(response.data, "deptId");
    loading.value = false;
  });
}
/** 取消按钮 */
function cancel() {
  open.value = false;
  reset();
}
/** 表单重置 */
function reset() {
  form.value = {
    deptId: undefined,
    parentId: undefined,
    deptName: undefined,
    orderNum: 0,
    leader: undefined,
    phone: undefined,
    email: undefined,
    status: "0"
  };
  deptRef.value?.resetFields();
//   proxy.resetForm("deptRef");
}
/** 搜索按钮操作 */
function handleQuery() {
  getList();
}
/** 重置按钮操作 */
function resetQuery() {
  queryRef.value?.resetFields()
//   proxy.resetForm("queryRef");
  handleQuery();
}
/** 新增按钮操作 */
function handleAdd(row: Row) {
  reset();
  listDept().then(response => {
    deptOptions.value = proxy?.handleTree(response.data, "deptId");
  });
  if (row != undefined) {
    form.value.parentId = row.deptId;
  }
  open.value = true;
  title.value = t('dept.addDept');
}
/** 展开/折叠操作 */
function toggleExpandAll() {
  refreshTable.value = false;
  isExpandAll.value = !isExpandAll.value;
  nextTick(() => {
    refreshTable.value = true;
  });
}
/** 修改按钮操作 */
function handleUpdate(row: Row) {
  reset();
  listDeptExcludeChild(row.deptId).then(response => {
    deptOptions.value = proxy?.handleTree(response.data, "deptId");
  });
  getDept(row.deptId).then(response => {
    form.value = response.data;
    open.value = true;
    title.value = t('dept.modifyDept');
  });
}
/** 提交按钮 */
function submitForm() {
//   proxy.$refs["deptRef"].validate(valid => {
   deptRef.value?.validate(valid => {
    if (valid) {
      if (form.value.deptId != undefined) {
        updateDept(form.value).then(response => {
          proxy?.$modal.msgSuccess(t('button.successModify'));
          open.value = false;
          getList();
        });
      } else {
        addDept(form.value).then(response => {
          proxy?.$modal.msgSuccess(t('button.AddSuccess'));
          open.value = false;
          getList();
        });
      }
    }
  });
}
/** 删除按钮操作 */
function handleDelete(row: Row) {
  proxy?.$modal.confirm(t('menu.confirmDelete1') + row.deptName + t('menu.confirmDelete2')).then(function() {
    return delDept(row.deptId);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess(t('user.succesDeleted'));
  }).catch(() => {});
}

getList();
</script>
