import loginApi from '@/api/login/login'
import store from '../index'
import settings from '@/setting'
import { MessageBox } from 'element-ui'
import { arrayToMenu, encryption } from '@/utils/public'
import {
  getAccessToken,
  getRefreshToken,
  getGroupId,
  setAccessToken,
  setRefreshToken,
  setGroupId,
  removeToken
} from '@/utils/auth'
import util from "@/libs/util";
import request from "@/utils/request";

const userInfo = {
  state: {
    accessToken: getAccessToken(),
    refreshToken: getRefreshToken(),
    userId: -1,
    userName: '',
    userInfo: {},
    account: '',
    orgId: -1,
    groupId: -1,
    roles: [],
    avatar: '',
    webName: '',
    admin: null,
    tenantId: '',
    clientId: '',
    messageNum: 0
  },
  mutations: {
    SET_ACCESS_TOKEN: (state, accessToken) => {
      state.accessToken = accessToken
    },
    SET_REFRESH_TOKEN: (state, refreshToken) => {
      state.refreshToken = refreshToken
    },
    SET_ID: (state, userId) => {
      state.userId = userId
    },
    SET_NAME: (state, userName) => {
      state.userName = userName
    },
    SET_USER: (state, userInfo) => {
      state.userInfo = userInfo
    },
    SET_ACCOUNT: (state, account) => {
      state.account = account
    },
    SET_ORG_ID: (state, orgId) => {
      state.orgId = orgId
    },
    SET_GROUP_ID: (state, groupId) => {
      state.groupId = groupId
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_WEB_NAME: (state, webName) => {
      state.webName = webName
    },
    SET_ADMIN: (state, admin) => {
      state.admin = admin
    },
    SET_TENANT_ID: (state, tenantId) => {
      state.tenantId = tenantId
    },
    SET_CLIENT_ID: (state, clientId) => {
      state.clientId = clientId
    },
    SET_MESSAGE_NUM: (state, messageNum) => {
      state.messageNum = messageNum
    }
  },
  actions: {
    // 登录
    Login({ commit }, userInfo) {
      util.log.danger('>>>>>> 登录用户信息 >>>>>>')
      console.log(userInfo)
      util.log.danger('<<<<<<<<<<<<<<<<<<<<<<')
      // 密码暗文
      const user = encryption({
        data: userInfo,
        key: 'mrHe,@heZhou.com',
        param: ['pwd']
      })
      util.log.danger('>>>>>> 加密后密码 >>>>>>')
      console.log(user)
      util.log.danger('<<<<<<<<<<<<<<<<<<<<<<')

      // console.log(user)
      if (!settings.cloudDeploy && settings.groupId) {
        setGroupId(settings.groupId)
      }
      return new Promise((resolve, reject) => {
        loginApi.login(user.username, user.pwd, user.code, user.randomStr).then(response => {
          util.log.danger('>>>>>> 请求返回值 >>>>>>')
          console.log(response)
          util.log.danger('<<<<<<<<<<<<<<<<<<<<<<')

          commit('SET_ACCESS_TOKEN', response.access_token)
          commit('SET_REFRESH_TOKEN', response.refresh_token)

          util.cookies.set('uuid', response.access_token)
          util.cookies.set('token', response.access_token)

          setAccessToken(response.access_token)
          setRefreshToken(response.refresh_token)
          if (response.group_id) {
            setGroupId(response.group_id)
          }
          const server = settings.cloudDeploy ? 'user' : 'admin'
          commit('SET_AVATAR', `/${process.env.VUE_APP_BASE_API}/${server}/user/headLogo?Authorization=Bearer ${getAccessToken()}`.replace(new RegExp('/+', 'gm'), '/'))

          resolve()
        }).catch(error => {

          util.log.danger('>>>>>> 请求异常 >>>>>>')
          reject(error)
          util.log.danger('<<<<<<<<<<<<<<<<<<<<<<')

        })
      })
    },
    // 获取用户信息
    GetUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        if (getGroupId()) {
          loginApi.getInfo(getGroupId()).then(response => {
            const menus = Object.assign([], response.data.menus)
            const functions = Object.assign([], response.data.functions)
            for (const item of menus) {
              item.buttons = []
              for (const items of functions) {
                if (items.split('_')[0] === item.code && items.split('_')[1]) {
                  item.buttons.push(items.split('_')[1])
                }
              }
            }
            const accessRoutes = arrayToMenu(response.data.menus)
            localStorage.setItem('arrays',JSON.stringify(response.data.menus))
            if (accessRoutes && accessRoutes.length) {
              const appRoutes = {}
              accessRoutes.forEach(router => {
                if (!appRoutes[router.applicationId]) {
                  appRoutes[router.applicationId] = [router]
                } else {
                  appRoutes[router.applicationId].push(router)
                }
              })
              // 当前应用是否有菜单 无: 删除此应用菜单
              const applicationIds = Array.from(new Set(accessRoutes.map(item => item.applicationId)))
              const newAppList = []
              response.data.applications.map(item => {
                applicationIds.map(items => {
                  if (item.id === items) {
                    newAppList.push(item)
                  }
                })
              })
              commit('SET_ID', response.data.userId)
              commit('SET_NAME', response.data.userName)
              commit('SET_USER', response.data)
              commit('SET_ACCOUNT', response.data.account)
              commit('SET_GROUP_ID', response.data.groupId)
              // commit('SET_GROUP_ID', 28)
              commit('SET_TENANT_ID', response.data.tenantId)
              commit('SET_CLIENT_ID', response.data.clientId)
              commit('SET_ORG_ID', response.data.orgId)
              commit('SET_APPS', newAppList)
              commit('SET_APP_ROUTES', appRoutes)
              commit('SET_FUNCTIONS', response.data.functions)
              commit('SET_WEB_NAME', response.data.groupName)
              commit('SET_ADMIN', response.data.admin)

              const server = settings.cloudDeploy ? 'user' : 'admin'
              commit('SET_AVATAR', `/${process.env.VUE_APP_BASE_API}/${server}/user/headLogo?Authorization=Bearer ${getAccessToken()}`.replace(new RegExp('/+', 'gm'), '/'))
              resolve(response)
            } else {
              MessageBox.alert('你没有访问系统的权限，请联系管理员！', '无权限', {
                confirmButtonText: '确定', callback: action => {
                  store.dispatch('FedLogOut').then(() => {
                    location.reload() // 为了重新实例化vue-router对象 避免bug
                  })
                }
              })
            }
          }).catch(error => {
            reject(error)
          })
        } else {
          commit('SET_ACCESS_TOKEN', '')
          commit('SET_REFRESH_TOKEN', '')
          window.localStorage.removeItem('tenantIndex')
          window.localStorage.removeItem('tenantPath')
          removeToken()
          location.reload()
        }
      })
    },
    // 登出
    LogOut({ commit }) {
      return new Promise((resolve, reject) => {
        loginApi.logout().then((resp) => {
          commit('SET_ACCESS_TOKEN', '')
          commit('SET_REFRESH_TOKEN', '')
          window.localStorage.removeItem('tenantIndex')
          window.localStorage.removeItem('tenantPath')
          removeToken()
          resolve(resp)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_ACCESS_TOKEN', '')
        commit('SET_REFRESH_TOKEN', '')
        window.localStorage.removeItem('tenantIndex')
        window.localStorage.removeItem('tenantPath')
        removeToken()
        resolve()
      })
    },
    SetMessageNum({ commit }, num) {
      commit('SET_MESSAGE_NUM', num)
    }
  }
}

export default userInfo
