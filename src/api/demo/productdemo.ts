import request from '@/utils/request'

// 查询产品Demo列表
export function listProductdemo(query) {
  return request({
    url: '/demo/productdemo/list',
    method: 'get',
    params: query
  })
}

// 查询产品Demo详细
export function getProductdemo(idProductLa) {
  return request({
    url: '/demo/productdemo/' + idProductLa,
    method: 'get'
  })
}

// 新增产品Demo
export function addProductdemo(data) {
  return request({
    url: '/demo/productdemo',
    method: 'post',
    data: data
  })
}

// 修改产品Demo
export function updateProductdemo(data) {
  return request({
    url: '/demo/productdemo',
    method: 'put',
    data: data
  })
}

// 删除产品Demo
export function delProductdemo(idProductLa) {
  return request({
    url: '/demo/productdemo/' + idProductLa,
    method: 'delete'
  })
}
