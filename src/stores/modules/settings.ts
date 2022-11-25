import { defineStore } from 'pinia'
import defaultSettings from '@/settings'
import { useDynamicTitle } from '@/utils/dynamicTitle'

interface UseSettingsStore {
  title: string;
  theme: string;
  sideTheme: string;
  showSettings: boolean;
  topNav: boolean;
  tagsView: boolean;
  fixedHeader: boolean;
  sidebarLogo: boolean;
  dynamicTitle: boolean;
}
const { sideTheme, showSettings, topNav, tagsView, fixedHeader, sidebarLogo, dynamicTitle } = defaultSettings

const storageSetting = JSON.parse(localStorage.getItem('layout-setting') || '{}' ) || ''

const useSettingsStore = defineStore(
  'settings',
  {
    state: (): UseSettingsStore => ({
      title: '',// type ImportMetaEnv [key: string]: any ?is it string
      theme: storageSetting.theme || '#409EFF', //string
      sideTheme: storageSetting.sideTheme || sideTheme, //string
      showSettings: showSettings, //boolean
      topNav: storageSetting.topNav === undefined ? topNav : storageSetting.topNav,//boolean
      tagsView: storageSetting.tagsView === undefined ? tagsView : storageSetting.tagsView, //boolean
      fixedHeader: storageSetting.fixedHeader === undefined ? fixedHeader : storageSetting.fixedHeader, //boolean
      sidebarLogo: storageSetting.sidebarLogo === undefined ? sidebarLogo : storageSetting.sidebarLogo, //boolean
      dynamicTitle: storageSetting.dynamicTitle === undefined ? dynamicTitle : storageSetting.dynamicTitle //boolean
    }),
    actions: {
      // 修改布局设置
      
      changeSetting(data: { key: string; value: string | boolean}) {
        // { key: sideTheme, value: theme-light / theme-dark }
        const { key, value } = data;
        if (this.hasOwnProperty(key)) {
          this[key]= value;
        }
      },
      // 设置网页标题
      setTitle(title: string) {
        this.title = title;
        useDynamicTitle();
      }
    }
  })

export default useSettingsStore
