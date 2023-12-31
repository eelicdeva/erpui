<template>
  <div class="app-container">
    <el-form ref="queryRef" :inline="true">
      <el-form-item :label="$t('book.statistics')" prop="bookTitle">
        <el-select v-model="stats" :placeholder="$t('book.statistics')">
          <el-option :label="$t('book.categoryStatistic')" value="category" />
          <el-option :label="$t('book.LoanStatistic')" value="loan" />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="Refresh" @click="handleQuery">{{ $t('tagsView.refresh') }}</el-button>
      </el-form-item>
    </el-form>

    <el-card v-show="showLoanStats">
      <template #header><span>{{ $t('book.LoanStatistic') }}</span></template>
      <div class="el-table el-table--enable-row-hover el-table--medium">
        <div ref="bookLoanStats" style="height: 420px" />
      </div>
    </el-card>

    <el-card v-show="showCategoryStats">
      <template #header><span>{{ $t('book.categoryStatistic') }}</span></template>
      <div class="el-table el-table--enable-row-hover el-table--medium">
        <div ref="bookCategoryStats" style="height: 420px" />
      </div>
    </el-card>

  </div>
</template>

<script lang="ts" setup name="Loan">
import { countBookLoan } from "@/api/hr/loan";
import { countBookCategory } from "@/api/hr/book";
import * as echarts from 'echarts';
import { ref } from 'vue';
import type { ElForm } from "element-plus";

const showLoanStats = ref(false);
const showCategoryStats = ref(true);
let stats = ref();
let bookCategoryStats: HTMLElement;
let bookLoanStats: HTMLElement;


/** 搜索按钮操作 */
function handleQuery() {
  if (stats.value == "category") {
    showCategoryStats.value = true;
    showLoanStats.value = false;
  }
  if (stats.value == "loan") {
    showCategoryStats.value = false;
    showLoanStats.value = true;
    countLoan();
  }

}

function countCategory() {
  countBookCategory().then(response => {
    const bookCategoryStatsIntance = echarts.init(bookCategoryStats, "macarons");
    bookCategoryStatsIntance.setOption({
      xAxis: {
        data: response.data.dictLabel,
        axisLabel: {
          inside: true,
          color: '#fff'
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        },
        z: 10
      },
      yAxis: {
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          color: '#999'
        }
      },
      dataZoom: [
        {
          type: 'inside'
        }
      ],
      series: [
        {
          type: 'bar',
          showBackground: true,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#83bff6' },
              { offset: 0.5, color: '#188df0' },
              { offset: 1, color: '#188df0' }
            ])
          },
          emphasis: {
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#2378f7' },
                { offset: 0.7, color: '#2378f7' },
                { offset: 1, color: '#83bff6' }
              ])
            }
          },
          data: response.data.result
        }
      ]
    });
    const zoomSize = 6;
    bookCategoryStatsIntance.on('click', function (params) {
      bookCategoryStatsIntance.dispatchAction({
        type: 'dataZoom',
        startValue: response.data.dictLabel[Math.max(params.dataIndex - zoomSize / 2, 0)],
        endValue:
          response.data.dictLabel[Math.min(params.dataIndex + zoomSize / 2, response.data.result.length - 1)]
      });
    });

  });
}

function countLoan() {
  countBookLoan().then(response => {
    const bookLoanStatsIntance = echarts.init(bookLoanStats, "macarons");
    bookLoanStatsIntance.setOption({ 
      xAxis: {
        data: response.data.checkoutDate,
        axisLabel: {
          inside: true,
          color: '#fff'
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        },
        z: 10
      },
      yAxis: {
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          color: '#999'
        }
      },
      dataZoom: [
        {
          type: 'inside'
        }
      ],
      series: [
        {
          type: 'bar',
          showBackground: true,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#83bff6' },
              { offset: 0.5, color: '#188df0' },
              { offset: 1, color: '#188df0' }
            ])
          },
          emphasis: {
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#2378f7' },
                { offset: 0.7, color: '#2378f7' },
                { offset: 1, color: '#83bff6' }
              ])
            }
          },
          data: response.data.result
        }
      ]
    });
    const zoomSize = 6;
    bookLoanStatsIntance.on('click', function (params) {
      bookLoanStatsIntance.dispatchAction({
        type: 'dataZoom',
        startValue: response.data.checkoutDate[Math.max(params.dataIndex - zoomSize / 2, 0)],
        endValue:
        response.data.checkoutDate[Math.min(params.dataIndex + zoomSize / 2, response.data.result.length - 1)]
      });
    });
  });
}

countCategory();
</script>
