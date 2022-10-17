import request from '@/utils/request'

// 查询book category列表
export function listCategory(query) {
  return request({
    url: '/hr/category/list',
    method: 'get',
    params: query
  })
}

// 查询book category详细
export function getCategory(categoryId) {
  return request({
    url: '/hr/category/' + categoryId,
    method: 'get'
  })
}

// 新增book category
export function addCategory(data) {
  return request({
    url: '/hr/category',
    method: 'post',
    data: data
  })
}

// 修改book category
export function updateCategory(data) {
  return request({
    url: '/hr/category',
    method: 'put',
    data: data
  })
}

// 删除book category
export function delCategory(categoryId) {
  return request({
    url: '/hr/category/' + categoryId,
    method: 'delete'
  })
}
