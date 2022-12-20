import Fuse from 'fuse.js';
import axios from 'axios';
import { VueCropper } from "vue-cropper";
import { RouteLocationRaw } from 'vue-router';
import { useDict } from "@/utils/dict";


declare module 'fuse.js';

declare module 'vue-cropper';

declare module 'axios' {
  interface AxiosInstance {
    (config: AxiosRequestConfig): Promise<any>
  }
};

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance; // to-do check again

      /**
       * tab operation ||页签操作
       */
    $tab: {
      /**
       * refresh selected tab || 刷新当前tab页签
       */
      refreshPage(obj: string): void;
      /**
       * close selected tab and open a new tab || 关闭当前tab页签，打开新页签
       */
      closeOpenPage(obj: string): Promise<NavigationFailure | void | undefined>;
      /**
       * close selected tab || 关闭指定tab页签
       */
      closePage(obj: string): Promise<NavigationFailure | void | undefined>;
     /**
       * close all tab ||关闭所有tab页签
       */
      closeAllPage(): Promise<T>;
     /**
       * close all left tab || 关闭左侧tab页签
       */
      closeLeftPage(obj: string): Promise<T>;
      /**
       * close all right tab || 关闭右侧tab页签
       */
      closeRightPage(obj: string): Promise<T>;
      /**
       * close all other tab || 关闭其他tab页签
       */
      closeOtherPage(obj: string): Promise<T>;
      /**
       * open a tab || 打开tab页签
       */
      openPage(url: string): Promise<NavigationFailure | void | undefined>;
       /**
       * update selected tab || 修改tab页签
       */
      updatePage(obj: string): void;
    };

    /**
     *  auth object || 认证对象
     */
    $auth: {
      // ||验证用户是否具备某权限  
      hasPermi(permission: string | string[]): boolean;
      // ||验证用户是否含有指定权限，只需包含其中一个
      hasPermiOr(permissions: string[]): boolean;
      // ||验证用户是否含有指定权限，必须全部拥有
      hasPermiAnd(permissions: string[]): boolean;
      // ||验证用户是否具备某角色
      hasRole(role: string | string[]): boolean;
      // ||验证用户是否含有指定角色，只需包含其中一个
      hasRoleOr(roles: string[]): boolean;
      // ||验证用户是否含有指定角色，必须全部拥有
      hasRoleAnd(roles: string[]): boolean;                          
    };

    // ||缓存对象 to-do check
    $cache: {
      session: {
        set(key: string | null, value: string | null): void;
        get(key: string | null): string | null;
        setJSON(key: string | null, jsonValue: {
            url: string | undefined;
            data: any;
            time: number;
        } | null): void;
        getJSON(key: string | null): any;
        remove(key: string): void;
      },
      local: {
        set(key: any, value: any): void;
        get(key: any): string | null;
        setJSON(key: any, jsonValue: any): void;
        getJSON(key: any): any;
        remove(key: any): void;
      }
    };

    $modal: {  
        /**
         * Notification || 消息提示
         */ 
        msg(content: string): void;
        // || 错误消息
        msgError(content: string): void;
        /**
         * @function success message || 成功消息
         * @param  {string} content: custom success message;
         */
        msgSuccess(content: string): void;
        // || 警告消息
        msgWarning(content: string): void;
        // || 弹出提示
        alert(content: string): ElMessageBoxShortcutMethod;
        // || 错误提示
        alertError(content: string): ElMessageBoxShortcutMethod;
        // || 成功提示
        alertSuccess(content: string): ElMessageBoxShortcutMethod;
        // || 警告提示
        alertWarning(content: string): ElMessageBoxShortcutMethod;
        // || 通知提示
        notify(content: string): NotifyTypedFn;
        // || 错误通知
        notifyError(content: string): NotifyTypedFn;
        // || 成功通知
        notifySuccess(content: string): NotifyTypedFn;
        // || 警告通知
        notifyWarning(content: string): NotifyTypedFn;
        // || 确认窗体
        confirm(content: string): ElMessageBoxShortcutMethod;
        // || 提交内容
        prompt(content: string): ElMessageBoxShortcutMethod;
        // || 打开遮罩层
        loading(content: string): void;
        // || 关闭遮罩层
        closeLoading(): void;
      };
    $download: any;
  /*    
    $download: {  
      name(name: string, isDelete: boolean): void,
      resource(resource: string): void,
      zip(url: string, name: string): void,
      saveAs(text: any, name: string, opts?: any): void,
      async function printErrMsg(data: { text: () => any }): void 
    };
  */
    useDict(...args: string[]);
    addDateRange(params: any, dateRange: any[], propName?: string);
  }
}

