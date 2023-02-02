<template>
  <el-card>
    <el-tabs v-model="activeName">
      <el-tab-pane :label="$t('user.BasicInfo')" name="basic">
        <basic-info-form ref="basicInfo" :info="info" />
      </el-tab-pane>
      <el-tab-pane :label="$t('genTable.columnInformation')" name="columnInfo">
        <el-table ref="dragTable" :data="columns" row-key="columnId" :max-height="tableHeight">
          <el-table-column :label="$t('user.serialRole')" type="index" min-width="5%"/>
          <el-table-column
            :label="$t('genTable.columnName')"
            prop="columnName"
            min-width="10%"
            :show-overflow-tooltip="true"
          />
          <el-table-column :label="$t('genTable.columnComment')" min-width="11%">
            <template v-if="useAppStore().lang == 'en'" #default="scope">
              <el-input v-model="scope.row.columnCommentEn"></el-input>
            </template>
            <template v-if="useAppStore().lang == 'zh'" #default="scope">
              <el-input v-model="scope.row.columnComment"></el-input>
            </template>
            <template v-if="useAppStore().lang == 'id'" #default="scope">
              <el-input v-model="scope.row.columnCommentId"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('genTable.columnType')"
            prop="columnType"
            min-width="10%"
            :show-overflow-tooltip="true"
          />
          <el-table-column :label="$t('genTable.javaType')" min-width="11%">
            <template #default="scope">
              <el-select v-model="scope.row.javaType">
                <el-option label="Long" value="Long" />
                <el-option label="String" value="String" />
                <el-option label="Integer" value="Integer" />
                <el-option label="Double" value="Double" />
                <el-option label="BigDecimal" value="BigDecimal" />
                <el-option label="Date" value="Date" />
                <el-option label="Boolean" value="Boolean" />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column :label="$t('genTable.javaField')" min-width="10%">
            <template #default="scope">
              <el-input v-model="scope.row.javaField"></el-input>
            </template>
          </el-table-column>

          <el-table-column :label="$t('genTable.isInsert')" min-width="5%">
            <template #default="scope">
              <el-checkbox true-label="1" v-model="scope.row.isInsert"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column :label="$t('genTable.isEdit')" min-width="4%">
            <template #default="scope">
              <el-checkbox true-label="1" v-model="scope.row.isEdit"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column :label="$t('genTable.isList')" min-width="4%">
            <template #default="scope">
              <el-checkbox true-label="1" v-model="scope.row.isList"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column :label="$t('genTable.isQuery')" min-width="5%">
            <template #default="scope">
              <el-checkbox true-label="1" v-model="scope.row.isQuery"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label="I18n" min-width="4%">
            <template #default="scope">
              <el-checkbox true-label="1" v-model="scope.row.isI18n"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label="Sub I18n" min-width="6%">
            <template #default="scope">
              <el-checkbox true-label="1" v-model="scope.row.isSubI18n"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label="Search" min-width="6%">
            <template #default="scope">
              <el-checkbox true-label="1" v-model="scope.row.isSearch"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label="Column" min-width="6%">
            <template #default="scope">
              <el-checkbox true-label="1" v-model="scope.row.isColumn"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label="Sortable" min-width="6%">
            <template #default="scope">
              <el-checkbox true-label="1" v-model="scope.row.isSortable"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column :label="$t('genTable.queryType')" min-width="10%">
            <template #default="scope">
              <el-select v-model="scope.row.queryType">
                <el-option label="=" value="EQ" />
                <el-option label="!=" value="NE" />
                <el-option label=">" value="GT" />
                <el-option label=">=" value="GTE" />
                <el-option label="<" value="LT" />
                <el-option label="<=" value="LTE" />
                <el-option label="LIKE" value="LIKE" />
                <el-option label="BETWEEN" value="BETWEEN" />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column :label="$t('genTable.isRequired')" min-width="7%">
            <template #default="scope">
              <el-checkbox true-label="1" v-model="scope.row.isRequired"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column :label="$t('genTable.htmlType')" min-width="12%">
            <template #default="scope">
              <el-select v-model="scope.row.htmlType">
                <el-option :label="$t('genTable.input')" value="input" />
                <el-option :label="$t('genTable.textarea')"  value="textarea" />
                <el-option :label="$t('genTable.select')"  value="select" />
                <el-option :label="$t('genTable.radio')"  value="radio" />
                <el-option :label="$t('genTable.checkbox')"  value="checkbox" />
                <el-option :label="$t('genTable.datetime')"  value="datetime" />
                <el-option :label="$t('genTable.imageUpload')"  value="imageUpload" />
                <el-option :label="$t('genTable.fileUpload')"  value="fileUpload" />
                <el-option :label="$t('genTable.editor')"  value="editor" />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column :label="$t('genTable.dictType')" min-width="12%">
            <template #default="scope">
              <el-select v-model="scope.row.dictType" clearable filterable :placeholder="$t('user.choosePlaceholder')">
                <el-option
                  v-for="dict in dictOptions"
                  :key="dict.dictType"
                  :label="dict.dictName"
                  :value="dict.dictType">
                  <span style="float: left">{{ dict.dictName }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{ dict.dictType }}</span>
              </el-option>
              </el-select>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane :label="$t('genTable.chartInfo')" name="chart">
        <gen-chart-form ref="chartInfo" :info="info" :tables="tables"/>
      </el-tab-pane>
      <el-tab-pane :label="$t('genTable.GenerateInfo')" name="genInfo">
        <gen-info-form ref="genInfo" :info="info" />
      </el-tab-pane>
      <el-tab-pane label="view" name="view">
        <view-form></view-form>
      </el-tab-pane>
    </el-tabs>
    <el-form label-width="100px">
      <div style="text-align: center;margin-left:-100px;margin-top:10px;">
        <el-button type="primary" @click="submitForm()">{{ $t('button.submit2') }}</el-button>
        <el-button @click="close()">{{ $t('button.return') }}</el-button>
      </div>
    </el-form>
  </el-card>
</template>

<script setup lang="ts" name="GenEditi18n">
import { getGenTable, updateGenTable } from "@/api/tool/geni18n";
import { optionselect as getDictOptionselect } from "@/api/system/dict/type";
import basicInfoForm from "./basicInfoForm.vue";
import genInfoForm from "./genInfoForm.vue";
import genChartForm from "./genChartForm.vue";
import viewForm from "./viewForm.vue";
import { ComponentInternalInstance, getCurrentInstance, ref } from 'vue';
import { useRoute } from 'vue-router';
import useAppStore from "@/stores/modules/app";
import type { QueryParams } from "@/api/tool/gen";
import i18n from '@/lang/index';

interface Column {
    capJavaField: string;
    columnComment: string;
    columnId: number;
    columnName: string;
    columnType: string;
    createBy: string;
    createTime: string;
    dictType: string;
    edit: boolean;
    htmlType: string | null;
    increment: boolean;
    insert: boolean;
    isEdit: string | null;
    isIncrement: string;
    isInsert: string;
    isList: string | null;
    isPk: string;
    isQuery: string | null;
    isRequired: string | null;
    javaField: string;
    javaType: string;
    list: boolean;
    params: QueryParams;
    pk: boolean;
    query: boolean;
    queryType: string | null;
    remark: string;
    required: boolean;
    searchValue: null
    sort: number;
    superColumn: boolean;
    tableId: number;
    updateBy: string;
    updateTime: string;
    usableColumn: boolean;
}

interface DictOptions {
  dictType: string;
  dictName: string;
}

interface Info {
  columns: Column[]
  params: object;
  treeCode: string | null;
  treeName: string | null;
  treeParentCode: string | null;
  parentMenuId: string | null;
}

const {t} = i18n.global;
const route = useRoute();
const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const activeName = ref("columnInfo");
const tableHeight = ref(document.documentElement.scrollHeight - 245 + "px");
const tables = ref([]);
const columns = ref<Column[]>([]);
const dictOptions = ref<DictOptions[]>([]);
const info = ref({} as Info);
const basicInfo = ref<InstanceType<typeof basicInfoForm>>();
const genInfo = ref<InstanceType<typeof genInfoForm>>();
const chartInfo = ref<InstanceType<typeof genChartForm>>();

/** 提交按钮 */
function submitForm() {

  // const basicForm = proxy.$refs.basicInfo.$refs.basicInfoForm;
  // const genForm = proxy.$refs.genInfo.$refs.genInfoForm;
  // const genChartForm = proxy.$refs.chartInfo.$refs.genChartForm;
  Promise.all([basicInfo.value?.basicInfoForm, genInfo.value?.genInfoForm, chartInfo.value?.genChartForm].map(getFormPromise)).then(res => {
    const validateResult = res.every(item => !!item);
    if (validateResult) {
      const genTable = Object.assign({}, info.value);
      genTable.columns = columns.value;
      genTable.params = {
        treeCode: info.value.treeCode,
        treeName: info.value.treeName,
        treeParentCode: info.value.treeParentCode,
        parentMenuId: info.value.parentMenuId
      };
      updateGenTable(genTable).then(res => {
        proxy?.$modal.msgSuccess(res.msg);
        if (res.code === 200) {
          close();
        }
      });
    } else {
      proxy?.$modal.msgError(t('genTable.msgError'));
    }
  });
}
function getFormPromise(form?: any) {
  console.log(form)
    return new Promise(resolve => {
        form?.validate((res: any) => {
            resolve(res);
        });
    });
}
function close() {
  const obj = { path: "/tool/code/geni18n", query: { t: Date.now(), pageNum: route.query.pageNum } };
  proxy?.$tab.closeOpenPage(obj.path);
}

(() => {
  const tableId = route.params && route.params.tableId;
  if (tableId) {
    // 获取表详细信息
    getGenTable(tableId).then(res => {
      columns.value = res.data.rows;
      info.value = res.data.info;
      tables.value = res.data.tables;
    });
    /** 查询字典下拉列表 */
    getDictOptionselect().then(response => {
      dictOptions.value = response.data;
    });
  }
})();
</script>
