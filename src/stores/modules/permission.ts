import { defineStore } from 'pinia'
import auth from '@/plugins/auth'
import router, { constantRoutes, dynamicRoutes } from '@/router'
import { getRouters } from '@/api/menu'
import Layout from '@/layout/index.vue'
import ParentView from '@/components/ParentView/index.vue'
import InnerLink from '@/layout/components/InnerLink/index.vue'
import type { RouteComponent, RouteRecordRaw } from 'vue-router'

export interface CustomRoute {
  component: RouteComponent | (() => Promise<RouteComponent>) | null | undefined;
  path: string;
  parentpath?: string;
  hidden?: boolean;
  alwaysShow?: boolean;
  children?: CustomRoute[];
  meta?: {
    title: string;
    icon: string;
    affix?: boolean;
    link?: string;
    noCache?: boolean
  }
  name?: string;
  redirect?: string;
}

interface DynamicRoute {
  component?: RouteComponent | (() => Promise<RouteComponent>) | null | undefined;  
  alwaysShow?: boolean;
  name?: string;  // to-do check
  path: string;
  hidden: boolean;
  redirect?: string;
  permissions: string[];
  roles?: string[]; 
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

interface ResData {
  name: string;
  path: string;
  hidden?: boolean;
  redirect?: string;
  component: string | ( RouteComponent | (() => Promise<RouteComponent>) | null | undefined);
  alwaysShow?: boolean;
  meta:{
    title: string;
    icon: string;
    noCache: boolean
    link: string;
  };
  children?: ResData[]
}

interface UsePermissionStore{
  routes: CustomRoute[];
  addRoutes: CustomRoute[];
  defaultRoutes:  CustomRoute[];
  topbarRouters: CustomRoute[];
  sidebarRouters: CustomRoute[];
  asyncRoutes: any
};
// 匹配views里面所有的.vue文件
const modules = import.meta.glob('./../../views/**/*.vue')


const usePermissionStore = defineStore(
  'permission',
  {
    state: (): UsePermissionStore => ({
      routes: [],  // constantRoutes + resRouters
      addRoutes: [], // res user routers
      defaultRoutes: [],
      topbarRouters: [],
      sidebarRouters: [],
      asyncRoutes: undefined
    }),
    actions: {
      setRoutes(routes: CustomRoute[]) { 
        this.addRoutes = routes
        this.routes = constantRoutes.concat(routes)  // routers: constantRoutes + rewriteRoutes
      },
      setDefaultRoutes(routes: CustomRoute[]) {
        this.defaultRoutes = (constantRoutes as CustomRoute[]).concat(routes)
      },
      setTopbarRoutes(routes: CustomRoute[]) {
        this.topbarRouters = routes
      },
      setSidebarRouters(routes: CustomRoute[]) {
        this.sidebarRouters = routes
      },
      setAsyncRoutes(routes: any) {
        this.asyncRoutes = routes
      },    
      generateRoutes(roles?:string[]) { //to-do check roles data 
        return new Promise(resolve => {
          // ||向后端请求路由数据
          getRouters().then((res) => {
            const sdata: ResData[] = JSON.parse(JSON.stringify(res.data))
            const rdata: ResData[] = JSON.parse(JSON.stringify(res.data))
            const defaultData: ResData[] = JSON.parse(JSON.stringify(res.data))
            // for component ResData: string -> route.component: ( RouteComponent | (() => Promise<RouteComponent>) | null | undefined);
            const sidebarRoutes = filterAsyncRouter(sdata) as CustomRoute[]
            const rewriteRoutes = filterAsyncRouter(rdata, false, true ) as CustomRoute[]
            const defaultRoutes = filterAsyncRouter(defaultData) as CustomRoute[]
            const asyncRoutes = filterDynamicRoutes(dynamicRoutes) as RouteRecordRaw[]
            // addRoute(route: RouteRecordRaw): () => void;
            asyncRoutes.forEach((route) => { return router.addRoute(route) }) // router: Router, route: dynamicRoutes                       
            this.setRoutes(rewriteRoutes) // rewriteRoutes: constantRoutes + rewriteRoutes  
            this.setSidebarRouters((constantRoutes as CustomRoute[]).concat(sidebarRoutes))
            this.setDefaultRoutes(sidebarRoutes)
            this.setTopbarRoutes(defaultRoutes)
            resolve(rewriteRoutes)
          })
        })
      }
    }
  })

// ||遍历后台传来的路由字符串，路径转换为组件对象，下级子路由转换成一级子路由。
function filterAsyncRouter(asyncRouterMap: ResData[], lastRouter=false, type=false) { //to-do lastRouter setting false
   return asyncRouterMap.filter((route) => {
    if (type && route.children) { //rewriteRoutes => type -> true: data with children,
       route.children = filterChildren(route.children) 
    }
    if (route.component) {
      // Layout ParentView 组件特殊处理
      if (route.component === 'Layout') {
        (route as CustomRoute).component = Layout
      } else if (route.component === 'ParentView') {
        (route as CustomRoute).component = ParentView
      } else if (route.component === 'InnerLink') {
        (route as CustomRoute).component = InnerLink
      } else {
        (route as CustomRoute).component = loadView(route.component as string)
      }
    }
    if (route.children != null && route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children, false, type)
    } else {
      delete route['children']
      delete route['redirect']
    }
    return true
  })
}
// ||遍历下级子路由，拼接path，
function filterChildren( childrenMap: ResData[], lastRouter = false) {
  var children = [] as ResData[];
  childrenMap.forEach((el, _index) => {
    if (el.children && el.children.length) { // has child      
      if (el.component === 'ParentView' && !lastRouter) { 
        el.children.forEach((c) => {
          c.path = el.path + '/' + c.path   // set path = uppperPath + '/' + childPath
          if (c.children && c.children.length) { // child has child
            children = children.concat(filterChildren(c.children, false)) // path = uppperPath + '/' + childPath + '/' + childsPath
          } 
          children.push(c)         
        })
        return 
      }
    } //else { lastChild = true };
    if (lastRouter) { //without child path with "/"
      el.path = '/' + el.path //
    }
    children = children.concat(el)
  })
  return children
};

// ||动态路由遍历，验证是否具备权限
export function filterDynamicRoutes(routes: DynamicRoute[]) {
  const res = [] as DynamicRoute[];
  routes.forEach((route ) => {
    if (route.permissions) {
      if (auth.hasPermiOr(route.permissions)) {
        res.push(route)
      }
    } else if (route.roles) {
      if (auth.hasRoleOr(route.roles)) {
        res.push(route)
      }
    }
  })
  return res
}
// loadView: ResRouter.component
export const loadView = (view: string) => {
  let res: ( RouteComponent | (() => Promise<RouteComponent>) | null | undefined);
  for (const path in modules) {
    const dir = path.split('views/')[1].split('.vue')[0];
    if (dir === view) {
      res = () => modules[path]();
    }
  }
  return res;
}

export default usePermissionStore
