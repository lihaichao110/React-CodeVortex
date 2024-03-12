import type { MenuProps } from "antd";
// import Icon from "@/components/icon";
import Store from '@/store/modules/user'
import {
  HomeOutlined,
  CommentOutlined,
  FundOutlined,
  CloudOutlined,
} from "@ant-design/icons";

const Menus: MenuProps["items"] = [
  {
    label: '首页',
    key: '/',
    icon: <HomeOutlined />
  },
  {
    label: '云剪辑',
    key: '/donate',
    icon: <CloudOutlined />
  },
  {
    label: '互动管理',
    key: '/interactiveManagement',
    icon: <CommentOutlined />,
  },
  {
    label: '私信管理',
    key: '/privateMsgManagement',
  },
  {
    label: '关注管理',
    key: '/focusManagement',
  },
  {
    label: '数据中心',
    key: '/dataCenter',
    icon: <FundOutlined />,
    children: [
      {
        label: '粉丝画像',
        key: '/fanPortrait',
      },
      {
        label: '经营分析',
        key: '/businessAnalysis',
      },
      {
        label: '内容分析',
        key: '/contentAnalysis',
      },
      
    ]
  }
];

const getMenuAuth = (roles: MenuProps["items"]) => {
  const rolesMenuList: MenuProps["items"] = []
  roles!.forEach((item: any) => {
    if(item === 'divider') {
      return rolesMenuList.push({ type: 'divider' })
    }
    Menus!.forEach((menu: any) => {
      if (menu.key !== item.key) return
      if(item.children && item.children.length > 0) {
        rolesMenuList.push({
          ...menu,
          children: getMenuAuth(item.children)
        })
      } else {
        rolesMenuList.push(menu)
      }
    })
  })
  console.log(rolesMenuList, '菜单权限`12`12')
  return rolesMenuList
}

export default getMenuAuth(Store.roleRoutes as any)