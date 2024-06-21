import { Suspense, lazy } from 'react'
import { createBrowserRouter } from "react-router-dom";
import AuthProvider from '@/components/authProvider';
import type { RouteObject } from "react-router";
import {
  HomeOutlined,
  FormOutlined,
  AppstoreOutlined
} from "@ant-design/icons";
import Layout from '@/layout/index'
import Loading from '@/components/loading';
const Login = lazy(() => import('@/pages/login/index'))
const NotFound = lazy(() => import('@/components/404/index'))
const Home = lazy(() => import('@/pages/home/index'))
const RichText = lazy(() => import('@/pages/editor/richText'))
const MarkDown = lazy(() => import('@/pages/editor/markDown'))
const Gantt = lazy(() => import('@/pages/other/gantt'))
const Video = lazy(() => import('@/pages/other/video'))
const WorkFlow = lazy(() => import('@/pages/other/workflow'))
const ValidateCode = lazy(() => import('@/pages/other/validate-code'))
const PanoramaVR = lazy(() => import('@/pages/other/panorama-vr'))
const Print = lazy(() => import('@/pages/other/print'))
const TimeLine = lazy(() => import('@/pages/other/timeline'))
const AIChart = lazy(() => import('@/pages/other/AI/index'))

function AsyncComponent(children: JSX.Element) {
  return (
    <Suspense fallback={<Loading/>}>
      {children}
    </Suspense>
  )
}

const routes: RouteType[] = [
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        label: '首页',
        icon: <HomeOutlined />,
        element: (
          <AuthProvider>
            <Home />
          </AuthProvider>
        )
      },
      {
        path: "/editor",
        label: '编辑器',
        icon: <FormOutlined />,
        children: [
          {
            label: '富文本',
            path: "/editor/richText",
            element: <AuthProvider>
              <RichText />
            </AuthProvider>
          },
          {
            label: 'Markdown',
            path: "/editor/markDown",
            element: <AuthProvider>
              <MarkDown />
            </AuthProvider>
          }
        ]
      },
      {
        path: "/other",
        label: '其他',
        icon: <AppstoreOutlined />,
        children: [
          {
            label: '甘特图',
            path: "/other/gantt",
            element: <AuthProvider>
              <Gantt />
            </AuthProvider>
          },
          {
            label: '实时直播',
            path: "/other/video",
            element: <AuthProvider>
              <Video />
            </AuthProvider>
          },
          {
            label: '流程图',
            path: "/other/workflow",
            element: <AuthProvider>
              <WorkFlow />
            </AuthProvider>
          },
          {
            label: '滑块验证码',
            path: "/other/validateCode",
            element: <AuthProvider>
              <ValidateCode />
            </AuthProvider>
          },
          {
            label: '全景VR',
            path: "/other/panoramaVR",
            element: <AuthProvider>
              <PanoramaVR />
            </AuthProvider>
          },
          {
            label: '打印',
            path: "/other/print",
            element: <AuthProvider>
              <Print />
            </AuthProvider>
          },
          {
            label: '时间线',
            path: "/other/timeLine",
            element: <AuthProvider>
              <TimeLine />
            </AuthProvider>
          },
          {
            label: 'AI助手',
            path: "/other/AIChart",
            element: <AuthProvider>
              <AIChart />
            </AuthProvider>
          }
        ]
      }
    ]
  },
  {
    path: "/login",
    element: AsyncComponent(<Login />)
  },
  {
    path: '*',
    element: AsyncComponent(<NotFound />)
  }
]
const router = createBrowserRouter(routes as RouteObject[], {
  basename: '/app/'
})

export default router
export {
  routes
}
