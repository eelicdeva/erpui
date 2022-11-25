<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
        <span v-if="item.redirect === 'noRedirect' || index == levelList.length - 1" class="no-redirect">
          {{ item.meta.title }}
        </span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script lang="ts" setup name="Breadcrumb">
// ||Breadcrumb 面包屑# 显示当前页面的路径，快速返回之前的任意页面。
// ||该组件接受一个 String 类型的参数 separator来作为分隔符。 默认值为 '/'。
import { Ref, ref, watchEffect } from 'vue';
import { RouteLocationMatched,RouteLocationRaw,useRoute, useRouter } from 'vue-router';
import i18n from '@/lang/index';

const {t} = i18n.global;
const route = useRoute();
const router = useRouter();
const levelList = ref([]) // ||导航列表 存放matched里筛选的路由记录

type PartialRouteLocationMatched = Partial<RouteLocationMatched>// to-do check again

function getBreadcrumb() {
  // only show routes with meta.title || 过滤掉没有title属性的路由，没有title就无法作为面包屑导航
  let matched = route.matched.filter(item => item.meta && item.meta.title) as PartialRouteLocationMatched[];
  // ||获取第一个匹配路由记录
  const first = matched[0]
  // ||判断是否为首页
  // ||我们要把dashboard(index)作为首页 始终固定在面包屑导航第一个
  // ||如果第一个匹配到的路由记录不是dashboard 我们自己就把它放在记录数组的第一项
  if (!isDashboard(first)) {
    matched = ([{ path: '/index', 
                  meta: { title: t('menu.frontPage') } 
                }] as PartialRouteLocationMatched[]).concat(matched).concat(matched)
  }

  levelList.value = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
}

// ||判断是不是Dashboard路由
function isDashboard(route?: PartialRouteLocationMatched) {
  const name = route && route.name
  if (!name) {
    return false
  }
  return (
    (name as string).trim().toLocaleLowerCase() ===
    'Index'.toLocaleLowerCase()
  )
  return (name as string).trim() === 'Index'
}
/** 
    // 点击面包屑导航可跳转
  const handleLink = (route: RouteLocationMatched) => {
    const { path, redirect } = route
    // 如果是重定向路由 就走重定向路径
    if (redirect) {
      router.push(redirect as RouteLocationRaw)
      return
    }
    router.push(path)
  }
  */

// ||点击面包屑导航可跳转
function handleLink(item: RouteLocationMatched) {
  const { redirect, path } = item
  // ||如果是重定向路由 就走重定向路径
  if (redirect) {
    router.push(redirect as RouteLocationRaw)
    return
  }
  router.push(path)
}

watchEffect(() => {
  // if you go to the redirect page, do not update the breadcrumbs
  if (route.path.startsWith('/redirect/')) {
    return
  }
  getBreadcrumb()
});
getBreadcrumb();
</script>

<style lang='scss' scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>