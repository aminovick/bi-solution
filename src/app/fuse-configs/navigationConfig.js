const navigationConfig = [
    {
        'id'   : 'home-page',
        'title': 'Home',
        'type' : 'item',
        'icon' : 'home',
        'url'  : '/'
    },
    {
        'id'      : 'administration',
        'title'   : 'Administration',
        'type'    : 'group',
        'icon'    : 'apps',
        'url'     : '/administration',
        'children': [
            {
                'id'   : 'users',
                'title': 'Utilisateurs',
                'type' : 'item',
                'icon' : 'account_box',
                'url'  : '/administration/users'
            },
            {
                'id'   : 'profiles',
                'title': 'Profiles',
                'type' : 'item',
                'icon' : 'account_box',
                'url'  : '/administration/profiles'
            },
            {

                'id'   : 'referentiels',
                'title': 'Référentiel',
                'type' : 'item',
                'icon' : 'account_box',
                'url'  : '/administration/referentiels'
            }  ,
            
           
        ]
    },
    {
        'id'      : 'crm',
        'title'   : 'CRM',
        'type'    : 'group',
        'icon'    : 'apps',
        'url'     : '/crm',
        'children': [
            {
                'id'   : 'societes',
                'title': 'Societes',
                'type' : 'item',
                'icon' : 'account_box',
                'url'  : '/crm/societes'
            }    
           
        ]
    },
    {
        'id'      : 'candidats',
        'title'   : 'Candidats',
        'type'    : 'item',
        'icon'    : 'apps',
        'url'     : '/crm/candidats',
    },
    {
        'id'      : 'prospects',
        'title'   : 'PROSPECTS',
        'type'    : 'group',
        'icon'    : 'apps',
        'url'     : '/prospects',
    },
    {
        'id'      : 'actions',
        'title'   : 'Actions',
        'type'    : 'item',
        'icon'    : 'apps',
        'url'     : '/action',
    }
];

export default navigationConfig;
