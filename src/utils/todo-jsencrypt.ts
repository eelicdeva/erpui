//import JSEncrypt from 'jsencrypt/bin/jsencrypt.min'
const { JSEncrypt } = require( 'jsencrypt/bin/jsencrypt.min');
// 密钥对生成 http://web.chacuo.net/netrsakeypair

// 密钥对生成 http://web.chacuo.net/netrsakeypair
 
//这里注掉了原来固定的公私钥
//const publicKey = ''
//const privateKey = ''
 
// 加密
export function encrypt(txt: string, publicKey: string ) {
  const encryptor = new JSEncrypt()
  encryptor.setPublicKey(publicKey) // 设置公钥
  return encryptor.encrypt(txt) // 对数据
}


// 解密(暂无使用)
let privateKey = '';
export function decrypt(txt: string) {
  const encryptor = new JSEncrypt()
  encryptor.setPrivateKey(privateKey) // 设置私钥
  return encryptor.decrypt(txt) // 对数据进行解密
}
