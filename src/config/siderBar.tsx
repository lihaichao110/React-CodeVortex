import type { MenuProps } from "antd";
import {
  HomeOutlined,
  CloudOutlined,
  CommentOutlined,
  FundOutlined,
} from "@ant-design/icons";

type MenuItem = Required<MenuProps>["items"][number];
function getItem(
  label: React.ReactNode,
  key: React.Key,  // 唯一标识，且是跳转地址
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const Menus: MenuProps["items"] = [
  getItem("首页", "/", <HomeOutlined />),
  { type: "divider" },
  getItem("云剪辑", "/donate", <CloudOutlined />),
  { type: "divider" },
  getItem("互动管理", "/interactiveManagement", <CommentOutlined />, [
    getItem("关注管理", "/focusManagement"),
    getItem("私信管理", "/privateMsgManagement"),
  ]),
  { type: "divider" },
  getItem("数据中心", "/dataCenter", <FundOutlined />, [
    getItem("粉丝画像", "/fanPortrait"),
    getItem("经营分析", "/businessAnalysis"),
    getItem("内容分析", "/contentAnalysis"),
  ]),
];

export default Menus