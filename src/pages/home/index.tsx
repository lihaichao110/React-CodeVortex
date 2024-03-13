import { observer } from "mobx-react-lite"
import Store from '@/store/modules/user'
import CountUp from 'react-countup';
import Icon from "@/components/icon";
import { useEffect } from "react";
import createItem from '@/assets/imgs/home/demo.png'
import bgurl from '@/assets/imgs/home/bg.png'
import logoUrl from '@/assets/imgs/global/logo.png'
import style from './index.module.scss'
import { Statistic } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import Graph from './components/graph'
import TabTable from "./components/TabTable";

const formatter = (value: number) => <CountUp end={value} separator="," />;
const Home = observer(() => {
  // const navigate = useNavigate()

  useEffect(() => {
    console.log(Store.Token, 'Store');
    const initData = async () => {
      // const res = await getInfo()
      // console.log(res, '信息');
    }

    initData()
  }, [])

  const getTimeState = () => {
    // 获取当前时间
    const timeNow = new Date();
    // 获取当前小时
    const hours = timeNow.getHours();
    // 设置默认文字
    let text = ``;
    // 判断当前时间段
    if (hours >= 0 && hours <= 10) {
        text = `早上好`;
    } else if (hours > 10 && hours <= 14) {
        text = `中午好`;
    } else if (hours > 14 && hours <= 18) {
        text = `下午好`;
    } else if (hours > 18 && hours <= 24) {
        text = `晚上好`;
    }
    // 返回当前时间段对应的状态
    return text;
  };

  // const changMyAuth = (auths: string[]) => {
  //   Store.changeAuth(auths)
  // }
  return (
    <div className={style.root}>
      <img src={bgurl} alt="background" className="bg_img"/>
      <div className="content">

        {/* 顶部个人信息部分 */}
        <div className="user_info">
          <img src={logoUrl} alt="logo" className="avatar" />
          <div className="accout">
            <h2 className="username">{getTimeState()}：admin</h2>
          <div className="chick_soup">🎉🎉每一次努力都是成长的积累，坚持梦想，未来会为你绽放光芒。👍👍👍🥳🥳</div>
          </div>
        </div>

        {/* 项目数据部分 */}
        <div className="create-home-top">
          <div className="create-item">
            <img className="image" src={createItem} alt="item" />
          </div>
          <div className="create-item">
            <div className="item-left">
              <div className="title" style={{color: '#fff'}}>数据挖掘</div>
              <div className="number"> 
              <Statistic 
                valueStyle={{fontSize: 32, color: '#fff'}}
                value={112893} 
                formatter={formatter as any} /></div>
              <div className="after">
                <span className="week" style={{color: '#fff'}}>自上周以来</span>
                <Statistic
                  value={11.28}
                  precision={2}
                  prefix={<ArrowUpOutlined />}
                  suffix="%"
                  valueStyle={{color: '#fff', fontSize: 16, fontWeight: 600}}
                />
              </div>
            </div>
            <div className="item-right" style={{backgroundColor: '#fff'}}>
              <Icon iconName="icon-shujuwajue1" style={{ fontSize: '32px' }}></Icon>
            </div>
          </div>
          <div className="create-item">
            <div className="item-left">  
              <div className="title">总成交</div>
              <div className="number"> 
                <Statistic 
                  valueStyle={{fontSize: 32, color: '$text'}}
                  value={1184393} 
                  formatter={formatter as any} />
              </div>
              <div className="after">
                <span className="week">自上周以来</span>
                <Statistic
                  value={1.2}
                  precision={2}
                  prefix={<ArrowUpOutlined />}
                  suffix="%"
                  valueStyle={{color: '#3f8600', fontSize: 16, fontWeight: 600}}
                />
              </div>
            </div>
            <div className="item-right">
              <Icon iconName="icon-chengjiaoguanli" style={{ fontSize: '32px' }}></Icon>
            </div>
          </div>
          <div className="create-item">
          <div className="item-left">  
              <div className="title">订单数量</div>
              <div className="number"> 
                <Statistic 
                  valueStyle={{fontSize: 32, color: '$text'}}
                  value={123121} 
                  formatter={formatter as any} />
              </div>
              <div className="after">
                <span className="week">自上周以来</span>
                <Statistic
                  value={1.2}
                  precision={2}
                  prefix={<ArrowDownOutlined />}
                  suffix="%"
                  valueStyle={{color: '#cf1322', fontSize: 16, fontWeight: 600}}
                />
              </div>
            </div>
            <div className="item-right">
              <Icon iconName="icon-dingdan" style={{ fontSize: '32px' }}></Icon>
            </div>
          </div>
        </div>

        {/* 数据图形部分 */}
        <Graph></Graph>

        {/* 底部表格部分 */}
        <TabTable></TabTable>
      </div>
    </div>
  )
})


export default Home