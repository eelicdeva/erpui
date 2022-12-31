import request from '@/utils/request'

export interface QueryParams {
  pageNum: number
  pageSize: number
  userName?: string | null
  answer?: string | null
  result?: string | null
}

export interface AddParams {
  userId?: string | null
  userName?: string | null
  answer?: string | null
  result?: string | null
}

// 查询MBTI Test列表
export function listMbti(query: QueryParams) {
  return request({
    url: '/hr/mbti/list',
    method: 'get',
    params: query
  })
}

// 查询MBTI Test详细
export function getMbti(userId: string) {
  return request({
    url: '/hr/mbti/' + userId,
    method: 'get'
  })
}

// 新增MBTI Test
export function addMbti(data: AddParams) {
  return request({
    url: '/hr/mbti/add',
    method: 'post',
    data: data
  })
}

// 修改MBTI Test
export function updateMbti(data: AddParams) {
  return request({
    url: '/hr/mbti',
    method: 'put',
    data: data
  })
}

// 删除MBTI Test
export function delMbti(userId: string) {
  return request({
    url: '/hr/mbti/' + userId,
    method: 'delete'
  })
}
