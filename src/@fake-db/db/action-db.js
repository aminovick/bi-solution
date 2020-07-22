import mock from './../mock';
const ACTIONDB = {
    actions  : [
        {
            'id'       : '561551bd7fe2ff461101c192',
            'titre'    : 'bi solution',
            'notes'    : 'gestion administratife',
            'selectedResponsable':'ali',
            'dateDebut': new Date(2018, 8, 3),
            'DateEcheance'  : new Date(2018, 8, 5),
            'completed': false,
            'starred'  : false,
            'important': false,
            'deleted'  : false,
            'labels'   : [1]
        },
        {
            'id'       : '561551bd7fe2ff461101c193',
            'titre'    : 'big data',
            'notes'    : 'gestion des actions',
            'selectedResponsable':'sara',
            'dateDebut': new Date(2018, 8, 3),
            'DateEcheance'  : new Date(2018, 8, 5),
            'completed': false,
            'starred'  : false,
            'important': false,
            'deleted'  : false,
            'labels'   : [1]
        }
    ],
    folders: [
        {
            'id'    : 0,
            'handle': 'all',
            'title' : 'All',
            'icon'  : 'view_headline'
        }
    ],
    filters: [
        {
            'id'    : 0,
            'handle': 'starred',
            'title' : 'Tache a realiser',
            'icon'  : 'star'
        },
        {
            'id'    : 1,
            'handle': 'important',
            'title' : 'Taches importantes',
            'icon'  : 'error'
        },
        {
            'id'    : 2,
            'handle': 'dueDate',
            'title' : 'Taches prévues',
            'icon'  : 'schedule'
        },
        {
            'id'    : 3,
            'handle': 'today',
            'title' : 'Aujourd\'hui',
            'icon'  : 'today'
        },
        {
            'id'    : 4,
            'handle': 'completed',
            'title' : 'taches achevées',
            'icon'  : 'check'
        },
        {
            'id'    : 5,
            'handle': 'deleted',
            'title' : 'taches supprimer',
            'icon'  : 'delete'
        }
    ],
    labels : [
        {
            'id'    : 1,
            'handle': 'frontend',
            'title' : 'Frontend',
            'color' : '#388E3C'
        },
        {
            'id'    : 2,
            'handle': 'backend',
            'title' : 'Backend',
            'color' : '#F44336'
        },
        {
            'id'    : 3,
            'handle': 'api',
            'title' : 'API',
            'color' : '#FF9800'
        },
        {
            'id'    : 4,
            'handle': 'issue',
            'title' : 'Blocages',
            'color' : '#0091EA'
        },
        {
            'id'    : 5,
            'handle': 'mobile',
            'title' : 'Mobile',
            'color' : '#9C27B0'
        }
    ],
   
};
mock.onGet('/api/action-app/actions').reply((config) => {
    const params = config.params;
    console.log(params)
    let response = [];
    if ( params.labelHandle )
    {
        const labelId = ACTIONDB.labels.find(label => label.handle === params.labelHandle).id;

        response = ACTIONDB.actions.filter((action) => action.labels.includes(labelId) && !action.deleted);
    }
    else if ( params.filterHandle )
    {
        if ( params.filterHandle === 'deleted' )
        {
            response = ACTIONDB.actions.filter((action) => action.deleted);
        }
        else
        {
            response = ACTIONDB.actions.filter((action) => action[params.filterHandle] && !action.deleted);
        }
    }
    else // folderHandle
    {
        let folderHandle = params.folderHandle;
        if ( !folderHandle )
        {
            folderHandle = 'all';
        }

        if ( folderHandle === 'all' )
        {
            response = ACTIONDB.actions.filter((action) => !action.deleted);
        }
        else
        {
            const folderId = ACTIONDB.folders.find(folder => folder.handle === folderHandle).id;
            response = ACTIONDB.actions.filter((action) => action.folder === folderId && !action.deleted);
        }
    }

    return [200, response];
});

mock.onPost('/api/action-app/update-action').reply((request) => {
    const action = JSON.parse(request.data);

    ACTIONDB.actions = ACTIONDB.actions.map((_action) => {
        if ( _action.id === action.id )
        {
            return action;
        }
        return _action;
    });
    console.log(action)
    return [200, action];
});

mock.onPost('/api/action-app/new-action').reply((request) => {
    const action = JSON.parse(request.data);

    ACTIONDB.actions = [
        action,
        ...ACTIONDB.actions
    ];

    return [200, action];
});

mock.onPost('/api/action-app/remove-action').reply((request) => {
    const actionId = request.data;
    ACTIONDB.actions = ACTIONDB.actions.map((_action) => {
        if ( _action.id === actionId )
        {
            _action.deleted = true
        }
        return _action;
    });
    return [200, actionId];
});

mock.onGet('/api/action-app/filters').reply(200, ACTIONDB.filters);
mock.onGet('/action/action-app/labels').reply(200, ACTIONDB.labels);
mock.onGet('/api/action-app/folders').reply(200, ACTIONDB.folders);


mock.onPost('/api/action-app/set-folder').reply((request) => {
    const data = JSON.parse(request.data);
    const {selectedActionIds, folderId} = data;
    ACTIONDB.actions = ACTIONDB.actions.map((_action) => {

        if ( selectedActionIds.includes(_action.id) )
        {
            return {
                ..._action,
                folder: folderId
            };
        }
        return _action;
    });

    return [200];
});

mock.onPost('/api/action-app/toggle-label').reply((request) => {
    const data = JSON.parse(request.data);
    const {selectedActionIds, labelId} = data;
    ACTIONDB.actions = ACTIONDB.actions.map((_action) => {
        if ( selectedActionIds.includes(_action.id) )
        {
            return {
                ..._action,
                labels: _action.labels.includes(labelId) ? _action.labels.filter(_id => _id !== labelId) : [..._action.labels, labelId]
            };
        }
        return _action;
    });

    return [200];
});
mock.onPost('/api/action-app/delete-actions').reply((request) => {
    const data = JSON.parse(request.data);
    const {selectedActionIds} = data;
    ACTIONDB.actions = ACTIONDB.actions.filter((_action) => selectedActionIds.includes(_action.id) ? false : _action);
    return [200];
});
