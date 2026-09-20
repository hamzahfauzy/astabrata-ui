import { CrudController } from "../CrudController.js";

export default class RegionController extends CrudController {

    config = {
        baseUrl: '/master/regions',
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
            endpoint: '/regions',
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
            title: 'Kecamatan',
            subtitle: 'Daftar Kecamatan',
            createLabel: 'Input Data Kecamatan',
            breadcrumbs: [],
            columns: [
                {label: 'Nama', key: 'name'},
            ],
            filters: [],
            actions: [
                // {
                //     label: 'View', type: 'link', 
                //     url: row => { return '/master/regions/' + row.id }, 
                //     class: '',
                //     permissions: ['regions.view'],
                // },
                {
                    label: 'Edit', type: 'link', 
                    url: row => { return '/master/regions/' + row.id + '/edit' }, 
                    class: '',
                    permissions: ['regions.edit'],
                },
                {
                    label: 'Delete', type: 'button', 
                    class: 'btn-delete text-danger',
                    permissions: ['regions.delete'],
                },
            ],
            headerActions: [
                {
                    label: '<i class="bi bi-plus-lg me-2"></i> Input Data Kecamatan', route: '/master/regions/create', 
                    class: 'btn btn-primary', permissions: ['regions.create'],
                    type: 'link'
                }
            ],
        },
        view: {
            breadcrumbs: [
                {label: 'Kecamatan', route: '/master/regions'}
            ],
            title: 'Detail Kecamatan',
            subtitle: 'Data Detail Kecamatan',
            fields: [
                {label: 'Nama', key: 'name'},
            ],
        },
        create: {
            title: 'Input Data Kecamatan',
            subtitle: 'Isi form dibawah ini',
            breadcrumbs: [
                {label: 'Kecamatan', route: '/master/regions'}
            ],
            fields: [
                {name: 'name', label: 'Nama', type: 'text', required: true},
            ],
        },
        edit: {
            title: 'Edit Kecamatan',
            subtitle: 'Isi form untuk mengedit data kecamatan',
            breadcrumbs: [
                {label: 'Kecamatan', route: '/master/regions'}
            ],
            fields: [
                {name: 'name', label: 'Nama', type: 'text', required: true},
            ],
        },
    }

}