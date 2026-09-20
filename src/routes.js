import Route from "../src/core/routes.js";
import Http from "./core/http.js";
import { isAuthenticated } from "./libs/functions.js";

const userData = {}

// AUTH ROUTE

Route.add("/login", 'views/layouts/auth', function(){
    document.title = 'Login'
}, ['AuthController', 'index'])

Route.add("/forget-password", 'views/layouts/auth', function(){
    document.title = 'Forget Password'
}, ['AuthController', 'forgetPassword'])

// APP ROUTE

Route.add("/", 'views/layouts/app', isAuthenticated, function(){
    document.title = 'Dashboard'
}, ['IndexController', 'index'])

// Route.add('/setting', 'views/layouts/app', isAuthenticated, () => {
//     document.title = 'Setting'
// }, ['IndexController','setting'])

Route.add('/profile/edit', 'views/layouts/app', isAuthenticated, () => {
    document.title = 'Edit Profile'
}, ['IndexController','editProfile'])

Route.add('/profile', 'views/layouts/app', isAuthenticated, () => {
    document.title = 'Profile'
}, ['IndexController','profile'])

Route.add('/users', 'views/layouts/app', isAuthenticated, () => {
    document.title = 'Users'
}, ['UserController','index'])

Route.add('/users/create', 'views/layouts/app', isAuthenticated, () => {
    document.title = 'Create User'
}, ['UserController','create'])

Route.add('/users/:id/edit', 'views/layouts/app', isAuthenticated, () => {
    document.title = 'Edit User'
}, ['UserController','edit'])

Route.add('/users/:id', 'views/layouts/app', isAuthenticated, () => {
    document.title = 'Detail User'
}, ['UserController','show'])

Route.add('/roles', 'views/layouts/app', isAuthenticated, () => {
    document.title = 'Roles'
}, ['RoleController','index'])

Route.add('/roles/create', 'views/layouts/app', isAuthenticated, () => {
    document.title = 'Create Role'
}, ['RoleController','create'])

Route.add('/roles/:id/edit', 'views/layouts/app', isAuthenticated, () => {
    document.title = 'Edit Role'
}, ['RoleController','edit'])

Route.add('/roles/:id', 'views/layouts/app', isAuthenticated, () => {
    document.title = 'Detail Role'
}, ['RoleController','show'])

// MASTER ROUTE

Route.add('/master/regions', 'views/layouts/app', isAuthenticated, () => {
    document.title = 'Kecamatan'
}, ['Master/RegionController','index'])

Route.add('/master/regions/create', 'views/layouts/app', isAuthenticated, () => {
    document.title = 'Input Data Kecamatan'
}, ['Master/RegionController','create'])

Route.add('/master/regions/:id/edit', 'views/layouts/app', isAuthenticated, () => {
    document.title = 'Edit Kecamatan'
}, ['Master/RegionController','edit'])


Route.add('/master/villages', 'views/layouts/app', isAuthenticated, () => {
    document.title = 'Desa / Kelurahan'
}, ['Master/VillageController','index'])

Route.add('/master/villages/create', 'views/layouts/app', isAuthenticated, () => {
    document.title = 'Input Data Desa / Kelurahan'
}, ['Master/VillageController','create'])

Route.add('/master/villages/:id/edit', 'views/layouts/app', isAuthenticated, () => {
    document.title = 'Edit Desa / Kelurahan'
}, ['Master/VillageController','edit'])


Route.add('/master/instances', 'views/layouts/app', isAuthenticated, () => {
    document.title = 'OPD'
}, ['Master/InstanceController','index'])

Route.add('/master/instances/create', 'views/layouts/app', isAuthenticated, () => {
    document.title = 'Input Data OPD'
}, ['Master/InstanceController','create'])

Route.add('/master/instances/:id/edit', 'views/layouts/app', isAuthenticated, () => {
    document.title = 'Edit OPD'
}, ['Master/InstanceController','edit'])


Route.add('/master/educations', 'views/layouts/app', isAuthenticated, () => {
    document.title = 'Jenjang Pendidikan'
}, ['Master/EducationController','index'])

Route.add('/master/educations/create', 'views/layouts/app', isAuthenticated, () => {
    document.title = 'Input Data Jenjang Pendidikan'
}, ['Master/EducationController','create'])

Route.add('/master/educations/:id/edit', 'views/layouts/app', isAuthenticated, () => {
    document.title = 'Edit Jenjang Pendidikan'
}, ['Master/EducationController','edit'])


Route.add('/master/periods', 'views/layouts/app', isAuthenticated, () => {
    document.title = 'Periode'
}, ['Master/PeriodController','index'])

Route.add('/master/periods/create', 'views/layouts/app', isAuthenticated, () => {
    document.title = 'Input Data Periode'
}, ['Master/PeriodController','create'])

Route.add('/master/periods/:id/edit', 'views/layouts/app', isAuthenticated, () => {
    document.title = 'Edit Periode'
}, ['Master/PeriodController','edit'])


// KPM ROUTE
Route.add('/kpm/profiles', 'views/layouts/app', isAuthenticated, () => {
    document.title = 'Profil KPM'
}, ['Kpm/ProfileController','index'])

Route.add('/kpm/profiles/create', 'views/layouts/app', isAuthenticated, () => {
    document.title = 'Input Data Profil KPM'
}, ['Kpm/ProfileController','create'])

Route.add('/kpm/profiles/:id/edit', 'views/layouts/app', isAuthenticated, () => {
    document.title = 'Edit Profil KPM'
}, ['Kpm/ProfileController','edit'])

Route.add('/kpm/profiles/:id', 'views/layouts/app', isAuthenticated, () => {
    document.title = 'Detail Profil KPM'
}, ['Kpm/ProfileController','show'])

Route.add('/monev', 'views/layouts/app', isAuthenticated, () => {
    document.title = 'Monitoring'
}, ['IndexController','monev'])

Route.add('/graduasi', 'views/layouts/app', isAuthenticated, () => {
    document.title = 'Graduasi'
}, ['IndexController','graduasi'])

Route.add('/pasca-graduasi', 'views/layouts/app', isAuthenticated, () => {
    document.title = 'Pasca Graduasi'
}, ['IndexController','pascaGraduasi'])

Route.add('/penilaian-ulang', 'views/layouts/app', isAuthenticated, () => {
    document.title = 'Penilaian Ulang'
}, ['IndexController','penilaianUlang'])

Route.add('/uep', 'views/layouts/app', isAuthenticated, () => {
    document.title = 'UEP'
}, ['IndexController','uep'])


export default Route.getRoutes();