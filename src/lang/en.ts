/**
 * Language: english
 * Naming format: first letter lowercase camel case || 命名格式：首字母小写驼峰命名
 * Keystyle": "nested" || 翻译路径：嵌套模式 
 * Sample：components.sizeSelect.setSize => { path：components, filename: sizeSelect, key: setSize };
 */
export default {
   // ()=> DELETE el{} when ENV. ;  
   // fix: i18n-ally error, (copy from element-plus i18n ) ;
   el: {
    colorpicker: {
      confirm: "OK",
      clear: "Clear"
    },
    datepicker: {
      now: "Now",
      today: "Today",
      cancel: "Cancel",
      clear: "Clear",
      confirm: "OK",
      selectDate: "Select date",
      selectTime: "Select time",
      startDate: "Start Date",
      startTime: "Start Time",
      endDate: "End Date",
      endTime: "End Time",
      prevYear: "Previous Year",
      nextYear: "Next Year",
      prevMonth: "Previous Month",
      nextMonth: "Next Month",
      year: "",
      month1: "January",
      month2: "February",
      month3: "March",
      month4: "April",
      month5: "May",
      month6: "June",
      month7: "July",
      month8: "August",
      month9: "September",
      month10: "October",
      month11: "November",
      month12: "December",
      week: "week",
      weeks: {
        sun: "Sun",
        mon: "Mon",
        tue: "Tue",
        wed: "Wed",
        thu: "Thu",
        fri: "Fri",
        sat: "Sat"
      },
      months: {
        jan: "Jan",
        feb: "Feb",
        mar: "Mar",
        apr: "Apr",
        may: "May",
        jun: "Jun",
        jul: "Jul",
        aug: "Aug",
        sep: "Sep",
        oct: "Oct",
        nov: "Nov",
        dec: "Dec"
      }
    },
    select: {
      loading: "Loading",
      noMatch: "No matching data",
      noData: "No data",
      placeholder: "Select"
    },
    cascader: {
      noMatch: "No matching data",
      loading: "Loading",
      placeholder: "Select",
      noData: "No data"
    },
    pagination: {
      goto: "Go to",
      pagesize: "/page",
      total: "Total {total}",
      pageClassifier: "",
      deprecationWarning: "Deprecated usages detected, please refer to the el-pagination documentation for more details"
    },
    messagebox: {
      title: "Message",
      confirm: "OK",
      cancel: "Cancel",
      error: "Illegal input"
    },
    upload: {
      deleteTip: "press delete to remove",
      delete: "Delete",
      preview: "Preview",
      continue: "Continue"
    },
    table: {
      emptyText: "No Data",
      confirmFilter: "Confirm",
      resetFilter: "Reset",
      clearFilter: "All",
      sumText: "Sum"
    },
    tree: {
      emptyText: "No Data"
    },
    transfer: {
      noMatch: "No matching data",
      noData: "No data",
      titles: ["List 1", "List 2"],
      filterPlaceholder: "Enter keyword",
      noCheckedFormat: "{total} items",
      hasCheckedFormat: "{checked}/{total} checked"
    },
    image: {
      error: "FAILED"
    },
    pageHeader: {
      title: "Back"
    },
    popconfirm: {
      confirmButtonText: "Yes",
      cancelButtonText: "No"
    }
  },

// eelic-i18n setting     
  components: {
    sizeSelect: {
      setSize: 'Setting layout size, please wait...',
      sizeLarge: 'Large',
      sizeDefault: 'Default',
      sizeSmall: 'Small'
    }, 
    topNav:{
      moreMenu:  'More Menu'
    }
  },
  utils: {
    errorCode: {
      err401: 'Authentication failed, unable to access system resource!',
      err403: 'The current operation does not have permission!',
      err404: 'Access resource does not exist!',
      errDefault: 'System unknown error, please feedback to administrator!'
    },
    request: {
      msgReSubmit: 'Data is being processed, please do not resubmit!',
      err401Session: 'Invalid session, or session has expired, please log in again.',
      errNetwork: 'Network Error',
      errSysTimeOut: 'System interface request timeout',
      errSysInterface: 'System Interface',
      errException: 'abnormal',
      msgDownload: 'Downloading data, please wait...',
      errDownload: 'There was an error downloading the file, please contact the administrator!',
      msgExpired: 'Your login status has expired, you can stay on this page or log in again',
      msgSysHint: 'System Hint',
      btnReLogin: 'Re-Login',       
    }
  },
  login: {
    title: 'EELIC SYSTEM',
    logIn: 'Login',
    username: 'Username',
    password: 'Password',
    captcha: 'Verification Code',
    rememberpsw: 'Remember password',
    signupnow: 'Sign Up',
    logloading:'Loading...',
    setlanguage: 'Set language successfully',
    enterUsername: 'Please input your username',
    enterPassword: 'Please input your password',
    enterCaptcha: 'Please input verification code',
    usernameError: 'Username Error',
    passwordError: 'Password Error',

  },
  register: {
    title: 'EELIC system',
    confirmPassword: 'Confirm Password',
    Register: 'Register',
    login: 'Log in with an existing account',
    registering: 'Registering ...',
    usernamelength: 'Username length must be between 4 and 16',
    usernamePattern: 'The username only can be a-zA-Z0-9_-',
    usernamePattern2: 'First character must be a letter',
    passwordlength: 'Password length must be between 5 and 20',
    enterConfirmPassword: 'Please input your password again',
    passwordDontMatch: 'Passwords do not match',
    verificationCode: 'Verification code must be a number',
    congratulations: 'Congratulations, your account',
    success: 'registration success!',
  },
  tagsView: {
    refresh: 'Refresh',
    close: 'Close',
    closeOthers: 'Close Others',
    closeAll: 'Close All'
  },
  settings: {
    title: 'Page style setting',
    theme: 'Theme Color',
    icon: 'icon: check',
    loginImage:'Login Image',  
    config: 'System Layout Configuration',
    topNav: 'Open TopNav',
    tagsView: 'Open Tags-View',
    fixedHeader: 'Fixed Header',
    sidebarLogo: 'Sidebar Logo',
    dynamicTitle: 'Dynamic Title',
    save: 'Save Configuration',
    reset: 'Reset Configuration',
    loading: 'Saving to local, please wait...',
    loadingreset: 'Clearing settings cache and refreshing, please wait...',
  },
  user:{
    id: 'User ID',
    name: 'Username',
    nickname: 'Nickname',
    departement: 'Departement',
    phoneNumber: 'Cellphone Number',
    status: 'Status',
    creationtime: 'Creation Time',
    operate: 'Operate',
    DeptPlaceholder: 'Please input the departement name',
    UserPlaceholder: 'Please input username',
    PhonePlaceholder: 'Please input the phone number',
    statusPlaceholder: 'User status',
    nickPlaceholder: 'Please input nickname',
    emailPlaceholder: 'please input user\'s email',
    startDate: 'Start Date',
    endDate: 'End Date',
    email: 'Email',
    dept: 'Departement Field',
    deptPlaceholder: 'Please select a department',
    password: 'Password',
    PWPlaceholder: 'Please input user\'s password',
    gender: 'Gender',
    sex: 'Gender',
    choosePlaceholder: 'Please choose',
    post: 'Post',
    role: 'Role',
    remark: 'Remark',
    remarkPlaceholder: 'Please input content',
    dragUpload: 'Drag files here, or ',
    clickUpload: 'click to upload',
    updateAgree: ' Whether to update existing user data',
    fileFormat: 'Only xls, xlsx format files are allowed to be imported.',
    template: 'Download template',
    BasicInfo: 'Basic information',
    account: 'Login Account',
    RoleInfo: 'Role Information',
    serialRole: 'Serial Number',
    personalInfo: 'Personal information',
    userEmail: 'User\'s Email',
    departementName: 'Departement',
    roleGroup: 'Own Role',
    DateCreated: 'Date Created',
    BasicData: 'Basic Data',
    ChangePW: 'Change Password',
    male: 'Male',
    female: 'Female',
    nicknameRules: 'Nickname cannot be empty',
    emailRules: 'Email address cannot be empty',
    cemailRules: 'Please input the correct email address',
    phoneNumberRules: 'Phone number can not be empty',
    pnumberRules: 'Please input the correct phone number',
    oldPassword: 'Old Password',
    oldPWPlaceholder: 'Please input old password',
    newPassword: 'New Password',
    newPWPlaceholder: 'Please input a new password',
    cPWPlaceholder: 'Please confirm your password',
    oldPWRules: 'Old password cannot be empty',
    newPWRules: 'New password cannot be empty',
    newPWRules2: '5 to 20 characters long',
    cPWRules: 'confirm password cannot be empty',
    usernameRules: 'Username cannot be empty',
    usernameRules2: 'Username length must be between 4 and 16',
    passwordRules: 'User password cannot be empty',
    addUser: 'Add user',
    modifyUser: 'Modify User',
    userImport: 'User Import',
    confirmDelete1 : 'Are you sure to delete the data item with user ID " ',
    confirmDelete2 : ' "?',
    succesDeleted: 'Successfully Deleted',
    resetPW1: 'Please input a new password for " ',
    resetPW2: ' "',
    resetSucces: 'The modification is successful, the new password is: ',
    select: 'Select User',
    cellphone: 'cell phone',
    selectError: 'Please select a user to assign',
    handleStatus1: 'Are you sure you want " ',
    handleStatus2: ' " user?',

  },
  role:{
    id: 'Role ID',
    name: 'Role Name',
    RolePlaceholder: 'Please input role name',
    key: 'Role Key',
    KeyPlaceholder: 'Please input role key',
    statusPlaceholder: 'Role status',
    sort: 'Display Order',
    Content: "Authorization role key defined in the controller, such as: {'@'}PreAuthorize(`{'@'}ss.hasRole(\'admin\')`)",
    order: 'Role Order',
    menuPerms: 'menuPermissions',
    loading : 'Loading, please wait',
    scope : 'Scope of authority',
    nameRules: 'Role name cannot be empty',
    keyRules : 'Role key cannot be empty',
    sortRules : 'Role order cannot be empty',
    confirmDelete1 : 'Are you sure to delete the data item with role ID " ',
    confirmDelete2 : ' "?',
    dataScope1: 'Full data rights',
    dataScope2: 'Custom data permissions',
    dataScope3: 'Data permissions for this department',
    dataScope4: 'This department and the following data permissions',
    dataScope5: 'Only my data permission',
    handleStatus1: 'Are you sure you want to " ',
    handleStatus2: ' " role?',
    addRole: 'Add Role',
    modifyRole: 'Modify Role',
    dataperms: 'Assign data permissions',
    deauth: 'Bulk deauthorization',
    cancelauth: 'Cancel authorization',
    cancelConfirm1: 'Are you sure you want to cancel the role for " ',
    cancelConfirm2: ' " user?',
    cancelauthall: 'Do you want to uncheck the user authorization data item?',
  },
  menu:{
    frontPage: 'Front Page',
    main: 'Main Category',
    name: 'Menu Name',
    MenuPlaceholder: 'Please input a menu name',
    statusPlaceholder: 'Menu Status',
    icon: 'Icon',
    sort: 'Sort',
    authID: 'Authority ID',
    path: 'Component Path',
    parentMenu: 'Parent Menu',
    parentPlaceholder: 'Select parent menu',
    type: 'Menu Type',
    icon2: 'Menu Icon',
    icon2Placeholder: 'Select the click icon',
    menu: 'Menu',
    list: 'List',
    button: 'Button',
    displaySort: 'Display Sort',
    content1: 'If the selection is external link, the routing address needs to start with `http(s)://`',
    content2: 'The routing address of the access, such as: `user`, if the external network address needs internal link access, it starts with `http(s)://`',
    content3: 'Access component path, such as: `system/user/index`, default in the `views` directory',
    content4: "Permission characters defined in the controller, such as: {'@'}PreAuthorize(`{'@'}ss.hasPermi(\'system:user:list\')`)",
    content5: "The default passed parameters of the access route, such as: `{'{'}''id'': 1, ''name'': ''ry''{'}'}`",
    content6: 'If yes, it will be cached by `keep-alive`, and the `name` and address of the matching component need to be consistent',
    content7: 'Select Hide and the route will not appear in the sidebar, but will still be accessible',
    content8: 'Opt out and the route will not appear in the sidebar and cannot be accessed',
    external: 'Is it an external link?',
    route: 'Routing Address',
    routePlaceholder : 'Please input the routing address',
    yes: 'Yes',
    no: 'No',
    component: 'Component Path',
    componentPlaceholder : 'Please input the component path',
    permsPlaceholder : 'Please input a permission ID',
    paramPlaceholder : 'Please input routing parameters',
    param: 'Route Parameter',
    cached: 'Is it cached?',
    cache: 'cache',
    dontcache: 'do not cache',
    displayState: 'Display State',
    addMenu: 'Add Menu',
    modifyMenu: 'Modify Menu',
    nameRules: 'Menu name cannot be empty',
    orderRules: 'Menu order cannot be empty',
    routeRules: 'Routing address cannot be empty',
    confirmDelete1: 'Are you sure you want to delete the data item named " ',
    confirmDelete2: ' "?',

  },
  dept:{
    name: 'Department Name',
    statusPlaceholder: 'Department Status',
    higheroffice: 'Higher office',
    HOPlaceholder: 'Select a superior department',
    leader: 'Leader',
    leaderPlaceholder: 'Please input a leader name',
    contact: 'Contact Number',
    contactPlaceholder: 'Please input the contact number',
    HORules: 'The superior department cannot be empty',
    nameRules: 'Department name cannot be empty',
    sortRules: 'Display sort cannot be empty',
    addDept: 'Add Department',
    modifyDept: 'Modify Department',
  },
  post:{
    code: 'Post Code',
    codePlaceholder: 'Please input post code',
    codePlaceholder2: 'Please input code name',
    name: 'Post Name',
    postPlaceholder: 'Please input post title',
    statusPlaceholder: 'Post status',
    id: 'Post ID',
    sort: 'Post Order',
    sequence: 'Post Sequence',
    titleRules: 'Job title cannot be empty',
    addPost: 'Add Post',
    modifyPost: 'Modify Post',
    nameRules: 'Job title cannot be empty',
    codeRules: 'Job code cannot be empty',
    sortRules: 'Position order cannot be empty',
    confirmDelete: 'Are you sure to delete the data item with the post number " ',
  },
  notice:{
    title: 'Announcement Title',
    titlePlaceholder: 'Please input the announcement title',
    author:'Author',
    authorPlaceholder: 'Please input the author',
    type: 'Type',
    typePlaceholder: 'Announcement Type',
    author2: 'Author',
    content: 'Content',
    titleRules: 'Announcement title cannot be empty',
    typeRules: 'Announcement type cannot be empty',
    update: 'Amendment announcement',
    addNotice: 'Add announcement',
    confirmDelete: 'Are you sure to delete the data item with bulletin number " ',
  },
  dict: {
    name: "Dictionary Name",
    namePlaceholder: "Please enter a dictionary name",
    type: "Dictionary Type",
    typePlaceholder: "Please enter a dictionary type",
    status: "Dictionary status",
    id: "Dictionary Id",
    tag: "Dictionary tag",
    tagPlaceholder: "Please enter a dictionary",
    dataStatus: "Data status",
    code: "Dictionary code",
    value: "Dictionary value",
    sort: "Dictionary sort",
    addDictType: "Add dictionary type",
    modifyDictType: "Modify dictionary type",
    confirmDelete: "Are you sure to delete the data item whose dictionary number is '' ",
    refreshSuccess: "Refresh successfully",
    nameRules: "Dictionary name cannot be empty",
    typeRules: "Dictionary type cannot be empty",
    dataLabel: "Data label",
    dataValue: "Data value",
    dataLabelPlaceholder: "Please enter a data label",
    dataValuePlaceholder: "Please enter data key",
    styleAttribute: "Style attribute",
    styleAttributePlaceholder: "Please enter a style attribute",
    dictconfirmDelete: "Are you sure to delete the data item whose dictionary code is '' ",
    listClass: "List Class",
    modifyDictData: "Modify dictionary data",
    addDictData: "Add dictionary data",
    dataLabelRules: "Data label cannot be empty",
    dataValueRules: "Data value cannot be empty",
    sortRules: "Data order cannot be empty",
  },
  book:{
    title: 'Book Title',
    confirmDelete: 'Are you sure to delete the data item with book number " ',
    category: 'Book Category',
    titlePlaceholder: 'Please input a book title',
    categoryPlaceholder: 'Please input a book category',
    remarkPlaceholder:  'Please input a remark',
    addBook: 'Add Book',
    editBook: 'Edit Book',
    addLoan: 'Add Loan',
    editLoan: 'Edit Loan',
    addBookCategory: 'Add Book Category',
    editBookCategory: 'edit Book Category',
    isbn: 'ISBN',
    checkoutDate: 'Checkout Date',
    returnDate: 'Return Date',
    borrowerName: 'Borrower Name',
    categoryStatistic: 'Category Statistics',
    LoanStatistic: 'Loan Statistics',
    shelfLabels: 'Location',
    cdStatus: 'CD / No',
    synopsis: 'Synopsis',
    statistics: 'Statistics',
    isbnPlaceholder: 'Please input an ISBN',
    checkoutDatePlaceholder: 'Please input the borrowing date',
    returnDatePlaceholder: 'Please input the return date',
    borrowerRules: 'Borrower Name cannot be empty',
    bookTitleRules: 'Book Title cannot be empty',
    checkoutDateRules: 'Please pick a date',
    isbnRules: 'ISBN cannot be empty',
    isbnRules2: 'ISBN length must be between 14 and 17',
    isbnRules3: 'ISBN only can be number and "-"',
    bookCategoryRules: 'Book Category cannot be empty',
    authorRules: 'Author Name cannot be empty',
    shelfLabelsRules : 'Location cannot be empty',
    synopsisRules : 'Synopsis cannot be empty',
    languageRules : 'Language cannot be empty',
    categoryRules : 'Category cannot be empty',
    locationRules : 'Location cannot be empty',
    locationRules2 : 'Location length must be 6',
    
  },
  mbti:{
    result: 'MBTI Result',
    answer: 'Answer',
  },
  button:{
    add: 'Add',
    AddSuccess: 'Added successfully',
    AssignUser:'Assign User',
    Authorizationsucceeded: 'Authorization Succeeded',
    authRole: 'Assigning Roles',
    cancel: 'Cancel',
    cancelSuccess: 'Cancellation successful',
    clean: 'Clean',
    close: 'Close',
    closeall: 'Close All',
    closecurrent: 'Close Current',
    closeleft: 'Close Left',
    closeother: 'Close Other',
    closeright: 'Close Right',
    dataPerms:'Data Permission',
    delete: 'Delete',
    disable: 'Disable ',
    documentAddress: 'Document Address',
    edit: 'Edit',
    enable: 'Enable ',
    expand: 'Expand/Collapse',
    export: 'Export',
    hide: 'Hide',
    hideExtend:'Hide Extend',
    hideSearch: 'Hide Search',
    import: 'Import',
    ImportResults: 'Import Results',
    language : 'Language',
    logout: 'Are you sure you want to log out and log out of the system? ',
    NetworkError: 'Network Error',
    refresh: 'Refresh Page',
    RefreshCache: 'Refresh Cache',
    relation: 'Parent-Child relationship',
    reset: 'Reset',
    resetPW: 'Reset Password',
    return: 'Return',
    save: 'Save',
    search: 'Search',
    select : 'select all/select none',
    show: 'Show',
    showExtend: 'Show Extend',
    showhide: 'Show/Hide',
    showhideList: 'Show/Hide List',
    showSearch: 'Show Search',
    size: 'Layout Size',
    sourceAddress: 'Source Address',
    submit: 'OK',
    submit2: 'Submit',
    success: 'Success',
    successModify:'Successfully modified',
    iconSelectPlaceholder: 'Please enter an icon name',
    hasPermi: 'Please set the operation permission label value',
    hasRole: 'Please set the role permission label value',
    log: 'Log',
  },
  navbar: {
    personalCenter: 'Personal Center',
    layoutSettings: 'Layout Settings',
    signOut: 'Sign Out',
  },
  avatar: {
    uploadAvatar: 'Click to upload avatar',
    modifyAvatar: 'Modify Avatar',
    choose: 'Choose',
    error: 'The file format is incorrect, please upload the image type, such as: JPG, PNG suffixed files.',
  },
  upload: {
    tip1: 'Please upload',
    tip2: 'a file with size no larger than',
    tip3: ' in',
    tip4: 'format',
    selectFile: 'Select file',
    fileType1: 'The file format is incorrect, please upload a ',
    fileType2: ' format file!',
    fileSize: 'Upload file size cannot exceed ',
    loading: 'Please wait, uploading file...',
    handleExceed1: 'The number of uploaded files cannot exceed',
    handleExceed2: '!',
    uploadError: 'Failed to upload file',
    imageType1: 'The file format is incorrect, please upload ',
    imageType2: ' image format file!',
    avatarType: 'The size of the uploaded avatar image cannot exceed ',
    imageloading: 'Please wait, uploading image...',
    imageExceed1: 'The number of uploaded files cannot exceed ',
    imageExceed2: '!',
    imageFailed: 'Failed to upload image',
  },
  genTable: {
   generate : 'Generate',
   columnInformation: 'Column Information',
   columnName: 'Column Name',
   GenerateInfo: 'Generate Information',
   tableName: 'Table Name',
   tableNamePlaceholder: 'Please enter a table name',
   tableNamePlaceholder2: 'Please enter the warehouse name',
   tableComment: 'Table Description',
   columnType: 'Column Type',
   columnComment: 'Column Comment',
   javaType: 'Java Type',
   javaField: 'Java Field',
   isInsert: 'Insert',
   isEdit: 'Edit',
   isList: 'List',
   isQuery: 'Query',
   queryType: 'Query Type',
   isRequired: 'Required',
   generateTemplate: 'Generate Template',
   htmlType: 'Display Type',
   input: 'Input',
   textarea: 'Textarea',
   select: 'Select',
   radio: 'Radio',
   checkbox: 'Checkbox',
   datetime: 'Date Time',
   imageUpload: 'Image Upload',
   fileUpload: 'File Upload',
   editor: 'Rich Text Control',
   dictType: 'Dictionary type',
   crud: 'Single table (add, edit, delete, search)',
   tree: 'Tree table (add, edit, delete, search)',
   sub: 'Main sub-table (add, edit, delete, search)',
   packagePath: 'Generate Package Path',
   chartInfo: 'Chart Information',
   chartType: 'Chart Type',
   xAxisChart: 'Category',
   yAxisChart: 'Value',
   pleaseEnter: 'Please Enter',
   className: 'Entity Class Name',
   author: 'Author',
   descRules: 'Please enter a table description',
   entityRules: 'Please enter the name of the entity class',
   authorRules: 'Please enter the author',
   msgError: 'The form validation failed, please check the submitted content again',
   content1: 'Under which java package is generated, for example com.ruoyi.system',
   moduleName: 'Generate module name',
   content2: 'It can be understood as a subsystem name, such as system',
   businessName: 'Generate business name',
   content3: 'It can be understood as the English name of the function, such as user',
   genFunction: 'Generate Function Name',
   content4: 'Used as a class description, e.g. User',
   parentMenu: 'Parent Menu',
   content5: 'Assigned to a specific menu, e.g. System Administration',
   selectMenuPlaceholder: 'Please select the system menu',
   codeGen: 'Code Generation Method',
   content6: 'The default is to download the zip compressed package, and you can also customize the generation path',
   zip: 'ZIP Archive',
   customPath: 'Custom Path',
   content7: 'Fill in the absolute path of the disk, if not, it will be generated under the current web project',
   selectionPath: 'Quick selection of nearest path',
   basePath: 'Restore default build base path',
   otherInfo: 'Other Information',
   treeEncoding: 'Tree Encoding Field',
   content8: 'The encoded field name displayed by the tree, such as: dept_id',
   treeParentEncoding:'Tree Parent Encoding Field',
   content9: 'The parent code field name displayed by the tree, such as: parent_Id',
   treeNameField: 'Tree Name Field',
   content10: 'The display name field name of the tree node, such as: dept_name',
   associatedInformation: 'Associated information',
   associatedChildTable: 'The table name of the associated child table',
   content11: 'The table name of the associated subtable, such as: sys_user',
   foreignKey: 'The name of the foreign key associated with the child table',
   content12: 'The foreign key name associated with the child table, such as: user_id',
   rules1: 'Please select a template to generate',
   rules2: 'Please enter build package path',
   rules3: 'Please enter the generated module name',
   rules4: 'Please enter the generated business name',
   rules5: 'Please enter the generated function name',
   importTable: 'Import Table',
   updateTime: 'Update Time',
   msgImportTable: 'Please select a table to import',
   entity: 'Entity',
   preview: 'Preview',
   sync: 'Sync',
   genCode: 'Generate Code',
   msgErrorIndex: 'Please select the data to generate',
   codePreview: 'Code Preview',
   msgGenSuccess: 'Generated successfully to custom path: ',
   confirmSync1: 'Are you sure you want to force sync the " ',
   confirmSync2: ' " table structure?',
   syncSuccess: 'Sync Succeeded',
   copySuccess: 'Copy Successfully',
   confirmDelete1: 'Are you sure to delete the data item whose table number is " ',
   confirmDelete2: ' "？',
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
    401: '401 error!',
    h2401: 'You don\'t have access! ',
    h6401: 'Sorry, you don\'t have access rights, please don\'t do illegal operations! you can return to the main page',
    Home: 'Home',
    404: '404 error!',
    info404: 'Sorry, the page you\'re looking for doesn\'t exist. Try checking the URL for errors and pressing the refresh button on your browser or try to find something else in our app.',
    BacktoHome: 'Back to Home',
    Pagenotfound: 'Page not found!'
  },
  Cache: {
    redisVersion: 'Redis version',
    runMode: 'Run mode',
    standAlone: 'stand-alone',
    cluster: 'Cluster',
    port: 'Port',
    clients: 'Number of clients',
    runningTime: 'Running time (days)',
    memoryUsage: 'Memory Usage',
    CpuUsage: 'CPU Usage',
    memoryAllocation: 'Memory Allocation',
    AOF: 'Is AOF enabled?',
    RDB: 'Is the RDB successful?',
    Key: 'Number of Keys',
    network: 'Network entry/exit',
    commandStats: 'Command Statistics',
    memoInfo: 'Memory Information',
    loadingMessage: 'Loading cache monitoring data, please wait! ',
    order: 'Order',
    peak: 'Peak Value',
    memoUsage: 'Memory Usage',
    list: 'Cache List',
    name: 'Cache Name',
    key: 'List of Keys',
    content: 'Cache Content',
    CKey: 'Cache Key',
    clearAll: 'Clear All',
    refreshCache: 'Refresh the cache list successfully',
    clear1: 'Clean Cache Name [ ',
    clear2: ' ] Successfully',
    refreshKey: 'Refresh the key name list successfully',
    clearKey: 'Clear cache key name [ ',
    clearAllChaces: 'Cleared all caches successfully',
  },
  Job: {
    name: 'Task Name',
    namePlaceholder: 'Please enter a task name',
    groupName: 'Task Group Name',
    groupNamePlaceholder: 'Please select task group name',
    status: 'Task Status',
    statusPlaceholder: 'Please select task status',
    id: 'Task Number',
    callTarget: 'Call Target String',
    cron: 'cron Execution Expression',
    execute: 'Execute Once',
    details: 'Task Details',
    schedule: 'Scheduling Log',
    group: 'Task Group',
    callMethod: 'Call Method',
    beanCall: "Bean call example: ryTask.ryParams('ry')",
    classCall: "Class call example: com.ruoyi.quartz.task.RyTask.ryParams('ry')",
    paramDesc: 'Parameter description: support string type, Boolean type, long integer, floating type, integer type',
    callTargetPlaceholder: 'Please enter the calling target string',
    cronExpression: 'cron Expression',
    cronExpressionPlaceholder: 'Please enter the cron execution expression',
    generateExpression: 'Generate expression',
    executionStrategy: 'Execution Strategy',
    executeImmediately: 'Execute Immediately',
    executeOnce: 'Execute Once',
    abandonExecution: 'Abandon Execution',
    concurrent: 'Is it concurrent',
    allow: 'Allow',
    prohibit: 'Prohibit',
    nextExec: 'Next execution time: ',
    targetMethod: 'Call the target method: ',
    normal: 'Normal',
    fail: 'Fail',
    defaultPolicy: 'Default Policy',
    rules1: 'Task name cannot be empty',
    rules2: 'Call target string cannot be empty',
    rules3: 'cron execution expression cannot be empty',
    handleStatus: ' " task?',
    confirm1: 'Are you sure you want to execute the " ',
    confirm2: ' " task immediately?',
    executionSuccess: 'Execution Succeed',
    confirmDelete: 'Are you sure to delete the data item whose scheduled task number is " ',
    addTask: 'Add Task',
    modifyTask: 'Modify Task',
    ExecutionStatus: 'Execution Status',
    ExecutionStatusPlaceholder: 'Please select an execution status',
    ExecutionTime: 'Execution Time',
    LogId: 'Log Number',
    LogInfo: 'Log Information',
    detailed: 'Detailed',
    logDetails: 'Scheduling log details',
    logNumber: 'Log serial number: ',
    ExceptionInfo: 'Exception Information：',
    emptySuccess: 'Empty successfully',
    confirmLogDelete: 'Are you sure to delete the data item whose scheduling log number is " ',
    confirmClearLog: 'Are you sure to clear all scheduling log data items?',
  },
  loginInfor: {
    loginAddress: 'Login Address',
    loginAddressPlaceholder: 'Please enter the login address',
    loginStatus: 'Login Status',
    loginTime: 'Login Time',
    accessId: 'Access Number', 
    address: 'Address',
    loginLocation: 'Login Location',
    os: 'Operating System',
    browser: 'Browser',
    description: 'Description',
    interviewTime: 'Interview Time',
    confirmDelete: 'Are you sure to delete the data item whose access number is " ',
    confirmClean: 'Are you sure to clear all login log data items?',
  },
  online: {
    sessionNumber: 'Session Number',
    loginName: 'Login Name',
    host: 'Host',
    forceLogout: 'Force Logout',
    confirm1: 'Are you sure to force quit the user whose name is " ',
    confirm2: ' "?',
  },
  operLog: {
    systemModule: 'System Module',
    systemModulePlaceholder: 'Please enter the system module',
    operType: 'Operation Type',
    operStatus: 'Operating Status',
    operTime: 'Operating Time',
    reqMethod: 'Request Method',
    operDate: 'Operation Date',
    detailedOperLog: 'Detailed Operation Log',
    operationModule: 'Operation Module: ',
    loginInfo: 'Login Information：',
    reqAddress: 'Request Address: ',
    operMethod: 'Operation Method：',
    reqParams: 'Request Parameters：',
    returnParams: 'Return Parameters: ',
    confirmDelete: 'Are you sure to delete the data item whose log number is " ',
    confirmClean: 'Are you sure to clear all operation log data items?',
  },
  server: {
    attributes: 'Attributes',
    coreNumber: 'Number of cores',
    userUtilizationRate: 'User Utilization Rate',
    systemUsage: 'System Usage',
    currentAvailability: 'Current Availability',
    memory: 'Memory',
    memoryTotal: 'Total Memory',
    usedMemory: 'Used Memory',
    remainingMemory: 'Remaining Memory',
    utilizationRate: 'Utilization Rate',
    serverInfo: 'Server Information',
    serverName: 'Server Name',
    serverIP: 'Server IP',
    systemStructure: 'System Structure',
    JVMInfo: 'Java Virtual Machine Information',
    javaName: 'Java Name',
    javaVersion: 'Java Version',
    startTime: 'Start Time',
    runTime: 'Run Time',
    installationPath: 'Installation Path',
    projectPath: 'Project Path',
    operatingParameters: 'Operating Parameters',
    diskStatus: 'Disk Status',
    drivePath: 'Drive Path',
    fileSystem: 'File System',
    driveType: 'Drive Type',
    totalSize: 'Total Size',
    availableSize: 'Available Size',
    usedSize: 'Used Size',
    precentageUsed: 'Percentage Used',
    loading: 'Loading service monitoring data, please wait!',
  },
  SysLang : {
    zhCn : "Chinese Language i18n",
    zhCnPlaceholder : "Please input Chinese Language i18n",
    enUs : "English i18n",
    enUsPlaceholder : "Please input English i18n",
    idId : "Indonesian i18n",
    idIdPlaceholder : "Please input Indonesian i18n",
    langIdx : "Primary Key",
    langIdxPlaceholder : "Please input the Primary Key",
    langKey : "Language Key",
    langKeyPlaceholder : "Please input the Language Key",
    langTb : "Table Name",
    langTbPlaceholder : "Please input the Table Name",
    langFn : "Field Name",
    langFnPlaceholder : "Please input the Field Name",
    modifyI18n: 'Modify i18n Lang',
    cleanRecord: 'Are you sure to clear all i18n record data items?',
    confirmDeleteRecord1: 'Are you sure to delete the data item whose lang number is " ',
    confirmDeleteRecord2: ' " ? ',
  }
}
