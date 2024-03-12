import { hasToken } from '@/utils/sessionStorage'
import { Navigate, useLocation } from 'react-router-dom'

type PropsType = { 
  children: JSX.Element 
}

// const Menus: MenuItem[] = [
//   {
//     title: '首页',
//     key: '/',
//     icon: 'icon-shouye'
//   },
//   { type: 'divider' },
//   {
//     title: '云剪辑',
//     key: '/donate',
//     icon: 'icon-shouye'
//   },
// ];

export default function AuthProvider({ children }: PropsType) {
  const { pathname } = useLocation()

  if(!hasToken()) {
    return <Navigate to='/login' state={{ from: pathname }} replace={true}/>
  } else {
    return children
  }
}
