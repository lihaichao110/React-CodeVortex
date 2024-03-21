import { lazy } from 'react'
import { createBrowserRouter } from "react-router-dom";
import AuthProvider from '@/components/authProvider';
import type { RouteObject } from "react-router";
import {
  HomeOutlined,
  FormOutlined,
  AppstoreOutlined
} from "@ant-design/icons";
const Layout = lazy(() => import('@/layout/index'))
const Home = lazy(() => import('@/pages/home/index'))
const RichText = lazy(() => import('@/pages/editor/richText'))
const MarkDown = lazy(() => import('@/pages/editor/markDown'))
const Gantt = lazy(() => import('@/pages/other/gantt'))
const Video = lazy(() => import('@/pages/other/video'))

export const routes: RouteType[] = [
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
          }
        ]
      }
    ]
  },
  {
    path: "/login",
    Component: lazy(() => import('@/pages/login/index'))
  },
  {
    path: '*',
    Component: lazy(() => import('@/components/404/index'))
  }
]
const router = createBrowserRouter(routes as RouteObject[], {
  basename: '/app/'
})

export default router
