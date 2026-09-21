import view from "../core/view.js";

export default async function (props, ctx) {
    const userData = ctx.app.getGlobal('userData')
    const response = await ctx.http.get('/kpm/dashboard')
    var compName = 'default'
    if(userData.roles.map(role => role.name).includes('Admin Kabupaten'))
    {
        compName = 'kabupaten'
    }
    else if(userData.roles.map(role => role.name).includes('Desa'))
    {
        compName = 'desa'
    }
    else if(userData.roles.map(role => role.name).includes('Pendamping'))
    {
        compName = 'pendamping'
    }
    else if(userData.roles.map(role => role.name).includes('Kecamatan'))
    {
        compName = 'kecamatan'
    }
    else if(userData.roles.map(role => role.name).includes('Dinsos'))
    {
        compName = 'dinsos'
    }
    else if(userData.roles.map(role => role.name).includes('OPD'))
    {
        compName = 'opd'
    }
    else if(userData.roles.map(role => role.name).includes('Asesor'))
    {
        compName = 'asesor'
    }
    
    return view.render('components/dashboard/' + compName, {
        data: response.data
    })
}