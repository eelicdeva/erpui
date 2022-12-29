import request from '@/utils/request'

export interface QueryParams {
  pageNum: number
  pageSize: number
  checkoutDate?: string | null
  returnDate?: string | null
  nameBorrower?: string | null
  bookTitle?: string | null
  bookImage?: string | null
  isbn?: string | null
}

export interface AddParams {
  loanId?: string | null
  checkoutDate?: string | null
  returnDate?: string | null
  nameBorrower?: string | null
  bookTitle?: string | null
  bookTitleEn?: string | null
  bookTitleId?: string | null
  bookImage?: string | null
  isbn?: string | null
  bookId?: string | null
}

// 查询Book Loan Management列表
export function listLoan(query: QueryParams) {
  return request({
    url: '/hr/loan/list',
    method: 'get',
    params: query
  })
}

// 查询Book Loan Management详细
export function getLoan(loanId: string) {
  return request({
    url: '/hr/loan/' + loanId,
    method: 'get'
  })
}

// 新增Book Loan Management
export function addLoan(data: AddParams) {
  return request({
    url: '/hr/loan',
    method: 'post',
    data: data
  })
}

// 修改Book Loan Management
export function updateLoan(data: AddParams) {
  return request({
    url: '/hr/loan',
    method: 'put',
    data: data
  })
}

// 删除Book Loan Management
export function delLoan(loanId: string) {
  return request({
    url: '/hr/loan/' + loanId,
    method: 'delete'
  })
}

export function countBookLoan() {
  return request({
    url: '/hr/loan/countBookLoan' ,
    method: 'get'
  })
}


