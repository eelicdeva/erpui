<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item :label="$t('SysProduct.parentId')" prop="parentId">
        <el-input
          v-model="queryParams.parentId"
          :placeholder="$t('SysProduct.parentIdPlaceholder')"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('SysProduct.productName')" prop="productName">
        <el-input
          v-model="queryParams.productName"
          :placeholder="$t('SysProduct.productNamePlaceholder')"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('SysProduct.orderNum')" prop="orderNum">
        <el-input
          v-model="queryParams.orderNum"
          :placeholder="$t('SysProduct.orderNumPlaceholder')"
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
          v-hasPermi="['eelic:product:add']"
        >{{ $t('button.add') }}</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="info"
          plain
          icon="Sort"
          @click="toggleExpandAll"
        >{{ $t('button.expand') }}</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table
      v-if="refreshTable"
      v-loading="loading"
      :data="productList"
      row-key="productId"
      :default-expand-all="isExpandAll"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column :label="$t('SysProduct.parentId')" prop="parentId" />
      <el-table-column :label="$t('SysProduct.productName')" align="center" prop="productName" />
      <el-table-column :label="$t('SysProduct.orderNum')" align="center" prop="orderNum" />
      <el-table-column :label="$t('SysProduct.status')" align="center" prop="status" />
      <el-table-column :label="$t('user.operate')" align="center" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-button
            type="text"
            icon="Edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['eelic:product:edit']"
          >{{ $t('button.edit') }}</el-button>
          <el-button
            type="text"
            icon="Plus"
            @click="handleAdd(scope.row)"
            v-hasPermi="['eelic:product:add']"
          >{{ $t('button.add') }}</el-button>
          <el-button
            type="text"
            icon="Delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['eelic:product:remove']"
          >{{ $t('button.delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加或修改产品对话框 -->
    <el-dialog :title="title" v-model="open" width="500px" append-to-body>
      <el-form ref="productRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item :label="$t('SysProduct.parentId')" prop="parentId">
          <el-tree-select
            v-model="form.parentId"
            :data="productOptions"
            :props="{ value: 'productId', label: 'productName', children: 'children' }"
            value-key="productId"
            :placeholder="$t('SysProduct.parentIdPlaceholder')"
            check-strictly
          />
        </el-form-item>
        <el-form-item :label="$t('SysProduct.productName')" prop="productName">
          <el-input v-model="form.productName" :placeholder="$t('SysProduct.productNamePlaceholder')" />
        </el-form-item>
        <el-form-item :label="$t('SysProduct.orderNum')" prop="orderNum">
          <el-input v-model="form.orderNum" :placeholder="$t('SysProduct.orderNumPlaceholder')" />
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

<script setup name="Product">
import { listProduct, getProduct, delProduct, addProduct, updateProduct } from "@/api/eelic/product";

const { proxy } = getCurrentInstance();

const productList = ref([]);
const productOptions = ref([]);
const open = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const title = ref("");
const isExpandAll = ref(true);
const refreshTable = ref(true);

const data = reactive({
  form: {},
  queryParams: {
    parentId: null,
    productName: null,
    orderNum: null,
    status: null
  },
  rules: {
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询产品列表 */
function getList() {
  loading.value = true;
  listProduct(queryParams.value).then(response => {
    productList.value = proxy.handleTree(response.data, "productId", "parentId");
    loading.value = false;
  });
}

/** 查询产品下拉树结构 */
function getTreeselect() {
  listProduct().then(response => {
    productOptions.value = [];
    const data = { productId: 0, productName: '顶级节点', children: [] };
    data.children = proxy.handleTree(response.data, "productId", "parentId");
    productOptions.value.push(data);
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
    productId: null,
    parentId: null,
    productName: null,
    orderNum: null,
    status: "0"

  };
  proxy.resetForm("productRef");
}

/** 搜索按钮操作 */
function handleQuery() {
  getList();
}

/** 重置按钮操作 */
function resetQuery() {
  proxy.resetForm("queryRef");
  handleQuery();
}

/** 新增按钮操作 */
function handleAdd(row) {
  reset();
  getTreeselect();
  if (row != null && row.productId) {
    form.value.parentId = row.productId;
  } else {
    form.value.parentId = 0;
  }
  open.value = true;
  title.value = "添加产品";
}

/** 展开/折叠操作 */
function toggleExpandAll() {
  refreshTable.value = false;
  isExpandAll.value = !isExpandAll.value;
  nextTick(() => {
    refreshTable.value = true;
  });
}

/** 修改按钮操作 */
async function handleUpdate(row) {
  reset();
  await getTreeselect();
  if (row != null) {
    form.value.parentId = row.productId;
  }
  getProduct(row.productId).then(response => {
    form.value = response.data;
    open.value = true;
    title.value = "修改产品";
  });
}

/** 提交按钮 */
function submitForm() {
  proxy.$refs["productRef"].validate(valid => {
    if (valid) {
      if (form.value.productId != null) {
        updateProduct(form.value).then(response => {
          proxy.$modal.msgSuccess(t('button.successModify'));
          open.value = false;
          getList();
        });
      } else {
        addProduct(form.value).then(response => {
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
  proxy.$modal.confirm('是否确认删除产品编号为"' + row.productId + '"的数据项？').then(function() {
    return delProduct(row.productId);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess(t('user.succesDeleted'));
  }).catch(() => {});
}

getList();
</script>
