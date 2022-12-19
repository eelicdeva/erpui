import request from '@/utils/request'

export interface QueryParams {
  pageNum: number;
  pageSize: number;
  skuLazada?: string,
  skuEelic?: string,
  skuNameLa?: string,
  model?: string,
  packageWeight?: number,
  packageLength?: number,
  packageWidth?: number,
  packageHeight?: number,
  price?: number,
  specialPrice?: number,
  quantity?: number,
  primaryCategory?: string,
  statusLa?: string,
  colorFamily?: string,
  fblLa?: number,
  simage1?: string,
  simage2?: string,
  simage3?: string,
  simage4?: string,
  simage5?: string,
  simage6?: string,
  simage7?: string,
  simage8?: string,
  status?: string, //to-do is it need?
  orderByColumn?: string,
  isAsc?: string,
};

export interface AddParams {
  idProductLa?: number,
  skuLazada?: string,
  skuEelic?: string,
  skuNameLa?: string,
  skuNameLaId?: string,
  skuNameLaEn?: string,
  shortDescription?: string,
  shortDescriptionEn?: string,
  shortDescriptionId?: string,
  description?: string,
  descriptionId?: string,
  descriptionEn?: string,
  model?: string,
  packageContent?: string,
  packageWeight?: number,
  packageLength?: number,
  packageWidth?: number,
  packageHeight?: number,
  price?: number,
  specialPrice?: number,
  quantity?: number,
  primaryCategory?: string,
  statusLa?: string,
  colorFamily?: string,
  fblLa?: number,
  simage1?: string,
  simage2?: string,
  simage3?: string,
  simage4?: string,
  simage5?: string,
  simage6?: string,
  simage7?: string,
  simage8?: string,
  status?: string;
  delFlag?: string,
  createBy?: string,
  createTime?: string,
  updateBy?: string,
  updateTime?: string,
  remark?: string,
}

// 查询产品Demo列表
export function listProductdemo(query: QueryParams) {
  return request({
    url: '/demo/productdemo/list',
    method: 'get',
    params: query
  })
}

// 查询产品Demo详细
export function getProductdemo(idProductLa: number | number[]) {
  return request({
    url: '/demo/productdemo/' + idProductLa,
    method: 'get'
  })
}

// 新增产品Demo
export function addProductdemo(data: AddParams) {
  return request({
    url: '/demo/productdemo',
    method: 'post',
    data: data
  })
}

// 修改产品Demo
export function updateProductdemo(data: AddParams) {
  return request({
    url: '/demo/productdemo',
    method: 'put',
    data: data
  })
}

// 删除产品Demo
export function delProductdemo(idProductLa: number | number[]) {
  return request({
    url: '/demo/productdemo/' + idProductLa,
    method: 'delete'
  })
}
