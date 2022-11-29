<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item :label="$t('book.shelfLabels')" prop="location">
        <el-input
          v-model="queryParams.location"
          :placeholder="$t('book.shelfLabels')"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('user.status')" prop="status">
        <el-select v-model="queryParams.status" :placeholder="$t('user.status')" clearable>
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
          v-hasPermi="['hr:location:add']"
        >{{ $t('button.add') }}</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="Edit"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['hr:location:edit']"
        >{{ $t('button.edit') }}</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="Delete"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['hr:location:remove']"
        >{{ $t('button.delete') }}</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="Download"
          @click="handleExport"
          v-hasPermi="['hr:location:export']"
        >{{ $t('button.export') }}</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="locationList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column :label="$t('book.shelfLabels')" align="center" prop="location" />
      <el-table-column :label="$t('user.status')" align="center" prop="status">
        <template #default="scope">
          <dict-tag :options="sys_normal_disable" :value="scope.row.status"/>
        </template>
      </el-table-column>
      <el-table-column :label="$t('user.operate')" align="center" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-button
            type="primary"
            icon="Edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['hr:location:edit']"
            link
          >{{ $t('button.edit') }}</el-button>
          <el-button
            type="primary"
            icon="Delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['hr:location:remove']"
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

    <!-- 添加或修改location对话框 -->
    <el-dialog :title="title" v-model="open" width="500px" append-to-body>
      <el-form ref="locationRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item :label="$t('book.shelfLabels')" prop="location">
          <el-input v-model="form.location" :placeholder="$t('book.shelfLabels')" />
        </el-form-item>
        <el-form-item :label="$t('user.status')">
          <el-radio-group v-model="form.status">
            <el-radio
              v-for="dict in sys_normal_disable"
              :key="dict.value"
              :label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
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

<script setup name="Location">
import { listLocation, getLocation, delLocation, addLocation, updateLocation } from "@/api/hr/location";
import i18n from '@/lang/index';

const {t} = i18n.global;
const { proxy } = getCurrentInstance();
const { sys_normal_disable } = proxy.useDict('sys_normal_disable');

const locationList = ref([]);
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
    location: null,
    status: null,
  },
  rules: {
    location: [{ required: true, message: t('book.locationRules'), trigger: "blur" },
               { min: 6, max: 6, message: t('book.locationRules2'), trigger: "blur" },
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询location列表 */
function getList() {
  loading.value = true;
  listLocation(queryParams.value).then(response => {
    locationList.value = response.rows;
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
    locationId: null,
    location: null,
    status: "0",
    delFlag: null,
    createBy: null,
    createTime: null,
    updateBy: null,
    updateTime: null
  };
  proxy.resetForm("locationRef");
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
  ids.value = selection.map(item => item.locationId);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
function handleAdd() {
  reset();
  open.value = true;
  title.value = "添加location";
}

/** 修改按钮操作 */
function handleUpdate(row) {
  reset();
  const _locationId = row.locationId || ids.value
  getLocation(_locationId).then(response => {
    form.value = response.data;
    open.value = true;
    title.value = "修改location";
  });
}

/** 提交按钮 */
function submitForm() {
  proxy.$refs["locationRef"].validate(valid => {
    if (valid) {
      if (form.value.locationId != null) {
        updateLocation(form.value).then(response => {
          proxy.$modal.msgSuccess("修改成功");
          open.value = false;
          getList();
        });
      } else {
        addLocation(form.value).then(response => {
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
  const _locationIds = row.locationId || ids.value;
  proxy.$modal.confirm('是否确认删除location编号为"' + _locationIds + '"的数据项？').then(function() {
    return delLocation(_locationIds);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess("删除成功");
  }).catch(() => {});
}

/** 导出按钮操作 */
function handleExport() {
  proxy.download('hr/location/export', {
    ...queryParams.value
  }, `location_${new Date().getTime()}.xlsx`)
}

getList();
</script>
