<template>
    <div class="app-container">
      <div class="table-box">
        <!-- card search -->
        <div class="card table-search" v-show="showSearch" >  
            <el-form :model="queryParams" ref="queryRef" :inline="true" label-width="120px">
              <el-form-item :label="$t('ErpProductDemo.skuLazada')" prop="skuLazada" v-show="showExtend">
                <el-input
                  v-model="queryParams.skuLazada"
                  :placeholder="$t('ErpProductDemo.skuLazadaPlaceholder')"
                  clearable
                  @keyup.enter="handleQuery"
                />
              </el-form-item>
              <el-form-item :label="$t('ErpProductDemo.skuEelic')" prop="skuEelic">
                <el-input
                  v-model="queryParams.skuEelic"
                  :placeholder="$t('ErpProductDemo.skuEelicPlaceholder')"
                  clearable
                  @keyup.enter="handleQuery"
                />
              </el-form-item>
              <el-form-item :label="$t('ErpProductDemo.skuNameLa')" prop="skuNameLa">
                <el-input
                  v-model="queryParams.skuNameLa"
                  :placeholder="$t('ErpProductDemo.skuNameLaPlaceholder')"
                  clearable
                  @keyup.enter="handleQuery"
                />
              </el-form-item>
              <el-form-item :label="$t('ErpProductDemo.model')" prop="model" v-show="showExtend">
                <el-input
                  v-model="queryParams.model"
                  :placeholder="$t('ErpProductDemo.modelPlaceholder')"
                  clearable
                  @keyup.enter="handleQuery"
                />
              </el-form-item>
              <el-form-item :label="$t('ErpProductDemo.packageWeight')" prop="packageWeight" v-show="showExtend">
                <el-input
                  v-model="queryParams.packageWeight"
                  :placeholder="$t('ErpProductDemo.packageWeightPlaceholder')"
                  clearable
                  @keyup.enter="handleQuery"
                />
              </el-form-item>
              <el-form-item :label="$t('ErpProductDemo.packageLength')" prop="packageLength" v-show="showExtend">
                <el-input
                  v-model="queryParams.packageLength"
                  :placeholder="$t('ErpProductDemo.packageLengthPlaceholder')"
                  clearable
                  @keyup.enter="handleQuery"
                />
              </el-form-item>
              <el-form-item :label="$t('ErpProductDemo.packageWidth')" prop="packageWidth" v-show="showExtend">
                <el-input
                  v-model="queryParams.packageWidth"
                  :placeholder="$t('ErpProductDemo.packageWidthPlaceholder')"
                  clearable
                  @keyup.enter="handleQuery"
                />
              </el-form-item>
              <el-form-item :label="$t('ErpProductDemo.packageHeight')" prop="packageHeight" v-show="showExtend">
                <el-input
                  v-model="queryParams.packageHeight"
                  :placeholder="$t('ErpProductDemo.packageHeightPlaceholder')"
                  clearable
                  @keyup.enter="handleQuery"
                />
              </el-form-item>
              <el-form-item :label="$t('ErpProductDemo.price')" prop="price" v-show="showExtend">
                <el-input
                  v-model="queryParams.price"
                  :placeholder="$t('ErpProductDemo.pricePlaceholder')"
                  clearable
                  @keyup.enter="handleQuery"
                />
              </el-form-item>
              <el-form-item :label="$t('ErpProductDemo.specialPrice')" prop="specialPrice" v-show="showExtend">
                <el-input
                  v-model="queryParams.specialPrice"
                  :placeholder="$t('ErpProductDemo.specialPricePlaceholder')"
                  clearable
                  @keyup.enter="handleQuery"
                />
              </el-form-item>
              <el-form-item :label="$t('ErpProductDemo.quantity')" prop="quantity" v-show="showExtend">
                <el-input
                  v-model="queryParams.quantity"
                  :placeholder="$t('ErpProductDemo.quantityPlaceholder')"
                  clearable
                  @keyup.enter="handleQuery"
                />
              </el-form-item>
              <el-form-item :label="$t('ErpProductDemo.primaryCategory')" prop="primaryCategory" v-show="showExtend">
                <el-input
                  v-model="queryParams.primaryCategory"
                  :placeholder="$t('ErpProductDemo.primaryCategoryPlaceholder')"
                  clearable
                  @keyup.enter="handleQuery"
                />
              </el-form-item>
              <el-form-item :label="$t('ErpProductDemo.statusLa')" prop="statusLa" v-show="showExtend">
                <el-input
                  v-model="queryParams.statusLa"
                  :placeholder="$t('ErpProductDemo.statusLaPlaceholder')"
                  clearable
                  @keyup.enter="handleQuery"
                />
              </el-form-item>
              <el-form-item :label="$t('ErpProductDemo.colorFamily')" prop="colorFamily" v-show="showExtend">
                <el-input
                  v-model="queryParams.colorFamily"
                  :placeholder="$t('ErpProductDemo.colorFamilyPlaceholder')"
                  clearable
                  @keyup.enter="handleQuery"
                />
              </el-form-item>
              <el-form-item :label="$t('ErpProductDemo.fblLa')" prop="fblLa" v-show="showExtend">
                <el-input
                  v-model="queryParams.fblLa"
                  :placeholder="$t('ErpProductDemo.fblLaPlaceholder')"
                  clearable
                  @keyup.enter="handleQuery"
                />
              </el-form-item>
              <el-form-item :label="$t('ErpProductDemo.simage1')" prop="simage1" v-show="showExtend">
                <el-input
                  v-model="queryParams.simage1"
                  :placeholder="$t('ErpProductDemo.simage1Placeholder')"
                  clearable
                  @keyup.enter="handleQuery"
                />
              </el-form-item>
              <el-form-item :label="$t('ErpProductDemo.simage2')" prop="simage2" v-show="showExtend">
                <el-input
                  v-model="queryParams.simage2"
                  :placeholder="$t('ErpProductDemo.simage2Placeholder')"
                  clearable
                  @keyup.enter="handleQuery"
                />
              </el-form-item>
              <el-form-item :label="$t('ErpProductDemo.simage3')" prop="simage3" v-show="showExtend">
                <el-input
                  v-model="queryParams.simage3"
                  :placeholder="$t('ErpProductDemo.simage3Placeholder')"
                  clearable
                  @keyup.enter="handleQuery"
                />
              </el-form-item>
              <el-form-item :label="$t('ErpProductDemo.simage4')" prop="simage4" v-show="showExtend">
                <el-input
                  v-model="queryParams.simage4"
                  :placeholder="$t('ErpProductDemo.simage4Placeholder')"
                  clearable
                  @keyup.enter="handleQuery"
                />
              </el-form-item>
              <el-form-item :label="$t('ErpProductDemo.simage5')" prop="simage5" v-show="showExtend">
                <el-input
                  v-model="queryParams.simage5"
                  :placeholder="$t('ErpProductDemo.simage5Placeholder')"
                  clearable
                  @keyup.enter="handleQuery"
                />
              </el-form-item>
              <el-form-item :label="$t('ErpProductDemo.simage6')" prop="simage6" v-show="showExtend">
                <el-input
                  v-model="queryParams.simage6"
                  :placeholder="$t('ErpProductDemo.simage6Placeholder')"
                  clearable
                  @keyup.enter="handleQuery"
                />
              </el-form-item>
              <el-form-item :label="$t('ErpProductDemo.simage7')" prop="simage7" v-show="showExtend">
                <el-input
                  v-model="queryParams.simage7"
                  :placeholder="$t('ErpProductDemo.simage7Placeholder')"
                  clearable
                  @keyup.enter="handleQuery"
                />
              </el-form-item>
              <el-form-item :label="$t('ErpProductDemo.simage8')" prop="simage8" v-show="showExtend">
                <el-input
                  v-model="queryParams.simage8"
                  :placeholder="$t('ErpProductDemo.simage8Placeholder')"
                  clearable
                  @keyup.enter="handleQuery"
                />
              </el-form-item>
            </el-form>
              <div class="search-operation">

                <extend-toolbar v-model:showExtend="showExtend" ></extend-toolbar>
                <el-button type="primary" icon="Search" @click="handleQuery">{{ $t('button.search') }}</el-button>
                <el-button icon="Refresh" @click="resetQuery">{{ $t('button.reset') }}</el-button>
              </div> 
        </div>
        <!-- card list -->
        <div class="card table-box">    
          <div class="table-header">
            <el-row :gutter="10" class="mb8">
              <el-col :span="1.5">
                <el-button
                  type="primary"
                  plain
                  icon="Plus"
                  @click="handleAdd"
                  v-hasPermi="['demo:productdemo:add']"
                >{{ $t('button.add') }}</el-button>
              </el-col>
              <el-col :span="1.5">
                <el-button
                  type="success"
                  plain
                  icon="Edit"
                  :disabled="single"
                  @click="handleUpdate"
                  v-hasPermi="['demo:productdemo:edit']"
                >{{ $t('button.edit') }}</el-button>
              </el-col>
              <el-col :span="1.5">
                <el-button
                  type="danger"
                  plain
                  icon="Delete"
                  :disabled="multiple"
                  @click="handleDelete"
                  v-hasPermi="['demo:productdemo:remove']"
                >{{ $t('button.delete') }}</el-button>
              </el-col>
              <el-col :span="1.5">
                <el-button
                  type="warning"
                  plain
                  icon="Download"
                  @click="handleExport"
                  v-hasPermi="['demo:productdemo:export']"
                >{{ $t('button.export') }}</el-button>
              </el-col>
              <right-toolbar v-model:showSearch="showSearch" @queryTable="getList" :columns="columns"></right-toolbar>
            </el-row>
          </div>
          <!-- table list -->
          <el-table v-loading="loading" :data="productdemoList" @selection-change="handleSelectionChange" :default-sort="defaultSort" @sort-change="handleSortChange">
            <el-table-column type="selection" width="38" align="center" />
            <el-table-column :label="$t('ErpProductDemo.idProductLa')" width="65" align="center" prop="idProductLa" v-if="columns[0].visible" />
            <el-table-column :label="$t('ErpProductDemo.skuLazada')" width="120" align="left" prop="skuLazada" v-if="columns[1].visible" :show-overflow-tooltip="true" />
            <el-table-column :label="$t('ErpProductDemo.skuEelic')" width="200" align="left" prop="skuEelic" v-if="columns[2].visible" :show-overflow-tooltip="true" sortable="custom" :sort-orders="['descending', 'ascending']"/>
            <el-table-column :label="$t('ErpProductDemo.skuNameLa')" width="300" align="center" prop="skuNameLa" v-if="columns[3].visible" :show-overflow-tooltip="true"/>
            <el-table-column :label="$t('ErpProductDemo.shortDescription')" align="center" prop="shortDescription" v-if="columns[4].visible" :show-overflow-tooltip="true"/>
            <el-table-column :label="$t('ErpProductDemo.description')" align="center" prop="description" v-if="columns[5].visible" :show-overflow-tooltip="true"/>
            <el-table-column :label="$t('ErpProductDemo.model')" align="center" prop="model" v-if="columns[6].visible" :show-overflow-tooltip="true"/>
            <el-table-column :label="$t('ErpProductDemo.packageContent')" align="center" v-if="columns[7].visible" prop="packageContent" :show-overflow-tooltip="true"/>
            <el-table-column :label="$t('ErpProductDemo.packageWeight')" align="center" v-if="columns[8].visible" prop="packageWeight" sortable="custom" :sort-orders="['descending', 'ascending']" />
            <el-table-column :label="$t('ErpProductDemo.packageLength')" align="center" v-if="columns[9].visible" prop="packageLength" sortable="custom" :sort-orders="['descending', 'ascending']" />
            <el-table-column :label="$t('ErpProductDemo.packageWidth')" align="center" v-if="columns[10].visible" prop="packageWidth" sortable="custom" :sort-orders="['descending', 'ascending']" />
            <el-table-column :label="$t('ErpProductDemo.packageHeight')" align="center" v-if="columns[11].visible" prop="packageHeight" sortable="custom" :sort-orders="['descending', 'ascending']" />
            <el-table-column :label="$t('ErpProductDemo.price')" align="center" v-if="columns[12].visible" prop="price" sortable="custom" :sort-orders="['descending', 'ascending']" />
            <el-table-column :label="$t('ErpProductDemo.specialPrice')" align="center" v-if="columns[13].visible" prop="specialPrice" sortable="custom" :sort-orders="['descending', 'ascending']" />
            <el-table-column :label="$t('ErpProductDemo.quantity')" align="center" v-if="columns[14].visible" prop="quantity" sortable="custom" :sort-orders="['descending', 'ascending']" />
            <el-table-column :label="$t('ErpProductDemo.primaryCategory')" align="center" v-if="columns[15].visible"  prop="primaryCategory" />
            <el-table-column :label="$t('ErpProductDemo.statusLa')" align="center" v-if="columns[16].visible" prop="statusLa" />
            <el-table-column :label="$t('ErpProductDemo.colorFamily')" align="center" v-if="columns[17].visible" prop="colorFamily" :show-overflow-tooltip="true"/>
            <el-table-column :label="$t('ErpProductDemo.fblLa')" align="center" v-if="columns[18].visible" prop="fblLa" />
            <el-table-column :label="$t('ErpProductDemo.simage1')" align="center" v-if="columns[19].visible" prop="simage1" :show-overflow-tooltip="true"/>
            <el-table-column :label="$t('ErpProductDemo.simage2')" align="center" v-if="columns[20].visible" prop="simage2" :show-overflow-tooltip="true"/>
            <el-table-column :label="$t('ErpProductDemo.simage3')" align="center" v-if="columns[21].visible" prop="simage3" :show-overflow-tooltip="true"/>
            <el-table-column :label="$t('ErpProductDemo.simage4')" align="center" v-if="columns[22].visible" prop="simage4" :show-overflow-tooltip="true"/>
            <el-table-column :label="$t('ErpProductDemo.simage5')" align="center" v-if="columns[23].visible" prop="simage5" :show-overflow-tooltip="true"/>
            <el-table-column :label="$t('ErpProductDemo.simage6')" align="center" v-if="columns[24].visible" prop="simage6" :show-overflow-tooltip="true"/>
            <el-table-column :label="$t('ErpProductDemo.simage7')" align="center" v-if="columns[25].visible" prop="simage7" :show-overflow-tooltip="true"/>
            <el-table-column :label="$t('ErpProductDemo.simage8')" align="center" v-if="columns[26].visible" prop="simage8" :show-overflow-tooltip="true"/>
            <el-table-column :label="$t('ErpProductDemo.status')" align="center" v-if="columns[27].visible" prop="status" />
            <el-table-column :label="$t('ErpProductDemo.remark')" align="center" v-if="columns[28].visible" prop="remark" :show-overflow-tooltip="true"/>
            <el-table-column :label="$t('user.operate')" width="150" align="center" class-name="small-padding fixed-width">
              <template #default="scope">
                <el-button
                  type="text"
                  icon="Edit"
                  @click="handleUpdate(scope.row)"
                  v-hasPermi="['demo:productdemo:edit']"
                >{{ $t('button.edit') }}</el-button>
                <el-button
                  type="text"
                  icon="Delete"
                  @click="handleDelete(scope.row)"
                  v-hasPermi="['demo:productdemo:remove']"
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
        </div>
      </div>    
      <!-- 添加或修改产品Demo对话框 -->
      <el-dialog :title="title" v-model="open" width="500px" append-to-body>
        <el-form ref="productdemoRef" :model="form" :rules="rules" label-width="80px">
          <el-form-item :label="$t('ErpProductDemo.skuLazada')" prop="skuLazada">
            <el-input v-model="form.skuLazada" :placeholder="$t('ErpProductDemo.skuLazadaPlaceholder')" />
          </el-form-item>
          <el-form-item :label="$t('ErpProductDemo.skuEelic')" prop="skuEelic">
            <el-input v-model="form.skuEelic" :placeholder="$t('ErpProductDemo.skuEelicPlaceholder')" />
          </el-form-item>
          <el-form-item :label="$t('ErpProductDemo.skuNameLa')" prop="skuNameLa">
            <el-input v-model="form.skuNameLa" :placeholder="$t('ErpProductDemo.skuNameLaPlaceholder')" />
          </el-form-item>
          <el-form-item :label="$t('ErpProductDemo.shortDescription')" prop="shortDescription">
            <el-input v-model="form.shortDescription" type="textarea" placeholder="请输入内容" />
          </el-form-item>
          <el-form-item :label="$t('ErpProductDemo.description')" prop="description">
            <el-input v-model="form.description" type="textarea" placeholder="请输入内容" />
          </el-form-item>
          <el-form-item :label="$t('ErpProductDemo.model')" prop="model">
            <el-input v-model="form.model" :placeholder="$t('ErpProductDemo.modelPlaceholder')" />
          </el-form-item>
          <el-form-item :label="$t('ErpProductDemo.packageContent')">
            <el-input v-model="form.packageContent" :min-height="192"/>
          </el-form-item>
          <el-form-item :label="$t('ErpProductDemo.packageWeight')" prop="packageWeight">
            <el-input v-model="form.packageWeight" :placeholder="$t('ErpProductDemo.packageWeightPlaceholder')" />
          </el-form-item>
          <el-form-item :label="$t('ErpProductDemo.packageLength')" prop="packageLength">
            <el-input v-model="form.packageLength" :placeholder="$t('ErpProductDemo.packageLengthPlaceholder')" />
          </el-form-item>
          <el-form-item :label="$t('ErpProductDemo.packageWidth')" prop="packageWidth">
            <el-input v-model="form.packageWidth" :placeholder="$t('ErpProductDemo.packageWidthPlaceholder')" />
          </el-form-item>
          <el-form-item :label="$t('ErpProductDemo.packageHeight')" prop="packageHeight">
            <el-input v-model="form.packageHeight" :placeholder="$t('ErpProductDemo.packageHeightPlaceholder')" />
          </el-form-item>
          <el-form-item :label="$t('ErpProductDemo.price')" prop="price">
            <el-input v-model="form.price" :placeholder="$t('ErpProductDemo.pricePlaceholder')" />
          </el-form-item>
          <el-form-item :label="$t('ErpProductDemo.specialPrice')" prop="specialPrice">
            <el-input v-model="form.specialPrice" :placeholder="$t('ErpProductDemo.specialPricePlaceholder')" />
          </el-form-item>
          <el-form-item :label="$t('ErpProductDemo.quantity')" prop="quantity">
            <el-input v-model="form.quantity" :placeholder="$t('ErpProductDemo.quantityPlaceholder')" />
          </el-form-item>
          <el-form-item :label="$t('ErpProductDemo.primaryCategory')" prop="primaryCategory">
            <el-input v-model="form.primaryCategory" :placeholder="$t('ErpProductDemo.primaryCategoryPlaceholder')" />
          </el-form-item>
          <el-form-item :label="$t('ErpProductDemo.statusLa')" prop="statusLa">
            <el-input v-model="form.statusLa" :placeholder="$t('ErpProductDemo.statusLaPlaceholder')" />
          </el-form-item>
          <el-form-item :label="$t('ErpProductDemo.colorFamily')" prop="colorFamily">
            <el-input v-model="form.colorFamily" :placeholder="$t('ErpProductDemo.colorFamilyPlaceholder')" />
          </el-form-item>
          <el-form-item :label="$t('ErpProductDemo.fblLa')" prop="fblLa">
            <el-input v-model="form.fblLa" :placeholder="$t('ErpProductDemo.fblLaPlaceholder')" />
          </el-form-item>
          <el-form-item :label="$t('ErpProductDemo.simage1')" prop="simage1">
            <el-input v-model="form.simage1" :placeholder="$t('ErpProductDemo.simage1Placeholder')" />
          </el-form-item>
          <el-form-item :label="$t('ErpProductDemo.simage2')" prop="simage2">
            <el-input v-model="form.simage2" :placeholder="$t('ErpProductDemo.simage2Placeholder')" />
          </el-form-item>
          <el-form-item :label="$t('ErpProductDemo.simage3')" prop="simage3">
            <el-input v-model="form.simage3" :placeholder="$t('ErpProductDemo.simage3Placeholder')" />
          </el-form-item>
          <el-form-item :label="$t('ErpProductDemo.simage4')" prop="simage4">
            <el-input v-model="form.simage4" :placeholder="$t('ErpProductDemo.simage4Placeholder')" />
          </el-form-item>
          <el-form-item :label="$t('ErpProductDemo.simage5')" prop="simage5">
            <el-input v-model="form.simage5" :placeholder="$t('ErpProductDemo.simage5Placeholder')" />
          </el-form-item>
          <el-form-item :label="$t('ErpProductDemo.simage6')" prop="simage6">
            <el-input v-model="form.simage6" :placeholder="$t('ErpProductDemo.simage6Placeholder')" />
          </el-form-item>
          <el-form-item :label="$t('ErpProductDemo.simage7')" prop="simage7">
            <el-input v-model="form.simage7" :placeholder="$t('ErpProductDemo.simage7Placeholder')" />
          </el-form-item>
          <el-form-item :label="$t('ErpProductDemo.simage8')" prop="simage8">
            <el-input v-model="form.simage8" :placeholder="$t('ErpProductDemo.simage8Placeholder')" />
          </el-form-item>
          <el-form-item :label="$t('ErpProductDemo.delFlag')" prop="delFlag">
            <el-input v-model="form.delFlag" :placeholder="$t('ErpProductDemo.delFlagPlaceholder')" />
          </el-form-item>
          <el-form-item :label="$t('ErpProductDemo.remark')" prop="remark">
            <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
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
  
<script setup lang="ts" name="Productdemo">
  import { listProductdemo, getProductdemo, delProductdemo, addProductdemo, updateProductdemo } from "@/api/demo/productdemo";
  import i18n from '@/lang/index';

  //import { ElForm } from "element-plus";
  import { ComponentInternalInstance, getCurrentInstance, reactive, ref, toRefs } from "vue";
  //const productdemoRef = ref<InstanceType<typeof ElForm>> ()

  const {t} = i18n.global;
  const { proxy } = getCurrentInstance() as ComponentInternalInstance;
  
  const productdemoList = ref([]);
  const open = ref(false);
  const loading = ref(true);
  const showSearch = ref(true);
  const showExtend = ref(false);
  const ids = ref([]);
  const single = ref(true);
  const multiple = ref(true);
  const total = ref(0);
  const title = ref("");
  const defaultSort = ref({ prop: "operData", order: "descending" });
  
  const columns = ref([
  { key: 0, label: t('ErpProductDemo.idProductLa'), visible: true },
  { key: 1, label: t('ErpProductDemo.skuLazada'), visible: false },
  { key: 2, label: t('ErpProductDemo.skuEelic'), visible: true },
  { key: 3, label: t('ErpProductDemo.skuNameLa'), visible: true },
  { key: 4, label: t('ErpProductDemo.shortDescription'), visible: false },
  { key: 5, label: t('ErpProductDemo.description'), visible: false },  
  { key: 6, label: t('ErpProductDemo.model'), visible: false },  
  { key: 7, label: t('ErpProductDemo.packageContent'), visible: false },
  { key: 8, label: t('ErpProductDemo.packageWeight'), visible: true },
  { key: 9, label: t('ErpProductDemo.packageLength'), visible: false },
  { key: 10, label: t('ErpProductDemo.packageWidth'), visible: false },
  { key: 11, label: t('ErpProductDemo.packageHeight'), visible: false },
  { key: 12, label: t('ErpProductDemo.price'), visible: false },
  { key: 13, label: t('ErpProductDemo.specialPrice'), visible: true },
  { key: 14, label:  t('ErpProductDemo.quantity'), visible: true },
  { key: 15, label:  t('ErpProductDemo.primaryCategory'), visible: false },  
  { key: 16, label:  t('ErpProductDemo.statusLa'), visible: true },    
  { key: 17, label: t('ErpProductDemo.colorFamily'), visible: false },
  { key: 18, label: t('ErpProductDemo.fblLa'), visible: false },
  { key: 19, label: t('ErpProductDemo.simage1'), visible: false },
  { key: 20, label: t('ErpProductDemo.simage2'), visible: false },
  { key: 21, label: t('ErpProductDemo.simage3'), visible: false },
  { key: 22, label: t('ErpProductDemo.simage4'), visible: false },
  { key: 23, label: t('ErpProductDemo.simage5'), visible: false },
  { key: 24, label: t('ErpProductDemo.simage6'), visible: false },
  { key: 25, label: t('ErpProductDemo.simage7'), visible: false },
  { key: 26, label: t('ErpProductDemo.simage8'), visible: false },
  { key: 27, label: t('ErpProductDemo.status'), visible: false },   
  { key: 28, label: t('ErpProductDemo.remark'), visible: false }
]);

  const data = reactive({
    form: {},
    queryParams: {
      pageNum: 1,
      pageSize: 10,
      skuLazada: null,
      skuEelic: null,
      skuNameLa: null,
      shortDescription: null,
      description: null,
      model: null,
      packageContent: null,
      packageWeight: null,
      packageLength: null,
      packageWidth: null,
      packageHeight: null,
      price: null,
      specialPrice: null,
      quantity: null,
      primaryCategory: null,
      statusLa: null,
      colorFamily: null,
      fblLa: null,
      simage1: null,
      simage2: null,
      simage3: null,
      simage4: null,
      simage5: null,
      simage6: null,
      simage7: null,
      simage8: null,
      status: null,
    },
    rules: {
      skuEelic: [
        { required: true, message: "sku eelic不能为空", trigger: "blur" }
      ],
    }
  });
  
  const { queryParams, form, rules } = toRefs(data);
  
  /** 查询产品Demo列表 */
  function getList() {
    loading.value = true;
    listProductdemo(queryParams.value).then(response => {
      productdemoList.value = response.rows;
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
      idProductLa: null,
      skuLazada: null,
      skuEelic: null,
      skuNameLa: null,
      skuNameLaId: null,
      skuNameLaEn: null,
      shortDescription: null,
      shortDescriptionEn: null,
      shortDescriptionId: null,
      description: null,
      descriptionId: null,
      descriptionEn: null,
      model: null,
      packageContent: null,
      packageWeight: null,
      packageLength: null,
      packageWidth: null,
      packageHeight: null,
      price: null,
      specialPrice: null,
      quantity: null,
      primaryCategory: null,
      statusLa: null,
      colorFamily: null,
      fblLa: null,
      simage1: null,
      simage2: null,
      simage3: null,
      simage4: null,
      simage5: null,
      simage6: null,
      simage7: null,
      simage8: null,
      status: "0",
      delFlag: null,
      createBy: null,
      createTime: null,
      updateBy: null,
      updateTime: null,
      remark: null
    };
    proxy.resetForm("productdemoRef");
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
    ids.value = selection.map(item => item.idProductLa);
    single.value = selection.length != 1;
    multiple.value = !selection.length;
  }
  
  /** 排序触发事件 */
function handleSortChange(column, prop, order) {
  queryParams.value.orderByColumn = column.prop;
  queryParams.value.isAsc = column.order;
  getList();
}

  /** 新增按钮操作 */
  function handleAdd() {
    reset();
    open.value = true;
    title.value = "添加产品Demo";
  }
  
  /** 修改按钮操作 */
  function handleUpdate(row) {
    reset();
    const _idProductLa = row.idProductLa || ids.value
    getProductdemo(_idProductLa).then(response => {
      form.value = response.data;
      open.value = true;
      title.value = "修改产品Demo";
    });
  }
  
  /** 提交按钮 */
  function submitForm() {
    proxy?.$refs["productdemoRef"].validate(valid => {
      if (valid) {
        if (form.value.idProductLa != null) {
          updateProductdemo(form.value).then(response => {
            proxy?.$modal.msgSuccess(t('button.successModify'));
            open.value = false;
            getList();
          });
        } else {
          addProductdemo(form.value).then(response => {
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
    const _idProductLas = row.idProductLa || ids.value;
    proxy.$modal.confirm('是否确认删除产品Demo编号为"' + _idProductLas + '"的数据项？').then(function() {
      return delProductdemo(_idProductLas);
    }).then(() => {
      getList();
      proxy.$modal.msgSuccess(t('user.succesDeleted'));
    }).catch(() => {});
  }
  
  /** 导出按钮操作 */
  function handleExport() {
    proxy.download('demo/productdemo/export', {
      ...queryParams.value
    }, `productdemo_${new Date().getTime()}.xlsx`)
  }
  
  getList();
</script>