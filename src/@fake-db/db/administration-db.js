import mock from '../mock';
import { FuseUtils } from '@fuse';
import _ from '@lodash';


const administrationDB = {
    entites: [
        {
            'id': '1',
            'name': 'Commun'
        },
        {
            'id': '2',
            'name': 'Client'
        },
        {
            'id': '3',
            'name': 'Candidat'
        },
        {
            'id': '4',
            'name': 'Affaire'
        },
        {
            'id': '5',
            'name': 'Secteur D\'activité'
        }
    ],
    columns: [
        {
            'id': '1',
            'name': 'Pays',
            'entiteId': '1'
        },
        {
            'id': '2',
            'name': 'Ville',
            'entiteId': '1'
        },
        {
            'id': '3',
            'name': 'Colonne1',
            'entiteId': '2'
        },
        {
            'id': '4',
            'name': 'Colonne2',
            'entiteId': '3'
        }, {
            'id': '5',
            'name': 'Colonne3',
            'entiteId': '4'
        },
        {
            'id': '6',
            'name': 'Banques',
            'entiteId': '5'
        },
        {
            'id': '7',
            'name': 'Assurance',
            'entiteId': '5'
        },
        {
            'id': '8',
            'name': 'Aéronautique',
            'entiteId': '5'
        },
    ],
    referentiels: [
        {
            'id': '1',
            'value': 'France',
            'columnId': '1'
        },
        {
            'id': '2',
            'value': 'Espagne',
            'columnId': '1'
        },
        {
            'id': '3',
            'value': 'Italie',
            'columnId': '1'
        },
        {
            'id': '4',
            'value': 'Valeur1',
            'columnId': '2'
        },
        {
            'id': '5',
            'value': 'Valeur2',
            'columnId': '2'
        },
        {
            'id': '6',
            'value': 'Valeur3',
            'columnId': '3'
        },
        {
            'id': '7',
            'value': 'Valeur4',
            'columnId': '3'
        },
        {
            'id': '8',
            'value': 'CIC',
            'columnId': '6'
        },
        {
            'id': '9',
            'value': 'BMCI',
            'columnId': '6'
        },
        {
            'id': '10',
            'value': 'AXA',
            'columnId': '7'
        },
        {
            'id': '11',
            'value': 'Allianz',
            'columnId': '7'
        },
        {
            'id': '12',
            'value': 'ARM',
            'columnId': '8'
        },
        {
            'id': '13',
            'value': 'MRO',
            'columnId': '8'
        }
    ],
    profiles: [
        {
            'id': '1',
            'name': 'profile1',
            'description': 'description1',
            authorities: ['1', '2', '3']

        },
        {
            'id': '2',
            'name': 'profile2',
            'description': 'description2',
            authorities: ['2', '3']
        },
        {
            'id': '3',
            'name': 'profile3',
            'description': 'description3',
            authorities: ['3', '5']
        }
    ],
    authorities: [
        {
            id: '1',
            name: 'permission1',
            moduleId: '1'
        },
        {
            id: '2',
            name: 'permission2',
            moduleId: '1'
        },
        {
            id: '3',
            name: 'permission3',
            moduleId: '1'
        },
        {
            id: '4',
            name: 'permission4',
            moduleId: '2'
        },
        {
            id: '5',
            name: 'permission5',
            moduleId: '2'
        },
        {
            id: '6',
            name: 'permission6',
            moduleId: '5'
        },

    ],

    modules: [
        {
            id: '1',
            name: 'module1'
        },
        {
            id: '2',
            name: 'module2'
        },
        {
            id: '3',
            name: 'module3'
        },
        {
            id: '4',
            name: 'module4'
        },
        {
            id: '5',
            name: 'module5'
        },

    ],
    secteur: [
        {
            'id': '1',
            'name': 'Banques',
            'entiteId': '5'
        },
        {
            'id': '2',
            'name': 'Assurance',
            'entiteId': '5'
        },
        {
            'id': '3',
            'name': 'Aéronautique',
            'entiteId': '5'
        },
    ],
    Provenance: [
        {
            'id': '1',
            'name': 'Réseau',

        },
        {
            'id': '2',
            'name': 'partenaire',

        },
        {
            'id': '3',
            'name': 'prospection',

        },
        {
            'id': '4',
            'name': 'appel d’offre',

        }
    ],
    societes: [
        {
            'id': '1',
            'nom': 'SGMB',
            'selectedSecteur': '1',
            'informations':'constructeur voiture intéressé par java',
            'selectedEtat':'prospect',
            'coordonne':'',
            'societeMere': '2',
            'provenance': '1',
            'tva': '23',
            'siret': 'FD',
            'statutJuridique': 'SARL',
            'rcs': 'SS'
        },
        {
            'id': '2',
            'nom': 'ATW',
            'selectedSecteur': 'data',
            'informations':'societe de telecome intéressé par javaScript',
            'selectedEtat':'Client',
            'societeMere': 'eur',
            'Provenance': '3'

        },
        {
            'id': '3',
            'societe': 'AXA',
            'selectedSecteur': '3',
            'informations':'societe de cablage intéressé par profile de test',
            'selectedEtat':'Partenaire',
            'societeMere': '1',
            'Provenance': '3'
        }
    ],
    villes: [
        {
            'id': '1',
            'name': 'paris',
        },
        {
            'id': '2',
            'name': 'nante',
        },
        {
            'id': '3',
            'name': 'lyon',
        }
    ],
    pays: [
        {
            'id': '1',
            'name': 'maroc',
        },
        {
            'id': '2',
            'name': 'malie',
        },
        {
            'id': '3',
            'name': 'algerie',
        }
    ],
    societeMere: [
        {
            'id': '1',
            'name': 'data',
        },
        {
            'id': '2',
            'name': 'tf1',
        },
        {
            'id': '3',
            'name': 'canal',
        }
    ],
    contacts: [
        {
            'id': '1',
            'contact': 'ahmed',
            'fonction': 'chef',
            'service': 'DSI',
            'idProspect': '2',
            'telephone': '02244343533',
            'adresse': 'paris 14005 ; rue far'
        },
        {
            'id': '2',
            'contact': 'sara',
            'fonction': 'scrum',
            'service': 'management',
            'idProspect': '2',
            'telephone': '43434334',
            'adresse': 'paris 14005 ; rue far'
        },
        {
            'id': '3',
            'contact': 'roben',
            'fonction': 'team',
            'service': 'DR',
            'idProspect': '1',
            'telephone': '022473533',
            'adresse': 'paris 14005 ; rue far'

        },
        
    ],
    etat: [
        {
            'id': '1',
            'name': 'Prospect',

        },
        {
            'id': '2',
            'name': 'Client',

        },
        {
            'id': '3',
            'name': 'Partenaire',

        },
        {
            'id': '4',
            'name': 'Archivé',

        },
        {
            'id': '5',
            'name': 'Fournisseur',

        },
    ]
    
};

mock.onGet('/api/administation/referentiels/entities/all').reply(() => {
    let response = [];
    response = administrationDB.entites;
    console.log(response);
    return [200, response];
});

mock.onGet('api/administation/referentiels/columns/byEntity').reply((request) => {
    let response;
    const { entityId } = request.params;
    response = administrationDB.columns.filter((_col) => _col.entiteId === entityId);
    console.log(response);
    return [200, response];
});


mock.onGet('/api/administation/referentiels').reply(() => {
    let response;
    response = administrationDB.referentiels;
    return [200, response];
});

mock.onPost('/api/administation/referentiels/save').reply((request) => {
    const data = JSON.parse(request.data);
    administrationDB.referentiels = [
        ...administrationDB.referentiels, {
            ...data.newReferentiel,
            id: FuseUtils.generateGUID()
        }
    ];
    return [200, administrationDB.referentiels];
});

mock.onPost('/api/administation/referentiels/update').reply((request) => {

    const data = JSON.parse(request.data);

    administrationDB.referentiels = administrationDB.referentiels.map((referentiel) => {
        if (data.referentiel.id === referentiel.id) {
            return data.referentiel
        }
        return referentiel
    });

    return [200, administrationDB.referentiels];
});


const deleteUri = '/api/administation/referentiels/remove';
mock.onDelete(deleteUri).reply((request) => {
    const data = request.params;
    administrationDB.referentiels = administrationDB.referentiels.filter((referentiel) => data !== referentiel.id);
    return [200, administrationDB.referentiels];
});

mock.onGet('/api/administration/authorities').reply(() => {
    let response = [];
    response = administrationDB.authorities;
    return [200, response];
});
mock.onGet('/api/administration/profiles').reply(() => {
    let response = [];
    response = administrationDB.profiles;
    return [200, response];
});

mock.onGet('/api/administration/modules').reply(() => {
    let response = [];
    response = administrationDB.modules;
    return [200, response];
});



mock.onGet('/api/administration/profile/').reply((request) => {
    const { profileId } = request.params;
    console.log(request.params);
    const response = _.find(administrationDB.profiles, { id: profileId });
    console.log("reeesp+" + response);
    return [200, response];
});

mock.onPost('/api/administration/profile/save').reply((request) => {
    const data = JSON.parse(request.data);
    let profile = null;

    administrationDB.profiles = administrationDB.profiles.map(_profile => {
        if (_profile.id === data.id) {
            profile = data;
            return profile
        }
        return _profile;
    });

    if (!profile) {
        profile = data;
        administrationDB.profiles = [
            ...administrationDB.profiles,
            profile
        ]
    }

    return [200, profile];
});


mock.onDelete('/api/administation/profiles/remove').reply((request) => {
    const data = request.params;
    administrationDB.profiles = administrationDB.profiles.filter((profile) => data !== profile.id);
    return [200, administrationDB.profiles];
});
mock.onGet('/api/crm/societe/secteurActivite').reply(() => {
    let response = [];
    response = administrationDB.secteur;
    return [200, response];
});

mock.onGet('/api/crm/societe/provenance').reply(() => {
    let response = []
    response = administrationDB.Provenance;
    return [200, response];
})
mock.onGet('/api/crm/societes').reply(() => {
    let response = [];
    response = administrationDB.societes;
    console.log("response" + response)
    return [200, response];
});
mock.onPost('/api/crm/societe').reply((request) => {
    const data = JSON.parse(request.data);
    let societe = null;

    administrationDB.societes = administrationDB.societes.map(_societe => {
        if (_societe.id === data.id) {
            societe = data;
            return societe
        }
        return _societe;
    });

    if (!societe) {
        societe = data;
        societe.id = FuseUtils.generateGUID();
        administrationDB.societes = [
            ...administrationDB.societes,
            societe

        ]
    }
    console.log(societe);
    return [200, societe];
});

mock.onDelete('/api/crm/societes/remove').reply((request) => {
    const data = request.params;
    administrationDB.societes = administrationDB.societes.filter((societe) => data !== societe.id);
    return [200, administrationDB.societes];
});

mock.onGet('/api/crm/societe/').reply((request) => {
    const { societeId } = request.params;
    let response;
    response = _.find(administrationDB.societes, { id: societeId });
    console.log(request.params);
    console.log(response)
    return [200, response];
});
mock.onGet('/api/crm/societe/ville').reply(() => {
    let response = [];
    response = administrationDB.villes;
    console.log("response" + response)
    return [200, response];
});
mock.onGet('/api/crm/societe/pays').reply(() => {
    let response = [];
    response = administrationDB.pays;
    console.log("response" + response)
    return [200, response];
});
mock.onGet('/api/crm/societe/societeMere').reply(() => {
    let response = [];
    response = administrationDB.societeMere;
    console.log("response" + response)
    return [200, response];
});
mock.onGet('/api/crm/societe/etat').reply(() => {
    let response = [];
    response = administrationDB.etat;
    console.log("response" + response)
    return [200, response];
});
mock.onPost('/api/crm/contacts/save').reply((request) => {
    const data = JSON.parse(request.data);

    administrationDB.contacts = [
        ...administrationDB.contacts, {
            ...data.newContact,

        }
    ];
    console.log(administrationDB.contacts)
    return [200, administrationDB.contacts];
});

mock.onGet('/api/crm/contacts').reply((request) => {
    let response
    const { societeId } = request.params;
     response = administrationDB.contacts.filter((_col) => _col.idSociete === societeId);
    console.log('request' + response)
    return [200, response];
});
mock.onPost('/api/crm/contacts/update').reply((request) => {

    const data = JSON.parse(request.data);
    console.log('dataupdate' + data.contact)
    administrationDB.contacts = administrationDB.contacts.map((contact) => {
        if (data.contact.id === contact.id) {
            return data.contact
        }
        return contact
    });

    return [200, administrationDB.contacts];
});
const deletUri = '/api/crm/contacts/remove';
mock.onDelete(deletUri).reply((request) => {
    const data = request.params;
    administrationDB.contacts = administrationDB.contacts.filter((contact) => data !== contact.id);
    return [200, administrationDB.contacts];
});