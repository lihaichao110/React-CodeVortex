import { observer } from "mobx-react-lite"
import Store from '@/store/modules/user'
import { Button } from 'antd';
// import { getInfo } from '@/api/test'
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
  const { secondsPassed } = Store
  return (
    <div className={style.root}>
      <div className="content">
        <Button type="primary" onClick={() => navigate('/donate')}>Primary Button</Button>
        <h2>你好：{ secondsPassed }</h2>
        <img src={url} alt=""/>
      </div>
    </div>
  )
})


export default Home