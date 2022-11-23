import { App } from 'vue';
import tab from './tab'
import auth from './auth'
import cache from './cache'
import modal from './modal'
import download from './download'
import { RouteLocationRaw } from 'vue-router'
//to-do check again $tab
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    // ||页签操作 to-do need check
    $tab: {
      // ||刷新当前$tab页签
      refreshPage(obj: { name?: string; path: any; query: any } | undefined): any,
      // ||关闭当前tab页签，打开新页签
      closeOpenPage(obj: { path: string }): any,
      // ||关闭指定tab页签
      closePage(obj: undefined):any,
      // ||关闭所有tab页签
      closeAllPage(): any,
      // 关闭左侧tab页签
      closeLeftPage(obj: any): any,
      // 关闭右侧tab页签
      closeRightPage(obj: any): any,
      // 打开tab页签
      openPage(url: RouteLocationRaw): any,
      updatePage(obj: any): any
    };
    // ||认证对象
    $auth: {
      // ||验证用户是否具备某权限  
      hasPermi(permission: string | any[]): boolean,
      // ||验证用户是否含有指定权限，只需包含其中一个
      hasPermiOr(permissions: any[]): boolean,
      // ||验证用户是否含有指定权限，必须全部拥有
      hasPermiAnd(permissions: any[]): boolean,
      // ||验证用户是否具备某角色
      hasRole(role: string | any[]): boolean,
      // ||验证用户是否含有指定角色，只需包含其中一个
      hasRoleOr(roles: any[]): boolean,
      // ||验证用户是否含有指定角色，必须全部拥有
      hasRoleAnd(roles: any[]): boolean                           
    };

    // ||缓存对象 to-do check
    $cache: {

      /**
   * 会话级缓存
  session: sessionCache,

      sessionCache: {
        set (key: string | null, value: string | null): void
        get (key: string | null): (key | null)
        setJSON (key: string | null, jsonValue: { url: string | undefined; data: any; time: number } | null): void,
        getJSON(key: string | null): any,
        remove(key: string): void
      },
         * 本地缓存

  local: localCache
 */
    };

    $modal: {  
        // || 消息提示
        msg(content: string): void,
        // || 错误消息
        msgError(content: string): void,
        // || 成功消息
        msgSuccess(content: string): void,
        // || 警告消息
        msgWarning(content: string): void,
        // || 弹出提示
        alert(content: string): void,
        // || 错误提示
        alertError(content: string): void,
        // || 成功提示
        alertSuccess(content: string): void,
        // || 警告提示
        alertWarning(content: string): void,
        // || 通知提示
        notify(content: string): void,
        // || 错误通知
        notifyError(content: string): void,
        // || 成功通知
        notifySuccess(content: string): void,
        // || 警告通知
        notifyWarning(content: string): void,
        // || 确认窗体
        confirm(content: string): void,
        // || 提交内容
        prompt(content: string): void,
        // || 打开遮罩层
        loading(content: string): void,
        // || 关闭遮罩层
        closeLoading(): void
      };
      $download: any;
  } 
};

export default function installPlugins(app: App): void {
  // 页签操作
  app.config.globalProperties.$tab = tab;
  // 认证对象
  app.config.globalProperties.$auth = auth;
  // 缓存对象
  app.config.globalProperties.$cache = cache;
  // 模态框对象
  app.config.globalProperties.$modal = modal;
  // 下载文件
  app.config.globalProperties.$download = download;
}
