import { getToken, setToken } from "@/utils/sessionStorage"
import { makeAutoObservable, observable, action } from "mobx"
class User {
  @observable secondsPassed = 10
  Token = getToken() || ''

  constructor() {
      makeAutoObservable(this, {
        Token: observable,
        setToken: action
      })
  }

  @action
  increaseTimer() {
      this.secondsPassed += 1
  }
  setToken(token: string) {
    setToken(token)
  }
}

export default new User()