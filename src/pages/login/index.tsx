// import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { observer } from "mobx-react-lite"
import Store from '@/store/modules/user'
import style from './index.module.scss'
import { Button, Checkbox, Form, Input, message } from 'antd';
import { UserOutlined, KeyOutlined } from '@ant-design/icons';


const Login = observer(() => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate()
  const { state } = useLocation()

  // useEffect(() => {
  //   const initDate = async () => {
  //     const res = await getMockInfo()
  //     console.log(res, 'res');
  //   }

  //   initDate()
  // }, [])

  const onFinish = () => {
    Store.setToken('登录成功')
    navigate(state.from || '/', { replace: true })
    messageApi.open({
      type: 'success',
      content: '登录成功',
    });
  };

  type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
  };
  return (<>
    <div className={style.root}>
      <div className="login">
        {contextHolder}
        <div className="card">
          <h1>Login</h1>
          <Form
            name="basic"
            wrapperCol={{ span: 24 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item<FieldType>
              name="username"
              rules={[{ required: true, message: '请填写用户名!' }]}
            >
              <Input prefix={<UserOutlined />} placeholder='用户名'/>
            </Form.Item>

            <Form.Item<FieldType>
              name="password"
              rules={[{ required: true, message: '请填写密码!' }]}
            >
              <Input.Password prefix={<KeyOutlined />} placeholder='密码'/>
            </Form.Item>

            <Form.Item<FieldType>
              name="remember"
              valuePropName="checked"
            >
              <Checkbox>记住密码</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ span: 24 }}>
              <Button style={{width: '100%'}} type="primary" htmlType="submit">
                登录
              </Button>
            </Form.Item>
            <p className='tips'>Tips : 用户名和密码随便填。</p>
          </Form>
        </div>
      </div>
    </div>
  </>)
})

export default Login
