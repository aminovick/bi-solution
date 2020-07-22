import mock from '../mock';
import { FuseUtils } from '@fuse';
import _ from '@lodash';

const candidatsDB = {

    candidats: [
        {
            "id": '1',
            "lastname": "BOUIZ",
            "firstname":"SAAD",
            fullname:'BOUIZ SAAD',
            dateNaissance:null,
            dateMAJ:"12/12/2000",
            statut:'Encours',
            "titre": "Dev Front End ",
            "disponibilite":"12/12/2019",
            "mobilite": "Europe",
            "active": true,
            email:"bouiz@aa.com",
            telephonefix:'0612345678',
            telephoneMobile:'09090909090',
            contratActual:'CDI',
            adresse:'09090909090',
            contratSouhaite:'CDI',
            codepostale:'98000',
            nbrAnneesExp:'8',
            niveauFormation:'bac+5',
            selectedSituationF :1,
            selectedNationalite :1,
             selectedMobilite :1,
            selectedDisponibilite :1,
             selectedProvenance :1,
             selectedResponsable :1,
             selectedPays :1,
            selectedVille :1,
            selectedDiplomes :1,
            selectedExperience :1,
            selectedLangues :1,
            selectedOutils :1,
            selectedDomaines :1,
            selectedContrats:1,
            selectedNivFormation:1

         
        },

        {
            "id": '2',
            "lastname": "christoph",
            "firstname":"Red",
            fullname:'christoph Red',
            dateNaissance:"12/12/2000",
            dateMAJ:"12/12/2000",
            statut:'Encours',
            "titre": "Dev Front End ",
            "disponibilite":"12/12/2019",
            "mobilite": "Europe",
            "active": true,
            email:"mail1@a111a.com",
            telephonefix:'08987686728',
            telephoneMobile:'08987686728',
            contratActual:'CDI',
            adresse:'09090909090',
            contratSouhaite:'CDI',
            codepostale:'98000',
            nbrAnneesExp:'8',
            niveauFormation:'bac+5',
            selectedSituationF :2,
            selectedNationalite :2,
            selectedMobilite :2,
            selectedDisponibilite :2,
            selectedProvenance :2,
            selectedResponsable :2,
            selectedPays :2,
            selectedVille :2,
            selectedDiplomes :2,
            selectedExperience :2,
            selectedLangues :2,
            selectedOutils :2,
            selectedDomaines :2,
            selectedContrats:2,
            selectedNivFormation:2
         
        },
        {
            "id": '3',
            "lastname": "Youssef",
            "firstname":"bossbaa",
            fullname:'Youssef bossbaa',
            dateNaissance:"12/12/2000",
            dateMAJ:"12/12/2000",
            statut:'Encours',
            "titre": "Dev Front End ",
            "disponibilite":"12/12/2019",
            "mobilite": "Europe",
            "active": true,
            email:"mail@aa.com",
            telephonefix:'090909090909',
            telephoneMobile:'09090909090',
            contratActual:'CDI',
            adresse:'09090909090',
            contratSouhaite:'CDI',
            codepostale:'98000',
            nbrAnneesExp:'8',
            niveauFormation:'bac+5',
            selectedSituationF :2,
            selectedNationalite :2,
             selectedMobilite :2,
            selectedDisponibilite :2,
             selectedProvenance :2,
             selectedResponsable :2,
             selectedPays :2,
            selectedVille :2,
            selectedDiplomes :2,
            selectedExperience :2,
            selectedLangues :2,
            selectedOutils :2,
            selectedDomaines :2,
            selectedContrats:2,
            selectedContratsSouhaite:3,
            selectedNivFormation:2
         
        }
    ],
    situationFList :[
        {
            "id": '1',
            "name": "libelle1"
        },
        {
            "id": '2',
            "name": "libelle2"
        },
        {
            "id": '3',
            "name": "libelle3"
        }
    ],
    nationaliteList :[
        {
            "id": '1',
            "name": "libelle1"
        },
        {
            "id": '2',
            "name": "libelle2"
        },
        {
            "id": '3',
            "name": "libelle3"
        }
    ],
    mobiliteList :[
        {
            "id": '1',
            "name": "libelle1"
        },
        {
            "id": '2',
            "name": "libelle2"
        },
        {
            "id": '3',
            "name": "libelle3"
        }
    ],

    disponibiliteList :[
        {
            "id": '1',
            "name": "libelle1"
        },
        {
            "id": '2',
            "name": "libelle2"
        },
        {
            "id": '3',
            "name": "libelle3"
        }
    ],
   
    provenanceList :[
        {
            "id": '1',
            "name": "libelle1"
        },
        {
            "id": '2',
            "name": "libelle2"
        },
        {
            "id": '3',
            "name": "libelle3"
        }
    ],
   
    responsableList :[
        {
            "id": '1',
            "name": "libelle1"
        },
        {
            "id": '2',
            "name": "libelle2"
        },
        {
            "id": '3',
            "name": "libelle3"
        }
    ],
   
    paysList :[
        {
            "id": '1',
            "name": "libelle1"
        },
        {
            "id": '2',
            "name": "libelle2"
        },
        {
            "id": '3',
            "name": "libelle3"
        }
    ],
   
    villeList :[
        {
            "id": '1',
            "name": "libelle1"
        },
        {
            "id": '2',
            "name": "libelle2"
        },
        {
            "id": '3',
            "name": "libelle3"
        }
    ],
   
    diplomeList :[
        {
            "id": '1',
            "name": "libelle1"
        },
        {
            "id": '2',
            "name": "libelle2"
        },
        {
            "id": '3',
            "name": "libelle3"
        }
    ],

    experienceList :[
        {
            "id": '1',
            "name": "libelle1"
        },
        {
            "id": '2',
            "name": "libelle2"
        },
        {
            "id": '3',
            "name": "libelle3"
        }
    ],
   
    languesList :[
        {
            "id": '1',
            "name": "libelle1"
        },
        {
            "id": '2',
            "name": "libelle2"
        },
        {
            "id": '3',
            "name": "libelle3"
        }
    ],
   
    outilsList :[
        {
            "id": '1',
            "name": "libelle1"
        },
        {
            "id": '2',
            "name": "libelle2"
        },
        {
            "id": '3',
            "name": "libelle3"
        }
    ],
    domaineList :[
        {
            "id": '1',
            "name": "libelle1"
        },
        {
            "id": '2',
            "name": "libelle2"
        },
        {
            "id": '3',
            "name": "libelle3"
        }
    ],
    niveauFormationList:[
        {
            "id": '1',
            "name": "libelle1"
        },
        {
            "id": '2',
            "name": "libelle2"
        },
        {
            "id": '3',
            "name": "libelle3"
        }
    ],
    contratsList:[
        {
            "id": '1',
            "name": "libelle1"
        },
        {
            "id": '2',
            "name": "libelle2"
        },
        {
            "id": '3',
            "name": "libelle3"
        }
    ],

};

mock.onGet('/api/ref/contrats').reply(() => {
    let response;
    response = candidatsDB.contratsList;
    return [200, response];
});

mock.onGet('/api/ref/situationF').reply(() => {
    let response;
    response = candidatsDB.situationFList;
    return [200, response];
});


mock.onGet('/api/ref/nationalites').reply(() => {
    let response;
    response = candidatsDB.nationaliteList;
    return [200, response];
});

mock.onGet('/api/ref/mobilities').reply(() => {
    let response;
    response = candidatsDB.mobiliteList;
    return [200, response];
});

mock.onGet('/api/ref/disponibilites').reply(() => {
    let response;
    response = candidatsDB.disponibiliteList;
    return [200, response];
});

mock.onGet('/api/ref/provenances').reply(() => {
    let response;
    response = candidatsDB.provenanceList;
    return [200, response];
});

mock.onGet('/api/ref/responsables').reply(() => {
    let response;
    response = candidatsDB.responsableList;
    return [200, response];
});


mock.onGet('/api/ref/pays').reply(() => {
    let response;
    response = candidatsDB.paysList;
    return [200, response];
});

mock.onGet('/api/ref/villes').reply(() => {
    let response;
    response = candidatsDB.villeList;
    return [200, response];
});

mock.onGet('/api/ref/diplomes').reply(() => {
    let response;
    response = candidatsDB.diplomeList;
    return [200, response];
});

mock.onGet('/api/ref/experiences').reply(() => {
    let response;
    response = candidatsDB.experienceList;
    return [200, response];
});

mock.onGet('/api/ref/langues').reply(() => {
    let response;
    response = candidatsDB.languesList;
    return [200, response];
});

mock.onGet('/api/ref/outils').reply(() => {
    let response;
    response = candidatsDB.outilsList;
    console.log(response);
    return [200, response];
});
mock.onGet('/api/ref/domaines').reply(() => {
    let response;
    response = candidatsDB.domaineList;
    console.log(response);
    return [200, response];
});

mock.onGet('/api/ref/nivformation').reply(() => {
    let response;
    response = candidatsDB.niveauFormationList;
    return [200, response];
});


mock.onGet('/api/crm/candidats').reply(() => {
    let response;
    response = candidatsDB.candidats;
    
    return [200, response];
});


mock.onGet('/api/crm/candidat/').reply((request) => {
    const { candidatId } = request.params;
    let response;
      response = _.find(candidatsDB.candidats, { id: candidatId });
      console.log(response);
    return [200, response];
});

mock.onPost('/api/crm/candidats').reply((request) => {
    const data = JSON.parse(request.data);
    let candidat = null;
data.fullname=data.lastname + " " + data.firstname;
data.dateMAJ=new Date();
console.log(data);
    candidatsDB.candidats = candidatsDB.candidats.map(_candidat => {
        if (_candidat.id === data.id) {
            candidat = data;
            return candidat
        }
        return _candidat;
    });

    if (!candidat) {
        candidat = data;
        candidatsDB.candidats = [
            ...candidatsDB.candidats,
            candidat
        ]
    }

    return [200, candidat];
});





