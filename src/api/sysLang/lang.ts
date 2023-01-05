import request from '@/utils/request'

export interface QueryParams {
  pageNum: number
  pageSize: number
  zhCn?: string | null
  enUs?: string | null 
  idId?: string | null
  langIdx?: string | null
  langKey?: string | null
  langTb?: string | null
  langFn?: string | null
  status?: string | null
  createby?: string | null
  createtime?: string | null
  updateby?: string | null
  updatetime?: string | null
}

export interface AddParams {
  langId?: string | number | null
  zhCn?: string | null
  enUs?: string | null
  idId?: string | null
  langIdx?: string | null
  langKey?: string | null
  langFn?: string | null
  langTb?: string | null
  status?: string | null
  createby?: string | null
  createtime?: string | null
  updateby?: string | null
  updatetime?: string | null 
  remark?: string | null
}

// 查询lang列表
export function listLang(query: QueryParams) {
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
export function addLang(data: AddParams) {
  return request({
    url: '/sysLang/lang',
    method: 'post',
    data: data
  })
}

// 修改lang
export function updateLang(data: AddParams) {
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

export function listLangRecord(query: QueryParams) {
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
