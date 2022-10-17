import request from '@/utils/request'

// 查询location列表
export function listLocation(query) {
  return request({
    url: '/hr/location/list',
    method: 'get',
    params: query
  })
}

// 查询location详细
export function getLocation(locationId) {
  return request({
    url: '/hr/location/' + locationId,
    method: 'get'
  })
}

// 新增location
export function addLocation(data) {
  return request({
    url: '/hr/location',
    method: 'post',
    data: data
  })
}

// 修改location
export function updateLocation(data) {
  return request({
    url: '/hr/location',
    method: 'put',
    data: data
  })
}

// 删除location
export function delLocation(locationId) {
  return request({
    url: '/hr/location/' + locationId,
    method: 'delete'
  })
}
