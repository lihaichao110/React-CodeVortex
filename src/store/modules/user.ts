import { getToken, removeToken, setToken } from "@/utils/sessionStorage"
import { makeAutoObservable, observable, action } from "mobx"

class User {
  @observable role = ['delete']
  @observable roleRoutes = [
    {key: '/'}, 
    'divider', 
    {key: '/donate'},
    'divider', 
    {
      key: '/interactiveManagement',
      children: [{key: '/focusManagement'}]
    }
  ]
  @observable Token = getToken() || ''

  constructor() {
    makeAutoObservable(this)
  }

  // ----------------------------------------------------- 按钮权限部分
  @action
  changeAuth(auths: string[]) {
    this.role = auths
  }

  // ----------------------------------------------------- TOKEN部分
  @action
  setToken(token: string) {
    setToken(token)
  }
  @action
  removeToken() {
    removeToken()
    this.Token = ''
  }

  // ----------------------------------------------------- 菜单权限部分
}

export default new User()