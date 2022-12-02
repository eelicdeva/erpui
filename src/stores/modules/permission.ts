import { defineStore } from 'pinia'
import auth from '@/plugins/auth'
import router , { constantRoutes, dynamicRoutes } from '@/router'
import { getRouters } from '@/api/menu'
import Layout from '@/layout/index.vue'
import ParentView from '@/components/ParentView/index.vue'
import InnerLink from '@/layout/components/InnerLink/index.vue'
import { RouteRecordRaw } from 'vue-router'

interface BasicRouter {
  name: string;   
  path: string;
  parentPath?: string; 
  hidden?: boolean;
  redirect?: string;
  component: string | any; 
  alwaysShow?: boolean;
  permissions?: string[];
  roles?: string[];     
  meta: CustomMeta;
}

interface  CustomRoute extends BasicRouter{   
  children?:  CustomRoute[];
}

interface CustomMeta {
  title: string;       // ||设置该路由在侧边栏和面包屑中展示的名字
  icon?: string;        // || 设置该路由的图标，对应路径src/assets/icons/svg 
  noCache?: boolean;   // || true:则不会被 <keep-alive> 缓存(默认 false)
  link?: string;      // ||外部链接
  activeMenu?: string;  // is it need?
  affix?: boolean;    // for the tagsview
  breadcrumb?: boolean;  // for the Breadrumb
}

interface DynamicRoute extends CustomRoute {
  permissions: string[];
  roles: string[];
}

interface UsePermissionStore{
  routes: DynamicRoute[];
  addRoutes: DynamicRoute[];
  defaultRoutes:  CustomRoute[];
  topbarRouters: CustomRoute[];
  sidebarRouters: CustomRoute[];
};
// 匹配views里面所有的.vue文件
const modules = import.meta.glob('./../../views/**/*.vue')

const usePermissionStore = defineStore(
  'permission',
  {
    state: (): UsePermissionStore => ({
      routes: [],
      addRoutes: [],
      defaultRoutes: [],
      topbarRouters: [],
      sidebarRouters: []
    }),
    actions: {
      setRoutes(routes: DynamicRoute[]) { 
        this.addRoutes = routes
        this.routes = (constantRoutes as DynamicRoute[]).concat(routes)
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
      generateRoutes(_roles?: string[]) { //check roles data 
        return new Promise(resolve => {
          // ||向后端请求路由数据
          getRouters().then((res) => {
            const sdata = JSON.parse(JSON.stringify(res.data))
            const rdata = JSON.parse(JSON.stringify(res.data))
            const defaultData = JSON.parse(JSON.stringify(res.data))
            const sidebarRoutes = filterAsyncRouter(sdata)
            const rewriteRoutes = filterAsyncRouter(rdata, false, true )
            const defaultRoutes = filterAsyncRouter(defaultData)
            const asyncRoutes = filterDynamicRoutes(dynamicRoutes as DynamicRoute[])
            asyncRoutes.forEach((route) => { router.addRoute(route as RouteRecordRaw) })
            this.setRoutes(rewriteRoutes as DynamicRoute[])
            this.setSidebarRouters((constantRoutes as  CustomRoute[]).concat(sidebarRoutes))
            this.setDefaultRoutes(sidebarRoutes)
            this.setTopbarRoutes(defaultRoutes)
            resolve(rewriteRoutes)
          })
        })
      }
    }
  })

// ||遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(asyncRouterMap: CustomRoute[], lastRouter=false, type=false ) { //to-do lastRouter setting false
   return asyncRouterMap.filter(route => {
    if (type && route.children) { //type -> false: data with folder | type -> true: data without folder,
      route.children = filterChildren(route.children) 
    }
    if (route.component) {
      // Layout ParentView 组件特殊处理
      if (route.component === 'Layout') {
        route.component = Layout
      } else if (route.component === 'ParentView') {
        route.component = ParentView
      } else if (route.component === 'InnerLink') {
        route.component = InnerLink
      } else {
        route.component = loadView(route.component)
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

function filterChildren( childrenMap: CustomRoute[], lastRouter = false) {
  var children: CustomRoute[] = [];
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
export function filterDynamicRoutes(routes: CustomRoute[] ) {
  const res: CustomRoute[] = []
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

export const loadView = (view: string) => {
  let res;
  for (const path in modules) {
    const dir = path.split('views/')[1].split('.vue')[0];
    if (dir === view) {
      res = () => modules[path]();
    }
  }
  return res;
}

export default usePermissionStore
