 /**
 * v-hasPermi 操作权限处理
 * Copyright (c) 2019 ruoyi
 */
 
import useUserStore from '@/stores/modules/user'
import i18n from '@/lang/index'
import { DirectiveBinding, VNode } from 'vue';

//export declare type DirectiveHook<T = any, Prev = VNode<any, T> | null, V = any> = (el: T, binding: DirectiveBinding<V>, vnode: VNode<any, T>, prevVNode: Prev) => void;
export default {
  mounted(el: { parentNode: { removeChild: (arg0: any) => any; }; }, binding: DirectiveBinding, vnode: VNode) {
    const { value } = binding
    const all_permission = "*:*:*";
    const permissions = useUserStore().permissions
    const {t} = i18n.global

    if (value && value instanceof Array && value.length > 0) {
      const permissionFlag = value

      const hasPermissions = permissions.some(permission => {
        return all_permission === permission || permissionFlag.includes(permission)
      })

      if (!hasPermissions) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(t('button.hasPermi'))
    }
  }
}
