<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch">
      <el-form-item :label="$t('book.title')" prop="bookTitle">
        <el-input
          v-model="queryParams.bookTitle"
          :placeholder="$t('book.titlePlaceholder')"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('book.category')" prop="categoryId">
        <el-select
          v-model="queryParams.categoryId"
          :placeholder="$t('book.category')"
          clearable
        >
          <el-option
            v-for="item in categoryOptions"
            :key="item.categoryId"
            :label="item.categoryName"
            :value="item.categoryId"
          />
          <addCategory/>      
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
      <el-table-column :label="$t('book.isbn')" align="center" prop="isbn" width="145" />
      <el-table-column label="" align="center" prop="bookImage" width="100">
        <template #default="scope">
          <image-preview :src="scope.row.bookImage" :width="50" :height="70"/>
        </template>
      </el-table-column>
      <el-table-column :label="$t('book.title')" align="center" prop="bookTitle" width="250" :show-overflow-tooltip = "true"/>
      <el-table-column :label="$t('book.category')" align="center" prop="category.categoryName" />
      <el-table-column :label="$t('notice.author')" align="center" prop="author" width="170" :show-overflow-tooltip = "true"/>
      <el-table-column :label="$t('book.shelfLabels')" align="center" prop="location.location" />
      <el-table-column :label="$t('book.cdStatus')" align="center" prop="cdStatus" >
        <template #default="scope">
          <el-switch
             v-model="scope.row.cdStatus"
             active-value="0"
             inactive-value="1"
             @change="handleStatusChange(scope.row)"
          ></el-switch>
       </template>
      </el-table-column>
      <el-table-column :label="$t('book.synopsis')" align="center" prop="synopsis" width="200" :show-overflow-tooltip="true" />
      <el-table-column :label="$t('button.language')" align="center" prop="language" >
        <template #default="scope">
          <dict-tag :options="sys_language" :value="scope.row.language" />
        </template>
      </el-table-column>
      <!-- <el-table-column label="公告状态" align="center" prop="status" /> -->
      <el-table-column :label="$t('user.operate')" align="center" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-button
            type="primary"
            icon="Edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:book:edit']"
            link
          >{{ $t('button.edit') }}</el-button>
          <el-button
            type="primary"
            icon="Delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:book:remove']"
            link
          >{{ $t('button.delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改System Book Eelic对话框 -->
    <el-dialog :title="title" v-model="open" width="500px" append-to-body>
      <el-form ref="bookRef" :model="form" :rules="rules" >
        <el-form-item label="">
          <image-upload v-model="form.bookImage" limit="1"/>
        </el-form-item>
        <el-form-item :label="$t('book.isbn')" prop="isbn">
          <el-input v-model="form.isbn" :placeholder="$t('book.isbnPlaceholder')" />
        </el-form-item>
        <el-form-item :label="$t('book.title')" prop="bookTitle">
          <el-input v-model="form.bookTitle" :placeholder="$t('book.titlePlaceholder')" />
        </el-form-item>
        <el-form-item :label="$t('book.category')" prop="categoryId">
          <el-select v-model="form.categoryId" :placeholder="$t('book.category')" >
            <el-option
            v-for="item in categoryOptions"
            :key="item.categoryId"
            :label="item.categoryName"
            :value="item.categoryId"
          />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('notice.author')" prop="author">
          <el-input v-model="form.author" :placeholder="$t('notice.authorPlaceholder')" />
        </el-form-item>
        <el-form-item :label="$t('book.shelfLabels')" prop="locationId">
          <el-select v-model="form.locationId" :placeholder="$t('book.shelfLabels')" >
            <el-option
            v-for="item in locationOptions"
            :key="item.locationId"
            :label="item.location"
            :value="item.locationId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('book.synopsis')" prop="synopsis">
          <el-input v-model="form.synopsis" type="textarea" maxlength="255" show-word-limit :placeholder="$t('book.synopsis')  "/>
        </el-form-item>
        <el-form-item :label="$t('button.language')" prop="language">
          <el-select v-model="form.language" :placeholder="$t('button.language')" >
            <el-option
            v-for="dict in sys_language"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
            ></el-option>
          </el-select>
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

<script lang="ts" setup name="Book">
import { listBook, getBook, delBook, addBook, updateBook, changeCdStatus } from "@/api/hr/book";
import type { QueryParams, AddParams } from "@/api/hr/book";
import { listCategory } from "@/api/hr/category";
import { listLocation } from "@/api/hr/location";
import addCategory from '@/views/erp/hr/book/category/AddCategory/index.vue';
import i18n from '@/lang/index';
import { ComponentInternalInstance, getCurrentInstance, ref, Ref, toRefs, reactive } from "vue";
import type { ElForm } from "element-plus";

const {t} = i18n.global;
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { sys_language } = proxy?.useDict("sys_language");

const bookList = ref([]);
const open = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const title = ref("");
const categoryOptions: Ref<categoryOptions[]> = ref([]);
const locationOptions: Ref<locationOptions[]> = ref([]);
const queryRef = ref<InstanceType<typeof ElForm>>();
const bookRef = ref<InstanceType<typeof ElForm>>();

interface Row {
   searchValue: string | null
   createBy: string
   createTime: string
   updateBy: string | null
   updateTime: string | null
   remark: string | null
   params: QueryParams
   flag: boolean
   author: string
   bookId: string
   bookImage: string
   bookTitle: string
   categoryId: string
   cdStatus: string
   isbn: string
   language: string
   locationId: string
   status: string
   synopsis: string  
}

interface Data {
   form: AddParams;
   queryParams: QueryParams; 
   rules: {
     isbn: [{
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
     }]
     bookTitle: [{
        required: boolean
        message: string
        trigger: string
     }]
     categoryId: [{
        required: boolean
        message: string
        trigger: string
     }]
     author: [{
        required: boolean
        message: string
        trigger: string
     }]
     locationId: [{
        required: boolean
        message: string
        trigger: string
     }]
     synopsis: [{
        required: boolean
        message: string
        trigger: string
     }]
     language: [{
        required: boolean
        message: string
        trigger: string
     }] 
   }
}

interface categoryOptions {
   categoryId: string
   categoryName: string
   status: number
}

interface locationOptions{
   locationId: string
   location: string
   status: string
}

const data: Data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    isbn: undefined,
    bookTitle: null,
    bookImage: null,
    author: null,
    locationId: null,
    cdStatus: null,
    synopsis: null,
    language: null,
    status: null,
    categoryId: null,
  },
  rules: {
    isbn: [{ required: true, message: t('book.isbnRules'), trigger: "blur" },
           { min: 14, max: 17, message: t('book.isbnRules2'), trigger: 'blur' },
           { pattern: /^[0-9_-]+$/, message: t('book.isbnRules3'), trigger: "blur"}
          ],
    bookTitle: [{ required: true, message: t('book.bookTitleRules'), trigger: "blur" }],
    categoryId: [{ required: true, message: t('book.bookCategoryRules'), trigger: "blur" }],
    author: [{ required: true, message: t('book.authorRules'), trigger: "blur" }],
    locationId: [{ required: true, message: t('book.shelfLabelsRules'), trigger: "blur" }],
    synopsis: [{ required: true, message: t('book.synopsisRules'), trigger: "blur" }],
    language: [{ required: true, message: t('book.languageRules'), trigger: "blur" }],
    
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询System Book Eelic列表 */
function getList() {
  loading.value = true;
  listBook(queryParams.value).then(response => {
    bookList.value = response.rows;
    total.value = response.total;
    loading.value = false;
  });
  getLocationList();
  getCategoryList();
}

// 取消按钮
function cancel() {
  open.value = false;
  reset();
}

// 表单重置
function reset() {
  form.value = {
    bookId: null,
    isbn: null,
    bookTitle: null,
    bookImage: null,
    author: null,
    locationId: null,
    cdStatus: "0",
    synopsis: null,
    language: null,
    status: "0",
    createBy: null,
    createTime: null,
    updateBy: null,
    updateTime: null,
    categoryId: null,
  };
  bookRef.value?.resetFields();
  // proxy.resetForm("bookRef");
}

/** 搜索按钮操作 */
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}

/** 重置按钮操作 */
function resetQuery() {
  queryRef.value?.resetFields();
  // proxy.resetForm("queryRef");
  handleQuery();
}

// 多选框选中数据
function handleSelectionChange(selection) {
  ids.value = selection.map(item => item.bookId);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
function handleAdd() {
  getLocationList();
  getCategoryList();
  reset();
  open.value = true;
  title.value = t('book.addBook');
}

/** 修改按钮操作 */
function handleUpdate(row: Row) {
  getLocationList();
  getCategoryList();
  reset();
  const _bookId = row.bookId || ids.value
  getBook(_bookId).then(response => {
    form.value = response.data;
    open.value = true;
    title.value = t('book.editBook');
  });
}

/** 提交按钮 */
function submitForm() {
  // proxy.$refs["bookRef"].validate(valid => {
  bookRef.value?.validate(valid => {
    if (valid) {
      if (form.value.bookId != null) {
        updateBook(form.value).then(response => {
          proxy?.$modal.msgSuccess(t('button.successModify'));
          open.value = false;
          getList();
        });
      } else {
        addBook(form.value).then(response => {
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
  const _bookIds = row.bookId || ids.value;
  proxy?.$modal.confirm(t('book.confirmDelete') + _bookIds + t('user.confirmDelete2')).then(function() {
    return delBook(_bookIds);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess(t('user.succesDeleted'));
  }).catch(() => {});
}

/** 导出按钮操作 */
function handleExport() {
  proxy?.$download('system/book/export', {
    ...queryParams.value
  }, `book_${new Date().getTime()}.xlsx`)
}

function handleStatusChange(row: Row) {
  let text = row.cdStatus === "0" ? t('button.enable') : t('button.disable');
  proxy?.$modal.confirm(t('user.handleStatus1') + text + ' " " ' + row.bookTitle + t('user.handleStatus2')).then(function () {
    return changeCdStatus(row.bookId, row.cdStatus);
  }).then(() => {
    proxy?.$modal.msgSuccess(text + t('button.success'));
  }).catch(function () {
    row.cdStatus = row.cdStatus === "0" ? "1" : "0";
  });
}

function getCategoryList() {
  listCategory().then(response => {
    categoryOptions.value = response.rows;
  });
};

function getLocationList() {
  listLocation().then(response => {
    locationOptions.value = response.rows;
  });
};

getList();
</script>
