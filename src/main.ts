import { createApp } from 'vue';
import App from '@/App.vue';
//cookie
import Cookies from 'js-cookie';
//cookie token
import { getToken, delToken } from '@/utils/cookieToken'

// global css
import '@/assets/styles/index.scss';
// element plus
import ElementPlus from 'element-plus';
// locale language
import locale from 'element-plus/lib/locale/lang/id';
// element icons
import elementIcons from '@/components/SvgIcon/svgicon';
// custom directives
import directive from './directive'; 
// vue Router
import router from './router';
// vue i18n
import i18n from '@/lang';
// pinia store
import store from './store';
// svg icons
import 'virtual:svg-icons-register';
import SvgIcon from '@/components/SvgIcon/index.vue';

// 注册指令
import plugins from './plugins'; // plugins

import { download } from '@/utils/request';
// permission control
import '@/permission'; 
import { useDict } from '@/utils/dict';
import { parseTime, resetForm, addDateRange, handleTree, selectDictLabel, selectDictLabels } from '@/utils/ruoyi';

// Pagination
import Pagination from '@/components/Pagination/index.vue';
// 自定义表格工具组件
import RightToolbar from '@/components/RightToolbar'
// // EELIC ExtendToolbar
import ExtendToolbar from '@/components/ExtendToolbar'
// 文件上传组件
import FileUpload from "@/components/FileUpload"
// 图片上传组件
import ImageUpload from "@/components/ImageUpload"
// 图片预览组件
import ImagePreview from "@/components/ImagePreview"
// 自定义树选择组件
import TreeSelect from '@/components/TreeSelect'
// 字典标签组件
import DictTag from '@/components/DictTag'


const app = createApp(App)

// 全局方法挂载
app.config.globalProperties.useDict = useDict
app.config.globalProperties.download = download
app.config.globalProperties.parseTime = parseTime
app.config.globalProperties.resetForm = resetForm
app.config.globalProperties.handleTree = handleTree
app.config.globalProperties.addDateRange = addDateRange
app.config.globalProperties.selectDictLabel = selectDictLabel
app.config.globalProperties.selectDictLabels = selectDictLabels

// 全局组件挂载
app.component('DictTag', DictTag)
app.component('Pagination', Pagination)
app.component('TreeSelect', TreeSelect)
app.component('FileUpload', FileUpload)
app.component('ImageUpload', ImageUpload)
app.component('ImagePreview', ImagePreview)
app.component('RightToolbar', RightToolbar)
app.component('ExtendToolbar', ExtendToolbar)

app.use(router)
app.use(store)
app.use(plugins)
app.use(elementIcons)
app.component('svg-icon', SvgIcon)
// use添加i18n
app.use(i18n)


directive(app)

// 使用element-plus 并且设置全局的大小
app.use(ElementPlus, {
  locale: locale,
  // 支持 large、default、small
  size: Cookies.get('size') || 'default',
 //message: default
})

app.mount('#app')