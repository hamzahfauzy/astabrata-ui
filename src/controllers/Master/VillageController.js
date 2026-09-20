import { CrudController } from "../CrudController.js";

export default class VillageController extends CrudController {

    config = {
        baseUrl: '/master/villages',
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
            endpoint: '/villages',
            query: {
                per_page: 20,
                page: 1,
                search: ''
            },
            loaded: false,
            isLoading: true
        },
        searchFields: [],
        list: {
            title: 'Desa / Kelurahan',
            subtitle: 'Daftar Desa / Kelurahan',
            createLabel: 'Input Data Desa / Kelurahan',
            breadcrumbs: [],
            columns: [
                {label: 'Kecamatan', key: 'region_name'},
                {label: 'Nama', key: 'name'},
            ],
            filters: [],
            actions: [
                // {
                //     label: 'View', type: 'link', 
                //     url: row => { return '/master/villages/' + row.id }, 
                //     class: '',
                //     permissions: ['villages.view'],
                // },
                {
                    label: 'Edit', type: 'link', 
                    url: row => { return '/master/villages/' + row.id + '/edit' }, 
                    class: '',
                    permissions: ['villages.edit'],
                },
                {
                    label: 'Delete', type: 'button', 
                    class: 'btn-delete text-danger',
                    permissions: ['villages.delete'],
                },
            ],
            headerActions: [
                {
                    label: '<i class="bi bi-plus-lg me-2"></i> Input Data Desa / Kelurahan', route: '/master/villages/create', 
                    class: 'btn btn-primary', permissions: ['villages.create'],
                    type: 'link'
                }
            ],
        },
        view: {
            breadcrumbs: [
                {label: 'Desa / Kelurahan', route: '/master/villages'}
            ],
            title: 'Detail Desa / Kelurahan',
            subtitle: 'Data Detail Desa / Kelurahan',
            fields: [
                {label: 'Nama', key: 'name'},
            ],
        },
        create: {
            title: 'Input Data Desa / Kelurahan',
            subtitle: 'Isi form dibawah ini',
            breadcrumbs: [
                {label: 'Desa / Kelurahan', route: '/master/villages'}
            ],
            fields: [
                {
                    name: 'region_id', label: 'Kecamatan', 
                    type: 'select',
                    options: [],
                    ajax: {
                        response: {value: 'id', label: 'name'},
                        url: '/regions?per_page=25',
                    },
                    required: true
                },
                {name: 'name', label: 'Nama', type: 'text', required: true},
            ],
        },
        edit: {
            title: 'Edit Desa / Kelurahan',
            subtitle: 'Isi form untuk mengedit data Desa / Kelurahan',
            breadcrumbs: [
                {label: 'Desa / Kelurahan', route: '/master/villages'}
            ],
            fields: [
                {
                    name: 'region_id', label: 'Kecamatan', 
                    type: 'select',
                    options: [],
                    ajax: {
                        response: {value: 'id', label: 'name'},
                        url: '/regions?per_page=25',
                    },
                    required: true
                },
                {name: 'name', label: 'Nama', type: 'text', required: true},
            ],
        },
    }

}