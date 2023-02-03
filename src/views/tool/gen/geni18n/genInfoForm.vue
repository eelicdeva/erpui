<template>
  <el-form ref="genInfoForm" :model="info" :rules="rules" label-width="150px">
    <el-row>
      <el-col :span="12">
        <el-form-item prop="tplCategory">
          <template #label>{{ $t('genTable.generateTemplate') }}</template>
          <el-select v-model="info.tplCategory" @change="tplSelectChange">
            <el-option :label="$t('genTable.crud')" value="crud" />
            <el-option :label="$t('genTable.tree')" value="tree" />
            <el-option :label="$t('genTable.sub')" value="sub" />
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item prop="packageName">
          <template #label>
            {{ $t('genTable.packagePath') }}
            <el-tooltip :content="$t('genTable.content1')" placement="top">
              <el-icon><question-filled /></el-icon>
            </el-tooltip>
          </template>
          <el-input v-model="info.packageName" />
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item prop="moduleName">
          <template #label>
            {{ $t('genTable.moduleName') }}
            <el-tooltip :content="$t('genTable.content2')" placement="top">
              <el-icon><question-filled /></el-icon>
            </el-tooltip>
          </template>
          <el-input v-model="info.moduleName" />
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item prop="businessName">
          <template #label>
            {{ $t('genTable.businessName') }}
            <el-tooltip :content="$t('genTable.content3')" placement="top">
              <el-icon><question-filled /></el-icon>
            </el-tooltip>
          </template>
          <el-input v-model="info.businessName" />
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item prop="functionName">
          <template #label>
            {{ $t('genTable.genFunction') }}
            <el-tooltip :content="$t('genTable.content4')" placement="top">
              <el-icon><question-filled /></el-icon>
            </el-tooltip>
          </template>
          <el-input v-model="info.functionName" />
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item>
          <template #label>
            {{ $t('genTable.parentMenu') }}
            <el-tooltip :content="$t('genTable.content5')" placement="top">
              <el-icon><question-filled /></el-icon>
            </el-tooltip>
          </template>
          <tree-select
            v-model:value="info.parentMenuId"
            :options="menuOptions"
            :objMap="{ value: 'menuId', label: 'menuName', children: 'children' }"
            :placeholder="$t('genTable.selectMenuPlaceholder')"
          />
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item prop="genType">
          <template #label>
            {{ $t('genTable.codeGen') }}
            <el-tooltip :content="$t('genTable.content6')" placement="top">
              <el-icon><question-filled /></el-icon>
            </el-tooltip>
          </template>
          <el-radio v-model="info.genType" label="0">{{ $t('genTable.zip') }}</el-radio>
          <el-radio v-model="info.genType" label="1">{{ $t('genTable.customPath') }}</el-radio>
        </el-form-item>
      </el-col>

      <el-col :span="24" v-if="info.genType == '1'">
        <el-form-item prop="genPath">
          <template #label>
            {{ $t('genTable.customPath') }}
            <el-tooltip :content="$t('genTable.content7')" placement="top">
              <el-icon><question-filled /></el-icon>
            </el-tooltip>
          </template>
          <el-input v-model="info.genPath">
            <template #append>
              <el-dropdown>
                <el-button type="primary">
                  {{ $t('genTable.selectionPath') }}
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item @click="info.genPath = '/'">{{ $t('genTable.basePath') }}</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </template>
          </el-input>
        </el-form-item>
      </el-col>
    </el-row>
    
    <template v-if="info.tplCategory == 'tree' || info.tplCategory == 'treei18n'">
      <h4 class="form-header">{{ $t('genTable.otherInfo') }}</h4>
      <el-row v-show="info.tplCategory == 'tree' || info.tplCategory == 'treei18n'">
        <el-col :span="12">
          <el-form-item>
            <template #label>
              {{ $t('genTable.treeEncoding') }}
              <el-tooltip :content="$t('genTable.content8')" placement="top">
                <el-icon><question-filled /></el-icon>
              </el-tooltip>
            </template>
            <el-select v-model="info.treeCode" :placeholder="$t('user.choosePlaceholder')">
              <el-option
                v-for="(column, index) in info.columns"
                :key="index"
                :label="column.columnName + '：' + column.columnComment"
                :value="column.columnName"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item>
            <template #label>
              {{ $t('genTable.treeParentEncoding') }}
              <el-tooltip :content="$t('genTable.content9')" placement="top">
                <el-icon><question-filled /></el-icon>
              </el-tooltip>
            </template>
            <el-select v-model="info.treeParentCode" :placeholder="$t('user.choosePlaceholder')">
              <el-option
                v-for="(column, index) in info.columns"
                :key="index"
                :label="column.columnName + '：' + column.columnComment"
                :value="column.columnName"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item>
            <template #label>
              {{ $t('genTable.treeNameField') }}
              <el-tooltip :content="$t('genTable.content10')" placement="top">
                <el-icon><question-filled /></el-icon>
              </el-tooltip>
            </template>
            <el-select v-model="info.treeName" :placeholder="$t('user.choosePlaceholder')">
              <el-option
                v-for="(column, index) in info.columns"
                :key="index"
                :label="column.columnName + '：' + column.columnComment"
                :value="column.columnName"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </template>

    <template v-if="info.tplCategory == 'sub' || info.tplCategory == 'subi18n'">
      <h4 class="form-header">{{ $t('genTable.associatedInformation') }}</h4>
      <el-row>
        <el-col :span="12">
          <el-form-item>
            <template #label>
              {{ $t('genTable.associatedChildTable') }}
              <el-tooltip :content="$t('genTable.content11')" placement="top">
                <el-icon><question-filled /></el-icon>
              </el-tooltip>
            </template>
            <el-select v-model="info.subTableName" :placeholder="$t('user.choosePlaceholder')" @change="subSelectChange">
              <el-option
                v-for="(table, index) in tables"
                :key="index"
                :label="table.tableName + '：' + table.tableComment"
                :value="table.tableName"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item>
            <template #label>
              {{ $t('genTable.foreignKey') }}
              <el-tooltip :content="$t('genTable.content12')" placement="top">
                <el-icon><question-filled /></el-icon>
              </el-tooltip>
            </template>
            <el-select v-model="info.subTableFkName" :placeholder="$t('user.choosePlaceholder')">
              <el-option
                v-for="(column, index) in subColumns"
                :key="index"
                :label="column.columnName + '：' + column.columnComment"
                :value="column.columnName"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </template>

  </el-form>
</template>

<script setup lang="ts">
import { listMenu } from "@/api/system/menu";
import { ComponentInternalInstance, getCurrentInstance, ref, watch } from 'vue';
import { ElForm } from "element-plus";
import i18n from '@/lang/index';

interface SubColumn {
  columnName: string;
  columnComment: string;
}

const {t} = i18n.global;
const genInfoForm = ref<InstanceType<typeof ElForm>>();
const subColumns = ref<SubColumn[]>([]);
const menuOptions = ref([]);
const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const props = defineProps({
  info: {
    type: Object as () => any,
    default: null,
  },
  tables: {
    type: Array as () => Array<any>,
    default: null,
  },
});

// 表单校验
const rules = ref({
  tplCategory: [{ required: true, message: t('genTable.rules1'), trigger: "blur" }],
  packageName: [{ required: true, message: t('genTable.rules2'), trigger: "blur" }],
  moduleName: [{ required: true, message: t('genTable.rules3'), trigger: "blur" }],
  businessName: [{ required: true, message: t('genTable.rules4'), trigger: "blur" }],
  functionName: [{ required: true, message: t('genTable.rules5'), trigger: "blur" }]
});
function subSelectChange(value) {
  props.info.subTableFkName = "";
}
function tplSelectChange(value) {
  if (value !== "sub") {
    props.info.subTableName = "";
    props.info.subTableFkName = "";
  }
}
function setSubTableColumns(value) {
  for (let item in props.tables) {
    const name = props.tables[item].tableName;
    if (value === name) {
      subColumns.value = props.tables[item].columns;
      break;
    }
  }
}
/** 查询菜单下拉树结构 */
function getMenuTreeselect() {
  listMenu().then(response => {
    menuOptions.value = proxy!.handleTree(response.data, "menuId");
  });
}

watch(() => props.info.subTableName, val => {
  setSubTableColumns(val);
});

getMenuTreeselect();

defineExpose({
  genInfoForm 
})

</script>
