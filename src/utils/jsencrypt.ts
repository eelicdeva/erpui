import JSEncrypt from 'jsencrypt/bin/jsencrypt.min'

// 密钥对生成 http://web.chacuo.net/netrsakeypair

const publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDck6Vjmbt0Uclm9EGPY+eOA1SnEQCbIhQNAMLT4O9mExTPDcqJ5YuskupFr3k8D8hccUc3vAK4II0bG0AhW2TWGkNBMSamxO4g/P1BL3s9LiY7V2roL8BzEBVhVMasRz/HCcG16hTfYCaTRe6WwPrB+H6lDyOS6dTYgtPc4U3/mQIDAQAB'
  
const privateKey = 'MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBANyTpWOZu3RRyWb0QY9j544DVKcRAJsiFA0AwtPg72YTFM8Nyonli6yS6kWveTwPyFxxRze8ArggjRsbQCFbZNYaQ0ExJqbE7iD8/UEvez0uJjtXaugvwHMQFWFUxqxHP8cJwbXqFN9gJpNF7pbA+sH4fqUPI5Lp1NiC09zhTf+ZAgMBAAECgYA5yDO7M7p3bjVkUvgZqAIwoY67dSjDetnlzh07g+EyzCzXULWOCiPcwV+9gYowwbGrBcGyR/4uXdiZETprgpWXRBJjG3ZfUjiuj2kiZtdiSNoV761cN7Kck/u1exYT1Ain+igFmwl8fAXwG4FHa8TiDLAjRHfbmuiOR7LQMmDSQQJBAPbyF7X/zrRSAhq6qy+8m+fP4eN8hUN5lU1PY+g2CTg28wrM1Vx1SMcx82tqbLhXH3SZrorx51WmACkuqkFt9jMCQQDkqgvtxN0vgaBQXvNJFRmEbFEyCHQGidgs0ccqEQLRiEqHqjRAGOpCEziGg6S1qtMprV+puWxQH+p6jbLnrG8DAkBBjmdJA43mRNcWLXQAijuBQKig8Y+XKBHAolDNdnrgF4ZR2arSjrgxWUtburb+APLyy1GQxUM6c4Ubaa39DKoNAkEA0y4w4iDEXhGLa26lpUM1U9Vtj5W7AibgXVRIahNX1QfYPT72DpR0FR4HQEPoJFdlucIC7Y7v93fiZ9jh95CK3QJAF5kMZ8u4+QhWyZq1w6OqelmPhknGO6zAOKztigXgvHrLbBwlyTzfYGAUGpbEFITW3t4otsLHTP1AsBTOeV/7Cw=='
  
// 加密
export function encrypt(txt) {
  const encryptor = new JSEncrypt()
  encryptor.setPublicKey(publicKey) // 设置公钥
  return encryptor.encrypt(txt) // 对数据进行加密
}

// 解密
export function decrypt(txt) {
  const encryptor = new JSEncrypt()
  encryptor.setPrivateKey(privateKey) // 设置私钥
  return encryptor.decrypt(txt) // 对数据进行解密
}