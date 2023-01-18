<template>
  <div :class="{ 'has-logo': showLogo }" :style="{ backgroundColor: sideTheme === 'theme-dark' ? variables.menuBackground : variables.menuLightBackground }">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar :class="sideTheme" wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="sideTheme === 'theme-dark' ? variables.menuBackground : variables.menuLightBackground"
        :text-color="sideTheme === 'theme-dark' ? variables.menuColor : variables.menuLightColor"
        :unique-opened="true"
        :active-text-color="theme"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="(menu, index) in sidebarMenus"
          :key="menu.path + index"
          :item="(menu as MenuData)"
          :base-path="menu.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup name="SideBar">;
import Logo from './Logo.vue';
import SidebarItem from './SidebarItem.vue';
import variables from '@/assets/styles/variables.module.scss';
import useAppStore from '@/stores/modules/app';
import useSettingsStore from '@/stores/modules/settings';
import usePermissionStore from '@/stores/modules/permission';
import { useRoute } from 'vue-router';
import { computed } from 'vue';

interface MenuData {
  path: string;
  hidden?: boolean;
  redirect?: string;
  component?: string; 
  alwaysShow?: boolean;
  isNest?: boolean;
  basePath?: string;
  meta: {
    title: string;       // ||设置该路由在侧边栏和面包屑中展示的名字
    icon: string;        // || 设置该路由的图标，对应路径src/assets/icons/svg 
    noCache: boolean;   // || true:则不会被 <keep-alive> 缓存(默认 false)
    link: string;      // ||外部链接
    activeMenu?: string;  // is it need?
    affix?: boolean;    // for the tagsview
    // breadcrumb?: boolean;  // for the Breadrumb
  };
  query?: string;
  children: MenuData[];
};

const route = useRoute();
const appStore = useAppStore()
const settingsStore = useSettingsStore()
const permissionStore = usePermissionStore()

const sidebarMenus =  computed(() => permissionStore.sidebarMenus);
const showLogo = computed(() => settingsStore.sidebarLogo);
const sideTheme = computed(() => settingsStore.sideTheme);
const theme = computed(() => settingsStore.theme);
const isCollapse = computed(() => !appStore.sidebar.opened);

const activeMenu = computed(() => {
  const { meta, path } = route;
  // if set path, the sidebar will highlight the path you set
  if (meta.activeMenu) {
    return meta.activeMenu;
  }
  return path;
})

</script>
