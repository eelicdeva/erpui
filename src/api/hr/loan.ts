import request from '@/utils/request'

// 查询Book Loan Management列表
export function listLoan(query: string) {
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
export function addLoan(data: string) {
  return request({
    url: '/hr/loan',
    method: 'post',
    data: data
  })
}

// 修改Book Loan Management
export function updateLoan(data: string) {
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


