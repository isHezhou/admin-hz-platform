import request from '@/utils/request'

const loginApi = {

  /**
   * 登录 获取token
   */
  login(username, pwd, code, randomStr) {
    const grant_type = 'password'
    const scope = 'server'
    return request({
      url: '/oauth2/oauth/token',
      headers: {
        isToken: false,
        'Authorization': 'Basic ZGV2ZWxvcDpkZXZlbG9w'
      },
      method: 'get',
      params: {username, pwd, randomStr, code, grant_type, scope}
    })
  },
  
}

export default loginApi;
