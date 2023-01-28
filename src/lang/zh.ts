/**
 * Language: chinese
 * Naming format: first letter lowercase camel case || 命名格式：首字母小写驼峰命名
 * Keystyle": "nested" || 翻译路径：嵌套模式 
 * Sample：components.sizeSelect.setSize => { path：components, filename: sizeSelect, key: setSize };
 */
export default {
   // ()=> DELETE el{} when ENV. ;  
   // fix: i18n-ally error, (copy from element-plus i18n ) ;
 el: {
  colorpicker: {
    confirm: "\u786E\u5B9A",
    clear: "\u6E05\u7A7A"
  },
  datepicker: {
    now: "\u6B64\u523B",
    today: "\u4ECA\u5929",
    cancel: "\u53D6\u6D88",
    clear: "\u6E05\u7A7A",
    confirm: "\u786E\u5B9A",
    selectDate: "\u9009\u62E9\u65E5\u671F",
    selectTime: "\u9009\u62E9\u65F6\u95F4",
    startDate: "\u5F00\u59CB\u65E5\u671F",
    startTime: "\u5F00\u59CB\u65F6\u95F4",
    endDate: "\u7ED3\u675F\u65E5\u671F",
    endTime: "\u7ED3\u675F\u65F6\u95F4",
    prevYear: "\u524D\u4E00\u5E74",
    nextYear: "\u540E\u4E00\u5E74",
    prevMonth: "\u4E0A\u4E2A\u6708",
    nextMonth: "\u4E0B\u4E2A\u6708",
    year: "\u5E74",
    month1: "1 \u6708",
    month2: "2 \u6708",
    month3: "3 \u6708",
    month4: "4 \u6708",
    month5: "5 \u6708",
    month6: "6 \u6708",
    month7: "7 \u6708",
    month8: "8 \u6708",
    month9: "9 \u6708",
    month10: "10 \u6708",
    month11: "11 \u6708",
    month12: "12 \u6708",
    weeks: {
      sun: "\u65E5",
      mon: "\u4E00",
      tue: "\u4E8C",
      wed: "\u4E09",
      thu: "\u56DB",
      fri: "\u4E94",
      sat: "\u516D"
    },
    months: {
      jan: "\u4E00\u6708",
      feb: "\u4E8C\u6708",
      mar: "\u4E09\u6708",
      apr: "\u56DB\u6708",
      may: "\u4E94\u6708",
      jun: "\u516D\u6708",
      jul: "\u4E03\u6708",
      aug: "\u516B\u6708",
      sep: "\u4E5D\u6708",
      oct: "\u5341\u6708",
      nov: "\u5341\u4E00\u6708",
      dec: "\u5341\u4E8C\u6708"
    }
  },
  select: {
    loading: "\u52A0\u8F7D\u4E2D",
    noMatch: "\u65E0\u5339\u914D\u6570\u636E",
    noData: "\u65E0\u6570\u636E",
    placeholder: "\u8BF7\u9009\u62E9"
  },
  cascader: {
    noMatch: "\u65E0\u5339\u914D\u6570\u636E",
    loading: "\u52A0\u8F7D\u4E2D",
    placeholder: "\u8BF7\u9009\u62E9",
    noData: "\u6682\u65E0\u6570\u636E"
  },
  pagination: {
    goto: "\u524D\u5F80",
    pagesize: "\u6761/\u9875",
    total: "\u5171 {total} \u6761",
    pageClassifier: "\u9875",
    deprecationWarning: "\u4F60\u4F7F\u7528\u4E86\u4E00\u4E9B\u5DF2\u88AB\u5E9F\u5F03\u7684\u7528\u6CD5\uFF0C\u8BF7\u53C2\u8003 el-pagination \u7684\u5B98\u65B9\u6587\u6863"
  },
  messagebox: {
    title: "\u63D0\u793A",
    confirm: "\u786E\u5B9A",
    cancel: "\u53D6\u6D88",
    error: "\u8F93\u5165\u7684\u6570\u636E\u4E0D\u5408\u6CD5!"
  },
  upload: {
    deleteTip: "\u6309 delete \u952E\u53EF\u5220\u9664",
    delete: "\u5220\u9664",
    preview: "\u67E5\u770B\u56FE\u7247",
    continue: "\u7EE7\u7EED\u4E0A\u4F20"
  },
  table: {
    emptyText: "\u6682\u65E0\u6570\u636E",
    confirmFilter: "\u7B5B\u9009",
    resetFilter: "\u91CD\u7F6E",
    clearFilter: "\u5168\u90E8",
    sumText: "\u5408\u8BA1"
  },
  tree: {
    emptyText: "\u6682\u65E0\u6570\u636E"
  },
  transfer: {
    noMatch: "\u65E0\u5339\u914D\u6570\u636E",
    noData: "\u65E0\u6570\u636E",
    titles: ["\u5217\u8868 1", "\u5217\u8868 2"],
    filterPlaceholder: "\u8BF7\u8F93\u5165\u641C\u7D22\u5185\u5BB9",
    noCheckedFormat: "\u5171 {total} \u9879",
    hasCheckedFormat: "\u5DF2\u9009 {checked}/{total} \u9879"
  },
  image: {
    error: "\u52A0\u8F7D\u5931\u8D25"
  },
  pageHeader: {
    title: "\u8FD4\u56DE"
  },
  popconfirm: {
    confirmButtonText: "\u786E\u5B9A",
    cancelButtonText: "\u53D6\u6D88"
  }
},


// eelic-i18n setting   
  components: {
    sizeSelect: {
      setSize: '正在设置布局大小，请稍候...',
      sizeLarge: '较大',
      sizeDefault: '默认',
      sizeSmall: '稍小'
    },
    topNav:{
      moreMenu:  '更多菜单'
    }
  },
  utils: {
    errorCode: {
      err401: '认证失败，无法访问系统资源!',
      err403: '当前操作没有权限!',
      err404: '访问资源不存在!',
      errDefault: '系统未知错误，请反馈给管理员!'
    },
    request: {
      msgReSubmit: '数据正在处理，请勿重复提交!',
      err401Session: '无效的会话，或者会话已过期，请重新登录。',
      errNetwork: '后端接口连接异常',
      errSysTimeOut: '系统接口请求超时',
      errSysInterface: '系统接口',
      errException: '异常',
      msgDownload: '正在下载数据，请稍候',
      errDownload: '下载文件出现错误，请联系管理员',
      msgExpired: '登录状态已过期，您可以继续留在该页面，或者重新登录',
      msgSysHint: '系统提示',
      btnReLogin: '重新登录',
    }
  },
  login: {
    title: 'EELIC系统',
    logIn: '登录',
    username: '账号',
    password: '密码', 
    captcha: '验证码',
    rememberpsw: '记住密码',
    signupnow: '立即注册',
    logloading:'加载中...',
    setlanguage: '设置语言成功',
    enterUsername: '请输入您的账号',  
    enterPassword: '请输入您的密码',
    enterCaptcha: '请输入验证码',
    usernameError: '用户名错误',
    passwordError: '密码错误'
  },
  register: {
    title: 'EELIC管理系统',
    confirmPassword: '确认密码',
    Register: '注 册',
    login: '使用已有账户登录',
    registering: '注 册 中...',
    usernamelength: '用户账号长度必须介于 4 和 16 之间',
    usernamePattern: '用户名只能是a-zA-Z0-9_-',
    usernamePattern2: '第一个字符必须是字母',
    passwordlength: '用户密码长度必须介于 5 和 20 之间',
    enterConfirmPassword: '请再次输入您的密码',
    passwordDontMatch: '两次输入的密码不一致',
    verificationCode: '验证码必须是数字',
    congratulations: '恭喜你，您的账号', 
    success: '注册成功！'
  },
  tagsView: {
    refresh: '刷新',
    close: '关闭',
    closeOthers: '关闭其它',
    closeAll: '关闭所有'
  },
  settings: {
    title: '系统布局配置',
    theme: '主题色',
    icon: '图标: check',
    loginImage:'登录背景',
    config: '系统布局配置',
    topNav: '开启 TopNav',
    tagsView: '开启 Tags-View',
    fixedHeader: '固定 Header',
    sidebarLogo: '侧边栏 Logo',
    dynamicTitle: '动态标题',
    save: '保存配置',
    reset: '重置配置',
    loading: '正在保存到本地，请稍候...',
    loadingreset: '正在清除设置缓存并刷新，请稍候...',
  },
  user:{
    id: '用户编号',
    name : '用户名称',
    nickname : '用户昵称',
    departement : '部门',
    phoneNumber : '手机号码',
    status : '状态',
    creationtime: '创建时间',
    operate: '操作',
    DeptPlaceholder: '请输入部门名称',
    UserPlaceholder: '请输入用户名称',
    PhonePlaceholder: '请输入手机号码',
    statusPlaceholder: '用户状态',
    nickPlaceholder: '请输入用户昵称',
    emailPlaceholder: '请输入邮箱',
    startDate: '开始日期',
    endDate: '结束日期',
    email: '邮箱',
    dept: '归属部门',
    deptPlaceholder: '请选择归属部门',
    password: '用户密码',
    PWPlaceholder: '请输入用户密码',
    gender: '用户性别',
    sex: '性别',
    choosePlaceholder: '请选择',
    post: '岗位',
    role: '角色',
    remark: '备注',
    remarkPlaceholder: '请输入内容',
    dragUpload: '将文件拖到此处，或',
    clickUpload: '点击上传',
    updateAgree: '是否更新已经存在的用户数据',
    fileFormat: '仅允许导入xls、xlsx格式文件。',
    template: '下载模板',
    BasicInfo: '基本信息',
    account: '登录账号',
    RoleInfo: '角色信息',
    serialRole: '序号',
    personalInfo: '个人信息',
    userEmail: '用户邮箱',
    departementName: '所属部门',
    roleGroup: '所属角色',
    DateCreated: '创建日期',
    BasicData: '基本资料',
    ChangePW: '修改密码',
    male: '男',
    female: '女',
    nicknameRules:'用户昵称不能为空',
    emailRules: '邮箱地址不能为空',
    cemailRules: '请输入正确的邮箱地址',
    phoneNumberRules: '手机号码不能为空',
    pnumberRules: '请输入正确的手机号码',
    oldPassword: '旧密码',
    oldPWPlaceholder: '请输入旧密码',
    newPassword: '新密码',
    newPWPlaceholder: '请输入新密码',
    cPWPlaceholder: '请确认密码',
    oldPWRules: '旧密码不能为空',
    newPWRules: '新密码不能为空',
    newPWRules2: '长度在 5 到 20 个字符',
    cPWRules: '确认密码不能为空',
    usernameRules: '用户名称不能为空',
    usernameRules2: '用户名称长度必须介于 4 和 16 之间',
    passwordRules: '用户密码不能为空',
    addUser: '添加用户',
    modifyUser: '修改用户',
    userImport: '用户导入',
    confirmDelete1 : '是否确认删除用户编号为"',
    confirmDelete2 : '"的数据项？',
    succesDeleted: '删除成功',
    resetPW1: '请输入"',
    resetPW2: '"的新密码"',
    resetSucces: '修改成功，新密码是：',
    select: '选择用户',
    cellphone: '手机',
    selectError: '请选择要分配的用户',
    handleStatus1: '确认要"',
    handleStatus2: '"用户吗?',
  },
  role:{
    id: '角色编号',
    name: '角色名称',
    RolePlaceholder: '请输入角色名称',
    key: '权限字符',
    KeyPlaceholder: '请输入权限字符',
    statusPlaceholder: '角色状态',
    sort: '显示顺序',
    Content: "控制器中定义的权限字符，如：{'@'}PreAuthorize(`{'@'}ss.hasRole(\'admin\')`)",
    order: '角色顺序',
    menuPerms: '菜单权限',
    loading : '加载中，请稍候',
    scope : '权限范围',
    nameRules: '角色名称不能为空',
    keyRules : '权限字符不能为空',
    sortRules : '角色顺序不能为空',
    confirmDelete1 : '是否确认删除角色编号为"',
    confirmDelete2 : '"的数据项?',
    dataScope1: '全部数据权限',
    dataScope2: '自定数据权限',
    dataScope3: '本部门数据权限',
    dataScope4: '本部门及以下数据权限',
    dataScope5: '仅本人数据权限',
    handleStatus1: '确认要"',
    handleStatus2: '"用户吗?',
    addRole: '添加角色',
    modifyRole: '修改角色',
    dataperms: '分配数据权限',
    deauth: '批量取消授权',
    cancelauth: '取消授权',
    cancelConfirm1: '确认要取消该用户"',
    cancelConfirm2: '"角色吗？',
    cancelauthall: '是否取消选中用户授权数据项?',
  },
  menu:{
    frontPage: '首页',
    main: '主类目',
    name: '菜单名称',
    MenuPlaceholder: '请输入菜单名称',
    statusPlaceholder: '菜单状态',
    icon: '图标',
    sort: '排序',
    authID: '权限标识',
    path: '组件路径',
    parentMenu: '上级菜单',
    parentPlaceholder: '选择上级菜单',
    type: '菜单类型',
    icon2: '菜单图标',
    icon2Placeholder: '点击选择图标',
    menu: '菜单',
    list: '目录',
    button: '按钮',
    displaySort: '显示排序',
    content1: '选择是外链则路由地址需要以`http(s)://`开头',
    content2: '访问的路由地址，如：`user`，如外网地址需内链访问则以`http(s)://`开头',
    content3: '访问的组件路径，如：`system/user/index`，默认在`views`目录下',
    content4: "控制器中定义的权限字符，如：{'@'}PreAuthorize(`{'@'}ss.hasPermi(''system:user:list'')`)",
    content5: "访问路由的默认传递参数，如：`{'{'}''id'': 1, ''name'': ''ry''{'}'}`",
    content6: '选择是则会被`keep-alive`缓存，需要匹配组件的`name`和地址保持一致',
    content7: '选择隐藏则路由将不会出现在侧边栏，但仍然可以访问',
    content8: '选择停用则路由将不会出现在侧边栏，也不能被访问',
    external : '是否外链',
    route: '路由地址',
    routePlaceholder : '请输入路由地址',
    yes: '是',
    no: '否',
    component: '组件路径',
    componentPlaceholder : '请输入组件路径',
    permsPlaceholder : '请输入权限标识',
    paramPlaceholder : '请输入路由参数',
    param: '路由参数',
    cached: '是否缓存',
    cache: '缓存',
    dontcache: '不缓存',
    displayState: '显示状态',
    addMenu: '添加菜单',
    modifyMenu: '修改菜单',
    nameRules: '菜单名称不能为空',
    orderRules: '菜单顺序不能为空',
    routeRules: '路由地址不能为空',
    confirmDelete1: '是否确认删除名称为"',
    confirmDelete2: '"的数据项?',
  },
  dept:{
    name: '部门名称',
    statusPlaceholder: '部门状态',
    higheroffice: '上级部门',
    HOPlaceholder: '选择上级部门',
    leader: '负责人',
    leaderPlaceholder: '请输入负责人',
    contact: '联系电话',
    contactPlaceholder: '请输入联系电话',
    HORules: '上级部门不能为空',
    nameRules: '部门名称不能为空',
    sortRules: '显示排序不能为空',
    addDept: '添加部门',
    modifyDept: '修改部门',  
  },
  post:{
    code: '岗位编码',
    codePlaceholder: '请输入岗位编码',
    codePlaceholder2: '请输入编码名称',
    name: '岗位名称',
    postPlaceholder: '请输入岗位名称',
    statusPlaceholder: '岗位状态',
    id: '岗位编号',
    sort: '岗位排序',
    sequence: '岗位顺序',
    titleRules: '岗位名称不能为空',
    addPost: '添加岗位',
    modifyPost: '修改岗位',
    nameRules: '岗位名称不能为空',
    codeRules: '岗位编码不能为空',
    sortRules: '岗位顺序不能为空',
    confirmDelete: '是否确认删除岗位编号为"',

  },
  notice:{
    title: '公告标题',
    titlePlaceholder: '请输入公告标题',
    author: '操作人员',
    authorPlaceholder: '请输入操作人员',
    type: '类型',
    typePlaceholder: '公告类型',
    type2Placeholder: '类型',
    author2: '创建者',
    content: '内容',
    titleRules: '公告标题不能为空',
    typeRules: '公告类型不能为空',
    update: '修改公告',
    addNotice: '添加公告',
    confirmDelete: '是否确认删除公告编号为"',
  },
  dict: {
    name: "字典名称",
    namePlaceholder: "请输入字典名称",
    type: "字典类型", 
    typePlaceholder: "请输入字典类型",
    status: "字典状态",
    id: "字典编号",
    tag: "字典标签",
    tagPlaceholder: "请输入字典标签",
    dataStatus: "数据状态",
    code: "字典编码",
    value: "字典键值",
    sort: "字典排序",
    addDictType: "添加字典类型",
    modifyDictType: "修改字典类型",
    confirmDelete: "是否确认删除字典编号为 '' ",
    refreshSuccess: "刷新成功",
    nameRules: "字典名称不能为空",
    typeRules: "字典类型不能为空",
    dataLabel: "数据标签",
    dataValue: "数据键值",
    dataLabelPlaceholder: "请输入数据标签",
    dataValuePlaceholder: "请输入数据键值",
    styleAttribute: "样式属性",
    styleAttributePlaceholder: "请输入样式属性",
    dictconfirmDelete: "是否确认删除字典编码为 '' ",
    listClass: "回显样式",
    modifyDictData: "修改字典数据",
    addDictData: "添加字典数据",
    dataLabelRules: "数据标签不能为空",
    dataValueRules: "数据键值不能为空",
    sortRules: "数据顺序不能为空",
  },
  book:{
    title: '书籍名称',
    confirmDelete: '是否确认删除书编号为"',
    category: '图书类别',
    titlePlaceholder: '请输入书名',
    categoryPlaceholder: '请输入图书类别',
    remarkPlaceholder:  '请输入备注',
    addBook: '添加图书',
    editBook: '修改书',
    addLoan: '添加借书',
    editLoan: '编辑贷款',
    addBookCategory: '添加图书类别',
    editBookCategory: '编辑书籍类别',
    isbn : '国际标准书号',
    checkoutDate: '贷款日期',
    returnDate: '返回日期',
    borrowerName: '借款人姓名',
    categoryStatistic: '类别统计',
    LoanStatistic: '贷款统计',
    shelfLabels: '地点',
    cdStatus: '光盘 / 的',
    synopsis: '概要',
    statistics: '统计数据',
    isbnPlaceholder: '请输入国际标准书号',
    checkoutDatePlaceholder: '请输入贷款日期',
    returnDatePlaceholder: '请输入退货日期',
    borrowerRules: '借款人姓名不能为空',
    bookTitleRules: '书名不能为空',
    checkoutDateRules: '请选择日期',
    isbnRules: '国际标准书号不能为空',
    isbnRules2: 'ISBN 长度必须在 14 到 17 之间',
    isbnRules3: 'ISBN 只能是数字和“-”',
    bookCategoryRules: '图书分类不能为空',
    authorRules: '作者姓名不能为空',
    synopsisRules : '概要不能为空',
    languageRules : '语言不能为空',
    categoryRules : '类别不能为空',
    locationRules : '位置不能为空',
    locationRules2 : '位置长度必须为 6',
  },
  mbti:{
    result: 'MBTI 结果',
    answer: '回答',
  },
  button:{
    add: '新增',
    AddSuccess: '新增成功',
    AssignUser:'分配用户',
    Authorizationsucceeded: '授权成功',
    authRole: '分配角色',
    cancel: '取 消',
    cancelSuccess: '取消授权成功',
    clean: '清空',
    close: '关闭',
    closeall: '全部关闭',
    closecurrent: '关闭当前',
    closeleft: '关闭左侧',
    closeother: '关闭其他',
    closeright: '关闭右侧',
    dataPerms:'数据权限',
    delete: '删除',
    disable: '停用',
    documentAddress: '文档地址',
    edit: '修改',
    enable: '启用',
    expand: '展开/折叠',
    export: '导出',
    hide: '隐藏',
    hideExtend:'隐藏扩展',
    hideSearch: '隐藏搜索',
    import: '导入',
    ImportResults: '导入结果',
    language : '语言',
    logout: '确定注销并退出系统吗？',
    NetworkError: '后端接口连接异常',
    refresh: '刷新页面',
    RefreshCache: '刷新缓存',
    relation: '父子联动',
    reset: '重置',
    resetPW: '重置密码',
    return: '返回',
    save: '保存',
    search: '搜索',
    select : '全选/全不选',
    show: '显示',
    showExtend: '扩展资料',
    showhide: '显示/隐藏',
    showhideList: '显隐列',
    showSearch: '显示搜索',
    size: '布局大小',
    sourceAddress: '源码地址',
    submit: '确 定',
    submit2: '提交',
    success: '成功',
    successModify: '修改成功',
    iconSelectPlaceholder: '请输入图标名称',
    hasPermi: '请设置操作权限标签值',
    hasRole: '请设置角色权限标签值',
    log: '日志',
  },
  navbar: {
    personalCenter: '个人中心',
    layoutSettings: '布局设置',
    signOut: '退出登录',
  },
  avatar: {
    uploadAvatar: '点击上传头像',
    modifyAvatar: '修改头像',
    choose: '选择',
    error: '文件格式错误，请上传图片类型,如：JPG，PNG后缀的文件。',
  },
  upload: {
    tip1: '请上传',
    tip2: '大小不超过',
    tip3: '格式为',
    tip4: '的文件',
    selectFile: '选取文件',
    fileType1: '文件格式不正确, 请上传 ',
    fileType2: '格式文件!',
    fileSize: '上传文件大小不能超过 ',
    loading: '正在上传文件，请稍候...',
    handleExceed1: '上传文件数量不能超过',
    handleExceed2: '个!',
    uploadError: '上传文件失败',
    imageType1: '文件格式不正确, 请上传 ',
    imageType2: ' 图片格式文件! ',
    avatarType: '上传头像图片大小不能超过 ',
    imageloading: '正在上传图片，请稍候...',
    imageExceed1: '上传文件数量不能超过  ',
    imageExceed2: ' 个!',
    imageFailed: '上传图片失败',
  },
  genTable: {
   generate : '生成',
   columnInformation: '字段信息',
   columnName: '字段列名',
   GenerateInfo: '生成信息',
   tableName: '表名称',
   tableNamePlaceholder: '请输入表名称',
   tableComment: '表描述',
   columnType: '物理类型',
   columnComment: '字段描述',
   javaType: 'Java类型',
   javaField: 'java属性',
   isInsert: '插入',
   isEdit: '编辑',
   isList: '列表',
   isQuery: '查询',
   queryType: '查询方式',
   isRequired: '必填',
   generateTemplate: '生成模板',
   htmlType: '显示类型',
   input: '文本框',
   textarea: '文本域',
   select: '下拉框',
   radio: '单选框',
   checkbox: '复选框',
   datetime: '日期控件',
   imageUpload: '图片上传',
   fileUpload: '文件上传',
   editor: '富文本控件',
   dictType: '字典类型',
   crud: '单表（增删改查）',
   tree: '树表（增删改查）',
   sub: '主子表（增删改查）',
   packagePath: '生成包路径',
   chartInfo: '图表信息',
   chartType: '图表类型',
   xAxisChart: '类别',
   yAxisChart: '值',
  },
  ErpProductDemo: {
    idProductLa: 'id',
    idProductLaPlaceholder: '请输入id',
    skuLazada: 'skulazada',
    skuLazadaPlaceholder: '请输入skulazada',
    skuEelic: 'skueelic',
    skuEelicPlaceholder: '请输入skueelic',
    skuNameLa: 'skunamela',
    skuNameLaPlaceholder: '请输入skunamela',
    skuNameLaId: 'sku_name_la_id',
    skuNameLaIdPlaceholder: '请输入sku_name_la_id',
    skuNameLaEn: 'sku_name_la_en',
    skuNameLaEnPlaceholder: '请输入sku_name_la_en',
    shortDescription: 'shortdescription',
    shortDescriptionPlaceholder: '请选择shortdescription',
    shortDescriptionEn: 'short_description_en',
    shortDescriptionEnPlaceholder: '请选择short_description_en',
    shortDescriptionId: 'short_description_id',
    shortDescriptionIdPlaceholder: '请选择short_description_id',
    description: 'description',
    descriptionPlaceholder: '请选择description',
    descriptionId: 'description_id',
    descriptionIdPlaceholder: '请选择description_id',
    descriptionEn: 'description_en',
    descriptionEnPlaceholder: '请选择description_en',
    model: 'skumodel',
    modelPlaceholder: '请输入skumodel',
    packageContent: 'packagecontent',
    packageContentPlaceholder: '请选择packagecontent',
    packageWeight: 'package_weight',
    packageWeightPlaceholder: '请输入package_weight',
    packageLength: 'package_length',
    packageLengthPlaceholder: '请输入package_length',
    packageWidth: 'package_width',
    packageWidthPlaceholder: '请输入package_width',
    packageHeight: 'package_height',
    packageHeightPlaceholder: '请输入package_height',
    price: 'price',
    pricePlaceholder: '请输入price',
    specialPrice: 'specialprice',
    specialPricePlaceholder: '请输入specialprice',
    quantity: 'quantity',
    quantityPlaceholder: '请输入quantity',
    primaryCategory: 'primary_category',
    primaryCategoryPlaceholder: '请输入primary_category',
    statusLa: 'status_la',
    statusLaPlaceholder: '请输入status_la',
    colorFamily: 'color_family',
    colorFamilyPlaceholder: '请输入color_family',
    fblLa: 'fbl_la',
    fblLaPlaceholder: '请输入fbl_la',
    simage1: 'simage1',
    simage1Placeholder: '请输入simage1',
    simage2: 'simage2',
    simage2Placeholder: '请输入simage2',
    simage3: 'simage3',
    simage3Placeholder: '请输入simage3',
    simage4: 'simage4',
    simage4Placeholder: '请输入simage4',
    simage5: 'simage5',
    simage5Placeholder: '请输入simage5',
    simage6: 'simage6',
    simage6Placeholder: '请输入simage6',
    simage7: 'simage7',
    simage7Placeholder: '请输入simage7',
    simage8: 'simage8',
    simage8Placeholder: '请输入simage8',
    status: 'sku状态',
    statusPlaceholder: '请选择sku状态',
    delFlag: '删除标志',
    delFlagPlaceholder: '请输入删除标志',
    createBy: '创建者',
    createByPlaceholder: '请输入创建者',
    createTime: '创建时间',
    createTimePlaceholder: '选择创建时间',
    updateBy: '更新者',
    updateByPlaceholder: '请输入更新者',
    updateTime: '更新时间',
    updateTimePlaceholder: '选择更新时间',
    remark: '备注',
    remarkPlaceholder: '请选择备注'
  },
  Error: {
   401: '401错误!',
   h2401: '您没有访问权限！',
   h6401: '对不起，您没有访问权限，请不要进行非法操作！您可以返回主页面',
   Home: '回首页',
   404: '404错误!',
   info404: '对不起，您正在寻找的页面不存在。尝试检查URL的错误，然后按浏览器上的刷新按钮或尝试在我们的应用程序中找到其他内容。',
   BacktoHome: '返回首页',
   Pagenotfound: '找不到网页！'
  },
  Cache: {
    redisVersion: 'Redis版本',
    runMode: '运行模式',
    standAlone: '单机',
    cluster: '集群',
    port: '端口',
    clients: '客户端数',
    runningTime: '运行时间(天)',
    memoryUsage: '使用内存',
    CpuUsage: '使用CPU',
    memoryAllocation: '内存配置',
    AOF: 'AOF是否开启',
    RDB: 'RDB是否成功',
    Key: 'Key数量',
    network: '网络入口/出口',
    commandStats: '命令统计',
    memoInfo: '内存信息',
    loadingMessage: '正在加载缓存监控数据，请稍候！',
    order: '命令',
    peak: '峰值',
    memoUsage: '内存消耗',
    list: '缓存列表',
    name: '缓存名称',
    key: '键名列表',
    content: '缓存内容',
    CKey: '缓存键名',
    clearAll: '清理全部',
    refreshCache: '刷新缓存列表成功',
    clear1: '清理缓存名称[',
    clear2: ']成功',
    refreshKey: '刷新键名列表成功',
    clearKey: '清理缓存键名[',
    clearAllCaches: '清理全部缓存成功',
  },
  Job: {
    name: '任务名称',
    namePlaceholder: '请输入任务名称',
    groupName: '任务组名',
    groupNamePlaceholder: '请选择任务组名',
    status: '任务状态',
    statusPlaceholder: '请选择任务状态',
    id: '任务编号',
    callTarget: '调用目标字符串',
    cron: 'cron执行表达式',
    execute: '执行一次',
    details: '任务详细',
    schedule: '调度日志',
    group: '任务分组',
    callMethod: '调用方法',
    beanCall: "Bean调用示例：ryTask.ryParams('ry')",
    classCall: "Class类调用示例：com.ruoyi.quartz.task.RyTask.ryParams('ry')",
    paramDesc: '参数说明：支持字符串，布尔类型，长整型，浮点型，整型',
    callTargetPlaceholder: '请输入调用目标字符串',
    cronExpression: 'cron表达式',
    cronExpressionPlaceholder: '请输入cron执行表达式',
    generateExpression: '生成表达式',
    executionStrategy: '执行策略',
    executeImmediately: '立即执行',
    executeOnce: '执行一次',
    abandonExecution: '放弃执行',
    concurrent: '是否并发',
    allow: '允许',
    prohibit: '禁止',
    nextExec: '下次执行时间：',
    targetMethod: '调用目标方法：',
    normal: '正常',
    fail: '失败',
    defaultPolicy: '默认策略',
    rules1: '任务名称不能为空',
    rules2: '调用目标字符串不能为空',
    rules3: 'cron执行表达式不能为空',
    handleStatus: '"任务吗?',
    confirm1: '确认要立即执行一次"',
    confirm2: '"任务吗?',
    executionSuccess: '执行成功',
    confirmDelete: '是否确认删除定时任务编号为"',
    addTask: '添加任务',
    modifyTask: '修改任务',
    ExecutionStatus: '执行状态',
    ExecutionStatusPlaceholder: '请选择执行状态',
    ExecutionTime: '执行时间',
    LogId: '日志编号',
    LogInfo: '日志信息',
    detailed: '详细',
    logDetails: '调度日志详细',
    logNumber: '日志序号：',
    ExceptionInfo: '异常信息：',
    emptySuccess: '清空成功',
    confirmLogDelete: '是否确认删除调度日志编号为"',
    confirmClearLog: '是否确认清空所有调度日志数据项?',
  },
  
  
}