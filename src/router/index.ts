/* Layout */
import { createWebHistory, createRouter, RouteComponent } from 'vue-router';
import type { RouteRecordRaw }  from 'vue-router'; 
import Layout from '@/layout/index.vue';
import i18n from '@/lang/index';
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
 *   affix: ture                     // 固定显示
 * }
 */
 interface DynamicRoute {
  component?: RouteComponent | (() => Promise<RouteComponent>) | null | undefined;  
  alwaysShow?: boolean;
  name?: string;  // to-do check
  path: string;
  hidden: boolean;
  redirect?: string;
  permissions: string[];
  roles?: string[]; // to-do check
  children?: [{
    path: string;
    component: RouteComponent | (() => Promise<RouteComponent>) | null | undefined;   
    name: string;
    meta?: {
      title: string;
      icon?: string;
      affix?: boolean;
      link?: string;
      noCache?: boolean
      activeMenu?: string;
    };
  }];
}

/**
 * Coustom Menu setting || 菜单配置项;
 * 
 * @import type { RouteRecordRaw } from 'vue-router';
 * constantRoutes need to match: Readonly<Array<RouteRecordRaw>> 
 * @custom declare module 'vue-router': {_RouteRecordBase, RouteMeta}  in '@/vue-router.d.ts';
 * @property { string } name?: -option  menu name;
 * @property { string } path: -required; 
 * @property { string } component?: -option resData with component; 
 * @property { boolean } hidden?: -option true for menu hide; 
 * @property { string } redirect?: -option"noRedirect"  for the menu folder;
 * @property { MenuData } children?: for children menu;
 * @property { MenuMeta } meta?: for menu meta
 * @property { string } meta.title: -required for menu title
 * @property { string } meta.icon: -required for menu icon
 * @property { boolean } meta.noCache: -required for <keep-alive> catch defalt: false;  to-do is it needed?
 * @property { string | null } meta.link: -required default null, string for external link;
 * @property { boolean } meta.affix?: -option: with homepage | without others; to-do is it needed?
 * @note component: (RouteComponent | (() => Promise<RouteComponent>) | null | undefined) for menu data filter; 
 */
export interface MenuData {
  name?: string; 
  path: string;  
  component?: string; 
  redirect?: string;
  hidden?: boolean;  //||当设置 true 的时候该菜单不在侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
  meta?: {
    title: string;       // ||设置该路由在侧边栏和面包屑中展示的名字
    icon: string;        // ||设置该路由的图标，对应路径src/assets/icons/svg 
    noCache: boolean;   // ||如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    link: string | null;      // link for iframe || 外部链接
    affix?:  boolean;  //首页固定
    breadcrumb?: boolean; // ||如果设置为false，则不会在breadcrumb面包屑中显示
    activeMenu?: string;  // ||当页面内嵌套路由填入页面的路由字段，则会高亮该字段相对应的页面菜单图标或名称。     
  }
  children?: MenuData[];
  alwaysShow?: boolean;      // ||当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面    
  query?: string;
  //parentPath?: string;       // custom to-do check TopNav setting    
  //permissions?: string[];    // custom permissions: ['a:a:a', 'b:b:b']||访问路由的菜单权限
  //roles?: string[];          // custom ['admin', 'common'] ||访问路由的角色权限
  // alias?: string | string[]; // default setting 
};

//RouteRecordSingleView[]
const whiteSingleView: RouteRecordRaw[] = [ //hidden: true
  {
    path: '/login',
    component: () => import('@/views/login.vue'),
    //hidden: true
  },
  {
    path: '/register',
    component: () => import('@/views/register.vue'),
    //hidden: true
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import('@/views/error/404.vue'),
    //hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error/401.vue'),
    //hidden: true
  },
  {
    path: '/mbti',
    component: () => import('@/views/erp/hr/mbti/mbti.vue'),
    //hidden: true
  },
  {
    path: '/demo',
    component: () => import('@/views/demo/demo.vue'),
    //hidden: ture
  }
];
// RouteRecordRedirect[]
// show in the main manu, hidden = false;
const redirectIndexViewWithChildren: RouteRecordRaw[] = [ 
  {
    path: '',// to-do check'/redirect' can it be ''.
    component: Layout,
    redirect: '/index',
    children: [
      {
        path: '/index',
        component: () => import('@/views/index.vue'),
        name: 'Dashboard',
        meta: { title: t('menu.frontPage'), icon: 'dashboard', noCache: false, link: null, affix: true } 
      }
    ]
  }
];
// RouteRecordSingleViewWithChildren[]
// use as component inside routeView;
// for the main menu: hidden: true;
const componentSingleViewWithChildren: RouteRecordRaw[]  = [
  {
    path: '',
    component: Layout,
    //hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index.vue')
      }
    ]
  },
  {  
    path: '/user', //hidden: true
    component: Layout,
    //redirect: 'noredirect',
    children: [
      {
        path: 'profile',
        component: () => import('@/views/system/user/profile/index.vue'),
        name: 'Profile',
        meta: { title:  t('navbar.personalCenter'), icon: 'user', noCache: false, link: null }
      }
    ]  
  }
];

// noRedirect = true => Folder Menu 
/**
 * @function menuDatas: menuData[] filter 
 * add?: redirect: 'noRedirect' for the menu folder
 * add?: hidden = true for hidden menu
 * @param  {RouteRecordRaw[]} routerDatas
 * @param  {boolean} hidden?: true => not show in the main menu
 */
function filterMenus(routerDatas: RouteRecordRaw[], hidden?: boolean): MenuData[] {
  routerDatas.forEach((menuData)=>{
    if (menuData.component){
      delete routerDatas['component']
    }
    if (hidden){
      (menuData as MenuData).hidden = true;
    };
    if (menuData.children) {
      filterMenus(menuData.children)
      //menuData.redirect = 'noRedirect';
    }
  })
  return routerDatas as MenuData[]
};

export const constantMenus = filterMenus(redirectIndexViewWithChildren, false ).concat( filterMenus(componentSingleViewWithChildren, true));

const prepareRoutes = whiteSingleView.concat(redirectIndexViewWithChildren, componentSingleViewWithChildren);
/**
 * Coustom router setting || 定制路由配置项;
 * 
 * // dynamicRoutes coustom setting detail || 定制动态路由，基于用户权限动态去加载;
 * import type {RouteRecordRaw} from 'vue-router';
 * @custom declare module 'vue-router': {_RouteRecordBase, RouteMeta}  in '@/vue-router.d.ts';
 * @property { string } fullPath -required; 
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
 * @property { string } children.meta.activeMenu -required => inside page router highlight parent menu icon | title
 * @note component type: {RouteRecordSingleViewWithChildren.component?: RawRouteComponent | null | undefined};
 */
export const dynamicRoutes: DynamicRoute[] = [
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
        meta: { title: '修改生成配置', activeMenu: '/tool/code/geni18n' }
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
        meta: { title: '修改生成配置', activeMenu: '/tool/code/genruoyi' }
      }
    ]
  }
]
/**
 * Coustom router setting - router || 定制路由配置项： router;
 * @function createRouter (options: RouterOptions): Router
 * @interface RouterOptions extends PathParserOptions
 * @param histroy: RouterHistory; 
 * @param routes: Readonly<Array<RouteRecordRaw>>;
 * @param scrollBehavior (to: string, from: string, savedPosition: string | null): RouterScrollBehavior;
 * @result router: Router
 */
const router = createRouter({
  history: createWebHistory(),// RouterHistory,
  // prepareRoutes need to match: Readonly<Array<RouteRecordRaw>>  ||点击浏览器的前进后退或切换导航触发
  routes : prepareRoutes, 
  scrollBehavior(to, from, savedPosition){  // ||return 期望滚动到哪个的位置
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
});

export default router;
