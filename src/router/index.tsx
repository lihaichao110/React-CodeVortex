import { lazy } from 'react'
import { createBrowserRouter } from "react-router-dom";
import AuthProvider from '@/components/authProvider';
const Home = lazy(() => import('@/pages/home/index'))
const Donate = lazy(() => import('@/pages/donate/index'))

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthProvider>
      <Home />
    </AuthProvider>
  },
  {
    path: "/donate",
    element: <AuthProvider>
      <Donate/>
    </AuthProvider>
  },
  {
    path: "/login",
    Component: lazy(() => import('@/pages/login/index'))
  },
  {
    path: '*',
    Component: lazy(() => import('@/components/404/index'))
  }
])

export default router
