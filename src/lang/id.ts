/**
 * Language: bahasa indonesia
 * Naming format: first letter lowercase camel case || 命名格式：首字母小写驼峰命名
 * Keystyle": "nested" || 翻译路径：嵌套模式 
 * Sample：components.sizeSelect.setSize => { path：components, filename: sizeSelect, key: setSize };
 */
export default {
   // ()=> DELETE el{} when ENV. ;  
   // fix: i18n-ally error, (copy from element-plus i18n ) ;
   el: {
    colorpicker: {
      confirm: "Pilih",
      clear: "Kosongkan"
    },
    datepicker: {
      now: "Sekarang",
      today: "Hari ini",
      cancel: "Batal",
      clear: "Kosongkan",
      confirm: "Ya",
      selectDate: "Pilih tanggal",
      selectTime: "Pilih waktu",
      startDate: "Tanggal Mulai",
      startTime: "Waktu Mulai",
      endDate: "Tanggal Selesai",
      endTime: "Waktu Selesai",
      prevYear: "Tahun Sebelumnya",
      nextYear: "Tahun Selanjutnya",
      prevMonth: "Bulan Sebelumnya",
      nextMonth: "Bulan Selanjutnya",
      year: "Tahun",
      month1: "Januari",
      month2: "Februari",
      month3: "Maret",
      month4: "April",
      month5: "Mei",
      month6: "Juni",
      month7: "Juli",
      month8: "Agustus",
      month9: "September",
      month10: "Oktober",
      month11: "November",
      month12: "Desember",
      week: "Minggu",
      weeks: {
        sun: "Min",
        mon: "Sen",
        tue: "Sel",
        wed: "Rab",
        thu: "Kam",
        fri: "Jum",
        sat: "Sab"
      },
      months: {
        jan: "Jan",
        feb: "Feb",
        mar: "Mar",
        apr: "Apr",
        may: "Mei",
        jun: "Jun",
        jul: "Jul",
        aug: "Agu",
        sep: "Sep",
        oct: "Okt",
        nov: "Nov",
        dec: "Des"
      }
    },
    select: {
      loading: "Memuat",
      noMatch: "Tidak ada data yg cocok",
      noData: "Tidak ada data",
      placeholder: "Pilih"
    },
    cascader: {
      noMatch: "Tidak ada data yg cocok",
      loading: "Memuat",
      placeholder: "Pilih",
      noData: "Tidak ada data"
    },
    pagination: {
      goto: "Pergi ke",
      pagesize: "/halaman",
      total: "Total {total}",
      pageClassifier: "",
      deprecationWarning: "Penggunaan yang tidak akan digunakan lagi terdeteksi, silakan lihat dokumentasi el-pagination untuk lebih jelasnya"
    },
    messagebox: {
      title: "Pesan",
      confirm: "Ya",
      cancel: "Batal",
      error: "Masukan ilegal"
    },
    upload: {
      deleteTip: "Tekan hapus untuk melanjutkan",
      delete: "Hapus",
      preview: "Pratinjau",
      continue: "Lanjutkan"
    },
    table: {
      emptyText: "Tidak ada data",
      confirmFilter: "Konfirmasi",
      resetFilter: "Atur ulang",
      clearFilter: "Semua",
      sumText: "Jumlah"
    },
    tree: {
      emptyText: "Tidak ada data"
    },
    transfer: {
      noMatch: "Tidak ada data yg cocok",
      noData: "Tidak ada data",
      titles: ["Daftar 1", "Daftar 2"],
      filterPlaceholder: "Masukan kata kunci",
      noCheckedFormat: "{total} item",
      hasCheckedFormat: "{checked}/{total} terpilih"
    },
    image: {
      error: "GAGAL"
    },
    pageHeader: {
      title: "Kembali"
    },
    popconfirm: {
      confirmButtonText: "Ya",
      cancelButtonText: "Tidak"
    }
  },


// eelic-i18n setting  
  components: {
    sizeSelect: {
      setSize: "Setel ukuran, harap menunggu...",
      sizeLarge: "Besar",
      sizeDefault: 'Default',
      sizeSmall: 'Kecil'
    }, 
    topNav:{
      moreMenu:  'Menu More'
    }
  },
  utils: {
    errorCode: {
      err401: 'Otentikasi gagal, tidak dapat mengakses sumber daya sistem!',
      err403: 'Operasi saat ini tidak memiliki izin!',
      err404: 'Sumber daya akses tidak ada',
      errDefault: 'Kesalahan sistem tidak diketahui, harap umpan balik ke administrator!'
    },
    request: {
      msgReSubmit: 'Data sedang diproses, mohon jangan kirim ulang!',
      err401Session: 'Sesi tidak valid, atau sesi telah kedaluwarsa, silakan masuk lagi.',
      errNetwork: 'Kesalahan Jaringan',
      errSysTimeOut: 'Batas waktu permintaan antarmuka sistem',
      errSysInterface: 'Antarmuka Sistem',
      errException: 'abnormal',
      msgDownload: 'Mengunduh data, harap tunggu...',
      errDownload: 'Terjadi kesalahan saat mengunduh file, harap hubungi administrator!',
      msgExpired: 'Status login Anda telah kedaluwarsa, Anda dapat tetap berada di halaman ini atau login lagi', 
      msgSysHint: 'Petunjuk Sistem', 
      btnReLogin: 'Login ulang',
    }    
  },

  login: {
    title: 'EELIC SYSTEM',
    logIn: 'Masuk',
    username: 'Nama pengguna',
    password: 'Kata sandi',
    captcha: 'Kode verifikasi',
    rememberpsw: 'Ingat kata Sandi',
    signupnow: 'Mendaftar sekarang',
    logloading:'Memuat...',
    setlanguage: 'Setel bahasa berhasil',
    enterUsername: 'Masukkan nama pengguna Anda',
    enterPassword: 'Masukkan kata sandi Anda',
    enterCaptcha: 'Masukkan kode verifikasi',
    usernameError: 'Username Error',
    passwordError: 'Password Error',
  },
  register: {
    title: 'Sistem EELIC',
    confirmPassword: 'Konfirmasi Kata Sandi',
    Register: 'Daftar',
    login: 'Masuk dengan akun yang sudah ada',
    registering: 'Mendaftar ...',
    usernamelength: 'Panjang nama pengguna harus 4 dan 16',
    usernamePattern: 'Nama pengguna hanya boleh a-zA-Z0-9_-',
    usernamePattern2: 'Karakter pertama harus berupa huruf',
    passwordlength: 'Panjang kata sandi harus antara 5 dan 20',
    enterConfirmPassword: 'Masukkan kata sandi Anda lagi',
    passwordDontMatch: 'Kata sandi tidak cocok',
    verificationCode: 'Kode verifikasi harus berupa angka',
    congratulations: 'Selamat, akun anda',
    success: 'registrasi berhasil!',

  },
  tagsView: {
    refresh: 'Menyegarkan',
    close: 'Menutup',
    closeOthers: 'Tutup Lainnya',
    closeAll: 'Tutup semua'
  },
  settings: {
    title: 'Pengaturan gaya tema',
    theme: 'Warna Tema',
    icon: 'icon: check',
    loginImage:'Image Login',    
    config: 'Konfigurasi Tata Letak Sistem',
    topNav: 'Buka TopNav',
    tagsView: 'Buka Tag-Tampilan',
    fixedHeader: 'Tajuk Tetap',
    sidebarLogo: 'Logo Bilah Samping',
    dynamicTitle: 'Judul Dinamis',
    save: 'Simpan Konfigurasi',
    reset: 'Atur Ulang Konfigurasi',
    loading: 'Menyimpan ke lokal, harap tunggu...',
    loadingreset: 'Menghapus cache pengaturan dan menyegarkan, harap tunggu...',
  },
  user:{
    id: 'ID Pengguna',
    name: 'Nama Pengguna',
    nickname: 'Nama Panggilan',
    departement: 'Departemen',
    phoneNumber: 'Nomor HP',
    status: 'Status',
    creationtime: 'Waktu Pembuatan',
    operate: 'Operasi',
    DeptPlaceholder: 'Silahkan masukkan nama departemen',
    UserPlaceholder: 'Silahkan masukkan nama pengguna',
    PhonePlaceholder: 'Silahkan masukkan Nomor HP',
    statusPlaceholder: 'Status pengguna',
    nickPlaceholder: 'Silahkan masukkan nama panggilan pengguna',
    emailPlaceholder: 'Silahkan masukkan email pengguna',
    startDate: 'Mulai tanggal',
    endDate: 'Sampai tanggal',
    email: 'Email',
    dept: 'Bidang Departemen',
    deptPlaceholder: 'Silahkan pilih departemen',
    password: 'Kata sandi',
    PWPlaceholder: 'Silahkan masukkan kata sandi pengguna',
    gender: 'Jenis kelamin',
    sex: 'Jenis kelamin',
    choosePlaceholder: 'Silahkan Pilih',
    post: 'Jabatan',
    role: 'Peran',
    remark: 'Catatan',
    remarkPlaceholder: 'Silakan masukkan komentar',
    dragUpload: 'Seret file ke sini, atau ',
    clickUpload: 'klik untuk mengunggah',
    updateAgree: ' Memperbarui data pengguna yang ada',
    fileFormat: 'Hanya file berformat xls, xlsx yang boleh diimpor. ',
    template: 'Unduh template',
    BasicInfo: 'Informasi Dasar',
    account: 'Nama Akun',
    RoleInfo: 'Informasi Peran',
    serialRole: 'Nomor Seri',
    personalInfo: 'Informasi Pribadi',
    userEmail: 'Email Pengguna',
    departementName: 'Departemen',
    roleGroup: 'Peran',
    DateCreated: 'Tanggal Dibuat',
    BasicData: 'Data Dasar',
    ChangePW: 'Ganti Kata Sandi',
    male: 'Laki-laki',
    female: 'Perempuan',
    nicknameRules:'Nama panggilan tidak boleh kosong',
    emailRules: 'Alamat email tidak boleh kosong',
    cemailRules: 'Silakan masukkan alamat email yang benar',
    phoneNumberRules: 'Nomor telepon wajib diisi',
    pnumberRules: 'Please enter the correct phone number',
    oldPassword: 'Kata Sandi Lama',
    oldPWPlaceholder: 'Silakan masukkan kata sandi lama',
    newPassword: 'Kata Sandi Baru',
    newPWPlaceholder: 'Silakan masukkan kata sandi baru',
    cPWPlaceholder: 'Harap konfirmasi kata sandi Anda',
    oldPWRules: 'Kata sandi lama tidak boleh kosong',
    newPWRules: 'Kata sandi baru tidak boleh kosong',
    newPWRules2: 'Panjang 5 hingga 20 karakter',
    cPWRules: 'konfirmasi kata sandi tidak boleh kosong',
    usernameRules: 'Nama pengguna tidak boleh kosong',
    usernameRules2: 'Panjang nama pengguna harus antara 4 dan 16',
    passwordRules: 'Kata sandi pengguna tidak boleh kosong',
    addUser: 'Tambahkan pengguna',
    modifyUser: 'Ubah Pengguna',
    userImport: 'Impor Pengguna',
    confirmDelete1 : 'Apakah Anda yakin akan menghapus item data dengan ID pengguna " ',
    confirmDelete2 : ' "?',
    succesDeleted: 'Berhasil Dihapus',
    resetPW1: 'Silakan masukkan kata sandi baru untuk " ',
    resetPW2: ' "',
    resetSucces: 'Modifikasi berhasil, kata sandi baru adalah: ',
    select: 'Pilih Pengguna',
    cellphone: 'Telepon Selular',
    selectError: 'Silakan pilih pengguna untuk ditetapkan',
    handleStatus1: 'Apakah Anda yakin ingin "' ,
    handleStatus2: ' " ?',
 
  },
  role:{
    id: 'ID Peran',
    name: 'Nama Peran',
    RolePlaceholder: 'Silahkan masukkan nama peran',
    key: 'Kode Peran',
    KeyPlaceholder: 'Silahkan masukkan kode peran',
    statusPlaceholder: 'Status peran',
    sort: 'Urutan Tampilan',
    Content: "Kunci peran otorisasi didefinisikan di controller, seperti: {'@'}PreAuthorize(`{'@'}ss.hasRole(\'admin\')`)",
    order: 'Urutan Peran',
    menuPerms: 'Akses Menu',
    loading : 'Sedang memuat, harap tunggu',
    scope : 'Lingkup kewenangan',
    nameRules: 'Nama peran tidak boleh kosong',
    keyRules : 'Kode peran tidak boleh kosong',
    sortRules : 'Urutan peran tidak boleh kosong',
    confirmDelete1 : 'Apakah Anda yakin akan menghapus item data dengan ID peran " ',
    confirmDelete2 : ' "?',
    dataScope1: 'Hak data penuh',
    dataScope2: 'Izin data khusus',
    dataScope3: 'Izin data untuk departemen ini',
    dataScope4: 'Departemen ini dan izin data berikut',
    dataScope5: 'Hanya izin data saya',
    handleStatus1: 'Apakah Anda yakin ingin " ',
    handleStatus2: ' "?',
    addRole: 'Tambahkan Peran',
    modifyRole: 'Ubah Peran',
    dataperms: 'Tetapkan izin data',
    deauth: 'Deotorisasi massal',
    cancelauth: 'Batalkan otorisasi',
    cancelSuccess: 'Pembatalan otorisasi berhasil',
    cancelConfirm1: 'Apakah Anda yakin ingin membatalkan peran untuk pengguna " ',
    cancelConfirm2: ' " ？',
    cancelauthall: 'Hapus centang item Data Otorisasi Pengguna?',
  },
  menu:{
    frontPage: 'Halaman Depan',
    main: 'Kategori Utama',
    name: 'Nama Menu',
    MenuPlaceholder: 'Silakan masukkan nama menu',
    statusPlaceholder: 'Status Menu',
    icon: 'Ikon',
    sort: 'Urutan',
    authID: 'ID Otoritas',
    path: 'jalur komponen',
    parentMenu: 'Menu Parent',
    parentPlaceholder: 'Pilih menu parent',
    type: 'Jenis Menu',
    icon2: 'Ikon Menu',
    icon2Placeholder: 'Pilih ikon',
    menu: 'Menu',
    list: 'Daftar',
    button: 'Tombol',
    displaySort: 'Urutan Tampilan',
    content1: 'Jika pilihannya adalah tautan eksternal, alamat perutean harus dimulai dengan `http(s)://`',
    content2: 'Alamat perutean akses, seperti: `user`, jika alamat jaringan eksternal memerlukan akses tautan internal, itu dimulai dengan `http(s)://`',
    content3: 'Akses jalur komponen, seperti: `system/user/index`, default di direktori `views`',
    content4: "Karakter izin yang ditentukan dalam pengontrol, seperti: {'@'}PreAuthorize(`{'@'}ss.hasPermi(\'system:user:list\')`)",
    content5: "Parameter default yang diteruskan dari rute akses, seperti: `{'{'}''id'': 1, ''name'': ''ry''{'}'}`",
    content6: 'Jika ya, itu akan di-cache oleh `keep-alive`, dan `name` serta alamat komponen yang cocok harus konsisten',
    content7: 'Pilih Sembunyikan dan rute tidak akan muncul di bilah sisi, tetapi tetap dapat diakses',
    content8: 'Memilih keluar dan rute tidak akan muncul di bilah sisi dan tidak dapat diakses',
    external : 'Apakah ini tautan eksternal?',
    route: 'Alamat Rute',
    routePlaceholder : 'Silakan masukkan alamat rute',
    yes: 'Ya',
    no: 'Tidak',
    component: 'Jalur Komponen',
    componentPlaceholder : 'Silakan masukkan jalur komponen',
    permsPlaceholder : 'Silakan masukkan ID akses',
    paramPlaceholder : 'Silakan masukkan parameter rute',
    param: 'Parameter Rute',
    cached: 'Apakah ini di-cache?',
    cache: 'cache',
    dontcache: 'jangan di-cache',
    displayState: 'Status tampilan',
    addMenu: 'Tambah Menu',
    modifyMenu: 'Ubah Menu',
    nameRules: 'Nama menu tidak boleh kosong',
    orderRules: 'Urutan menu tidak boleh kosong',
    routeRules: 'Alamat rute tidak boleh kosong',
    confirmDelete1: 'Apakah Anda yakin ingin menghapus item data bernama " ',
    confirmDelete2: ' "?',


  },
  dept:{
    name: 'Nama Departemen',
    statusPlaceholder: 'Status Departemen',
    higheroffice: 'Departemen Atasan',
    HOPlaceholder: 'Pilih departemen atasan',
    leader: 'Kepala',
    leaderPlaceholder: 'Silakan masukkan nama kepala',
    contact: 'Nomor Kontak',
    contactPlaceholder: 'Silahkan masukan nomor kontak',
    HORules: 'Departemen superior tidak boleh kosong',
    nameRules: 'Nama departemen tidak boleh kosong',
    sortRules: 'Urutan tampilan tidak boleh kosong',
    addDept: 'Tambahkan Departemen',
    modifyDept: 'Ubah Departemen',
  },
  post:{
    code: 'Kode Jabatan',
    codePlaceholder: 'Silakan masukkan kode jabatan',
    codePlaceholder2: 'Silakan masukkan nama kode',
    name: 'Nama Jabatan',
    postPlaceholder: 'Silakan masukkan nama jabatan',
    statusPlaceholder: 'Silakan masukkan status jabatan',
    id: 'ID Jabatan',
    sort: 'Urutan Jabatan',
    sequence: 'Urutan Jabatan',
    titleRules: 'Jabatan tidak boleh kosong',
    addPost: 'Tambahkan Jabatan',
    modifyPost: 'Ubah Jabatan',
    nameRules: 'Nama Jabatan tidak boleh kosong',
    codeRules: 'Kode pekerjaan tidak boleh kosong',
    sortRules: 'Urutan jabatan tidak boleh kosong',
    confirmDelete: 'Apakah Anda yakin akan menghapus item data dengan nomor jabatan " ',

  },
  notice:{
    title: 'Judul Pengumuman',
    titlePlaceholder: 'Silakan masukkan judul pengumuman',
    author:'Penulis',
    authorPlaceholder: 'Silahkan masukan penulisnya',
    type: 'Jenis',
    typePlaceholder: 'Jenis Pengumuman',
    author2: 'Penulis',
    content: 'Isi',
    titleRules: 'Judul pengumuman tidak boleh kosong',
    typeRules: 'Jenis pengumuman tidak boleh kosong',
    update: 'Pengumuman amandemen',
    addNotice: 'Tambahkan pengumuman',
    confirmDelete: 'Apakah Anda yakin akan menghapus item data dengan nomor buletin " ',
  },
  dict: {
    name: "Nama Kamus",
    namePlaceholder: "Masukkan nama kamus",
    type: "Jenis Kamus",
    typePlaceholder: "Masukkan jenis kamus",
    status: "Status kamus",
    id: "Nomor kamus",
    tag: "Tag kamus",
    tagPlaceholder: "Masukkan tag kamus",
    dataStatus: "Status data",
    code: "Kode kamus",
    value: "Nilai kamus",
    sort: "Urutan kamus",
    addDictType: "Tambahkan jenis kamus",
    modifyDictType: "Ubah jenis kamus",
    confirmDelete: "Apakah Anda yakin akan menghapus item data yang nomor kamusnya adalah '' ",
    refreshSuccess: "Berhasil menyegarkan",
    nameRules: "Nama kamus tidak boleh kosong",
    typeRules: "Jenis kamus tidak boleh kosong",
    dataLabel: "Label data",
    dataValue: "Nilai data",
    dataLabelPlaceholder: "Silahkan masukkan label data",
    dataValuePlaceholder: "Silakan masukkan nilai data",
    styleAttribute: "Atribut gaya",
    styleAttributePlaceholder: "Silahkan masukkan atribut gaya",
    dictconfirmDelete: "Apakah Anda yakin akan menghapus item data yang kode kamusnya adalah '' ",
    listClass: "Daftar Class",
    modifyDictData: "Ubah data kamus",
    addDictData: "Tambahkan data kamus",
    dataLabelRules: "Label data tidak boleh kosong",
    dataValueRules: "Nilai data tidak boleh kosong",
    sortRules: "Urutan data tidak boleh kosong",
  },
  book:{
    title: 'Judul Buku',
    confirmDelete: 'Apakah Anda yakin akan menghapus item data dengan nomor buku " ',
    category: 'Kategori Buku',
    titlePlaceholder: 'Silahkan masukkan judul buku',
    categoryPlaceholder: 'Silahkan masukkan kategori buku',
    remarkPlaceholder:  'Silakan masukkan catatan',
    addBook: 'Tambahkan Buku',
    editBook: 'Ubah Buku',
    addLoan: 'Tambahkan Pinjaman',
    editLoan: 'Ubah Pinjaman',
    addBookCategory: 'Tambahkan Kategori Buku',
    editBookCategory: 'Ubah Kategori Buku',
    isbn: 'ISBN',
    checkoutDate: 'Tanggal Peminjaman',
    returnDate: 'Return Date',
    borrowerName: 'Nama Peminjam',
    categoryStatistic: 'Statistik Kategori',
    LoanStatistic: 'Statistik Pinjaman',
    shelfLabels: 'Lokasi',
    cdStatus: 'CD / Tidak',
    synopsis: 'Sinopsis',
    statistics: 'Statistik',
    isbnPlaceholder: 'Silahkan masukkan ISBN',
    checkoutDatePlaceholder: 'Silahkan masukkan tanggal peminjamanan',
    returnDatePlaceholder: 'Please input the return date',
    borrowerRules: 'Nama Peminjam tidak boleh kosong',
    bookTitleRules: 'Judul Buku tidak boleh kosong',
    checkoutDateRules: 'Silakan pilih tanggal',
    isbnRules: 'ISBN tidak boleh kosong',
    isbnRules2: 'Panjang ISBN harus antara 14 hingga 17',
    isbnRules3: 'ISBN hanya dapat berupa angka dan "-"',
    bookCategoryRules: 'Kategory buku tidak boleh kosong',
    authorRules: 'Nama penulis tidak boleh kosong',
    shelfLabelsRules : 'Lokasi tidak boleh kosong',
    synopsisRules : 'Sinopsis tidak boleh kosong',
    languageRules : 'Bahasa tidak boleh kosong',
    categoryRules : 'Kategori tidak boleh kosong',
    locationRules : 'Lokasi tidak boleh kosong',
    locationRules2 : 'Panjang lokasi harus 6',

  },
  mbti:{
    result: 'Hasil MBTI',
    answer: 'Jawaban',
  },
  button:{
    add: 'Tambah',
    AddSuccess: 'Berhasil ditambahkan',
    AssignUser:'Atur Pengguna',
    Authorizationsucceeded: 'Otorisasi Berhasil',
    authRole: 'Atur Peran',
    cancel: 'Batal',
    clean: 'Bersihkan',
    close: 'Tutup',
    closeall: 'Tutup Semua',
    closecurrent: 'Tutup ini',
    closeleft: 'Tutup Sebelah Kiri',
    closeother: 'Tutup Lainnya',
    closeright: 'Tutup Sebelah Kanan',
    dataPerms:'Akses Data',
    delete: 'Hapus',
    disable: ' Nonaktifkan',
    documentAddress: 'Alamat Dokumen',
    edit: 'Edit',
    enable: ' Aktifkan',
    expand: 'Perluas/Ciutkan',
    export: 'Ekspor',
    hide: 'Sembunyikan',
    hideExtend:'Tamplikan Extra',
    hideSearch: 'Sembunyikan Pencarian',
    import: 'Impor',
    ImportResults: 'Hasil Impor',
    language : 'Bahasa',
    logout: 'Apakah Anda yakin ingin keluar dan keluar dari sistem? ',
    NetworkError: 'Kesalahan Jaringan',
    refresh: 'Segarkan Halaman',
    RefreshCache: 'Segarkan Cache',
    relation: 'Hubungan Parent-Child',
    reset: 'Atur Ulang',
    resetPW: 'Setel Ulang Kata Sandi',
    return: 'kembali',
    save: 'Simpan',
    search: 'Cari',
    select : 'pilih semua / tidak pilih',
    show: 'Tamplikan',
    showExtend: 'Sembunyikan Extra',
    showhide: 'Tampilkan/Sembunyikan',
    showhideList: 'Tampilkan/Sembunyikan Tabel',
    showSearch: 'Tamplikan Pencarian',
    size: 'Ukuran Huruf',
    sourceAddress: 'Alamat Sumber',
    submit: 'OK',
    submit2: 'Kirim',
    success: 'Berhasil',
    successModify:'Berhasil diubah',
    iconSelectPlaceholder: 'Masukkan nama ikon',
    hasPermi: 'Harap tetapkan nilai label izin operasi',
    hasRole: 'Harap tetapkan nilai label izin peran',
    log: 'Log',
  },
  navbar: {
    personalCenter: 'Pusat Pribadi',
    layoutSettings: 'Pengaturan Tampilan',
    signOut: 'Keluar',
  },
  avatar: {
    uploadAvatar: 'Klik untuk mengunggah avatar',
    modifyAvatar: 'Ubah avatar',
    choose: 'Pilih',
    error: 'Format file salah, harap unggah jenis gambar, seperti: JPG, file akhiran PNG.',
  },
  upload: {
    tip1: 'Ukuran',
    tip2: 'file tidak boleh lebih dari',
    tip3: ' dan harus dalam format',
    tip4: '',
    selectFile: 'Pilih file',
    fileType1: 'Format file salah, harap unggah file berformat ',
    fileType2: '!',
    fileSize: 'Ukuran file unggahan tidak boleh melebihi ',
    loading: 'Harap tunggu, sedang mengunggah file...',
    handleExceed1: 'Jumlah file yang diunggah tidak boleh lebih dari',
    handleExceed2: '!',
    uploadError: 'Gagal mengunggah file',
    imageType1: 'Format file salah, harap unggah file format gambar ',
    imageType2: '!',
    avatarType: 'Ukuran gambar avatar yang diunggah tidak boleh melebihi ',
    imageloading: 'Harap tunggu, mengunggah gambar...',
    imageExceed1: 'Jumlah file yang diunggah tidak boleh lebih dari ',
    imageExceed2: '!',
    imageFailed: 'Gagal mengunggah gambar',
  },
  genTable: {
   generate : 'Hasilkan',
   columnInformation: 'Kolom Informasi',
   columnName: 'Nama Kolom',
   GenerateInfo: 'Informasi Generate ',
   tableName: 'Nama Tabel',
   tableNamePlaceholder: 'Silakan masukkan nama tabel',
   tableComment: 'Deskripsi Tabel',
   columnType: 'Tipe Kolom',
   columnComment: 'Kolom Komentar',
   javaType: 'Tipe Java',
   javaField: 'Java Field',
   isInsert: 'Insert',
   isEdit: 'Edit',
   isList: 'List',
   isQuery: 'Query',
   queryType: 'Tipe Query',
   isRequired: 'Wajib',
   generateTemplate: 'Buat Template',
   htmlType: 'Tipe Tampilan',
   input: 'Input',
   textarea: 'Textarea',
   select: 'Select',
   radio: 'Radio',
   checkbox: 'Checkbox',
   datetime: 'Date Time',
   imageUpload: 'Image Upload',
   fileUpload: 'File Upload',
   editor: 'Rich Text Control',
   dictType: 'Tipe kamus',
   crud: 'Single table (add, edit, delete, search)',
   tree: 'Tree table (add, edit, delete, search)',
   sub: 'Main sub-table (add, edit, delete, search)',
   packagePath: 'Generate Package Path',
   chartInfo: 'Informasi Chart',
   chartType: 'Tipe Chart',
   xAxisChart: 'Kategori',
   yAxisChart: 'Nilai',
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
    401: 'Kesalahan 401!',
    h2401: 'Anda tidak punya hak akses! ',
    h6401: 'Maaf, Anda tidak memiliki hak akses, tolong jangan melakukan operasi ilegal! Anda dapat kembali ke halaman utama',
    Home: 'Beranda',
    404: 'Kesalahan 404!',
    info404: 'Mohon maaf, halaman yang Anda cari tidak ada. Coba periksa URL apakah ada kesalahan, lalu tekan tombol segarkan di browser Anda atau coba temukan yang lain di aplikasi kami.',
    BacktoHome: 'Kembali ke Beranda',
    Pagenotfound: 'Halaman tidak ditemukan!'
  },
  Cache: {
    redisVersion: 'Versi Redis',
    runMode: 'Mode Jalankan',
    standAlone: 'Berdiri Sendiri',
    cluster: 'Kelompok',
    port: 'Port',
    clients: 'Jumlah klien',
    runningTime: 'Waktu berjalan (hari)',
    memoryUsage: 'Penggunaan Memory',
    CpuUsage: 'Penggunaan CPU',
    memoryAllocation: 'Alokasi Memori',
    AOF: 'Apakah AOF diaktifkan?',
    RDB: 'Apakah RDB berhasil?',
    Key: 'Jumlah Kunci',
    network: 'Masuk/keluar jaringan',
    commandStats: 'Statistik Perintah',
    memoInfo: 'Informasi Memori',
    loadingMessage: 'Memuat data pemantauan cache, harap tunggu! ',
    order: 'Perintah',
    peak: 'Nilai Tertinggi',
    memoUsage: 'Pemakaian Memori',
    list: 'Daftar Cache',
    name: 'Nama Cache',
    key: 'Daftar Key',
    content: 'Konten Cache',
    CKey: 'Nama Kunci Cache',
    clearAll: 'Bersihkan Semua',
    refreshCache: 'Refresh daftar cache berhasil',
    clear1: 'Bersihkan Nama Cache [ ',
    clear2: ' ] Sukses',
    refreshKey: 'Refresh daftar nama kunci berhasil',
    clearKey: 'Hapus nama kunci cache [ ',
    clearAllCaches: 'Berhasil membersihkan semua cache',
  },
  Job: {
    name: 'Nama Task',
    namePlaceholder: 'Masukkan nama task',
    groupName: 'Nama Kelompok Task',
    groupNamePlaceholder: 'Silakan pilih nama kelompok task',
    status: 'Status Task',
    statusPlaceholder: 'Silakan pilih status task',
    id: 'Nomor Task',
    callTarget: 'Panggilan Target String',
    cron: 'Ekspresi Eksekusi cron',
    execute: 'Jalankan Sekali',
    details: 'Detail Task',
    schedule: 'Log Penjadwalan',
    group: 'Pengelompokan Tugas',
    callMethod: 'Metode Panggilan',
    beanCall: "Contoh panggilan bean: ryTask.ryParams('ry')",
    classCall: "Contoh panggilan class: com.ruoyi.quartz.task.RyTask.ryParams('ry')",
    paramDesc: 'Deskripsi parameter: string type, Boolean type, long integer, floating type, integer type',
    callTargetPlaceholder: 'Silakan masukkan string target panggilan',
    cronExpression: 'Ekspresi cron',
    cronExpressionPlaceholder: 'Masukkan ekspresi eksekusi cron',
    generateExpression: 'Menghasilkan ekspresi',
    executionStrategy: 'Strategi eksekusi',
    executeImmediately: 'Mengeksekusi Segera',
    executeOnce: 'Mengeksekusi Sekali',
    abandonExecution: 'Meninggalkan eksekusi',
    concurrent: 'Apakah bersamaan',
    allow: 'Izinkan',
    prohibit: 'Melarang',
    nextExec: 'Waktu eksekusi berikutnya: ',
    targetMethod: 'Panggil metode target: ',
    normal: 'Normal',
    fail: 'Gagal',
    defaultPolicy: 'Kebijakan Default',
    rules1: 'Nama tugas tidak boleh kosong',
    rules2: 'String target panggilan tidak boleh kosong',
    rules3: 'ekspresi eksekusi cron tidak boleh kosong',
    handleStatus: ' " tugas?',
    confirm1: 'Apakah Anda yakin ingin segera menjalankan tugas " ',
    confirm2: ' " ?',
    executionSuccess: 'Eksekusi Berhasil',
    confirmDelete: 'Apakah Anda yakin untuk menghapus nomor tugas yang dijadwalkan " ',
    addTask: 'Tambahkan task',
    modifyTask: 'Ubah Task',
    ExecutionStatus: 'Status Eksekusi',
    ExecutionStatusPlaceholder: 'Harap pilih status eksekusi',
    ExecutionTime: 'Waktu Eksekusi',
    LogId: 'Nomor Log',
    LogInfo: 'Informasi Log',
    detailed: 'Terperinci',
    logDetails: 'Menjadwalkan detail log',
    logNumber: 'Nomor seri log: ',
    ExceptionInfo: 'Informasi Pengecualian：',
    emptySuccess: 'Berhasil mengosongkan',
    confirmLogDelete: 'Apakah Anda yakin akan menghapus item data yang nomor log penjadwalannya adalah " ',
    confirmClearLog: 'Apakah Anda yakin untuk menghapus semua item data log penjadwalan?',
  },
  loginInfor: {
    loginAddress: 'Alamat Login',
    loginAddressPlaceholder: 'Silakan masukkan alamat login',
    loginStatus: 'Status Login',
    loginTime: 'Waktu Login',
    accessId: 'Nomor Akses',
    address: 'Alamat',
    loginLocation: 'Lokasi Login',
    os: 'Sistem Operasi',
    browser: 'Browser',
    description: 'Deskripsi',
    interviewTime: 'Waktu Wawancara',
    confirmDelete: 'Apakah Anda yakin akan menghapus item data yang nomor aksesnya adalah " ',
    confirmClean: 'Apakah Anda yakin untuk menghapus semua item data log masuk?',
  },
  online: {
    sessionNumber: 'Nomor Sesi',
    loginName: 'Nama Login',
    host: 'Host',
    forceLogout: 'Paksa Logout',
    confirm1: 'Apakah Anda yakin akan memaksa keluar dari pengguna yang bernama " ',
    confirm2: ' "?',
  },
  operLog: {
    systemModule: 'Modul Sistem',
    systemModulePlaceholder: 'Silakan masukkan modul sistem',
    operType: 'Jenis Operasi',
    operStatus: 'Status Operasi',
  },

}
