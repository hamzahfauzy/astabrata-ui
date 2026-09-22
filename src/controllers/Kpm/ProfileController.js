import { CrudController } from "../CrudController.js";
import view from '../../core/view.js'
import { storageUrl } from "../../config/env.js";
import stage from "../../config/stage.js";

export default class ProfileController extends CrudController {

    config = {
        baseUrl: '/kpm/profiles',
        state: {
            data: [],
            meta: {
                from: 0,
                last_page: 0,
                page: 0,
                per_page: 20,
                to: 0,
                total: 0
            },
            endpoint: '/kpm/profiles',
            query: {
                per_page: 20,
                page: 1,
                search: ''
            },
            loaded: false,
            isLoading: true,
        },
        searchFields: [],
        list: {
            title: 'Profil KPM',
            subtitle: 'Daftar Profil KPM',
            createLabel: 'Input Data Profil KPM',
            breadcrumbs: [],
            columns: [
                {label: 'No. KK', key: 'family_number', cellClass: 'text-secondary font-monospace small'},
                {label: 'NIK', key: 'personal_number', cellClass: 'text-secondary font-monospace small'},
                {label: 'Nama', key: 'name', cellClass: 'fw-semibold text-dark'},
            ],
            filters: [],
            actions: [
                {
                    label: 'Detail', type: 'link', 
                    url: row => { return '/kpm/profiles/' + row.id }, 
                    class: '',
                    condition: row => !(row.stage == 'stage_3' && row.status == 'Menunggu Verifikasi'),
                    permissions: ['profiles.view','desa','dinsos'],
                },
                {
                    label: 'Detail', type: 'link', 
                    url: row => { return '/kpm/profiles/' + row.id }, 
                    class: '',
                    condition: row => !(row.stage == 'stage_5' && row.status == 'Menunggu Verifikasi'),
                    permissions: ['opd'],
                },
                {
                    label: 'Periksa Data', type: 'link', 
                    url: row => { return '/kpm/profiles/' + row.id + '/check' }, 
                    class: '',
                    condition: row => {
                        return row.stage == 'stage_1' && row.status == 'Menunggu Verifikasi'  
                    },
                    permissions: ['pendamping'],
                },
                {
                    label: 'Detail', type: 'link', 
                    url: row => { return '/kpm/profiles/' + row.id }, 
                    class: '',
                    condition: row => !(row.stage == 'stage_1' && row.status == 'Menunggu Verifikasi'),
                    permissions: ['pendamping'],
                },
                {
                    label: 'Pemeriksaan Administrasi', type: 'link', 
                    url: row => { return '/kpm/profiles/' + row.id + '/check' }, 
                    class: '',
                    condition: row => row.stage == 'stage_2' && row.status == 'Menunggu Verifikasi',
                    permissions: ['kecamatan'],
                },
                {
                    label: 'Detail', type: 'link', 
                    url: row => { return '/kpm/profiles/' + row.id }, 
                    class: '',
                    condition: row => !(row.stage == 'stage_2' && row.status == 'Menunggu Verifikasi'),
                    permissions: ['kecamatan'],
                },
                {
                    label: 'Telaah Data', type: 'link', 
                    url: row => { return '/kpm/profiles/' + row.id + '/telaah' }, 
                    class: '',
                    condition: row => {
                        return row.stage == 'stage_3' && row.status == 'Menunggu Verifikasi'  
                    },
                    permissions: ['dinsos'],
                },
                {
                    label: 'Telaah Kebutuhan', type: 'link', 
                    url: row => { return '/kpm/profiles/' + row.id + '/telaah' }, 
                    class: '',
                    condition: row => {
                        return row.stage == 'stage_5' && row.status == 'Menunggu Verifikasi'
                    },
                    permissions: ['opd'],
                },
                {
                    label: 'Edit', type: 'link', 
                    url: row => { return '/kpm/profiles/' + row.id + '/edit' }, 
                    class: '',
                    permissions: ['profiles.edit'],
                },
                {
                    label: 'Delete', type: 'button', 
                    class: 'btn-delete text-danger',
                    permissions: ['profiles.delete'],
                },
            ],
            headerActions: [
                {
                    label: '<i class="bi bi-plus-lg me-2"></i> Input Data Profil KPM', route: '/kpm/profiles/create', 
                    class: 'btn btn-primary', permissions: ['profiles.create','desa'],
                    type: 'link'
                }
            ],
        },
        view: {
            breadcrumbs: [
                {label: 'Profil KPM', route: '/kpm/profiles'}
            ],
            title: 'Detail Profil KPM',
            subtitle: 'Data Detail Profil KPM',
            fields: this.config.list.columns,
        },
        create: {
            title: 'Input Data Profil KPM',
            subtitle: 'Isi form dibawah ini',
            breadcrumbs: [
                {label: 'Profil KPM', route: '/kpm/profiles'}
            ],
            fields: [
                {name: 'profile[family_number]', label: 'No. KK', type: 'number', required: true},
                {name: 'profile[personal_number]', label: 'NIK', type: 'number', required: true},
                {name: 'profile[name]', label: 'Nama', type: 'text', required: true},
            ],
        },
        edit: {
            title: 'Edit Profil KPM',
            subtitle: 'Isi form untuk mengedit data Profil KPM',
            breadcrumbs: [
                {label: 'Profil KPM', route: '/kpm/profiles'}
            ],
            fields: [
                {name: 'profile[family_number]', keyValue: 'family_number', label: 'No. KK', type: 'number', required: true},
                {name: 'profile[personal_number]', keyValue: 'personal_number', label: 'NIK', type: 'number', required: true},
                {name: 'profile[name]', keyValue: 'name', label: 'Nama', type: 'text', required: true},
            ],
        },
    }

    async create(ctx){
    
        if(!ctx.state)
        {
            ctx.state = this.config.state
        }

        ctx.onMounted(() => {

            ctx.loadScript('/assets/js/rab.js')
            ctx.loadScript('/assets/js/penghasilan.js')

            document.querySelector('select[name="periods[region]"]').addEventListener('change', async e => {
                const region = e.target.value
                const villages = await ctx.http.get('/villages/find-by-region-name/' + region)
                const selectMenu = document.querySelector('select[name="periods[village]"]');

                // Clear the dropdown
                selectMenu.innerHTML = '';

                // Loop through the data and append each option
                villages.data.forEach(item => {
                    selectMenu.add(new Option(item.name, item.name));
                });
            })

            document.querySelector('select[name="periods[has_bank_account]"]').addEventListener('change', async e => {
                const has_bank_account = e.target.value
                const bank_name = document.querySelector('[name="periods[bank_name]"]').closest('.form-group')
                const bank_account_name = document.querySelector('[name="periods[bank_account_name]"]').closest('.form-group')
                const bank_account_number = document.querySelector('[name="periods[bank_account_number]"]').closest('.form-group')
                if(has_bank_account == 'Ya')
                {
                    bank_name.classList.remove('d-none')
                    bank_account_name.classList.remove('d-none')
                    bank_account_number.classList.remove('d-none')
                }
                else
                {
                    bank_name.classList.add('d-none')
                    bank_account_name.classList.add('d-none')
                    bank_account_number.classList.add('d-none')
                }
            })

            document.querySelector('[name=assesment_geo_tag]').addEventListener('click', e => {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            const latitude = position.coords.latitude;
                            const longitude = position.coords.longitude;

                            document.querySelector('[name="assessments[geo_tag]"]').value = `${latitude},${longitude}`
                            
                            console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
                        },
                        (error) => {
                            console.error(`Error getting location: ${error.message}`);
                        }
                );
                } else {
                    console.error("Geolocation is not supported by this browser.");
                }
            })


            ctx.on('#crud-form', 'submit', async e => {
                e.preventDefault()

                const formData = new FormData(e.currentTarget)

                if (e.submitter?.name) {
                    formData.set(
                        e.submitter.name,
                        e.submitter.value
                    );
                }

                await ctx.http.post(ctx.state.endpoint, formData)

                ctx.flash("success", "Data created.");

                ctx.redirect(this.config.baseUrl)

                return false;
            })
        })

        const otherForm = {
            periods: [
                {name: 'periods[address]', label: 'Alamat', type: 'textarea', required: true},
                {name: 'periods[phone]', label: 'No. HP', type: 'number', required: true},
                {name: 'periods[program_type]', label: 'Jenis Program', type: 'text', required: true},
                {
                    name: 'periods[region]', label: 'Kecamatan', 
                    type: 'select',
                    options: [],
                    ajax: {
                        response: {value: 'name', label: 'name'},
                        url: '/regions/get',
                    },
                    required: true
                },
                {
                    name: 'periods[village]', label: 'Desa / Kelurahan', 
                    type: 'select',
                    options: [],
                    required: true
                },
                {
                    name: 'periods[education]', label: 'Pendidikan Terakhir', 
                    type: 'select',
                    options: [],
                    ajax: {
                        response: {value: 'name', label: 'name'},
                        url: '/educations/get',
                    },
                    required: true
                },
                {name: 'periods[family_dependent_number]', label: 'Jumlah Tanggungan dalam Keluarga', type: 'number', required: true, attr: {min:0}},
                {name: 'periods[social_assistance_type]', label: 'Jenis Bansos yang Diterima dari Pemerintah dan Non Pemerintah', type: 'text', required: true},
                {name: 'periods[business_assistance_type]', label: 'Jenis Bantuan Usaha yang pernah atau sedang diterima', type: 'text', required: true},
                {
                    name: 'periods[has_bank_account]', label: 'Memiliki Rekening Tabungan Bank Non Bansos', 
                    type: 'select',
                    options: [
                        {label: 'Ya', value: 'Ya'},
                        {label: 'Tidak', value: 'Tidak'},
                    ],
                    required: true
                },
                {name: 'periods[bank_name]', label: 'Nama Bank', type: 'text', attr: { wrapperClassName: 'd-none' }},
                {name: 'periods[bank_account_name]', label: 'Nama Pemilik Rekening', type: 'text', attr: { wrapperClassName: 'd-none' }},
                {name: 'periods[bank_account_number]', label: 'No. Rekening', type: 'text', attr: { wrapperClassName: 'd-none' }},
            ],

            business: [
                {
                    name: 'business[is_active]', label: 'Memiliki Usaha yang Berjalan', 
                    type: 'select',
                    options: [
                        {label: 'Ya', value: 'Ya'},
                        {label: 'Tidak', value: 'Tidak'},
                    ],
                    required: true
                },
                {name: 'business[cluster]', label: 'Klaster Usaha', type: 'text'},
                {name: 'business[product]', label: 'Produk Usaha', type: 'text'},
                {name: 'business[manager]', label: 'Pengelola Usaha', type: 'text'},
                {
                    name: 'business[is_location_in_home]', label: 'Lokasi Usaha jadi Satu dengan Rumah', 
                    type: 'select',
                    options: [
                        {label: 'Ya', value: 'Ya'},
                        {label: 'Tidak', value: 'Tidak'},
                    ],
                },
                {name: 'business[address]', label: 'Lokasi Usaha', type: 'textarea'},
                {name: 'business[village]', label: 'Desa / Kelurahan', type: 'text'},
                {name: 'business[region]', label: 'Kecamatan', type: 'text'},
                {name: 'business[regency]', label: 'Kabupaten', type: 'text'},
                {name: 'business[province]', label: 'Provinsi', type: 'text'},
                {name: 'business[start_month]', label: 'Bulan dan Tahun mulai Usaha', type: 'month'},
                {name: 'business[surface_area]', label: 'Luas Area', type: 'text'},
                {name: 'business[building_area]', label: 'Luas Bangunan', type: 'text'},
                {name: 'business[electricity]', label: 'Daya Listrik', type: 'text'},
                {
                    name: 'business[has_employee]', label: 'Memiliki Karyawan yang Dibayar Rutin', 
                    type: 'select',
                    options: [
                        {label: 'Ya', value: 'Ya'},
                        {label: 'Tidak', value: 'Tidak'},
                    ],
                },
                {name: 'business[num_of_employee]', label: 'Jumlah Pekerja', type: 'number'},
                {name: 'business[daily_production]', label: 'Kemampuan Produksi Harian', type: 'text'},
                {
                    name: 'business[legal]', label: 'Izin / Sertifikat Usaha', 
                    type: 'select',
                    options: [
                        {label: 'Sudah Memiliki Izin', value: 'Sudah Memiliki Izin'},
                        {label: 'Tidak / Belum Memiliki Izin', value: 'Tidak / Belum Memiliki Izin'},
                    ],
                },
            ],
            assessments: [
                {name: 'assessments[assessment_person]', label: 'Bertemu Dengan', type: 'text'},
                {name: 'assessments[geo_tag]', label: 'Geotag', type: 'geotag', btnName: 'assesment_geo_tag'},
                {name: 'assessments[address]', label: 'Alamat', type: 'textarea'},
            ],
            purposes: [
                {name: 'purposes[issue]', label: 'Permasalahan', type: 'textarea'},
                {name: 'purposes[goals]', label: 'Tujuan Permohonan', type: 'textarea'},
                {name: 'purposes[training_needs]', label: 'Kebutuhan Pelatihan', type: 'textarea'},
            ],
            documents: [
                {name: 'documents[identity_card]', label: 'KTP', type: 'file'},
                {name: 'documents[family_card]', label: 'KK', type: 'file'},
                {name: 'documents[home_image]', label: 'Rumah', type: 'file'},
            ]
        }

        return await view.render('pages/kpm/profile/create', {...ctx.state, pageAttr: this.config.create, otherForm, baseUrl: this.config.baseUrl, data: {}})
    }

    async show(ctx){
    
        if(!ctx.state)
        {
            ctx.state = this.config.state
        }

        const action = ctx.params.action ?? false
        const response = await ctx.http.get(ctx.state.endpoint + '/' + ctx.params.id)
        const activeStage = stage.stages.find(stage => stage.id == response.data.period_stage)

        ctx.onMounted(async () => {

            if(activeStage.id == 'stage_4' && action)
            {
                await ctx.http.get(ctx.state.endpoint + '/' + ctx.params.id + '/process')
            }

            ctx.on('#stage-form', 'submit', async e => {
                e.preventDefault()

                const formData = new FormData(e.currentTarget)

                await ctx.http.post(ctx.state.endpoint + '/' + ctx.params.id + '/stage', formData)

                ctx.flash("success", "Data berhasil disimpan.");

                const redirector = {
                    'stage_4': '/kpm/profile-target',
                    'stage_6': '/kpm/profile-intervence-schedules',
                    'stage_7': '/kpm/profile-implementations',
                }

                const baseUrl = redirector[activeStage.id] ?? this.config.baseUrl

                ctx.redirect(baseUrl)

                return false;
            })
        })

        

        const otherView = {
            periods: [
                {key: 'period_address', label: 'Alamat'},
                {key: 'period_phone', label: 'No. HP'},
                {key: 'period_program_type', label: 'Jenis Program'},
                {key: 'period_region', label: 'Kecamatan'},
                {key: 'period_village', label: 'Desa / Kelurahan'},
                {key: 'period_education', label: 'Pendidikan Terakhir'},
                {key: 'period_family_dependent_number', label: 'Jumlah Tanggungan dalam Keluarga'},
                {key: 'period_social_assistance_type', label: 'Jenis Bansos yang Diterima dari Pemerintah dan Non Pemerintah'},
                {key: 'period_business_assistance_type', label: 'Jenis Bantuan Usaha yang pernah atau sedang diterima'},
                {key: 'period_has_bank_account', label: 'Memiliki Rekening Tabungan Bank Non Bansos'},
                {key: 'period_bank_name', label: 'Nama Bank'},
                {key: 'period_bank_account_name', label: 'Nama Pemilik Rekening'},
                {key: 'period_bank_account_number', label: 'No. Rekening'},
            ],

            business: [
                {key: 'business_is_active', label: 'Memiliki Usaha yang Berjalan'},
                {key: 'business_cluster', label: 'Klaster Usaha'},
                {key: 'business_product', label: 'Produk Usaha'},
                {key: 'business_manager', label: 'Pengelola Usaha'},
                {key: 'business_is_location_in_home', label: 'Lokasi Usaha jadi Satu denga Rumah'},
                {key: 'business_address', label: 'Lokasi Usaha'},
                {key: 'business_village', label: 'Desa / Kelurahan'},
                {key: 'business_region', label: 'Kecamatan'},
                {key: 'business_regency', label: 'Kabupaten'},
                {key: 'business_province', label: 'Provinsi'},
                {key: 'business_start_month', label: 'Bulan dan Tahun mulai Usaha'},
                {key: 'business_surface_area', label: 'Luas Area'},
                {key: 'business_building_area', label: 'Luas Bangunan'},
                {key: 'business_electricity', label: 'Daya Listrik'},
                {key: 'business_has_employee', label: 'Memiliki Karyawan yang Dibayar Rutin'},
                {key: 'business_num_of_employee', label: 'Jumlah Pekerja'},
                {key: 'business_daily_production', label: 'Kemampuan Produksi Harian'},
                {key: 'business_legal', label: 'Izin / Sertifikat Usaha'}
            ],
            assessments: [
                {key: 'assessment_assessor_name', label: 'Petugas Asesmen'},
                {key: 'assessment_assessment_person', label: 'Bertemu Dengan'},
                {key: 'assessment_geo_tag',label: 'Geotag'},
                {key: 'assessment_address',label: 'Alamat'}
            ],
            purposes: [
                {key: 'purposes_issue', label: 'Permasalahan'},
                {key: 'purposes_goals', label: 'Tujuan Permohonan'},
                {key: 'purposes_training_needs', label: 'Kebutuhan Pelatihan'},
            ],
            documents: [
                {key: 'documents_identity_card', label: 'KTP'},
                {key: 'documents_family_card', label: 'KK'},
                {key: 'documents_home_image', label: 'Rumah'},
            ]
        }

        const docs = {identity_card: 'KTP', family_card: 'KK', home_image: 'Rumah'}

        return await view.render('pages/kpm/profile/detail', {
            ...ctx.state, 
            action,
            pageAttr: this.config.view, 
            otherView, 
            baseUrl: this.config.baseUrl, 
            data: response.data, 
            docs, 
            storageUrl, 
            activeStage
        })

    }

    async edit(ctx){
    
        if(!ctx.state)
        {
            ctx.state = this.config.state
        }

        const response = await ctx.http.get(ctx.state.endpoint + '/' + ctx.params.id)

        ctx.onMounted(() => {
            ctx.loadScript('/assets/js/rab.js')
            ctx.loadScript('/assets/js/penghasilan.js')

            document.querySelector('select[name="periods[region]"]').addEventListener('change', async e => {
                const region = e.target.value
                const villages = await ctx.http.get('/villages/find-by-region-name/' + region)
                const selectMenu = document.querySelector('select[name="periods[village]"]');

                // Clear the dropdown
                selectMenu.innerHTML = '';

                // Loop through the data and append each option
                villages.data.forEach(item => {
                    selectMenu.add(new Option(item.name, item.name));
                });
            })

            document.querySelector('select[name="periods[has_bank_account]"]').addEventListener('change', async e => {
                const has_bank_account = e.target.value
                const bank_name = document.querySelector('[name="periods[bank_name]"]').closest('.form-group')
                const bank_account_name = document.querySelector('[name="periods[bank_account_name]"]').closest('.form-group')
                const bank_account_number = document.querySelector('[name="periods[bank_account_number]"]').closest('.form-group')
                if(has_bank_account == 'Ya')
                {
                    bank_name.classList.remove('d-none')
                    bank_account_name.classList.remove('d-none')
                    bank_account_number.classList.remove('d-none')
                }
                else
                {
                    bank_name.classList.add('d-none')
                    bank_account_name.classList.add('d-none')
                    bank_account_number.classList.add('d-none')
                }
            })

            document.querySelector('[name=assesment_geo_tag]').addEventListener('click', e => {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            const latitude = position.coords.latitude;
                            const longitude = position.coords.longitude;

                            document.querySelector('[name="assessments[geo_tag]"]').value = `${latitude},${longitude}`
                            
                            console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
                        },
                        (error) => {
                            console.error(`Error getting location: ${error.message}`);
                        }
                );
                } else {
                    console.error("Geolocation is not supported by this browser.");
                }
            })

            setTimeout(e => {
                window.rab.loadFromData(response.data.budgets)
            }, 1000)

            ctx.on('#crud-form', 'submit', async e => {
                e.preventDefault()

                const formData = new FormData(e.target)

                if (e.submitter?.name) {
                    formData.set(
                        e.submitter.name,
                        e.submitter.value
                    );
                }

                await ctx.http.put(ctx.state.endpoint + '/' + ctx.params.id, formData)

                ctx.flash("success", "Data updated.");

                ctx.redirect(this.config.baseUrl)

                return false;
            })
        })

        const otherForm = {
            periods: [
                {name: 'periods[address]', keyValue: 'period_address', label: 'Alamat', type: 'textarea', required: true},
                {name: 'periods[phone]', keyValue: 'period_phone', label: 'No. HP', type: 'number', required: true},
                {name: 'periods[program_type]', keyValue: 'period_program_type', label: 'Jenis Program', type: 'text', required: true},
                {
                    name: 'periods[region]', keyValue: 'period_region', label: 'Kecamatan', 
                    type: 'select',
                    options: [],
                    ajax: {
                        response: {value: 'name', label: 'name'},
                        url: '/regions/get',
                    },
                    required: true
                },
                {
                    name: 'periods[village]', keyValue: 'period_village', label: 'Desa / Kelurahan', 
                    type: 'select',
                    options: [{label: response.data.period_village, value: response.data.period_village}],
                    required: true
                },
                {
                    name: 'periods[education]', keyValue: 'period_education', label: 'Pendidikan Terakhir', 
                    type: 'select',
                    options: [],
                    ajax: {
                        response: {value: 'name', label: 'name'},
                        url: '/educations/get',
                    },
                    required: true
                },
                {name: 'periods[family_dependent_number]', keyValue: 'period_family_dependent_number', label: 'Jumlah Tanggungan dalam Keluarga', type: 'number', required: true, attr: {min:0}},
                {name: 'periods[social_assistance_type]', keyValue: 'period_social_assistance_type', label: 'Jenis Bansos yang Diterima dari Pemerintah dan Non Pemerintah', type: 'text', required: true},
                {name: 'periods[business_assistance_type]', keyValue: 'period_business_assistance_type', label: 'Jenis Bantuan Usaha yang pernah atau sedang diterima', type: 'text', required: true},
                {
                    name: 'periods[has_bank_account]', keyValue: 'period_has_bank_account', label: 'Memiliki Rekening Tabungan Bank Non Bansos', 
                    type: 'select',
                    options: [
                        {label: 'Ya', value: 'Ya'},
                        {label: 'Tidak', value: 'Tidak'},
                    ],
                    required: true
                },
                {name: 'periods[bank_name]', keyValue: 'period_bank_name', label: 'Nama Bank', type: 'text', attr: { wrapperClassName: response.data.period_has_bank_account == 'Tidak' ? 'd-none' : '' }},
                {name: 'periods[bank_account_name]', keyValue: 'period_bank_account_name', label: 'Nama Pemilik Rekening', type: 'text', attr: { wrapperClassName: response.data.period_has_bank_account == 'Tidak' ? 'd-none' : '' }},
                {name: 'periods[bank_account_number]', keyValue: 'period_bank_account_number', label: 'No. Rekening', type: 'text', attr: { wrapperClassName: response.data.period_has_bank_account == 'Tidak' ? 'd-none' : '' }},
            ],

            business: [
                {
                    name: 'business[is_active]', keyValue: 'business_is_active', label: 'Memiliki Usaha yang Berjalan', 
                    type: 'select',
                    options: [
                        {label: 'Ya', value: 'Ya'},
                        {label: 'Tidak', value: 'Tidak'},
                    ],
                    required: true
                },
                {name: 'business[cluster]', keyValue: 'business_cluster', label: 'Klaster Usaha', type: 'text'},
                {name: 'business[product]', keyValue: 'business_product', label: 'Produk Usaha', type: 'text'},
                {name: 'business[manager]', keyValue: 'business_manager', label: 'Pengelola Usaha', type: 'text'},
                {
                    name: 'business[is_location_in_home]', keyValue: 'business_is_location_in_home', label: 'Lokasi Usaha jadi Satu dengan Rumah', 
                    type: 'select',
                    options: [
                        {label: 'Ya', value: 'Ya'},
                        {label: 'Tidak', value: 'Tidak'},
                    ],
                },
                {name: 'business[address]', keyValue: 'business_address', label: 'Lokasi Usaha', type: 'textarea'},
                {name: 'business[village]', keyValue: 'business_village', label: 'Desa / Kelurahan', type: 'text'},
                {name: 'business[region]', keyValue: 'business_region', label: 'Kecamatan', type: 'text'},
                {name: 'business[regency]', keyValue: 'business_regency', label: 'Kabupaten', type: 'text'},
                {name: 'business[province]', keyValue: 'business_province', label: 'Provinsi', type: 'text'},
                {name: 'business[start_month]', keyValue: 'business_start_month', label: 'Bulan dan Tahun mulai Usaha', type: 'month'},
                {name: 'business[surface_area]', keyValue: 'business_surface_area', label: 'Luas Area', type: 'text'},
                {name: 'business[building_area]', keyValue: 'business_building_area', label: 'Luas Bangunan', type: 'text'},
                {name: 'business[electricity]', keyValue: 'business_electricity', label: 'Daya Listrik', type: 'text'},
                {
                    name: 'business[has_employee]', keyValue: 'business_has_employee', label: 'Memiliki Karyawan yang Dibayar Rutin', 
                    type: 'select',
                    options: [
                        {label: 'Ya', value: 'Ya'},
                        {label: 'Tidak', value: 'Tidak'},
                    ],
                },
                {name: 'business[num_of_employee]', keyValue: 'business_num_of_employee', label: 'Jumlah Pekerja', type: 'number'},
                {name: 'business[daily_production]', keyValue: 'business_daily_production', label: 'Kemampuan Produksi Harian', type: 'text'},
                {
                    name: 'business[legal]', keyValue: 'business_legal', label: 'Izin / Sertifikat Usaha', 
                    type: 'select',
                    options: [
                        {label: 'Sudah Memiliki Izin', value: 'Sudah Memiliki Izin'},
                        {label: 'Tidak / Belum Memiliki Izin', value: 'Tidak / Belum Memiliki Izin'},
                    ],
                },
            ],
            assessments: [
                {name: 'assessments[assessment_person]', keyValue: 'assessment_assessment_person', label: 'Bertemu Dengan', type: 'text'},
                {name: 'assessments[geo_tag]', keyValue: 'assessment_geo_tag', label: 'Geotag', type: 'geotag', btnName: 'assesment_geo_tag'},
                {name: 'assessments[address]', keyValue: 'assessment_address', label: 'Alamat', type: 'textarea'},
            ],
            purposes: [
                {name: 'purposes[issue]', keyValue: 'purposes_issue', label: 'Permasalahan', type: 'textarea'},
                {name: 'purposes[goals]', keyValue: 'purposes_goals', label: 'Tujuan Permohonan', type: 'textarea'},
                {name: 'purposes[training_needs]', keyValue: 'purposes_training_needs', label: 'Kebutuhan Pelatihan', type: 'textarea'},
            ],
            documents: [
                {name: 'documents[identity_card]', label: 'KTP', type: 'file'},
                {name: 'documents[family_card]', label: 'KK', type: 'file'},
                {name: 'documents[home_image]', label: 'Rumah', type: 'file'},
            ]
        }

        
        return await view.render('pages/kpm/profile/edit', {...ctx.state, pageAttr: this.config.edit, baseUrl: this.config.baseUrl, data: response.data, otherForm})

    }

    async revision(ctx){
    
        if(!ctx.state)
        {
            ctx.state = this.config.state
            ctx.state.success = ctx.flash("success");
        }

        ctx.onMounted(() => {

            if(!ctx.state.loaded) {
                ctx.state.loaded = true;
                this.loadFilteredData(ctx, '/kpm/profile-revisions');
            }

            ctx.on('#searchForm', 'submit', e => {
                e.preventDefault()

                const search = document.querySelector('input[name=search]').value

                ctx.redirect('/kpm/profile-revisions/?search=' + search)

                return false;
            })
        })

        return await view.render('crud/index', {
            ...ctx.state, 
            baseUrl: this.config.baseUrl, 
            list: {
                title: 'Perbaikan',
                subtitle: 'Daftar Profil KPM yang perlu perbaikan Data',
                createLabel: '',
                breadcrumbs: [],
                columns: [
                    {label: 'No. KK', key: 'family_number', cellClass: 'text-secondary font-monospace small'},
                    {label: 'NIK', key: 'personal_number', cellClass: 'text-secondary font-monospace small'},
                    {label: 'Nama', key: 'name', cellClass: 'fw-semibold text-dark'},
                ],
                filters: [],
                actions: [
                    {
                        label: 'Edit', type: 'link', 
                        url: row => { return '/kpm/profiles/' + row.id + '/edit'}, 
                        class: '',
                        permissions: ['desa'],
                    },
                ],
                headerActions: [],
            }
        })

    }

    async scheduled(ctx){
    
        if(!ctx.state)
        {
            ctx.state = this.config.state
            ctx.state.success = ctx.flash("success");
        }

        ctx.onMounted(() => {

            if(!ctx.state.loaded) {
                ctx.state.loaded = true;
                this.loadFilteredData(ctx, '/kpm/profile-scheduled');
            }

            ctx.on('#searchForm', 'submit', e => {
                e.preventDefault()

                const search = document.querySelector('input[name=search]').value

                ctx.redirect('/kpm/profile-scheduled/?search=' + search)

                return false;
            })
        })

        return await view.render('crud/index', {
            ...ctx.state, 
            baseUrl: this.config.baseUrl, 
            list: {
                title: 'Jadwal Kunjungan',
                subtitle: 'Daftar Jadwal Kunjungan Profil KPM',
                createLabel: '',
                breadcrumbs: [],
                columns: [
                    {label: 'No. KK', key: 'family_number', cellClass: 'text-secondary font-monospace small'},
                    {label: 'NIK', key: 'personal_number', cellClass: 'text-secondary font-monospace small'},
                    {label: 'Nama', key: 'name', cellClass: 'fw-semibold text-dark'},
                ],
                filters: [],
                actions: [
                    {
                        label: 'Update', type: 'link', 
                        url: row => { return '/kpm/profiles/' + row.id }, 
                        class: '',
                        permissions: ['pendamping'],
                    },
                ],
                headerActions: [],
            }
        })

    }
    
    async returned(ctx){
    
        if(!ctx.state)
        {
            ctx.state = this.config.state
            ctx.state.success = ctx.flash("success");
        }

        ctx.onMounted(() => {

            if(!ctx.state.loaded) {
                ctx.state.loaded = true;
                this.loadFilteredData(ctx, '/kpm/profile-returned');
            }

            ctx.on('#searchForm', 'submit', e => {
                e.preventDefault()

                const search = document.querySelector('input[name=search]').value

                ctx.redirect('/kpm/profile-returned/?search=' + search)

                return false;
            })
        })

        return await view.render('crud/index', {
            ...ctx.state, 
            baseUrl: this.config.baseUrl, 
            list: {
                title: 'Data Dikembalikan',
                subtitle: 'Daftar Profil KPM Dikembalikan',
                createLabel: '',
                breadcrumbs: [],
                columns: [
                    {label: 'No. KK', key: 'family_number', cellClass: 'text-secondary font-monospace small'},
                    {label: 'NIK', key: 'personal_number', cellClass: 'text-secondary font-monospace small'},
                    {label: 'Nama', key: 'name', cellClass: 'fw-semibold text-dark'},
                ],
                filters: [],
                actions: [
                    {
                        label: 'Detail', type: 'link', 
                        url: row => { return '/kpm/profiles/' + row.id }, 
                        class: '',
                        permissions: ['pendamping'],
                    },
                ],
                headerActions: [],
            }
        })

    }

    async administrations(ctx){
    
        if(!ctx.state)
        {
            ctx.state = this.config.state
            ctx.state.success = ctx.flash("success");
        }

        ctx.onMounted(() => {

            if(!ctx.state.loaded) {
                ctx.state.loaded = true;
                this.loadFilteredData(ctx, '/kpm/profile-administrations');
            }

            ctx.on('#searchForm', 'submit', e => {
                e.preventDefault()

                const search = document.querySelector('input[name=search]').value

                ctx.redirect('/kpm/profile-administrations/?search=' + search)

                return false;
            })
        })

        return await view.render('crud/index', {
            ...ctx.state, 
            baseUrl: this.config.baseUrl, 
            list: {
                title: 'Pemeriksaan Berkas Administrasi',
                subtitle: 'Daftar Profil KPM yang telah di periksa',
                createLabel: '',
                breadcrumbs: [],
                columns: [
                    {label: 'No. KK', key: 'family_number', cellClass: 'text-secondary font-monospace small'},
                    {label: 'NIK', key: 'personal_number', cellClass: 'text-secondary font-monospace small'},
                    {label: 'Nama', key: 'name', cellClass: 'fw-semibold text-dark'},
                ],
                filters: [],
                actions: [
                    {
                        label: 'Detail', type: 'link', 
                        url: row => { return '/kpm/profiles/' + row.id }, 
                        class: '',
                        permissions: ['kecamatan'],
                    },
                ],
                headerActions: [],
            }
        })

    }

    async nominatif(ctx){
    
        if(!ctx.state)
        {
            ctx.state = this.config.state
            ctx.state.success = ctx.flash("success");
        }

        ctx.onMounted(() => {

            if(!ctx.state.loaded) {
                ctx.state.loaded = true;
                this.loadFilteredData(ctx, '/kpm/profile-nominatif');
            }

            ctx.on('#searchForm', 'submit', e => {
                e.preventDefault()

                const search = document.querySelector('input[name=search]').value

                ctx.redirect('/kpm/profile-nominatif/?search=' + search)

                return false;
            })
        })

        return await view.render('crud/index', {
            ...ctx.state, 
            baseUrl: this.config.baseUrl, 
            list: {
                title: 'Daftar Nominatif',
                subtitle: 'Daftar Profil KPM yang masuk nominatif graduasi',
                createLabel: '',
                breadcrumbs: [],
                columns: [
                    {label: 'No. KK', key: 'family_number', cellClass: 'text-secondary font-monospace small'},
                    {label: 'NIK', key: 'personal_number', cellClass: 'text-secondary font-monospace small'},
                    {label: 'Nama', key: 'name', cellClass: 'fw-semibold text-dark'},
                ],
                filters: [],
                actions: [
                    {
                        label: 'Detail', type: 'link', 
                        url: row => { return '/kpm/profiles/' + row.id }, 
                        class: '',
                        permissions: ['kecamatan'],
                    },
                ],
                headerActions: [],
            }
        })

    }

    async check(ctx){
    
        if(!ctx.state)
        {
            ctx.state = this.config.state
            ctx.state.success = ctx.flash("success");
        }

        ctx.onMounted(() => {

            if(!ctx.state.loaded) {
                ctx.state.loaded = true;
                this.loadFilteredData(ctx, '/kpm/profile-check');
            }

            ctx.on('#searchForm', 'submit', e => {
                e.preventDefault()

                const search = document.querySelector('input[name=search]').value

                ctx.redirect('/kpm/profile-check/?search=' + search)

                return false;
            })
        })

        return await view.render('crud/index', {
            ...ctx.state, 
            baseUrl: this.config.baseUrl, 
            list: {
                title: 'Daftar Penelaahan KPM',
                subtitle: 'Daftar Profil KPM yang telah Ditelaah',
                createLabel: '',
                breadcrumbs: [],
                columns: [
                    {label: 'No. KK', key: 'family_number', cellClass: 'text-secondary font-monospace small'},
                    {label: 'NIK', key: 'personal_number', cellClass: 'text-secondary font-monospace small'},
                    {label: 'Nama', key: 'name', cellClass: 'fw-semibold text-dark'},
                ],
                filters: [],
                actions: [
                    {
                        label: 'Detail', type: 'link', 
                        url: row => { return '/kpm/profiles/' + row.id }, 
                        class: '',
                        permissions: ['dinsos'],
                    },
                ],
                headerActions: [],
            }
        })

    }

    async targets(ctx){
    
        if(!ctx.state)
        {
            ctx.state = this.config.state
            ctx.state.success = ctx.flash("success");
        }

        ctx.onMounted(() => {

            if(!ctx.state.loaded) {
                ctx.state.loaded = true;
                this.loadFilteredData(ctx, '/kpm/profile-target');
            }

            ctx.on('#searchForm', 'submit', e => {
                e.preventDefault()

                const search = document.querySelector('input[name=search]').value

                ctx.redirect('/kpm/profile-target/?search=' + search)

                return false;
            })
        })

        return await view.render('crud/index', {
            ...ctx.state, 
            baseUrl: this.config.baseUrl, 
            list: {
                title: 'Daftar Sasaran KPM',
                subtitle: 'Daftar Profil KPM yang menjadi Sasaran',
                createLabel: '',
                breadcrumbs: [],
                columns: [
                    {label: 'No. KK', key: 'family_number', cellClass: 'text-secondary font-monospace small'},
                    {label: 'NIK', key: 'personal_number', cellClass: 'text-secondary font-monospace small'},
                    {label: 'Nama', key: 'name', cellClass: 'fw-semibold text-dark'},
                ],
                filters: [],
                actions: [
                    {
                        label: 'Lakukan Asesmen', type: 'link', 
                        url: row => { return '/kpm/profiles/' + row.id + '/assessment'}, 
                        class: '',
                        condition: row => row.stage == 'stage_3' && row.status == 'Sesuai',
                        permissions: ['asesor'],
                    },
                    // {
                    //     label: 'Verifikasi', type: 'link', 
                    //     url: row => { return '/kpm/profiles/' + row.id + '/verification'}, 
                    //     class: '',
                    //     condition: row => {
                    //         return row.stage == 'stage_9' && row.status == 'Menunggu Verifikasi'  
                    //     },
                    //     permissions: ['dinsos'],
                    // },
                    {
                        label: 'Detail', type: 'link', 
                        url: row => { return '/kpm/profiles/' + row.id }, 
                        class: '',
                        condition: row => !(row.stage == 'stage_3' && row.status == 'Sesuai'),
                        permissions: ['asesor'],
                    },
                    {
                        label: 'Detail', type: 'link', 
                        url: row => { return '/kpm/profiles/' + row.id }, 
                        class: '',
                        permissions: ['dinsos'],
                    },
                ],
                headerActions: [],
            }
        })

    }

    async assessments(ctx){
    
        if(!ctx.state)
        {
            ctx.state = this.config.state
            ctx.state.success = ctx.flash("success");
        }

        ctx.onMounted(() => {

            if(!ctx.state.loaded) {
                ctx.state.loaded = true;
                this.loadFilteredData(ctx, '/kpm/profile-assessments');
            }

            ctx.on('#searchForm', 'submit', e => {
                e.preventDefault()

                const search = document.querySelector('input[name=search]').value

                ctx.redirect('/kpm/profile-assessments/?search=' + search)

                return false;
            })
        })

        return await view.render('crud/index', {
            ...ctx.state, 
            baseUrl: this.config.baseUrl, 
            list: {
                title: 'Daftar Asesmen KPM',
                subtitle: 'Daftar Profil KPM yang telah diasesmen',
                createLabel: '',
                breadcrumbs: [],
                columns: [
                    {label: 'No. KK', key: 'family_number', cellClass: 'text-secondary font-monospace small'},
                    {label: 'NIK', key: 'personal_number', cellClass: 'text-secondary font-monospace small'},
                    {label: 'Nama', key: 'name', cellClass: 'fw-semibold text-dark'},
                ],
                filters: [],
                actions: [
                    {
                        label: 'Detail', type: 'link', 
                        url: row => { return '/kpm/profiles/' + row.id }, 
                        class: '',
                        permissions: ['dinsos','asesor'],
                    },
                ],
                headerActions: [],
            }
        })

    }

    async intervenceSchedules(ctx){
    
        if(!ctx.state)
        {
            ctx.state = this.config.state
            ctx.state.success = ctx.flash("success");
        }

        ctx.onMounted(() => {

            if(!ctx.state.loaded) {
                ctx.state.loaded = true;
                this.loadFilteredData(ctx, '/kpm/profile-intervence-schedules');
            }

            ctx.on('#searchForm', 'submit', e => {
                e.preventDefault()

                const search = document.querySelector('input[name=search]').value

                ctx.redirect('/kpm/profile-intervence-schedules/?search=' + search)

                return false;
            })
        })

        return await view.render('crud/index', {
            ...ctx.state, 
            baseUrl: this.config.baseUrl, 
            list: {
                title: 'Jadwal Intervensi KPM',
                subtitle: 'Daftar Profil KPM yang telah dijadwalkan interversi',
                createLabel: '',
                breadcrumbs: [],
                columns: [
                    {label: 'No. KK', key: 'family_number', cellClass: 'text-secondary font-monospace small'},
                    {label: 'NIK', key: 'personal_number', cellClass: 'text-secondary font-monospace small'},
                    {label: 'Nama', key: 'name', cellClass: 'fw-semibold text-dark'},
                ],
                filters: [],
                actions: [
                    {
                        label: 'Realisasi Intervensi', type: 'link', 
                        url: row => { return '/kpm/profiles/' + row.id + '/realisasi'}, 
                        class: '',
                        condition: row => {
                            return row.stage == 'stage_6' && row.status == 'Menunggu Verifikasi'  
                        },
                        permissions: ['opd'],
                    },
                ],
                headerActions: [],
            }
        })

    }

    async implementations(ctx){
    
        if(!ctx.state)
        {
            ctx.state = this.config.state
            ctx.state.success = ctx.flash("success");
        }

        ctx.onMounted(() => {

            if(!ctx.state.loaded) {
                ctx.state.loaded = true;
                this.loadFilteredData(ctx, '/kpm/profile-implementations');
            }

            ctx.on('#searchForm', 'submit', e => {
                e.preventDefault()

                const search = document.querySelector('input[name=search]').value

                ctx.redirect('/kpm/profile-implementations/?search=' + search)

                return false;
            })
        })

        return await view.render('crud/index', {
            ...ctx.state, 
            baseUrl: this.config.baseUrl, 
            list: {
                title: 'Pelaksanaan',
                subtitle: 'Daftar Profil KPM yang telah melakukan Intervensi',
                createLabel: '',
                breadcrumbs: [],
                columns: [
                    {label: 'No. KK', key: 'family_number', cellClass: 'text-secondary font-monospace small'},
                    {label: 'NIK', key: 'personal_number', cellClass: 'text-secondary font-monospace small'},
                    {label: 'Nama', key: 'name', cellClass: 'fw-semibold text-dark'},
                ],
                filters: [],
                actions: [
                    {
                        label: 'Detail', type: 'link', 
                        url: row => { return '/kpm/profiles/' + row.id }, 
                        class: '',
                        permissions: ['opd'],
                    },
                    {
                        label: 'Penilaian Ulang', type: 'link', 
                        url: row => { return '/kpm/profiles/' + row.id + '/assessment' }, 
                        class: '',
                        condition: row => row.stage == 'stage_7',
                        permissions: ['pelaksana'],
                    },
                    {
                        label: 'Detail', type: 'link', 
                        url: row => { return '/kpm/profiles/' + row.id }, 
                        class: '',
                        condition: row => row.stage != 'stage_7',
                        permissions: ['pelaksana'],
                    },
                ],
                headerActions: [],
            }
        })

    }

    async recommendations(ctx){
    
        if(!ctx.state)
        {
            ctx.state = this.config.state
            ctx.state.success = ctx.flash("success");
        }

        ctx.onMounted(() => {

            if(!ctx.state.loaded) {
                ctx.state.loaded = true;
                this.loadFilteredData(ctx, '/kpm/profile-recommendations');
            }

            ctx.on('#searchForm', 'submit', e => {
                e.preventDefault()

                const search = document.querySelector('input[name=search]').value

                ctx.redirect('/kpm/profile-recommendations/?search=' + search)

                return false;
            })
        })

        return await view.render('crud/index', {
            ...ctx.state, 
            baseUrl: this.config.baseUrl, 
            list: {
                title: 'Rekomendasi Graduasi',
                subtitle: 'Daftar Profil KPM yang telah mendapatkan rekomendasi graduasi',
                createLabel: '',
                breadcrumbs: [],
                columns: [
                    {label: 'No. KK', key: 'family_number', cellClass: 'text-secondary font-monospace small'},
                    {label: 'NIK', key: 'personal_number', cellClass: 'text-secondary font-monospace small'},
                    {label: 'Nama', key: 'name', cellClass: 'fw-semibold text-dark'},
                ],
                filters: [],
                actions: [
                    {
                        label: 'Konfirmasi', type: 'link', 
                        url: row => { return '/kpm/profiles/' + row.id + '/confirm'}, 
                        class: '',
                        condition: row => {
                            return row.stage == 'stage_8' && row.status == 'Menunggu Verifikasi'
                        },
                        permissions: ['desa'],
                    },
                    {
                        label: 'Detail', type: 'link', 
                        url: row => { return '/kpm/profiles/' + row.id }, 
                        class: '',
                        permissions: ['desa'],
                    },
                ],
                headerActions: [],
            }
        })

    }

    async loadFilteredData(ctx, endpoint){
        ctx.state.query.search = ctx.query.search ?? ''
        ctx.state.query.page = ctx.query.page ?? 1
        
        const response = await ctx.http.get(endpoint, {
            query: ctx.state.query
        })

        ctx.state.data = response.data
        ctx.state.isLoading = false
        ctx.state.meta = response.meta
        ctx.refresh()
    }
}