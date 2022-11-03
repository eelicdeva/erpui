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
            <el-col :span="6">
              <el-form-item label="xAxis data" prop="className">
                <el-select v-model="chartType" placeholder="">
                    <el-option label="Pie Chart" value="category" />
                    <el-option label="Bar Chart" value="loan" />
                    <el-option label="None" value="loan" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="18">
              <el-form-item label="yAxis data" prop="functionAuthor">
                <el-select v-model="chartType" placeholder="">
                    <el-option label="Pie Chart" value="category" />
                    <el-option label="Bar Chart" value="loan" />
                    <el-option label="None" value="loan" />
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