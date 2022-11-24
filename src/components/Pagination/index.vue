<template>
  <div :class="{ 'hidden': hidden }" class="pagination-container">
    <el-pagination
      :background="background"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :layout="layout"
      :page-sizes="pageSizes"
      :pager-count="pagerCount"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script lang="ts" setup name="Pageination">
import { scrollTo } from '@/utils/scroll-to'
import { computed } from 'vue';
interface Props {
  total: number; // required
  page?: number;
  limit?: number;
  pageSizes?: number[];
  pagerCount?: number;
  layout?: string;
  background?: boolean;
  autoScroll?: boolean;
  hidden?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  total: 0,
  page: 1,
  limit: 20,
  pageSizes: ()=>[10, 20, 30, 50],
  // 移动端页码按钮的数量端默认值5
  pagerCount: document.body.clientWidth < 992 ? 5 : 7,
  layout: 'total, sizes, prev, pager, next, jumper',
  background: true,
  autoScroll: true,
  hidden: false
});

interface Emit{
  (e: 'update:page', page: number): void; 
  (e: 'update:limit', limit: number): void;  
  (e: 'pagination', { page, limit }): void;  
}
const emit = defineEmits<Emit>()
// to-do: check again https://www.mybj123.com/17272.html
const currentPage = computed({
  get() {
    return props.page
  },
  set(val) {
    emit('update:page', val)
  }
})
const pageSize = computed({
  get() {
    return props.limit
  },
  set(val){
    emit('update:limit', val)
  }
})

function handleSizeChange(val: number) {
  if (currentPage.value * val > props.total) {
    currentPage.value = 1
  }
  emit('pagination', { page: currentPage.value, limit: val })
  if (props.autoScroll) {
    scrollTo(0, 800)
  }
}
function handleCurrentChange(val: number) {
  emit('pagination', { page: val, limit: pageSize.value })
  if (props.autoScroll) {
    scrollTo(0, 800)
  }
}

</script>

<style scoped>
.pagination-container {
  background: #fff;
  padding: 32px 16px;
}
.pagination-container.hidden {
  display: none;
}
</style>