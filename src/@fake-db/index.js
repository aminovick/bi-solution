import mock from './mock';
import './db/administration-db';
import  './db/users-db'
import  './db/candidats-db.js'
import './db/auth-db';
import'./db/action-db'
mock.onAny().passThrough();
