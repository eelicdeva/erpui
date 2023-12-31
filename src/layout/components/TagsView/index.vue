<template>
  <div id="tags-view-container" class="tags-view-container">
    <scroll-pane ref="scrollPaneRef" class="tags-view-wrapper" @scroll="handleScroll">
      <router-link
        v-for="tag in visitedViews"
        :key="tag.fullPath"
        :data-path="tag.fullPath"
        :class="isActive(tag.fullPath) ? 'active' : ''"
        :to="{ path: tag.fullPath, query: tag.query }"
        class="tags-view-item"
        :style="activeStyle(tag.fullPath)"
        @click.middle="!isAffix(tag.fullPath,tag.meta.affix) ? closeSelectedTag(tag.fullPath) : ''"
        @contextmenu.prevent="openMenu(tag.fullPath, $event)"
      >
        {{ tag.meta.title }}
        <span v-if="!isAffix(tag.fullPath,tag.meta.affix)" @click.prevent.stop="closeSelectedTag(tag.fullPath)">
          <close class="el-icon-close" style="width: 1em; height: 1em;vertical-align: middle;" />
        </span>
      </router-link>
    </scroll-pane>
    <ul v-show="visible" :style="{ left: left + 'px', top: top + 'px' }" class="contextmenu">
      <li @click="refreshSelectedTag(selectedTag.fullPath)">
        <refresh-right style="width: 1em; height: 1em;" /> {{ $t('button.refresh') }}
      </li>
      <li v-if="!isAffix(selectedTag.fullPath)" @click="closeSelectedTag(selectedTag.fullPath)">
        <close style="width: 1em; height: 1em;" /> {{ $t('button.closecurrent') }}
      </li>
      <li @click="closeOthersTags(selectedTag.fullPath)">
        <circle-close style="width: 1em; height: 1em;" /> {{ $t('button.closeother') }}
      </li>
      <li v-if="!isFirstView()" @click="closeLeftTags(selectedTag.fullPath)">
        <back style="width: 1em; height: 1em;" /> {{ $t('button.closeleft') }}
      </li>
      <li v-if="!isLastView()" @click="closeRightTags(selectedTag.fullPath)">
        <right style="width: 1em; height: 1em;" /> {{ $t('button.closeright') }}
      </li>
      <li @click="closeAllTags(selectedTag.fullPath)">
        <circle-close style="width: 1em; height: 1em;" /> {{ $t('button.closeall') }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup name="TagsView">
import ScrollPane from './ScrollPane.vue';
import { getNormalPath } from '@/utils/ruoyi';
import useTagsViewStore from '@/stores/modules/tagsView';
import useSettingsStore from '@/stores/modules/settings';
import usePermissionStore from '@/stores/modules/permission';
import { computed, getCurrentInstance, nextTick, onMounted, ref, watch } from 'vue';
import { LocationQuery, useRoute, useRouter } from 'vue-router';
import type { VisitedView } from '@/stores/modules/tagsView';
import type { ComponentInternalInstance } from 'vue';
import { MenuData } from '@/router';

interface Tag {
  query?: LocationQuery;
  fullPath: string;
  path: string;
  name: string;
  meta: {
    affix?: boolean;
    icon?: string;  // for future use
    title: string; 
    link?: string | null;
    noCache?: boolean;
    activeMenu?: string; // for future use
  };
}

interface SelectedTag {
  fullPath: string;
  offsetLeft: number;
  offsetWidth: number;
}
const visible = ref(false);
const top = ref(0);
const left = ref(0);
const selectedTag = ref({} as SelectedTag);
const affixTags = ref([] as Tag[]);
const scrollPaneRef = ref<InstanceType<typeof ScrollPane> | null >(null)
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const route = useRoute(); // current route
const router = useRouter();

const visitedViews = computed(() => useTagsViewStore().visitedViews);
const defaultMenus = computed(() => usePermissionStore().defaultMenus);  
const theme = computed(() => useSettingsStore().theme);

watch(router.currentRoute, () => {
  addTags();
  moveToCurrentTag();
})
/**
watch(visitedViews, () => {
  moveToCurrentTag();
})
*/
watch(visible, (value) => {
  if (value) {
    document.body.addEventListener('click', closeMenu)
  } else {
    document.body.removeEventListener('click', closeMenu)
  }
})
onMounted(() => {
  initTags()
  addTags()
})

function isActive(r: string) { //r: fullPath
  return r === route.fullPath
}

function activeStyle( tag: string ) {//tag: fullPath
  if (!isActive(tag)) return {};
  return {
    "background-color": theme.value,
    "border-color": theme.value
  };
}

function isAffix(fullPath: string, affix?: boolean) {
  if (affix) {
    return true;
  }
  visitedViews.value.filter((fullPath, index) => {
    if(visitedViews.value[index].meta.affix) {
      return true;
    };
  })
}

function isFirstView() {
  try {
    return selectedTag.value.fullPath === visitedViews.value[1].fullPath || selectedTag.value.fullPath === '/index'
  } catch (err) {
    return false
  }
}
function isLastView() {
  try {
    return selectedTag.value.fullPath === visitedViews.value[visitedViews.value.length - 1].fullPath
  } catch (err) {
    return false
  }
}


/**
 * @desc filter tags from defaultMenus
 * @param { MenuData[] } menus 
 * @param { string } basePath 
 * @returns { Tag[] } tags 
 */
function filterAffixTags(defaultMenus: MenuData[], basePath: string = ''): Tag[] {
  let tags = [] as Tag[]; 
  defaultMenus.forEach( menu => {
    if ( !menu.hidden && menu.meta && menu.meta.affix && menu.name ) {
      const tagPath: string = getNormalPath(basePath + '/' + menu.path);
      tags.push({
        fullPath: tagPath,
        path: tagPath,
        name: menu.name,
        meta: { 
          ...menu.meta 
        }
      });
    };
    if (menu.children) {
      const tempTags = filterAffixTags(menu.children, menu.path)
      if (tempTags.length >= 1) {
        tags = [...tags, ...tempTags]
      };
    };
  })
  return tags
}

function initTags() {// tags from defaultMens
  const res = filterAffixTags(defaultMenus.value); 
  affixTags.value = res;
  for (const tag of res) {
    // Must have tag name
    if (tag.name) {
       useTagsViewStore().addVisitedView(tag)
    }
  }
}

/**
 * addTags
 * 有菜单项tag
 * 无菜单项tag(meta.activeMenu = 激活父菜单节点tag)
 * 
 */
function addTags() {
  const { fullPath, path, name, meta } = route;
  const { link } = meta
  const currentViewTag = {} as Tag;

  if (name !== null && name !== undefined) {
    currentViewTag.name = name as string;
    currentViewTag.fullPath = fullPath;
    currentViewTag.path = path;

    if ( meta ) {
    currentViewTag.meta = meta;      
    }   
    useTagsViewStore().addView( currentViewTag )

    if ( link !== null && link !== undefined){
      const { meta, path } = currentViewTag
      const { title } = meta 
      useTagsViewStore().addIframeView( { title, path } );
    }
  }
  return false
}

function moveToCurrentTag() {
  nextTick(() => {
    for (const r of visitedViews.value) {            
      if (r.path === route.path) {                      
        scrollPaneRef.value?.moveToTarget(r);
        // when query is different then update
        if (r.fullPath !== route.fullPath) {
          useTagsViewStore().updateVisitedView(route);
        }
      }
    }
  })
}

function refreshSelectedTag(view: string) {
  proxy?.$tab.refreshPage(view);
  const { fullPath } = route;
  if ( route.meta.link ) {
    useTagsViewStore().delIframeView(fullPath);
  };
}

function closeSelectedTag(view: string) { // view: fullPath
  proxy?.$tab.closePage(view).then(({ visitedViews }) => {
    if (isActive(view)) {
      toLastView(visitedViews, view)
    }
  })
}

function closeRightTags(view: string) {// view: fullPath
  proxy?.$tab.closeRightPage(view).then((visitedViews: VisitedView[]) => {
    if (!visitedViews.find((i: VisitedView) => i.fullPath === route.fullPath)) {
      toLastView(visitedViews)
    }
  })
}

function closeLeftTags(view: string) {
  proxy?.$tab.closeLeftPage(view).then((visitedViews: VisitedView[]) => {
    if (!visitedViews.find((i: VisitedView) => i.fullPath === route.fullPath)) {
      toLastView(visitedViews)
    }
  })
}

function closeOthersTags(view: string) {//fullPath 
  router.push(view).catch(() => { });  
  proxy?.$tab.closeOtherPage(view).then(() => {
    moveToCurrentTag()
  })
}

function closeAllTags(view: string) {
  proxy?.$tab.closeAllPage().then(({ visitedViews }) => {
    if (affixTags.value.some(tag => tag.path === route.path)) {
      return
    }
    toLastView(visitedViews, view)
  })
}

// router navigate to a new URL by pushing an entry in the history stack
function toLastView(visitedViews: Tag[], view?: string ) {//view:fullPath
  const latestView = visitedViews.slice(-1)[0]
  if (latestView) {
    router.push(latestView.fullPath)
  } else {
    // now the default is to redirect to the home page if there is no tags-view,
    // you can adjust it according to your needs.    
    if (view && view === 'index') {
      // to reload home page
      router.replace({ path: '/redirect' + view })
    } else {
      router.push('/')
    }
  }
}

function openMenu(fullPath: string, e: { clientX: number; clientY: number; }) {
  const menuMinWidth = 105
  const offsetLeft = proxy?.$el.getBoundingClientRect().left // container margin left
  const offsetWidth = proxy?.$el.offsetWidth || 40// todo-check container width || 检查缩放的时候无法弹出侧面菜单
  const maxLeft = offsetWidth - menuMinWidth // left boundary
  const l = e.clientX - offsetLeft + 15 // 15: margin right

  if (l > maxLeft) {
    left.value = maxLeft
  } else {
    left.value = l
  }

  top.value = e.clientY
  visible.value = true
  selectedTag.value = { fullPath, offsetLeft, offsetWidth }
}
function closeMenu() {
  visible.value = false
}
function handleScroll() {
  closeMenu()
}
</script>

<style lang='scss' scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;
        &::before {
          content: "";
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>

<style lang="scss">
//reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
        width: 12px !important;
        height: 12px !important;
      }
    }
  }
}
</style>