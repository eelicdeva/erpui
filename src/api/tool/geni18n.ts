import request from '@/utils/request'

// 查询生成表数据
export function listTable(query: string) {
  return request({
    url: '/tool/geni18n/list',
    method: 'get',
    params: query
  })
}
// 查询db数据库列表
export function listDbTable(query: string) {
  return request({
    url: '/tool/geni18n/db/list',
    method: 'get',
    params: query
  })
}

// 查询表详细信息
export function getGenTable(tableId: string) {
  return request({
    url: '/tool/geni18n/' + tableId,
    method: 'get'
  })
}

// 修改代码生成信息
export function updateGenTable(data: string) {
  return request({
    url: '/tool/geni18n',
    method: 'put',
    data: data
  })
}

// 导入表
export function importTable(data: string) {
  return request({
    url: '/tool/geni18n/importTable',
    method: 'post',
    params: data
  })
}

// 预览生成代码
export function previewTable(tableId: string) {
  return request({
    url: '/tool/geni18n/preview/' + tableId,
    method: 'get'
  })
}

// 删除表数据
export function delTable(tableId: string) {
  return request({
    url: '/tool/geni18n/' + tableId,
    method: 'delete'
  })
}

// 生成代码（自定义路径）
export function genCode(tableName: string) {
  return request({
    url: '/tool/geni18n/genCode/' + tableName,
    method: 'get'
  })
}

// 同步数据库
export function synchDb(tableName: string) {
  return request({
    url: '/tool/geni18n/synchDb/' + tableName,
    method: 'get'
  })
}
