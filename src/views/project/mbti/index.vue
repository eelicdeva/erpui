<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="${comment}" prop="userName">
        <el-input
          v-model="queryParams.userName"
          placeholder="请输入${comment}"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="${comment}" prop="answer">
        <el-input
          v-model="queryParams.answer"
          placeholder="请输入${comment}"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="${comment}" prop="result">
        <el-input
          v-model="queryParams.result"
          placeholder="请输入${comment}"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">搜索{{ $t('button.search') }}</el-button>
        <el-button icon="Refresh" @click="resetQuery">重置{{ $t('button.reset') }}</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="Plus"
          @click="handleAdd"
          v-hasPermi="['project:mbti:add']"
        >新增{{ $t('button.add') }}</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="Edit"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['project:mbti:edit']"
        >修改{{ $t('button.edit') }}</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="Delete"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['project:mbti:remove']"
        >删除{{ $t('button.delete') }}</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="Download"
          @click="handleExport"
          v-hasPermi="['project:mbti:export']"
        >导出{{ $t('button.export') }}</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="mbtiList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="${comment}" align="center" prop="userId" />
      <el-table-column label="${comment}" align="center" prop="userName" />
      <el-table-column label="${comment}" align="center" prop="answer" />
      <el-table-column label="${comment}" align="center" prop="result" />
      <el-table-column :label="$t('user.operate')" align="center" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-button
            type="text"
            icon="Edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['project:mbti:edit']"
          >修改{{ $t('button.edit') }}</el-button>
          <el-button
            type="text"
            icon="Delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['project:mbti:remove']"
          >删除{{ $t('button.delete') }}</el-button>
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

    <!-- 添加或修改【请填写功能名称】对话框 -->
    <el-dialog :title="title" v-model="open" width="500px" append-to-body>
      <el-form ref="mbtiRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="${comment}" prop="userName">
          <el-input v-model="form.userName" placeholder="请输入${comment}" />
        </el-form-item>
        <el-form-item label="${comment}" prop="answer">
          <el-input v-model="form.answer" placeholder="请输入${comment}" />
        </el-form-item>
        <el-form-item label="${comment}" prop="result">
          <el-input v-model="form.result" placeholder="请输入${comment}" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="Mbti">
import { listMbti, getMbti, delMbti, addMbti, updateMbti } from "@/api/project/mbti";

const { proxy } = getCurrentInstance();

const mbtiList = ref([]);
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
    userName: null,
    answer: null,
    result: null
  },
  rules: {
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询【请填写功能名称】列表 */
function getList() {
  loading.value = true;
  listMbti(queryParams.value).then(response => {
    mbtiList.value = response.rows;
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
    userId: null,
    userName: null,
    answer: null,
    result: null
  };
  proxy.resetForm("mbtiRef");
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
  ids.value = selection.map(item => item.userId);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
function handleAdd() {
  reset();
  open.value = true;
  title.value = "添加【请填写功能名称】";
}

/** 修改按钮操作 */
function handleUpdate(row) {
  reset();
  const _userId = row.userId || ids.value
  getMbti(_userId).then(response => {
    form.value = response.data;
    open.value = true;
    title.value = "修改【请填写功能名称】";
  });
}

/** 提交按钮 */
function submitForm() {
  proxy.$refs["mbtiRef"].validate(valid => {
    if (valid) {
      if (form.value.userId != null) {
        updateMbti(form.value).then(response => {
          proxy.$modal.msgSuccess("修改成功");
          open.value = false;
          getList();
        });
      } else {
        addMbti(form.value).then(response => {
          proxy.$modal.msgSuccess("新增成功");
          open.value = false;
          getList();
        });
      }
    }
  });
}

/** 删除按钮操作 */
function handleDelete(row) {
  const _userIds = row.userId || ids.value;
  proxy.$modal.confirm('是否确认删除【请填写功能名称】编号为"' + _userIds + '"的数据项？').then(function() {
    return delMbti(_userIds);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess("删除成功");
  }).catch(() => {});
}

/** 导出按钮操作 */
function handleExport() {
  proxy.download('project/mbti/export', {
    ...queryParams.value
  }, `mbti_${new Date().getTime()}.xlsx`)
}

getList();
</script>
