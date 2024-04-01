import { PlusSquareOutlined, DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import style from "./index.module.scss";
import Menus from '@/config/siderBar'
import { useNavigate, useLocation } from 'react-router-dom'
import { useMemo } from "react";

export default function AppMenu() {
  const navgiate = useNavigate()
  const location = useLocation()
  const handleMenu: MenuProps["onClick"] = (e) => {
    navgiate(e.key)
  };

  // 使用 useMemo 优化，减少渲染次数
  const SiderBaiMenus = useMemo(() => {
    return Menus()
  }, [])

  // 默认打开的菜单
  const defaultOpenKey = useMemo(() => {
    // 需要根据当前路由，截取下来父级路由地址
    // 例如： /admin/  ->  /admin
    const index = location.pathname.lastIndexOf('/')
    return location.pathname.slice(0, index)
  }, [location.pathname]) 

  return (
    <div className={style.root}>
      <div className="release_btn">
        <PlusSquareOutlined style={{ fontSize: 16, marginRight: 6 }} />
        <span className="release_txt">发布作品</span>
        <DownOutlined style={{float: 'right'}}/>
      </div>
      <Menu
        onClick={handleMenu}
        style={{ backgroundColor: "#f2f2f4" }}
        defaultSelectedKeys={["/"]}
        selectedKeys={[location.pathname]}
        defaultOpenKeys={[defaultOpenKey]}
        mode="inline"
        items={SiderBaiMenus as MenuProps["items"]}
        theme="light"
      />
    </div>
  );
}
