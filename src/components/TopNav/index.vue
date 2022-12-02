<template>
  <el-menu
    :default-active="activeMenu"
    mode="horizontal"
    @select="handleSelect"
    :ellipsis="true"
  >
    <template v-for="(item, index) in topMenus">
      <el-menu-item :style="{'--theme': theme}" :index="item.path" :key="index" v-if="index < visibleNumber"
        ><svg-icon :icon-class="item.meta.icon" />
        {{ item.meta.title }}
      </el-menu-item>
    </template>

    <!-- 顶部菜单超出数量折叠 -->
    <el-sub-menu :style="{'--theme': theme}" index="more" v-if="topMenus.length > visibleNumber">
      <template #title>{{ $t('components.topNav.moreMenu') }}</template>
      <template v-for="(item, index) in topMenus">
        <el-menu-item
          :index="item.path"
          :key="index"
          v-if="index >= visibleNumber">
          <svg-icon :icon-class="item.meta.icon" />
          {{ item.meta.title }}
        </el-menu-item>
      </template>
    </el-sub-menu>
  </el-menu>
</template>

<script lang="ts" setup name="TopNav">
import { constantRoutes } from "@/router";
import { isHttp } from '@/utils/validate';
import useAppStore from '@/stores/modules/app';
import useSettingsStore from '@/stores/modules/settings';
import usePermissionStore from '@/stores/modules/permission';
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

// 顶部栏初始数
var visibleNumber: number = ref(null) ;
// 当前激活菜单的 index
const currentIndex = ref(null);
// 隐藏侧边栏路由
const hideList = ['/index', '/user/profile'];

const appStore = useAppStore()
const settingsStore = useSettingsStore()
const permissionStore = usePermissionStore()
const route = useRoute(); // instance RouteLocationNormalizedLoaded
const router = useRouter(); // instance Router

// 主题颜色
const theme = computed(() => settingsStore.theme);
// 所有的路由信息
const routers = computed(() => permissionStore.topbarRouters);

interface TopMenu {
  parentPath: string;
  name: string;   
  path: string;
  hidden: boolean;
  redirect?: string;
  component: string | any; 
  alwaysShow?: boolean;
  permissions?: string[];
  roles?: string[];  
  meta: MetaMenu
};
 
interface MetaMenu {
    title: string;       // ||设置该路由在侧边栏和面包屑中展示的名字
    icon: string;        // || 设置该路由的图标，对应路径src/assets/icons/svg 
    noCache: boolean;   // || true:则不会被 <keep-alive> 缓存(默认 false)
    link: string;      // ||外部链接
    activeMenu?: string;  // is it need?
    affix?: boolean;    // for the tagsview
    breadcrumb?: boolean;  // for the Breadrumb
  };

// 顶部显示菜单
const topMenus = computed(() => {
  let topMenus: TopMenu[] = [];
  routers.value.map((menu) => {
    if (menu.hidden !== true) {
      // ||兼容顶部栏一级菜单内部跳转
      if (menu.path === "/") {
        if (!menu.children===undefined){ //!menu.children===undefined
          topMenus.push(menu.children[0]);}  //to-do check
      } else {
          topMenus.push(menu);
      }
    }
  })
  return topMenus;
})
console.log('topMenus: ')
console.log( topMenus)


// 设置子路由
const childrenMenus = computed(() => {
  let childrenMenus: TopMenu[] = [];
  routers.value.map((router) => {
    for (let item in router.children) {
      if (router.children[item].parentPath === undefined) {
        if(router.path === "/") {
          router.children[item].path = "/" + router.children[item].path;
        } else {
          if(!isHttp(router.children[item].path)) {
            router.children[item].path = router.path + "/" + router.children[item].path;
          }
        }
        router.children[item].parentPath = router.path;
      }
      childrenMenus.push(router.children[item]);
    }
  })
  return (constantRoutes as TopMenu[]).concat(childrenMenus);
})


// 默认激活的菜单
const activeMenu = computed(() => {
  const path = route.path;
  let activePath = path;
  if (path !== undefined && path.lastIndexOf("/") > 0 && hideList.indexOf(path) === -1) {
    const tmpPath = path.substring(1, path.length);
    activePath = "/" + tmpPath.substring(0, tmpPath.indexOf("/"));
    if (!route.meta.link) {
        appStore.toggleSideBarHide(false);
    }
  } else if(!route.children) {
    activePath = path;
    appStore.toggleSideBarHide(true);
  }
  activeRoutes(activePath);
  return activePath;
})



function setVisibleNumber() {
  const width = document.body.getBoundingClientRect().width / 3;
  visibleNumber = parseInt(String(width / 85));
}

function handleSelect(key, keyPath) {
  currentIndex.value = key;
  const route = routers.value.find(item => item.path === key);
  if (isHttp(key)) {
    // http(s):// 路径新窗口打开
    window.open(key, "_blank");
  } else if (!route || !route.children) {
    // 没有子路由路径内部打开
    router.push({ path: key });
    appStore.toggleSideBarHide(true);
  } else {
    // 显示左侧联动菜单
    activeRoutes(key);
    appStore.toggleSideBarHide(false);
  }
}

function activeRoutes(key: string) {
  let routes: TopMenu[] = [];
  if (childrenMenus.value && childrenMenus.value.length > 0) {
    childrenMenus.value.map((item) => {
      if (key == item.parentPath || (key == "index" && "" == item.path)) {
        routes.push(item);
      }
    });
  }
  if(routes.length > 0) {
    permissionStore.setSidebarRouters(routes);
  } else {
    appStore.toggleSideBarHide(true);
  }
  return routes;
}

onMounted(() => {
  window.addEventListener('resize', setVisibleNumber)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', setVisibleNumber)
})

onMounted(() => {
  setVisibleNumber()
})
</script>

<style lang="scss">
.topmenu-container.el-menu--horizontal > .el-menu-item {
  float: left;
  height: 50px !important;
  line-height: 50px !important;
  color: #999093 !important;
  padding: 0 5px !important;
  margin: 0 10px !important;
}

.topmenu-container.el-menu--horizontal > .el-menu-item.is-active, .el-menu--horizontal > .el-sub-menu.is-active .el-submenu__title {
  border-bottom: 2px solid #{'var(--theme)'} !important;
  color: #303133;
}

/* sub-menu item */
.topmenu-container.el-menu--horizontal > .el-sub-menu .el-sub-menu__title {
  float: left;
  height: 50px !important;
  line-height: 50px !important;
  color: #999093 !important;
  padding: 0 5px !important;
  margin: 0 10px !important;
}
</style>
