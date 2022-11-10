<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" >
      <el-form-item :label="$t('login.username')" prop="userName">
        <el-input
          v-model="queryParams.userName"
          :placeholder="$t('login.username')"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('mbti.result')" prop="result">
        <el-select
          v-model="queryParams.result"
          :placeholder="$t('mbti.result')"
          clearable
          @keyup.enter="handleQuery"
        >
          <el-option
            v-for="dict in sys_mbti_result"
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
          v-hasPermi="['hr:mbti:add']"
        >{{ $t('button.add') }}</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="Edit"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['hr:mbti:edit']"
        >{{ $t('button.edit') }}</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="Delete"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['hr:mbti:remove']"
        >{{ $t('button.delete') }}</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="Download"
          @click="handleExport"
          v-hasPermi="['hr:mbti:export']"
        >{{$t('button.export')}}</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="mbtiList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column :label="$t('login.username')" align="center" prop="userName" />
      <el-table-column :label="$t('mbti.answer')" align="center" prop="answer" />
      <el-table-column :label="$t('mbti.result')" align="center" prop="result" />
      <el-table-column :label="$t('user.operate')" align="center" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-button
            type="text"
            icon="Edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['hr:mbti:edit']"
          >{{ $t('button.edit') }}</el-button>
          <el-button
            type="text"
            icon="Delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['hr:mbti:remove']"
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

    <!-- 添加或修改MBTI Test对话框 -->
    <el-dialog :title="title" v-model="open" width="500px" append-to-body>
      <el-form ref="mbtiRef" :model="form" :rules="rules" >
        <el-form-item :label="$t('login.username')" prop="userName">
          <el-input v-model="form.userName" :placeholder="$t('login.username')" />
        </el-form-item>
        <el-form-item :label="$t('mbti.answer')" prop="answer">
          <el-input v-model="form.answer" :placeholder="$t('mbti.answer')" />
        </el-form-item>
        <el-form-item :label="$t('mbti.result')" prop="result">
          <el-select v-model="form.result" :placeholder="$t('mbti.result')" >
            <el-option
              v-for="dict in sys_mbti_result"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            />
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

<script setup name="Mbti">
import { listMbti, getMbti, delMbti, addMbti, updateMbti } from "@/api/hr/mbti";
import i18n from '@/lang/index';

const {t} = i18n.global;
const { proxy } = getCurrentInstance();
const { sys_mbti_result } = proxy.useDict( "sys_mbti_result");

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

/** 查询MBTI Test列表 */
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
  title.value = "添加MBTI Test";
}

/** 修改按钮操作 */
function handleUpdate(row) {
  reset();
  const _userId = row.userId || ids.value
  getMbti(_userId).then(response => {
    form.value = response.data;
    open.value = true;
    title.value = "修改MBTI Test";
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
  proxy.$modal.confirm('是否确认删除MBTI Test编号为"' + _userIds + '"的数据项？').then(function() {
    return delMbti(_userIds);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess(t('user.succesDeleted'));
  }).catch(() => {});
}

/** 导出按钮操作 */
function handleExport() {
  proxy.download('hr/mbti/export', {
    ...queryParams.value
  }, `mbti_${new Date().getTime()}.xlsx`)
}

getList();
</script>
