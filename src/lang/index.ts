// index.js

import { createI18n } from 'vue-i18n' //vue3 -> vue-i18n

import Cookies from 'js-cookie'
import elementZhLocale from 'element-plus/lib/locale/lang/zh-cn'// element-plus lang
import elementEnLocale from 'element-plus/lib/locale/lang/en' // element-plus lang
import elementIdLocale from 'element-plus/lib/locale/lang/id' // element-plus lang

import enLocale from './en'
import zhLocale from './zh'
import idLocale from './id'

const messages = {
  en: {
    ...enLocale,
    ...elementEnLocale
  },
  zh: {
    ...zhLocale,
    ...elementZhLocale
  },
  id: {
    ...idLocale,
    ...elementIdLocale
  }
}

const i18n = createI18n({

  locale: Cookies.get('lang') || 'en',
    // 设置文本内容
  messages
})

export default i18n