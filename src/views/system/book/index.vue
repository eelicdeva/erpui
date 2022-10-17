<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch">
      <el-form-item  :label="$t('book.title')" prop="bookTitle">
        <el-input
          v-model="queryParams.bookTitle"
          :placeholder="$t('book.titlePlaceholder')"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('book.category')"  prop="bookCategory">
        <el-input
          v-model="queryParams.bookCategory"
          :placeholder="$t('book.categoryPlaceholder')"
          clearable
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
          @click="handleAdd"
          v-hasPermi="['system:book:add']"
        >{{ $t('button.add') }}</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="Edit"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['system:book:edit']"
        >{{ $t('button.edit') }}</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="Delete"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['system:book:remove']"
        >{{ $t('button.delete') }}</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="Download"
          @click="handleExport"
          v-hasPermi="['system:book:export']"
        >{{$t('button.export')}}</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="bookList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column :label="$t('user.serialRole')" align="center" prop="bookId" />

      <el-table-column :label="$t('book.title')" align="center" prop="bookTitle" :show-overflow-tooltip="true"/>
      <el-table-column label="图书简图" align="center" prop="bookImage" width="100">
        <template #default="scope">
          <image-preview :src="scope.row.bookImage" :width="50" :height="50"/>
        </template>
      </el-table-column>
      <el-table-column :label="$t('book.category')" align="center" prop="bookCategory" />
      <el-table-column :label="$t('user.status')" align="center" prop="status" width="100">
        <template #default="scope">
           <dict-tag 
           :options="sys_available_status" 
           :value="scope.row.status" />
        </template>
     </el-table-column>
      <el-table-column :label="$t('user.remark')" align="center" prop="remark" />
      <el-table-column :label="$t('user.operate')" align="center" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-button
            type="text"
            icon="Edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:book:edit']"
          >{{ $t('button.edit') }}</el-button>
          <el-button
            type="text"
            icon="Delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:book:remove']"
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

<!-- 添加或修改System Book Eelic对话框 -->
    <el-dialog :title="title" v-model="open" width="500px" append-to-body>
      <el-form ref="bookRef" :model="form" :rules="rules" >
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('book.title')" prop="bookTitle">
              <el-input v-model="form.bookTitle" :placeholder="$t('book.titlePlaceholder')" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="">
              <image-upload v-model="form.bookImage"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('book.category')" prop="bookCategory">
              <el-input v-model="form.bookCategory" 
              :placeholder="$t('book.categoryPlaceholder')" />
            </el-form-item>
          </el-col>            
               
          <el-col :span="24">           
            <el-form-item :label="$t('user.status')">
              <el-radio-group v-model="form.status">
                <el-radio
                    v-for="dict in sys_available_status"
                    :key="dict.value"
                    :label="dict.value">
                {{ dict.label }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>

        <el-col :span="12">
          <el-form-item :label="$t('user.remark')" prop="remark">
            <el-input v-model="form.remark" :placeholder="$t('book.remarkPlaceholder')" />
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
<!-- 添加或修改System Book Eelic对话框 -->

  </div>
</template>

<script setup>
import { listBook, getBook, delBook, addBook, updateBook } from "@/api/system/book";
import i18n from '@/lang/index';
const {t} = i18n.global;
const { proxy } = getCurrentInstance();
const { sys_available_status } = proxy.useDict("sys_available_status");

const bookList = ref([]);
const open = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const title = ref("");


const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    bookTitle: undefined,
    bookImage: undefined,
    bookCategory: undefined,
    status: undefined
  },
  rules: {
    bookTitle: [{ required: true, message: t('notice.titleRules'), trigger: "blur" }],
    bookCategory: [{ required: true, message: t('notice.typeRules'), trigger: "change" }]
  },
});

const { queryParams, form, rules } = toRefs(data);


    /** 查询System Book Eelic列表 */
function getList() {
  loading.value = true;
  listBook(queryParams.value).then(response => {
    bookList.value = response.rows;
    console.log("rows:" + response.rows);
    total.value = response.total;
    loading.value = false;

  });
}
    // 取消按钮
function cancel() {
  open.value = false;
  reset();
}
    // 表单重置
function reset() {
      form.value =  {
        bookId: undefined,
        bookTitle: undefined,
        bookImage: undefined,
        bookCategory: undefined,
        status: undefined,
        createBy: undefined,
        createTime: undefined,
        updateBy: undefined,
        updateTime: undefined,
        remark: undefined
      };
      proxy.resetForm("bookRef");
}
    /** 搜索按钮操作 */
function handleQuery() {
      queryParams.value.pageNum = 1;
      getList();
    }
    /** 重置按钮操作 */
function resetQuery() {
      proxy.resetForm("queryRef");
      handleQuery();
}
    // 多选框选中数据
function handleSelectionChange(selection) {
      ids.value = selection.map(item => item.bookId)
      single.value = selection.length!==1
      multiple.value = !selection.length
}
    /** 新增按钮操作 */
function handleAdd() {
      reset();
      open.value = true;
      title.value = t('book.addBook');
}
    /** 修改按钮操作 */
function handleUpdate(row) {
      reset();
      const bookId = row.bookId || ids.value
      getBook(bookId).then(response => {
        form.value = response.data;
        open.value = true;
        title.value = "修改System Book Eelic";
      });
}

    /** 提交按钮 */
function submitForm() {
      proxy.$refs["bookRef"].validate(valid => {
        if (valid) {
          if (form.value.bookId != null) {
            updateBook(form.value).then(response => {
              proxy.$modal.msgSuccess(t('button.successModify'));
              open.value = false;
              getList();
            });
          } else {
            addBook(form.value).then(response => {
              proxy.$modal.msgSuccess(t('button.AddSuccess'));
              open.value = false;
              getList();
            });
          }
        }
      });
}
    /** 删除按钮操作 */
function handleDelete(row) {
      const bookIds = row.bookId || this.ids;
      proxy.$modal.confirm(t('book.confirmDelete') + bookIds + t('user.confirmDelete2')).then(function() {
        return delBook(bookIds);
      }).then(() => {
        getList();
        proxy.$modal.msgSuccess(t('user.succesDeleted'));
      }).catch(() => {});
}
    /** 导出按钮操作 */
function handleExport() {
  proxy.download('system/book/export', {
    ...queryParams.value
  }, `post_${new Date().getTime()}.xlsx`);
}

getList();
</script>

