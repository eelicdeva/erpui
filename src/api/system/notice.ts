import request from '@/utils/request'

export interface QueryParams {
   pageNum: number;
   pageSize: number;
   noticeTitle?: string;
   createBy?: string;
   noticeType?: string; 
   status?: string; //to-do is it need?
};

export interface AddParams {
  noticeId?: number;
  noticeTitle?: string;
  noticeType?: string;
  noticeContent?:string;
  status?: string;
}
// 查询公告列表
export function listNotice(query: QueryParams) {
  return request({
    url: '/system/notice/list',
    method: 'get',
    params: query
  })
}

// 查询公告详细
export function getNotice(noticeId: number | number[]) {
  return request({
    url: '/system/notice/' + noticeId,
    method: 'get'
  })
}

// 新增公告
export function addNotice(data: AddParams) {
  return request({
    url: '/system/notice',
    method: 'post',
    data: data
  })
}

// 修改公告
export function updateNotice(data: AddParams) {
  return request({
    url: '/system/notice',
    method: 'put',
    data: data
  })
}

// 删除公告
export function delNotice(noticeId: number | number[]) {
  return request({
    url: '/system/notice/' + noticeId,
    method: 'delete'
  })
}