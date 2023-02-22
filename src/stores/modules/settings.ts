import { defineStore } from 'pinia'
import defaultSettings from '@/settings'
import { useDynamicTitle } from '@/utils/dynamicTitle'

export interface UseSettingsStore {
  backgroundImage: string;
  dynamicTitle: boolean;
  fixedHeader: boolean;
  showSettings: boolean; 
  sideTheme: string;
  sidebarLogo: boolean;
  tagsView: boolean;
  title: string;
  theme: string;
  topNav: boolean;
}
const { sideTheme, showSettings, topNav, tagsView, fixedHeader, sidebarLogo, dynamicTitle } = defaultSettings

const storageSetting =  JSON.parse((localStorage.getItem('layout-setting')) || '{}') //||JSON.parse的返回值是any类型

const useSettingsStore = defineStore(
  'settings',
  {
    state: () => ({
      backgroundImage: storageSetting.backgroundImage || 'src/assets/images/login-background1.jpg',//string
      dynamicTitle: storageSetting.dynamicTitle === undefined ? dynamicTitle : storageSetting.dynamicTitle, //boolean
      fixedHeader: storageSetting.fixedHeader === undefined ? fixedHeader : storageSetting.fixedHeader, //boolean
      showSettings: showSettings, //boolean
      sideTheme: storageSetting.sideTheme || sideTheme, //string
      sidebarLogo: storageSetting.sidebarLogo === undefined ? sidebarLogo : storageSetting.sidebarLogo, //boolean
      tagsView: storageSetting.tagsView === undefined ? tagsView : storageSetting.tagsView, //boolean
      theme: storageSetting.theme || '#409EFF', //string
      title: '',// tags title: route.name 
      topNav: storageSetting.topNav === undefined ? topNav : storageSetting.topNav,//boolean
    }),
    actions: {
      // ||修改布局设置
      
      changeSetting(data: any) {
        const { key, value } = data;
        if (this.hasOwnProperty(key)) {
          Reflect.set(this, key, value);
          // this[key]= value;
        }
      },
      // ||设置网页标题
      setTitle(title: string) {
        this.title = title;
        useDynamicTitle();
      }
    }
  })

export default useSettingsStore
