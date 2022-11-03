import request from '@/utils/request'

// 查询【请填写功能名称】列表
export function listMbti(query) {
  return request({
    url: '/project/mbti/list',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】详细
export function getMbti(userId) {
  return request({
    url: '/project/mbti/' + userId,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function addMbti(data) {
  return request({
    url: '/project/mbti',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updateMbti(data) {
  return request({
    url: '/project/mbti',
    method: 'put',
    data: data
  })
}

// 删除【请填写功能名称】
export function delMbti(userId) {
  return request({
    url: '/project/mbti/' + userId,
    method: 'delete'
  })
}
