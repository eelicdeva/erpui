<template>
  <div class="top-right-btn" :style="style">
    <el-row>
      <el-tooltip class="item" effect="dark" :content="showSearch ? $t('button.hideSearch') : $t('button.showSearch')" placement="top" v-if="search">
        <el-button circle icon="Search" @click="toggleSearch()" />
      </el-tooltip>
      <el-tooltip class="item" effect="dark" :content="$t('tagsView.refresh')" placement="top">
        <el-button circle icon="Refresh" @click="refresh()" />
      </el-tooltip>
      <el-tooltip class="item" effect="dark" :content="$t('button.showhideList')" placement="top" v-if="columns">
        <el-button circle icon="Menu" @click="showColumn()" />
      </el-tooltip>
    </el-row>
    <el-dialog :title="title" v-model="open" append-to-body>
      <el-transfer
        :titles="[$t('button.show'), $t('button.hide')]"
        v-model="value"
        :data="columns"
        @change="dataChange"
      ></el-transfer>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup name="RightToolbar">
import i18n from '@/lang/index';
import { computed, ref } from 'vue';
const {t} = i18n.global;

interface RightToolbarProps{
  showSearch?: boolean;
  columns?:[{visible: boolean}];
  search?: boolean;
  gutter?: number;
};

const props = withDefaults(defineProps<RightToolbarProps>(), { 
    showSearch: true, 
    search: true,
    gutter: 10
});

const emits = defineEmits(['update:showSearch', 'queryTable']);

// ||显隐数据
const value: { value: number[]; } = ref([]);
// ||弹出层标题
const title = ref(t('button.showhide'));
// ||是否显示弹出层
const open = ref(false);

const style = computed(() => {
  const ret: { marginRight?: string; } = {};
  if (props.gutter) {
    ret.marginRight = `${props.gutter / 2}px`;
  }
  return ret;
});


// 搜索
function toggleSearch() {
  emits("update:showSearch", !props.showSearch);
}

// ||刷新
function refresh() {
  emits("queryTable");
}


// ||右侧列表元素变化
function dataChange(data: boolean[]) {
  for (let item in props.columns) {
    const key = props.columns[item].key;
    props.columns[item].visible = !data.includes(key);
  }
}

// ||打开显隐列dialog
function showColumn() {
  open.value = true;
}

// ||显隐列初始默认隐藏列
for (let item in props.columns) {
  if (props.columns[item].visible === false) {
    value.value.push(parseInt(item));
  }
}
</script>

<style lang='scss' scoped>
:deep(.el-transfer__button) {
  border-radius: 50%;
  display: block;
  margin-left: 0px;
}
:deep(.el-transfer__button:first-child) {
  margin-bottom: 10px;
}

.my-el-transfer {
  text-align: center;
}
</style>