// axios.ts
import axios from 'axios'
import { RouteLocationRaw } from 'vue-router'
// 全局自定义属性


// 处理  类型“AxiosResponse<any, any>”上不存在属性“errorinfo”。ts(2339)
/*
declare module "axios" {

  interface AxiosResponse<T = any> {
   // to-do define detail....
    token: string; // ||追加不存在属性的参数(token)
    publicKey: string; // ||追加不存在属性的参数(publickey)
    user: {searchValue: string | null, 
           avatar: string,
           userName: string
          };
    roles: [],
    permissions: []

  }
    export function create(config?: AxiosRequestConfig): AxiosInstance;
}
*/

declare module 'axios' {
  interface AxiosInstance {
    (config: AxiosRequestConfig): Promise<any>
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance; // to-do check again

    //to-do check again $tab
    // ||页签操作 to-do need check
    $tab: {
      // ||刷新当前$tab页签
      refreshPage(obj: any | undefined): any,
      // ||关闭当前tab页签，打开新页签
      closeOpenPage(obj: { path: string }): any,
      // ||关闭指定tab页签
      closePage(obj: RouteLocationRaw | undefined):any,
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
        msg(content: string): void,
        // || 错误消息
        msgError(content: string): void,
        /**
         * @function success message || 成功消息
         * @param  {string} content: custom success message;
         */
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
  /*    
    $download: {  
      name(name: string, isDelete: boolean): void,
      resource(resource: string): void,
      zip(url: string, name: string): void,
      saveAs(text: any, name: string, opts?: any): void,
      async function printErrMsg(data: { text: () => any }): void 
    };
  */     
  }
}

