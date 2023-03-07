<template>
    <div class="app-container">
      <el-form ref="queryRef" v-show="showSearch" :inline="true" label-width="68px">
        <template v-for="columns in info.columns">
          <template v-if="columns.list == true && columns.search == false">
            <template v-if="columns.htmlType == 'input'">
              <el-form-item :label="columns.javaField" :prop="columns.javaField">
                <el-input :v-model="'queryParams.' + columns.javaField" :placeholder="columns.javaField + 'Placeholder'"
                  clearable />
              </el-form-item>
            </template>
            <template v-else-if="columns.htmlType == 'select' || columns.htmlType == 'radio'">
              <el-form-item :label="columns.javaField" :prop="columns.javaField">
                <el-select :v-model="'queryParams.' + columns.javaField" :placeholder="columns.javaField + 'Placeholder'"
                  clearable>
                  <el-option :label="$t('genTable.selectDict')" value="" />
                </el-select>
              </el-form-item>
            </template>
            <template v-else-if="columns.htmlType == 'datetime' && columns.queryType != 'BETWEEN'">
              <el-form-item :label="columns.javaField" :prop="columns.javaField">
                <el-date-picker clearable :v-model="'queryParams.' + columns.javaField" type="date"
                  value-format="YYYY-MM-DD" :placeholder="columns.javaField + 'Placeholder'">
                </el-date-picker>
              </el-form-item>
            </template>
            <template v-else-if="columns.htmlType == 'datetime' && columns.queryType == 'BETWEEN'">
              <el-form-item :label="columns.javaField" style="width: 308px">
                <el-date-picker value-format="YYYY-MM-DD" type="daterange" range-separator="-"
                  :start-placeholder="$t('user.startDate')" :end-placeholder="$t('user.endDate')"></el-date-picker>
              </el-form-item>
            </template>
          </template>
          <template v-else-if="columns.list == true && columns.search == true">
            <template v-if="columns.htmlType == 'input'">
              <el-form-item :label="columns.javaField" :prop="columns.javaField" v-show="showExtend">
                <el-input :v-model="'queryParams.' + columns.javaField" :placeholder="columns.javaField + 'Placeholder'"
                  clearable />
              </el-form-item>
            </template>
            <template v-else-if="columns.htmlType == 'select' || columns.htmlType == 'radio'">
              <el-form-item :label="columns.javaField" :prop="columns.javaField" v-show="showExtend">
                <el-select :v-model="'queryParams.' + columns.javaField" :placeholder="columns.javaField + 'Placeholder'"
                  clearable>
                  <el-option :label="$t('genTable.selectDict')" value="" />
                </el-select>
              </el-form-item>
            </template>
            <template v-else-if="columns.htmlType == 'datetime' && columns.queryType != 'BETWEEN'">
              <el-form-item :label="columns.javaField" :prop="columns.javaField" v-show="showExtend">
                <el-date-picker clearable :v-model="'queryParams.' + columns.javaField" type="date"
                  value-format="YYYY-MM-DD" :placeholder="columns.javaField + 'Placeholder'">
                </el-date-picker>
              </el-form-item>
            </template>
            <template v-else-if="columns.htmlType == 'datetime' && columns.queryType == 'BETWEEN'">
              <el-form-item :label="columns.javaField" style="width: 308px" v-show="showExtend">
                <el-date-picker value-format="YYYY-MM-DD" type="daterange" range-separator="-"
                  :start-placeholder="$t('user.startDate')" :end-placeholder="$t('user.endDate')"></el-date-picker>
              </el-form-item>
            </template>
          </template>
        </template>
        <el-form-item>
          <template v-if="isSearch == true">
            <extend-toolbar v-model:showExtend="showExtend"></extend-toolbar>
          </template>
          <el-button type="primary" icon="Search">{{ $t('button.search') }}</el-button>
          <el-button icon="Refresh">{{ $t('button.reset') }}</el-button>
        </el-form-item>
      </el-form>

      <el-row :gutter="10" class="mb8">
        <el-col :span="1.5">
          <el-button type="primary" plain icon="Plus" @click="handleAdd">{{ $t('button.add') }}</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate">{{ $t('button.edit') }}
          </el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete">{{ $t('button.delete') }}
          </el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button type="warning" plain icon="Download" >{{ $t('button.export') }}</el-button>
        </el-col>
        <template v-if="isColumn">
          <right-toolbar v-model:showSearch="showSearch" :columns="isColumns"></right-toolbar>
        </template>
        <template v-else>
          <right-toolbar v-model:showSearch="showSearch"></right-toolbar>
        </template>



      </el-row>

      <el-table :data="List" >
        <el-table-column type="selection" width="55" align="center" />
        <template v-for="(columns, index) in info.columns">
          <template v-if="columns.isPk == '1'">
            <el-table-column :label="columns.javaField" align="center"
              v-if="isColumns[index].visible" />
          </template>
          <template v-else-if="columns.isList == '1'">
            <el-table-column :label="columns.javaField" align="center" 
              v-if="isColumns[index].visible" />
          </template>
          <template v-else-if="columns.isList == '1' && columns.htmlType == 'datetime'">
            <el-table-column :label="columns.javaField" align="center" width="180">
              <template>
              </template>
            </el-table-column>
          </template>
          <template v-else-if="columns.isList == '1' && columns.htmlType == 'imageUpload'">
            <el-table-column :label="columns.javaField" align="center" width="100">
              <template>
                <image-preview :width="50" :height="50"/>
              </template>
            </el-table-column>
          </template>
      
        </template>

        <el-table-column :label="$t('user.operate')" align="center" class-name="small-padding fixed-width">
          <template>
            <el-button type="text" icon="Edit" @click="handleUpdate()">{{ $t('button.edit') }}</el-button>
            <el-button type="text" icon="Delete" @click="handleDelete()">{{ $t('button.delete') }}</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog :title="title" v-model="open" width="500px" append-to-body>
        <el-form ref="viewRef">
          <template v-for="columns in info.columns">
            <template v-if="columns.htmlType == 'input' && columns.isInsert == '1' ">
              <el-form-item :label="columns.javaField" >
                <el-input :placeholder="columns.javaField + 'Placeholder'" />
              </el-form-item>
            </template>
            <template v-if="columns.htmlType == 'select' && columns.isInsert == '1' ">
              <el-form-item :label="columns.javaField">
                <el-select :placeholder="columns.javaField + 'Placeholder'">
                  <el-option :label="$t('genTable.selectDict')" value="" />
                </el-select>
              </el-form-item>
            </template>
            <template v-if="columns.htmlType == 'imageUpload' && columns.isInsert == '1' ">
              <el-form-item :label="columns.javaField">
                <image-upload/>
              </el-form-item>
            </template>
            <template v-if="columns.htmlType == 'fileUpload' && columns.isInsert == '1' ">
              <el-form-item :label="columns.javaField">
                <file-upload/>
              </el-form-item>
            </template>
            <template v-if="columns.htmlType == 'editor' && columns.isInsert == '1' ">
              <el-form-item :label="columns.javaField">
                <editor :min-height="192"/>
              </el-form-item>
            </template>
            <template v-if="columns.htmlType == 'checkbox' && columns.isInsert == '1' ">
              <el-checkbox>{{ $t('genTable.selectDict') }}</el-checkbox>
            </template>
            <template v-if="columns.htmlType == 'radio' && columns.isInsert == '1' ">
              <el-form-item :label="columns.javaField">
                <el-radio-group>
                  <el-radio label="1">{{ $t('genTable.selectDict') }}</el-radio>
                </el-radio-group>
              </el-form-item>
            </template>
            <template v-if="columns.htmlType == 'datetime' && columns.isInsert == '1' ">
              <el-form-item :label="columns.javaField">
                <el-date-picker clearable
                  type="date"
                  value-format="YYYY-MM-DD"
                  :placeholder="columns.javaField + 'Placeholder'">
                </el-date-picker>
              </el-form-item>
            </template>
            <template v-if="columns.htmlType == 'textarea' && columns.isInsert == '1' ">
              <el-form-item :label="columns.javaField">
                <el-input type="textarea" :placeholder="columns.javaField + 'Placeholder'"/>
              </el-form-item>
            </template>
          </template>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button type="primary" @click="">{{ $t('button.submit') }}</el-button>
            <el-button @click="">{{ $t('button.cancel') }}</el-button>
          </div>
        </template>
      </el-dialog>
  </div>
</template>

<script setup lang="ts" name="preview">

import { getGenTable} from "@/api/tool/geni18n";
import { useRoute } from 'vue-router';
import { ref } from 'vue';


const route = useRoute();
const columns = ref<any[]>([]);
const info = ref<any>({});
const tables = ref<any[]>([]);
const isSearch = ref<boolean>(false); 
const isColumn = ref<boolean>(false);
const isColumns = ref<any>([]);


const single = ref(true);
const multiple = ref(true);
const List = ref([]);
const open = ref(false);
const showSearch = ref(true);
const title = ref("");
const showExtend = ref(false);


function handleAdd(){
  open.value = true;
  title.value = "Add";
}

function handleUpdate(){
  
}

function handleDelete(){
  
}

(() => {
  const tableId = route.params && route.params.tableId;
  if (tableId) {
    // 获取表详细信息
    getGenTable(tableId).then(res => {
      columns.value = res.data.rows;
      info.value = res.data.info;
      tables.value = res.data.tables;
      for (let columns in info.value.columns){
        if(info.value.columns[columns].search){
          isSearch.value = true;
          break;
        }
      }
      for (let columns in info.value.columns){
        if(info.value.columns[columns].isColumn == "1"){
          isColumn.value = true;
          break;
        }
      }
      for (let columns in info.value.columns){
        if(isColumn.value == true) {
          if(info.value.columns[columns].isColumn == "1")
            isColumns.value[columns] = {key : columns, label : info.value.columns[columns].javaField, visible: true}
          else
            isColumns.value[columns] = {key : columns, label : info.value.columns[columns].javaField, visible: false}
        }
        else
            isColumns.value[columns] = {key : columns, label : info.value.columns[columns].javaField, visible: true}
      }
    });
  }
})();

</script>