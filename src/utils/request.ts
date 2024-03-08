import axios from 'axios'

const request = axios.create({
  baseURL: import.meta.env.VITE_APP_API,
  timeout: 5000
})


//设置请求拦截器
request.interceptors.request.use(
  (config)=>{
      //添加请求头参数
      config.headers['token'] = '';
      return config;
  },
  (error)=>{
      return Promise.reject(error)
  }
)


//设置响应拦截器
request.interceptors.response.use(
  (res)=>{
      return res.data;
  },
  (error)=>{
      if( error.response.status == 401 ){
          alert('登陆过期,重新登录!');
      }else if( error.response.status == 404 ){
          alert('访问路径有误!');
      }else if( error.response.status == 500 ){
          alert('服务器内部错误!');
      }else if( error.response.status == 503 ){
          alert('服务器不可用!');
      }
      return Promise.reject(error)
  }
)

export default request