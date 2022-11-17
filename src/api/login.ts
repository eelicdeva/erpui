import request from '@/utils/request'

// 
/**
 * || 登录方法
 * 
 * @param  {string} username
 * @param  {string} password
 * @param  {string} code
 * @param  {string} uuid
 * @param  {string} lang
 */
export function login(username: string, password: string, code: string, uuid: string, lang: string) {
  const data = {
    username,
    password,
    code,
    uuid,
    lang
  }
  return request({
    url: '/login',
    headers: {
      isToken: false
    },
    method: 'post',
    data: data
  })
}

// register || 注册方法
export const register = async (data: any) => {
	return await request({
		url: "/register",
		headers: {
			isToken: false,
		},
		method: "post",
		data: data,
	});
};

// get user Info || 获取用户(角色与权限)详细信息
export const getInfo = async () => {
	return await request({
		url: "/getInfo",
		method: "get",
	});
};

// logout || 退出方法
export const logout = async () => {
	return await request({
		url: "/logout",
		method: "post",
	});
};

// get Code Image || 获取验证码
export const getCodeImg = async () => {
	return await request({
		url: "/captchaImage",
		method: "get",
		timeout: 10000
	});
};


// get PublicKey || 获取key
export function getPublicKey() {
  return request({
    url: '/publicKey',
    method: 'get',
  })
}