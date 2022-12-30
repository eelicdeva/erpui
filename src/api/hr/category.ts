import request from '@/utils/request'

export interface QueryParams {
  pageNum: number
  pageSize: number
  categoryName?: string | null
  status?: string | null
}

export interface AddParams {
  categoryId?: string | null
  categoryName?: string | null
  status?: string
  delFlag?: string | null
  createBy?: string | null
  createTime?: string | null
  updateBy?: string | null
  updateTime?: string | null
}

// 查询book category列表
export function listCategory(query?: QueryParams) {
  return request({
    url: '/hr/category/list',
    method: 'get',
    params: query
  })
}

// 查询book category详细
export function getCategory(categoryId: string) {
  return request({
    url: '/hr/category/' + categoryId,
    method: 'get'
  })
}

// 新增book category
export function addCategory(data: AddParams) {
  return request({
    url: '/hr/category',
    method: 'post',
    data: data
  })
}

// 修改book category
export function updateCategory(data: AddParams) {
  return request({
    url: '/hr/category',
    method: 'put',
    data: data
  })
}

// 删除book category
export function delCategory(categoryId: string) {
  return request({
    url: '/hr/category/' + categoryId,
    method: 'delete'
  })
}
