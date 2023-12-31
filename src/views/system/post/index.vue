<template>
   <div class="app-container">
      <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch">
         <el-form-item :label="$t('post.code')" prop="postCode">
            <el-input
               v-model="queryParams.postCode"
               :placeholder="$t('post.codePlaceholder')"
               clearable
               style="width: 200px"
               @keyup.enter="handleQuery"
            />
         </el-form-item>
         <el-form-item :label="$t('post.name')" prop="postName">
            <el-input
               v-model="queryParams.postName"
               :placeholder="$t('post.postPlaceholder')"
               clearable
               style="width: 200px"
               @keyup.enter="handleQuery"
            />
         </el-form-item>
         <el-form-item :label="$t('user.status')" prop="status">
            <el-select v-model="queryParams.status" :placeholder="$t('post.statusPlaceholder')" clearable style="width: 200px">
               <el-option
                  v-for="dict in sys_normal_disable"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
               />
            </el-select>
         </el-form-item>
         <el-form-item>
            <el-button type="primary" icon="Search" @click="handleQuery">{{$t('button.search')}}</el-button>
            <el-button icon="Refresh" @click="resetQuery">{{$t('button.reset')}}</el-button>
         </el-form-item>
      </el-form>

      <el-row :gutter="10" class="mb8">
         <el-col :span="1.5">
            <el-button
               type="primary"
               plain
               icon="Plus"
               @click="handleAdd"
               v-hasPermi="['system:post:add']"
            >{{$t('button.add')}}</el-button>
         </el-col>
         <el-col :span="1.5">
            <el-button
               type="success"
               plain
               icon="Edit"
               :disabled="single"
               @click="handleUpdate"
               v-hasPermi="['system:post:edit']"
            >{{$t('button.edit')}}</el-button>
         </el-col>
         <el-col :span="1.5">
            <el-button
               type="danger"
               plain
               icon="Delete"
               :disabled="multiple"
               @click="handleDelete"
               v-hasPermi="['system:post:remove']"
            >{{$t('button.delete')}}</el-button>
         </el-col>
         <el-col :span="1.5">
            <el-button
               type="warning"
               plain
               icon="Download"
               @click="handleExport"
               v-hasPermi="['system:post:export']"
            >{{$t('button.export')}}</el-button>
         </el-col>
         <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
      </el-row>

      <el-table v-loading="loading" :data="postList" @selection-change="handleSelectionChange">
         <el-table-column type="selection" width="55" align="center" />
         <el-table-column :label="$t('post.id')" align="center" prop="postId" />
         <el-table-column :label="$t('post.code')" align="center" prop="postCode" />
         <el-table-column :label="$t('post.name')" align="center" prop="postName" />
         <el-table-column :label="$t('post.sort')" align="center" prop="postSort" />
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

      <!-- 添加或修改岗位对话框 -->
      <el-dialog :title="title" v-model="open" width="500px" append-to-body>
         <el-form ref="postRef" :model="form" :rules="rules">
            <el-form-item :label="$t('post.name')" prop="postName">
               <el-input v-model="form.postName" :placeholder="$t('post.postPlaceholder')" />
            </el-form-item>
            <el-form-item :label="$t('post.code')" prop="postCode">
               <el-input v-model="form.postCode" :placeholder="$t('post.codePlaceholder2')" />
            </el-form-item>
            <el-form-item :label="$t('post.sequence')" prop="postSort">
               <el-input-number v-model="form.postSort" controls-position="right" :min="0" />
            </el-form-item>
            <el-form-item :label="$t('post.statusPlaceholder')" prop="status">
               <el-radio-group v-model="form.status">
                  <el-radio
                     v-for="dict in sys_normal_disable"
                     :key="dict.value"
                     :label="dict.value"
                  >{{ dict.label }}</el-radio>
               </el-radio-group>
            </el-form-item>
            <el-form-item :label="$t('user.remark')" prop="remark">
               <el-input v-model="form.remark" type="textarea" :placeholder="$t('user.remarkPlaceholder')" />
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

<script lang="ts" setup name="Post">
import { listPost, addPost, delPost, getPost, updatePost } from "@/api/system/post";
import type { QueryParams, AddParams } from "@/api/system/post";
import { ComponentInternalInstance, getCurrentInstance, reactive, ref, Ref, toRefs} from "vue";
import { ElForm } from "element-plus";
import { parseTime } from "@/utils/ruoyi";
import i18n from '@/lang/index';

const {t} = i18n.global;
const queryRef = ref<InstanceType<typeof ElForm>>();
const postRef = ref<InstanceType<typeof ElForm>>();
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { sys_normal_disable } = proxy?.useDict("sys_normal_disable");

const postList: Ref<Row[]> = ref([]);
const open = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const title = ref("");

interface Row {
   searchValue: string | null
   createBy: string
   createTime: string
   updateBy: string | null
   updateTime: string | null
   remark: string
   params: QueryParams
   flag: boolean
   postCode: string
   postId: number
   postName: string
   postSort: number
   status: string
}

interface Data {
   form: AddParams
   queryParams: QueryParams 
   rules:{
      postName: [{
         required: boolean
         message: string
         trigger: string
      }]
      postCode: [{
         required: boolean
         message: string
         trigger: string 
      }]
      postSort: [{
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
    postCode: undefined,
    postName: undefined,
    status: undefined
  },
  rules: {
    postName: [{ required: true, message: t('post.nameRules'), trigger: "blur" }],
    postCode: [{ required: true, message: t('post.codeRules'), trigger: "blur" }],
    postSort: [{ required: true, message: t('post.sortRules'), trigger: "blur" }],
  }
});

const { queryParams, form, rules } = toRefs(data);

const buttons = [
   {type: 'primary', text: t('button.edit'), icon: 'Edit', act : 'edit', permi: ['system:post:edit']}, 
   {type: 'primary', text: t('button.delete'), icon: 'Delete', act : 'delete', permi: ['system:post:remove']},
] as const

function handleButtonText(row: Row, act: string) {
    if( act == "edit" ){
      return handleUpdate(row);
    }
    if( act == "delete" ){
      return handleDelete(row);
    }
}

/** 查询岗位列表 */
function getList() {
  loading.value = true;
  listPost(queryParams.value).then(response => {
    postList.value = response.rows;
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
    postId: undefined,
    postCode: undefined,
    postName: undefined,
    postSort: 0,
    status: "0",
    remark: undefined
  };
  postRef.value?.resetFields();
//   proxy.resetForm("postRef");
}
/** 搜索按钮操作 */
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}
/** 重置按钮操作 */
function resetQuery() {
  queryRef.value?.resetFields()
  handleQuery();
}
/** 多选框选中数据 */
function handleSelectionChange(selection) {
  ids.value = selection.map(item => item.postId);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}
/** 新增按钮操作 */
function handleAdd() {
  reset();
  open.value = true;
  title.value = t('post.addPost');
}
/** 修改按钮操作 */
function handleUpdate(row: Row) {
  reset();
  const postId = row.postId || ids.value;
  getPost(postId).then(response => {
    form.value = response.data;
    open.value = true;
    title.value = t('post.modifyPost');
  });
}
/** 提交按钮 */
function submitForm() {
//   proxy.$refs["postRef"].validate(valid => {
   postRef.value?.validate(valid => {
    if (valid) {
      if (form.value.postId != undefined) {
        updatePost(form.value).then(response => {
          proxy?.$modal.msgSuccess(t('button.successModify'));
          open.value = false;
          getList();
        });
      } else {
        addPost(form.value).then(response => {
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
  const postIds = row.postId || ids.value;
  proxy?.$modal.confirm(t('post.confirmDelete') + postIds + t('user.confirmDelete2')).then(function() {
    return delPost(postIds);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess(t('user.succesDeleted'));
  }).catch(() => {});
}
/** 导出按钮操作 */
function handleExport() {
  proxy?.$download("system/post/export", {
    ...queryParams.value
  }, `post_${new Date().getTime()}.xlsx`);
}

getList();
</script>
