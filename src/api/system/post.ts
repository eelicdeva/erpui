import request from '@/utils/request'

export interface QueryParams {
  pageNum: number
  pageSize: number
  postCode?: string
  postName?: string
  status?: string
}

export interface AddParams {
  postId?: number
  postCode?: string
  postName?: string,
  postSort?: number,
  status?: string
  remark?: string
}


// 查询岗位列表
export function listPost(query: QueryParams) {
  return request({
    url: '/system/post/list',
    method: 'get',
    params: query
  })
}

// 查询岗位详细
export function getPost(postId: number | number[]) {
  return request({
    url: '/system/post/' + postId,
    method: 'get'
  })
}

// 新增岗位
export function addPost(data: AddParams) {
  return request({
    url: '/system/post',
    method: 'post',
    data: data
  })
}

// 修改岗位
export function updatePost(data: AddParams) {
  return request({
    url: '/system/post',
    method: 'put',
    data: data
  })
}

// 删除岗位
export function delPost(postId: number | number[]) {
  return request({
    url: '/system/post/' + postId,
    method: 'delete'
  })
}
