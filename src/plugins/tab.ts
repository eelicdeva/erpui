import useTagsViewStore from "@/stores/modules/tagsView";
import router from "@/router";

/*
interface Obj {
  // fullPath?: string; // interface _RouteLocationBase extends Pick<MatcherLocation, 'name' | 'path' | 'params' | 'meta'>
  query?: Record<string, string |string[]>;
  matched?: RouteRecordNormalized[];
  meta?: RouteMeta;
  path: string;
  lastPath: ;
}
*/
export default {
  // ||刷新当前tab页签
  /**
   * @param obj  
   * readonly currentRoute: Ref<RouteLocationNormalizedLoaded>;
   * 
   *  declare type RouteLocationRaw = string | RouteLocationPathRaw | RouteLocationNamedRaw;
   * 
   * interface RouteLocationNormalizedLoaded extends _RouteLocationBase
   * matched: RouteLocationMatched[];
   * interface RouteLocationMatched extends RouteRecordNormalized {
   *     components: Record<string, RouteComponent> | null | undefined; }
   * RouteRecordNormalized.components
   * ViewComponent from matchedRoute.components
   * matchedRoute = matchedRouteRef.value
   * atchedRouteRef from routeToDisplay
   * declare type RouteComponent = Component | DefineComponent;
   * declare type Component<Props = any, RawBindings = any, D = any, 
   * C extends ComputedOptions = ComputedOptions, M extends MethodOptions = MethodOptions
   * > = ConcreteComponent<Props, RawBindings, D, C, M> | ComponentPublicInstanceConstructor<Props>;
   * 
   */
  refreshPage(obj) {
    const { path, query, matched } = router.currentRoute.value;
    if (obj === undefined) {
      matched.forEach((m) => {
        if (m.components && m.components.default && m.components.default.name) {
          if (!["Layout", "ParentView"].includes(m.components.default.name)) {
            obj = { name: m.components.default.name, path: path, query: query };
          }
        }
      });
    }
    return useTagsViewStore()
      .delCachedView(obj)
      .then(() => {
        const { path, query } = obj ;
        router.replace({
          path: "/redirect" + path,
          query: query,
        });
      });
  },
  // 关闭当前tab页签，打开新页签
  closeOpenPage(obj) {
    useTagsViewStore().delView(router.currentRoute.value);
    if (obj !== undefined) {
      return router.push(obj);
    }
  },
  // 关闭指定tab页签
  closePage(obj) {
    if (obj === undefined) {
      return useTagsViewStore()
        .delView(router.currentRoute.value)
        .then(({ lastPath }) => {
          return router.push(lastPath || "/index");
        });
    }
    return useTagsViewStore().delView(obj);
  },
  // 关闭所有tab页签
  closeAllPage() {
    return useTagsViewStore().delAllViews();
  },
  // 关闭左侧tab页签
  closeLeftPage(obj) {
    return useTagsViewStore().delLeftTags(obj || router.currentRoute.value);
  },
  // 关闭右侧tab页签
  closeRightPage(obj) {
    return useTagsViewStore().delRightTags(obj || router.currentRoute.value);
  },
  // 关闭其他tab页签
  closeOtherPage(obj) {
    return useTagsViewStore().delOthersViews(obj || router.currentRoute.value);
  },
  // 打开tab页签
  openPage(url) {
    return router.push(url);
  },
  // 修改tab页签
  updatePage(obj) {
    return useTagsViewStore().updateVisitedView(obj);
  },
};
