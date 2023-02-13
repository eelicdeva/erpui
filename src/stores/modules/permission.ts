import { defineStore } from 'pinia';
import auth from '@/plugins/auth';
import router, { dynamicRoutes, constantMenus } from '@/router';
import { getRouters } from '@/api/menu';
import Layout from '@/layout/index.vue';
import ParentView from '@/components/ParentView/index.vue';
import InnerLink from '@/layout/components/InnerLink/index.vue';
import type { RouteComponent, RouteRecordRaw } from 'vue-router';
import type { MenuData } from '@/router';

export interface CustomRoute {
  component: RouteComponent | (() => Promise<RouteComponent>) | null | undefined;
  path: string;
  parentPath?: string;// check
  hidden?: boolean;
  alwaysShow?: boolean; 
  query?: string;
  children?: CustomRoute[];
  meta?: {
    title: string;
    icon: string;
    affix?: boolean;
    link?: string;  
    noCache?: boolean;
    activeMenu?: string;
  }
  name?: string;
  redirect?: string;
}

interface DynamicRoute {
  path: string;
  component?: RouteComponent | (() => Promise<RouteComponent>) | null | undefined;  
  alwaysShow?: boolean;
  query?: string;
  name?: string;  // to-do check
  hidden?: boolean;
  redirect?: string;
  permissions?: string[]; // ? option and for delete
  roles?: string[]; // ? option and for delete
  meta?: {
    title: string;
    //icon?: string;
    //affix?: boolean;
    //link?: string;
    //noCache?: boolean
    activeMenu?: string;
  };
  children?: DynamicRoute[]
}
interface UsePermissionStore{
  routes: MenuData[];
  addRoutes:  MenuData[];
  defaultMenus:  MenuData[];
  topbarMenus: MenuData[];
  sidebarMenus: MenuData[]; 
};
// ||匹配views里面所有的.vue文件
const modules = import.meta.glob('./../../views/**/*.vue')

const usePermissionStore = defineStore(
  'permission',
  {
    state: (): UsePermissionStore => ({
      routes: [],  // constantMenus + resRouters
      addRoutes: [], // res user menus
      defaultMenus: [], // with hidden menu
      topbarMenus: [],
      sidebarMenus: [] // changed according to topbarMenus
    }),
    actions: {
      setRoutes(routes: MenuData[]) { 
        this.addRoutes = routes
        this.routes = (constantMenus as MenuData[]).concat(routes)  
      },
      setDefaultMenus(menus: MenuData[]) {
        this.defaultMenus = (constantMenus as MenuData[]).concat(menus);//to-do need to check 
      },
      setTopbarMenus(menus: MenuData[]) { //resRoutes 
        this.topbarMenus = menus
      },
      setSidebarMenus(menus: MenuData[]) {
        this.sidebarMenus = menus
      },
      generateRoutes() { //to-do check roles data 
        return new Promise(resolve => {
          // ||向后端请求路由数据
          getRouters().then((res) => {
            const sdata: MenuData[] = JSON.parse(JSON.stringify(res.data)); // ||NaN 和 Infinity 格式的数值及 null 都会被当做 null。
            const rdata: MenuData[] = JSON.parse(JSON.stringify(res.data));
            const defaultData: MenuData[] = JSON.parse(JSON.stringify(res.data));            
            const sidebarMenus = filterMenus(sdata, true);            
            const rewriteRoutes = filterAsyncRouter(rdata, false, true );
            const defaultMenus = filterMenus(defaultData);
            const asyncRoutes = filterDynamicRoutes(dynamicRoutes) as RouteRecordRaw[];
            // addRoute(route: RouteRecordRaw): () => void;
            asyncRoutes.forEach((route) => { return router.addRoute(route) }) ;// router: Router, route: dynamicRoutes                       
            this.setRoutes(rewriteRoutes); // rewriteRoutes: constantMenus + rewriteRoutes  
            this.setSidebarMenus(filterMenus(constantMenus,true).concat(sidebarMenus));
            this.setDefaultMenus(sidebarMenus);
            this.setTopbarMenus(defaultMenus);
            resolve(rewriteRoutes);
          });
        });
      }
    }
  })

function filterMenus(asyncMenuMap: MenuData[], hidden?: boolean) {
  //delete hidden menu =>not show in main menu (topbar/sidebar) 
  if (hidden) { 
    for (const [i, m] of asyncMenuMap.entries()) {
      if (m.hidden === true) {
        asyncMenuMap.splice(i, 1)
      }
    }
  } 

  return asyncMenuMap.filter((menu) => {
    if (menu.component) {
      delete menu['component']
    }
    if (menu.children != null && menu.children && menu.children.length) {
      menu.children = filterMenus(menu.children)
    } else {
      delete menu['children']
      delete menu['redirect']
    }
    return true
  })
 }

// ||遍历后台传来的路由字符串，路径转换为组件对象。
function filterAsyncRouter(asyncRouterMap: MenuData[], lastRouter=false, type=false) { //to-do lastRouter setting false
   return asyncRouterMap.filter((route) => {
    if (type && route.children) { //rewriteRoutes => type -> true: filter parent(with children)
       route.children = filterChildren(route.children) 
    }
    if (route.component ) {
      // Layout ParentView 组件特殊处理
      if (route.component === 'Layout') {
        (route as CustomRoute).component = Layout
      } else if (route.component === 'ParentView') {
        (route as CustomRoute).component = ParentView
      } else if (route.component === 'InnerLink') { //||??内链打开外网方式
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
function filterChildren( childrenMap: MenuData[], lastRouter = false) {
  var children = [] as MenuData[];
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
export function filterDynamicRoutes(menus: DynamicRoute[]) {
  const res = [] as DynamicRoute[];
  menus.forEach((route ) => {
    if (route.permissions) {
      if (auth.hasPermiOr(route.permissions)) {
        delete route['permissions']
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
