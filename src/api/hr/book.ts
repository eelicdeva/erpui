import request from '@/utils/request'

export interface QueryParams {
  pageNum: number
  pageSize: number
  isbn?: string | null
  bookTitle?: string | null
  bookImage?: string | null
  author?: string | null
  locationId?: string | null
  cdStatus?: string | null
  synopsis?: string | null
  language?: string | null
  status?: string | null
  categoryId?: string | null
}

export interface AddParams {
  bookId?: string | null
  isbn?: string | null
  bookTitle?: string | null
  bookImage?: string | null
  author?: string | null
  locationId?: string | null
  cdStatus?: string 
  synopsis?: string | null
  language?: string | null
  status?: string 
  createBy?: string | null
  createTime?: string | null
  updateBy?: string | null
  updateTime?: string | null
  categoryId?: string | null
}

// 查询hr Book Eelic列表
export function listBook(query: QueryParams) {
  return request({
    url: '/hr/book/list',
    method: 'get',
    params: query
  })
}

// 查询hr Book Eelic详细
export function getBook(bookId: string | string[]) {
  return request({
    url: '/hr/book/' + bookId,
    method: 'get'
  })
}

// 新增hr Book Eelic
export function addBook(data: AddParams) {
  return request({
    url: '/hr/book',
    method: 'post',
    data: data
  })
}

// 修改hr Book Eelic
export function updateBook(data: AddParams) {
  return request({
    url: '/hr/book',
    method: 'put',
    data: data
  })
}

// 删除hr Book Eelic
export function delBook(bookId: string | string[]) {
  return request({
    url: '/hr/book/' + bookId,
    method: 'delete'
  })
}

export function changeCdStatus(bookId: string, cdStatus: string) {
  const data = {
      bookId,
      cdStatus,
  }
  return request({ 
    url: '/hr/book/changeCdStatus',
    method: 'put',
    data: data
  })
}

export function getAllBook() {
  return request({
    url: '/hr/book/getAll',
    method: 'get'
  })
}

export function countBookCategory() {
  return request({
    url: '/hr/book/countBookCategory',
    method: 'get'
  })
}
