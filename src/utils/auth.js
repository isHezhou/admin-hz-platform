import Cookies from 'js-cookie'

export const ACCESS_TOKEN = 'x-access-token'
export const REFRESH_TOKEN = 'x-refresh-token'
export const GROUP_ID = 'x-group-id'
export const GROUP_LIST = 'x-group-list'

export function getAccessToken() {
  return Cookies.get(ACCESS_TOKEN)
}

export function setAccessToken(token) {
  return Cookies.set(ACCESS_TOKEN, token)
}

export function getRefreshToken() {
  return Cookies.get(REFRESH_TOKEN)
}

export function setRefreshToken(token) {
  return Cookies.set(REFRESH_TOKEN, token)
}

export function getGroupId() {
  return Cookies.get(GROUP_ID)
}

export function setGroupId(groupId) {
  return Cookies.set(GROUP_ID, groupId)
}

export function removeGroupList() {
  Cookies.remove(GROUP_LIST)
}

export function getGroupList() {
  return Cookies.get(GROUP_LIST)
}

export function setGroupList(groupList) {
  return Cookies.set(GROUP_LIST, groupList)
}

export function removeToken() {
  Cookies.remove(ACCESS_TOKEN)
  Cookies.remove(REFRESH_TOKEN)
  Cookies.remove(GROUP_ID)
}
