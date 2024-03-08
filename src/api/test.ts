import request from "@/utils/request";

export function getInfo() {
  return request({
    method: 'get',
    url: 'recommend/conf?platform=pcweb&abroad=0&src=mgtv&allowedRC=1',
  })
}

// mockjs 接口
export function getMockInfo() {
  return request({
    method: 'get',
    url: '/test/url',
  })
}