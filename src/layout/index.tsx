import { Layout } from "antd";
import styles from "./index.module.scss";
import AppHeader from "./components/app-header";
import AppMenu from "./components/app-menu";
import AppMain from "./components/app-main";
import AppFooter from "./components/app-footer";
import logo from "@/assets/imgs/global/logo.png";
import { useEffect, useState } from "react";

const { Header, Content, Sider } = Layout;

export default function AppLayout() {
  useEffect(() => {
    window.addEventListener('scroll', scrollChange)
    return () => {
      window.removeEventListener('scroll', scrollChange)
    }
  }, [])

  const [ isShowHeader, setIsShowHeader ] = useState(false)
  const scrollChange = () => {
    if(document.documentElement.scrollTop >= 60) {
      return setIsShowHeader(true)
    }
    setIsShowHeader(false)
  }
  return (
    <div className={styles.root}>
      <Layout>
        <Sider className="sider" breakpoint="lg" collapsedWidth="0">
          <div className="logo">
            <img src={logo} alt="logo" className="logo_img" />
            <span className="logo_text">创作平台</span>
          </div>
          <AppMenu></AppMenu>
        </Sider>
        <Layout>
          <Header className="header" style={{backgroundColor: isShowHeader ? '#f9f9fa' : 'transparent'}}>
            <AppHeader></AppHeader>
          </Header>
          <Content className="app_content">
            <AppMain></AppMain>
          </Content>
          <AppFooter></AppFooter>
        </Layout>
      </Layout>
    </div>
  );
}
