import { hasToken } from '@/utils/sessionStorage'
import { Navigate, useLocation } from 'react-router-dom'

type PropsType = { 
  children: JSX.Element 
}
export default function AuthProvider({ children }: PropsType) {
  const { pathname } = useLocation()
  if(!hasToken()) {
    return <Navigate to='/login' state={{ from: pathname }} replace={true}/>
  } else {
    return children
  }
}
