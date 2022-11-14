// @/stores/modules/app.ts 
import Cookies from 'js-cookie'
import { defineStore } from 'pinia';
import { useAppStore } from '@/stores/interface'

const useAppStore = defineStore('app', {
    state: () => ({
      sidebar: {
        opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus')! : true,
        withoutAnimation: false,
        hide: false
      },
      device: 'desktop',
      size: Cookies.get('size') || 'default',
      lang: Cookies.get('lang') || navigator.language.substring(0,2),
      userNameMbti : '',
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
          console.log("Open Value!!: "!!+Cookies.get('sidebarStatus') )
        } else {
          Cookies.set('sidebarStatus', "0")
          console.log("Close Value!!: "!!+Cookies.get('sidebarStatus') )
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
        Cookies.set('size', size)
      },
      toggleSideBarHide(status: boolean) {
        this.sidebar.hide = status
      },
      setLanguage(lang: string) {
        this.lang = lang;
        Cookies.set('lang', lang, { expires: 30 })
      },
      setuserNameMbti(userNameMbti: string) {
        this.userNameMbti = userNameMbti
      },
    }
  })

export default useAppStore
