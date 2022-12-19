<template>
   <div class="app-container">
      <div class="table-box">
         <div class="card table-search" v-show="showSearch">   
            <el-form :model="queryParams" ref="queryRef" :inline="true" label-width="150px">
               <el-form-item :label="$t('notice.title')" prop="noticeTitle">
                  <el-input
                     v-model="queryParams.noticeTitle"
                     :placeholder="$t('notice.titlePlaceholder')"
                     clearable
                     @keyup.enter="handleQuery"
                  />
               </el-form-item>
               <el-form-item :label="$t('notice.author')" prop="createBy"  v-show="showExtend">
                  <el-input
                     v-model="queryParams.createBy"
                     :placeholder="$t('notice.authorPlaceholder')"
                     clearable
                     @keyup.enter="handleQuery"
                  />
               </el-form-item>
               <el-form-item :label="$t('notice.type')" prop="noticeType">
                  <el-select v-model="queryParams.noticeType" :placeholder="$t('notice.typePlaceholder')" clearable>
                     <el-option
                        v-for="dict in sys_notice_type"
                        :key="dict.value"
                        :label="dict.label"
                        :value="dict.value"
                     />
                  </el-select>
               </el-form-item>

            </el-form>
            <div class="search-operation">
                        <extend-toolbar v-model:showExtend="showExtend" ></extend-toolbar>
                        <el-button type="primary" icon="Search" @click="handleQuery">{{ $t('button.search') }}</el-button>
                        <el-button icon="Refresh" @click="resetQuery">{{ $t('button.reset') }}</el-button>                    
            </div>
         </div>   
         <div class="card table-box">
			   <div class="table-header">	
               <el-row :gutter="10" class="mb8">
                  <el-col :span="1.5">
                     <el-button
                        type="primary"
                        plain
                        icon="Plus"
                        @click="handleAdd"
                        v-hasPermi="['system:notice:add']"
                     >{{ $t('button.add') }}</el-button>
                  </el-col>
                  <el-col :span="1.5">
                     <el-button
                        type="success"
                        plain
                        icon="Edit"
                        :disabled="single"
                        @click="handleUpdate"
                        v-hasPermi="['system:notice:edit']"
                     >{{ $t('button.edit') }}</el-button>
                  </el-col>
                  <el-col :span="1.5">
                     <el-button
                        type="danger"
                        plain
                        icon="Delete"
                        :disabled="multiple"
                        @click="handleDelete"
                        v-hasPermi="['system:notice:remove']"
                     >{{ $t('button.delete') }}</el-button>
                  </el-col>

                  <right-toolbar v-model:showSearch="showSearch" @queryTable="getList" :columns="columns"></right-toolbar>
                  
               </el-row>
            </div>


            <el-table v-loading="loading" :data="noticeList" @selection-change="handleSelectionChange">
               <el-table-column type="selection" width="55" align="center" />
               <el-table-column :label="$t('user.serialRole')" align="center" prop="noticeId" v-if="columns[0].visible" width="120" />
               <el-table-column
                  :label="$t('notice.title')"
                  align="center"
                  prop="noticeTitle" 
                  v-if="columns[1].visible"
                  :show-overflow-tooltip="true"
               />
               <el-table-column :label="$t('notice.typePlaceholder')" align="center" prop="noticeType" v-if="columns[1].visible" width="190">
                  <template #default="scope">
                     <dict-tag :options="sys_notice_type" :value="scope.row.noticeType" />
                  </template>
               </el-table-column>
               <el-table-column :label="$t('user.status')" align="center" prop="status" v-if="columns[2].visible" width="100">
                  <template #default="scope">
                     <dict-tag :options="sys_notice_status" :value="scope.row.status" />
                  </template>
               </el-table-column>
               <el-table-column :label="$t('notice.author2')" align="center" prop="createBy" v-if="columns[3].visible" width="100" />
               <el-table-column :label="$t('user.creationtime')" align="center" prop="createTime" v-if="columns[4].visible" width="150">
                  <template #default="scope">
                     <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d}') }}</span>
                  </template>
               </el-table-column>
               <el-table-column :label="$t('user.operate')" align="center" class-name="small-padding fixed-width">
                  <template #default="scope">
                     <el-button
                        type="primary"
                        icon="Edit"
                        @click="handleUpdate(scope.row)"
                        v-hasPermi="['system:notice:edit']"
                        link
                     >{{ $t('button.edit') }}</el-button>
                     <el-button
                        type="primary"
                        icon="Delete"
                        @click="handleDelete(scope.row)"
                        v-hasPermi="['system:notice:remove']"
                        link
                     >{{ $t('button.delete') }}</el-button>
                  </template>
               </el-table-column>
            </el-table>
         </div>
      
      <pagination
         v-show="total > 0"
         :total="total"
         v-model:page="queryParams.pageNum"
         v-model:limit="queryParams.pageSize"
         @pagination="getList"
      />
   </div>
      <!-- 添加或修改公告对话框 -->
      <el-dialog :title="title" v-model="open" width="780px" append-to-body>
         <el-form ref="noticeRef" :model="form" :rules="rules" label-width="80px">
            <el-row>
               <el-col :span="12">
                  <el-form-item :label="$t('notice.title')" prop="noticeTitle">
                     <el-input v-model="form.noticeTitle" :placeholder="$t('notice.titlePlaceholder')" />
                  </el-form-item>
               </el-col>
               <el-col :span="12">
                  <el-form-item :label="$t('notice.typePlaceholder')" prop="noticeType">
                     <el-select v-model="form.noticeType" :placeholder="$t('user.choosePlaceholder')">
                        <el-option
                           v-for="dict in sys_notice_type"
                           :key="dict.value"
                           :label="dict.label"
                           :value="dict.value"
                        ></el-option>
                     </el-select>
                  </el-form-item>
               </el-col>
               <el-col :span="24">
                  <el-form-item :label="$t('user.status')">
                     <el-radio-group v-model="form.status">
                        <el-radio
                           v-for="dict in sys_notice_status"
                           :key="dict.value"
                           :label="dict.value"
                        >{{ dict.label }}</el-radio>
                     </el-radio-group>
                  </el-form-item>
               </el-col>
               <el-col :span="24">
                  <el-form-item :label="$t('notice.content')">
                     <el-input
                        :rows="6"
                        type="textarea"
                        :placeholder="$t('user.remarkPlaceholder')"
                        v-model="form.noticeContent"
                     />
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

<script lang="ts" setup name="Notice">
import { listNotice, getNotice, delNotice, addNotice, updateNotice } from "@/api/system/notice";
import type { QueryParams, AddParams } from "@/api/system/notice"
import i18n from '@/lang';
import { ComponentInternalInstance, getCurrentInstance, reactive, Ref, ref, toRefs } from "vue";
import { ElForm } from "element-plus";
import { parseTime } from "@/utils/ruoyi";

const {t} = i18n.global;
const queryRef = ref<InstanceType<typeof ElForm>>()
const noticeRef = ref<InstanceType<typeof ElForm>>()
const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const { sys_notice_status, sys_notice_type } = proxy?.useDict("sys_notice_status", "sys_notice_type");

const noticeList: Ref<Row[]> = ref([]);
const open = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const showExtend = ref(false);
const ids: Ref<number[]> = ref([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const title = ref("");

interface Row {
   searchValue: string | null;
   createBy: string;
   createTime: string;
   updateBy: string;
   updateTime: string | null;
   remark: string;
   params: QueryParams;
   noticeId: number;
   noticeTitle: string;
   noticeType: string;
   noticeContent: string;
   status: string;
}

interface Data {
   form: AddParams;
   queryParams: QueryParams;  
   rules:{
      noticeTitle: [{
         required: boolean;
         message: string;
         trigger: string;
      }];
      noticeType: [{
         required: boolean;
         message: string;
         trigger: string;     
      }];
   };
}

const data: Data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    noticeTitle: undefined,
    createBy: undefined,
    status: undefined
  },
  rules: {
    noticeTitle: [{ required: true, message: t('notice.titleRules'), trigger: "blur" }],
    noticeType: [{ required: true, message: t('notice.typeRules'), trigger: "change" }]
  },
});

//show columns
const columns = ref([
  { key: 0, label: t('user.serialRole'), visible: true },
  { key: 1, label: t('notice.typePlaceholder'), visible: true },
  { key: 2, label: t('user.status'), visible: true },
  { key: 3, label: t('notice.author2'), visible: true },
  { key: 4, label: t('user.creationtime'), visible: true }
]);


/*
  const form = reactive({});
  const queryParams: reactive<queryParams>( {
    pageNum: 1,
    pageSize: 10,
    noticeTitle: undefined,
    createBy: undefined,
    status: undefined
  })
*/


const { queryParams, form, rules } = toRefs(data);

/** 查询公告列表 */
function getList() {
  loading.value = true;
  listNotice(queryParams.value).then(response => {
    noticeList.value = response.rows;
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
    noticeId: undefined,
    noticeTitle: undefined,
    noticeType: undefined,
    noticeContent: undefined,
    status: "0"
  };
  noticeRef.value?.resetFields();
//   proxy.resetForm("noticeRef");
}
/** 搜索按钮操作 */
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}
/** 重置按钮操作 */
function resetQuery() {
   queryRef.value?.resetFields();
  handleQuery();
}
/** 多选框选中数据 */
function handleSelectionChange(selection) {
  ids.value = selection.map(item => item.noticeId);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}
/** 新增按钮操作 */
function handleAdd() {
  reset();
  open.value = true;
  title.value = t('notice.addNotice');
}
/**修改按钮操作 */
function handleUpdate(row: Row) {
  reset();
  const noticeId = row.noticeId || ids.value;
  getNotice(noticeId).then(response => {
    form.value = response.data;
    open.value = true;
    title.value = t('notice.update');
  });
}
/** 提交按钮 */
function submitForm() {
  noticeRef.value?.validate(valid => {
    if (valid) {
      if (form.value.noticeId != undefined) {
        updateNotice(form.value).then(response => {
          proxy?.$modal.msgSuccess(t('button.successModify'));
          open.value = false;
          getList();
        });
      } else {
        addNotice(form.value).then(response => {
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
  const noticeIds = row.noticeId || ids.value
  proxy?.$modal.confirm(t('notice.confirmDelete') + noticeIds + t('user.confirmDelete2')).then(function() {
    return delNotice(noticeIds);
  }).then(() => {
    getList();
    proxy?.$modal.msgSuccess(t('user.succesDeleted'));
  }).catch(() => {});
}

getList();
</script>


