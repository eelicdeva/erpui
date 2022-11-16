import JSEncrypt from 'jsencrypt/bin/jsencrypt.min'
//const JSEncrypt = require('jsencrypt/bin/jsencrypt.min'); //fail
// ||这里注掉了原来固定的公私钥
//const publicKey = '';


// 加密
/**
 * @param  {string} txt
 * @param  {string} publicKey
 * @return {string} 
 */
export const encrypt = (txt: string, publicKey:string): string => {
  const encryptor = new JSEncrypt()
  encryptor.setPublicKey(publicKey) // 设置公钥
  return encryptor.encrypt(txt) // 对数据
}

// 解密(暂无使用)

/**
 * @param  {string} txt
 * @return {string} 
 */
let privateKey ='';
export const decrypt = (txt: string): string => {
  const encryptor = new JSEncrypt()
  encryptor.setPrivateKey(privateKey) // 设置私钥
  return encryptor.decrypt(txt) // 对数据进行解密
}