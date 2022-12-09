<template>
  <div v-if="!item.hidden">
    <template v-if="hasOneShowingChild(item.children, item) && (!onlyOneChild.children || onlyOneChild.alwaysShow) && !item.alwaysShow">
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path, onlyOneChild.query)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{ 'submenu-title-noDropdown': !isNest }">
          <svg-icon :icon-class="onlyOneChild.meta.icon || (item.meta && item.meta.icon)"/>
          <template #title><span class="menu-title" :title="hasTitle(onlyOneChild.meta.title)">{{ onlyOneChild.meta.title }}</span></template>
        </el-menu-item>
      </app-link>
    </template>

    <el-sub-menu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <template v-if="item.meta" #title>
        <svg-icon :icon-class="item.meta && item.meta.icon" />
        <span class="menu-title" :title="hasTitle(item.meta.title)">{{ item.meta.title }}</span>
      </template>

      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-sub-menu>
  </div>
</template>

<script lang="ts" setup name="SidebarItem">
import { isExternal } from '@/utils/validate'
import AppLink from './Link.vue'
import { getNormalPath } from '@/utils/ruoyi'
import { ref } from 'vue';

interface OnlyOneChild {
  path: string;
  hidden?: boolean;
  redirect?: string;
  component: string | any; 
  alwaysShow?: boolean;
  permissions?: string[];
  roles?: string[];  // to-do check
  meta: ItemMeta;
  
  query: string | Object; // to-do check
  children: OnlyOneChild[];
};

interface ItemMenu {
  name: string;   
  parentPath?: string;
  path: string;
  hidden?: boolean;
  redirect?: string;
  component: string | any; 
  alwaysShow?: boolean;
  permissions?: string[];
  roles?: string[];  // to-do check
  meta: ItemMeta;
  children?: ItemMenu[];
};
 
interface ItemMeta {
  title: string;       // ||设置该路由在侧边栏和面包屑中展示的名字
  icon?: string;        // || 设置该路由的图标，对应路径src/assets/icons/svg 
  noCache?: boolean;   // || true:则不会被 <keep-alive> 缓存(默认 false)
  link?: string;      // ||外部链接
  activeMenu?: string;  // is it need?
  affix?: boolean;    // for the tagsview
  breadcrumb?: boolean;  // for the Breadrumb
};

interface ItemProps {
  item: ItemMenu;
  isNest?: boolean;
  basePath?: string;
}
/*
const props = withDefaults(defineProps<ItemProps>(), {
  //item: {},
  isNest: false,
  basePath: ''
});
*/
const props = defineProps({
  // route object
  item: {
    type: Object,
    required: true
  },
  isNest: {
    type: Boolean,
    default: false
  },
  basePath: {
    type: String,
    default: ''
  }
})

const onlyOneChild = ref( {} as OnlyOneChild );

function hasOneShowingChild(children: ItemMenu[], parent: ItemMenu) {
  if (!children) {
    children = [];
  }
  const showingChildren = children.filter(( item : ItemMenu )=> {
    if (item.hidden) {
      return false
    } else {
      // Temp set(will be used if only has one showing child)
      onlyOneChild.value = item
      return true
    }
  })

  // When there is only one child router, the child router is displayed by default
  if (showingChildren.length === 1) {
    return true
  }

  // Show parent if there are no child router to display
  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parent, path: '', alwaysShow: true }
    return true
  }

  return false
};

function resolvePath(routePath?: string, routeQuery?: any) { //to-do check routeQuery
  if (isExternal(routePath)) {
    return routePath
  }
  if (isExternal(props.basePath)) {
    return props.basePath
  }
  if (routeQuery) {
    let query = JSON.parse(routeQuery);
    return { path: getNormalPath(props.basePath + '/' + routePath), query: query }
  }
  return getNormalPath(props.basePath + '/' + routePath)
}

function hasTitle(title){
  if (title.length > 5) {
    return title;
  } else {
    return "";
  }
}
</script>
