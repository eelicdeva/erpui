import { _RouteRecordBase, RouteMeta } from 'vue-router';
/**
 * Custom Data For Menu & Router Permi:
 *@param hidden?: { boolean | string | number }; // coustom ||当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 *@param roles?: ['admin', 'common']       // coustom||访问路由的角色权限
 *@param permissions?: ['a:a:a', 'b:b:b']  // coustom||访问路由的菜单权限
 *@param alwaysShow?:boolean | string | number; // coustom ||当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 */

declare module 'vue-router'{
/**
 * Detail vue-router: 
 * export declare function useRoute(): RouteLocationNormalizedLoaded;
 * @funsion route = useRoute();
 * @route: { fullpath, hash, matched, meta, name, pramas, path, query, redirectedFrom? }
 * @property { RouteLocationMatched[] } matched: Array[]-> components 
 * Array of {@link RouteLocationMatched} containing only plain components (any 
 * lazy-loaded components have been loaded and were replaced inside the
 * `components` object) so it can be directly used to display routes. It 
 * cannot contain redirect records either;
 * export declare interface RouteLocationMatched extends RouteRecordNormalized {
 * components: Record<string, RouteComponent> | null | undefined; }
 * _RouteRecordBase
 * export declare interface _RouteLocationBase extends Pick<MatcherLocation, 'name' | 'path' | 'params' | 'meta'> {}
 * // Pick<MatcherLocation, 'name' | 'path' | 'params' | 'meta'>
 * //Name of the matched record;RouteRecordName = string | symbol;
 * @property { (string | symbol) | null | undefined } name: RouteRecordName | null | undefined; 
 * @property  { string } path: // Percentage encoded pathname section of the URL.
 *     //export declare type RouteParams = Record<string, RouteParamValue | RouteParamValue[]>;
 *     //export declare type RouteParamValue = string;
 * @property { RouteParams } params:  //Object of decoded params extracted from the `path`.
 * @property { RouteMeta } meta:  // Custom: Merged `meta` properties from all the matched route records.
 * //_RouteLocationBase
 * @property  { string } fullpath: // The whole location including the `search` and `hash`. This string is percentage encoded.
 * @property  { string } query: // {"id": 1, "name": "eelic"} Object representation of the `search` property of the current location.
 * @property  { string } hash: // Hash of the current location. If present, starts with a `#`.
 * @property  { RouteLocation | undefined } redirectedFrom?: RouteLocation | undefined;
 * //Array of {@link RouteRecord} containing components as they were
 * //passed when adding records. It can also contain redirect records. This can't be used directly
 * //export declare interface RouteLocation extends _RouteLocationBase {matched: RouteRecord[];}; 
 */
  // Custom RouteMeta
  interface RouteMeta {
    title: string;       // ||设置该路由在侧边栏和面包屑中展示的名字
    icon?: string;        // ||设置该路由的图标，对应路径src/assets/icons/svg 
    noCache?: boolean;   // ||如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    breadcrumb?: boolean; // ||如果设置为false，则不会在breadcrumb面包屑中显示
    //activeMenu?: string;  // ||to-do 和meta 无关，当路由设置了该属性，则会高亮相对应的侧边栏。
    link?: string | null;      // ||外部链接
    affix?:  boolean;   // ||home { title: t('menu.frontPage'), icon: 'dashboard', affix: true } || 首页设置 name 'Dashboard'
  };
}
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

