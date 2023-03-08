import axios from 'axios'
import { ElMessage } from 'element-plus'
import { saveAs } from 'file-saver'
import { getToken } from '@/utils/auth'
import httpStatus from '@/utils/httpStatus'
import { blobValidate } from '@/utils/ruoyi'

const baseURL = import.meta.env.VITE_APP_BASE_API

export default {
  name(name: string, isDelete = true) {
    var url = baseURL + "/common/download?fileName=" + encodeURI(name) + "&delete=" + isDelete
    axios({
      method: 'get',
      url: url,
      responseType: 'blob',
      headers: { 'Authorization': 'Bearer ' + getToken() }
    }).then((res) => {
      const isBlob = blobValidate(res.data);
      if (isBlob) {
        const blob = new Blob([res.data])
        this.saveAs(blob, decodeURI(res.headers['download-filename']))
      } else {
        this.printErrMsg(res.data);
      }
    })
  },
  resource(resource: string) {
    var url = baseURL + "/common/download/resource?resource=" + encodeURI(resource);
    axios({
      method: 'get',
      url: url,
      responseType: 'blob',
      headers: { 'Authorization': 'Bearer ' + getToken() }
    }).then((res) => {
      const isBlob = blobValidate(res.data);
      if (isBlob) {
        const blob = new Blob([res.data])
        this.saveAs(blob, decodeURI(res.headers['download-filename']))
      } else {
        this.printErrMsg(res.data);
      }
    })
  },
  zip(url: string, name: string) {
    var url = baseURL + url
    axios({
      method: 'get',
      url: url,
      responseType: 'blob',
      headers: { 'Authorization': 'Bearer ' + getToken() }
    }).then((res) => {
      const isBlob = blobValidate(res.data);
      if (isBlob) {
        const blob = new Blob([res.data], { type: 'application/zip' })
        this.saveAs(blob, name)
      } else {
        this.printErrMsg(res.data);
      }
    })
  },
  saveAs(text: any, name: string, opts?: any) {
    saveAs(text, name, opts);
  },
  async printErrMsg(data: { text: () => any }) {
    const resText = await data.text();
    const rspObj = JSON.parse(resText);
    const errMsg = httpStatus[rspObj.code] || rspObj.msg || httpStatus['default']
    ElMessage.error(errMsg);
  }
}

