import { useNavigate, useLocation } from 'react-router-dom'
import { observer } from "mobx-react-lite"
import Store from '@/store/modules/user'
import style from './index.module.scss'
import LOGO from '@/assets/imgs/global/logo.png'
import { Button, Checkbox, Divider, Form, Input, message } from 'antd';
import { UserOutlined, LockOutlined, WechatOutlined } from '@ant-design/icons';


const Login = observer(() => {
  const navigate = useNavigate()
  const [messageApi, contextHolder] = message.useMessage();
  const { state } = useLocation()

  const onFinish = () => {
    messageApi.success('登录成功')
    Store.setToken('登录成功')
    navigate(state?.from || '/', { replace: true })
  };

  type FieldType = {
    username?: string;
    password?: string;
    remember?: boolean;
  };

  return (<>
    {contextHolder}
    <div className={style.root}>
      <div className="login-page">
        <div className="left-section">
          <div className="brand-info">
            <img className="brand-logo" src={LOGO} alt="logo" />
            <span className="brand-name">CodeVortex</span>
          </div>
          <div className="intro-block">
            <span className="intro-slogan">高效管理，驱动未来</span>
            <p className="intro-desc">CodeVortex 后台管理系统</p>
            <div className="intro-line"></div>
          </div>
          <span className='standardization'>© 2026 CodeVortex. All rights reserved.</span>
        </div>

        <div className="right-section">
          <div className="login-card">
            <h1 className="login-title">欢迎登录</h1>
            <p className="login-subtitle">请输入您的账号信息以登录系统</p>

            <Form
              name="basic"
              className="login-form"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              autoComplete="off"
              layout={'vertical'}
            >
              <Form.Item<FieldType>
                label="用户名"
                name="username"
                rules={[{ required: true, message: '请输入用户名' }]}
              >
                <div className="input-wrapper">
                  <Input
                    prefix={<UserOutlined />}
                    placeholder="用户名 / 邮箱"
                  />
                </div>
              </Form.Item>

              <Form.Item<FieldType>
                label="密码"
                name="password"
                rules={[{ required: true, message: '请输入密码' }]}
              >
                <div className="input-wrapper">
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="密码"
                  />
                </div>
              </Form.Item>

              <div className="options-row">
                <Form.Item<FieldType>
                  name="remember"
                  valuePropName="checked"
                  style={{ marginBottom: 0 }}
                >
                  <Checkbox>记住我</Checkbox>
                </Form.Item>
                <span className="forgot-link">忘记密码？</span>
              </div>

              <Button className="submit-btn" htmlType="submit">
                登录
              </Button>

              <Divider plain>其他登录方式</Divider>

              <div className="third-party-list">
                <div className="third-party-item">
                  <WechatOutlined />
                  <span>微信</span>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  </>)
})

export default Login