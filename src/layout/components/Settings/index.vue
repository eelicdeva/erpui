<template>
  <el-drawer v-model="showSettings" :withHeader="false" direction="rtl" size="300px">
    <div class="setting-drawer-title">
      <h3 class="drawer-title">{{ $t('settings.title') }}</h3>
    </div>
    <div class="setting-drawer-block-checbox">
      <div class="setting-drawer-block-checbox-item" @click="handleTheme('theme-dark')">
        <img src="@/assets/images/dark.svg" alt="dark" />
        <div v-if="sideTheme === 'theme-dark'" class="setting-drawer-block-checbox-selectIcon" style="display: block;">
          <i :aria-label="$t('settings.icon')" class="anticon anticon-check">
            <svg viewBox="64 64 896 896" data-icon="check" width="1em" height="1em" :fill="theme" aria-hidden="true" focusable="false" class>
              <path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 0 0-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z" />
            </svg>
          </i>
        </div>
      </div>
      <div class="setting-drawer-block-checbox-item" @click="handleTheme('theme-light')">
        <img src="@/assets/images/light.svg" alt="light" />
        <div v-if="sideTheme === 'theme-light'" class="setting-drawer-block-checbox-selectIcon" style="display: block;">
          <i :aria-label="$t('settings.icon')" class="anticon anticon-check">
            <svg viewBox="64 64 896 896" data-icon="check" width="1em" height="1em" :fill="theme" aria-hidden="true" focusable="false" class>
              <path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 0 0-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z" />
            </svg>
          </i>
        </div>
      </div>
    </div>
    <div class="drawer-item">
      <span>{{ $t('settings.theme') }}</span>
      <span class="comp-style">
        <el-color-picker v-model="theme" :predefine="predefineColors" @change="themeChange" />
      </span>
    </div>

    <div class="drawer-item">
      <span>{{ $t('settings.loginImage') }}</span>
    </div>
    <el-select v-model="backgroundImage" placeholder="Please select" @change="backgroundImageChange">
      <el-option label="Background 1" value="src/assets/images/login-background1.jpg">
        <span> Background 1 </span>
        <img src="@/assets/images/login-background1.jpg" style="height:32px;float: right" />
      </el-option>
      <el-option label="Background 2" value="src/assets/images/login-background2.jpg">
        <span> Background 2 </span>
        <img src="@/assets/images/login-background2.jpg" style="height:32px;float: right" />
      </el-option>
      <el-option label="Background 3" value="src/assets/images/login-background3.jpg">
        <span> Background 3 </span>
        <img src="@/assets/images/login-background3.jpg" style="height:32px;float: right" />
      </el-option>
      <el-option label="Background 4" value="src/assets/images/login-background4.jpg">
        <span> Background 4 </span>
        <img src="@/assets/images/login-background4.jpg" style="height:32px;float: right" />
      </el-option>
      <el-option label="Background 5" value="src/assets/images/login-background5.jpg">
        <span> Background 5 </span>
        <img src="@/assets/images/login-background5.jpg" style="height:32px;float: right" />
      </el-option>
      <el-option label="Background 6" value="src/assets/images/login-background6.jpg">
        <span> Background 6 </span>
        <img src="@/assets/images/login-background6.jpg" style="height:32px;float: right" />
      </el-option>
      <el-option label="Background 7" value="src/assets/images/login-background7.jpg">
        <span> Background 7 </span>
        <img src="@/assets/images/login-background7.jpg" style="height:32px;float: right" />
      </el-option>
      <el-option label="Background 8" value="src/assets/images/login-background8.jpg">
        <span> Background 8 </span>
        <img src="@/assets/images/login-background8.jpg" style="height:32px;float: right" />
      </el-option>
      <el-option label="Background 9" value="src/assets/images/login-background9.jpg">
        <span> Background 9 </span>
        <img src="@/assets/images/login-background9.jpg" style="height:32px;float: right" />
      </el-option>
      <el-option label="Background 10" value="src/assets/images/login-background10.jpg">
        <span> Background 10 </span>
        <img src="@/assets/images/login-background10.jpg" style="height:32px;float: right" />
      </el-option>
    </el-select>
    <el-divider />

    <h3 class="drawer-title">{{ $t('settings.config') }}</h3>

    <div class="drawer-item">
      <span>{{ $t('settings.topNav') }}</span>
      <span class="comp-style">
        <el-switch v-model="topNav" class="drawer-switch" />
      </span>
    </div>

    <div class="drawer-item">
      <span>{{ $t('settings.tagsView') }}</span>
      <span class="comp-style">
        <el-switch v-model="tagsView" class="drawer-switch" />
      </span>
    </div>

    <div class="drawer-item">
      <span>{{ $t('settings.fixedHeader') }}</span>
      <span class="comp-style">
        <el-switch v-model="fixedHeader" class="drawer-switch" />
      </span>
    </div>

    <div class="drawer-item">
      <span>{{ $t('settings.sidebarLogo') }}</span>
      <span class="comp-style">
        <el-switch v-model="sidebarLogo" class="drawer-switch" />
      </span>
    </div>

    <div class="drawer-item">
      <span>{{ $t('settings.dynamicTitle') }}</span>
      <span class="comp-style">
        <el-switch v-model="dynamicTitle" class="drawer-switch" />
      </span>
    </div>

    <el-divider />

    <el-button type="primary" plain icon="DocumentAdd" @click="saveSetting">{{ $t('settings.save') }}</el-button>
    <el-button plain icon="Refresh" @click="resetSetting">{{ $t('settings.reset') }}</el-button>
  </el-drawer>

</template>

<script lang="ts" setup name="Settings">
// to-do change to "ts" error
import variables from '@/assets/styles/variables.module.scss'
import originElementPlus from 'element-plus/theme-chalk/index.css';
import axios from 'axios';
import { ElLoading, ElMessage } from 'element-plus';
import { useDynamicTitle } from '@/utils/dynamicTitle';
import useAppStore from '@/stores/modules/app';
import useSettingsStore from '@/stores/modules/settings';
import usePermissionStore from '@/stores/modules/permission';
import { handleThemeStyle } from '@/utils/theme'
import i18n from '@/lang/index';
import { computed, getCurrentInstance, ref, watch } from 'vue';
import type { ComponentInternalInstance } from 'vue';

const { t } = i18n.global;
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
/**
 * Check Stores data loading order
 * 
 * 
 */


const appStore = useAppStore()
const settingsStore = useSettingsStore()
const permissionStore = usePermissionStore()

const showSettings = ref(false);
const theme = ref(settingsStore.theme);
const sideTheme = ref(settingsStore.sideTheme);
const backgroundImage = ref(settingsStore.backgroundImage);
const storeSettings = computed(() => settingsStore);
const predefineColors = ref(["#409EFF", "#ff4500", "#ff8c00", "#ffd700", "#90ee90", "#00ced1", "#1e90ff", "#c71585"]);

/** 是否需要topnav */
const topNav = computed({
  get: () => storeSettings.value.topNav,
  set: (val) => {
    settingsStore.changeSetting({ key: 'topNav', value: val })
    if (!val) {
      appStore.toggleSideBarHide(false);
      permissionStore.setSidebarMenus(permissionStore.defaultMenus);
    }
  }
})
/** 是否需要tagview */
const tagsView = computed({
  get: () => storeSettings.value.tagsView,
  set: (val) => {
    settingsStore.changeSetting({ key: 'tagsView', value: val })
  }
})
/**是否需要固定头部 */
const fixedHeader = computed({
  get: () => storeSettings.value.fixedHeader,
  set: (val) => {
    settingsStore.changeSetting({ key: 'fixedHeader', value: val })
  }
})
/**||是否需要侧边栏的logo */
const sidebarLogo = computed({
  get: () => storeSettings.value.sidebarLogo,
  set: (val) => {
    settingsStore.changeSetting({ key: 'sidebarLogo', value: val })
  }
})
/**||是否需要侧边栏的动态网页的title */
const dynamicTitle = computed({
  get: () => storeSettings.value.dynamicTitle,
  set: (val) => {
    settingsStore.changeSetting({ key: 'dynamicTitle', value: val })
    // ||动态设置网页标题
    useDynamicTitle()
  }
})

function themeChange(val) {
  settingsStore.changeSetting({ key: 'theme', value: val })
  theme.value = val;
}

function handleTheme(val) {
  settingsStore.changeSetting({ key: 'sideTheme', value: val })
  sideTheme.value = val;
}

function backgroundImageChange(val) {
  settingsStore.changeSetting({ key: 'backgroundImage', value: val })
  backgroundImage.value = val;
}

function saveSetting() {
  proxy?.$modal.loading(t('settings.loading'));
  let layoutSetting = {
    "topNav": storeSettings.value.topNav,
    "tagsView": storeSettings.value.tagsView,
    "fixedHeader": storeSettings.value.fixedHeader,
    "sidebarLogo": storeSettings.value.sidebarLogo,
    "dynamicTitle": storeSettings.value.dynamicTitle,
    "sideTheme": storeSettings.value.sideTheme,
    "theme": storeSettings.value.theme,
    "backgroundImage": storeSettings.value.backgroundImage
  };
  localStorage.setItem("layout-setting", JSON.stringify(layoutSetting));
  setTimeout(proxy?.$modal.closeLoading(), 1000)
}
function resetSetting() {
  proxy?.$modal.loading(t('settings.loadingreset'));
  localStorage.removeItem("layout-setting")
  setTimeout("window.location.reload()", 1000)
}
function openSetting() {
  showSettings.value = true;
}

defineExpose({
  openSetting,
  handleThemeStyle,
  variables,
  originElementPlus,
  axios,
  ElLoading, 
  ElMessage
})

//to-do check
watch(backgroundImage, () => { console.log(backgroundImage.value) })
</script>

<style lang='scss' scoped>
.setting-drawer-title {
  margin-bottom: 12px;
  color: rgba(0, 0, 0, 0.85);
  line-height: 22px;
  font-weight: bold;

  .drawer-title {
    font-size: 14px;
  }
}

.setting-drawer-block-checbox {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 20px;

  .setting-drawer-block-checbox-item {
    position: relative;
    margin-right: 16px;
    border-radius: 2px;
    cursor: pointer;

    img {
      width: 48px;
      height: 48px;
    }

    .custom-img {
      width: 48px;
      height: 38px;
      border-radius: 5px;
      box-shadow: 1px 1px 2px #898484;
    }

    .setting-drawer-block-checbox-selectIcon {
      position: absolute;
      top: 0;
      right: 0;
      width: 100%;
      height: 100%;
      padding-top: 15px;
      padding-left: 24px;
      color: #1890ff;
      font-weight: 700;
      font-size: 14px;
    }
  }
}

.drawer-item {
  color: rgba(0, 0, 0, 0.65);
  padding: 12px 0;
  font-size: 14px;

  .comp-style {
    float: right;
    margin: -3px 8px 0px 0px;
  }
}
</style>