import { CrudController } from "../CrudController.js";

export default class InstanceController extends CrudController {

    config = {
        baseUrl: '/master/instances',
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
            endpoint: '/instances',
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
            title: 'OPD',
            subtitle: 'Daftar OPD',
            createLabel: 'Input Data OPD',
            breadcrumbs: [],
            columns: [
                {label: 'Nama', key: 'name'},
            ],
            filters: [],
            actions: [
                // {
                //     label: 'View', type: 'link', 
                //     url: row => { return '/master/instances/' + row.id }, 
                //     class: '',
                //     permissions: ['instances.view'],
                // },
                {
                    label: 'Edit', type: 'link', 
                    url: row => { return '/master/instances/' + row.id + '/edit' }, 
                    class: '',
                    permissions: ['instances.edit'],
                },
                {
                    label: 'Delete', type: 'button', 
                    class: 'btn-delete text-danger',
                    permissions: ['instances.delete'],
                },
            ],
            headerActions: [
                {
                    label: '<i class="bi bi-plus-lg me-2"></i> Input Data OPD', route: '/master/instances/create', 
                    class: 'btn btn-primary', permissions: ['instances.create'],
                    type: 'link'
                }
            ],
        },
        view: {
            breadcrumbs: [
                {label: 'OPD', route: '/master/instances'}
            ],
            title: 'Detail OPD',
            subtitle: 'Data Detail OPD',
            fields: [
                {label: 'Nama', key: 'name'},
            ],
        },
        create: {
            title: 'Input Data OPD',
            subtitle: 'Isi form dibawah ini',
            breadcrumbs: [
                {label: 'OPD', route: '/master/instances'}
            ],
            fields: [
                {name: 'name', label: 'Nama', type: 'text', required: true},
            ],
        },
        edit: {
            title: 'Edit OPD',
            subtitle: 'Isi form untuk mengedit data OPD',
            breadcrumbs: [
                {label: 'OPD', route: '/master/instances'}
            ],
            fields: [
                {name: 'name', label: 'Nama', type: 'text', required: true},
            ],
        },
    }

}