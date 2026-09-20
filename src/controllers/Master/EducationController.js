import { CrudController } from "../CrudController.js";

export default class EducationController extends CrudController {

    config = {
        baseUrl: '/master/educations',
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
            endpoint: '/educations',
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
            title: 'Jenjang Pendidikan',
            subtitle: 'Daftar Jenjang Pendidikan',
            createLabel: 'Input Data Jenjang Pendidikan',
            breadcrumbs: [],
            columns: [
                {label: 'Nama', key: 'name'},
            ],
            filters: [],
            actions: [
                // {
                //     label: 'View', type: 'link', 
                //     url: row => { return '/master/educations/' + row.id }, 
                //     class: '',
                //     permissions: ['educations.view'],
                // },
                {
                    label: 'Edit', type: 'link', 
                    url: row => { return '/master/educations/' + row.id + '/edit' }, 
                    class: '',
                    permissions: ['educations.edit'],
                },
                {
                    label: 'Delete', type: 'button', 
                    class: 'btn-delete text-danger',
                    permissions: ['educations.delete'],
                },
            ],
            headerActions: [
                {
                    label: '<i class="bi bi-plus-lg me-2"></i> Input Data Jenjang Pendidikan', route: '/master/educations/create', 
                    class: 'btn btn-primary', permissions: ['educations.create'],
                    type: 'link'
                }
            ],
        },
        view: {
            breadcrumbs: [
                {label: 'Jenjang Pendidikan', route: '/master/educations'}
            ],
            title: 'Detail Jenjang Pendidikan',
            subtitle: 'Data Detail Jenjang Pendidikan',
            fields: [
                {label: 'Nama', key: 'name'},
            ],
        },
        create: {
            title: 'Input Data Jenjang Pendidikan',
            subtitle: 'Isi form dibawah ini',
            breadcrumbs: [
                {label: 'Jenjang Pendidikan', route: '/master/educations'}
            ],
            fields: [
                {name: 'name', label: 'Nama', type: 'text', required: true},
            ],
        },
        edit: {
            title: 'Edit Jenjang Pendidikan',
            subtitle: 'Isi form untuk mengedit data Jenjang Pendidikan',
            breadcrumbs: [
                {label: 'Jenjang Pendidikan', route: '/master/educations'}
            ],
            fields: [
                {name: 'name', label: 'Nama', type: 'text', required: true},
            ],
        },
    }

}