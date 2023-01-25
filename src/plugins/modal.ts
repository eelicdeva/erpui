import { ElMessage, ElMessageBox, ElNotification, ElLoading, LoadingParentElement } from 'element-plus'
import i18n from '@/lang/index';
import { ComponentPublicInstance, ComponentOptionsBase, Ref } from 'vue';



const {t} = i18n.global;

let loadingInstance: { close: () => void; setText?: (text: string) => void; removeElLoadingChild?: () => void; handleAfterLeave?: () => void; vm?: ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}>; $el?: HTMLElement; originalPosition?: Ref<string>; originalOverflow?: Ref<string>; visible?: Ref<boolean>; parent?: Ref<LoadingParentElement>; background?: Ref<string>; svg?: Ref<string>; svgViewBox?: Ref<string>; spinner?: Ref<string | boolean>; text?: Ref<string>; fullscreen?: Ref<boolean>; lock?: Ref<boolean>; customClass?: Ref<string>; target?: Ref<HTMLElement>; beforeClose?: Ref<(() => boolean) | undefined> | undefined; closed?: Ref<(() => void) | undefined> | undefined; };
export default {
  // 消息提示
  msg(content: string) {
    ElMessage.info(content)
  },
  // 错误消息
  msgError(content: string) {
    ElMessage.error(content)
  },

 
  // Sucess message || 成功消息
  msgSuccess(content: string) {
    ElMessage.success(content)
  },
  // 警告消息
  msgWarning(content: string) {
    ElMessage.warning(content)
  },
  // 弹出提示
  alert(content: string) {
    ElMessageBox.alert(content, t('utils.request.msgSysHint'))
  },
  // 错误提示
  alertError(content: string) {
    ElMessageBox.alert(content, t('utils.request.msgSysHint'), { type: 'error' })
  },
  // 成功提示
  alertSuccess(content: string) {
    ElMessageBox.alert(content, t('utils.request.msgSysHint'), { type: 'success' })
  },
  // 警告提示
  alertWarning(content: string) {
    ElMessageBox.alert(content, t('utils.request.msgSysHint'), { type: 'warning' })
  },
  // 通知提示
  notify(content: string) {
    ElNotification.info(content)
  },
  // 错误通知
  notifyError(content: string) {
    ElNotification.error(content);
  },
  // 成功通知
  notifySuccess(content: string) {
    ElNotification.success(content)
  },
  // 警告通知
  notifyWarning(content: string) {
    ElNotification.warning(content)
  },
  // 确认窗体
  confirm(content: string) {
    return ElMessageBox.confirm(content, t('utils.request.msgSysHint'), {
      confirmButtonText: t('el.messagebox.confirm'),
      cancelButtonText: t('el.messagebox.cancel'),
      type: "warning",
    })
  },
  // 提交内容
  prompt(content: string) {
    return ElMessageBox.prompt(content, t('utils.request.msgSysHint'), {
      confirmButtonText: t('el.messagebox.confirm'),
      cancelButtonText: t('el.messagebox.cancel'),
      type: "warning",
    })
  },
  // 打开遮罩层
  loading(content: string) {
    loadingInstance = ElLoading.service({
      lock: true,
      text: content,
      background: "rgba(0, 0, 0, 0.7)",
    })
  },
  // 关闭遮罩层
  closeLoading() {
    loadingInstance.close();
  }
}
