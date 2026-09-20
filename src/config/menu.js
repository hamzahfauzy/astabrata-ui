export default [
    {
        label: 'Dashboard',
        name:'',
        icon: 'bi bi-grid',
        permissions: ['dashboard.index','desa','pendamping','opd','dinsos','kecamatan','kabupaten','asesor'],
        route: '/',
        activeState: '/',
        children: []
    },
    // Super Admin
    {
        label: 'Master',
        name: 'master',
        icon: 'bi bi-folder2-open',
        permissions: [],
        activeState: ['/master/regions/*', '/master/villages/*', '/master/instances/*', '/master/educations/*', '/master/periods/*'],
        children: [
            {label: 'Periode', permissions: ['periods.index'], activeState: '/master/periods/*', route: '/master/periods'},
            {label: 'Kecamatan', permissions: ['regions.index'], activeState: '/master/regions/*', route: '/master/regions'},
            {label: 'Desa / Kelurahan', permissions: ['villages.index'], activeState: '/master/villages/*', route: '/master/villages'},
            {label: 'OPD', permissions: ['instances.index'], activeState: '/master/instances/*', route: '/master/instances'},
            {label: 'Jenjang Pendidikan', permissions: ['educations.index'], activeState: '/master/educations/*', route: '/master/educations'},
        ]
    },

    // Desa
    {
        label: 'Profil KPM',
        name:'profile',
        icon: 'bi bi-people-fill',
        permissions: ['desa'],
        route: '/kpm/profiles',
        activeState: '/kpm/profiles',
        children: []
    },
    {
        label: 'Usulan Baru',
        name:'profile-create',
        icon: 'bi bi-file-diff-fill',
        permissions: ['desa'],
        route: '/kpm/profiles/create',
        activeState: '/kpm/profiles/create',
        children: []
    },
    {
        label: 'Perbaikan Data',
        name:'profile-edit',
        icon: 'bi bi-pencil',
        permissions: ['desa'],
        route: '/kpm/profile-edit',
        activeState: '/kpm/profile-edit',
        children: []
    },
    {
        label: 'Dokumen',
        name:'profile-document',
        icon: 'bi bi-files',
        permissions: ['desa'],
        route: '/kpm/profile-documents',
        activeState: '/kpm/profile-document',
        children: []
    },


    // Pendamping
    {
        label: 'Daftar Verifikasi',
        name:'profile',
        icon: 'bi bi-card-list',
        permissions: ['pendamping'],
        route: '/kpm/profiles',
        activeState: '/kpm/profiles',
        children: []
    },
    {
        label: 'Jadwal Kunjungan',
        name:'profile',
        icon: 'bi bi-calendar-week',
        permissions: ['pendamping'],
        route: '/kpm/profiles',
        activeState: '/kpm/profiles',
        children: []
    },
    {
        label: 'Data Dikembalikan',
        name:'profile',
        icon: 'bi bi-arrow-return-left',
        permissions: ['pendamping'],
        route: '/kpm/profiles',
        activeState: '/kpm/profiles',
        children: []
    },
    {
        label: 'Riwayat Verifikasi',
        name:'profile',
        icon: 'bi bi-clock-history',
        permissions: ['pendamping'],
        route: '/kpm/profiles',
        activeState: '/kpm/profiles',
        children: []
    },

    // Kecamatan
    {
        label: 'Usulan Desa/Kelurahan',
        name:'profile',
        icon: 'bi bi-list-ul',
        permissions: ['kecamatan'],
        route: '/kpm/profiles',
        activeState: '/kpm/profiles',
        children: []
    },
    {
        label: 'Pemeriksaan Berkas Administrasi',
        name:'profile',
        icon: 'bi bi-clipboard-check',
        permissions: ['kecamatan'],
        route: '/kpm/profiles',
        activeState: '/kpm/profiles',
        children: []
    },
    {
        label: 'Daftar Nominatif',
        name:'profile',
        icon: 'bi bi-people-fill',
        permissions: ['kecamatan'],
        route: '/kpm/profiles',
        activeState: '/kpm/profiles',
        children: []
    },
    {
        label: 'Surat Pengantar',
        name:'profile',
        icon: 'bi bi-envelope-paper',
        permissions: ['kecamatan'],
        route: '/kpm/profiles',
        activeState: '/kpm/profiles',
        children: []
    },
    {
        label: 'Riwayat Pengajuan',
        name:'profile',
        icon: 'bi bi-clock-history',
        permissions: ['kecamatan'],
        route: '/kpm/profiles',
        activeState: '/kpm/profiles',
        children: []
    },

    // Dinsos
    {
        label: 'Usulan Kecamatan',
        name:'profile',
        icon: 'bi bi-card-list',
        permissions: ['dinsos'],
        route: '/kpm/profiles',
        activeState: '/kpm/profiles',
        children: []
    },
    {
        label: 'Penalaahan KPM',
        name:'profile',
        icon: 'bi bi-clipboard-check',
        permissions: ['dinsos'],
        route: '/kpm/profiles',
        activeState: '/kpm/profiles',
        children: []
    },
    {
        label: 'Daftar Sasaran',
        name:'profile',
        icon: 'bi bi-people-fill',
        permissions: ['dinisos'],
        route: '/kpm/profiles',
        activeState: '/kpm/profiles',
        children: []
    },
    {
        label: 'RII',
        name:'profile',
        icon: 'bi bi-people-fill',
        permissions: ['dinsos'],
        route: '/kpm/profiles',
        activeState: '/kpm/profiles',
        children: []
    },
    {
        label: 'Rujukan Intervensi',
        name:'profile',
        icon: 'bi bi-people-fill',
        permissions: ['dinsos'],
        route: '/kpm/profiles',
        activeState: '/kpm/profiles',
        children: []
    },
    {
        label: 'Monitoring dan Evaluasi',
        name:'profile-document',
        icon: 'bi bi-files',
        permissions: ['monev'],
        route: '/monev',
        activeState: '/monev',
        children: []
    },
    {
        label: 'Monitoring dan Evaluasi',
        name:'profile-document',
        icon: 'bi bi-files',
        permissions: ['dinsos'],
        route: '/penilaian-ulang',
        activeState: '/penilaian-ulang',
        children: []
    },
    {
        label: 'Graduasi',
        name:'profile-document',
        icon: 'bi bi-files',
        permissions: ['dinsos'],
        route: '/penilaian-ulang',
        activeState: '/penilaian-ulang',
        children: []
    },
    {
        label: 'Monitoring dan Evaluasi',
        name:'profile-document',
        icon: 'bi bi-files',
        permissions: ['monev'],
        route: '/monev',
        activeState: '/monev',
        children: []
    },
    {
        label: 'UEP',
        name:'profile-document',
        icon: 'bi bi-files',
        permissions: ['penilaian-ulang'],
        route: '/penilaian-ulang',
        activeState: '/penilaian-ulang',
        children: []
    },

    // opd
    {
        label: 'Rujukan Masuk',
        name:'profile',
        icon: 'bi bi-people-fill',
        permissions: ['opd'],
        route: '/kpm/profiles',
        activeState: '/kpm/profiles',
        children: []
    },
    {
        label: 'Jadwal Intervensi',
        name:'profile',
        icon: 'bi bi-people-fill',
        permissions: ['opd'],
        route: '/kpm/profiles',
        activeState: '/kpm/profiles',
        children: []
    },
    {
        label: 'Pelaksanaan',
        name:'profile',
        icon: 'bi bi-people-fill',
        permissions: ['opd'],
        route: '/kpm/profiles',
        activeState: '/kpm/profiles',
        children: []
    },
    {
        label: 'Bukti Dokumentasi',
        name:'profile',
        icon: 'bi bi-people-fill',
        permissions: ['opd'],
        route: '/kpm/profiles',
        activeState: '/kpm/profiles',
        children: []
    },
    {
        label: 'Tindak Lanjut',
        name:'profile',
        icon: 'bi bi-people-fill',
        permissions: ['opd'],
        route: '/kpm/profiles',
        activeState: '/kpm/profiles',
        children: []
    },


    {
        label: 'Baseline',
        name:'profile',
        icon: 'bi bi-people-fill',
        permissions: ['dinsos'],
        route: '/kpm/profiles',
        activeState: '/kpm/profiles',
        children: []
    },
    {
        label: 'RII',
        name:'profile',
        icon: 'bi bi-people-fill',
        permissions: ['dinsos'],
        route: '/kpm/profiles',
        activeState: '/kpm/profiles',
        children: []
    },
    {
        label: 'Intervensi OPD',
        name:'profile',
        icon: 'bi bi-people-fill',
        permissions: ['dinsos'],
        route: '/kpm/profiles',
        activeState: '/kpm/profiles',
        children: []
    },
    {
        label: 'Monitoring dan Evaluasi',
        name:'profile-document',
        icon: 'bi bi-files',
        permissions: ['dinsos'],
        route: '/monev',
        activeState: '/monev',
        children: []
    },
    {
        label: 'Penilaian Ulang',
        name:'profile-document',
        icon: 'bi bi-files',
        permissions: ['dinsos'],
        route: '/penilaian-ulang',
        activeState: '/penilaian-ulang',
        children: []
    },
    {
        label: 'Graduasi',
        name:'profile-document',
        icon: 'bi bi-files',
        permissions: ['dinsos'],
        route: '/graduasi',
        activeState: '/graduasi',
        children: []
    },
    {
        label: 'UEP',
        name:'profile-document',
        icon: 'bi bi-files',
        permissions: ['dinsos'],
        route: '/uep',
        activeState: '/uep',
        children: []
    },
    {
        label: 'Pasca Graduasi',
        name:'profile-document',
        icon: 'bi bi-files',
        permissions: ['dinsos'],
        route: '/pasca-graduasi',
        activeState: '/pasca-graduasi',
        children: []
    },
]