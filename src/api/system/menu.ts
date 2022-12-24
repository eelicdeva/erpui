import request from '@/utils/request'

export interface QueryParams {
  menuName?: string
  visible?: boolean
  status?: string
}

export interface AddParams {
  menuId?: number
  parentId?: number
  menuName?: string
  path?: string
  component?: string
  perms?: string
  query?: string
  icon?: string
  menuType?: string
  orderNum?: number
  isFrame?: string
  isCache?: string
  visible?: string
  status?: string
}


// 查询菜单列表
export function listMenu(query?: QueryParams) {
  return request({
    url: '/system/menu/list',
    method: 'get',
    params: query
  })
}

// 查询菜单详细
export function getMenu(menuId: number) {
  return request({
    url: '/system/menu/' + menuId,
    method: 'get'
  })
}

// 查询菜单下拉树结构
export function treeselect() {
  return request({
    url: '/system/menu/treeselect',
    method: 'get'
  })
}

// 根据角色ID查询菜单下拉树结构
export function roleMenuTreeselect(roleId: number) {
  return request({
    url: '/system/menu/roleMenuTreeselect/' + roleId,
    method: 'get'
  })
}

// 新增菜单
export function addMenu(data: AddParams) {
  return request({
    url: '/system/menu',
    method: 'post',
    data: data
  })
}

// 修改菜单
export function updateMenu(data: AddParams) {
  return request({
    url: '/system/menu',
    method: 'put',
    data: data
  })
}

// 删除菜单
export function delMenu(menuId: number) {
  return request({
    url: '/system/menu/' + menuId,
    method: 'delete'
  })
}