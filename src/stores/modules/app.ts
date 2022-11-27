// @/stores/modules/app.ts 
// to-do: check if navigator.language in dict lang list
import Cookies from 'js-cookie'
import { defineStore } from 'pinia';

interface UseAppStore {
  sidebar: { 
    opened: boolean;
    withoutAnimation: boolean;
    hide: boolean;
  },
  device: string;
  size: string;
  lang: string; 
};
const useAppStore = defineStore('app', {
    state: (): UseAppStore => ({
      sidebar: {
        opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus')! : true,
        withoutAnimation: false,
        hide: false
      },
      device: 'desktop',
      size: Cookies.get('size') || 'default',
      lang: Cookies.get('lang') || ( "zh.en.id".indexOf(navigator.language.substring(0,2))!=-1 ? navigator.language.substring(0,2) : 'en'),
    }),
    actions: {
      toggleSideBar(withoutAnimation: boolean) {
        if (this.sidebar.hide) {
          return false;
        }
        this.sidebar.opened = !this.sidebar.opened;
        this.sidebar.withoutAnimation = withoutAnimation;

        if (this.sidebar.opened) {
          Cookies.set('sidebarStatus', "1")
        } else {
          Cookies.set('sidebarStatus', "0")
        }
      },
      closeSideBar(withoutAnimation: boolean) {
        Cookies.set('sidebarStatus', "0")
        this.sidebar.opened = false
        this.sidebar.withoutAnimation = withoutAnimation
      },
      toggleDevice(device: string) {
        this.device = device
      },
      setSize(size: string) {
        this.size = size;
        Cookies.set('size', size, { expires: 30 })
      },
      toggleSideBarHide(status: boolean) {
        this.sidebar.hide = status
      },
      setLanguage(lang: string) {
        this.lang = lang;
        Cookies.set('lang', lang, { expires: 30 })
      }
    }
  })

export default useAppStore
