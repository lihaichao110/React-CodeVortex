import Store from '@/store/modules/user'
import Icon from '@/components/icon'


export default function Donate() {
  const { Token } = Store
  console.log(Token, 'Token')
  return (
    <div>
      Donate
      <Icon iconName="icon-javascript"></Icon>
      {/* <Icon iconName="icon-jianji"></Icon> */}
    </div>
  )
}
