import { hasToken } from '@/utils/sessionStorage'
import { Suspense } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import Loading from '@/components/loading'

type PropsType = { 
  children: JSX.Element 
}

export default function AuthProvider({ children }: PropsType) {
  const { pathname } = useLocation()

  if(!hasToken()) {
    return <Navigate to='/login' state={{ from: pathname }} replace={true}/>
  } else {
    return <Suspense fallback={<Loading />}>
      {children}
    </Suspense>
  }
}
