/**
 * @file Registration of WebUI tests
 * @copyright Digital Living Software Corp. 2014-2015
 */

(function () {
    'use strict';

    angular.module('pipWebuiTests', [
        'pipTests',
        'pipFakeDataModel',
        'pipMocks'
    ]);

})();

/**
 * @file Provides a service to work with mocked user
 * @copyright Digital Living Software Corp. 2014-2015
 */

(function () {
    'use strict';

    var thisModule = angular.module('pipTest.Account', ['pipTest.DataSet']);

    thisModule.service('pipTestAccount', ['pipTestDataSet', function (pipTestDataSet) {

        return {
            getServerUrl: getServerUrl,
            getSamplerAccount: getSamplerAccount,
            getTesterAccount: getTesterAccount
        };

        // Returns server url
        function getServerUrl() {
            return pipTestDataSet.SERVER_URL;
        }

        // Returns account, users and parties
        function getSamplerAccount() {
            return pipTestDataSet.SAMPLER_ACCOUNT;
        }

        function getTesterAccount() {
            return pipTestDataSet.TESTER_ACCOUNT;
        }
    }]);

})();

/**
 * @file Mock data for checklist
 * @copyright Digital Living Software Corp. 2014-2015
 */

/* global chance */

(function () {
    'use strict';

    var thisModule = angular.module('pipTest.Content', ['pipTest.DataSet']);

    thisModule.service('pipTestContent', function () {

        return {
            getCheckList: getCheckList
        };

        // Returns entity
        function getCheckList(options) {

            var size = 1 + Math.floor(Math.random() * 10),
                onlyCheck,
                onlyUnCheck,
                optionTextType, // {word, sentence, paragraph}
                optionLength,
                checklistContent = [],
                i;

            if (options) {
                size = options.size ? options.size : size;
                onlyCheck = options.onlyCheck ? options.onlyCheck : false;
                onlyUnCheck = options.onlyUnCheck ? options.onlyUnCheck : false;
                optionTextType = options.optionTextType ? options.optionTextType : null;
                optionLength = options.optionLength ? options.optionLength : null;
            }

            for (i = 0; i < size; i++) {
                checklistContent.push({
                    text: getText(optionTextType, optionLength),
                    checked: getChecked(onlyCheck, onlyUnCheck)
                });
            }

            return checklistContent;

            // helpful functions
            function getText(optionTextType, optionLength) {
                var text;

                switch (optionTextType) {
                    case 'word':
                        text = chance.word({ length: optionLength });
                        break;
                    case 'sentence':
                        text = chance.sentence({ words: optionLength });
                        break;
                    case 'paragraph':
                        text = chance.paragraph({ sentences: optionLength });
                        break;
                    default:
                        text = chance.sentence({words: optionLength});
                }

                return text;
            }

            function getChecked(onlyCheck, onlyUnCheck) {
                return onlyCheck || onlyUnCheck || chance.bool();
            }
        }

    });

})();

/**
 * @file Service provides mocked data
 * @copyright Digital Living Software Corp. 2014-2015
 */

(function () {
    'use strict';

    var thisModule = angular.module('pipTest.DataSet', []);

    thisModule.service('pipTestDataSet', function () {

        var ABCD = 'abcdefghijklmnopqrstuvwxyz',
            ABCD_CAPITALIZE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            DIGIT = '0123456789',
            SIGN = ' .,;:-!?',

            SERVER_URL = 'http://alpha.pipservices.net',

            // define users
            SAMPLER_ACCOUNT = {
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
            },

            MANAGER_USER = {
                name: 'manager_user',
                email: 'test2piplife@mail.ru',
                language: 'en',
                pwd_fail_count: 0,
                pwd_last_fail: null,
                paid: false,
                admin: false,
                party_access: [
                    {
                        share_level: 0,
                        type: 'partner',
                        party_name: 'Bill Tester',
                        party_id: '55f20e7b4b0c570c4b1f12e0',
                        contributor: false,
                        manager: false,
                        id: '55f716315b46fab820dd8df3'
                    },
                    {
                        share_level: 0,
                        type: 'partner',
                        party_name: 'emptyUser',
                        party_id: 'user_id00000000000000001',
                        contributor: false,
                        manager: false,
                        id: '55f716315b46fab820dd8de4'
                    }
                ],
                sessions: [
                    {
                        address: '109.254.67.37',
                        client: 'chrome',
                        platform: 'windows 6.3',
                        last_req: '2015-11-19T13:57:12.723Z',
                        opened: '2015-11-19T13:57:12.723Z',
                        id: 'session_id00000000000002'
                    }, {
                        address: '176.8.157.60',
                        client: 'chrome',
                        platform: 'windows 6.3',
                        last_req: '2015-11-19T17:22:11.791Z',
                        opened: '2015-11-19T17:22:11.791Z',
                        id: 'session_id00000000000003'
                    }
                ],
                signin: '2015-11-19T17:22:11.688Z',
                signup: '2015-09-10T20:56:08.025Z',
                active: true,
                lock: false,
                email_ver: false,
                id: 'user_id00000000000000002',
                last_session_id: 'session_id00000000000003'
            },

            EMPTY_USER = {
                pwd_last_fail: null,
                pwd_fail_count: 0,
                name: 'emptyUser',
                email: 'emptyUser@test.ru',
                language: 'en',
                paid: false,
                admin: false,
                party_access: [],
                sessions: [
                    {
                        address: '176.8.157.60',
                        client: 'chrome',
                        platform: 'windows 6.3',
                        last_req: '2015-11-19T17:34:42.019Z',
                        opened: '2015-11-19T17:34:42.019Z',
                        id: 'session_id00000000000002'
                    }
                ],
                signin: '2015-11-19T17:34:41.934Z',
                signup: '2015-11-19T17:34:41.721Z',
                active: true,
                lock: false,
                email_ver: false,
                id: 'user_id00000000000000001',
                last_session_id: 'session_id00000000000002'
            },

            // define settings
            SETTINGS1 = {
                intro: {
                    lastId: '55f6fc635b46fab820dd8cce',
                    date: '2015-09-15T17:28:23.941Z'
                },
                party_id: 'user_id00000000000000001',
                events: {
                    viewType: 'kanban'
                },
                visions: {
                    viewType: 'tile'
                },
                notes: {
                    viewType: 'tile'
                },
                partners: {
                    viewType: 'tile'
                }
            },
            SETTINGS2 = {
                intro: {
                    lastId: '55f6fc635b46fab820dd8cce',
                    date: '2015-09-15T17:28:23.941Z'
                },
                party_id: 'user_id00000000000000002',
                messages: {
                    viewType: 'send'
                },
                goals: {
                    navId: 'all'
                },
                areas: {
                    navId: 'now'
                },
                news: {
                    viewType: 'tile'
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
    });

})();

/**
 * @file Mock entry data
 * @copyright Digital Living Software Corp. 2014-2015
 */

(function (_, chance) {
    'use strict';

    var thisModule = angular.module('pipTest.Entity', ['pipTest.DataSet', 'pipTest.General']);

    thisModule.service('pipTestEntity', ['pipTestGeneral', function (pipTestGeneral) {

        return {
            getEntity: getEntity,
            setContrib: setContrib,
            getOneArea: getOneArea,
            getAreasCollection: getAreasCollection,
            getOneGoal: getOneGoal,
            getGoalsCollection: getGoalsCollection
        };

        // get entity
        function getEntity(propertyValues) {
            var userId,
                userName,
                id,
                titleLength,
                entity;

            userId = pipTestGeneral.getObjectId();
            userName = chance.sentence({words: 2});
            id = pipTestGeneral.getObjectId();
            titleLength = 1 + Math.random() * 5;

            entity = {
                title: chance.sentence({words: titleLength}),
                type: 'goal',
                creator_id: userId,
                creator_name: userName,
                contribs: [{
                    from_id: id,
                    party_id: userId,
                    party_name: 'emptyUser',
                    accept: 'accepted',
                    role: ''
                }],
                tags: [],
                id: id
            };

            if (propertyValues) {
                entity = _.assign(entity, propertyValues);
            }

            return entity;
        }

        // Set Contrib (entity, parties, contribCount)
        function setContrib(party, partyArray, minContribCount, maxContribCount) {
            if (!party || !partyArray) {
                return;
            }

            var count,
                chooseParty;

            if (minContribCount && maxContribCount) {
                count = Math.floor(Math.random() * (maxContribCount - minContribCount + 1));
            } else {
                count = minContribCount
                    ? Math.floor(Math.random() * (partyArray.length - maxContribCount))
                    : Math.floor(Math.random() * partyArray.length);
            }

            chooseParty = _.take(partyArray, count);

            _.each(chooseParty, function (item) {
                party.contribs.push({
                    party_name: item.name,
                    party_id: item.id,
                    accept: pipTestGeneral.getOne(['accepted', 'invited'])
                });
            });

            party.contribs = _.uniq(party.contribs, 'party_id');
        }

        // get area
        function getOneArea(forUser, propertyValues) {
            var params = {};

            params.type = 'area';

            if (forUser && forUser.name) {
                params.creator_name = forUser.name;
                params.creator_id = forUser.id;
            }

            return getEntity(params, propertyValues);
        }

        function getAreasCollection(count, forUser, propertyValues) {
            var collection = [],
                params = {},
                i;

            params.type = 'area';

            if (forUser && forUser.name) {
                params.creator_name = forUser.name;
                params.creator_id = forUser.id;
            }

            for (i = 0; i < count; i++) {
                collection.push(getEntity(params, propertyValues));
            }

            return collection;
        }

        // get goal
        function getOneGoal(forUser, propertyValues) {
            var params = {};

            params.type = pipTestGeneral.getOne(['goal', 'aspiration', 'objective', 'dream', 'accomplishment']);

            if (forUser && forUser.name) {
                params.creator_name = forUser.name;
                params.creator_id = forUser.id;
            }

            return getEntity(params, propertyValues);
        }

        function getGoalsCollection(count, forUser, propertyValues) {
            var i,
                collection = [],
                params = {};

            params.type = pipTestGeneral.getOne(['goal', 'aspiration', 'objective', 'dream', 'accomplishment']);

            if (forUser && forUser.name) {
                params.creator_name = forUser.name;
                params.creator_id = forUser.id;
            }

            for (i = 0; i < count; i++) {
                collection.push(getEntity(params, propertyValues));
            }

            return collection;
        }

        // function getTags() {
            // {
            //    'party_id': '55f1ee67880929ec46ec394c',
            //    'tags': [
            //    {
            //        'tag': 'first tag',
            //        'used': '2015-11-19T14:45:57.901Z',
            //        'count': 39
            //    },
            //    {
            //        'tag': '6',
            //        'used': '2015-09-16T12:08:11.316Z',
            //        'count': 1
            //    },
            //    {
            //        'tag': 'yyyyyyyyyyyyyyy',
            //        'used': '2015-09-24T16:20:09.244Z',
            //        'count': 4
            //    }
            // ],
            //    'id': '55f5edcf8175ba46db9dec74'
            // }
        // }

    }]);

})(window._, window.chance);

/**
 * @file Service provide utils
 * @copyright Digital Living Software Corp. 2014-2015
 */

(function (_, chance) {
    'use strict';

    var thisModule = angular.module('pipTest.General', ['pipTest.DataSet']);

    thisModule.service('pipTestGeneral', ['pipTestDataSet', function (pipTestDataSet) {

        return {
            getObjectId: getObjectId,
            getOneWord: getOneWord,
            getOne: getOne
        };

        // Returns random ID
        function getObjectId(n, allowedChars) {
            var poolObjectId = pipTestDataSet.ABCD + pipTestDataSet.DIGIT,
                length = n || 16,
                pool = allowedChars || poolObjectId;

            return chance.string({length: length, pool: pool});
        }

        // Returns random one from the passed asset
        function getOne(arr) {
            return _.sample(arr);
        }

        // Returns random word
        function getOneWord(n) {
            var length = n && n > 0 ? Math.floor(Math.random() * n) : null,
                poolWord = pipTestDataSet.ABCD + pipTestDataSet.ABCD_CAPITALIZE;

            return chance.word({length: length, pool: poolWord});
        }

    }]);

})(window._, window.chance);

/**
 * @file Registration of tests
 * @copyright Digital Living Software Corp. 2014-2015
 */

(function () {
    'use strict';

    angular.module('pipTests', [
        'pipTest.DataSet',
        'pipTest.Account',
        'pipTest.Entity',
        'pipTest.UserParty',
        'pipTest.General',
        'pipTest.Content'
    ]);

})();

/**
 * @file Service provides mocked user's party
 * @copyright Digital Living Software Corp. 2014-2015
 */

(function (_, chance) {
    'use strict';

    var thisModule = angular.module('pipTest.UserParty', ['pipTest.DataSet']);

    thisModule.service('pipTestUserParty', ['pipTestDataSet', 'pipTestGeneral', function (pipTestDataSet, pipTestGeneral) {

        return {
            getOneUser: getOneUser,
            getSettings: getSettings,
            getParty: getParty,
            getConnection: getConnection,
            getPartyAccess: getPartyAccess,
            getSession: getSession
        };

        function getSession(propertyValues) {
            var date = new Date(chance.timestamp()),
                session = {
                    address: chance.ip(),
                    client: pipTestGeneral.getOne(['chrome', 'mozilla', 'explorer']),
                    platform: pipTestGeneral.getOne(['windows 8', 'windows 7', 'linux']),
                    last_req: date.toJSON(),
                    opened: date.toJSON(),
                    id: pipTestGeneral.getObjectId()
                };

            if (propertyValues) {
                session = _.assign(session, propertyValues);
            }

            return session;
        }

        // get user for testing
        function getOneUser(propertyValues) {
            var date1 = chance.timestamp(),
                date2 = chance.timestamp(),

                user = {
                    pwd_last_fail: null,
                    pwd_fail_count: 0,
                    name: chance.first() + ' ' + chance.name(),
                    email: chance.email(),
                    language: pipTestGeneral.getOne(['en', 'ru', 'fr']),
                    paid: chance.bool({likelihood: 30}),
                    admin: false,
                    party_access: getPartyAccess(),
                    sessions: getSession(),
                    signin: date1 > date2 ? new Date(date1).toJSON() : new Date(date2).toJSON(),
                    signup: date1 > date2 ? new Date(date2).toJSON() : new Date(date1).toJSON(),
                    active: true,
                    lock: false,
                    email_ver: false,
                    id: pipTestGeneral.getObjectId(),
                    last_session_id: pipTestGeneral.getObjectId()
                };

            if (propertyValues) {
                user = _.assign(user, propertyValues);
            }

            return user;
        }

        function getPartyAccess(n, propertyValues) {
            var result = [],
                length = n || Math.floor(Math.random() * 10),
                i,
                p,
                isContributor;

            for (i = 0; i < length; i++) {
                isContributor = chance.bool({likelihood: 30});

                p = {
                    share_level: 0,
                    type: 'partner',
                    party_name: chance.first() + ' ' + chance.name(),
                    party_id: pipTestGeneral.getObjectId(),
                    contributor: isContributor,
                    manager: isContributor ? chance.bool({likelihood: 30}) : false,
                    id: pipTestGeneral.getObjectId()
                };

                if (propertyValues) {
                    p = _.assign(p, propertyValues);
                }

                result.push(p);
            }

            return result;
        }

        function getParty(propertyValues) {
            var date1 = chance.timestamp(),
                date2 = chance.timestamp(),
                party = {
                    name: chance.first() + ' ' + chance.name(),
                    email: chance.email(),
                    type: 'person', // todo ??
                    gender: chance.gender().toLowerCase(),
                    loc_name: chance.address(),
                    loc_pos: {
                        type: 'Point',
                        coordinates: [
                            chance.floating({min: -120, max: 120}),
                            chance.floating({min: -120, max: 120})
                        ]
                    },
                    join: 'approve', // todo ??
                    updated: date1 > date2 ? new Date(date1).toJSON() : new Date(date2).toJSON(),
                    created: date1 > date2 ? new Date(date2).toJSON() : new Date(date1).toJSON(),
                    id: pipTestGeneral.getObjectId()
                };

            if (propertyValues) {
                party = _.assign(party, propertyValues);
            }

            return party;
        }

        function getConnection(party, propertyValues) {
            if (!party || !party.id || !party.name) {
                return null;
            }

            var isContributor = chance.bool({likelihood: 30}),
                con = {
                    party_id: party.id,
                    party_type: party.type,
                    party_name: party.name,
                    to_party_id: pipTestGeneral.getObjectId(),
                    to_party_name: chance.first() + ' ' + chance.name(),
                    to_party_type: 'person', // todo
                    type: 'partner', // todo
                    share_level: chance.integer({min: 0, max: 4}),
                    accept: 'joined', // todo
                    group_ids: [],
                    contributor: isContributor,
                    manager: isContributor ? chance.bool({likelihood: 30}) : false,
                    snoozed: false,
                    created: new Date(chance.timestamp()).toJSON(),
                    id: pipTestGeneral.getObjectId()
                };

            if (propertyValues) {
                con = _.assign(con, propertyValues);
            }

            return con;
        }

        // Returns settings mocked object due to passed number
        function getSettings(settingsConfig) {
            return settingsConfig === 2 ? pipTestDataSet.SETTINGS2 : pipTestDataSet.SETTINGS1;
        }

    }]);

})(window._, window.chance);

/**
 * @file Mocks for REST API
 * @copyright Digital Living Software Corp. 2014-2016
 */

/* API list

/api/users/current
/api/users/:id
/api/users/:party_id/sessions/:id
/api/parties/:id


/api/parties/:party_id/settings

/api/image_sets/:id
/api/images/search

/api/guides/:id
/api/tips/:id
/api/feedbacks/:id
/api/announcements/:id

/api/signup_validate
/api/verify_email
/api/users/:party_id/resend_email_verification
/api/change_password
/api/reset_password
/api/recover_password
/api/signup
/api/signout
/api/signin
*/


(function () {
    'use strict';

    angular.module('pipMocks', [
        'pipMocks.Users',
        'pipMocks.Files',
        'pipMocks.Settings',
        'pipMocks.Entry'
    ]);

})();

/*
 * Mocks for Files REST API
 * (с) Digital Living Software Corp. 2014-2016
 */

/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module('pipMocks.Files', []);

    thisModule.config(function() {

    });

    thisModule.run(
        ['$httpBackend', function($httpBackend) {
        
          
        }]
    );

})();

/*
 * Mocks for Settings REST API
 * (с) Digital Living Software Corp. 2014-2016
 */

/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module('pipMocks.Settings', []);

    thisModule.config(function() {

    });

    thisModule.run(
        ['$httpBackend', function($httpBackend) {
        
          
        }]
    );

})();

/*
 * Mocks for Users REST API
 * (с) Digital Living Software Corp. 2014-2016
 */

/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module('pipMocks.Users', []);

    thisModule.config(function() {

    });

    thisModule.run(
        ['$httpBackend', 'pipFakeDataModelUsers', function($httpBackend, pipFakeDataModelUsers) {
        
          
        }]
    );

})();

/*
 * Mocks for Entry REST API
 * (с) Digital Living Software Corp. 2014-2016
 */

/*
/api/signin
/api/signup
/api/signout
/api/signup_validate
/api/verify_email
/api/users/:party_id/resend_email_verification
/api/change_password
/api/reset_password
/api/recover_password
*/

/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module('pipMocks.Entry', ['ngMockE2E', 'ngResource']);

    // thisModule.config(function($provide) {
    //     $provide.decorator('$httpBackend', angular.mock.e2e.$httpBackendDecorator);
    // });

    thisModule.run(
        ['$httpBackend', function($httpBackend) {

            // config this
            var serverUrl = 'http://alpha.pipservices.net';
        
            $httpBackend.whenGET(serverUrl + '/api/signin').respond(function(method, url, data) {
                 var games = ServerDataModel.findAll();

                return [200, games, {}];
            });
       
            $httpBackend.whenGET(/samples\//).passThrough();

            // // do real request
            // $httpBackend.whenJSONP().passThrough();
        }]
    );

})();

/*
 *
 * (с) Digital Living Software Corp. 2014-2016
 */

/* global angular */

(function (_) {
    'use strict';

    var thisModule = angular.module('pipFakeDataModel.Entry', []);

    thisModule.service('pipFakeDataModelEntry', ['pipTestGeneral', function (pipTestGeneral) {

        this.data = [
            {

            }     
        ];
        

    }]);

})(window._);

/**
 * @file Registration of Fake Data Model
 * @copyright Digital Living Software Corp. 2014-2016
 */

(function () {
    'use strict';

    angular.module('pipFakeDataModel', [
        'pipFakeDataModel.Users',
        'pipFakeDataModel.Files',
        'pipFakeDataModel.Settings',
        'pipFakeDataModel.Entry'
    ]);

})();

/*
 *
 * (с) Digital Living Software Corp. 2014-2016
 */

/* global angular */

(function (_) {
    'use strict';

    var thisModule = angular.module('pipFakeDataModel.Files', []);

    thisModule.service('pipFakeDataModelFiles', ['pipTestGeneral', function (pipTestGeneral) {

        this.data = [
            {

            }     
        ];
        

    }]);

})(window._);

/*
 *
 * (с) Digital Living Software Corp. 2014-2016
 */

/* global angular */

(function (_) {
    'use strict';

    var thisModule = angular.module('pipFakeDataModel.Settings', []);

    thisModule.service('pipFakeDataModelSettings', ['pipTestGeneral', function (pipTestGeneral) {

        this.data = [
            {

            }     
        ];
        

    }]);

})(window._);

/*
 *
 * (с) Digital Living Software Corp. 2014-2016
 */

/* global angular */

(function (_) {
    'use strict';

    var thisModule = angular.module('pipFakeDataModel.Users', []);

    thisModule.service('pipFakeDataModelUsers', ['pipTestGeneral', function (pipTestGeneral) {

        this.data = [
            {

            }     
        ];
        
        this.getData = function() {
            return this.data;
        };
        
        this.setData = function(data) {
            this.data = data;
        };
    
        this.findOne = function(userId) {
            // find the user that matches that id
            var user;

            return user;
        };
    
        this.findAll = function() {
            return this.getData();
        };
        
        this.findMany = function(options) {
            var users;

            return users;       
        };
        
        this.addOne = function(newUser) {
            // must calculate a unique ID to add the new data
            var newId = this.newId();
            newUser.id = newId;
            this.data.push(newUser);

            return newUser;
        };
        
        // return an id to insert a new data item at
        this.newId = function() {
            var newId = pipTestGeneral.getObjectId();

            return newId;
        };
        
        this.updateOne = function(userId, user) {
            // find the user that matches that id
            var users = this.getData(),
                match = null,
                i;

            for (i = 0; i < users.length; i++) {
                if(users[i].id == userId) {
                    match = users[i];
                    break;
                }
            }

            if(!angular.isObject(match)) {
                return {};
            }

            angular.extend(match, user);

            return match;
        };
        
        this.deleteOne = function(userId) {
            // find the user that matches that id
            var users = this.getData(),
                match = false, 
                i;

            for (i = 0; i < users.length; i++) {
                if(users[i].id == userId) {
                    match = true;
                    users.splice(i, 1);
                    break;
                }
            }

            return match;
        };
    }]);

})(window._);

//# sourceMappingURL=pip-webui-test.js.map
