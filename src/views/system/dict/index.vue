<template>
   <div class="app-container">
      <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch">
         <el-form-item :label="$t('dict.name')" prop="dictName">
            <el-input
               v-model="queryParams.dictName"
               :placeholder="$t('dict.namePlaceholder')"
               clearable
               style="width: 240px"
               @keyup.enter="handleQuery"
            />
         </el-form-item>
         <el-form-item :label="$t('dict.type')" prop="dictType">
            <el-input
               v-model="queryParams.dictType"
               :placeholder="$t('dict.typePlaceholder')"
               clearable
               style="width: 240px"
               @keyup.enter="handleQuery"
            />
         </el-form-item>
         <el-form-item :label="$t('user.status')" prop="status">
            <el-select
               v-model="queryParams.status"
               :placeholder="$t('dict.status')"
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
               v-hasPermi="['system:dict:add']"
            >{{ $t('button.add') }}</el-button>
         </el-col>
         <el-col :span="1.5">
            <el-button
               type="success"
               plain
               icon="Edit"
               :disabled="single"
               @click="handleUpdate"
               v-hasPermi="['system:dict:edit']"
            >{{ $t('button.edit') }}</el-button>
         </el-col>
         <el-col :span="1.5">
            <el-button
               type="danger"
               plain
               icon="Delete"
               :disabled="multiple"
               @click="handleDelete"
               v-hasPermi="['system:dict:remove']"
            >{{ $t('button.delete') }}</el-button>
         </el-col>
         <el-col :span="1.5">
            <el-button
               type="warning"
               plain
               icon="Download"
               @click="handleExport"
               v-hasPermi="['system:dict:export']"
            >{{ $t('button.export') }}</el-button>
         </el-col>
         <el-col :span="1.5">
            <el-button
               type="danger"
               plain
               icon="Refresh"
               @click="handleRefreshCache"
               v-hasPermi="['system:dict:remove']"
            >{{ $t('button.RefreshCache') }}</el-button>
         </el-col>
         <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
      </el-row>

      <el-table v-loading="loading" :data="typeList" @selection-change="handleSelectionChange">
         <el-table-column type="selection" width="55" align="center" />
         <el-table-column :label="$t('dict.id')" align="center" prop="dictId" />
         <el-table-column :label="$t('dict.name')" align="center" prop="dictName" :show-overflow-tooltip="true"/>
         <el-table-column :label="$t('dict.type')" align="center" :show-overflow-tooltip="true">
            <template #default="scope">
               <router-link :to="'/system/dict-data/index/' + scope.row.dictId" class="link-type">
                  <span>{{ scope.row.dictType }}</span>
               </router-link>
            </template>
         </el-table-column>
         <el-table-column :label="$t('user.status')" align="center" prop="status">
            <template #default="scope">
               <dict-tag :options="sys_normal_disable" :value="scope.row.status" />
            </template>
         </el-table-column>
         <el-table-column :label="$t('user.remark')" align="center" prop="remark" :show-overflow-tooltip="true" />
         <el-table-column :label="$t('user.creationtime')" align="center" prop="createTime" width="180">
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
                  @click="handleButtonText(scope.row,button.act)"
                  :v-hasPermi="button.permi"
                  link
                >{{ button.text }}</el-button>
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

      <!-- 添加或修改参数配置对话框 -->
      <el-dialog :title="title" v-model="open" width="500px" append-to-body>
         <el-form ref="dictRef" :model="form" :rules="rules" label-width="80px">
            <el-form-item :label="$t('dict.name')" prop="dictName">
               <el-input v-model="form.dictName" :placeholder="$t('dict.namePlaceholder')" />
            </el-form-item>
            <el-form-item :label="$t('dict.type')" prop="dictType">
               <el-input v-model="form.dictType" :placeholder="$t('dict.typePlaceholder')" />
            </el-form-item>
            <el-form-item :label="$t('user.status')" prop="status">
               <el-radio-group v-model="form.status">
                  <el-radio
                     v-for="dict in sys_normal_disable"
                     :key="dict.value"
                     :label="dict.value"
                  >{{ dict.label }}</el-radio>
               </el-radio-group>
            </el-form-item>
            <el-form-item :label="$t('user.remark')" prop="remark">
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
   </div>
</template>

<script lang="ts" setup name="Dict">
import { listType, getType, delType, addType, updateType, refreshCache } from "@/api/system/dict/type";
import type { QueryParams, AddParams } from "@/api/system/dict/type";
import { ComponentInternalInstance, getCurrentInstance, reactive, ref, toRefs } from "vue";
import { ElForm } from "element-plus";
import { parseTime } from "@/utils/ruoyi";
import i18n from '@/lang/index';

const {t} = i18n.global;
const queryRef = ref<InstanceType<typeof ElForm>>()
const dictRef = ref<InstanceType<typeof ElForm>>()
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { sys_normal_disable } = proxy?.useDict("sys_normal_disable");

const typeList = ref([]);
const open = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const title = ref("");
const dateRange = ref([]);

interface Row {
   searchValue: string | null
   createBy: string
   createTime: string
   updateBy: string
   updateTime: string | null
   remark: string
   params: QueryParams
   dictId: number
   dictName: string
   dictType: string
   status: string
   
}

interface Data {
   form: AddParams;
   queryParams: QueryParams; 
   rules:{
      dictName: [{
         required: boolean
         message: string
         trigger: string
      }]
      dictType: [{
         required: boolean
         message: string
         trigger: string 
      }]
   };
}

const data: Data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    dictName: undefined,
    dictType: undefined,
    status: undefined
  },
  rules: {
    dictName: [{ required: true, message: t('dict.nameRules'), trigger: "blur" }],
    dictType: [{ required: true, message: t('dict.typeRules'), trigger: "blur" }]
  },
});

const { queryParams, form, rules } = toRefs(data);

const buttons = [
   {type: 'primary', text: t('button.edit'), icon: 'Edit', act : 'edit', permi: ['system:dict:edit']}, 
   {type: 'primary', text: t('button.delete'), icon: 'Delete', act : 'delete', permi: ['system:dict:remove']},
] as const

function handleButtonText(row: Row, act: string) {
    if( act == "edit" ){
      return handleUpdate(row);
    }
    if( act == "delete" ){
      return handleDelete(row);
    }
}

/** 查询字典类型列表 */
function getList() {
  loading.value = true;
  listType(proxy?.addDateRange(queryParams.value, dateRange.value)).then(response => {
    typeList.value = response.rows;
    total.value = response.total;
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
    dictId: undefined,
    dictName: undefined,
    dictType: undefined,
    status: "0",
    remark: undefined
  };
  dictRef.value?.resetFields();
//   proxy.resetForm("dictRef");
}
/** 搜索按钮操作 */
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}
/** 重置按钮操作 */
function resetQuery() {
  dateRange.value = [];
  queryRef.value?.resetFields()
//   proxy.resetForm("queryRef");
  handleQuery();
}
/** 新增按钮操作 */
function handleAdd() {
  reset();
  open.value = true;
  title.value = t('dict.addDictType');
}
/** 多选框选中数据 */
function handleSelectionChange(selection) {
  ids.value = selection.map(item => item.dictId);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}
/** 修改按钮操作 */
function handleUpdate(row: Row) {
  reset();
  const dictId = row.dictId || ids.value;
  getType(dictId).then(response => {
    form.value = response.data;
    open.value = true;
    title.value = t('dict.modifyDictType');
  });
}
/** 提交按钮 */
function submitForm() {
//   proxy.$refs["dictRef"].validate(valid => {
   dictRef.value?.validate(valid => {
    if (valid) {
      if (form.value.dictId != undefined) {
        updateType(form.value).then(response => {
          proxy?.$modal.msgSuccess(t('button.successModify'));
          open.value = false;
          getList();
        });
      } else {
        addType(form.value).then(response => {
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
  const dictIds = row.dictId || ids.value;
  proxy?.$modal.confirm(t('dict.confirmDelete') + dictIds + t('user.confirmDelete2')).then(function() {
    return delType(dictIds);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess(t('user.succesDeleted'));
  }).catch(() => {});
}
/** 导出按钮操作 */
function handleExport() {
  proxy?.$download("system/dict/type/export", {
    ...queryParams.value
  }, `dict_${new Date().getTime()}.xlsx`);
}
/** 刷新缓存按钮操作 */
function handleRefreshCache() {
  refreshCache().then(() => {
    proxy?.$modal.msgSuccess(t('dict.refreshSuccess'));
  });
}

getList();
</script>
