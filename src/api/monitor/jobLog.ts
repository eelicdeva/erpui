import request from '@/utils/request'

export interface QueryParams {
  pageNum: number
  pageSize: number
  jobName?: string | null
  jobGroup?: string | null
  status?: string | null
}


// 查询调度日志列表
export function listJobLog(query: string) {
  return request({
    url: '/monitor/jobLog/list',
    method: 'get',
    params: query
  })
}

// 删除调度日志
export function delJobLog(jobLogId: number | number[]) {
  return request({
    url: '/monitor/jobLog/' + jobLogId,
    method: 'delete'
  })
}

// 清空调度日志
export function cleanJobLog() {
  return request({
    url: '/monitor/jobLog/clean',
    method: 'delete'
  })
}
