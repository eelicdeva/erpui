import request from '@/utils/request'

export interface QueryParams {
  pageNum: number
  pageSize: number
  title?: string
  operName?: string
  businessType?: string
  orderByColumn?: string
  isAsc?: string
  status?: string 
}

export interface AddParams {
 title?: string
 operName?: string
 operIp?: string
 operLocation?: string
 operUrl?: string
 requestMethod?: string
 method?: string
 operParam?: string
 jsonResult?: string
 operTime?: string
 errorMsg?: string
 status?: number
}

// 查询操作日志列表
export function list(query: string) {
  return request({
    url: '/monitor/operlog/list',
    method: 'get',
    params: query
  })
}

// 删除操作日志
export function delOperlog(operId: string) {
  return request({
    url: '/monitor/operlog/' + operId,
    method: 'delete'
  })
}

// 清空操作日志
export function cleanOperlog() {
  return request({
    url: '/monitor/operlog/clean',
    method: 'delete'
  })
}
