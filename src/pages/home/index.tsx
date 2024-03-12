import { observer } from "mobx-react-lite"
import Store from '@/store/modules/user'
import { Button } from 'antd';
import AuthControl from '@/components/authControl'
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import url from '@/assets/imgs/login/loginBgc.jpg'
import style from './index.module.scss'

const Home = observer(() => {
  const navigate = useNavigate()

  useEffect(() => {
    console.log(Store.Token, 'Store');
    const initData = async () => {
      // const res = await getInfo()
      // console.log(res, '信息');
    }

    initData()
  }, [])

  const changMyAuth = (auths: string[]) => {
    Store.changeAuth(auths)
  }
  return (
    <div className={style.root}>
      <div className="content">
        <h2>当前权限：{Store.role.join('&')}</h2>
        <Button 
          style={{margin: '20px 20px'}} 
          type="primary" 
          onClick={() => changMyAuth(['admin'])}>admin权限</Button>
        <Button style={{margin: '20px 0'}} type="primary" onClick={() => changMyAuth(['delete'])}>普通权限</Button>
        <AuthControl auth={['admin', 'edit']}>
          <Button type="primary" onClick={() => navigate('/donate')}>admin才显示</Button>
        </AuthControl>
        <img src={url} alt=""/>
      </div>
    </div>
  )
})


export default Home