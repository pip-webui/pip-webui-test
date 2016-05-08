/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module('pipTest.DataSet', []);

    thisModule.service('pipTestDataSet', function () {

            var ABCD = 'abcdefghijklmnopqrstuvwxyz',
                ABCD_CAPITALIZE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
                DIGIT = '0123456789',
                SIGN = ' .,;:-!?';

            var SERVER_URL = 'http://alpha.pipservices.net';

            // define users
            var SAMPLER_ACCOUNT = {
                    name: 'Sampler User',
                    email: 'sampler@digitallivingsoftware.com',
                    password: 'test123',
                    language: 'en',
                    theme: ''
                },
                TESTER_ACCOUNT = {
                    name: 'Empty User',
                    email: 'emptyUser@test.ru',
                    password: '123456',
                    language: 'en',
                    theme: ''
                };

            var MANAGER_USER = {
                    "name": "manager_user",
                    "email": "test2piplife@mail.ru",
                    "language": "en",
                    "pwd_fail_count": 0,
                    "pwd_last_fail": null,
                    "paid": false,
                    "admin": false,
                    "party_access": [
                        {
                            "share_level": 0,
                            "type": "partner",
                            "party_name": "Bill Tester",
                            "party_id": "55f20e7b4b0c570c4b1f12e0",
                            "contributor": false,
                            "manager": false,
                            "id": "55f716315b46fab820dd8df3"
                        },
                        {
                            "share_level": 0,
                            "type": "partner",
                            "party_name": "emptyUser",
                            "party_id": "user_id00000000000000001",
                            "contributor": false,
                            "manager": false,
                            "id": "55f716315b46fab820dd8de4"
                        }
                    ],
                    "sessions": [
                        {
                            "address": "109.254.67.37",
                            "client": "chrome",
                            "platform": "windows 6.3",
                            "last_req": "2015-11-19T13:57:12.723Z",
                            "opened": "2015-11-19T13:57:12.723Z",
                            "id": "session_id00000000000002"
                        },  {
                            "address": "176.8.157.60",
                            "client": "chrome",
                            "platform": "windows 6.3",
                            "last_req": "2015-11-19T17:22:11.791Z",
                            "opened": "2015-11-19T17:22:11.791Z",
                            "id": "session_id00000000000003"
                        }
                    ],
                    "signin": "2015-11-19T17:22:11.688Z",
                    "signup": "2015-09-10T20:56:08.025Z",
                    "active": true,
                    "lock": false,
                    "email_ver": false,
                    "id": "user_id00000000000000002",
                    "last_session_id": "session_id00000000000003"
                },

                EMPTY_USER = {
                    "pwd_last_fail": null,
                    "pwd_fail_count": 0,
                    "name": "emptyUser",
                    "email": "emptyUser@test.ru",
                    "language": "en",
                    "paid": false,
                    "admin": false,
                    "party_access": [],
                    "sessions": [
                        {
                            "address": "176.8.157.60",
                            "client": "chrome",
                            "platform": "windows 6.3",
                            "last_req": "2015-11-19T17:34:42.019Z",
                            "opened": "2015-11-19T17:34:42.019Z",
                            "id": "session_id00000000000002"
                        }
                    ],
                    "signin": "2015-11-19T17:34:41.934Z",
                    "signup": "2015-11-19T17:34:41.721Z",
                    "active": true,
                    "lock": false,
                    "email_ver": false,
                    "id": "user_id00000000000000001",
                    "last_session_id": "session_id00000000000002"
                };

            //define settings
            var SETTINGS1 = {
                    "intro": {
                        "lastId": "55f6fc635b46fab820dd8cce",
                        "date": "2015-09-15T17:28:23.941Z"
                    },
                    "party_id": "user_id00000000000000001",
                    "events": {
                        "viewType": "kanban"
                    },
                    "visions": {
                        "viewType": "tile"
                    },
                    "notes": {
                        "viewType": "tile"
                    },
                    "partners": {
                        "viewType": "tile"
                    }
                },
                SETTINGS2 = {
                    "intro": {
                        "lastId": "55f6fc635b46fab820dd8cce",
                        "date": "2015-09-15T17:28:23.941Z"
                    },
                    "party_id": "user_id00000000000000002",
                    "messages": {
                        "viewType": "send"
                    },
                    "goals": {
                        "navId": "all"
                    },
                    "areas": {
                        "navId": "now"
                    },
                    "news": {
                        "viewType": "tile"
                    }
                };

            return {

                ABCD: ABCD,

                ABCD_CAPITALIZE: ABCD_CAPITALIZE,

                DIGIT: DIGIT,

                SIGN: SIGN,

                SETTINGS1: SETTINGS1,

                SETTINGS2: SETTINGS2,

                EMPTY_USER: EMPTY_USER,

                MANAGER_USER: MANAGER_USER,

                TESTER_ACCOUNT: TESTER_ACCOUNT,

                SAMPLER_ACCOUNT: SAMPLER_ACCOUNT,

                SERVER_URL: SERVER_URL

            };

        }
    );

})();
