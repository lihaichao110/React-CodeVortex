import Store from '@/store/modules/user'

export default function Donate() {
  const { secondsPassed, Token } = Store
  console.log(Token, 'Token')
  return (
    <div>Donate {secondsPassed}</div>
  )
}
