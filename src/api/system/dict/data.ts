import request from '@/utils/request'

export interface QueryParams {
  pageNum: number
  pageSize: number
  dictId?: number
  dictType?: string
  dictLabel?: string
  status?: string
}

export interface AddParams {
  dictCode?: number
  dictLabel?: string
  dictValue?: string
  cssClass?: string
  listClass?: string
  dictSort?: number
  dictType?: string
  status?: string
  remark?: string
}

// 查询字典数据列表
export function listData(query: QueryParams) {
  return request({
    url: '/system/dict/data/list',
    method: 'get',
    params: query
  })
}

// 查询字典数据详细
export function getData(dictCode: number | number[]) {
  return request({
    url: '/system/dict/data/' + dictCode,
    method: 'get'
  })
}

// 根据字典类型查询字典数据信息
export function getDicts(dictType?: string) {
  return request({
    url: '/system/dict/data/type/' + dictType,
    method: 'get'
  })
}

// 新增字典数据
export function addData(data: AddParams) {
  return request({
    url: '/system/dict/data',
    method: 'post',
    data: data
  })
}

// 修改字典数据
export function updateData(data: AddParams) {
  return request({
    url: '/system/dict/data',
    method: 'put',
    data: data
  })
}

// 删除字典数据
export function delData(dictCode: number | number[]) {
  return request({
    url: '/system/dict/data/' + dictCode,
    method: 'delete'
  })
}
