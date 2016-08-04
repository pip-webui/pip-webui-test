/**
 * @file Registration of WebUI tests
 * @copyright Digital Living Software Corp. 2014-2015
 */

(function () {
    'use strict';

    var thisModule = angular.module('pipWebuiTests', [
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
        
        'pipTestCollection',
        'pipTestDataSet',
        'pipTestDataService'
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
            // List of references collection 
            this.refs = refs; 

             // Initializes object with default fields
            this.initObject = function (obj) {
                var result = this.newObject();

                if (obj) {
                    result = _.assign(result, obj);
                }

                return result;
            }

            // Create a new random object
            this.newObject = function (refs) {
                var objRefs = refs ? refs : this.refs,
                    result = this.generateObj(objRefs);

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

            this.initObjectList = function (obj) {
                var i, newObj, result = [];

                if (count > 0) {
                    for (i = 0; i < count; i++) {
                        newObj = this.newObject();
                        result.push(_.assign(newObj, obj));
                    }
                }

                return result;              
            }

            this.updateObject = function (obj, refs) {
                var result = this.newObject(refs);

                if (obj) {
                    result = _.assign(result, obj);
                    
                    return result; 
                } else {
                    return null  
                }
            }

            this.generateObj = function generateObj(refs) {
                return {};
            }

        }

        return dataGenerator;

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
                var isContributor = chance.bool({likelihood: child.isContributorChance}),
                    obj = {
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
 * @file pipUserDataGenerator
 * @copyright Digital Living Software Corp. 2014-2016
 */

(function () {
    'use strict';

    var thisModule = angular.module('pipGenerators.User', []);

    thisModule.factory('pipUserDataGenerator', ['pipDataGenerator', 'pipBasicGeneratorServices', '$log', 'pipPartyAccessDataGenerator', 'pipSessionsDataGenerator', function (pipDataGenerator, pipBasicGeneratorServices, $log, 
        pipPartyAccessDataGenerator, pipSessionsDataGenerator) {

            var refs = new Array();

            refs['PartyAccess'] = pipPartyAccessDataGenerator.newObjectList(10);
            refs['Sessions'] = pipSessionsDataGenerator.newObjectList(10);

            var child = new pipDataGenerator('User', refs);

            child.generateObj = function generateObj(refs) {
                var date1 = chance.timestamp(),
                    date2 = chance.timestamp(),
                    nowDate = new Date(),
                    user,
                    PartyAccess = [],
                    Sessions = [],
                    currentSession = pipSessionsDataGenerator.initObject({
                        last_req: nowDate.toJSON(),
                        opened: nowDate.toJSON(),
                    });

                if (refs && angular.isArray(refs)) {
                    PartyAccess = refs['PartyAccess'] || [];
                    Sessions = refs['Sessions'] || [];
                }

                    user = {
                        pwd_last_fail: null,
                        pwd_fail_count: 0,
                        name: pipBasicGeneratorServices.getName(),
                        email: chance.email(),
                        language: pipBasicGeneratorServices.getOne(['en', 'ru', 'fr']), 
                        paid: chance.bool({likelihood: 30}),
                        admin: false,
                        party_access: pipBasicGeneratorServices.getMany(PartyAccess),
                        sessions: pipBasicGeneratorServices.getMany(Sessions),
                        signin: date1 > date2 ? new Date(date1).toJSON() : new Date(date2).toJSON(),
                        signup: date1 > date2 ? new Date(date2).toJSON() : new Date(date1).toJSON(),
                        active: true,
                        lock: false,
                        email_ver: false,
                        id: pipBasicGeneratorServices.getObjectId(),
                        last_session_id: currentSession.id  
                    };

                    user.sessions.push(currentSession);

                return user;
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
    thisModule.factory('TestCollection', ['$log', function ($log) {

        // Define the constructor function.
        return function (generator, name, size, refs) {
            if (!generator) {
                throw new Error('TestCollection: generator is required');
            }

            this.generator = generator;
            this.size = size ? size : 0;
            this.refs = getRefs(generator, refs);
            this.name = getName(generator, name);
            this.collection = [];
            this.isInit = false;

            this.getGeneratorName = getGeneratorName;
            this.getSize = getSize;         

            this.init = init;         
            this.getAll = getAll;         
            this.getByIndex = getByIndex;         
            this.findById = findById;         
            this.create = create;         
            this.update = update;         
            this.deleteById = deleteById;         
            this.deleteByIndex = deleteByIndex; 
                    
        }
            
        function getGeneratorName() {
                return this.generator.name;
            }

        function getSize() {
                return this.collection.length;
            }    

        // public init(collection: any[]): void;
        function init(collection) {
            if (collection && angular.isArray(collection)) {
                this.collection = _.cloneDeep(collection);
                this.size = collection.length;
                //this.refs = ???

                return;
            }

            if (this.size === 0) { 
                this.collection = [];

                return
            } 

            this.collection = this.generator.newObjectList(this.size, this.refs);
            this.isInit = true;
        }
    
        // public getAll(): any[];
        function getAll() {
            return _.cloneDeep(this.collection);
        }     

        // public get(index: number): any[];
        function getByIndex(index) {
            var result = null;

            if (index === undefined || index === null || index < 0 || index > this.collection.length - 1) {
                return result;
            }

            result = _.cloneDeep(this.collection[index]);

            return result;
        }    

        // public findById(id: string): any;
        function findById(id, field) {
            var result = null,
                fieldId = field ? field : 'id';

            if (id === undefined || id === null) {
                return result;
            }

            result = _.find(this.collection, {'id': id}); // todo: replace to fieldId

            return result || null;
        }    

        // public create(obj: any): any;
        function create(obj) {
            var result = this.generator.initObject(obj);

            if (angular.isObject(result)) {
                this.collection.push(result);
            }

            return result;
        }    

        // public update(id: string, obj: any): any;
        function update(id, obj) {
            var result;

            if (id === undefined || id === null || !angular.isObject(obj)) {
                // todo: trow error?
                return null;
            }

            result = this.findById(id);

            if (angular.isObject(result)) {
                result = _.assign(result, obj);
                // todo: replace into collection ???
            } else {
                result = null;
            }

            return result;
        }    

        // public delete(id: string): any;
        function deleteById(id) {
            var i, match = false;

            for (i = 0; i < this.collection.length; i++) {
                if (this.collection[i].id === id) {
                    match = true;
                    this.collection.splice(i, 1);
                    break;
                }
            }

            return match;            
        }    

        // public delete(id: string): any;
        function deleteByIndex(index) {
            if (index === undefined || index === null || index < 0 || index > this.collection.length - 1) {
                return false;
            }

            this.collection.splice(index, 1);

            return true;            
        }

        // ----------------------------------

        function getRefs(generator, refs) {
            var result;
            
            if (refs && angular.isArray(refs)) {
                return _.cloneDeep(refs);
            } else if (generator.refs && angular.isArray(generator.refs)) {
                return _.cloneDeep(generator.refs);
            } else {
                return new Array(); 
            }
        }

        function getName(generator, name) {
            if (name) {
                return name;
            } else {
                return generator.name;
            } 
        }

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
        ['pipTestDataSet', function(pipTestDataSet) {

            // Angular service that holds singleton test dataset that is shared across all

            var dataset = new pipTestDataSet();

            return {
                
                getDataset: getDataset

            };

            // Get singleton dataset
            function getDataset() {

                return dataset;

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
        
        // Define the constructor function.
        return function () {

            this.currentUser = null;
            this.currentParty = null;
            this.dataSet = new Array();

            this.init = init;         
            this.add = add;         
            this.get = get;         

            this.getCurrentUser = getCurrentUser;
            this.setCurrentUser = setCurrentUser;
            this.setCurrentParty = setCurrentParty;
            this.getCurrentParty = getCurrentParty;
                    
        }

        // Initializes all registered collectons
        function init() {
            var i;

            for (i in this.dataSet) {
                if (this.dataSet[i] && this.dataSet[i].isInit === false) {
                    this.dataSet[i].init();
                }
            }    
        }
   
        // Registers a new collection
        function add(collection) {
            var name;
            
            if (collection && angular.isObject(collection) && collection.name) {
                name = collection.name;
                this.dataSet[name] = _.cloneDeep(collection);
            } else {
                throw new Error('pipTestDataSet: collection is required');
            }
        }

        // Gets registered collection by its name
        function get(name) {
            if (name && angular.isString(name)) {
                return this.dataSet[name];
            } else {
                throw new Error('pipTestDataSet: name must be a string');
            }
        }

        // ---------------------------

        function setCurrentUser(user) {
            if (user && angular.isObject(user) && user.id) {
                this.currentUser = _.cloneDeep(user);
            } else {
                throw new Error('pipTestDataSet: currentUser must be a object');
            }
        }        

        function getCurrentUser() {
            return this.currentUser;
        }
   
        function setCurrentParty(party) {
            if (party && angular.isObject(party) && party.id) {
                this.currentParty = _.cloneDeep(party);
            } else {
                throw new Error('pipTestDataSet: currentParty must be a object');
            }
        }

        function getCurrentParty() {
            return this.currentParty;
        }      

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
 

//# sourceMappingURL=pip-webui-test.js.map
