<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch">
      <el-form-item  :label="$t('book.title')" prop="bookTitle">
        <el-input
          v-model="queryParams.bookTitle"
          :placeholder="$t('book.titlePlaceholder')"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('book.category')"  prop="bookCategory">
        <el-input
          v-model="queryParams.bookCategory"
          :placeholder="$t('book.categoryPlaceholder')"
          clearable
          @keyup.enter.native="handleQuery"
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
      <el-table-column :label="$t('book.title')" align="center" prop="bookTitle" />
      <el-table-column label="" align="center" prop="bookImage" width="100">
        <template #default="scope">
          <image-preview :src="scope.row.bookImage" :width="50" :height="50"/>
        </template>
      </el-table-column>
      <el-table-column :label="$t('book.category')" align="center" prop="bookCategory" />
      <el-table-column :label="$t('user.status')" align="center" prop="status" width="100">
        <template #default="scope">
           <dict-tag :options="sys_available_status" :value="scope.row.status" />
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
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改System Book Eelic对话框 -->
    <el-dialog :title="title" v-model="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" >
        <el-form-item :label="$t('book.title')" prop="bookTitle">
          <el-input v-model="form.bookTitle" :placeholder="$t('book.titlePlaceholder')" />
        </el-form-item>
        <el-form-item label="">
          <image-upload v-model="form.bookImage"/>
        </el-form-item>
        <el-form-item :label="$t('book.category')" prop="bookCategory">
          <el-input v-model="form.bookCategory" :placeholder="$t('book.categoryPlaceholder')" />
        </el-form-item>
        <el-form-item :label="$t('user.status')">
          <el-radio-group v-model="form.status">
             <el-radio
                v-for="dict in sys_available_status"
                :key="dict.value"
                :label="dict.value"
             >{{ dict.label }}</el-radio>
          </el-radio-group>
       </el-form-item>
        <el-form-item :label="$t('user.remark')" prop="remark">
          <el-input v-model="form.remark" :placeholder="$t('book.remarkPlaceholder')" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">{{ $t('button.submit') }}</el-button>
        <el-button @click="cancel">{{ $t('button.cancel') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listBook, getBook, delBook, addBook, updateBook } from "@/api/system/book";

export default {
  name: "Book",
  dicts: ['sys_available_status'],
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // System Book Eelic表格数据
      bookList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        bookTitle: null,
        bookImage: null,
        bookCategory: null,
        status: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询System Book Eelic列表 */
    getList() {
      this.loading = true;
      listBook(this.queryParams).then(response => {
        this.bookList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        bookId: null,
        bookTitle: null,
        bookImage: null,
        bookCategory: null,
        status: "0",
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        remark: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.bookId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = this.$t('book.addBook');
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const bookId = row.bookId || this.ids
      getBook(bookId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改System Book Eelic";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.bookId != null) {
            updateBook(this.form).then(response => {
              this.$modal.msgSuccess(this.$t('button.successModify'));
              this.open = false;
              this.getList();
            });
          } else {
            addBook(this.form).then(response => {
              this.$modal.msgSuccess(this.$t('button.AddSuccess'));
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const bookIds = row.bookId || this.ids;
      this.$modal.confirm(this.$t('book.confirmDelete') + bookIds + this.$t('user.confirmDelete2')).then(function() {
        return delBook(bookIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess(this.$t('user.succesDeleted'));
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('system/book/export', {
        ...this.queryParams
      }, `book_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
