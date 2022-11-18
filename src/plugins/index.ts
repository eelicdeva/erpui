import tab from './tab'
import auth from './auth'
import cache from './cache'
import modal from './modal'
import download from './download'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
      $tab: any;
      $auth: any;
      $cache: any;
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
    }
      $download: Function;
  } 
}

export default function installPlugins(app: any){
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
