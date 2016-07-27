/**
 * @file Registration of WebUI tests
 * @copyright Digital Living Software Corp. 2014-2015
 */

(function () {
    'use strict';

    angular.module('pipWebuiTests', [
        'pipDataGenerator',
        'pipFakeDataModel',
        'pipMocks'
    ]);

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

    thisModule.service('pipFakeDataModelUsers', ['pipDataGeneratorGeneral', 'pipDataGeneratorUserParty', function (pipDataGeneratorGeneral, pipDataGeneratorUserParty) {

        var usersCollection = [];

        return {
            dataGenerate: dataGenerate,
            getData: getData,
            setData: setData,
            findOne: findOne,
            findAll: findAll,
            findMany: findMany,
            addOne: addOne,
            updateOne: updateOne,
            deleteOne: deleteOne
        };

        function dataGenerate (n) {
            var newUser, i,
                length = n > 0 ? n : 10;

            usersCollection = [];

            for (i = 0; i < length; i++) {
                newUser = pipDataGeneratorUserParty.getOneUser();
                usersCollection.push(newUser);
            }

            return usersCollection;
        }
        
        function getData () {
            return usersCollection;
        }
        
        function setData (data) {
            usersCollection = data;
        }
    
        function findOne (params) {
            // find the user that matches that params
            var user = _.find(usersCollection, params) || [];

            return user[0] || null;
        }
    
        function findAll () {
            return getData();
        }
        
        function findMany(params) {
            var users = _.find(usersCollection, params) || [];

            return users;
        }
        
        function addOne(data) {
            // must calculate a unique ID to add the new data
            var newUser;

            newUser = pipDataGeneratorUserParty.getOneUser(data);
            usersCollection.push(newUser);

            return newUser;
        }
        
        function updateOne(userId, user) {
            // find the user that matches that id
            var users = getData(),
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
        }
        
        function deleteOne (userId) {
            // find the user that matches that id
            var users = getData(),
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
        }
    }]);

})(window._);

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
        ['$httpBackend', 'pipFakeDataModelUsers', 'pipDataGeneratorGeneral', function($httpBackend, pipFakeDataModelUsers, pipDataGeneratorGeneral) {

            var SIGNIN = '/api/signin',
                SIGNUP = '/api/signup';

            // config this
            var serverUrl = pipDataGeneratorGeneral.serverUrl;
        
            $httpBackend.whenGET(serverUrl + SIGNIN).respond(function(method, url, data) {
                var requestData = data ? JSON.parse(data) : {},
                    user = pipFakeDataModelUsers.addOne({email: data["email"]});

                return [200, user, user];
            });
       
            $httpBackend.whenPOST(serverUrl + SIGNIN).respond(function(method, url, data, headers) {
                var requestData = data ? JSON.parse(data) : {},
                    user = pipFakeDataModelUsers.addOne({email: requestData["email"]});

                return [200, user, user];
            });

            // config this?
            // $httpBackend.whenGET(/samples\//).passThrough();
            $httpBackend.whenGET(/^(http:\/\/alpha.pipservices.net\/api\/){0}.*?/).passThrough();
        }]
    );

})();

/**
 * @file Pip Data Generator
 * @copyright Digital Living Software Corp. 2014-2016
 */

(function () {
    'use strict';

    angular.module('pipDataGenerator', [
        'pipDataGenerator.General',
        'pipDataGenerator.UserParty'
    ]);

})();

/**
 * @file Service provides mocked user's party
 * @copyright Digital Living Software Corp. 2014-2015
 */

(function (_, chance) {
    'use strict';

    var thisModule = angular.module('pipDataGenerator.UserParty', []);

    thisModule.service('pipDataGeneratorUserParty', ['pipDataGeneratorGeneral', function (pipDataGeneratorGeneral) {

        return {
            getOneUser: getOneUser,
            getParty: getParty,
            getConnection: getConnection,
            getPartyAccess: getPartyAccess
        };

        function getSession(propertyValues) {
            var date = new Date(chance.timestamp()),
                session = {
                    address: chance.ip(),
                    client: pipDataGeneratorGeneral.getOne(['chrome', 'mozilla', 'explorer']),
                    platform: pipDataGeneratorGeneral.getOne(['windows 8', 'windows 7', 'linux']),
                    last_req: date.toJSON(),
                    opened: date.toJSON(),
                    id: pipDataGeneratorGeneral.getObjectId()
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
                    name: pipDataGeneratorGeneral.getName(),
                    email: chance.email(),
                    language: pipDataGeneratorGeneral.getOne(['en', 'ru', 'fr']),
                    paid: chance.bool({likelihood: 30}),
                    admin: false,
                    party_access: getPartyAccess(),
                    sessions: getSession(),
                    signin: date1 > date2 ? new Date(date1).toJSON() : new Date(date2).toJSON(),
                    signup: date1 > date2 ? new Date(date2).toJSON() : new Date(date1).toJSON(),
                    active: true,
                    lock: false,
                    email_ver: false,
                    id: pipDataGeneratorGeneral.getObjectId(),
                    last_session_id: pipDataGeneratorGeneral.getObjectId()
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
                    party_id: pipDataGeneratorGeneral.getObjectId(),
                    contributor: isContributor,
                    manager: isContributor ? chance.bool({likelihood: 30}) : false,
                    id: pipDataGeneratorGeneral.getObjectId()
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
                    id: pipDataGeneratorGeneral.getObjectId()
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
                    to_party_id: pipDataGeneratorGeneral.getObjectId(),
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
                    id: pipDataGeneratorGeneral.getObjectId()
                };

            if (propertyValues) {
                con = _.assign(con, propertyValues);
            }

            return con;
        }

    }]);

})(window._, window.chance);

/**
 * @file Service provide utils
 * @copyright Digital Living Software Corp. 2014-2015
 */

(function (_, chance) {
    'use strict';

    var thisModule = angular.module('pipDataGenerator.General', []);

    thisModule.service('pipDataGeneratorGeneral', function () {
        
        var ABCD = 'abcdefghijklmnopqrstuvwxyz',
            ABCD_CAPITALIZE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            DIGIT = '0123456789',
            SIGN = ' .,;:-!?',

            SERVER_URL = 'http://alpha.pipservices.net';

        return {
            ABCD: ABCD,
            ABCD_CAPITALIZE: ABCD_CAPITALIZE,
            DIGIT: DIGIT,
            SIGN: SIGN,

            getObjectId: getObjectId,
            getOneWord: getOneWord,
            getPassword: getPassword,
            getEmail: getEmail,
            serverUrl:serverUrl,
            getName: getName,
            getOne: getOne
        };

        // Returns random ID
        function getObjectId(n, allowedChars) {
            var poolObjectId = ABCD + DIGIT,
                length = n || 16,
                pool = allowedChars || poolObjectId;

            return chance.string({length: length, pool: pool});
        }

        function getEmail() {
            return chance.email();
        }

        function getPassword() {
            return getOneWord(8);
        }

        // Returns random one from the passed asset
        function getOne(arr) {
            return _.sample(arr);
        }

        function serverUrl(serverUrl) {
            if (serverUrl) {
                SERVER_URL = serverUrl;
            }

            return SERVER_URL;
        }

        // Returns random word
        function getOneWord(n) {
            var length = n && n > 0 ? Math.floor(Math.random() * n) : null,
                poolWord = ABCD + ABCD_CAPITALIZE;

            return chance.word({length: length, pool: poolWord});
        }

        function getName() {
            var name = chance.first() + ' ' + chance.name();

            return name;
        }

    });

})(window._, window.chance);

//# sourceMappingURL=pip-webui-test.js.map
