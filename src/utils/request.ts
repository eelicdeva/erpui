import axios, { AxiosRequestConfig } from 'axios';
import { ElNotification , ElMessageBox, ElMessage, ElLoading, LoadingParentElement } from 'element-plus';
import { getToken } from '@/utils/auth';
import httpStatus from '@/utils/httpStatus';
import { tansParams, blobValidate } from '@/utils/ruoyi';
import cache from '@/plugins/cache';
import { saveAs } from 'file-saver';
import useUserStore from '@/stores/modules/user';
import i18n from '@/lang/index';
import { ComponentPublicInstance, ComponentOptionsBase, Ref } from 'vue';

const {t} = i18n.global;
let downloadLoadingInstance: { close: any; setText?: (text: string) => void; remvoeElLoadingChild?: () => void; handleAfterLeave?: () => void; vm?: ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>>; $el?: HTMLElement; originalPosition?: Ref<string>; originalOverflow?: Ref<string>; visible?: Ref<boolean>; parent?: Ref<LoadingParentElement>; background?: Ref<string>; svg?: Ref<string>; svgViewBox?: Ref<string>; spinner?: Ref<string | boolean>; text?: Ref<string>; fullscreen?: Ref<boolean>; lock?: Ref<boolean>; customClass?: Ref<string>; target?: Ref<HTMLElement>; beforeClose?: Ref<(() => boolean) | undefined> | undefined; closed?: Ref<(() => void) | undefined> | undefined; };
// ||是否显示重新登录
export let isRelogin = { show: false };

axios.defaults.headers.get['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.put['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.patch['Content-Type'] = 'application/json;charset=utf-8';

// create axios instance || 创建axios实例;
const service = axios.create({
  // || axios中请求配置有baseURL选项，表示请求URL公共部分;
  // baseURL setting: 'dev-api' | '/prod-api' | 'stage-api';
  baseURL: import.meta.env.VITE_APP_BASE_API,
  // timeout setting unit: ms || 超时,单位:ms;
  timeout: 10000
  //withCredentials:true,  // ||异步请求携带cookie
});

// request interceptors || 拦截器
service.interceptors.request.use(config => {
  // token setting || 是否需要设置 token
  const isToken = (config.headers || {}).isToken === false;
  // Repeat Submit setting || 是否需要防止数据重复提交
  const isRepeatSubmit = (config.headers || {}).repeatSubmit === false;


  if (getToken() && !isToken) {
    // setting all request carry token || 让每个请求携带自定义token ;
    // 可根据实际情况自行修改
    config.headers!.Authorization = 'Bearer ' + getToken() 
  };
  // get params setting || 请求映射params参数
  // sample request: http://eelic.org:2880/dev-api/system/user/list?pageNum=1&pageSize=10&userName=admin
  // request params : { pageNum: 1, pageSize: 10, userName: admin }
  if (config.method === 'get' && config.params) {
    let url = config.url + '?' + tansParams(config.params);
    url = url.slice(0, -1);
    config.params = {};
    config.url = url;
  };

/**
 * is Repeat Submit config method: 
 * time Interval: 1000(ms)
 * post | put | patch 
 * error code 
 */
  if (!isRepeatSubmit && (config.method === 'post' || config.method === 'put'  || config.method === 'patch')) {
    const requestObj = {
      url: config.url,
      data: typeof config.data === 'object' ? JSON.stringify(config.data) : config.data,
      time: new Date().getTime()
    };
    const sessionObj = cache.session.getJSON('sessionObj');
    if (sessionObj === undefined || sessionObj === null || sessionObj === '') {
      cache.session.setJSON('sessionObj', requestObj)
    } else {
      const s_url = sessionObj.url;                // url/请求地址
      const s_data = sessionObj.data;              // data/请求数据
      const s_time = sessionObj.time;              // time/请求时间
      const interval = 1000;                       // time (ms)/间隔时间(ms)，小于此时间视为重复提交
      if (s_data === requestObj.data && requestObj.time - s_time < interval && s_url === requestObj.url) {
        const message: string = t('utils.request.msgReSubmit');
        console.warn(`[${s_url}]: ` + message)
        return Promise.reject(new Error(message))
      } else {
        cache.session.setJSON('sessionObj', requestObj)
      }
    }
  }
  return config
}, error => {
    console.log(error)
    Promise.reject(error)
})

// ||响应拦截器
service.interceptors.response.use(res => {
    // ||未设置状态码则默认成功状态
    const code: number = res.data.code as number || 200;
       // ||获取错误信息
    const msg = httpStatus[code] || res.data.msg || httpStatus['default']
    // ||二进制数据则直接返回
    if(res.request.responseType ===  'blob' || res.request.responseType ===  'arraybuffer'){
      return res.data
    }
    if (code === 401) {
      if (!isRelogin.show) {
        isRelogin.show = true;
        ElMessageBox.confirm(t('utils.request.msgExpired'), t('utils.request.msgSysHint'), {
          confirmButtonText: t('utils.request.btnReLogin'),
          cancelButtonText: t('el.messagebox.cancel'),
          type: 'warning'
        }
      ).then(() => {
        isRelogin.show = false;
        useUserStore().logOut().then(() => {
          location.href = '/index';
        })
      }).catch(() => {
        isRelogin.show = false;
      });
    }
      return Promise.reject(t('utils.request.err401Session'));
    } else if (code === 500) {
      ElMessage({ message: msg, type: 'error' })
      return Promise.reject(new Error(msg))
    } else if (code === 601) { 
    /**
     * 601 HTTP session start indicates that there is a network error. 
     * Then make sure that the PDP context is setup properly.
     * This is a "magic" status code that we use to signal that something wrong happened with the request 
     * that was so bad that we didn't even got a response back from the server. 
     * In this case the request timed out (more than 30 seconds to return any bytes).
     */
      ElMessage({ message: msg, type: 'warning' })
      return Promise.reject(new Error(msg))
    } else if (code !== 200) {
      ElNotification.error({ title: msg })
      return Promise.reject('error')
    } else {
      return  Promise.resolve(res.data)
    }
  },
  error => {
    console.log('err' + error)
    let { message } = error;
    if (message == "Network Error") {
      message = t('utils.request.errNetwork');
    }
    else if (message.includes("timeout")) {
      message = t('utils.request.errSysTimeOut');
    }
    else if (message.includes("Request failed with status code")) {
      message = t('utils.request.errSysTimeOut') + message.substr(message.length - 3) + t('utils.request.errException');
    }
    ElMessage({ message: message, type: 'error', duration: 5 * 1000 })
    return Promise.reject(error)
  }
)

// 通用下载方法
export function download(url: string, params: any, filename: string, config: AxiosRequestConfig<any> | undefined) {
  downloadLoadingInstance = ElLoading.service({ text: t('utils.request.msgDownload'), background: "rgba(0, 0, 0, 0.7)", })
  return service.post(url, params, {
    transformRequest: [(params) => { return tansParams(params) }],
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    responseType: 'blob',
    ...config
  }).then(async (data: any) => {
    const isLogin: boolean = await blobValidate(data);
    if (isLogin) {
      const blob = new Blob([data]) 
      saveAs(blob, filename)
    } else {
      const resText = await data.text();
      const rspObj = JSON.parse(resText);
      const errMsg = httpStatus[rspObj.code] || rspObj.msg || httpStatus['default']
      ElMessage.error(errMsg);
    }
    downloadLoadingInstance.close();
  }).catch((r) => {
    console.error(r)
    ElMessage.error(t('utils.request.errDownload'))
    downloadLoadingInstance.close();
  })
}

export default service
