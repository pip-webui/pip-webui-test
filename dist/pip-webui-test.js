/**
 * @file Registration of WebUI tests
 * @copyright Digital Living Software Corp. 2014-2015
 */

(function () {
    'use strict';

    var thisModule = angular.module('pipWebuiTests', [
        'pipFakeDataModel.Users', // old
        'pipDataGenerator.UserParty', // old

        'pipMocked',
        'pipMocked.Users',
        'pipMocked.Entry',
        'pipMocked.Party',
        'pipMocked.Announcements',
        'pipMocked.Feedbacks',
        'pipMocked.Tips',
        'pipMocked.Guides',
        'pipMocked.ServersActivities',
        'pipMocked.Images',

        'pipGenerators',
        'pipBasicGeneratorServices',        
        'pipGenerators.User',
        'pipGenerators.PartyAccess',   
        'pipGenerators.Sessions',    
        'pipGenerators.Party', 
        'pipTestCollection'
    ]);


    thisModule.run(
        ['pipMockedResource', 'MockedUsersResource', 'MockedCurrentUserResource', 'TruePathResource', 'MockedSigninResource', 'MockedSignupResource', 'MockedSignoutResource', 'MockedSignupValidateResource', 'MockedVerifyEmailResource', 'MockedRecoverPasswordResource', 'MockedResetPasswordResource', 'MockedChangePasswordResource', 'MockedUserSessionsResource', 'MockedTipsResource', 'MockedAnnouncementsResource', 'MockedFeedbacksResource', 'MockedGuidesResource', 'MockedImagesResource', 'MockedPartyResource', 'MockedServersActivitiesResource', function(pipMockedResource, MockedUsersResource, MockedCurrentUserResource, TruePathResource, MockedSigninResource,
        MockedSignupResource, MockedSignoutResource, MockedSignupValidateResource, MockedVerifyEmailResource,
        MockedRecoverPasswordResource, MockedResetPasswordResource, MockedChangePasswordResource, MockedUserSessionsResource,
        MockedTipsResource, MockedAnnouncementsResource, MockedFeedbacksResource, MockedGuidesResource, MockedImagesResource,
        MockedPartyResource, MockedServersActivitiesResource) {

            pipMockedResource.addMocks(MockedUsersResource);
            pipMockedResource.addMocks(MockedCurrentUserResource);

            pipMockedResource.addMocks(MockedUserSessionsResource);

            pipMockedResource.addMocks(MockedSigninResource);
            pipMockedResource.addMocks(MockedSignupResource);
            pipMockedResource.addMocks(MockedSignoutResource);
            pipMockedResource.addMocks(MockedSignupValidateResource);
            pipMockedResource.addMocks(MockedVerifyEmailResource);
            pipMockedResource.addMocks(MockedRecoverPasswordResource);
            pipMockedResource.addMocks(MockedResetPasswordResource);
            pipMockedResource.addMocks(MockedChangePasswordResource);

            // ----------------
            pipMockedResource.addMocks(MockedTipsResource);
            pipMockedResource.addMocks(MockedAnnouncementsResource);
            pipMockedResource.addMocks(MockedFeedbacksResource);
            pipMockedResource.addMocks(MockedGuidesResource);
            pipMockedResource.addMocks(MockedImagesResource);
            pipMockedResource.addMocks(MockedPartyResource);
            pipMockedResource.addMocks(MockedServersActivitiesResource);
            
            pipMockedResource.addMocks(TruePathResource);
            pipMockedResource.registerStandardResources();

        }]
    );

})();

/**
 * @file pipDataGenerators
 * @copyright Digital Living Software Corp. 2014-2016
 */

(function () {
    'use strict';

    var thisModule = angular.module('pipGenerators', []);

    thisModule.factory('pipDataGenerator', ['$log', function ($log) {

        var dataGenerator = function(name, refs) {

            // Collection name
            this.name = name;
            // List of references collection names
            this.refs = refs; // string?    

             // Initializes object with default fields
            this.initObject = function (obj) {
                var result = this.newObject(this.refs);

                if (obj) {
                    result = _.assign(result, obj);
                }

                return result;
            }

            // Create a new random object
            this.newObject = function (refs) {
                var result = this.generateObj();

                return result;                
            }

            this.newObjectList = function (count, refs) {
                var i, obj, result = [];

                if (count > 0) {
                    for (i = 0; i < count; i++) {
                        obj = this.newObject(refs);
                        result.push(obj);
                    }
                }

                return result;                
            }

            // todo ??
            this.initObjectList = function (refs) {
                var result = [];

                return result;                
            }

            // todo ??
            this.updateObject = function (obj, refs) {
                var result;

                return result;                 
            }

            this.generateObj = function generateObj() {
                return {};
            }

        }

        return dataGenerator;

    }]);

})();
 
/**
 * @file pipPartyAccessDataGenerator
 * @copyright Digital Living Software Corp. 2014-2016
 */

(function () {
    'use strict';

    var thisModule = angular.module('pipGenerators.PartyAccess', []);

    thisModule.factory('pipPartyAccessDataGenerator', ['pipDataGenerator', 'pipBasicGeneratorServices', '$log', function (pipDataGenerator, pipBasicGeneratorServices, $log) {
            var child = new pipDataGenerator('PartyAccess', []);

            child.isContributorChance = 30;
            child.isManagerChance = 30;
            child.defaultShareLevel = 0;
            child.defaultType = 'partner';

            child.generateObj = function generateObj() {
                var obj = {
                        share_level: child.defaultShareLevel,
                        type: child.defaultType,
                        party_name: chance.first() + ' ' + chance.name(),
                        party_id: pipBasicGeneratorServices.getObjectId(),
                        contributor: chance.bool({likelihood: child.isContributorChance}),
                        manager: isContributor ? chance.bool({likelihood: child.isManagerChance}) : false,
                        id: pipBasicGeneratorServices.getObjectId()
                    };

                return obj;
            }

            return child;
    }]);

})();
/**
 * @file pipPartyDataGenerator
 * @copyright Digital Living Software Corp. 2014-2016
 */

(function () {
    'use strict';

    var thisModule = angular.module('pipGenerators.Party', []);

    thisModule.factory('pipPartyDataGenerator', ['pipDataGenerator', 'pipBasicGeneratorServices', '$log', function (pipDataGenerator, pipBasicGeneratorServices, $log) {
            // var child = Object.create(pipDataGenerator);
            var child = new pipDataGenerator('User', ['PartyAccess', 'Sessions']);

            child.defaultType = 'person';
            child.defaultJoin = 'approve';

            child.generateObj = function generateObj() {
                var date1 = chance.timestamp(),
                    date2 = chance.timestamp(),
                    party = {
                        name: chance.first() + ' ' + chance.name(),
                        email: chance.email(),
                        type: child.defaultType,
                        gender: chance.gender().toLowerCase(),
                        loc_name: chance.address(),
                        loc_pos: {
                            type: 'Point',
                            coordinates: [
                                chance.floating({min: -120, max: 120}),
                                chance.floating({min: -120, max: 120})
                            ]
                        },
                        join: child.defaultJoin,
                        updated: date1 > date2 ? new Date(date1).toJSON() : new Date(date2).toJSON(),
                        created: date1 > date2 ? new Date(date2).toJSON() : new Date(date1).toJSON(),
                        id: pipBasicGeneratorServices.getObjectId()
                    };

                return party;
            }

            return child;
    }]);

})();
 
/**
 * @file Service provide utils
 * @copyright Digital Living Software Corp. 2014-2015
 */

(function (_, chance) {
    'use strict';

    var thisModule = angular.module('pipBasicGeneratorServices', []);

    thisModule.service('pipBasicGeneratorServices', function () {
        
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
            getOne: getOne,
            getMany: getMany
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

        // Returns random one from the passed asset
        function getMany(arr, count) {
            var number = count ? count : Math.floor(Math.random() * arr.length); 

            return _.sampleSize(arr, number);
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

/**
 * @file pipSessionsDataGenerator
 * @copyright Digital Living Software Corp. 2014-2016
 */

(function () {
    'use strict';

    var thisModule = angular.module('pipGenerators.Sessions', []);

    thisModule.factory('pipSessionsDataGenerator', ['pipDataGenerator', 'pipBasicGeneratorServices', '$log', function (pipDataGenerator, pipBasicGeneratorServices, $log) {
            var child = new pipDataGenerator('Sessions', []);

            child.generateObj = function generateObj() {
                var date = new Date(chance.timestamp()),
                    session = {
                        address: chance.ip(),
                        client: pipBasicGeneratorServices.getOne(['chrome', 'mozilla', 'explorer']), // todo:  заменить на массивы из dataGenerators?
                        platform: pipBasicGeneratorServices.getOne(['windows 8', 'windows 7', 'linux']),
                        last_req: date.toJSON(),
                        opened: date.toJSON(),
                        id: pipBasicGeneratorServices.getObjectId()
                    };

                return session;
            }

            return child;
    }]);

})();
/**
 * @file pipTestCollection
 * @copyright Digital Living Software Corp. 2014-2016
 */

(function () {
    'use strict';

    var thisModule = angular.module('pipTestCollection', []);

    // Collection of test data stored in test dataset
    thisModule.factory('pipTestCollection', ['$log', function ($log) {

        var testCollection = function(generator) { // generator: pipDataGenerator
            this.constructor(generator);
        }

        // Initializes collection with init object list
        this.constructor = function (generator) {

        }

        // public init(): void;   //todo:  init(collection: any[]): void; ??
        this.init = function () {

        }
    
        // public getAll(): any[];
        this.getAll = function () {

        }     

        // public get(index: number): any[];
        this.get = function (index) {

        }    

        // public findById(id: string): any;
        this.findById = function (id) {

        }    

        // public create(obj: any): any;
        this.create = function (obj) {

        }    

        // public update(id: string, obj: any): any;
        this.update = function (id, obj) {

        }    

        // public delete(id: string): any;
        this.delete = function (id) {

        }    

        return testCollection;

    }]);

})();
/**
 * @file pipTestDataService
 * @copyright Digital Living Software Corp. 2014-2016
 */

/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module('pipTestDataService', []);

    thisModule.factory('pipTestDataService', 
        ['pipAreasData', 'pipGoalsData', '$rootScope', 'pipCollections', 'NewsUAService', 'pipEnums', function(pipAreasData, pipGoalsData, $rootScope, pipCollections, NewsUAService, pipEnums) {

    // Angular service that holds singleton test dataset that is shared across all
    // Get singleton dataset
    // public getDataset(): TestDataset;

            return {
                
                
            }
        }]
    );

})();
/**
 * @file pipTestDataSet
 * @copyright Digital Living Software Corp. 2014-2016
 */

(function () {
    'use strict';

    var thisModule = angular.module('pipTestDataSet', []);

    // Test dataset, that can be used to hold state of rest api
    thisModule.factory('pipTestDataSet', ['$log', function ($log) {

    // // Initializes all registered collectons
    // public init(): void;
    // // Registers a new collection
    // public add(col: TestCollection);
    // // Gets registered collection by its name
    // public get(name: string): TestCollection;
    
    }]);

})();
/**
 * @file pipUserDataGenerator
 * @copyright Digital Living Software Corp. 2014-2016
 */

(function () {
    'use strict';

    var thisModule = angular.module('pipGenerators.User', []);

    thisModule.factory('pipUserDataGenerator', ['pipDataGenerator', 'pipBasicGeneratorServices', '$log', function (pipDataGenerator, pipBasicGeneratorServices, $log) {
            // var child = Object.create(pipDataGenerator);
            var child = new pipDataGenerator('User', ['PartyAccess', 'Sessions']);

            child.generateObj = function generateObj() {
                var date1 = chance.timestamp(),
                    date2 = chance.timestamp(),

                    user = {
                        pwd_last_fail: null,
                        pwd_fail_count: 0,
                        name: pipBasicGeneratorServices.getName(),
                        email: chance.email(),
                        language: pipBasicGeneratorServices.getOne(['en', 'ru', 'fr']), 
                        paid: chance.bool({likelihood: 30}),
                        admin: false,
                        //party_access: getPartyAccess(),  - refs  | pipBasicGeneratorServices.getMany(PartyAccess)
                        //sessions: getSession(), - refs  | pipBasicGeneratorServices.getMany(Session)
                        signin: date1 > date2 ? new Date(date1).toJSON() : new Date(date2).toJSON(),
                        signup: date1 > date2 ? new Date(date2).toJSON() : new Date(date1).toJSON(),
                        active: true,
                        lock: false,
                        email_ver: false,
                        id: pipBasicGeneratorServices.getObjectId(),
                        last_session_id: pipBasicGeneratorServices.getObjectId()  //?? сессия должна существовать?
                    };

                return user;
            }

            return child;
    }]);

})();
 
/**
 * @file MockedAnnouncementsResource
 * @copyright Digital Living Software Corp. 2014-2016
 * 
 * Mocked:
 * /api/announcements/:id
 */

(function () {
    'use strict';

    var thisModule = angular.module('pipMocked.Announcements', ['ngMockE2E', 'ngResource']);

    thisModule.factory('MockedAnnouncementsResource', ['$httpBackend', '$log', 'MockedResource', function ($httpBackend, $log, MockedResource) {
        var child = Object.create(MockedResource);

        child.api = '/api/announcements';

        child.register = function() {

                   
        }

        return child;
    }]);

})();
/**
 * @file pipMockedEntry
 * @copyright Digital Living Software Corp. 2014-2016
 * 
 *  Mocked:
 * /api/signup_validate
 * /api/verify_email
 * /api/users/:party_id/resend_email_verification
 * /api/change_password
 * /api/reset_password/api/recover_password
 * /api/signup
 * /api/signout
 * /api/signin
 */

(function () {
    'use strict';

    var thisModule = angular.module('pipMocked.Entry', ['ngMockE2E', 'ngResource']);

    thisModule.factory('MockedSigninResource', ['$httpBackend', '$log', 'MockedResource', function ($httpBackend, $log, MockedResource) {
        var child = Object.create(MockedResource);

        child.api = '/api/signin';

        child.register = function() {

            // POST /api/signin
            // expected data { email: email, password: password, remember: remember}                 
            $httpBackend.whenPOST(child.fakeUrl + child.api).respond(function(method, url, data, headers, params) {
                console.log('pipMocks.Users22222', data, headers, params);

                return [200, {}, {}];
            });             
        }

        return child;
    }]);    

    thisModule.factory('MockedSignupResource', ['$httpBackend', '$log', 'MockedResource', function ($httpBackend, $log, MockedResource) {
        var child = Object.create(MockedResource);

        child.api = '/api/signup';

        child.register = function() {

            // POST /api/signup
            // expected data { name: name, email: email, password: password, language: language}            
            $httpBackend.whenPOST(child.fakeUrl + child.api).respond(function(method, url, data, headers, params) {
                console.log('pipMocks.Users22222', data, headers, params);

                return [200, {}, {}];
            });             
        }

        return child;
    }]); 

    thisModule.factory('MockedSignoutResource', ['$httpBackend', '$log', 'MockedResource', function ($httpBackend, $log, MockedResource) {
        var child = Object.create(MockedResource);

        child.api = '/api/signout';

        child.register = function() {

            // POST /api/signout
            // expected data {}
            $httpBackend.whenPOST(child.fakeUrl + child.api).respond(function(method, url, data, headers, params) {
                console.log('pipMocks.Users22222', data, headers, params);

                return [200, {}, {}];
            });             
        }

        return child;
    }]); 

    thisModule.factory('MockedSignupValidateResource', ['$httpBackend', '$log', 'MockedResource', function ($httpBackend, $log, MockedResource) {
        var child = Object.create(MockedResource);

        child.api = '/api/signup_validate';

        child.register = function() {

            // POST /api/signup_validate,
            // expected data {email: newValue}            
            $httpBackend.whenPOST(child.fakeUrl + child.api).respond(function(method, url, data, headers, params) {
                console.log('pipMocks.Users22222', data, headers, params);

                return [200, {}, {}];
            });             
        }

        return child;
    }]); 

    thisModule.factory('MockedVerifyEmailResource', ['$httpBackend', '$log', 'MockedResource', function ($httpBackend, $log, MockedResource) {
        var child = Object.create(MockedResource);

        child.api = '/api/verify_email';

        child.register = function() {

            // POST /api/verify_email,
            // expected data {email: $scope.data.email, code: $scope.data.code}
            $httpBackend.whenPOST(child.fakeUrl + child.api).respond(function(method, url, data, headers, params) {
                console.log('pipMocks.Users22222', data, headers, params);

                return [200, {}, {}];
            });             
        }

        return child;
    }]); 

    thisModule.factory('MockedRecoverPasswordResource', ['$httpBackend', '$log', 'MockedResource', function ($httpBackend, $log, MockedResource) {
        var child = Object.create(MockedResource);

        child.api = '/api/recover_password';
      
        child.register = function() {

            // POST /api/recover_password,
            // expected data {email: $scope.data.email}
            $httpBackend.whenPOST(child.fakeUrl + child.api).respond(function(method, url, data, headers, params) {
                console.log('pipMocks.Users22222', data, headers, params);

                return [200, {}, {}];
            });             
        }

        return child;
    }]); 

    thisModule.factory('MockedResetPasswordResource', ['$httpBackend', '$log', 'MockedResource', function ($httpBackend, $log, MockedResource) {
        var child = Object.create(MockedResource);

        child.api = '/api/reset_password';

        child.register = function() {

            // POST /api/reset_password,
            // expected data {email: $scope.data.email,code: $scope.data.code,password: $scope.data.password}
            $httpBackend.whenPOST(child.fakeUrl + child.api).respond(function(method, url, data, headers, params) {
                console.log('pipMocks.Users22222', data, headers, params);

                return [200, {}, {}];
            });             
        }

        return child;
    }]);   

    thisModule.factory('MockedChangePasswordResource', ['$httpBackend', '$log', 'MockedResource', function ($httpBackend, $log, MockedResource) {
        var child = Object.create(MockedResource);

        child.api = '/api/change_password';

        child.register = function() {

            // POST /api/change_password, 
            // todo: expected ??
            $httpBackend.whenPOST(child.fakeUrl + child.api).respond(function(method, url, data, headers, params) {
                console.log('pipMocks.Users22222', data, headers, params);

                return [200, {}, {}];
            });             
        }

        return child;
    }]);  

})();
 

/**
 * @file MockedFeedbacksResource
 * @copyright Digital Living Software Corp. 2014-2016
 * 
 * Mocked:
 * /api/feedbacks/:id
 */

(function () {
    'use strict';

    var thisModule = angular.module('pipMocked.Feedbacks', ['ngMockE2E', 'ngResource']);

    thisModule.factory('MockedFeedbacksResource', ['$httpBackend', '$log', 'MockedResource', function ($httpBackend, $log, MockedResource) {
        var child = Object.create(MockedResource);

        child.api = '/api/feedbacks';

        child.register = function() {

                   
        }

        return child;
    }]);

})();
/**
 * @file MockedGuidesResource
 * @copyright Digital Living Software Corp. 2014-2016
 * 
 * Mocked:
 * /api/guides/:id
 */

(function () {
    'use strict';

    var thisModule = angular.module('pipMocked.Guides', ['ngMockE2E', 'ngResource']);

    thisModule.factory('MockedGuidesResource', ['$httpBackend', '$log', 'MockedResource', function ($httpBackend, $log, MockedResource) {
        var child = Object.create(MockedResource);

        child.api = '/api/guides';

        child.register = function() {

                   
        }

        return child;
    }]);

})();
/**
 * @file MockedImagesResource
 * @copyright Digital Living Software Corp. 2014-2016
 * 
 * Mocked:
 * /api/image_sets/:id
 * /api/images/search
 */

(function () {
    'use strict';

    var thisModule = angular.module('pipMocked.Images', ['ngMockE2E', 'ngResource']);

    thisModule.factory('MockedImagesResource', ['$httpBackend', '$log', 'MockedResource', function ($httpBackend, $log, MockedResource) {
        var child = Object.create(MockedResource);

        child.api = '/api/image_sets';

        child.register = function() {

                   
        }

        return child;
    }]);

})();
/**
 * @file MockedPartyResource
 * @copyright Digital Living Software Corp. 2014-2016
 * 
 * Mocked:
 * /api/parties/:id
 * /api/parties/:party_id/settings
 */

(function () {
    'use strict';

    var thisModule = angular.module('pipMocked.Party', ['ngMockE2E', 'ngResource']);

    thisModule.factory('MockedPartyResource', ['$httpBackend', '$log', 'MockedResource', function ($httpBackend, $log, MockedResource) {
        var child = Object.create(MockedResource);

        child.api = '/api/parties/';

        child.register = function() {

                   
        }

        return child;
    }]);

})();
/**
 * @file pipMocked
 * @copyright Digital Living Software Corp. 2014-2016
 */


/* API list

+ /api/users/current
+ /api/users/:id

+ /api/users/:party_id/sessions/:id

/api/parties/:id
/api/parties/:party_id/settings

/api/signup_validate
/api/verify_email
/api/users/:party_id/resend_email_verification
/api/change_password
/api/reset_password
/api/recover_password
/api/signup
/api/signout
/api/signin

/api/image_sets/:id
/api/images/search

images:
get serverurl + /api/parties/ + partyId + "/files/" + imageId
    serverUrl + '/api/parties/' + partyId + '/files

    
    // document
$upload.http({
url: addItemUrl(item),
headers: { 'Content-Type': file.type },
data: e.target.result
})    

serverUrl + '/api/parties/' + partyId + '/files?name='

$http['delete'](getItemIdUrl(item))

// image_sets
$http['post'](url)

$upload.http({
url: FILE_URL + '?name=' + file.name,
headers: { 'Content-Type': file.type },
data: e.target.result


/api/servers/activities/:id
/api/guides/:id
/api/tips/:id
/api/feedbacks/:id
/api/announcements/:id

})


avatar
get serverUrl + '/api/parties/' + partyId + '/' + entityTypes[type] + '/' + id + '/avatar
get serverUrl + '/api/parties/' + partyId + '/avatar

*/

(function () {
    'use strict';

    var thisModule = angular.module('pipMocked', ['ngMockE2E', 'ngResource']);

    thisModule.factory('pipMockedResource', function () {
        var mocks = [];


        return {
            addMocks: addMocks,
            registerStandardResources: registerStandardResources
        };

        function registerStandardResources() {
            for (var i = 0; i < mocks.length; i++) {
                var obj = mocks[i];
                obj.register();
            }
        }

        function registerSampleResources() {

        }

        function addMocks(extension) {
            console.log('addMocks', extension);
            if (extension && angular.isObject(extension)) {
                mocks.push(extension);
            }
        };

    });

    thisModule.factory('MockedResource', ['$httpBackend', '$log', function ($httpBackend, $log) {
            this.api = '';
            this.fakeUrl = 'http://alpha.pipservices.net';

            this.regEsc = function (str) {
                    //Escape string to be able to use it in a regular expression
                    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
            }

            this.IdRegExp = /[a-zA-Z0-9]{24}/.toString().slice(1, -1);
            this.QueryRegExp = /[\d\w-_\.%\s]*$/.toString().slice(1, -1);
            this.EndStringRegExp = /$/.toString().slice(1, -1);

            this.register = function() {}

        return this;
    }]);

    thisModule.factory('TruePathResource', ['$httpBackend', '$log', 'MockedResource', function ($httpBackend, $log, MockedResource) {
            var child = Object.create(MockedResource);

            child.register = function() {
                $httpBackend.whenGET(/.*/).passThrough();           
            }
            return child;
    }]);

})();
 


// /api/users/:party_id/resend_email_verification
// /.*\/friends\/(\w+)/

// $httpBackend.whenGET(/\/contacts\/(\d+)/, undefined, ['id']).respond(function(method, url, data, headers, params) {
//   var contact = findContactById(params.id);

//   if (contact == null) {
//     return [404, undefined, {}];
//   }

//   return [200, contact, {}];
// });

// $httpBackend.whenPUT(/\/contacts\/(\d+)/, undefined, undefined, ['id']).respond(function(method, url, data, headers, params) {
//   var contact = findContactById(params.id),
//       parsedData = angular.fromJson(data);

//   if (contact == null) {
//     return [404, undefined, {}];
//   }

//   angular.extend(contact, parsedData);

//   return [200, contact, {}];
// });

// // Delete; remove existing contact.
// $httpBackend.whenDELETE(/\/contacts\/(\d+)/, undefined, ['id']).respond(function(method, url, data, headers, params) {
//   var contact = findContactById(params.id);

//   if (contact == null) {
//     return [404, undefined, {}];
//   }

//   // Replace contacts array with filtered results, removing deleted contact.
//   contacts.splice(contacts.indexOf(contact), 1);

//   return [200, undefined, {}];
// });




// ----

// //GET tag/
// $httpBackend.whenGET(collectionUrl).respond(function(method, url, data, headers) {
//     $log.log('Intercepted GET to tag', data);
//     return [200, TagRepo.data, {/*headers*/}];
// });

// //GET tag/<id>
// $httpBackend.whenGET( new RegExp(regexEscape(collectionUrl + '/') + IdRegExp ) ).respond(function(method, url, data, headers) {
//     $log.log('Intercepted GET to tag/id');
//     var id = url.match( new RegExp(IdRegExp) )[0];
    
//     if (!TagRepo.index[id]) {
//         return [404, {} , {/*headers*/}];
//     }

//     return [200, TagRepo.index[id], {/*headers*/}];
// });


// -------

 //get all stores
        // var storeUrl = "/api/stores";
        // $httpBackend.whenGET(storeUrl).respond(stores);

        // //get single store
        // var singleStoreUrl = new RegExp(storeUrl + "/[0-9][0-9]*", '');
        // $httpBackend.whenGET(singleStoreUrl)

// -------

// var regexGetTicket = new RegExp('/ticket/([0-9]+)');
// $httpBackend.whenGET({
//     test: function(url) {
//         return regexGetTicket.test(url);
//     }
// })        


// --------
// To create a pattern from a string url, with optional query-string, you could use this:

// var targetUrl = "/somelink";
// var pattern = new RegExp(
//     "^" +
//     targetUrl.replace(/[-[\]{}()*+?.\\^$|]/g, "\\$&") + /* escape special chars */
//     "(?:\\?.*)?$");
// $httpBackend.when('GET', pattern).respond(function(method, url, data) {
//   var queryMatch = /^[^#]*\?([^#]*)/.exec(url);
//   var query = queryMatch ? queryMatch[1] : "";
//   // url = "/somelink?abc=123" -> query = "abc=123"
// });
/**
 * @file MockedServersActivitiesResource
 * @copyright Digital Living Software Corp. 2014-2016
 * 
 * Mocked:
 * /api/servers/activities/:id
 */

(function () {
    'use strict';

    var thisModule = angular.module('pipMocked.ServersActivities', ['ngMockE2E', 'ngResource']);

    thisModule.factory('MockedServersActivitiesResource', ['$httpBackend', '$log', 'MockedResource', function ($httpBackend, $log, MockedResource) {
        var child = Object.create(MockedResource);

        child.api = '/api/servers/activities';

        child.register = function() {

                   
        }

        return child;
    }]);

})();
 
/**
 * @file MockedTipsResource
 * @copyright Digital Living Software Corp. 2014-2016
 * 
 * Mocked:
 * /api/tips/:id
 */

(function () {
    'use strict';

    var thisModule = angular.module('pipMocked.Tips', ['ngMockE2E', 'ngResource']);

    thisModule.factory('MockedTipsResource', ['$httpBackend', '$log', 'MockedResource', function ($httpBackend, $log, MockedResource) {
        var child = Object.create(MockedResource);

        child.api = '/api/tips';

        child.register = function() {

                   
        }

        return child;
    }]);

})();
/**
 * @file pipMockedUsers
 * @copyright Digital Living Software Corp. 2014-2016
 * 
 * Mocked:
 * GET /api/users/current
 * GET /api/users
 * POST /api/users
 * GET /api/users/:id
 * PUT /api/users/:id
 * DELETE /api/users/:id
 * 
 * GET /api/users/:party_id/sessions
 * DELETE /api/users/:party_id/sessions/:id
 */

(function () {
    'use strict';

    var thisModule = angular.module('pipMocked.Users', ['ngMockE2E', 'ngResource']);

    thisModule.factory('MockedCurrentUserResource', ['$httpBackend', '$log', 'MockedResource', function ($httpBackend, $log, MockedResource) {
        var child = Object.create(MockedResource);

        child.api = '/api/users/current';

        child.register = function() {

            // GET /api/users/current
            $httpBackend.whenGET(child.fakeUrl + child.api).respond(function(method, url, data, headers) {
               console.log('MockedCurrentUserResource whenGET current', data, headers);

                 return [200, {}, {}];
            });
                
        }

        return child;
    }]);

    thisModule.factory('MockedUsersResource', ['$httpBackend', '$log', 'MockedResource', function ($httpBackend, $log, MockedResource) {
        var child = Object.create(MockedResource);

        child.api = '/api/users';

        child.register = function() {

            // GET /api/users
            $httpBackend.whenGET(child.fakeUrl + child.api).respond(function(method, url, data, headers) {
               console.log('MockedUsersResource whenGET collection', data, headers);

                 return [200, {}, {}];
            });

            // POST /api/users
            $httpBackend.whenPOST(child.fakeUrl + child.api).respond(function(method, url, data, headers, params) {
                console.log('MockedUsersResource whenPOST', data, headers, params);

                return [200, {}, {}];
            }); 

            // GET /api/users/:id
            $httpBackend.whenGET(new RegExp(child.regEsc(child.fakeUrl + child.api + '/') + child.IdRegExp + child.EndStringRegExp)).respond(function(method, url, data, headers) {
               console.log('MockedUsersResource whenGET user', data, headers);

                 return [200, {}, {}];
            });

            // PUT /api/users/:id
            $httpBackend.whenPUT(new RegExp(child.regEsc(child.fakeUrl + child.api + '/') + child.IdRegExp + child.EndStringRegExp)).respond(function(method, url, data, headers) {
                console.log('MockedUsersResource whenPUT', data, headers);

                return [200, {}, {}];
            });   

            // DELETE /api/users/:id
            $httpBackend.whenDELETE(new RegExp(child.regEsc(child.fakeUrl + child.api + '/') + child.IdRegExp + child.EndStringRegExp)).respond(function(method, url, data, headers) {
                console.log('MockedUsersResource whenPUT', data, headers);

                return [200, {}, {}];
            });                       
        }

        return child;
    }]);

    thisModule.factory('MockedUserSessionsResource', ['$httpBackend', '$log', 'MockedResource', function ($httpBackend, $log, MockedResource) {
        var child = Object.create(MockedResource);

        // /api/users/:party_id/sessions/:id
        child.api = '/api/users/:party_id/sessions/:id';

        child.register = function() {
            // GET /api/users/:party_id/sessions
            $httpBackend.whenGET(new RegExp(child.regEsc(child.fakeUrl + '/api/users/') + child.IdRegExp + child.regEsc('/sessions')))
            .respond(function(method, url, data, headers) {
               console.log('MockedUserSessionsResource whenGET current', data, headers);
// expected 
// [{
// "address": "109.254.67.37"
// "client": "chrome"
// "platform": "windows 6.3"
// "last_req": "2016-05-17T16:12:10.525Z"
// "opened": "2016-05-16T12:11:33.039Z"
// "id": "5739b8f5deca605c33c842cc"
// }]
                 return [200, {}, {}];
            });

            // DELETE  /api/users/:party_id/sessions/:id
            $httpBackend.whenDELETE(new RegExp(child.regEsc(child.fakeUrl + '/api/users/') + child.IdRegExp + child.regEsc('/sessions/') + child.IdRegExp + child.EndStringRegExp))
            .respond(function(method, url, data, headers) {
                console.log('MockedUserSessionsResource whenDELETE', data, headers);
// expected 
// OK
                return [200, {}, {}];
            });      
        }

        return child;
    }]);    

})();
 

/*
 *
 * (с) Digital Living Software Corp. 2014-2016
 */

/* global angular */

(function (_) {
    'use strict';

    var thisModule = angular.module('pipFakeDataModel.Users', []);

    thisModule.service('pipFakeDataModelUsers', ['pipBasicGeneratorServices', 'pipDataGeneratorUserParty', function (pipBasicGeneratorServices, pipDataGeneratorUserParty) {

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
 * @file Service provides mocked user's party
 * @copyright Digital Living Software Corp. 2014-2015
 */

(function (_, chance) {
    'use strict';

    var thisModule = angular.module('pipDataGenerator.UserParty', []);

    thisModule.service('pipDataGeneratorUserParty', ['pipBasicGeneratorServices', function (pipBasicGeneratorServices) {

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
                    client: pipBasicGeneratorServices.getOne(['chrome', 'mozilla', 'explorer']),
                    platform: pipBasicGeneratorServices.getOne(['windows 8', 'windows 7', 'linux']),
                    last_req: date.toJSON(),
                    opened: date.toJSON(),
                    id: pipBasicGeneratorServices.getObjectId()
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
                    name: pipBasicGeneratorServices.getName(),
                    email: chance.email(),
                    language: pipBasicGeneratorServices.getOne(['en', 'ru', 'fr']),
                    paid: chance.bool({likelihood: 30}),
                    admin: false,
                    party_access: getPartyAccess(),
                    sessions: getSession(),
                    signin: date1 > date2 ? new Date(date1).toJSON() : new Date(date2).toJSON(),
                    signup: date1 > date2 ? new Date(date2).toJSON() : new Date(date1).toJSON(),
                    active: true,
                    lock: false,
                    email_ver: false,
                    id: pipBasicGeneratorServices.getObjectId(),
                    last_session_id: pipBasicGeneratorServices.getObjectId()
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
                    party_id: pipBasicGeneratorServices.getObjectId(),
                    contributor: isContributor,
                    manager: isContributor ? chance.bool({likelihood: 30}) : false,
                    id: pipBasicGeneratorServices.getObjectId()
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
                    id: pipBasicGeneratorServices.getObjectId()
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
                    to_party_id: pipBasicGeneratorServices.getObjectId(),
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
                    id: pipBasicGeneratorServices.getObjectId()
                };

            if (propertyValues) {
                con = _.assign(con, propertyValues);
            }

            return con;
        }

    }]);

})(window._, window.chance);

//# sourceMappingURL=pip-webui-test.js.map
