/* Layout */
import { createWebHistory, createRouter } from 'vue-router';
import Layout from '@/layout/index.vue';
import i18n from '@/lang/index';
import type { RouteRecordRaw, Router, _RouteRecordBase, RouteLocationNormalized } from 'vue-router';
const {t} = i18n.global;
/**
 * Note: Coustom router setting || 路由配置项
 *
 *
 * hidden: true                     // coustom ||当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 * alwaysShow: true                 // coustom ||当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 *                                  // 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 *                                  // 若你想不管路由下面的 children 声明的个数都显示你的根路由
 *                                  // 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 * redirect: noRedirect             // 当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 * name:'router-name'               // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * query: '{"id": 1, "name": "ry"}' // 访问路由的默认传递参数
 * roles: ['admin', 'common']       // coustom||访问路由的角色权限
 * permissions: ['a:a:a', 'b:b:b']  // coustom||访问路由的菜单权限
 * meta : {
 *   noCache: true                   // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
 *   title: 'title'                  // 设置该路由在侧边栏和面包屑中展示的名字
 *   icon: 'svg-name'                // 设置该路由的图标，对应路径src/assets/icons/svg
 *   breadcrumb: false               // 如果设置为false，则不会在breadcrumb面包屑中显示
 *   activeMenu: '/system/user'      // 当路由设置了该属性，则会高亮相对应的侧边栏。
 * }
 */

/**
 * Coustom router setting || 定制路由配置项;
 * 
 * // constantRouters setting detail ||设置公共路由;
 * @import type { RouteRecordRaw, _RouteRecordBase } from 'vue-router';
 * @custom declare module 'vue-router': {_RouteRecordBase, RouteMeta}  in '@/vue-router.d.ts';
 * @property { string } path -required; 
 * @property { object } component -required 
 * @property { boolean } hidden -option ?: custom setting  || 根据使用情况灵活设置
 * @property { string } redirect -option ?: with redirect | without redirect
 * @property { object } children -required type: Array<RouteRecordRaw>
 * children {Array<RouteRecordRaw>} detail:
 * @property { string } children.path -required; 
 * @property { object } children.component -required 
 * @property { string } children.name -required
 * @property { object } children.meta -required
 * @property { string } children.meta.title -required
 * @property { string } children.meta.icon -required
 * @property { boolean } children.meta.affix -option ?: with homepage | without others
 * @note component type: {RouteRecordSingleViewWithChildren.component?: RawRouteComponent | null | undefined};
 */
export const constantRoutes: Readonly<Array<RouteRecordRaw>> = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login.vue'),
    hidden: true
  },
  {
    path: '/register',
    component: () => import('@/views/register.vue'),
    hidden: true
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import('@/views/error/404.vue'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error/401.vue'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: '/index',
    children: [
      {
        path: '/index',
        component: () => import('@/views/index.vue'),
        name: 'Index',
        meta: { title: t('menu.frontPage'), icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'profile',
        component: () => import('@/views/system/user/profile/index.vue'),
        name: 'Profile',
        meta: { title:  t('navbar.personalCenter'), icon: 'user' }
      }
    ]
  },
  {
    path: '/mbti',
    component: () => import('@/views/erp/hr/mbti/mbti.vue'),
    hidden: true
  },
  {
    path: '/demo',
    component: () => import('@/views/demo/demo.vue'),
    hidden: true
  },
  {
    path: '/test',
    component: () => import('@/views/test/test.vue'),
    hidden: true
  }
]

/**
 * Coustom router setting || 定制路由配置项;
 * 
 * // dynamicRoutes coustom setting detail || 定制动态路由，基于用户权限动态去加载;
 * import type {RouteRecordRaw} from 'vue-router';
 * @custom declare module 'vue-router': {_RouteRecordBase, RouteMeta}  in '@/vue-router.d.ts';
 * @property { string } path -required; 
 * @property { object } component -required 
 * @property { boolean } hidden -option ?: with children | without children ||主路由含子路由时不使用该属性
 * @property { string } permissions -required 
 * @property { object } children -required type: Array<RouteRecordRaw>
 * children { RouteRecordRaw[]} detail:
 * @property { string } children.path -required; 
 * @property { object } children.component -required 
 * @property { string } children.name -required
 * @property { object } children.meta -required
 * @property { string } children.meta.title -required
 * @property { string } children.meta.activeMenu -required
 * @note component type: {RouteRecordSingleViewWithChildren.component?: RawRouteComponent | null | undefined};
 */
export const dynamicRoutes: Array<RouteRecordRaw> = [
  {
    path: '/system/user-auth',
    component: Layout,
    hidden: true,
    permissions: ['system:user:edit'],
    children: [
      {
        path: 'role/:userId(\\d+)',
        component: () => import('@/views/system/user/authRole.vue'),
        name: 'AuthRole',
        meta: { title: t('button.authRole'), activeMenu: '/system/user' }
      }
    ]
  },
  {
    path: '/system/role-auth',
    component: Layout,
    hidden: true,
    permissions: ['system:role:edit'],
    children: [
      {
        path: 'user/:roleId(\\d+)',
        component: () => import('@/views/system/role/authUser.vue'),
        name: 'AuthUser',
        meta: { title: t('button.AssignUser'), activeMenu: '/system/role' }
      }
    ]
  },
  {
    path: '/system/dict-data',
    component: Layout,
    hidden: true,
    permissions: ['system:dict:list'],
    children: [
      {
        path: 'index/:dictId(\\d+)',
        component: () => import('@/views/system/dict/data.vue'),
        name: 'Data',
        meta: { title: '字典数据', activeMenu: '/system/dict' }
      }
    ]
  },
  {
    path: '/monitor/job-log',
    component: Layout,
    hidden: true,
    permissions: ['monitor:job:list'],
    children: [
      {
        path: 'index/:jobId(\\d+)',
        component: () => import('@/views/monitor/job/log.vue'),
        name: 'JobLog',
        meta: { title: '调度日志', activeMenu: '/monitor/job' }
      }
    ]
  },
  {
    path: '/tool/geni18n-edit',
    component: Layout,
    hidden: true,
    permissions: ['tool:gen:edit'],
    children: [
      {
        path: 'index/:tableId(\\d+)',
        component: () => import('@/views/tool/gen/geni18n/editTable.vue'),
        name: 'GenEditi18n',
        meta: { title: '修改生成配置', activeMenu: '/tool/gen/geni18n' }
      }
    ]
  },
  {
    path: '/tool/gen-edit',
    component: Layout,
    hidden: true,
    permissions: ['tool:gen:edit'],
    children: [
      {
        path: 'index/:tableId(\\d+)',
        component: () => import('@/views/tool/gen/genruoyi/editTable.vue'),
        name: 'GenEdit',
        meta: { title: '修改生成配置', activeMenu: '/tool/gen/genruoyi' }
      }
    ]
  }
]

/**
 *  Coustom router setting - router || 定制路由配置项： router;
 * @import { createWebHistory, createRouter, _RouteRecordBase } from 'vue-router'
 * @param { function } histroy: createWebHistory(base?: string) as RouterHistory;
 * @param { object } routes: Readonly<Array<RouteRecordRaw>>;
 * @param { function } scrollBehavior(to: string, from: string, savedPosition: string | null): RouterScrollBehavior;
 * @result router: Router
 * declare function createRouter(options: RouterOptions): Router;
 * interface RouterOptions extends PathParserOptions
 * @param RouterOptions
 * @param RouterOptions.history : RouterHistory;
 * @param RouterOptions.routes: Readonly<RouteRecordRaw[]>;
 * @property { RouteRecordRaw }  RouteRecordRaw = RouteRecordSingleView | RouteRecordSingleViewWithChildren 
 *              | RouteRecordMultipleViews | RouteRecordMultipleViewsWithChildren | RouteRecordRedirect;
 *  RouteRecordSingleView extends _RouteRecordBase
 *  RouteRecordSingleViewWithChildren extends _RouteRecordBase
 *  RouteRecordMultipleViews extends _RouteRecordBase
 *  RouteRecordMultipleViewsWithChildren extends _RouteRecordBase
 *  RouteRecordRedirect extends _RouteRecordBase
 * @param { RotuerScrollBehavior} scrollBehavior?: RouterScrollBehavior;
 * interface RouterScrollBehavior {
     * @param to - Route location where we are navigating to
     * @param from - Route location where we are navigating from
     * @param savedPosition - saved position if it exists, `null` otherwise
     *(to: RouteLocationNormalized, from: RouteLocationNormalizedLoaded, savedPosition: _ScrollPositionNormalized | null): Awaitable<ScrollPosition | false | void>;
 *   }
 * @return router: Router - declare interface Router
 * @property { object } router.currentRoute - readonly currentRoute>: Ref<RouteLocationNormalizedLoaded>;
 * 
 * @property { object } router.options readonly options: RouterOptions;
 * interface RouterOptions extends PathParserOptions
 * @property { object } router.options.history: RouterHistory;
 * interface RouterHistory
 * @property { array } router.options.history.routes: Readonly<RouteRecordRaw[]>;
 * @property { string } router.options.history.base -readonly: Base path that is prepended to every url 
 * @property { string } router.options.history.location -readonly: HistoryLocation, -Current History location
 * @property { array } router.options.history.state -readonly: HistoryState, -Current History state
 * declare interface HistoryState
 * declare type HistoryStateValue = string | number | boolean | null | undefined | HistoryState | HistoryStateArray;
 * @property { any } router.options.history.state[x] -[x: number]: HistoryStateValue;
 * @property { any } router.options.history.state[x] -[x: string]: HistoryStateValue;
 * @property { function } router.options.history.push(to: HistoryLocation, data?: HistoryState): void;
 * @property { function } router.options.history.replace(to: HistoryLocation, data?: HistoryState): void;
 * @property { function } router.options.history.go(delta: number, triggerListeners?: boolean): void;
 * @property { function } router.options.history.listen(callback: NavigationCallback): () => void;
 * @property { function } router.options.history.createHref(location: HistoryLocation): string;
 * @property { function } router.options.history.destroy(): void;
 * declare interface RouterScrollBehavior
 * @property { object } router.options.scrollBehavior?: RouterScrollBehavior;
 * the other router.options
 * @property { any } router.options....other check Router document
 * @property { boolean } router.listening: boolean;
 * @property { void } router.beforeEach(guard: NavigationGuardWithThis<undefined>): () => void;
 * declare interface NavigationGuardWithThis<T> {(this: T, to: RouteLocationNormalized, 
 *                              from: RouteLocationNormalized, next: NavigationGuardNext
 *                           ): NavigationGuardReturn | Promise<NavigationGuardReturn>;}
 * @property { functions } router.addRoute() ...functions check Router document
 * @property { any } router.... ...the others check Router document
 */
const router: Router = createRouter({
  history: createWebHistory(),// RouterHistory,
  routes : constantRoutes, // Coustom Router: Readonly<Array<RouteRecordRaw>>  ||点击浏览器的前进后退或切换导航触发
  scrollBehavior(to: RouteLocationNormalized, from: RouteLocationNormalized, savedPosition){  // ||return 期望滚动到哪个的位置
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
});

export default router;
