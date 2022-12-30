import request from '@/utils/request'

export interface QueryParams {
  pageNum: number
  pageSize: number
  location?: string | null
  status?: string | null
}

export interface AddParams {
  locationId?: string | null
  location?: string | null
  status?: string
  delFlag?: string | null
  createBy?: string | null
  createTime?: string | null
  updateBy?: string | null
  updateTime?: string | null
}

// 查询location列表
export function listLocation(query?: QueryParams) {
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
export function addLocation(data: AddParams) {
  return request({
    url: '/hr/location',
    method: 'post',
    data: data
  })
}

// 修改location
export function updateLocation(data: AddParams) {
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
