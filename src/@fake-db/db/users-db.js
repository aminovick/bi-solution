import mock from '../mock';
import { FuseUtils } from '@fuse';
import _ from '@lodash';

const userDB = {

    users: [
        {
            'id': '1',
            'username': 't1',
            'firstName': 'nabil',
            'lastName': 'salami',
            'email': 'ahmedahmed@gmail.com',
            'password': "",
            'confirmation': "",
            'date': "",
            'active': true,
            'profiles': [],
            'profilSelected': [
                'Profile 2',
                'Profile 4'
            ],

        },

        {
            "id": '2',
            "username": "t3",
            "firstName": "ahmaed",
            "lastName": "salami",
            "email": "ahmedahmed@gmail.com",
            "password": "",
            "confirmation": "",
            "date": "",
            "active": true,
            "profiles": [],
            "profilSelected": [
                "Profile 2",
                "Profile 4"
            ],

        },
        {
            "id": '3',
            "username": "t7",
            "firstName": "adil",
            "lastName": "asdel",
            "email": "adil@gmail.com",
            "password": "",
            "confirmation": "",
            "date": "",
            "active": true,
            "profiles": [],
            "profilSelected": [
                "Profile 2",
                "Profile 3",
                "Profile 4",
                "Profile 5"
            ],

        },
        {
            "id": '4',
            "username": "ali",
            "firstName": "alaa",
            "lastName": "ahmed",
            "email": "ahmedahmed@gmail.com",
            "password": "",
            "confirmation": "",
            "date": "",
            "active": true,
            "profiles": [],
            "profilSelected": [
                "Profile 2",
                "Profile 5"
            ],

        }
    ],
    profiles: [
        {
            'id': '1',
            'name': 'profile1'
        },
        {
            'id': '2',
            'name': 'profile2'
        },
        {
            'id': '3',
            'name': 'profile3'
        },
        {
            'id': '4',
            'name': 'profile4'
        },
        ,
        {
            'id': '5',
            'name': 'profile5'
        }
    ],



};



mock.onGet('/api/administration/user/').reply((request) => {
    const { userId } = request.params;
    let response;
      response = _.find(userDB.users, { id: userId });
        console.log(request.params);
        console.log(response)
    return [200, response];
});
mock.onGet('/api/administation/users').reply(() => {
  
      const  response =userDB.users
    return [200, response];
});

mock.onPost('/api/administation/users').reply((request) => {
    const data = JSON.parse(request.data);
    console.log("data" + data)
    let user = null;
    userDB.users=userDB.users.map(_user => {
        if (_user.id === data.id) {
            user = data;
            return user
        }
        return _user;
    });

    if (!user) {
        user = data;
        userDB.users = [
            ...userDB.users,
            user
        ]
    }
    return [200, user];

   
});

mock.onGet('/api/administation/profiles').reply(() => {
 
    let response;
    
    response = userDB.profiles;
    return [200, response];
});
const deleteUri = '/api/administation/user/remove';
mock.onDelete(deleteUri).reply((request) => {
    const data = request.params;
    userDB.users =userDB.users.filter((users) => data !== users.id);
    return [200, userDB.users];
});



