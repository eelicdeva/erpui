import request from '@/utils/request'

// 查询MBTI Test列表
export function listMbti(query) {
  return request({
    url: '/hr/mbti/list',
    method: 'get',
    params: query
  })
}

// 查询MBTI Test详细
export function getMbti(userId) {
  return request({
    url: '/hr/mbti/' + userId,
    method: 'get'
  })
}

// 新增MBTI Test
export function addMbti(data) {
  return request({
    url: '/hr/mbti/add',
    method: 'post',
    data: data
  })
}

// 修改MBTI Test
export function updateMbti(data) {
  return request({
    url: '/hr/mbti',
    method: 'put',
    data: data
  })
}

// 删除MBTI Test
export function delMbti(userId) {
  return request({
    url: '/hr/mbti/' + userId,
    method: 'delete'
  })
}
