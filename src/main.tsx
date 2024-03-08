import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import 'normalize.css'
import Loading from '@/components/loading'

// antd 部分
import { ConfigProvider } from 'antd';
import type { ThemeConfig } from 'antd';
import zhCN from 'antd/locale/zh_CN';
const config: ThemeConfig = {   // 设置 antd 主题
  token: {
    colorPrimary: '#5468ff',
    borderRadius: 6,
  },
}

// 路由部分
import { RouterProvider } from 'react-router-dom'
import router from '@/router'

// mockjs
import '../mock/mock'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider theme={config} locale={zhCN}>
      <Suspense fallback={<Loading/>}>
        <RouterProvider router={router} />
      </Suspense>
    </ConfigProvider>
  </React.StrictMode>,
)
