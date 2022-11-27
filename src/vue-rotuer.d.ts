import { _RouteRecordBase, RouteMeta } from 'vue-router';
/**
 * custom vue-router: _RouteRecordBase
 *@param hidden?: { boolean | string | number }; // coustom ||当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 *@param roles?: ['admin', 'common']       // coustom||访问路由的角色权限
 *@param permissions?: ['a:a:a', 'b:b:b']  // coustom||访问路由的菜单权限
 *@param alwaysShow?:boolean | string | number; // coustom ||当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 */
declare module 'vue-router'{
  interface _RouteRecordBase{
    hidden?: boolean | string | number;     // coustom ||当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
    permissions?: string[];                 // coustom permissions: ['a:a:a', 'b:b:b']||访问路由的菜单权限
    roles?: string[];                       // coustom ['admin', 'common'] ||访问路由的角色权限
    alwaysShow?: boolean;                   // coustom true = nochildren||当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面    
    query?: string;                         // example '{"id": 1, "name": "eelic"}' || 访问路由的默认传递参数
    //fullPath?: any; //selectedTag.value.fullPath === visitedViews.value[1].fullPath || selectedTag.value.fullPath === '/index'
    }
  };
  interface RouteMeta {
    title: string;       // 设置该路由在侧边栏和面包屑中展示的名字
    icon: string;        // 设置该路由的图标，对应路径src/assets/icons/svg 
    noCache?: boolean;   // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    breadcrumb?: boolean; // 如果设置为false，则不会在breadcrumb面包屑中显示
    activeMenu?: string;  // 当路由设置了该属性，则会高亮相对应的侧边栏。
    link?: boolean;      //
    affix?:  any;   //
  };



