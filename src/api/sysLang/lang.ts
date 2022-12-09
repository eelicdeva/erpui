import request from '@/utils/request'

// 查询lang列表
export function listLang(query: string) {
  return request({
    url: '/sysLang/lang/list',
    method: 'get',
    params: query
  })
}

// 查询lang详细
export function getLang(langId: string) {
  return request({
    url: '/sysLang/lang/' + langId,
    method: 'get'
  })
}

// 新增lang
export function addLang(data: string) {
  return request({
    url: '/sysLang/lang',
    method: 'post',
    data: data
  })
}

// 修改lang
export function updateLang(data: string) {
  return request({
    url: '/sysLang/lang',
    method: 'put',
    data: data
  })
}

// 删除lang
export function delLang(langId: string) {
  return request({
    url: '/sysLang/lang/' + langId,
    method: 'delete'
  })
}

export function listLangRecord(query: string) {
  return request({
    url: '/sysLang/lang/list/record',
    method: 'get',
    params: query
  })
}

export function cleanLangRecord() {
  return request({
    url: '/sysLang/lang/clean',
    method: 'delete'
  })
}
