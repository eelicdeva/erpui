<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item :label="$t('SysCustomer.customerName')" prop="customerName">
        <el-input
          v-model="queryParams.customerName"
          :placeholder="$t('SysCustomer.customerNamePlaceholder')"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('SysCustomer.phonenumber')" prop="phonenumber">
        <el-input
          v-model="queryParams.phonenumber"
          :placeholder="$t('SysCustomer.phonenumberPlaceholder')"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('SysCustomer.birthday')" prop="birthday">
        <el-date-picker clearable
          v-model="queryParams.birthday"
          type="date"
          value-format="YYYY-MM-DD"
          :placeholder="$t('SysCustomer.birthdayPlaceholder')">
        </el-date-picker>
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
          v-hasPermi="['eelic:customer:add']"
        >{{ $t('button.add') }}</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="Edit"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['eelic:customer:edit']"
        >{{ $t('button.edit') }}</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="Delete"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['eelic:customer:remove']"
        >{{ $t('button.delete') }}</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="Download"
          @click="handleExport"
          v-hasPermi="['eelic:customer:export']"
        >{{ $t('button.export') }}</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="customerList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column :label="$t('SysCustomer.customerId')" align="center" prop="customerId" />
      <el-table-column :label="$t('SysCustomer.customerName')" align="center" prop="customerName" />
      <el-table-column :label="$t('SysCustomer.phonenumber')" align="center" prop="phonenumber" />
      <el-table-column :label="$t('SysCustomer.sex')" align="center" prop="sex" />
      <el-table-column :label="$t('SysCustomer.birthday')" align="center" prop="birthday" width="180">
        <template #default="scope">
          <span>{{ parseTime(scope.row.birthday, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('SysCustomer.remark')" align="center" prop="remark" />
      <el-table-column :label="$t('user.operate')" align="center" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-button
            type="text"
            icon="Edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['eelic:customer:edit']"
          >{{ $t('button.edit') }}</el-button>
          <el-button
            type="text"
            icon="Delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['eelic:customer:remove']"
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

    <!-- 添加或修改客户对话框 -->
    <el-dialog :title="title" v-model="open" width="500px" append-to-body>
      <el-form ref="customerRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item :label="$t('SysCustomer.customerName')" prop="customerName">
          <el-input v-model="form.customerName" :placeholder="$t('SysCustomer.customerNamePlaceholder')" />
        </el-form-item>
        <el-form-item :label="$t('SysCustomer.phonenumber')" prop="phonenumber">
          <el-input v-model="form.phonenumber" :placeholder="$t('SysCustomer.phonenumberPlaceholder')" />
        </el-form-item>
        <el-form-item :label="$t('SysCustomer.birthday')" prop="birthday">
          <el-date-picker clearable
            v-model="form.birthday"
            type="date"
            value-format="YYYY-MM-DD"
            :placeholder="$t('SysCustomer.birthdayPlaceholder')">
          </el-date-picker>
        </el-form-item>
        <el-form-item :label="$t('SysCustomer.remark')" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-divider content-position="center">商品信息</el-divider>
        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button type="primary" icon="Plus" @click="handleAddSysGoods">添加</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" icon="Delete" @click="handleDeleteSysGoods">删除</el-button>
          </el-col>
        </el-row>
        <el-table :data="sysGoodsList" :row-class-name="rowSysGoodsIndex" @selection-change="handleSysGoodsSelectionChange" ref="sysGoods">
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column label="序号" align="center" prop="index" width="50"/>
          <el-table-column :label="$t('SysCustomer.name')" prop="name" width="150">
            <template #default="scope">
              <el-input v-model="scope.row.name" :placeholder="$t('SysCustomer.namePlaceholder')" />
            </template>
          </el-table-column>
          <el-table-column :label="$t('SysCustomer.weight')" prop="weight" width="150">
            <template #default="scope">
              <el-input v-model="scope.row.weight" :placeholder="$t('SysCustomer.weightPlaceholder')" />
            </template>
          </el-table-column>
          <el-table-column :label="$t('SysCustomer.price')" prop="price" width="150">
            <template #default="scope">
              <el-input v-model="scope.row.price" :placeholder="$t('SysCustomer.pricePlaceholder')" />
            </template>
          </el-table-column>
          <el-table-column :label="$t('SysCustomer.date')" prop="date" width="240">
            <template #default="scope">
              <el-date-picker clearable
                v-model="scope.row.date"
                type="date"
                value-format="YYYY-MM-DD"
                :placeholder="$t('SysCustomer.datePlaceholder')">
              </el-date-picker>
            </template>
          </el-table-column>
          <el-table-column :label="$t('SysCustomer.type')" prop="type" width="150">
            <template #default="scope">
              <el-select v-model="scope.row.type" :placeholder="$t('SysCustomer.typePlaceholder')">
                <el-option label="请选择字典生成" value="" />
              </el-select>
            </template>
          </el-table-column>
        </el-table>
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

<script setup name="Customer">
import { listCustomer, getCustomer, delCustomer, addCustomer, updateCustomer } from "@/api/eelic/customer";
import i18n from '@/lang/index';

const {t} = i18n.global;
const { proxy } = getCurrentInstance();

const customerList = ref([]);
const sysGoodsList = ref([]);
const open = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref([]);
const checkedSysGoods = ref([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const title = ref("");

const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    customerName: null,
    phonenumber: null,
    sex: null,
    birthday: null,
  },
  rules: {
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询客户列表 */
function getList() {
  loading.value = true;
  listCustomer(queryParams.value).then(response => {
    customerList.value = response.rows;
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
    customerId: null,
    customerName: null,
    phonenumber: null,
    sex: null,
    birthday: null,
    remark: null
  };
  sysGoodsList.value = [];
  proxy.resetForm("customerRef");
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
  ids.value = selection.map(item => item.customerId);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
function handleAdd() {
  reset();
  open.value = true;
  title.value = "添加客户";
}

/** 修改按钮操作 */
function handleUpdate(row) {
  reset();
  const _customerId = row.customerId || ids.value
  getCustomer(_customerId).then(response => {
    form.value = response.data;
    sysGoodsList.value = response.data.sysGoodsList;
    open.value = true;
    title.value = "修改客户";
  });
}

/** 提交按钮 */
function submitForm() {
  proxy.$refs["customerRef"].validate(valid => {
    if (valid) {
      form.value.sysGoodsList = sysGoodsList.value;
      if (form.value.customerId != null) {
        updateCustomer(form.value).then(response => {
          proxy.$modal.msgSuccess(t('button.successModify'));
          open.value = false;
          getList();
        });
      } else {
        addCustomer(form.value).then(response => {
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
  const _customerIds = row.customerId || ids.value;
  proxy.$modal.confirm('是否确认删除客户编号为"' + _customerIds + '"的数据项？').then(function() {
    return delCustomer(_customerIds);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess(t('user.succesDeleted'));
  }).catch(() => {});
}

/** 商品序号 */
function rowSysGoodsIndex({ row, rowIndex }) {
  row.index = rowIndex + 1;
}

/** 商品添加按钮操作 */
function handleAddSysGoods() {
  let obj = {};
  obj.name = "";
  obj.weight = "";
  obj.price = "";
  obj.date = "";
  obj.type = "";
  sysGoodsList.value.push(obj);
}

/** 商品删除按钮操作 */
function handleDeleteSysGoods() {
  if (checkedSysGoods.value.length == 0) {
    proxy.$modal.msgError("请先选择要删除的商品数据");
  } else {
    const sysGoodss = sysGoodsList.value;
    const checkedSysGoodss = checkedSysGoods.value;
    sysGoodsList.value = sysGoodss.filter(function(item) {
      return checkedSysGoodss.indexOf(item.index) == -1
    });
  }
}

/** 复选框选中数据 */
function handleSysGoodsSelectionChange(selection) {
  checkedSysGoods.value = selection.map(item => item.index)
}

/** 导出按钮操作 */
function handleExport() {
  proxy.download('eelic/customer/export', {
    ...queryParams.value
  }, `customer_${new Date().getTime()}.xlsx`)
}

getList();
</script>
