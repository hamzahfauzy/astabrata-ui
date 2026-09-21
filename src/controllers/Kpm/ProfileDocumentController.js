import { storageUrl } from "../../config/env.js";
import { CrudController } from "../CrudController.js";

export default class ProfileDocumentController extends CrudController {

    config = {
        baseUrl: '/kpm/profile-documents',
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
            endpoint: '/kpm/profile-documents',
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
            title: 'Dokumen',
            subtitle: 'Daftar Dokumen',
            createLabel: 'Create Role',
            breadcrumbs: [],
            columns: [
                {label: 'No. KK', key: 'family_number'},
                {label: 'NIK', key: 'personal_number'},
                {label: 'Nama', key: 'name'},
                {label: 'Dokumen', key: 'document_name'},
                {label: 'File', key: 'file_url', value: (data, row) => {
                    return '<a href="'+storageUrl+row.file_url+'" target="_blank">Lihat File</a>'
                }},
            ],
            filters: [],
            actions: [],
            headerActions: [],
        },
    }

}