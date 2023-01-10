<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" >
      <el-form-item  :label="$t('book.title')" prop="bookTitle">
        <el-input
          v-model="queryParams.bookTitle"
          :placeholder="$t('book.titlePlaceholder')"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('book.category')" prop="bookImage">
        <el-select v-model="queryParams.bookImage" :placeholder="$t('book.category')" clearable>
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
          v-hasPermi="['system:loan:add']"
        >{{ $t('button.add') }}</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="Edit"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['system:loan:edit']"
        >{{ $t('button.edit') }}</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="Delete"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['system:loan:remove']"
        >{{ $t('button.delete') }}</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="Download"
          @click="handleExport"
          v-hasPermi="['system:loan:export']"
        >{{$t('button.export')}}</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="loanList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column :label="$t('book.isbn')" align="center" prop="isbn" />
      <el-table-column label="" align="center" prop="bookImage" width="100">
        <template #default="scope">
          <image-preview :src="scope.row.bookImage" :width="50" :height="70"/>
        </template>
      </el-table-column>
      <el-table-column :label="$t('book.title')" align="center" prop="bookTitle" />
      <el-table-column :label="$t('book.checkoutDate')" align="center" prop="checkoutDate" width="180">
        <template #default="scope">
          <span>{{ parseTime(scope.row.checkoutDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('book.returnDate')" align="center" prop="returnDate" width="180">
        <template #default="scope">
          <span>{{ parseTime(scope.row.returnDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('book.borrowerName')" align="center" prop="nameBorrower" />
      <el-table-column :label="$t('user.operate')" align="center" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-button
            type="primary"
            icon="Edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:loan:edit']"
            link
          >{{ $t('button.edit') }}</el-button>
          <el-button
            type="primary"
            icon="Delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:loan:remove']"
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

    <!-- 添加或修改Book Loan Management对话框 -->
    <el-dialog :title="title" v-model="open" width="500px" append-to-body>
      <el-form ref="loanRef" :model="form" :rules="rules">
        <el-form-item :label="$t('book.title')" prop="bookTitle">
          <el-select v-model="form.bookId" filterable :placeholder="$t('book.titlePlaceholder')" value-key="form.bookId">
            <el-option v-if="useAppStore().lang == 'zh'"
               v-for="item in bookOptions"
               :key="item.bookId"
               :label="item.bookTitle"
               :value="item.bookId"
            ></el-option>
            <el-option v-if="useAppStore().lang == 'id'"
               v-for="item in bookOptions"
               :key="item.bookId"
               :label="item.bookTitleId"
               :value="item.bookId"
            ></el-option>
            <el-option v-if="useAppStore().lang == 'en'"
               v-for="item in bookOptions"
               :key="item.bookId"
               :label="item.bookTitleEn"
               :value="item.bookId"
            ></el-option>
         </el-select>
        </el-form-item>
        <el-form-item :label="$t('book.borrowerName')" prop="nameBorrower">
          <el-input v-model="form.nameBorrower" :placeholder="$t('book.borrowerName')" />
        </el-form-item>
        <el-form-item :label="$t('book.checkoutDate')" prop="checkoutDate">
          <el-date-picker clearable
            v-model="form.checkoutDate"
            type="date"
            value-format="YYYY-MM-DD"
            :placeholder="$t('book.checkoutDatePlaceholder')">
          </el-date-picker>
        </el-form-item>
        <el-form-item :label="$t('book.returnDate')" prop="returnDate">
          <el-date-picker clearable
            v-model="form.returnDate"
            type="date"
            value-format="YYYY-MM-DD"
            :placeholder="$t('book.returnDatePlaceholder')">
          </el-date-picker>
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

<script lang="ts" setup name="Loan">
import { listLoan, getLoan, delLoan, addLoan, updateLoan } from "@/api/hr/loan";
import type { QueryParams, AddParams } from "@/api/hr/loan";
import { getAllBook } from "@/api/hr/book";
import { listCategory } from "@/api/hr/category";
import i18n from '@/lang/index';
import useAppStore from "@/stores/modules/app";
import addCategory from '@/views/erp/hr/book/category/AddCategory/index.vue';
import { ComponentInternalInstance, getCurrentInstance, reactive, ref, Ref, toRefs } from "vue";
import { parseTime } from "@/utils/ruoyi";
import type { ElForm } from "element-plus";

const {t} = i18n.global;
const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const loanList = ref([]);
const open = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const title = ref("");
const bookOptions: Ref<BookOptions[]> = ref([]);
const categoryOptions: Ref<CategoryOptions[]> = ref([]);
const queryRef = ref<InstanceType<typeof ElForm>>();
const loanRef = ref<InstanceType<typeof ElForm>>();

interface Data {
   form: AddParams;
   queryParams: QueryParams; 
   rules: {
     nameBorrower: [{
        required: boolean
        message: string
        trigger: string
     }]
     bookTitle: [{
        required: boolean
        message: string
        trigger: string
     }]
     checkoutDate: [{
        required: boolean
        message: string
        trigger: string
     }] 
   }
}

interface CategoryOptions {
   categoryId: string
   categoryName: string
   status: number
}

interface BookOptions {
   bookId: string
   bookTitle: string
   bookTitleEn: string
   bookTitleId: string
   bookImage: string
   isbn: string
}

const data: Data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    checkoutDate: null,
    returnDate: null,
    nameBorrower: null,
    bookTitle: null,
    bookImage: null,
    isbn: null,
  },
  rules: {
    nameBorrower: [{ required: true, message: t('book.borrowerRules'), trigger: "blur" }],
    bookTitle: [{ required: true, message: t('book.bookTitleRules'), trigger: "blur" }],
    checkoutDate : [{ required: true, message: t('book.checkoutDateRules'), trigger: "blur" }],
  },
});

const { queryParams, form, rules } = toRefs(data);

/** 查询Book Loan Management列表 */
function getList() {
  loading.value = true;
  listLoan(queryParams.value).then(response => {
    loanList.value = response.rows;
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
  form.value = {
    loanId: null,
    checkoutDate: null,
    returnDate: null,
    nameBorrower: null,
    bookTitle: null,
    bookTitleEn: null,
    bookTitleId: null,
    bookImage: null,
    isbn: null,
    bookId: null
  };
  loanRef.value?.resetFields();
  // proxy.resetForm("loanRef");
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
  ids.value = selection.map(item => item.loanId);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
function handleAdd() {
  getBookSelect();
  reset();
  open.value = true;
  title.value =  t('book.addLoan');
}

/** 修改按钮操作 */
function handleUpdate(row) {
  getBookSelect();
  reset();
  const _loanId = row.loanId || ids.value
  getLoan(_loanId).then(response => {
    form.value = response.data;
    open.value = true;
    title.value = t('book.editLoan');
  });
}

/** 提交按钮 */
function submitForm() {
  for (let i in bookOptions.value){
    if(form.value.bookId == bookOptions.value[i].bookId){
        form.value.bookTitle = bookOptions.value[i].bookTitle;
        form.value.bookTitleEn = bookOptions.value[i].bookTitleEn;
        form.value.bookTitleId = bookOptions.value[i].bookTitleId;
        form.value.bookImage = bookOptions.value[i].bookImage;
        form.value.isbn = bookOptions.value[i].isbn;
    }
  }
  // proxy.$refs["loanRef"].validate(valid => {
  loanRef.value?.validate(valid => {
    if (valid) {
      if (form.value.loanId != null) {
        updateLoan(form.value).then(response => {
          proxy?.$modal.msgSuccess(t('button.successModify'));
          open.value = false;
          getList();
        });
      } else {
        addLoan(form.value).then(response => {
          proxy?.$modal.msgSuccess(t('button.AddSuccess'));
          open.value = false;
          getList();
        });
      }
    }
  });
}

/** 删除按钮操作 */
function handleDelete(row) {
  const _loanIds = row.loanId || ids.value;
  proxy?.$modal.confirm(t('book.loanconfirmDelete') + _loanIds + t('user.confirmDelete2')).then(function() {
    return delLoan(_loanIds);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess(t('user.succesDeleted'));
  }).catch(() => {});
}

/** 导出按钮操作 */
function handleExport() {
  proxy?.$download('system/loan/export', {
    ...queryParams.value
  }, `loan_${new Date().getTime()}.xlsx`)
}

function getBookSelect() {
  getAllBook().then(response => {
    bookOptions.value = response.data
  });
  
}

function getCategoryList() {
  listCategory().then(response => {
    categoryOptions.value = response.rows;
  });
}

getCategoryList();
getBookSelect();
getList();
</script>
