import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useUserStore } from "@/stores/userStore"

// 创建axios实例
const instance = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 5000
})

// axios请求拦截器
instance.interceptors.request.use(config => {
  // 1. 从Pinia中获取token数据
  const userStore = useUserStore()
  // 2. 按照后端的要求拼接token数据
  const token = userStore.userInfo.token
  if (token) {
    // 将token值放在"Bearer "后面，通过空格分隔，以满足通常的身份验证实践。
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, e => Promise.reject(e))

// axios响应式拦截器
instance.interceptors.response.use(res => res.data, e => {
  // 统一错误提示
  ElMessage({
    type:"warning",
    message: e.response.data.message
  })
  return Promise.reject(e)
})


export default instance