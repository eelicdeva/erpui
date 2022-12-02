import router from './router'
import { ElMessage } from 'element-plus'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'
import { isHttp } from '@/utils/validate'
import { isRelogin } from '@/utils/request'
import useUserStore from '@/stores/modules/user'
import useSettingsStore from '@/stores/modules/settings'
import usePermissionStore from '@/stores/modules/permission'
import type { RouteLocationNormalized, RouteRecordNormalized } from 'vue-router'

NProgress.configure({ showSpinner: false });

const whiteList = ['/login', '/auth-redirect', '/bind', '/register', '/mbti','/demo'];
/**
 * router.beforeEach
 * interface NavigationGuardWithThis<T> {(this: T, to: RouteLocationNormalized, 
 *    from: RouteLocationNormalized, next: NavigationGuardNext
 *    ): NavigationGuardReturn | Promise<NavigationGuardReturn>;
 */
router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next): void => {
  NProgress.start()
  if (getToken()) {
    to.meta.title && useSettingsStore().setTitle(to.meta.title)
    /* has token*/
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      if (useUserStore().roles.length === 0) {
        isRelogin.show = true
        // ||判断当前用户是否已拉取完user_info信息
        useUserStore().getInfo().then(() => {
          isRelogin.show = false
          //to-do accessRoutes : ConcatArray<RouteRecordRaw>
          usePermissionStore().generateRoutes().then((accessRoutes: any) => { 
            // ||根据roles权限生成可访问的路由表
            accessRoutes.forEach((route: RouteRecordNormalized) => {
              if (!isHttp(route.path)) {
                router.addRoute(route) // ||动态添加可访问路由表
              }
            })
            next({ ...to, replace: true }) // ||hack方法 确保addRoutes已完成
          })
        }).catch(err => {
          useUserStore().logOut().then(() => {
            ElMessage.error(err)
            next({ path: '/' })
          })
        })
      } else {
        next()
      }
    }
  } else {
    // 没有token
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next()
    } else {
      next(`/login?redirect=${to.fullPath}`) // 否则全部重定向到登录页
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
