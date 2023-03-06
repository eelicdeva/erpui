import request from '@/utils/request'

export interface QueryParams {
  pageNum: number
  pageSize: number
  staffNo?: string | null
  staffName?: string | null
  birth?: string | null
  sex?: string | null
  dateIn?: string | null
  dateOut?: string | null
  nik?: string | null
  maritalStatus?: string | null
  nationality?: string | null
  blood?: string | null
  religion?: string | null
  tel?: string | null
  tel1?: string | null
  zip?: string | null
  email?: string | null
  address?: string | null
  addressIdCard?: string | null
  education?: string | null
  eduGrade?: string | null
  staffImage?: string | null
  eduImage?: string | null
  idCardImage?: string | null
  form1Image?: string | null
  form2Image?: string | null
  otherImage?: string | null
  memo?: string | null
}

export interface AddParams {
  staffId?: string | null
  staffNo?: string | null
  staffName?: string | null
  birth?: string | null
  sex?: string | null
  dateIn?: string | null
  dateOut?: string | null
  nik?: string | null
  maritalStatus?: string | null
  nationality?: string | null
  blood?: string | null
  religion?: string | null
  tel?: string | null
  tel1?: string | null
  zip?: string | null
  email?: string | null
  address?: string | null
  addressIdCard?: string | null
  education?: string | null
  eduGrade?: string | null
  staffImage?: string | null
  eduImage?: string | null
  idCardImage?: string | null
  form1Image?: string | null
  form2Image?: string | null
  otherImage?: string | null
  memo?: string | null
  roleId?: number | null
  deptId?: number | null
}

// 查询【请填写功能名称】列表
export function listStaff(query: QueryParams) {
  return request({
    url: '/project/staff/list',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】详细
export function getStaff(staffId) {
  return request({
    url: '/project/staff/' + staffId,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function addStaff(data: AddParams) {
  return request({
    url: '/project/staff',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updateStaff(data: AddParams) {
  return request({
    url: '/project/staff',
    method: 'put',
    data: data
  })
}

// 删除【请填写功能名称】
export function delStaff(staffId) {
  return request({
    url: '/project/staff/' + staffId,
    method: 'delete'
  })
}
