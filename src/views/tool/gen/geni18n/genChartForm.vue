<template>
    <el-form ref="genChartForm" :model="info" :rules="rules" label-width="150px">
        <el-row>
            <el-col :span="24">
              <el-form-item :label="$t('genTable.chartType')" prop="chartType">
                <el-select v-model="info.chartType" :placeholder="$t('genTable.chartType')">
                  <el-option label="Basic Line Chart" value="1" />
                  <el-option label="Pie Chart" value="2" />
                  <el-option label="Bar Chart" value="3" />
                  <el-option label="None" value="0" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('genTable.xAxisChart')" prop="xAxisChart">
                <el-select v-model="info.xAxisChart" :placeholder="$t('genTable.xAxisChart')">
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
              <el-form-item :label="$t('genTable.yAxisChart')" prop="yAxisChart">
                <el-select v-model="info.yAxisChart" :placeholder="$t('genTable.yAxisChart')">
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
          </el-row>
      </el-form>
</template>

<script setup>

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



</script>