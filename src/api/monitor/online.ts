import request from '@/utils/request'

export interface QueryParams {
  ipaddr?: string | null
  userName?: string | null
}

// 查询在线用户列表
export function list(query: QueryParams) {
  return request({
    url: '/monitor/online/list',
    method: 'get',
    params: query
  })
}

// 强退用户
export function forceLogout(tokenId: string) {
  return request({
    url: '/monitor/online/' + tokenId,
    method: 'delete'
  })
}
