import style from './index.module.scss'
import { Avatar, Dropdown, Badge, message } from 'antd';
import url from '@/assets/imgs/loading.gif'
import type { MenuProps } from 'antd';
import userStore from '@/store/modules/user'
import { useNavigate } from 'react-router-dom'
import { BellFilled, ProductFilled, TikTokOutlined } from '@ant-design/icons'

export default function AppHeader() {
  const navigate = useNavigate()
  const [messageApi, contextHolder] = message.useMessage();

  const items: MenuProps['items'] = [
    {
      key: 'Authentication',
      label: '身份认证',
    },
    {
      key: 'AccountSwitch',
      label: '账号切换',
    },
    {
      key: 'Logout',
      danger: true,
      label: '退出账号',
      onClick: (e) => {
        if(e.key === 'Logout') {
          userStore.removeToken()
          navigate('/login')
          messageApi.open({
            type: 'success',
            content: '退出成功',
          });
        }
      }
    },
  ];
  return (
    <div className={style.root}>
      {contextHolder}
      <div className="content">
        <div className="header_item">
          <div className="action_item">
            <Badge count={5} size="small">
              <BellFilled className='action_icon'/>
            </Badge>
          </div>
          <span className='action_item_text'>通知</span>
        </div>
        <div className="header_item">
          <div className="action_item">
            <ProductFilled className='action_icon'/>
          </div>
          <span className='action_item_text'>网址</span>
        </div>
        <div className="header_item">
          <div className="action_item">
            <TikTokOutlined className='action_icon'/>
          </div>
          <span className='action_item_text'>抖音</span>
        </div>
        <Dropdown menu={{ items }} placement="bottom">
          <Avatar src={url} size={42} className='avatar'/>
        </Dropdown>
      </div>
    </div>
  )
}
