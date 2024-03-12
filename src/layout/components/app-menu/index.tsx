import { PlusSquareOutlined, DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import style from "./index.module.scss";
import Menus from '@/config/siderBar'
import { useNavigate, useLocation } from 'react-router-dom'

export default function AppMenu() {
  const navgiate = useNavigate()
  const location = useLocation()
  const handleMenu: MenuProps["onClick"] = (e) => {
    navgiate(e.key)
  };

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
        defaultOpenKeys={[]}
        mode="inline"
        items={Menus as MenuProps["items"]}
        theme="light"
      />
    </div>
  );
}
