import { getToken, removeToken, setToken } from "@/utils/sessionStorage"
import { makeAutoObservable, observable, action } from "mobx"

class User {
  @observable role = ['delete']
  @observable roleRoutes = [
    {key: '/'}, 
    'divider', 
    {
      key: '/editor',
      children: [
        {key: '/editor/richText'},
        {key: '/editor/markDown'}
      ]
    },
    'divider', 
    {
      key: '/other',
      children: [
        {key: '/other/gantt'},
        {key: '/other/video'},
        {key: '/other/workflow'},
        {key: '/other/validateCode'},
        {key: '/other/panoramaVR'},
        {key: '/other/print'},
        {key: '/other/timeLine'},
      ]
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