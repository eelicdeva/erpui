<template>
    <el-form ref="genChartForm" :model="info" :rules="rules" label-width="150px">
        <el-row>
            <el-col :span="24">
              <el-form-item label="chart type" prop="tableName">
                <el-select v-model="chartType" placeholder="">
                    <el-option label="Pie Chart" value="category" />
                    <el-option label="Bar Chart" value="loan" />
                    <el-option label="None" value="loan" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="xAxis data" prop="className">
                <el-select v-model="xAxis" placeholder="请选择">
                  <el-option 
                  v-for="columns in info.columns" 
                  :label="columns.javaField  + ' ：' + columns.columnName"
                  :key="columns.columnsId"
                  :value="columns.javaField"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="yAxis data" prop="functionAuthor">
                <el-select v-model="yAxis" placeholder="">
                  <el-option 
                  v-for="columns in info.columns" 
                  :label="columns.javaField  + ' ：' + columns.columnName"
                  :key="columns.columnsId"
                  :value="columns.javaField"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-form-item>
              <el-button type="primary" @click="test">{{ $t('button.submit2') }}</el-button>
            </el-form-item>
          </el-row>
      </el-form>
</template>

<script setup>
const xAxis = ref();
const yAxis = ref();
const props = defineProps({
  info: {
    type: Object,
    default: null
  },
  tables: {
    type: Array,
    default: null
  }
});

function test() {
  console.log(props.info.columns)
  console.log(props.tables);
  
}

</script>