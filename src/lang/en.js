// en.js
export default {
  login: {
    title: 'RuoYi Login Form',
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
  button:{
    search: 'Search',
    reset: 'Reset',
    add: 'Add',
    edit: 'Edit',
    delete: 'Delete',
    import: 'Import',
    export: 'Export',
    expand: 'Expand/Collapse',
    RefreshCache: 'Refresh Cache',
    clean: 'Clean',
    resetPW: 'Reset Password',
    authRole: 'Assigning Roles',
    submit: 'OK',
    submit2: 'Submit',
    cancel: 'Cancel',
    return: 'Return',
    dataPerms:'Data Permission',
    AssignUser:'Assign User',
    select : 'select all/select none',
    relation: 'Parent-Child relationship',
    save: 'Save',
    close: 'Close',
    successModify:'Successfully modified',
    AddSuccess: 'Added successfully',
    ImportResults: 'Import Results',
    Authorizationsucceeded: 'Authorization Succeeded',
    enable: 'Enable ',
    disable: 'Disable ',
    success: 'Success',
    cancelSuccess: 'Cancellation successful',
    hideSearch: 'Hide Search',
    showSearch: 'Show Search',
    showhideList: 'Show/Hide List',
    show: 'Show',
    hide: 'Hide',
    showhide: 'Show/Hide',
    refresh: 'Refresh Page',
    closecurrent: 'Close Current',
    closeother: 'Close Other',
    closeleft: 'Close Left',
    closeright: 'Close Right',
    closeall: 'Close All',
    sourceAddress: 'Source Address',
    documentAddress: 'Document Address',
    size: 'Layout Size',
    logout: 'Are you sure you want to log out and log out of the system? ',
    language : 'Language',
    NetworkError: 'Network Error',
    ExpiredMessage: 'Your login status has expired, you can stay on this page or log in again',
    ReRegister: 'Re-register',
 
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


}