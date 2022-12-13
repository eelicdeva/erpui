import useTagsViewStore from "@/stores/modules/tagsView";
import router from "@/router";
interface SelectedTag {
  name: string;
  fullPath: string;
  offsetLeft: number;
  offsetWidth: number;
}
export default {
  // ||刷新当前tab页签
  /**
   * @param obj  
   */
  async refreshPage(obj: SelectedTag) {
    await useTagsViewStore()
    .delCachedView(obj.fullPath);
    router.replace({
    path: "/redirect" + obj.fullPath,
    //query: query,
    });1
  },
  // 关闭当前tab页签，打开新页签
  closeOpenPage(obj) {
    useTagsViewStore().delView( router.currentRoute.value.fullPath );
    if (obj !== undefined) {
      return router.push(obj);
    }
  },
  // 关闭指定tab页签
  async closePage(obj: SelectedTag) {
    if (obj === undefined) {
      await useTagsViewStore()
      .delView(router.currentRoute.value.fullPath);
      const lastPath = "/index"; // to-do check lastPath
      return await router.push( lastPath );
    }
    return useTagsViewStore().delView(obj.fullPath);
  },
  // 关闭所有tab页签
  closeAllPage() {
    return useTagsViewStore().delAllViews();
  },
  // 关闭左侧tab页签
  closeLeftPage(obj: SelectedTag) {
    return useTagsViewStore().delLeftTags(obj.fullPath || router.currentRoute.value.fullPath);
  },
  // 关闭右侧tab页签
  closeRightPage(obj: SelectedTag) {
    return useTagsViewStore().delRightTags(obj.fullPath || router.currentRoute.value.fullPath);
  },
  // 关闭其他tab页签
  closeOtherPage(obj: SelectedTag) {
    return useTagsViewStore().delOthersViews(obj.fullPath || router.currentRoute.value.fullPath);
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
