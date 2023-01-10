<template>
   <div class="app-container">
      <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch">
         <el-form-item :label="$t('dict.name')" prop="dictType">
            <el-select v-model="queryParams.dictType" style="width: 200px">
               <el-option
                  v-for="item in typeOptions"
                  :key="item.dictId"
                  :label="item.dictName"
                  :value="item.dictType"
               />
            </el-select>
         </el-form-item>
         <el-form-item :label="$t('dict.tag')" prop="dictLabel">
            <el-input
               v-model="queryParams.dictLabel"
               :placeholder="$t('dict.tagPlaceholder')"
               clearable
               @keyup.enter="handleQuery"
            />
         </el-form-item>
         <el-form-item :label="$t('user.status')" prop="status">
            <el-select v-model="queryParams.status" :placeholder="$t('dict.dataStatus')" clearable style="width: 200px">
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
               type="warning"
               plain
               icon="Close"
               @click="handleClose"
            >{{ $t('tagsView.close') }}</el-button>
         </el-col>
         <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
      </el-row>

      <el-table v-loading="loading" :data="dataList" @selection-change="handleSelectionChange">
         <el-table-column type="selection" width="55" align="center" />
         <el-table-column :label="$t('dict.code')" align="center" prop="dictCode" />
         <el-table-column :label="$t('dict.tag')" align="center" prop="dictLabel">
            <template v-if="useAppStore().lang == 'zh'" #default="scope">
               <span v-if="scope.row.listClass == '' || scope.row.listClass == 'default'">{{ scope.row.dictLabel }}</span>
               <el-tag v-else :type="scope.row.listClass == 'primary' ? '' : scope.row.listClass">{{ scope.row.dictLabel }}</el-tag>
            </template>
            <template v-if="useAppStore().lang == 'en'" #default="scope">
               <span v-if="scope.row.listClass == '' || scope.row.listClass == 'default'">{{ scope.row.dictLabelEn }}</span>
               <el-tag v-else :type="scope.row.listClass == 'primary' ? '' : scope.row.listClass">{{ scope.row.dictLabelEn }}</el-tag>
            </template>
            <template v-if="useAppStore().lang == 'id'" #default="scope">
               <span v-if="scope.row.listClass == '' || scope.row.listClass == 'default'">{{ scope.row.dictLabelId }}</span>
               <el-tag v-else :type="scope.row.listClass == 'primary' ? '' : scope.row.listClass">{{ scope.row.dictLabelId }}</el-tag>
            </template>
         </el-table-column>
         <el-table-column :label="$t('dict.value')" align="center" prop="dictValue" />
         <el-table-column :label="$t('dict.sort')" align="center" prop="dictSort" />
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
         <el-table-column :label="$t('user.operate')" align="center" width="150" class-name="small-padding fixed-width">
            <template #default="scope">
               <el-button
                  type="primary"
                  icon="Edit"
                  @click="handleUpdate(scope.row)"
                  v-hasPermi="['system:dict:edit']"
                  link
               >{{ $t('button.edit') }}</el-button>
               <el-button
                  type="primary"
                  icon="Delete"
                  @click="handleDelete(scope.row)"
                  v-hasPermi="['system:dict:remove']"
                  link
               >{{ $t('button.delete') }}</el-button>
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
         <el-form ref="dataRef" :model="form" :rules="rules" label-width="100px">
            <el-form-item :label="$t('dict.type')">
               <el-input v-model="form.dictType" :disabled="true" />
            </el-form-item>
            <el-form-item :label="$t('dict.dataLabel')" prop="dictLabel">
               <el-input v-model="form.dictLabel" :placeholder="$t('dict.dataLabelPlaceholder')" />
            </el-form-item>
            <el-form-item :label="$t('dict.dataValue')" prop="dictValue">
               <el-input v-model="form.dictValue" :placeholder="$t('dict.dataValuePlaceholder')" />
            </el-form-item>
            <el-form-item :label="$t('dict.styleAttribute')" prop="cssClass">
               <el-input v-model="form.cssClass" :placeholder="$t('dict.styleAttributePlaceholder')" />
            </el-form-item>
            <el-form-item :label="$t('menu.displaySort')" prop="dictSort">
               <el-input-number v-model="form.dictSort" controls-position="right" :min="0" />
            </el-form-item>
            <el-form-item :label="$t('dict.listClass')" prop="listClass">
               <el-select v-model="form.listClass">
                  <el-option
                     v-for="item in listClassOptions"
                     :key="item.value"
                     :label="item.label + '(' + item.value + ')'"
                     :value="item.value"
                  ></el-option>
               </el-select>
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

<script lang="ts" setup name="Data">
import { optionselect as getDictOptionselect, getType } from "@/api/system/dict/type";
import { listData, getData, delData, addData, updateData } from "@/api/system/dict/data";
import type { QueryParams, AddParams  } from "@/api/system/dict/data"
import useAppStore from "@/stores/modules/app";
import { ComponentInternalInstance, getCurrentInstance, reactive, Ref, ref, toRefs } from "vue";
import { ElForm } from "element-plus";
import { useRoute } from "vue-router";
import { parseTime } from "@/utils/ruoyi";
import i18n from '@/lang/index';

const {t} = i18n.global;
const queryRef = ref<InstanceType<typeof ElForm>>()
const dataRef = ref<InstanceType<typeof ElForm>>()
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { sys_normal_disable } = proxy?.useDict("sys_normal_disable");

const dataList: Ref<Row[]> = ref([]);
const open = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids: Ref<number[]> = ref([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const title = ref("");
const defaultDictType = ref("");
const typeOptions: Ref<TypeOptions[]> = ref([]);
const route = useRoute();
// 数据标签回显样式
const listClassOptions = ref([
  { value: "default", label: "默认" }, 
  { value: "primary", label: "主要" }, 
  { value: "success", label: "成功" },
  { value: "info", label: "信息" },
  { value: "warning", label: "警告" },
  { value: "danger", label: "危险" }
]);

interface Row {
   searchValue: string | null
   createBy: string
   createTime: string
   updateBy: string | null
   updateTime: string | null
   remark: string
   params: QueryParams
   cssClass: string
   default: boolean
   dictCode: number
   dictLabel: string
   dictLabelEn: string
   dictLabelId: string
   dictSort: number
   dictType: string
   dictValue: string
   isDefault: string
   listClass: string
   status: string
}

interface Data {
   form: AddParams
   queryParams: QueryParams 
   rules:{
      dictLabel: [{
         required: boolean
         message: string
         trigger: string
      }]
      dictValue: [{
         required: boolean
         message: string
         trigger: string 
      }]
      dictSort: [{
         required: boolean
         message: string
         trigger: string  
      }]
   };
}

interface TypeOptions {
   dictId: number
   dictName: string
   dictType: string
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
    dictLabel: [{ required: true, message: t('dict.dataLabelRules'), trigger: "blur" }],
    dictValue: [{ required: true, message: t('dict.dataValueRules'), trigger: "blur" }],
    dictSort: [{ required: true, message: t('dict.sortRules'), trigger: "blur" }]
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询字典类型详细 */
function getTypes(dictId) {
  getType(dictId).then(response => {
    queryParams.value.dictType = response.data.dictType;
    defaultDictType.value = response.data.dictType;
    getList();
  });
}

/** 查询字典类型列表 */
function getTypeList() {
  getDictOptionselect().then(response => {
    typeOptions.value = response.data;
  });
}
/** 查询字典数据列表 */
function getList() {
  loading.value = true;
  listData(queryParams.value).then(response => {
    dataList.value = response.rows;
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
    dictCode: undefined,
    dictLabel: undefined,
    dictValue: undefined,
    cssClass: undefined,
    listClass: "default",
    dictSort: 0,
    status: "0",
    remark: undefined
  };
  dataRef.value?.resetFields();
//   proxy?.resetForm("dataRef");
}
/** 搜索按钮操作 */
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}
/** 返回按钮操作 */
function handleClose() {
  const obj = { path: "/system/dict" };
  proxy?.$tab.closeOpenPage(obj.path);
}
/** 重置按钮操作 */
function resetQuery() {
  queryRef.value?.resetFields()
  queryParams.value.dictType = defaultDictType.value;
  handleQuery();
}
/** 新增按钮操作 */
function handleAdd() {
  reset();
  open.value = true;
  title.value = t('dict.addDictData');
  form.value.dictType = queryParams.value.dictType;
}
/** 多选框选中数据 */
function handleSelectionChange(selection) {
  ids.value = selection.map(item => item.dictCode);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}
/** 修改按钮操作 */
function handleUpdate(row: Row) {
  reset();
  const dictCode = row.dictCode || ids.value;
  getData(dictCode).then(response => {
    form.value = response.data;
    open.value = true;
    title.value = t('dict.modifyDictData');
  });
}
/** 提交按钮 */
function submitForm() {
//   proxy.$refs["dataRef"].validate((valid: any) => {
   dataRef.value?.validate(valid => {
    if (valid) {
      if (form.value.dictCode != undefined) {
        updateData(form.value).then(response => {
          proxy?.$modal.msgSuccess(t('button.successModify'));
          open.value = false;
          getList();
        });
      } else {
        addData(form.value).then(response => {
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
  const dictCodes = row.dictCode || ids.value;
  proxy?.$modal.confirm(t('dict.dictconfirmDelete') + dictCodes + t('user.confirmDelete2')).then(function() {
    return delData(dictCodes);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess(t('user.succesDeleted'));
  }).catch(() => {});
}
/** 导出按钮操作 */
function handleExport() {
  proxy?.$download("system/dict/data/export", {
    ...queryParams.value
  }, `dict_data_${new Date().getTime()}.xlsx`);
}

getTypes(route.params && route.params.dictId);
getTypeList();
</script>
