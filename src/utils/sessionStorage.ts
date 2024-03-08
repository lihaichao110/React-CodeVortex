const TOKEN_KEY = 'lihaichao_token'

/**
 * 判断是否存在 token
 * @returns {string}
 */
export function hasToken() {
  return !!getToken()
}

/**
 * 获取 token
 * @returns {string}
 */
export function getToken() {
  return sessionStorage.getItem(TOKEN_KEY)
}

/**
 * 设置 token
 * @param token
 */
export function setToken(token: string) {
  return sessionStorage.setItem(TOKEN_KEY, token)
}

/**
 * 删除 token
 */
export function removeToken() {
  return sessionStorage.removeItem(TOKEN_KEY)
}