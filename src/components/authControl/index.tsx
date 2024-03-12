import userStore from '@/store/modules/user'

type PropsType = {
  children: JSX.Element
  auth: string | string[]
}
export default function AuthControl({ children, auth }: PropsType) {
  const authList = Array.isArray(auth) ? auth : [auth]
  const { role } = userStore
  const hasPermission = role.some(item => {
    if (authList.includes(item)) {
      return true
    }
    return false
  })
  if (!hasPermission) {
    return null
  }
  return (
    <>
      {children}
    </>
  )
}
