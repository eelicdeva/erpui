// @/stores/modules/app.ts 
// to-do: ? !!+Cookies.get('sidebarStatus') ！！常常用来做类型判断，在第一步!（变量）之后再做逻辑取反运算
// ? : 可选运算符 1 ？ ！！+1 ： true
import Cookies from 'js-cookie'
import { defineStore } from 'pinia';

const useAppStore = defineStore('app', {
    state: () => ({
      sidebar: {
        opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
        withoutAnimation: false,
        hide: false
      },
      device: 'desktop',
      size: Cookies.get('size') || 'default',
      lang: Cookies.get('lang'),
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
