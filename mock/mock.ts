// 使用 Mock
import Mock from 'mockjs'
/**
 * 参数一: 匹配请求地址
 * 参数二：请求方式
 * 参数三：请求回调函数，返回请求数据
 */
Mock.mock('/api/test/url', 'get', () => {
  return require('./data/index.json')
})
