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
    // path: string; // default setting 
    // redirect?: RouteRecordRedirectOption; // default setting 
    //  alias?: string | string[]; // default setting 
    // name?: RouteRecordName; // default setting 
    // beforeEnter?: NavigationGuardWithThis<undefined> | NavigationGuardWithThis<undefined>[]; // defaut setting
    // meta?: RouteMeta; // default setting 
    // children?: RouteRecordRaw[]; // default setting
    // props?: _RouteRecordProps | Record<string, _RouteRecordProps>; // default setting

    //fullPath: string; // default setting //check selectedTag.value.fullPath === 
    query?: string;                         // custom example '{"id": 1, "name": "eelic"}' || 访问路由的默认传递参数  
    hidden?: boolean | string | number;     // coustom ||当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
    permissions?: string[];                 // coustom permissions: ['a:a:a', 'b:b:b']||访问路由的菜单权限
    roles?: string[];                       // coustom ['admin', 'common'] ||访问路由的角色权限
    alwaysShow?: boolean;                   // coustom true = nochildren||当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面    
  };
  interface RouteMeta {
    title: string;       // 设置该路由在侧边栏和面包屑中展示的名字
    icon?: string;        // 设置该路由的图标，对应路径src/assets/icons/svg 
    noCache?: boolean;   // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    breadcrumb?: boolean; // 如果设置为false，则不会在breadcrumb面包屑中显示
    activeMenu?: string;  // 当路由设置了该属性，则会高亮相对应的侧边栏。
    link?: boolean;      //
    affix?:  boolean;   // home { title: t('menu.frontPage'), icon: 'dashboard', affix: true } || 首页设置
  };
}

//_RouteLocationBase to-do check this

/**
 * router custom setting detail
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
 * @property { functions } router.addRoute() ...functions check Router document
 * @property { any } router.... ...the others check Router document
 */
