import request from '@/utils/request'

// 查询location列表
export function listLocation(query: string) {
  return request({
    url: '/hr/location/list',
    method: 'get',
    params: query
  })
}

// 查询location详细
export function getLocation(locationId: string) {
  return request({
    url: '/hr/location/' + locationId,
    method: 'get'
  })
}

// 新增location
export function addLocation(data: string) {
  return request({
    url: '/hr/location',
    method: 'post',
    data: data
  })
}

// 修改location
export function updateLocation(data: string) {
  return request({
    url: '/hr/location',
    method: 'put',
    data: data
  })
}

// 删除location
export function delLocation(locationId: string) {
  return request({
    url: '/hr/location/' + locationId,
    method: 'delete'
  })
}
