// en.js
export default {
  components: {
    sizeSelect: {
      setSize: 'Setting layout size, please wait...',
      sizeLarge: 'Large',
      sizeDefault: 'Default',
      sizeSmall: 'Small'
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
    title: 'Ruoyi background management system',
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
    systemhint: 'System Hint',
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
    Content: 'Authorization role key defined in the controller, such as: @PreAuthorize(`@ss.hasRole(\'admin\')`)',
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
    cancelConfirm2: ' " user？',
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
    content4: 'Permission characters defined in the controller, such as: @PreAuthorize(`@ss.hasPermi(\'system:user:list\')`)',
    content5: 'The default passed parameters of the access route, such as: `{"id": 1, "name": "ry"}`',
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
    ExpiredMessage: 'Your login status has expired, you can stay on this page or log in again',
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
    ReRegister: 'Re-register',
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
    successModify:'Successfully modified'
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

  uploadImage: {
    tip1: 'Please upload',
    tip2: 'a file with size no larger than',
    tip3: ' in',
    tip4: 'format',
  },
  genTable: {
   generate : 'Generate',
   columnInformation: 'Column Information',
   columnName: 'Column Name',
   GenerateInfo: 'Generate Information',
   tableName: 'Table Name',
   tableNamePlaceholder: 'Please enter a table name',
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
 }
}