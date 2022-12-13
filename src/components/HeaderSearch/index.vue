<template>
  <div :class="{ 'show': show }" class="header-search">
    <svg-icon class-name="search-icon" icon-class="search" @click.stop="click" />
    <el-select
      ref="headerSearchSelectRef"
      v-model="search"
      :remote-method="querySearch"
      filterable
      default-first-option
      remote
      placeholder="Search"
      class="header-search-select"
      @change="change"
    >
      <el-option v-for="option in options" :key="option.item.path" :value="option.item" :label="option.item.title + (' > ')" />
    </el-select>
  </div>
</template>

<script lang="ts" setup name="HeaderSearch">
import Fuse from 'fuse.js'; // ||fuse.js没有依赖关系,模糊搜索
import { getNormalPath } from '@/utils/ruoyi';
import { isHttp } from '@/utils/validate';
import usePermissionStore from '@/stores/modules/permission';
import { computed, nextTick, onMounted, ref, watch, watchEffect } from 'vue';
import { useRouter, _RouteRecordBase } from 'vue-router';
import type { MenuData } from '@/router';
interface OptionData {
  item:{  
    path: string;
    title: string[];
  }
}

interface SearchData {
  path:  string;
  title: string[];
}

const search = ref('');
const options = ref([] as OptionData[]);
const searchPool = ref([] as SearchData[]) ;
const show = ref(false);
const fuse = ref() ;
const headerSearchSelectRef = ref(null);
const router = useRouter();
const menus = computed(() => usePermissionStore().defaultMenus);

function click() {
  show.value = !show.value
  if (show.value) {
    headerSearchSelectRef.value && (headerSearchSelectRef.value as HTMLSelectElement).focus()
  }
};
function close() {
  headerSearchSelectRef.value && (headerSearchSelectRef.value as HTMLSelectElement).blur()
  options.value = []
  show.value = false
}
function change(val: { path: string; }) {
  const path = val.path;
  if (isHttp(path)) {
    // http(s):// 路径新窗口打开
    const pindex = path.indexOf("http");
    window.open(path.slice(pindex, path.length), "_blank");
  } else {
    router.push(path)
  }

  search.value = ''
  options.value = []
  nextTick(() => {
    show.value = false
  })
}
function initFuse(list) {
  fuse.value = new Fuse(list, {
    shouldSort: true,
    threshold: 0.4,
    location: 0,
    distance: 100,
    //maxPatternLength: 32, // fuse Added ability to search patterns longer > 32 characters remove this setting.
    minMatchCharLength: 1,
    keys: [{
      name: 'title',
      weight: 0.7
    }, {
      name: 'path',
      weight: 0.3
    }]
  })
}

// Filter out the menus that can be displayed in the sidebar
// And generate the internationalized title
function generateRoutes(menus: MenuData[], basePath = '', prefixTitle= [] ) {
  let res: SearchData[] = [] ;
  for (const r of menus) {
    // skip hidden router
    if (r.hidden) { continue } //to-do check how to open logout/ profile
    const p = r.path.length > 0 && r.path[0] === '/' ? r.path : '/' + r.path;
    const data = {
      path: !isHttp(r.path) ? getNormalPath(basePath + p) : r.path as string,
      title: [...prefixTitle ] as string[]
    }

    if (r.meta && r.meta.title) {
      (data).title = [...data.title, r.meta.title]

      if (r.redirect !== 'noRedirect') {
        // only push the menus with title
        // special case: need to exclude parent router without redirect
        res.push(data)
      }
    }

    // recursive child menus
    if (r.children) {
      const tempRoutes = generateRoutes(r.children, data.path, data.title=[])
      if (tempRoutes.length >= 1) {
        res = [...res, ...tempRoutes]
      }
    }
  }
  return res
}
function querySearch(query: string) {
  if (query !== '') {
    options.value = fuse.value.search(query)
  } else {
    options.value = []
  }
}

onMounted(() => {
  searchPool.value = generateRoutes(menus.value);
})

watchEffect(() => {
  searchPool.value = generateRoutes(menus.value)
})

watch(show, (value) => {
  if (value) {
    document.body.addEventListener('click', close)
  } else {
    document.body.removeEventListener('click', close)
  }
})

watch(searchPool, (list) => {
  initFuse(list)
})
</script>

<style lang='scss' scoped>
.header-search {
  font-size: 0 !important;

  .search-icon {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
  }

  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;

    :deep(.el-input__inner) {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
    }
  }

  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>