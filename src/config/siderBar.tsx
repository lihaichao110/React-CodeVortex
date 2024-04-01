import type { MenuProps } from "antd";
import Store from '@/store/modules/user'
import { routes } from '@/router/index'
// import Icon from "@/components/icon";

// 只遍历 / 下的路由信息
// console.log(routes, 'routes');
const traversibleRoutes: RouteType[] | undefined = routes?.find(item => item.path === '/')?.children
// 获取扁平路由菜单
function getMenus(menus: RouteType[]): any[] {
  let resultRoutes: any[] = []
  resultRoutes = menus?.map(item => {
    const ItemRoute = {
      label: item?.label,
      key: item.index ? '/' : item.path,
      icon: item.icon,
    }
    if (item.children && item.children.length > 0) {
      return [ItemRoute, ...getMenus(item.children)]
    }
    return ItemRoute
  })
  return resultRoutes.flat()
}

const getMenuAuth = (roles: MenuProps["items"]) => {
  const rolesMenuList: MenuProps["items"] = []
  roles!.forEach((item: any) => {
    if(item === 'divider') {
      return rolesMenuList.push({ type: 'divider' })
    }
    getMenus(traversibleRoutes!).forEach((menu: any) => {
      if (menu.key !== item.key) return
      if(item.children && item.children.length > 0) {
        // console.log(getMenuAuth(item.children), '菜单权限`12`12')
        rolesMenuList.push({
          ...menu,
          children: getMenuAuth(item.children)
        })
      } else {
        rolesMenuList.push(menu)
      }
    })
  })
  return rolesMenuList
}

export default getMenuAuth(Store.roleRoutes as any)