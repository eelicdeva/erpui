import useTagsViewStore from "@/stores/modules/tagsView";
import router from "@/router";

export default {
  // ||刷新当前tab页签
  /**
   * @param obj  
   */
  async refreshPage(obj: string) {
    await useTagsViewStore()
    .delCachedView(obj);
    router.replace({
    path: "/redirect" + obj,
    //query: query,
    });1
  },
  // ||关闭当前tab页签，打开新页签
  closeOpenPage(obj: string) {
    useTagsViewStore().delView( router.currentRoute.value.fullPath );
    if (obj !== undefined) {
      return router.push(obj);
    }
  },
  // ||关闭指定tab页签
  async closePage(obj?: string) {
    if (obj === undefined) {
      await useTagsViewStore()
      .delView(router.currentRoute.value.fullPath);
      const lastPath = "/index"; 
      return await router.push( lastPath );
    }
    return useTagsViewStore().delView(obj);
  },
  // ||关闭所有tab页签
  closeAllPage() {
    return useTagsViewStore().delAllViews();
  },
  // ||关闭左侧tab页签
  closeLeftPage(obj: string) {
    return useTagsViewStore().delLeftTags(obj || router.currentRoute.value.fullPath);
  },
  // ||关闭右侧tab页签
  closeRightPage(obj: string) {
    return useTagsViewStore().delRightTags(obj || router.currentRoute.value.fullPath);
  },
  // ||关闭其他tab页签
  closeOtherPage(obj: string) {
    return useTagsViewStore().delOthersViews(obj || router.currentRoute.value.fullPath);
  },
  // ||打开tab页签
  openPage(url: string) {
    return router.push(url);
  },
  // ||修改tab页签
  updatePage(obj: string) {
    return useTagsViewStore().updateVisitedView(obj);
  },
};
