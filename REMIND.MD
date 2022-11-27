# Router Security

## java router whitelist permission: 
### @framewor/config/properites/SecrtityConfig
// 对于登录login 注册register 验证码captchaImage 允许匿名访问
.antMatchers("/login", "/register", "/captchaImage", "/hr/mbti/add", "/publicKey", "/tool/test", "/tool/test1", "/tool/test2","/demo").permitAll()

## web router whitelist permission: 
### @/router/index.ts
export const constantRoutes = [ 
  {
    path: '/demo',
    component: () => import('@/views/demo/demo.vue'),
    hidden: true
  },
  {
    path: '/test',
    component: () => import('@/views/test/test.vue'),
    hidden: true
  }
]

## web router whitelist permission: 
### @/router/index.ts
@/src/permission.ts
if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next()
}

## admin user auth: default "admin"
### @src/utils/permission.ts
const super_admin = "admin";
const hasRole = roles.some(role => {
return super_admin === role || permissionRoles.includes(role)

