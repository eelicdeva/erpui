import { defineStore } from 'pinia';
import { login, logout, getInfo, getPublicKey } from '@/api/login';
import { getToken, setToken, removeToken } from '@/utils/auth';
import defAva from '@/assets/images/profile.jpg';
import { encrypt } from "@/utils/jsencrypt";

interface UseUserStore {
  token: string | undefined;
  name: string;
  avatar: string;
  roles: string[];
  permissions: string[];
}
const useUserStore = defineStore('user', {
    state: (): UseUserStore => ({
      token: getToken(),
      name: '',
      avatar: '',
      roles: [],
      permissions: []
    }),
    actions: {
      // 登录
      login(userInfo: { username: string; password: string; code: string; uuid: string; lang: string; }) {
        return new Promise<void>((resolve, reject) => {
          getPublicKey().then(res => {
            let publicKey = res.publicKey
            const username = userInfo.username.trim()
            const password = encrypt(userInfo.password, publicKey)
            const code = userInfo.code
            const uuid = userInfo.uuid
            const lang = userInfo.lang
            login(username, password, code, uuid, lang).then(res => {
              setToken(res.token)
              this.token = res.token
              resolve()
            }).catch(error => {
              reject(error)
            })
          })
        })
      },
      // 获取用户信息
      getInfo() {
        return new Promise((resolve, reject) => {
          getInfo().then(res => {
            const user = res.user
            const avatar = (user.avatar == "" || user.avatar == null) ? defAva : import.meta.env.VITE_APP_BASE_API + user.avatar;

            if (res.roles && res.roles.length > 0) { // ||验证返回的roles是否是一个非空数组
              this.roles = res.roles
              this.permissions = res.permissions
            } else {
              this.roles = []; // ||to-do ['ROLE_DEFAULT'] only setting here
            }
            this.name = user.userName
            this.avatar = avatar;
            resolve(res)
          }).catch(error => {
            reject(error)
          })
        })
      },
      // ||退出系统
      logOut() {
        return new Promise((resolve, reject) => {
          logout().then(() => {
            this.token = ''
            this.roles = []
            this.permissions = []
            removeToken()
            resolve('')
          }).catch(error => {
            reject(error)
          })
        })
      }
    }
  })

export default useUserStore
