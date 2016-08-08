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
        'pipMocked.ImageSet',
        'pipMocked.Images',
        'pipMocked.Avatar',

        'pipGenerators',
        'pipBasicGeneratorServices',        
        'pipGenerators.User',
        'pipGenerators.PartyAccess',   
        'pipGenerators.Sessions',    
        'pipGenerators.Party',
        'pipGenerators.Files',
        'pipGenerators.Avatars',
        
        'pipTestCollection',
        'pipTestDataSet',
        'pipTestDataService',

        // resources
        'pipMocked.ImageResources',
        'PipResources.Error',
        'pipImageResources'
    ]);


    thisModule.run(
        ['pipMockedResource', 'MockedUsersResource', 'MockedCurrentUserResource', 'TruePathResource', 'MockedSigninResource', 'MockedSignupResource', 'MockedSignoutResource', 'MockedSignupValidateResource', 'MockedVerifyEmailResource', 'MockedRecoverPasswordResource', 'MockedResetPasswordResource', 'MockedChangePasswordResource', 'MockedUserSessionsResource', 'MockedTipsResource', 'MockedAnnouncementsResource', 'MockedFeedbacksResource', 'MockedGuidesResource', 'MockedImageSetResource', 'MockedPartyResource', 'MockedServersActivitiesResource', 'MockedAvatarResource', 'MockedImagesResource', function(pipMockedResource, MockedUsersResource, MockedCurrentUserResource, TruePathResource, MockedSigninResource,
        MockedSignupResource, MockedSignoutResource, MockedSignupValidateResource, MockedVerifyEmailResource,
        MockedRecoverPasswordResource, MockedResetPasswordResource, MockedChangePasswordResource, MockedUserSessionsResource,
        MockedTipsResource, MockedAnnouncementsResource, MockedFeedbacksResource, MockedGuidesResource, MockedImageSetResource,
        MockedPartyResource, MockedServersActivitiesResource, MockedAvatarResource, MockedImagesResource) {

            pipMockedResource.addMocks(MockedUsersResource);
            pipMockedResource.addMocks(MockedCurrentUserResource);
            pipMockedResource.addMocks(MockedUserSessionsResource);

            // entry
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
            pipMockedResource.addMocks(MockedPartyResource);
            pipMockedResource.addMocks(MockedServersActivitiesResource);
            // files and images
            pipMockedResource.addMocks(MockedImageSetResource);
            pipMockedResource.addMocks(MockedAvatarResource);
            pipMockedResource.addMocks(MockedImagesResource);

            pipMockedResource.addMocks(TruePathResource);
            
            pipMockedResource.registerStandardResources();

        }]
    );

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
            this.clearCurrentUser = clearCurrentUser;
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

        function clearCurrentUser() {
            this.currentUser = null;
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
 * @file pipAvatarsDataGenerator
 * @copyright Digital Living Software Corp. 2014-2016
 */

// {
//   "id": "56cde0d1b0c1dcf82cf50cb6",
//   "name": "cat4.jpg",
//   "content_type": "image/jpeg",
//   "length": 36916,
//   "creator_id": "565f12ef8ff2161b1dfeedbf",
//   "created": "2016-08-05T09:22:59.141Z",
//   "refs": [
//     {
//       "ref_type": "goal",
//       "ref_id": "56cde0d1b0c1dcf82cf50cb6"
//     }
//   ],
//   "url": "https://s3-us-west-1.amazonaws.com/alpha-uploads.piplife.com/56cde0d1b0c1dcf82cf50cb6/cat4.jpg"
// }

(function () {
    'use strict';

    var thisModule = angular.module('pipGenerators.Avatars', []);

    thisModule.factory('pipAvatarsDataGenerator', ['pipDataGenerator', 'pipBasicGeneratorServices', 'pipImageResources', '$log', function (pipDataGenerator, pipBasicGeneratorServices, pipImageResources, $log) {
            
            // var refs = new Array();

            // refs['Goals'] = pipGoalsDataGenerator.newObjectList(10);
            // refs['Areas'] = pipAreasDataGenerator.newObjectList(10);

            var child = new pipDataGenerator('Avatars', []);

            child.defaultContentType = 'image/jpeg';

            child.generateObj = function generateObj() {
                var image = pipImageResources.getImage(),
                    imageName = pipBasicGeneratorServices.getFileName(image.link),
                    imageExt = pipBasicGeneratorServices.getFileExt(imageName),
                    imageContentType = pipBasicGeneratorServices.getContentType(imageExt),                
                    obj = {
                        id: pipBasicGeneratorServices.getObjectId(),
                        name: imageName, 
                        content_type: imageContentType, 
                        length: chance.integer({min: 10000, max: 1000000}),
                        creator_id: pipBasicGeneratorServices.getObjectId(),
                        created: chance.date({year: 2015}).toJSON(), 
                        refs: [

                        ],
                        url: image.link
                    };

                return obj;
            }

            return child;
    }]);

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
 * @file pipFilesDataGenerator
 * @copyright Digital Living Software Corp. 2014-2016
 */

// {
//   "id": "57a459fbf6dd4d642c1daf23",
//   "name": "Screenshot_2.png",
//   "content_type": "image/png",
//   "length": 78848,
//   "party_id": "565f12ef8ff2161b1dfeedbf",
//   "creator_id": "565f12ef8ff2161b1dfeedbf",
//   "created": "2016-08-05T09:18:52.304Z",
//   "refs": [],
//   "url": "https://s3-us-west-1.amazonaws.com/alpha-uploads.piplife.com/57a459fbf6dd4d642c1daf23/Screenshot_2.png"
// }

(function () {
    'use strict';

    var thisModule = angular.module('pipGenerators.Files', []);

    thisModule.factory('pipFilesDataGenerator', ['pipDataGenerator', 'pipBasicGeneratorServices', 'pipImageResources', '$log', function (pipDataGenerator, pipBasicGeneratorServices, pipImageResources, $log) {
            
            var child = new pipDataGenerator('Files', []);

            child.generateObj = function generateObj() {
                var image = pipImageResources.getImage(),
                    imageName = pipBasicGeneratorServices.getFileName(image.link),
                    imageExt = pipBasicGeneratorServices.getFileExt(imageName),
                    imageContentType = pipBasicGeneratorServices.getContentType(imageExt),
                    creatorId = pipBasicGeneratorServices.getObjectId(), 
                    obj = {
                        id: pipBasicGeneratorServices.getObjectId(),
                        name: imageName, 
                        content_type: imageContentType, 
                        length: chance.integer({min: 10000, max: 1000000}),
                        party_id: creatorId,
                        creator_id: creatorId,
                        created: chance.date({year: 2015}).toJSON(), 
                        refs: [],
                        url: image.link
                    };

                return obj;
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
            CONTENT_TYPES = {
                'jpg': 'image/jpg',
                'jpeg': 'image/jpeg',
                'gif': 'image/gif',
                'png': 'image/png'
            },

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
            getMany: getMany,
            getFileName: getFileName,
            getFileExt: getFileExt,
            getContentType: getContentType
        };

        // Returns random ID
        function getObjectId(n, allowedChars) {
            var poolObjectId = ABCD + DIGIT,
                length = n || 24,
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

        function getFileName(url) {
             var name = url.slice(url.lastIndexOf('/') + 1, url.length).split('?')[0];

             return name;
        }

        function getFileExt(name) {
             var ext = name.slice(name.lastIndexOf('.') + 1, name.length).split('?')[0];

             return ext;
        }

        function getContentType(fileExt) {
            var default_CT = 'image/jpg',
                result;

            result = CONTENT_TYPES[fileExt];

            if (!result) {
                result = default_CT;
            }

            return result;
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
 * @file String resources for Areas pages
 * @copyright Digital Living Software Corp. 2014-2016
 */
/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module('pipMocked.ImageResources', ['pipImageResources']);

    thisModule.config(['pipImageResourcesProvider', function (pipImageResourcesProvider) {
        // Set translation strings for the module
        pipImageResourcesProvider.setImages([
            {
                "title": "Cat Rejected By 5 Previous Owners Finally Finds A Human That Loves ...",
                "link": "http://static.boredpanda.com/blog/wp-content/uploads/2016/04/beautiful-fluffy-cat-british-longhair-thumb.jpg",
                "thumbnail": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRnJBZq_2tq5ZQY5q_ffHasWSjp84ULC0DqoTVd0F4sWDJgrEoLcDqXqw"
            },
            {
                "title": "Your Cat | Cat Advice",
                "link": "http://www.yourcat.co.uk/images/catimages/module_graphics/cat_health.jpg",
                "thumbnail": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQfLMZenYeTxvvX3e-LnvmKGDizm1TyscgCUJty6jAUCsfuGE5tuRYVDQ"
            },
            {
                "title": "Cat Nutrition Tips | ASPCA",
                "link": "http://www.aspca.org/sites/default/files/cat-care_cat-nutrition-tips_overweight_body4_left.jpg",
                "thumbnail": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSAW7vaQfr_iluqnX3DQYbZ3NrdCLjiMDuva3FCjYKTBxzcY2GcKIH67c4W"
            },
            {
                "title": "Cat - Wikipedia, the free encyclopedia",
                "link": "https://upload.wikimedia.org/wikipedia/commons/7/75/Cat_eating_a_rabbit.jpeg",
                "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSK3sbzKkaY5NAFGyO6xD3mHHpdaJ_I2TB-AUUZ6vt8oQEZHcsv_qfIvmnr"
            },
            {
                "title": "Best Cat Breeds | Pictures, Information, and Reviews",
                "link": "https://s2.graphiq.com/sites/default/files/stories/t2/tiny_cat_12573_8950.jpg",
                "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTaKFV3BJIfybHOZx6jUWLr0mBCa2NxpEM65QhacczN4YVrOPk_jKN8oXQ"
            },
            {
                "title": "Cat Tracker",
                "link": "http://cats.yourwildlife.org/wp-content/uploads/cat-tracker.jpg",
                "thumbnail": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcS5mjSRVNRlcxGDNlfUdx_YjhsajMMwNRahAr0S4jwXcTgXXWQbYejNg0I"
            },
            {
                "title": "This Cat Takes Better Selfies Than You (16 Photos) «TwistedSifter",
                "link": "https://twistedsifter.files.wordpress.com/2016/02/manny-the-cat-takes-better-selfies-than-you-9.jpg",
                "thumbnail": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRIk7_KJk0eR0lw2PB79xaPihecrtlOiw-SSodEmz1RIT_ZHu43RGnjLcYQJQ"
            },
            {
                "title": "5507692-cat-m.jpg",
                "link": "http://www.cats.org.uk/uploads/branches/211/5507692-cat-m.jpg",
                "thumbnail": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTpf0PD5EoT_Rz7Qau5BN1O24JUzcs5gr-SmN60T6H1UiCnnYF28wxE9qTk"
            },
            {
                "title": "Cat Cafe Mad: Home",
                "link": "http://www.catcafemad.com/Profile_Erma2.jpg",
                "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe5Rgr11HQvaWmuin4itzBwV_5oF-msXKh14JBhIc3crm2M6u5E_4ytvw"
            },
            {
                "title": "Cat Behavior: 17 Things Your Cat Wants to Tell You | Reader's Digest",
                "link": "http://www.rd.com/wp-content/uploads/sites/2/2016/04/15-cat-wants-to-tell-you-attention.jpg",
                "thumbnail": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQwBmXlaFtzb3TeeRavzIByOHw4y3t3zaYrGZJ7ZmKUakrs-QfmozrwNXbx"
            },
            {
                "title": "Cats",
                "link": "http://a.amz.mshcdn.com/media/ZgkyMDEyLzEyLzA0L2QwL2NhdC5jNEEKcAl0aHVtYgkxNTB4MTUwIwplCWpwZw/4d610ee3/6a7/cat.jpg",
                "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTmxiiBD5MZhp9eL6jXjTWXXolBKNYV_5DwgyXWf6iPPXj-ISIkRG8ehQ"
            },
            {
                "title": "Cat Grooming - Petfinder",
                "link": "https://www.petfinder.com/wp-content/uploads/2012/11/140272627-grooming-needs-senior-cat-632x475.jpg",
                "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTshAJ7eAbNXVHGwLjzP_lpPRPUoD6zd--nVGL-uZWICu2hE_biLFG2M_I"
            },
            {
                "title": "Why These Scaredy Cats Are Absolutely Terrified of Cucumbers - ABC ...",
                "link": "http://a.abcnews.com/images/Lifestyle/AL_scared_cat_jt_151225_12x5_1600.jpg",
                "thumbnail": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcR1ZWhPvSwPNvTQeUMUxqITPtND1Zc4p6rOXGLjvvKx8m5lbKmut6XpuLk"
            },
            {
                "title": "Cute Cat Wallpapers - Trawel India Mails",
                "link": "http://2.bp.blogspot.com/-pATX0YgNSFs/VP-82AQKcuI/AAAAAAAALSU/Vet9e7Qsjjw/s1600/Cat-hd-wallpapers.jpg",
                "thumbnail": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRKWI0t_nK0U7u0Egb_8458fCdJjOM_hxrTHPzWpLzDX7Z0cEjexI-h6T8"
            },
            {
                "title": "Home - Cat Protection Society of Victoria",
                "link": "http://www.catprotection.com.au/wp-content/uploads/2014/11/5507692-cat-m.jpg",
                "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTxw3_3idCv8gD6BAfzm1Y9ihMaI2uGu3rgiG1ilGUp72gpRRiEgAMOXogq"
            },
            {
                "title": "Funny Cats Compilation [Most See] Funny Cat Videos Ever Part 1 ...",
                "link": "https://i.ytimg.com/vi/tntOCGkgt98/maxresdefault.jpg",
                "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMnDp0nNBLHwunbh2DDIBhN_Cj9zwRPq-Hp0sB-LlSWy2ijcFs-uyD-vE"
            },
            {
                "title": "Cat - Wikipedia, the free encyclopedia",
                "link": "https://upload.wikimedia.org/wikipedia/commons/1/1e/Large_Siamese_cat_tosses_a_mouse.jpg",
                "thumbnail": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQxDh6hcBUFT0cHKWZPNYV2lRixnqPHIKoPV9EEVbRCGEcpi67OgXcUNVM"
            },
            {
                "title": "Cat Dandy | Catster",
                "link": "http://d39kbiy71leyho.cloudfront.net/wp-content/uploads/2016/05/09170020/cats-politics-TN.jpg",
                "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSw9OK3LhTPa3CRdtf4khDJvxsIU1QqXHPoG9QFfhGVk4FEpAX-qCZ64gZ3"
            },
            {
                "title": "Feeding in a Multiple Cat Household | Carlton Vet Surgery",
                "link": "http://carltonvet.com.au/sites/default/files/styles/large/public/images/article/cats.jpg",
                "thumbnail": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTB6cRb7EeL_4zDdbG2_5nsCuUxOER-Nn7Dao3F9DngZMxtLisr_IspJw8"
            },
            {
                "title": "Toronto's First Ever Cat Café is Up for Sale - KiSS 92.5",
                "link": "http://www.kiss925.com/wp-content/uploads/sites/59/2016/07/cat-1074657_960_720.jpg",
                "thumbnail": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcS6DLeRhgsPyUQWUejxMOV73Ar4EfM5P97CohsRKMpP3p0SZ_L7I5BRUmE"
            },
            {
                "title": "Saudi Cleric Says Posing for Photos With Cats Is Forbidden",
                "link": "http://s.newsweek.com/sites/www.newsweek.com/files/styles/lg/public/2016/05/25/saudi-arabia-cat-ban.jpg",
                "thumbnail": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSJhn-4GH3LblDD_OQdWhKT91eHpobVdbgFBHyxjmERnfi0xznOBelHAMIb"
            },
            {
                "title": "Cat Behavior: 17 Things Your Cat Wants to Tell You | Reader's Digest",
                "link": "http://www.rd.com/wp-content/uploads/sites/2/2016/04/04-cat-wants-to-tell-you-scratching.jpg",
                "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9b3V9vRR1VUKRwGYubzsGq8dRI5Q8UB2k-XBtpBHuPxBGGkTVR49cdE-1"
            },
            {
                "title": "Cat Facts: 57 Facts about Cats ←FACTSlides→",
                "link": "http://www.factslides.com/imgs/black-cat.jpg",
                "thumbnail": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcS5V5DttClRlzqrGKrr2Ml3lVjwUVXrIT1eViWuJkia1ENZzsEWYYqIuT0"
            },
            {
                "title": "Cats: Adoption, Bringing A Cat Home and Care",
                "link": "https://www.petfinder.com/wp-content/uploads/2012/11/153558006-tips-healthy-cat-632x475.jpg",
                "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRfYAWLnDlb-s9qfWyb7glMuzEVGQDEjN7l3mRJ8qa7hzErX3q-v6hV9J0"
            },
            {
                "title": "Cat Grooming, Cat Daycare, Cat Hotel | Exmoor Pet Services, Austin TX",
                "link": "http://exmoorpet.com/wp-content/uploads/2012/08/cat.png",
                "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWm7jG337aUb1hPzMZiGy6CpMOvHWExlk08QiWdSxAjbylF0eDye2D-g"
            },
            {
                "title": "Cats on About.com - All About Cats and Kittens",
                "link": "http://f.tqn.com/y/cats/1/S/6/V/4/cat-deadmouse2081x1446.jpg",
                "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTJUAJepveAoVy14xEqqhXphiRHXgJaFcEAGcgmufy7Ngu3rNfoNCMd8zA"
            },
            {
                "title": "The Cat Lounge",
                "link": "http://thecatlounge.co.nz/content/cat3.jpg",
                "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRO1iBhIf4La3n-_f6cR-g9s_RiL4TkCA-67a9DasTjFnoz7qdjdtqRhZo"
            },
            {
                "title": "Free stock photo: Cat, Kitten, Mieze, Mackerel - Free Image on ...",
                "link": "https://pixabay.com/static/uploads/photo/2016/05/18/20/57/cat-1401557_960_720.jpg",
                "thumbnail": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTxzGmo1TksTR0M5ggVrnNn0v5R5fsABkp5WUwc0WZKnLtcp7w2MrVm2g4"
            },
            {
                "title": "Grumpy Cat (@RealGrumpyCat) | Twitter",
                "link": "https://pbs.twimg.com/profile_images/616542814319415296/McCTpH_E.jpg",
                "thumbnail": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQg033dmi1f0GlzYRGT69QPXbBPq2i7590YUiYcVpHpodakWwhTnpfz17I"
            },
            {
                "title": "Cats: Adoption, Bringing A Cat Home and Care",
                "link": "https://www.petfinder.com/wp-content/uploads/2013/09/cat-black-superstitious-fcs-cat-myths-162286659.jpg",
                "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjWVP6UFWa7bb7Gmon8kc_rbOvsQHTxH9ZDT6GgsKpQl4jPSSDQdgJQlY"
            },
            {
                "title": "The Top 10 Smartest Cat Breeds - CatTime",
                "link": "http://cdn3-www.cattime.com/assets/uploads/2012/07/abyssinian-cat.jpg",
                "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSi7YpjLenGLnJrNpeMCzLlAlnFVSAlSHGqozTiMOpES05UCqyuqSQbdTG8"
            },
            {
                "title": "Cat - Wikipedia, the free encyclopedia",
                "link": "https://upload.wikimedia.org/wikipedia/commons/9/97/Feral_cat_Virginia_crop.jpg",
                "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQ9z9fCWNcj8AP3oNIH_jRKU-JWX3td5XjAh06CAY8xqq-5d0fwCSVLDbRaWg"
            },
            {
                "title": "Cat Breed Videos A to Z | Cats 101 | Animal Planet",
                "link": "http://r.ddmcdn.com/s_f/o_1/cx_0/cy_0/cw_640/ch_360/w_427/APL/uploads/2014/06/125616108223412937200101197_Abyssinian.jpg",
                "thumbnail": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcROnBf9X6E1yPVrFgWJWnRxXHMLeSGSLm0LLuSFHLrJng1BYsLT4Zer-Q"
            },
            {
                "title": "Cat experts reveal the meaning behind different meows | Science ...",
                "link": "http://static.independent.co.uk/s3fs-public/styles/article_large/public/thumbnails/image/2016/02/25/13/cat-getty_0.jpg",
                "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkBYur6FxrE6U8bB0uX_ui70NjQ5D5V5sYVDkj_LTLLfsckdNBrsTtG9A"
            },
            {
                "title": "Felidae - Wikipedia, the free encyclopedia",
                "link": "https://upload.wikimedia.org/wikipedia/commons/4/4d/Cat_March_2010-1.jpg",
                "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQHs9FzZ-5AEcxVpkwTM5G3ZS2HoqikaZqBQ_LOh_65MQ4nJxg4l19Bu90x"
            },
            {
                "title": "Cat - Free images on Pixabay",
                "link": "https://pixabay.com/static/uploads/photo/2014/03/29/09/17/cat-300572_960_720.jpg",
                "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQZ_BPRDfjivEwrCXCbxUIyP6ZM97PdxRauXMP1nOqV4ypNCIyc0boGcXE"
            },
            {
                "title": "Cat - Wikipedia, the free encyclopedia",
                "link": "https://upload.wikimedia.org/wikipedia/commons/0/0b/Cat_poster_1.jpg",
                "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcR2Xh92H8c0XAv7WlcV1N2K-7N1ofNne9IMQzTx6GAEXvkg8R115gHzUJg"
            },
            {
                "title": "Cats: Adoption, Bringing A Cat Home and Care",
                "link": "https://www.petfinder.com/wp-content/uploads/2012/11/144334862-giving-cat-bath-632x475.jpg",
                "thumbnail": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTchk9Pi2D0YX7S9JMWnvIHScO0_-c4ov6BG-DuGiqW3DEr0Xu1iOQCpMFy"
            },
            {
                "title": "Homeless Grumpy Cat Found During House Inspection Gets Adopted ...",
                "link": "http://static.boredpanda.com/blog/wp-content/uploads/2015/10/fb_thumb_56322c12c74d6.jpg",
                "thumbnail": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRaRsdP876o1oLTs70NfADWPTMrminxFoHldN-8Os5aAj7Q_r37TU9QudQ"
            },
            {
                "title": "The Top 10 Smartest Cat Breeds - CatTime",
                "link": "http://cdn3-www.cattime.com/assets/uploads/2012/07/siamese-cat.jpg",
                "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTGBlD1nFLhK3CZQ8dvwf58et5ZRghM_KdBeMbNv2uBBBKDhgUduzjmptyl"
            },
            {
                "title": "Cat Breeds and Feline Genetics",
                "link": "http://f.tqn.com/y/cats/1/S/a/U/4/PregnantCatStanding.jpg",
                "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQnb27dGEVK4HrgYTgyfJ7rkznIYz2MXhrvIKbS3YEc_-9n1dDPfXyBsFZy"
            },
            {
                "title": "Car - Free images on Pixabay",
                "link": "https://pixabay.com/static/uploads/photo/2012/05/29/00/43/car-49278_960_720.jpg",
                "thumbnail": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQNlDgAXxIxIImHCKFI-fxz0NQNvr-YkieqLynh9Ij8GH04KRgbcSb8opU"
            },
            {
                "title": "Sports Cars | Uncrate",
                "link": "http://uncrate.com/p/2016/03/apollo-arrow-1.jpg",
                "thumbnail": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSzoLC_5upmEC6ro9_-1QLpthl_6hegQ9GYfOPuy0SaKOdSpAyKEPniyyk"
            },
            {
                "title": "Car images · Pexels · Free Stock Photos",
                "link": "https://static.pexels.com/photos/2394/lights-clouds-dark-car.jpg",
                "thumbnail": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQr6Qu0Ik9m2BwXW80UHfMJ1c_nWO69yKOYfCc_C4JXtXRTslmswJrixL0L"
            },
            {
                "title": "Car - Free images on Pixabay",
                "link": "https://pixabay.com/static/uploads/photo/2013/07/13/11/29/car-158239_960_720.png",
                "thumbnail": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT7qsRnT9D7rxZVLhiFFStV_LMMIAESMZr0kwIbJv6hhbnBO5U127n9dN0"
            },
            {
                "title": "2016 Editors' Choice for Best Cars, Trucks, Crossovers, SUVs, and ...",
                "link": "http://media.caranddriver.com/images/media/51/sports-cars-photo-663903-s-original.jpg",
                "thumbnail": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRH7u-3_ErIsox3M-3eqJe4IeXLcAck-cWtpI9XrpHn5KJsVl_L-BVuGfs"
            },
            {
                "title": "Canada Rental Car Classes - Enterprise Rent-A-Car",
                "link": "https://www.enterprise.com/content/dam/global-vehicle-images/cars/CHRY_200_2015.png",
                "thumbnail": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSDaodM7qlHsc4Y9SMdehzxAmObmAtR5bmiNqg1Rio5Gn59ub4FT2AxQjFz"
            },
            {
                "title": "Corvette C7.R comes to Project CARS in the US Race Car Pack on ...",
                "link": "http://www.projectcarsgame.com/uploads/2/0/6/5/20658008/6663822_orig.jpg",
                "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmEZTlOBeyYCprU-0MsPHL23eWSxyZ3y_9F42Vik11grADM2_aP5i-AiiJ"
            },
            {
                "title": "Honda Civic Reviews - Honda Civic Price, Photos, and Specs - Car ...",
                "link": "http://media.caranddriver.com/images/16q2/667349/2016-honda-civic-ex-l-coupe-test-review-car-and-driver-photo-667350-s-450x274.jpg",
                "thumbnail": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQz9vAjzgNdNJmCzN99DuhXCEp365eu4H0W-443dyImb7qtvYw5NRMyAw"
            },
            {
                "title": "Bumper Cars For Sale - Beston Amusement Rides",
                "link": "http://www.bestonkidsrides.com/wp-content/uploads/2016/05/BNBC-06-Beston-amusement-park-bumper-cars-for-sale.jpg",
                "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2LrNxMrxMZ-IpEVedY5X0oN-I8BVz4gRtLX3Np9IZCS4KeGn-ZYJhBtI"
            },
            {
                "title": "Compare Cars by Price, Specs, & Reviews",
                "link": "https://s3.graphiq.com/sites/default/files/4315/media/images/_3856594.jpg",
                "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQt91mxr42pN0SdjIT9IxziiOYXedUZ7DdnK5ISJai7JY9u9fBR0Nahys"
            },
            {
                "title": "2016 Nissan LEAF Electric Car: 100% Electric. 100% Fun.",
                "link": "http://www.nissanusa.com/content/dam/nissan/vehicles/electric-cars/leaf/2016/overview/key-features/2016-nissan-leaf-electric-car-battery.jpg",
                "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjYepbtUFLSlAVj5hcsCS07qKsWUrQR6pIRipkF6y5MpjTxsV14mJkx9I"
            },
            {
                "title": "2016 Editors' Choice for Best Cars, Trucks, Crossovers, SUVs, and ...",
                "link": "http://media.caranddriver.com/images/media/51/sports-cars-photo-663903-s-original.jpg",
                "thumbnail": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRH7u-3_ErIsox3M-3eqJe4IeXLcAck-cWtpI9XrpHn5KJsVl_L-BVuGfs"
            },
            {
                "title": "Car Rental Guide - Alamo Rent A Car",
                "link": "https://www.alamo.com/alamoData/vehicle/bookingCountries/US/CARS/CCAR.doi.320.high.imageSmallSideProfileNodePath.png/1464101580200.png",
                "thumbnail": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTVfyjxZPF6IK7Rl4xay3FDEVRVBP0Q-3cW5E38PNoNUme28Q-YlJpyaw"
            },
            {
                "title": "Rental Cars at Low, Affordable Rates - Enterprise Rent-A-Car",
                "link": "https://www.enterprise.com/content/dam/ecom/utilitarian/common/homepage-us/us-homepage-2up-business-rental.jpg.wrend.640.360.jpeg",
                "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRXdYjMkAy6-BY5OJUQb5OVJ66S7csDAZD15YLvj1apWmygGg9O1mVA4YQ"
            },
            {
                "title": "Avis Signature Series Luxury Car Rentals - Avis",
                "link": "https://www.avis.com/car-rental/images/global/en/common/signature/2015-bmw-3-series-active-hybrid-sedan-side-view-black-sapphire-metallic.png",
                "thumbnail": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRWQlxDWVbWAUvEkui_ftGvwrlWWz6IhuDaka53CuNuhmirq6WqxGOslg"
            },
            {
                "title": "2016 10Best Cars: The Winners, Features, Photos, and More ...",
                "link": "http://media.caranddriver.com/images/media/51/2016-10best-cars-lead-photo-664005-s-original.jpg",
                "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVRFLh1WXbhB9CW1mcZRah3tvrh7In8Jib3oDWAwmmmHLV7gd-uP8Jz5q_"
            },
            {
                "title": "New & Used Car Reviews & Ratings - Consumer Reports",
                "link": "http://static4.consumerreportscdn.org/content/dam/cro/news_articles/cars/CR-Cars-PC-Hyundai-Tucson-11-15.jpg",
                "thumbnail": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSFi6k3JGSnKm46zqO6fDFnbujNgdWh5KTVZd1TlTBEfUV-7-X2rsrCFw"
            },
            {
                "title": "2016 Editors' Choice for Best Cars, Trucks, Crossovers, SUVs, and ...",
                "link": "http://blog.caranddriver.com/wp-content/uploads/2015/11/BMW-2-series.jpg",
                "thumbnail": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTrzSTBNU8tc52IWXMiyRSgZC2Cl24P1ViWwgO1C5OPNhIQD_oN1HNzqjc9"
            },
            {
                "title": "Used Cars for Sale, Pre-Owned Car Dealerships - Enterprise Car Sales",
                "link": "http://www.enterprisecarsales.com/Media/Default/home/Under13KLineup.jpg",
                "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTJ2baM3du1qhBmCANc1W3zs_eNsGtbg99Qdxedvm3qyWvwV7QVmXNP3Uw"
            },
            {
                "title": "Choose your electric car - Go Ultra Low",
                "link": "https://www.goultralow.com/wp-content/uploads/2015/02/Golf-GTE-for-GUL2.png",
                "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_d48zgNjpVULYmWVVWhOTdr-T0hhwkriEneHK6CHeOIL1j_3CuMzb2nw"
            },
            {
                "title": "Exotic Car Rental Collection By Enterprise",
                "link": "https://exoticcars.enterprise.com/etc/designs/exotics/clientlibs/dist/img/homepage/Homepage-Hero-Car-Mobile.png",
                "thumbnail": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTE1gr7ZmZs8oazc-lqvkcPaSS1BxTRm5Mibpap92h78krKs4x2TTi9_w"
            },
            {
                "title": "Exotic Car Rental Collection By Enterprise",
                "link": "https://exoticcars.enterprise.com/etc/designs/exotics/clientlibs/dist/img/homepage/Homepage-Hero-Car.png",
                "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTCL-rOOdhqg8HC9pCFx-i6a48h7y_x__TCnpAtExtOpl0nZLjgT4pFVCYV"
            },
            {
                "title": "New & Used Car Reviews & Ratings - Consumer Reports",
                "link": "http://static4.consumerreportscdn.org/content/dam/cro/New%20Homepage%20Assets/Hover-Over%20Lifestyle%20Cards/CR_product_card_all_cars.jpg",
                "thumbnail": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQXKL2yrqdZJeGzVAKXHGfTmMdSJ4Jhhr54ijUNuoi7qORSSnWBVx7MCkE"
            },
            {
                "title": "Rental SUVs in United States - Enterprise Rent-A-Car",
                "link": "https://www.enterprise.com/content/dam/global-vehicle-images/cars/FORD_FOCU_2012-1.png",
                "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRrZQa7YIHJbxbZYpDNv6cRBICOqucSV51g3gDHTB6e6CUn-SD8xN8mZik"
            },
            {
                "title": "Car - Free images on Pixabay",
                "link": "https://pixabay.com/static/uploads/photo/2013/07/12/13/21/sports-car-146873_960_720.png",
                "thumbnail": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSM9uqbH7l6mDrVX50YY2i1N_Hdq4emgrsQsGoN1_wqVFDvZ2JJhfW4DJ7h"
            },
            {
                "title": "1000+ ideas about Cars on Pinterest | Porsche, BMW and Ford",
                "link": "https://s-media-cache-ak0.pinimg.com/736x/68/ba/76/68ba7658f48d5b30f38137cd67bf1592.jpg",
                "thumbnail": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQZnu1shU3UB0UoYe1XCUNwh50duFPtYmGPuI6hHzOP1wiicynZaELRsIhA"
            },
            {
                "title": "Tom The Tow Truck and the Racing Car in Car City |Trucks cartoon ...",
                "link": "https://i.ytimg.com/vi/6w1wZz36jhM/hqdefault.jpg",
                "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQm8zEJ06d8gcMRQoMOK52p2n6n41-n-N2P0IDad_iKIDWeNJvZhVQeh4dO"
            },
            {
                "title": "iRacing Cars | iRacing.com Motorsport Simulations",
                "link": "http://s100.iracing.com/wp-content/uploads/2013/01/tile_chevy-ss-gen6.jpg",
                "thumbnail": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQ3nsPYI7PbpV6AtJtzFXYVemGjl8jOtRiDsH-utV3103xtD9Hx4vZe7Zw"
            },
            {
                "title": "Cars for kids. Learning Colors. Car painting. - YouTube",
                "link": "https://i.ytimg.com/vi/ebULc09Meoc/maxresdefault.jpg",
                "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRTJKO6Lcivek3lB7bmEt_YBLs46ZPiCwf7ZY0m1xllLZkX8SyISwbCeeE"
            },
            {
                "title": "Interpretation of a dream in which you saw «Car»",
                "link": "http://weknowyourdreams.com/images/car/car-04.png",
                "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSGhWNosnB4S87xiE4nrdi18RicCap8OyFTeWMX4Eax6QUNDXypJbHpBXm8"
            },
            {
                "title": "Car images · Pexels · Free Stock Photos",
                "link": "https://static.pexels.com/photos/50704/car-race-ferrari-racing-car-pirelli-50704.jpeg",
                "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi0qRuk8YEZhWMyCykXk7XGq7SGcapnPR8DtvbdC3AbGH3bwHPMazoo9Q"
            },
            {
                "title": "Used Cars to Avoid Buying - Consumer Reports",
                "link": "http://static4.consumerreportscdn.org/etc/designs/electronics/images/truecar_cars_ad.png",
                "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvEim-kzMwg1BSbpTsP55IL1ZqKvIDyzdr0b5Wy77WrpHbT37cAxGBbL49"
            },
            {
                "title": "Car - Free images on Pixabay",
                "link": "https://pixabay.com/static/uploads/photo/2014/09/07/22/34/car-race-438467_960_720.jpg",
                "thumbnail": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSCx395Q_FweQLc75PuR-v7OHhrvltdhhEmjh6vcJzFajaECu7D9dDfWzQV"
            },
            {
                "title": "Car.com - We Do the Research, You Do the Driving",
                "link": "http://img.autobytel.com/car-reviews/autobytel/11694-good-looking-sports-cars/2016-Ford-Mustang-GT-burnout-red-tire-smoke.jpg",
                "thumbnail": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcS985vI2ClgxX0vEXZdSMiStWUkeMtkg0IXIjrtRMoY2MGYR_kZy6k56ko"
            },
            {
                "title": "Britain's 'perfect' car is good science, bad car design - Autoblog",
                "link": "http://o.aolcdn.com/hss/storage/midas/8cbf0af8754582fafd38e4ab78768c73/202818273/crazypopularcar.jpg",
                "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKPy0AZCEljSZ8kzlpwNW0my7fd9gxcDvJtEEjkeq9S1UvrkzC7XFfLgO_"
            },
            {
                "title": "Car Sharing: An Alternative to Car Rental with Zipcar",
                "link": "http://dru-cdn.zipcar.com/sites/default/files/images/honda_newbranding.png",
                "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSer_QyWxwpKJkfpWiJ59Yvqa0kr6kybQXm-KYlOzjAuJ-pGwHseV7peU0"
            },
            {
                "title": "Interpretation of a dream in which you saw «Car»",
                "link": "http://weknowyourdreams.com/images/car/car-08.png",
                "thumbnail": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSDxfwisu9GasCLfz1d1kBVT_PAG-IbLjWRz7RLFLGWY5s7ob90w0189Dc"
            },
            {
                "title": "UK Rental Car Classes - Enterprise Rent-A-Car",
                "link": "https://www.enterprise.com/content/dam/global-vehicle-images/cars/VAUX_INSI_2014.png",
                "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTRlqzsz_mUhybjzAtUb2ZDHMFGSIUVF4hsNAV4AlJO4Z-6JOj4N7RuDKY"
            },
            {
                "title": "LED light bulbs | car interior & exterior | Philips",
                "link": "http://www.usa.philips.com/c-dam/b2c/category-pages/lighting/car-lights/master/footer/nafta-car.png",
                "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-T4ZOQzPKYKh3hHJbyVxnqJKvcAsGk6swo6GmK_NB77em4D0-lbHYbgU"
            },
            {
                "title": "Google Self-Driving Car Project",
                "link": "https://www.google.com/selfdrivingcar/images/car-side.png",
                "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRYCIS97KlUvqw21WNgLzFCx6G3OpkJn0HJSUiw-bxdqBnVJUdmNX-QjuM"
            },
            {
                "title": "iRacing Cars | iRacing.com Motorsport Simulations",
                "link": "http://s100.iracing.com/wp-content/uploads/2015/09/xfinity-toyota-camry_tile.jpg",
                "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTnP25EKxR3-o5DnLS6cKG28cfsy4EUqXFthWHFrmxf37UXQQE_K2ph30VT"
            },
            {
                "title": "25 Cars Worth Waiting For: 2016–2019 – Feature – Car and Driver",
                "link": "http://media.caranddriver.com/images/media/51/25-cars-worth-waiting-for-lp-ford-gt-photo-658253-s-original.jpg",
                "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQf_kKvSclRQiW7MCKi6AjqYt-P0Pyed6LlxyRIbCooMNmKerovfpUFkgI"
            },
            {
                "title": "New and Used Cars For Sale, Reviews, News, Service | Cars.com",
                "link": "https://www.cstatic-images.com/stock/1680x1680/28/img-1773720671-1468609294128.jpg",
                "thumbnail": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcT8ytADM_QK02fy6SicelVIRfR4U6hedPAWqLJ0cltJQmncD4WBec5oVi8o"
            },
            {
                "title": "Rental Cars in United States - Enterprise Rent-A-Car",
                "link": "https://www.enterprise.com/content/dam/global-vehicle-images/cars/TOYO_RAV4_2014.png",
                "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSCQsQ_U34w51z5ofW-PJqIYpSh8bQLjsBa1ENDaUVnEX1outwXYddMGvs"
            },
            {
                "title": "Interpretation of a dream in which you saw «Car»",
                "link": "http://weknowyourdreams.com/images/car/car-06.png",
                "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQP4BeXm3n77yQUctc4qPEzBvVOoI8Ls40nGCj3UFE5R0CqnMzXkXWiHwGV"
            },
            {
                "title": "Car - Free images on Pixabay",
                "link": "https://pixabay.com/static/uploads/photo/2015/09/12/21/31/car-937414_960_720.png",
                "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcS1G82G1dxvIim2sjiw_kcaHdw3DZYOuhhZ8S-hqph7TGrTZHpdSC7Zjbox"
            },
            {
                "title": "Mount Rainier - Wikipedia, the free encyclopedia",
                "link": "https://upload.wikimedia.org/wikipedia/commons/a/a2/Mount_Rainier_from_the_Silver_Queen_Peak.jpg",
                "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQM8XwpsypFu5her15u4NZvyJv-p0uBuBzE6BhDpkRDN5ZsgcQnL8CBR_Xc"
            },
            {
                "title": "Mount Rushmore National Memorial - Located near Rapid City, SD",
                "link": "http://www.visitrapidcity.com/sites/default/files/images/rushmore-goat.jpg",
                "thumbnail": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRvXZRso1HpF1DWtoET-96AzW-Ad7yjyDAaZ_Cvu1PjVfTeFnYALzmQMrK3"
            },
            {
                "title": "Kuss Peak, Mosquito Peak, Treasurevault Mountain, Mount Tweto ...",
                "link": "http://images.summitpost.org/original/335463.JPG",
                "thumbnail": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTjA6_1oGhaqGgkf6EI1IuquWsuLGaoqq6LPqKkrRv2QOuxl4gmLfAc6Ws"
            },
            {
                "title": "Mount Carmel (BiblePlaces.com) – BiblePlaces.com",
                "link": "http://www.bibleplaces.com/wp-content/uploads/2015/07/Mount-Carmel-south-of-Wadi-Oren-tb050403111-bibleplaces.jpg",
                "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTmxPqL3yXypn3TgNEojg3-56EjizXGw9eBaMQEw4hj1dZzTc6BJiuh-Qw"
            },
            {
                "title": "Mount Pilatus #7024417",
                "link": "http://7-themes.com/data_images/out/47/6931091-mount-moran.jpg",
                "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQsFgVthCxWWGyueRrJVVHEnHCZFunmYPeNqlX_KWwBo6NlovqG6Pp6UcA"
            },
            {
                "title": "Plan Your Visit - Mount Rushmore National Memorial (U.S. National ...",
                "link": "http://home.nps.gov/mwr/moru/images/B42E4315-1DD8-B71C-0E7369F555AC34BB.jpg",
                "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSxD75iDooDqm9YVVCsRdiF_KfZ2tfuiZnZi1BS1eUNOIo7GvMIr0q4ufGD"
            },
            {
                "title": "Mount Taranaki - Stratovolcano in New Zealand - Thousand Wonders",
                "link": "http://static.thousandwonders.net/Mount.Taranaki.original.28746.jpg",
                "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSbeAPaivmfkz2WHXHE3GOzNYHoM9v3wrwKoDrScgPlc_uCuIb6gbmcHPM"
            },
            {
                "title": "Mount Seymour Trail | EveryTrail",
                "link": "http://images.everytrail.com/pics/fullsize/1568646-Mount_Seymour_Summit_View__south__9.jpg",
                "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRnvZTRLSNgLE-oVnMgCPJvczYGqREImBDzy3e0uTVxs5YE8oaOVpzYkgI"
            },
            {
                "title": "Mount Wister - Wikipedia, the free encyclopedia",
                "link": "https://upload.wikimedia.org/wikipedia/commons/0/06/Mount_Wister_Grand_Teton_NP1.jpg",
                "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQd8UBOIKVjScde8cCF37xNMFir-bFdOVr2-bxUVkiHrrcKYxHx6DEKmF_Z"
            },
            {
                "title": "Mount Meru - Kilimanjaro",
                "link": "http://www.ultimatekilimanjaro.com/photos/mount_meru.jpg",
                "thumbnail": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQ_8jHEHi0eTQY-vUkkAQkkLNZw20WWjBqB8cIzxJvrReVGKV5KtPwKf5Y"
            },
            {
                "title": "Bali Mount Batur Travel Pictures: Indonesia, Kedisan, Toya Bungkah ...",
                "link": "http://www.tropicalisland.de/DPS%20Bali%20Mount%20Batur%20and%20Lake%20Batur%200%20b.jpg",
                "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX80WYo1MLg7DMidL0ZCt750C4MZOjqcdkFoTdD6Uoa3K-QAD4sAGMimxK"
            },
            {
                "title": "Mount St. Helens: Evidence in Support of Biblical Catastrophism",
                "link": "http://creationwiki.org/pool/images/thumb/0/09/Mount_St._Helens.jpg/400px-Mount_St._Helens.jpg",
                "thumbnail": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRiKXWKo6vFSNEudpHRD944FUu_kG-N8qd2QyWGR1Go31sxZoq32Ot3sA"
            },
            {
                "title": "Gifford Pinchot National Forest - Home",
                "link": "http://www.fs.usda.gov/Internet/FSE_MEDIA/fseprd476073.jpg",
                "thumbnail": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTgcj_3d3tDUQE_vYvcjMqTlgZA8QY9hpwS-H5rVU6KFy6zBxhK3OExDbw"
            },
            {
                "title": "AYR MOUNT – Classical American Homes Preservation Trust",
                "link": "http://3rr5m4277iau446o932day88.wpengine.netdna-cdn.com/wp-content/uploads/2013/10/ayrmount4.jpg",
                "thumbnail": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRU9ZEm6rYhaQ0_Yoj-mGbEQGAuoPP93eQek4YUOOlZXVenI1H3LnEjH77e"
            },
            {
                "title": "2880x1800 Mount rainier national park Wallpaper",
                "link": "http://www.mrwallpaper.com/wallpapers/mount-rainier-national-park-2880x1800.jpg",
                "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcR_F9Wa37vqLwqassK1M4NaBynvs7qV4PAg3AZ_NPceneq9THFbEfERDUSC"
            },
            {
                "title": "Mount Cleveland: Active volcano in Alaska's Aleutian Islands",
                "link": "http://geology.com/volcanoes/cleveland/mount-cleveland.jpg",
                "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToQg8bzptrb0DMMZPIRHP-L8A0QMXuXOvbeKDl7_B3JTe8SjM5DqaRfk0"
            },
            {
                "title": "Mount Rainier National Park | MapQuest National Parks",
                "link": "http://o.aolcdn.com/os/mapquest/national-parks/photos/park-pano/mount-rainier-national-park.jpg",
                "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQKfH-0zWcV61PZjtZORjBxyN3TXV7no570EoCwJMPqfisOL0J0txGHsi0"
            },
            {
                "title": "Mount Triumph - Wikipedia, the free encyclopedia",
                "link": "https://upload.wikimedia.org/wikipedia/commons/4/4d/Mount_Triumph_25911.JPG",
                "thumbnail": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQdBRVV6WQqw-uIDo44KZugfvvcU7bhsj7Q9z1ROSQE2y-egFUMKlM8gvyj"
            },
            {
                "title": "Mount Whitney wallpaper | 2560x1600 | #84138",
                "link": "http://eskipaper.com/images/mount-whitney-2.jpg",
                "thumbnail": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRcR9BMeNYIOe5IQ2SJagSZcSY79x9hL52cHan7Ebv3HVS9ltUfHlmyKe2n"
            },
            {
                "title": "Skywatch Friday: Mount Washington — Birding in Maine",
                "link": "http://www.birdingmaine.com/wp-content/uploads/2009/07/mount-washington.jpg",
                "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQCNbv7mDAKDDOTmIlq75ek-hi6VjwrFQ7Xkwknc8weZNQoHRT01SNXPG0"
            },
            {
                "title": "Mount Wilhelm - Wikipedia, the free encyclopedia",
                "link": "https://upload.wikimedia.org/wikipedia/commons/2/2d/Mount_Wilhelm.jpg",
                "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcReK_ai4C84NRfCAotphNkqv4dCV7S-XLU_mkJf3uNKeqBD7-7KhKGXa-A"
            },
            {
                "title": "Free stock photo: Mount, Ruapehu, Mountains - Free Image on ...",
                "link": "https://pixabay.com/static/uploads/photo/2012/06/28/09/31/mount-50920_640.jpg",
                "thumbnail": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTGrStx0IQqYU9jLn73yplnOnpr5mVvJD5mOOcbsZ-FaFLbfiQ2brTb4cZv"
            },
            {
                "title": "Mount Sinai - Wikipedia, the free encyclopedia",
                "link": "https://upload.wikimedia.org/wikipedia/commons/e/e6/Mount_Moses.jpg",
                "thumbnail": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRQz4ixCOKEpwq9Z1S0T8towC2LEtSyeNEZWEl9iKEOUucwmYHH38wjeHwu"
            },
            {
                "title": "Mount of Beatitudes (BiblePlaces.com) – BiblePlaces.com",
                "link": "http://www.bibleplaces.com/wp-content/uploads/2015/07/Mount-of-Beatitudes-hillside-tbs75359303-bibleplaces.jpg",
                "thumbnail": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRvkAQU0sT7VViuYXTozboHLiDFeyaeCdv9eeD6bsyGn4wZgouZEwmFBw"
            },
            {
                "title": "How Climbing Mount Everest Works | HowStuffWorks",
                "link": "http://s.hswstatic.com/gif/climbing-mount-everest-5.jpg",
                "thumbnail": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSJpkvNmH3aqllQr-wwxDpML9Gyqtdo4dfNkjTwr_fTImCJnyEv2S1CVg"
            },
            {
                "title": "Mount Gede : Photos, Diagrams & Topos : SummitPost",
                "link": "http://www.summitpost.org/images/original/838872.JPG",
                "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcS6NgdwdYjqJwWPWScDvVfI27yOAZlh7OiE4aMf8dXTUNSpUtCXhNy9ChU"
            },
            {
                "title": "Mount Stuart - Wikipedia, the free encyclopedia",
                "link": "https://upload.wikimedia.org/wikipedia/commons/5/59/Mount_Stuart_7814p.JPG",
                "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRHZR-svopQKthpTtDU1Hc5xRWA_2jTaGn9pzb5LKyUuwATOTemEQ4PlTlt"
            },
            {
                "title": "USGS SIM 2832: Mount Scott",
                "link": "http://pubs.usgs.gov/sim/2832/photos/4-Mount_Scott.jpg",
                "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQb-qK7JfgLrYRSJB1QMcBltcQFvdXIlrAqzjAnFVMYsiUlzMdEDgZGNf9g"
            },
            {
                "title": "Park Details - Mount Nemo",
                "link": "http://www.conservationhalton.ca/uploads/img/mount-nemo-fall_3.jpg",
                "thumbnail": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSkMnRdbuMafMVy2HtVI3S78hxwCN9Pmi0hq7zERKPHdewte-PHJU5Njfmd"
            },
            {
                "title": "Hike Mount Nittany",
                "link": "http://www.hikemountnittany.com/images/Mount_Nittany-superwide.jpg",
                "thumbnail": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRm73wuebZ-atCiykPPyfaWd5qqZFO1Gjgl48eEwozze78T_bjH6Zrqim4"
            },
            {
                "title": "Minecraft Mount Doom - YouTube",
                "link": "https://i.ytimg.com/vi/j68EqfQCIt8/maxresdefault.jpg",
                "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSE4MjczqfuCBZNBSZWRA3XfXGwxHhloLI7OrcBHvk_iQvwJ1OqI0j96cc"
            },
            {
                "title": "World California Scenic Mount Shasta : Desktop and mobile ...",
                "link": "http://hdwallpaper.ws/images/2012/09/-World-California-Scenic-Mount-Shasta-Fresh-New-Hd-Wallpaper--.jpg",
                "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTevEEpqtfr7XFUHZEXdWx7xVfqNUCJel3-eiWlpkA9oqqiZx7G3zSnJlHq"
            },
            {
                "title": "Mount Everest - Wikipedia, the free encyclopedia",
                "link": "https://upload.wikimedia.org/wikipedia/commons/d/d1/Mount_Everest_as_seen_from_Drukair2_PLW_edit.jpg",
                "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzj2kdkUkLvY_fzekFatL4V1Cdd8vTLMqzJLAve1PCxTzreW17tnjKLxg"
            },
            {
                "title": "Mount Snow Golf School - The Original Golf School",
                "link": "http://www.theoriginalgolfschool.com/images/mount-snow1.jpg",
                "thumbnail": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSIJb4m7COXI8C7aexsj-W11BN03y3bblTvbTYSYe_qQIzpERJV51eNmQ"
            },
            {
                "title": "Mount Ogden East of JimAndLeah's Online Tuner",
                "link": "http://www.smeter.net/ogden/images/mount-ogden-repeaters.jpg",
                "thumbnail": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSe9hTX1ma1o2S107i2YcVav509xoMAF0TDNJh4gbzMXhcnUH6kSYj9KLo"
            },
            {
                "title": "World California Scenic Mount Shasta : Desktop and mobile ...",
                "link": "http://hdwallpaper.ws/images/2012/09/-World-California-Scenic-Mount-Shasta-Fresh-New-Hd-Wallpaper--.jpg",
                "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTevEEpqtfr7XFUHZEXdWx7xVfqNUCJel3-eiWlpkA9oqqiZx7G3zSnJlHq"
            },
            {
                "title": "mount everest Archives - SnowBrains.com",
                "link": "http://snowbrains.com/wp-content/uploads/2013/10/mount-everest-1.jpg",
                "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcThSb3y_GRISkhX7ngfNyxB86lE0yZ6AdvRWGT-m5DfU8ueQvkNRS2glM4"
            },
            {
                "title": "Mount Everest The Top Of The World - Traveler Corner",
                "link": "http://travelercorner.com/wp-content/uploads/2016/03/MOUNT-EVEREST-beautiful-sunshine.jpg",
                "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIX7tVCipguaKV9_okAseNH94yd1Hu6vXltcVTsRJhhjuVat1aGssJubM"
            },
            {
                "title": "Mount Kenya - Wikipedia, the free encyclopedia",
                "link": "https://upload.wikimedia.org/wikipedia/commons/7/7c/Mount_Kenya.jpg",
                "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS66PjaoQsCAX7spjpTYeqYrVpq0edhRxZx7yA2doKIVGOjw7YnlGAx-h4"
            },
            {
                "title": "Mount hood oregon #6965557",
                "link": "http://7-themes.com/data_images/out/57/6965557-mount-hood-oregon.jpg",
                "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2XbaUnZt8tPiAhKcuRqqsktVUMaTiYmDoelqZj8cu12tpnr8X5nWJmvo_"
            },
            {
                "title": "Mount Merapi travel guide - Wikitravel",
                "link": "http://wikitravel.org/upload/shared//thumb/f/fe/Mount_Merapi_steaming.jpg/350px-Mount_Merapi_steaming.jpg",
                "thumbnail": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRfn-DQBYNiCTDxwFrS_5QO07WgVLYQ3GsDTJscWvFvrBWWZ_h3CZQZLg"
            },
            {
                "title": "Mount Evans - Highest Paved Road in North America",
                "link": "http://www.mountevans.com/MountEvansCom/Images-2011/MTE-Road-Aspen-2011-09-30-Panorama-04.jpg",
                "thumbnail": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTZpNsXra1PduAfC7uziiX-9r-S-BU2WC61g2z4eF8Jpy0SFDF5ZoMwsdI"
            },
            {
                "title": "Wallpapers Mount 1024x768 | #170386 #mount",
                "link": "http://www.wallpapersxl.com/wallpapers/1024x768/mount/170386/mount-170386.jpg",
                "thumbnail": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcStmT2uhkBacYrs_qFwvTONU1ZtKNsaoBUkPAvIvEbgpPHek8vH1k4Azfo"
            },
            {
                "title": "Mount Batur - Wikipedia, the free encyclopedia",
                "link": "https://upload.wikimedia.org/wikipedia/commons/3/36/Mount_batur_and_lake.jpg",
                "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQ1pNJBav6M2_895kF5DwjbRq6VzxH_ORHzwwH6gX82jRYchjoyUk3pnm4"
            },
            {
                "title": "Mount Kidd | Christopher Martin Photography",
                "link": "https://chrismartinphotography.files.wordpress.com/2012/10/mount-kidd-c2a9-christopher-martin-1079.jpg",
                "thumbnail": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTrmiNu-0_76_EPOt8fPGH6UbwgaWtrLGBeDDI2Ci5zQNlbf2W1Pcr5ILE"
            },
            {
                "title": "What is Beneath the Temple Mount? | History | Smithsonian",
                "link": "http://thumbs.media.smithsonianmag.com//filer/Temple-Mount-Dome-of-the-Rock-631.jpg__800x600_q85_crop.jpg",
                "thumbnail": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSZtkT-IGoYnBEi6DLXr6WJLHOORSETqIFQlJD3EAbWb0hMZ4WAHA1K4B9H"
            },
            {
                "title": "File:Mount Somugi green.jpg - Wikimedia Commons",
                "link": "https://upload.wikimedia.org/wikipedia/commons/5/5f/Mount_Somugi_green.jpg",
                "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcS1iTGhJdHaWEyP8iFYF18KK7_R8toyT3y3jwl2JanpOvEsfGIFOtP53OY"
            },
            {
                "title": "Business Internet Solutions - Call-OneCall-One Communications ...",
                "link": "http://www.call-one.ca/wp-content/uploads/2015/03/residential-home-cable-wireless-high-speed-internet.jpg",
                "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQ0dj2mY1euXf7kCAaLPcHVyoT6Eb1z8U8VbzG7MAGEELa8E8-jv_AoPg"
            },
            {
                "title": "Microsoft retires older Internet Explorer versions, leaving ...",
                "link": "http://zdnet1.cbsistatic.com/hub/i/r/2016/01/12/7c7577b1-735d-49b9-ae8d-71fc52b69d16/thumbnail/770x578/ef74cf594b94bb1250a17e64ae8b3723/atlas-ie.gif",
                "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSF8Tb7UMIOxpIQRr3pCIMjChrdWeMQBbofEqWPVUb0maWolxec5BFPVr4"
            },
            {
                "title": "Internet - OCDE",
                "link": "http://www.oecd.org/media/oecdorg/topics/internet/48405289.jpg",
                "thumbnail": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQGWHMp9omtWgXnyl0tn7FDh6raWbdUAM-kJB-623SJhjB3fPiK6vUGHHg"
            },
            {
                "title": "Interpretation of a dream in which you saw «Internet»",
                "link": "http://globe-views.com/dcim/dreams/internet/internet-06.jpg",
                "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQyiUibjyTwp1oO1nBjGXFq28HIc7DUmJzIZx5BfDowClI5WT1MNgBSVQ"
            },
            {
                "title": "Internet by Jonas Dragendorf on Prezi",
                "link": "http://smarterware.org/wp-content/uploads/2016/03/Internet.jpg",
                "thumbnail": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTkMrf_cupLXQynr6RNhwWTHlUZvggpGg74CtnS7u3uR_fJ27Pc3KE7-HM"
            },
            {
                "title": "Broadening the Oversight of a Free and Open Internet - WSJ",
                "link": "https://si.wsj.net/public/resources/images/BN-NO290_crocke_P_20160414152611.jpg",
                "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPKkrI-y2xL-CAkt0bl5cWEsUTMIDKqVSjo4UV3LY3kwj0lI7GV6LE2xAQ"
            },
            {
                "title": "Internet - Simple English Wikipedia, the free encyclopedia",
                "link": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Internet_map_1024.jpg/319px-Internet_map_1024.jpg",
                "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMQvMubXP7XIOEyniP4olrLPS8N4Ma9zuK3yCqJMlioeW1JeG-i0L0qw"
            },
            {
                "title": "Contra-Internet GIFs | Rhizome",
                "link": "http://media.rhizome.org/blog/9583/Contra-Internet-Bottom.gif",
                "thumbnail": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQi51-6IqU1jTeDHFgX-4TULg9s7dpV8nrqMgaG8_inzamA7XWX6pTTcLMR"
            },
            {
                "title": "Dish Network, DIRECTV, Internet & Phone | Greensboro & Burlington, NC",
                "link": "http://sattvworld.com/wp-content/uploads/2016/05/ball-419198_960_720.jpg",
                "thumbnail": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTZKZv1GnCLMcPw8SJOwb683VI2ULuzERgVv8NvAj8YWc4rGNZFxy7LxQg"
            },
            {
                "title": "Who Invented the Internet? – Whoo Invented?",
                "link": "http://www.nepaldaily.com/wp-content/uploads/2015/07/internet-marketing-2.jpg",
                "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWNnuhZTzHZ3rgq2ZmVCzjDnjEmX17YCG4dISld78pBskXd4eBgMezxz7W"
            },
            {
                "title": "Interpretation of a dream in which you saw «Internet»",
                "link": "http://globe-views.com/dcim/dreams/internet/internet-03.jpg",
                "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRHGYOC5ZSzOL4xgL4OKnU4QGdop_1BmLv9Geb5PcWvoEZHtnmR8jcP9q-g"
            },
            {
                "title": "MXD Systems The Internet of Things & Manufacturing Pt.2 | MXD Systems",
                "link": "http://www.mxdsystems.com/wp-content/uploads/2015/04/58525796_thumbnail.jpg",
                "thumbnail": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT1eW4Dc18CN6tqYTYpzLzSq8NUXXv9LIzIbezm1qxf-q9Rm-PxM7P-YJCWxA"
            },
            {
                "title": "Spicenet.co.tz » Business Internet",
                "link": "http://spicenet.co.tz/wp-content/uploads/2015/01/Dedicated-Internet.jpg",
                "thumbnail": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQdfkvhO0bEFxn8e8EtkHdIAlnDtUXL1j4CmzDdRvbbq56q1JJExYn06Ftr"
            },
            {
                "title": "Court rules internet a utility, not a luxury | alan.com",
                "link": "http://www.alan.com/wp-content/uploads/2016/06/29112015093328inter.jpg",
                "thumbnail": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTJCTrLTRjiBCWSXA3wC5CP0nndJ4SJyEXtGaIdIQr6RRBwyUNyJJL617je"
            },
            {
                "title": "MIT Professional Education announces new online course on the ...",
                "link": "http://news.mit.edu/sites/mit.edu.newsoffice/files/images/2016/internet-of-things_0.png",
                "thumbnail": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSq09LUhJYsWtiOhRCNbpA_sWooyR8q8UV8vtHTy0jckGpnEaM9lW5QH1s"
            },
            {
                "title": "Quest-Internet-101.jpg",
                "link": "http://www.questnet101.com/wp-content/uploads/2015/04/Quest-Internet-101.jpg",
                "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRoto-t9dX9qBv7I5BY8r6hPEVLdtWi9a3kZTanB8mk9x2k5qenvW3zBQ"
            },
            {
                "title": "FCC Approves Net Neutrality Rules but the Battle for an Open ...",
                "link": "http://www.1to1media.com/weblog/HiRes.jpg",
                "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRQO8Ljc0IHta9RaSqjVZm365MO2sp6K0hDdtLvw2W9E8bwHxqcUWK3zlaX"
            },
            {
                "title": "The Best Internet Browser Software of 2016 | Top Ten Reviews",
                "link": "http://cdn.toptenreviews.com/rev/prod/534-internet-explorer-box.jpg",
                "thumbnail": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRAqJ2riYS77Y9J5Eo66OacZX8w0xU8dojQnpw72ROQ28fCRdiyYIP8Ow"
            },
            {
                "title": "10 Darkest, Deepest Parts Of The Internet - YouTube",
                "link": "https://i.ytimg.com/vi/CHS9Vd23B4w/maxresdefault.jpg",
                "thumbnail": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcR9L4kONw4iFzWAO3AZOj8VczrSI2f7rwvORSYqd_1qqOAcWf1t7h0ry9aq"
            },
            {
                "title": "Free illustration: Online, Internet, Icon, Symbols - Free Image on ...",
                "link": "https://pixabay.com/static/uploads/photo/2015/09/16/08/55/online-942405_960_720.jpg",
                "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSm7A6Furng1r1-VnEHHeyOZgLtUFo2lXgE8RwA0ydMrELfk9sVZ240y3M"
            },
            {
                "title": "File:Réprésentation d'internet.jpg - Wikimedia Commons",
                "link": "https://upload.wikimedia.org/wikipedia/commons/e/e9/R%C3%A9pr%C3%A9sentation_d'internet.jpg",
                "thumbnail": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTCFe8Wa4afxV6yrWGSMInQmI56aLXjpqt14eVhrKmLTfcISEypoXQw37MZ"
            },
            {
                "title": "Internet of Things Analytics",
                "link": "http://cdn2.hubspot.net/hub/435009/file-1725596059-jpg/images/blog1.jpg",
                "thumbnail": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSlG_aHLOdVRSjkhoW29nYU6TDeTSVTYZfp-YSZSM9-eEsWzvkaJIYgRWU"
            },
            {
                "title": "Internet - Free images on Pixabay",
                "link": "https://pixabay.com/static/uploads/photo/2012/04/26/14/14/internet-42583_960_720.png",
                "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_StAbFmR8GJkSwr8f2op3VW-2nZ81NBmwZCZRHVOk7T05N8hcMlWhTmw4"
            },
            {
                "title": "The future is the Internet of Things—deal with it | Ars Technica",
                "link": "http://cdn.arstechnica.net/wp-content/uploads/2015/10/network-782707_1280-980x637.png",
                "thumbnail": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRhmf0Cz8AMshpciMHxNW0aIWEGV_gy8sFKqeWvl-BrMCo-WJlZN7DDcHgg"
            },
            {
                "title": "Internet Services | High Speed Internet | CTI Networks",
                "link": "http://www.ctinetworks.com/images/post-images/dedicated-internet.jpg",
                "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSh3EioEeSDgA4Buw5BsSNfk6JZolg5St5QMJcKlvYHqlL83ldL5Un1IZmQ"
            },
            {
                "title": "Free illustration: Online, Internet, Icon, Symbols - Free Image on ...",
                "link": "https://pixabay.com/static/uploads/photo/2015/09/16/08/56/online-942410_960_720.jpg",
                "thumbnail": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSP3sc9U2A8orLt8q9-nXLdc43Tt-ePo9UQZtPcyxiCBlW6LIU4GsDRrRM"
            },
            {
                "title": "A Simple Explanation Of 'The Internet Of Things' - Forbes",
                "link": "http://blogs-images.forbes.com/jacobmorgan/files/2014/05/internet-of-things-2.jpg",
                "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQgGx9J5kqwOf_BradwpeJQhjtwmSDjQPjhB5BTehfB-LSPWhpgJO6B0W4"
            },
            {
                "title": "Internet",
                "link": "https://primus.ca/skin/frontend/enterprise/primus/images/lp/UnlimitedInternet.png",
                "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSUHYD-45FyUWR6HgX-_JUkMOrJdB3x-vZ-rCTOxZYastKGdABLsKDesQ"
            },
            {
                "title": "The internet started with the transfer of two letters: Today it's ...",
                "link": "http://www.welivesecurity.com/wp-content/uploads/2015/10/wavebreakmedia3-623x4101-623x410.jpg",
                "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSCZXhUYXS8OEJ_vVqZ9pwgFsR9AUS96HcIMl3IenV_-fp1Y6SSI-jg9Y0W"
            },
            {
                "title": "What Will The Internet Look Like in 15 Years? | Rise to the Top Blog",
                "link": "https://www.techwyse.com/blog/wp-content/uploads/2014/03/future-web.jpg",
                "thumbnail": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQsFHpEAtI96PgJXbw9WyVoq00XoFlm255cYtsRSt0x2VVwBDQVuNvGgv0c"
            },
            {
                "title": "The Hood Internet",
                "link": "http://thehood.raptorhideout.com/images/hood_internet_mixtape_nine.jpg",
                "thumbnail": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcS6FEPHpfxQwmJ6cHObSCcpT_LNLzDPgxOJxcaF6zjSEMowvljtYsR1sc9xxg"
            },
            {
                "title": "Wi-Fi Internet Access",
                "link": "http://www.queenswestoahu.org/images/qmc_images/visitors/n-wifi.png",
                "thumbnail": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQSOsgkAh__33Cma0HrEKHn-yGfkC_CHgW4ff514VRMzwAfvARwF5_m2_U"
            },
            {
                "title": "Is It 'Internet' Or 'internet?' The Internet Can't Agree",
                "link": "http://i.ndtvimg.com/i/2016-04/internet-network-generic-istock_650x400_71459822128.jpg",
                "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQbIdRzrBTGk6O8M9GihnET29pc5bGwlZOKhYuOkMkPv_xR0AKqgYCoJ4"
            },
            {
                "title": "Adopt Rights-Based Internet Policies in West Africa – MFWA - Media ...",
                "link": "http://www.mfwa.org/wp-content/uploads/2015/11/internet2.jpg",
                "thumbnail": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQEfr__MRc9jQ5Q17j4-IoyuwHoBQBZN-HXuerAHG51vNfR8YvtWWumpogY"
            },
            {
                "title": "Top 8 Problems Of Internet Growth In Nigeria - Webmasters - Nigeria",
                "link": "http://www.nairaland.com/attachments/2743433_internet1_jpeg_jpegbdffc73c4f837b45246a99d2d04fba18",
                "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVo50DJt_OJGqZUMzF0xvU3DR7asmdWEXxggYSqNIuY1Z6IAaC5G-vkVM"
            },
            {
                "title": "Internet Archives - Ted Buzz",
                "link": "http://tedbuzz.com/wp-content/uploads/2015/07/internet.jpg",
                "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu0gWrxiDDGfpfr7RtJOQftNuzE00TKxITw6BFHaR6ZkdgvBhMwu_b9A"
            },
            {
                "title": "The Future of the Internet of Things Will Be 'Notification Hell ...",
                "link": "https://assets.entrepreneur.com/content/16x9/822/20150828180844-internet-satellite-data-space.jpeg",
                "thumbnail": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTalisMg1-bjvquUp5Q59a9KJ6JwdKZqOBiNGEqKpY5aQFEfkjmY14WvC8"
            },
            {
                "title": "Free illustration: Internet, Global, Earth - Free Image on Pixabay ...",
                "link": "https://pixabay.com/static/uploads/photo/2016/02/05/17/30/internet-1181587_960_720.png",
                "thumbnail": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSItJgIb0PixTFze0MjtvaJmgH6XhHFdQw5NS9FEFKOUaSPVyeaSc6Q834"
            },
            {
                "title": "Internet.Net - Your source for the Internet",
                "link": "http://images.smartname.com/images/template/3column/large/3col_lg_computers-around-globe-with-paper-in-motion.jpg",
                "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcS5_20Vasw2S2a3FQc71gY4D3fNVGljm4QdyGZddnm1AwEkXsAHEsXc_7Y"
            },
            {
                "title": "12 Free Internet Wonders You Need To Start Using Now! - onedio.co",
                "link": "https://img-s1.onedio.com/id-579b14db51f754a6056615f2/rev-1/raw/s-e30de73d63d1ab5e2dd3f96e7c793eeaf00d1918.jpg",
                "thumbnail": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRcssuOHn2lP-9V_SsDKvVbmeu81xJW7Dwoa2VmukkEY1ntWScYjZgdagoj"
            },
            {
                "title": "Project Management Fundamentals | Lynda.com",
                "link": "https://cdn.lynda.com/courses/424947-635949355614959431_338x600_thumb.jpg",
                "thumbnail": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcS5YG48Z5S6_CvbMp6-lvydoo14T0DmpO0NxvXlbtf3kqAd1Q2-fETD7LJ-"
            },
            {
                "title": "MEED Projects - In-depth project tracking database for the Middle ...",
                "link": "http://www.meed.com/Pictures/web/u/u/k/MEED_Projects.jpg",
                "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpSmC8XT9sA1Cbwv99ioCgMcobrjF6n-xb2YzixPabA1j9DMps2dZPzxhA"
            },
            {
                "title": "Welcome to Learning Adventures| Electronic Field Trips from APT ...",
                "link": "http://www.aptv.org/Project-C/images/PROJECT-C.png",
                "thumbnail": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQ8jQXBd8DraSPkr4vpBjcLg4UHDUgdwW3icXDJtYD1nKvCid6A3I5vZO0"
            },
            {
                "title": "Costs Management with Twproject - Twproject: project management ...",
                "link": "https://cdn.twproject.com/site/wp-content/uploads/project-costs-management.jpg",
                "thumbnail": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSwtykI7bDTuGyYHSdGyp0EGqYVdI6C1KtwXiznpYamNhMmDWUk1UxQOOE"
            },
            {
                "title": "Project printing – JMDPrint",
                "link": "http://www.jmdprint.com/wp-content/uploads/2016/03/B2014006-Project-Management-freedigitalphotos-600x300.jpg",
                "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZyQug_WcWDM-oVLJGz9ZEgMRFitKi7_TFQXnue03eG5v5B5MAohRyXIuj"
            },
            {
                "title": "7 Trending Project Management Tools to Help You Collaborate With ...",
                "link": "http://edge.alluremedia.com.au/m/l/2013/09/GroupProject.jpg",
                "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxtyWapSgLRm6RSW0-fEX6SQLMSp8fzOTxVsvCWZSRCT1fQyUrlDvtoOIS"
            },
            {
                "title": "Free Project Management Templates - PMBOK Templates",
                "link": "http://www.projectmanagementdocs.com/images/project-management-docs.jpg",
                "thumbnail": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcS0FZ-9RMoenCWV2eBWSypVhiRCQQAlU7lZ96jb5Xz5y86ZIay71O-L4SMk"
            },
            {
                "title": "IT Projects - Information Technology Services",
                "link": "http://ualr.edu/itservices/files/2006/10/projectManagement.jpg",
                "thumbnail": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRcmVBYBrgkyKn83VDSUxYNyYZKiCuzbM3WyjbcXlZcK52LwkmQUgsOSj8"
            },
            {
                "title": "Project Management news, analysis, how-to, opinion and video. | CIO",
                "link": "http://images.techhive.com/images/article/2016/05/it-project-failures-100660512-primary.idge.jpg",
                "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSaSVs5kAp95h7kYyGIJ0tjGd6AuitsA1Z8N2p5npTKA0idrp2BxrQmw"
            },
            {
                "title": "Project WET Foundation | Water Education for Teachers",
                "link": "http://www.projectwet.org/sites/default/files/content/images/discover-water.jpg",
                "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQGNPNSc-mDcq17nBshE-Lk3AZF_PZWer-TOt0V3ufQP-oCdNoUxl1yTk"
            },
            {
                "title": "5 essential steps for good project management | Symetris Web ...",
                "link": "http://symetris.ca/sites/default/files/Project_Kick-off.jpg",
                "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvnkcVsoh-_syBaVR-QSeKAa-ZRyIn3eOg-s8LWa_rYaDt6mzxDm_ZF-M"
            },
            {
                "title": "Project - Free images on Pixabay",
                "link": "https://pixabay.com/static/uploads/photo/2016/03/29/08/48/project-1287781_960_720.jpg",
                "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSc35IQ3DksyZYOnqerhmAAVj5cMwStKCFi5A5oLaNRDaymYYFmJV3_CzU"
            },
            {
                "title": "Frontline » Project ServicesFrontline",
                "link": "http://frontline-inc.ca/wp-content/uploads/2015/09/Project-Management.jpg",
                "thumbnail": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT2WKsa7mGUDg2wJUzUv0RR_IoGFQ7TpOdqol436fRg45cTcTQP033-vYRS"
            },
            {
                "title": "About the Project – Boys Don't Cry – Association of Renaissance ...",
                "link": "http://renaissanceinstitute.eu/v1/wp-content/uploads/2015/07/yyy.jpg",
                "thumbnail": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRJVDRpl4xuadQYGPTcm1y3mor9ilNWSdnM3EHlW24_6PjRL6AB8fK1vg"
            },
            {
                "title": "The Project - Channel TEN - Network Ten",
                "link": "http://images.tenplay.com.au/~/media/TV%20Shows/The%20Project/Design/2016/TheProject_2016_Logo_500x281.jpg",
                "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSZgeB5BMnP9PuXcV69vNtmw24Ai8itAR0xORflPdzafMJXn24xYai6UICX"
            },
            {
                "title": "Project Management: constructive chaos",
                "link": "http://petanque-c.com/wp-content/uploads/2012/11/project-puzzle.jpg",
                "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl6KNtOgKDv_pCNslHihwzxSm8nVmt78fy--VGPssewNru5etH4u5obyc"
            },
            {
                "title": "8 challenges affecting software project management | CIO",
                "link": "http://images.techhive.com/images/article/2014/12/project_management_success-100537284-primary.idge.jpg",
                "thumbnail": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRXSsCAj4OfuRgCGWsxNGAbKo-wQ1A4HWq5xEEZob4kz3Rrz5V-3AuWX2l0"
            },
            {
                "title": "Project Results and Case Studies | Asian Development Bank",
                "link": "http://www.adb.org/sites/default/files/page/154601/images/banner-results-data-01.png",
                "thumbnail": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSqkC1i4P2IfD2uZ8HKBGzZYjWFgpY210lXRLSZdncGOgI8wMsUy2CrFlI"
            },
            {
                "title": "Staffing the Right Resources on the Project",
                "link": "http://www.projectinsight.net/articles/articlesshare/i/2013/project-puzzle-pieces.jpg",
                "thumbnail": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTcIW48vtQ8cSWsr5OwBNGrVPJp9VFkqimW8oODhJvmF2C0CxN1JTqhI2E"
            },
            {
                "title": "Project — DIA — Strategy | Branding | Design | Motion | Type",
                "link": "http://dia.tv/wp-content/uploads/2014/08/Project_logo_02.png",
                "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSPfS_21_Oqlq7RgJ_RnKiCTeypHGJ9xEdyVIGBNzyjNnno_o_vXUax4zoV"
            },
            {
                "title": "Technoking Raipur | Engineering Projects",
                "link": "http://www.technokingraipur.com/images/project.png",
                "thumbnail": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTlA2_TBYs1kzZIRPfzjgAniHm_L3hvWiVLdVNnBy_HlkF4tuxk1qS9BhQ"
            },
            {
                "title": "Project Based Learning | MindShift | KQED News | KQED Public Media ...",
                "link": "http://ww2.kqed.org/mindshift/wp-content/uploads/sites/23/2015/11/PBL-1920x1179.jpg",
                "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTf0-b_Scm_ADAqUr_Jqs1LWgunjNxsWPq9LmptNe1KEDODjxWnUOIb98M"
            },
            {
                "title": "Hadoop solutions | Best Hadoop Projects",
                "link": "http://hadoopproject.com/wp-content/uploads/2015/02/Project-Management.jpg",
                "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQ_pAVTBXlQ0zlEtJnsPDUu5eabEqXHOtuHYXHK-xavA-wRbQuuNLDYvM"
            },
            {
                "title": "WordPress Project Management Plugin : Task Management, Project ...",
                "link": "https://wp-client.com/wpcbridge/wp-content/uploads/2014/04/2014-Website-WPC-PM-Graphic-1.png",
                "thumbnail": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRP6O0D2VPDnok5ll_2UWEvkn_9t4vvVjGS-KO5vK0ETGv-d7VLR3PIHtI"
            },
            {
                "title": "13 Project Management Methodologies You Should Know About ...",
                "link": "https://financesonline.com/uploads/2015/09/proj.jpg",
                "thumbnail": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSxUNpMBXoUMqjQP0P_eOWnEC_5FXkVF7ZE4Ytg6XJI7TQDiwLGtxEeSheB"
            },
            {
                "title": "EDISON: building the data science profession | Edison Project",
                "link": "http://edison-project.eu/sites/edison-project.eu/files/images/edison-project-logo.png",
                "thumbnail": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQyVR3EZmcwByxaamNkh6hWBQOVpa_W2HPr0rhCSfKTdEQ5NBUIOLywjps"
            },
            {
                "title": "Project Launch Stage – How to get a project properly running ...",
                "link": "http://bookboon.com/blog/wp-content/uploads/2013/05/PuzzlePiece2.jpg",
                "thumbnail": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTdHxlmrSNPBuBtLzg5446zero8FcB8XwzaCwZKc0oUcNjNATuRP-EZ8Qc"
            },
            {
                "title": "8 essential ingredients for project success | CIO",
                "link": "http://images.techhive.com/images/article/2016/01/project-tools-ts-100638191-primary.idge.jpg",
                "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTE7jdnHqu6mTbZ4Lkp3bHzA9NdwfRpm1fcWoxySU6UGgFZkioZuXm3DKps"
            },
            {
                "title": "Project Selection Process - Estate Baron",
                "link": "https://estatebaron.com/blog/wp-content/uploads/2016/04/Project-development.jpg",
                "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSOyIWM3XkeOYPV9vLqdazjGf2do4PJ8CIDv2LezLp8CR4Eqb9-LRhgx_mN"
            },
            {
                "title": "Top 10 Project Management Trends for 2016 - HR in ASIA",
                "link": "http://www.hrinasia.com/wp-content/uploads/2016/01/project-management-6.jpg",
                "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUasasoGBlXemH1S-p4dIKy4ByeXNvtw_F-Jt1lJr74tBpfk92wo-3pXrM"
            },
            {
                "title": "Project Management - iTechtions",
                "link": "http://itechtions.com/wp-content/uploads/2015/05/Project-Management.jpg",
                "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTMM4WHb1NlF9MZmsoqxE-hMRvsOFmGKH3dC069HM6ALIsLX3FFrMvKAPsf"
            },
            {
                "title": "Project printing – JMDPrint",
                "link": "http://www.jmdprint.com/wp-content/uploads/2016/03/B2014006-Project-Management-freedigitalphotos.jpg",
                "thumbnail": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQoRuWt_vMFldVfRPj9HPBVwAb5h6rBmflgYjPqszSQJS5zQNuYDQcRto0"
            },
            {
                "title": "Project 3 Young People's Health and Wellbeing Service | RDaSH NHS ...",
                "link": "http://www.rdash.nhs.uk/wp-content/uploads/2014/03/Project3-650x260.jpg",
                "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGhHaGHvoHWn6rJbkOLxkvbA8Ck8cVc_kFHZhIOuxZwkAXayt_oCRjsyCi"
            },
            {
                "title": "Project Management news, analysis, how-to, opinion and video. | CIO",
                "link": "http://images.techhive.com/images/article/2014/12/project_management-100536263-primary.idge.jpg",
                "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWiW9Mm8_AWmOuMperIX_-l6sqGjNR_1m2Hcbdt8TzAu2grkoun2Q3_lc"
            },
            {
                "title": "The 7 pain points of project management - Off Peak Training",
                "link": "http://www.offpeaktraining.com/wp-content/uploads/2016/04/project_planning.jpg",
                "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQeHY7ymhPuGCsn6Q0RvxbvgRh67yXjWCxY0FygCQKLH4fe5LYVrawq2GI"
            },
            {
                "title": "Project 8 - SrignatechSrignatech",
                "link": "http://srignatech.com/wp-content/uploads/2013/05/photodune-3853785-business-analytics-m.jpg",
                "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSF4jrt2Bl8I5FTyzz4HUrOCKO3MVgFoBjdihwxE0W7HL5kCKwUsNt3HAY"
            },
            {
                "title": "Don't Be The Hub: Framework for Remote Project Management",
                "link": "https://content-static.upwork.com/blog/uploads/sites/4/2009/05/project-management.jpg",
                "thumbnail": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTuXzKKS072nJpsRb3c9rlYfHmNv8wjMnFDjrAwbLHIF5fVwSHMBwLcfOOn"
            },
            {
                "title": "Project Management Services | CoreHive",
                "link": "http://corehive.com/wp-content/uploads/2015/03/Program-Project-Management.jpg",
                "thumbnail": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTbDDywb5pPmbaFo0GhfUdti8rjPX3n9zamXX5azzl06zEoNfkT9jkUL9ND0g"
            },
            {
                "title": "Project Management",
                "link": "http://www.bo-tek.com/web_2016/images/IT-Project-Management.jpg",
                "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAYVC932rXXTSRVERHvx2HbZ6Z_dtHf6okVO7j2smY3oF4z5NnbRt5ZpM"
            },
            {
                "title": "Project - Office Blogs",
                "link": "https://blogs.office.com/wp-content/uploads/2015/10/Project-Manager-FI.png",
                "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShadUJea1y67sErQAV81be0uA0nWOx4Gspz-0CRVXhXhVk2oH1bLDUAW5o"
            },
            {
                "title": "Free stock photo: Rural, Country, Outdoors, Field - Free Image on ...",
                "link": "https://pixabay.com/static/uploads/photo/2015/07/27/19/50/rural-863355_960_720.jpg",
                "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI80wQ6FMQgFIMvHL2fj_6q4C5HzAngpEi0Aro2axFCJjLR_WExAVlLJ9O"
            },
            {
                "title": "Country Strong Quote Picture by Kylieann92 - Inspiring Photo ...",
                "link": "https://s-media-cache-ak0.pinimg.com/736x/69/f9/e8/69f9e8087da5e63db57eab8e1ce29d20.jpg",
                "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgtory3GDO_1Zt2_1gfRyAYuLPVOozzSR0XVbX8qlCkCgStk4RK8EMFrfa"
            },
            {
                "title": "Country Wallpaper HD Image Download Free | Wallpapers, Backgrounds ...",
                "link": "http://www.pixelstalk.net/wp-content/uploads/2015/07/country-wallpaper-7.jpg",
                "thumbnail": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTXWbSumEhOqIT3xZWUzaNo5TPVme3ieIeWkugbncYw1aI3YU2HNBgWdyL7"
            },
            {
                "title": "BBC Radio 4 - Open Country",
                "link": "https://ichef.bbci.co.uk/images/ic/480x270/p01lcfyg.jpg",
                "thumbnail": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTkLUuFEuzDeu2MCwlwG9OsV_Mi3xyhgVUpjfQN9RpW2HztMFODWgqO2lA"
            },
            {
                "title": "History of Country Dance",
                "link": "http://cf.ltkcdn.net/dance/images/std/53753-425x282-HistoryOfCountryDance.jpg",
                "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRbjc3qHCxHQVEfnEBGbB3An5QVvbgAg95gPUF1KFhahkgaErwTorS2w"
            },
            {
                "title": "Country Road #6783305",
                "link": "http://7-themes.com/data_images/out/5/6783300-country-road.jpg",
                "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQv39Bv2_kcVxFh3RZAJTravcRL5I303hWIy-rw1Yor6DcPYdUSUsbE5PV-"
            },
            {
                "title": "Country Roads Wallpapers",
                "link": "http://img.wallpaperfolder.com/f/4915D46DC5E4/country-road-sunset-high-definition.jpg",
                "thumbnail": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSI7Lj1NcQfAPsZ3sZKPxqOvLWSRJVdyaeoV3Y8HN8Xa3ReGpGLIclDhUt3"
            },
            {
                "title": "Wine Country | San Francisco, CA",
                "link": "http://www.sanfrancisco.travel/sites/sftraveldev.prod.acquia-sites.com/files/trip-ideas/wine%20country.jpg",
                "thumbnail": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQkWk1SDjUAvBDuSf6CPphKg8UYkfMJttg8VQgZrWQKdlzXI8DjFv8aEZY"
            },
            {
                "title": "Country songs best ever | Country music playlist 2015 hits ...",
                "link": "https://i.ytimg.com/vi/4bTUJxEDhqU/hqdefault.jpg",
                "thumbnail": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQbQl-kPKr4-9Jw6pMAKhhhWaWI-2Z0yVF5JJMLVd1pvf14unoz1WxwZAdU"
            },
            {
                "title": "Country HD Wallpapers | Backgrounds",
                "link": "http://6iee.com/data/uploads/12/589241.jpg",
                "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZyz0rDS4LPZGAe-svenbmxaT441UYnIa51FI8MMtqRzZcz60BGiPkJ0E"
            },
            {
                "title": "HITS Playlist: Country Summer | HITS In The Sticks",
                "link": "http://www.hitsinthesticks.com/wp-content/uploads/2016/07/summer-country-road.jpg",
                "thumbnail": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSIUFAM6XNl-yWrXo3y-NjGzIkzf0_RwKplaWcCikp7Xrc9052y_eClZWAo"
            },
            {
                "title": "Deep country road between fields / 1934 x 1260 / Nature ...",
                "link": "http://miriadna.com/desctopwalls/images/max/Deep-country-road-between-fields.jpg",
                "thumbnail": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQf_wH-w4vljGrvDKWpq43fD-3XUYT1r0bevRzxhgLDKE8QP2n2re3lfMui"
            },
            {
                "title": "Wide HD Country Wallpaper | FLGX HD | 1.21 MB",
                "link": "http://feelgrafix.com/data_images/out/28/1000187-country.jpg",
                "thumbnail": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQaQbZoc8K0z4KE8vja2El5FRjDJYGZZI8yg8oLvFT3AsrevD61TDbPS6w"
            },
            {
                "title": "File:Flickr - Nicholas T - Country View.jpg - Wikimedia Commons",
                "link": "https://upload.wikimedia.org/wikipedia/commons/e/e1/Flickr_-_Nicholas_T_-_Country_View.jpg",
                "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTKwBlPExEg0Tx9LFyS8Ga8mw0WOchkKmh7GwsgjGMQi2a8B26q111RLoEm"
            },
            {
                "title": "Free stock photo: Country Lane, Country, Road - Free Image on ...",
                "link": "https://pixabay.com/static/uploads/photo/2014/12/27/14/37/country-lane-581076_640.jpg",
                "thumbnail": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRscAtOHdexSPWQClk38N4F3qabhZeNuWRrn-kVOdpL-lCXZJV4LLfXZnhE"
            },
            {
                "title": "Perks Of Country Living",
                "link": "http://az616578.vo.msecnd.net/files/2016/06/26/636025076781667242-1862535736_country.jpg",
                "thumbnail": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcR0I2BfmXiwebzh_jswM3WH8TOnHs4VnIaEmS-Gopes4gLtApxBbF3wuRq0"
            },
            {
                "title": "Girl in a Country Song' Video Objective or Not?",
                "link": "http://wac.450f.edgecastcdn.net/80450F/kkyr.com/files/2014/07/girl_in_a_country_song-630x344.png",
                "thumbnail": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQoqSvjDSNTiR3FKio8Q_DVcHhy9DJxlWbPBW1WBj7zQ0W0VDLzWTUT3F2e"
            },
            {
                "title": "High Quality Country Road Wallpaper | Full HD Pictures",
                "link": "http://feelgrafix.com/data_images/out/28/1000245-country-road.jpg",
                "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcS_xoClrFO4EIOgqH2B14aSyQ7dO1Pr11Drrq9HiLKR_Yw0h5aUPbOH_OfD"
            },
            {
                "title": "Canyon Country | Travel Tours | Collette",
                "link": "http://i2.gocollette.com/images/cont/na/us/az/monumentvalley_42149449_fotoliarf_2702_960x380.jpg",
                "thumbnail": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQZASowPY09o4ycgWYj2wicC273TDzi2xoFcS7_p0RJKu-lhQL8z3Z5ujUm"
            },
            {
                "title": "Wallpaper Country - Gallery Wallpaper",
                "link": "http://4.bp.blogspot.com/-vPLwNemNALo/UJU8eEsr70I/AAAAAAAAAUg/mc_GVRGWVpA/s1600/country_road_desktop_wallpaper_31267.jpg",
                "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQ3-NLNgmxyuUle1WGie0NiknKd0h3fULm6uq3atWxLLTGRX73jdChxW0w0"
            },
            {
                "title": "File:Flickr - Nicholas T - Country Drive.jpg - Wikimedia Commons",
                "link": "https://upload.wikimedia.org/wikipedia/commons/f/f6/Flickr_-_Nicholas_T_-_Country_Drive.jpg",
                "thumbnail": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcR2xSAapGcONolQ5pfnJR8EjN9Cf8B5s7q4C0Ttgg1pHNLi2KJl2rIzQsQ"
            },
            {
                "title": "High Country Host - in North Carolina",
                "link": "http://highcountryhost.com/wp-content/uploads/2013/04/seasonal_fall.jpg",
                "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSut42Dx5CfFpQ6l5z7kb30d5omwgdhqn5e5e1mlsS3DQdLrT13U3bSLg"
            },
            {
                "title": "This Is Country' Provides Backstage Pass to ACM Awards « Radio.com",
                "link": "https://cbsradionews.files.wordpress.com/2014/12/thisiscountry_cover.jpg",
                "thumbnail": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcS83nfFEWOGU6gMi9P0X0-SAPjxAYM9969RVesB3ddGb0TWRV_i4FBKnoL-"
            },
            {
                "title": "Download Free Country Music Backgrounds | Wallpapers, Backgrounds ...",
                "link": "http://www.pixelstalk.net/wp-content/uploads/2016/07/Country-Music-HD-Wallpaper.jpg",
                "thumbnail": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSsAzXNGC533oE3UB_Zc0LxybuPEEdQ-JmNUiAy3NfkGmV5DAZPbJ94DvCO"
            },
            {
                "title": "Investing in Indian Country | Socially Responsible Investing ...",
                "link": "http://www.ilcc.net/assets/userfiles/images/indian-country.jpg",
                "thumbnail": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRi7iFlnptJISGWY42rPZV6tfrrik3BkknnygsQQq43yaT5kwyQVlhq-RE"
            },
            {
                "title": "Sunlit country road wallpaper - 1061724",
                "link": "http://p1.pichost.me/i/40/1640045.jpg",
                "thumbnail": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSXhL-EOLDCEan4VDvzZFqO4fg0MagS4JAjR5kFBg2v0gapvZd6oq5gqm0"
            },
            {
                "title": "1000+ ideas about Country Life on Pinterest | Farms, Horses and Cow",
                "link": "https://s-media-cache-ak0.pinimg.com/236x/a4/53/16/a45316a6688a40268bff832043251385.jpg",
                "thumbnail": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQlhRkWKzn4ixqJLzSDtbNZ8K_9WZX-wNwHvOi8dS3cTisHntHnwXVBqw"
            },
            {
                "title": "Town versus country: what our readers think - Telegraph",
                "link": "http://i.telegraph.co.uk/multimedia/archive/02448/stile-country_2448177b.jpg",
                "thumbnail": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTYUXMTPxVg4XyITWeIwCs7_A2Bf1gitKujx1BAEqFtGNoevXPU5CCmuPo"
            },
            {
                "title": "Country - Free images on Pixabay",
                "link": "https://pixabay.com/static/uploads/photo/2014/05/21/15/18/musician-349790_960_720.jpg",
                "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQUt5Iz_wF7m8Xt3ylu_ES4_rnfweUO3jKFg87mlG9G155d8ODxZ81tCzrd"
            },
            {
                "title": "Australian Country - Australia Country Magazine",
                "link": "http://www.australiancountry.net.au/wp-content/uploads/2013/09/Scenic-Rim_Lost-World-Valle.jpg",
                "thumbnail": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT86AquIk3MLzwBCR9-MFchXQ_ozpxOIOUJ8xOwADEld_kS9dNabk0yl9Al"
            },
            {
                "title": "country pictures",
                "link": "http://science-all.com/images/wallpapers/country-pictures/country-pictures-10.jpg",
                "thumbnail": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRQKSNDkMqdE4g-0s_wI9-K6vVaz7CDA0TBBmaPMPiWIlbxK0EH27qSrO_U"
            },
            {
                "title": "Country Road #6783305",
                "link": "http://7-themes.com/data_images/out/5/6783305-country-road.jpg",
                "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQYmyob091k7CnK2wQkSgsVDQDd3K5vlGHlxZ4yqLcnuftwB0DggLLhT5Y"
            },
            {
                "title": "Country Wallpaper HD Image Download Free | Wallpapers, Backgrounds ...",
                "link": "http://www.pixelstalk.net/wp-content/uploads/2015/07/country-wallpaper-10.jpg",
                "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTPnlGZkoinh5usMXxtysVMfke0VdIUsZM3yjnDG6oaoCptjCK3agPcLC7P"
            },
            {
                "title": "Country Road #6783305",
                "link": "http://7-themes.com/data_images/out/5/6783309-country-road.jpg",
                "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQAlZld-DPcn3vXKb6Xrje7gN6v-StPrmMimpTxZZlpSkdwpKQ8Ps99W1vz"
            },
            {
                "title": "country-wallpaper-10.jpg",
                "link": "http://science-all.com/images/wallpapers/country-wallpaper/country-wallpaper-10.jpg",
                "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRhjOpBkYhr0FyNmH2w68hYIeah_sCbgkBzEY8pe4BPHauvZJBph_MI9Q"
            },
            {
                "title": "12 Signs You Grew Up In The Country",
                "link": "http://az616578.vo.msecnd.net/files/2016/06/12/636013474849054063475187574_Vx6Ohz5.jpg",
                "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQLn4VI1UkD6KJAH2kkD3H9XO_UrHG5PGnQ3ya2VBBaCEXItNZH0hJjZLQ"
            },
            {
                "title": "Country Road #6783305",
                "link": "http://7-themes.com/data_images/out/5/6783302-country-road.jpg",
                "thumbnail": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTikvqN8HON8yOdG97bjatDstABuibsPPeZcA9eHsUUfDFZp2Qzn6_48ds"
            },
            {
                "title": "Country Music Gets A Bad Rap, But It Shouldn't",
                "link": "http://az616578.vo.msecnd.net/files/2016/04/29/6359750032666523151072549471_2_country_420.jpg",
                "thumbnail": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTXQVlQCyCCyR0h5W8pN9yFvkqsq7kasqOP3_hy71jjAg65J59jYKagMd8"
            },
            {
                "title": "11 Country Songs To Get Your Summer Started",
                "link": "http://az616578.vo.msecnd.net/files/2016/04/15/6359633046006467471295536614_Country-Road.jpg",
                "thumbnail": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTcTd3eZhEVE0Q_SvP3xvvRijkDcNPU75x4-YPK4jiRiV4r5T_0qpmc8F6N"
            },
            {
                "title": "5 Books That Are Basically Country and Western Songs — Barnes ...",
                "link": "http://www.barnesandnoble.com/blog/barnesy/wp-content/uploads/2013/08/country_western.jpg",
                "thumbnail": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcS1OAPTlLjhhdDzh1x6aJkJ7UD_hQNsMOZRtEtR_JCJ78CUOn2RVWaszNM"
            },
            {
                "title": "Country wallpaper | Wallpapers, Backgrounds, Images, Art Photos.",
                "link": "http://www.pixelstalk.net/wp-content/uploads/2015/07/country-wallpaper-3.jpg",
                "thumbnail": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTL4eI2GFZBPOgAe28_9oKLZsQ6mjLCWiIrlXfrUJ0rI_RSaCyt8cEjMtY"
            },
            {
                "title": "1000+ ideas about Country Strong on Pinterest | Southern Girls ...",
                "link": "https://s-media-cache-ak0.pinimg.com/236x/69/f9/e8/69f9e8087da5e63db57eab8e1ce29d20.jpg",
                "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRiPJVnuiVYF88Lw8NO0tIWvD1h7yXfGE1CenKMmP_NSFt0q-dN13Ohq4Y"
            },
            {
                "title": "Thank god I'm a country girl: Love | Life | Country | Countryside ...",
                "link": "https://s-media-cache-ak0.pinimg.com/564x/a4/53/16/a45316a6688a40268bff832043251385.jpg",
                "thumbnail": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQV8AUw7S-_pX3kW75ml_ZClztJMpi59R1ZkT6d1E2_4gal32EW7Hn9iTU"
            },
            {
                "title": "Country wallpaper | Wallpapers, Backgrounds, Images, Art Photos.",
                "link": "http://www.pixelstalk.net/wp-content/uploads/2015/07/country-wallpaper-2.jpg",
                "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRd554Wlvqa4ZS6JH7aMDX-PoZ3idvzaCqd21kR9GwK6jXiH31cGDSTCo0"
            },
            {
                "title": "Country - Free images on Pixabay",
                "link": "https://pixabay.com/static/uploads/photo/2015/08/02/18/05/country-871445_960_720.jpg",
                "thumbnail": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTOcxOWPa2mMBRT-7EUmBCPcZnZQ1d5YkB6zvQPkNaKC1jY_BI8gWDqAKk"
            },
            {
                "title": "Visit the UNO City - VIENNA – NOW OR NEVER",
                "link": "https://www.wien.info/media/images/uno-city-19to1.jpeg",
                "thumbnail": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTFPfDe1XG5VnamSLLrygI74Umo_oTTRuJrWT6n_z8EZQEUO5N6VwNwZgKD"
            },
            {
                "title": "Cebu City travel guide - Wikitravel",
                "link": "http://wikitravel.org/upload/shared//9/9b/Cebu_(city)_Banner.jpg",
                "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcS5COpdQMGLMVTvIJ0piPBiXn-eFT170AkfnnxWrkyTW7wVIP5H8NujaHE"
            },
            {
                "title": "Park City Museum: Preserving, protecting, and promoting Park ...",
                "link": "http://parkcityhistory.org/wp-content/uploads/2009/07/Digi-27-46_0910_Doug_Burke_Photo_PC_Museum_29211.jpg",
                "thumbnail": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQCfMpkU95kn-mp3nKnkkif7XC3xGnxma32cS8L2HkiI0TETAAaDT3kctI"
            },
            {
                "title": "HQ 2000x1000 Resolution City #995906 - FeelGrafix",
                "link": "http://feelgrafix.com/data_images/out/28/995904-city.jpg",
                "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqOwqGyACI87DDMo7qj8y8h8hVwOto12h_xx4F_jw--oc7lsQ9lVQeONdE"
            },
            {
                "title": "50 Free HD City Wallpapers",
                "link": "https://newevolutiondesigns.com/images/freebies/city-wallpaper-32.jpg",
                "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiR0bhIO64yUv6QuGCn6xPsMm9eOCm_l3xCPHjF9B5dECj6Qc_22TwDJg"
            },
            {
                "title": "Picalls.com | View of the City of New Yorkby Lucas Franco.",
                "link": "http://picalls.com/wp-content/uploads/2016/02/View-of-the-City-of-New-York.jpg",
                "thumbnail": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQA_DPyUuJoKz2JDu7GdsowTZF-qARozChSWeLlOtGKP7XeTeI53OtMGzQ"
            },
            {
                "title": "Jersey City: Growing, With Many Personalities - The New York Times",
                "link": "https://static01.nyt.com/images/2016/06/12/realestate/12LIVING-JERSEY-CITY-slide-2TVY/12LIVING-JERSEY-CITY-slide-2TVY-videoSixteenByNineJumbo1600.jpg",
                "thumbnail": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRCiOj4VQ8KTBoP0Gj5gs0OjN0X8487VxjTYUh0S39RZXrZmtWkht9iOVEe"
            },
            {
                "title": "New, York, City - Free images on Pixabay",
                "link": "https://pixabay.com/static/uploads/photo/2015/10/12/15/04/new-york-city-984145_960_720.jpg",
                "thumbnail": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSoD6oeMbRwWTSDFe8fAy9yQZc4VT-0EugmbDkTxV-O4gRKhp9FbPY_qLDY"
            },
            {
                "title": "Download Wallpaper 3840x2160 City, Skyscrapers, Night, Light, Road ...",
                "link": "https://wallpaperscraft.com/image/city_skyscrapers_night_light_road_62141_3840x2160.jpg",
                "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQQfyhy4LuI9Hhgmb5P0CiwASFD8PSwVYBVjo87mCIJMRWCRS4yOv4ibgs"
            },
            {
                "title": "City, Panorama - Free images on Pixabay",
                "link": "https://pixabay.com/static/uploads/photo/2015/05/15/14/22/city-768437_960_720.jpg",
                "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSO2rtnUcGjctlI3bJYosJ2iCSgnZRWJko2mkT3d4kWZmQR2mRZzYfUcaWR"
            },
            {
                "title": "City pictures · Pexels · Free Stock Photos",
                "link": "https://static.pexels.com/photos/7837/pexels-photo.jpg",
                "thumbnail": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcR-WfF048BG2oKYbPvc_FO8EsAqsby0TFpPf8SrpWHESE1XQFNyfOptvCs"
            },
            {
                "title": "GIANT CITY | . mette ingvartsen .",
                "link": "http://metteingvartsen.net/wp-content/uploads/Picture-Giant-City_credit-Jan-Egil-Kirkeb%C3%B8.jpg",
                "thumbnail": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRoDKvTaWAWlI6p6vmJe9XEH_TDUzSlg6uMjR5eriB7QOf3vLzVykCXeBY"
            },
            {
                "title": "50 Free HD City Wallpapers",
                "link": "https://newevolutiondesigns.com/images/freebies/city-wallpaper-11.jpg",
                "thumbnail": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTxP7blnfxP1XKOubSzX213p2WV9ZvYiIJIziMe0oln6AdAbbB6o2aOCkQZ"
            },
            {
                "title": "New York's Resilience Challenge | 100 Resilient Cities",
                "link": "http://www.100resilientcities.org/page/-/100rc/img/cities/cities-nyc_optimized.jpg",
                "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSLxbE2C1mebiCxEznpzp_12NmAL6zTw688xg9eAs1B9Gm3ZIz8L2p0iB2J"
            },
            {
                "title": "How Do I Get Support From My City? - Peep The Industry",
                "link": "http://www.peeptheindustry.com/wp-content/uploads/2016/02/city-wallpaper-41128060.jpg",
                "thumbnail": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQ25DE_2Iw4GXLeY0cJ_IVVK4Af-xWNBzyNJDTWN7TgVQYfOyRRLJ42OGA"
            },
            {
                "title": "The Mastering Of A Music City | Music Cities Summit, Toronto, On",
                "link": "http://musiccitiessummit.com/wp-content/uploads/chicago-1.jpg",
                "thumbnail": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTTatAfEOuddu5tGVxSschS57CXENadA6OIIk93NWhhWyMoT-LVof--Nvrz"
            },
            {
                "title": "50 Free HD City Wallpapers",
                "link": "https://newevolutiondesigns.com/images/freebies/city-wallpaper-47.jpg",
                "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6zNsY2G8dWYqQbNixUxV7TeH_4j5WrnUdqGkSDcuAJfYnyBuNl8m_33nO"
            },
            {
                "title": "File:The City London.jpg - Wikimedia Commons",
                "link": "https://upload.wikimedia.org/wikipedia/commons/d/da/The_City_London.jpg",
                "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRquXmjFZSBXCI2YFDuvP0mIvWvQIKUJIf1JrKSGhWz08TyNYk_SGUsWfyZ"
            },
            {
                "title": "City pictures · Pexels · Free Stock Photos",
                "link": "https://static.pexels.com/photos/1440/city-road-street-buildings.jpg",
                "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRkblUrCOJtgPIiPmrrfjGYXmISYUpwDJ-4XI7T0p55T4Uf2jeI6-y88qAv"
            },
            {
                "title": "The Top 32 Quebec City, Canada Tours & Things to Do with Viator ...",
                "link": "https://cache-graphicslib.viator.com/graphicslib/thumbs674x446/2994/SITours/private-tour-quebec-city-walking-tour-in-quebec-city-109246.jpg",
                "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSa9llFFnWmDE6SM4pr4cvFrS3z_AIM0zm3eiDUCtLZ8BqG7CDLXsaZtZqN"
            },
            {
                "title": "City pictures · Pexels · Free Stock Photos",
                "link": "https://static.pexels.com/photos/2773/city-skyline-skyscrapers-top.jpg",
                "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcREfc7vV_TyQvVZu7xpoRClXfpoCAj_CJ__G4DQSNgK8xsjOPuShb83rwyx"
            },
            {
                "title": "Free stock photo of city, cars, road",
                "link": "https://static.pexels.com/photos/2025/city-cars-road-traffic.jpg",
                "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNSYXPGtX6_94W4ZblTQke0iGNwu2CpbpoDRP4IUWmbn9ZerzJX_U6TE4"
            },
            {
                "title": "46 Amazing City Wallpapers In HD For Free Download",
                "link": "http://www.technocrazed.com/wp-content/uploads/2015/12/city-wallpaper-22.jpg",
                "thumbnail": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRXMBO4LPHU55Y0pYzUO6RkvcJJkmtblXKFIZMElJ0DvUYg4qXIT6Bcwpoq"
            },
            {
                "title": "City - Free images on Pixabay",
                "link": "https://pixabay.com/static/uploads/photo/2013/02/05/20/59/new-york-city-78181_960_720.jpg",
                "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoZmoRg7Y9ckhqGVGec09H13xfuC0rc2QBS1AnFEDIKITIbUPznwz1A_Zb"
            },
            {
                "title": "Oklahoma City Branch",
                "link": "https://www.kansascityfed.org/~/media/images/oklahomacity/homepage_carousel.jpg",
                "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpLYzQ9BAzqSrC465rRpKDlw5ejz43EjRVhhdcAj10LKncnDsPEKNfYKM"
            },
            {
                "title": "Free stock photo of city, skyline, new york",
                "link": "https://static.pexels.com/photos/7613/pexels-photo.jpg",
                "thumbnail": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRlsDcsHtuvGQcKtCSXEWlOETZ83B9gQEaalYQ5WOawYA27RsL6suELXao"
            },
            {
                "title": "City of Tomorrow - CNN.com",
                "link": "http://i.cdn.turner.com/cnn/interactive/2014/05/specials/city-of-tomorrow/media/images/tz-city-popup.jpg",
                "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSrB2ZcjvfdE8GQcjrT7DKqB6Nk-ZCPcIpLt472UA3jS8AOlMVYLmUIHcg"
            },
            {
                "title": "Scandic Bergen City | Hotel Bergen | Scandic Hotels",
                "link": "https://www.scandichotels.com/imagevault/publishedmedia/r46krq3mx0t6mdkioiby/Scandic-Bergen-City-exterior-facade-entrance-2.jpg",
                "thumbnail": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRjFvEjGx-Q-TpqKub65fjptvaybpEk9Dvwb0hsVSKWlLvZU9aC11eUhp0"
            },
            {
                "title": "New York City Wallpaper · Pexels · Free Stock Photos",
                "link": "https://static.pexels.com/photos/816/city-sky-skyline-sailboats.jpg",
                "thumbnail": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTYyxzW9oR_znmYJqNRVhanndIGX4cpmP8qud0A7Q_ZZ4gAUZrFKnCvE2M7"
            },
            {
                "title": "NYC Travel & City Guide | Restaurants, Shopping & Things to Do ...",
                "link": "http://media.architecturaldigest.com/photos/5699802bc6772b7614567435/master/pass/new-york-city-guide.jpg",
                "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-bIS2A3Q1TotW9GdWD6j7111FuND4Up9nEiLfyeL1l42ego5kSkmRyFM"
            },
            {
                "title": "Sioux City, Iowa - Wikipedia, the free encyclopedia",
                "link": "https://upload.wikimedia.org/wikipedia/commons/b/b6/091607-SiouxCity-Historic4th.jpg",
                "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3MAQaGWCED-PjEdwUc5h4LbXDC9_dc06Xgv6ouKxa7xucgbSQK5_UOpqT"
            },
            {
                "title": "HQ 2000x1000 Resolution City #995906 - FeelGrafix",
                "link": "http://feelgrafix.com/data_images/out/28/995913-city.jpg",
                "thumbnail": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSlB2FHy6D0aeuIrOHU9cu2QlQ_tMEvtubNKsxZ8THyABZ6rOlP-ATVMkU"
            },
            {
                "title": "Laguna City - Wikipedia, the free encyclopedia",
                "link": "https://upload.wikimedia.org/wikipedia/commons/3/34/Laguna_City_201305.jpg",
                "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTCp_UDlIzVJRk5bvO66xKHJc9_Bep4oqX80h-yz2fInF8EmPvNu-u-nHVz"
            },
            {
                "title": "Kowloon City - Wikipedia, the free encyclopedia",
                "link": "https://upload.wikimedia.org/wikipedia/commons/7/76/Kowloon_City_Buildings_2010.jpg",
                "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQk_sgNImFVjJz45DzZheHTuZjq2k3-mdpwc_oap_KI6haU09dhmqH4x6uU"
            },
            {
                "title": "City pictures · Pexels · Free Stock Photos",
                "link": "https://static.pexels.com/photos/2752/city-sunny-people-street.jpg",
                "thumbnail": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcS6F_eMiOvOoaxPrCWo-UpS24arODUR47GSsRNSgCQs5u0rfSXGfNEW3nU"
            },
            {
                "title": "Mexico City - Wikipedia, the free encyclopedia",
                "link": "https://upload.wikimedia.org/wikipedia/commons/9/98/Mexico_City_Zocalo_Cathedral.jpg",
                "thumbnail": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcS7ETmNED5KdY3O9_eCXDPtXDNEZ_PUDttN6-003C_c3S1xFMx6o73a23jM"
            },
            {
                "title": "Find Oklahoma City Hotels by Marriott",
                "link": "http://www.marriott.com/Images/MiniStores/Header_Images/Destinations/en/Oklahoma%20City%20OK%20Skyline_1024.jpg",
                "thumbnail": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSSrP4hGwWgsts55hIseTUQCWi1681gB7gvpRFKF9x62Fg3LKybW03wRowi"
            },
            {
                "title": "City, Street - Free images on Pixabay",
                "link": "https://pixabay.com/static/uploads/photo/2016/01/19/18/00/city-1150026_960_720.jpg",
                "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnhhNn4gKnnl5lFkQ-d4kajIfzZdEdNlQ4_irtuCyjW2bietuolCLLtGM"
            },
            {
                "title": "Panama City travel guide - Wikitravel",
                "link": "http://wikitravel.org/upload/shared//5/5e/Panama_City_Banner.jpg",
                "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCuA7ZPQEE56D9JySKOZRvjiPwFr3xKpepv8F5piRXjvjzuvI8qXXuWIHH"
            },
            {
                "title": "New York City Travel Guide - Expert Picks for your New York City ...",
                "link": "http://assets.fodors.com/destinations/1128/skyline-manhattan-new-york-city-new-york-usa_main.jpg",
                "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmP5h4FWPIsVaNwgzepFN0DLGNSjk6Ms391_ETeefuSDqehdi71mu3Un0"
            }            
        ]);

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
 * @file MockedAvatarResource
 * @copyright Digital Living Software Corp. 2014-2016
 * 
 * Mocked:
 * get/delete: serverUrl + '/api/parties/' + partyId + '/' + entityTypes[type] + '/' + id + '/avatar
 *              serverUrl + '/api/parties/' + partyId + '/' + entityTypes[type] + '/' + id + '/avatar
 * upload: serverUrl + '/api/parties/' + partyId + '/files?name='
 */

// exemple
// get: 
//      http://alpha.pipservices.net/api/parties/565f12ef8ff2161b1dfeedbf/goals/57891f214997deb8138fe233/avatar?default_template=goal&bg=rgba(0,188,212,1)&fg=white&timestamp=1470388249000&obj_id=57891f214997deb8138fe233
//      http://alpha.pipservices.net/api/parties/565f12ef8ff2161b1dfeedbf/avatar?default_template=area&bg=rgba(236,64,122,1)&fg=white&timestamp=1470391804000&obj_id=578501864997deb8138fd78d
//      http://alpha.pipservices.net/api/parties/565f12ef8ff2161b1dfeedbf/goals/5788cf214997deb8138fe020/avatar?default_template=goal&bg=rgba(236,64,122,1)&fg=white&timestamp=1470388248000&obj_id=5788cf214997deb8138fe020
// post 
//      http://alpha.pipservices.net/api/parties/565f12ef8ff2161b1dfeedbf/goals/56cde0d1b0c1dcf82cf50cb6/avatar?name=cat4.jpg
//      http://alpha.pipservices.net/api/parties/565f12ef8ff2161b1dfeedbf/avatar?name=2017-Hyundai-Elantra-1-e1454492227615.jpg
// delete 
//      http://alpha.pipservices.net/api/parties/565f12ef8ff2161b1dfeedbf/goals/56cde0d1b0c1dcf82cf50cb6/avatar
//      http://alpha.pipservices.net/api/parties/565f12ef8ff2161b1dfeedbf/avatar

// respond to post
// {
//   "id": "56cde0d1b0c1dcf82cf50cb6",
//   "name": "cat4.jpg",
//   "content_type": "image/jpeg",
//   "length": 36916,
//   "creator_id": "565f12ef8ff2161b1dfeedbf",
//   "created": "2016-08-05T09:22:59.141Z",
//   "refs": [
//     {
//       "ref_type": "goal",
//       "ref_id": "56cde0d1b0c1dcf82cf50cb6"
//     }
//   ],
//   "url": "https://s3-us-west-1.amazonaws.com/alpha-uploads.piplife.com/56cde0d1b0c1dcf82cf50cb6/cat4.jpg"
// }

(function () {
    'use strict';

    var thisModule = angular.module('pipMocked.Avatar', ['ngMockE2E', 'ngResource']);

    thisModule.factory('MockedAvatarResource', ['$httpBackend', '$log', 'MockedResource', function ($httpBackend, $log, MockedResource) {
        var child = Object.create(MockedResource);

        child.api = '/api/parties';

        child.register = function() {

            var recordType = ['areas', 'goals'];
           
            // GET for goals /api/parties/:party_id/record_type/:record_id/avatar? ...
            $httpBackend.whenGET(new RegExp(child.regEsc(child.fakeUrl + child.api + '/') + child.IdRegExp + child.regEsc('/goals/') + child.IdRegExp + child.regEsc('/avatar?'))).respond(function(method, url, data, headers) {
               console.log('MockedAvatarResource whenGET record', data, headers);

                 return [200, {}, {}];
            });

            // PUT for goals /api/parties/:party_id/record_type/:record_id/avatar?name= ...
            $httpBackend.whenPOST(new RegExp(child.regEsc(child.fakeUrl + child.api + '/') + child.IdRegExp + child.regEsc('/goals/') + child.IdRegExp + child.regEsc('/avatar?name='))).respond(function(method, url, data, headers) {
                console.log('MockedAvatarResource whenPUT record', data, headers);

                return [200, {}, {}];
            });   

            // DELETE for goals /api/parties/:party_id/record_type/:record_id/avatar
            $httpBackend.whenDELETE(new RegExp(child.regEsc(child.fakeUrl + child.api + '/') + child.IdRegExp + child.regEsc('/goals/') + child.IdRegExp + child.regEsc('/avatar') + child.EndStringRegExp)).respond(function(method, url, data, headers) {
                console.log('MockedAvatarResource whenPUT record', data, headers);

                return [200, {}, {}];
            });  

            // GET for areas /api/parties/:party_id/record_type/:record_id/avatar? ...
            $httpBackend.whenGET(new RegExp(child.regEsc(child.fakeUrl + child.api + '/') + child.IdRegExp + child.regEsc('/areas/') + child.IdRegExp + child.regEsc('/avatar?'))).respond(function(method, url, data, headers) {
               console.log('MockedAvatarResource whenGET record', data, headers);

                 return [200, {}, {}];
            });

            // PUT for areas /api/parties/:party_id/record_type/:record_id/avatar?name= ...
            $httpBackend.whenPOST(new RegExp(child.regEsc(child.fakeUrl + child.api + '/') + child.IdRegExp + child.regEsc('/areas/') + child.IdRegExp + child.regEsc('/avatar?name='))).respond(function(method, url, data, headers) {
                console.log('MockedAvatarResource whenPUT record', data, headers);

                return [200, {}, {}];
            });   

            // DELETE for areas /api/parties/:party_id/record_type/:record_id/avatar
            $httpBackend.whenDELETE(new RegExp(child.regEsc(child.fakeUrl + child.api + '/') + child.IdRegExp + child.regEsc('/areas/') + child.IdRegExp + child.regEsc('/avatar') + child.EndStringRegExp)).respond(function(method, url, data, headers) {
                console.log('MockedAvatarResource whenPUT record', data, headers);

                return [200, {}, {}];
            });  

            // GET for party /api/parties/:party_id/avatar? ...
            $httpBackend.whenGET(new RegExp(child.regEsc(child.fakeUrl + child.api + '/') + child.IdRegExp + child.regEsc('/avatar?'))).respond(function(method, url, data, headers) {
               console.log('MockedAvatarResource whenGET party', data, headers);

                 return [200, {}, {}];
            });

            // PUT for party /api/parties/:party_id/avatar?name= ...
            $httpBackend.whenPOST(new RegExp(child.regEsc(child.fakeUrl + child.api + '/') + child.IdRegExp + child.regEsc('/avatar?name='))).respond(function(method, url, data, headers) {
                console.log('MockedAvatarResource whenPUT party', data, headers);

                return [200, {}, {}];
            });   

            // DELETE for party /api/parties/:party_id/avatar
            $httpBackend.whenDELETE(new RegExp(child.regEsc(child.fakeUrl + child.api + '/') + child.IdRegExp + child.regEsc('/avatar') + child.EndStringRegExp)).respond(function(method, url, data, headers) {
                console.log('MockedAvatarResource whenPUT party', data, headers);

                return [200, {}, {}];
            });  
                   
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
            $httpBackend.whenPOST(child.fakeUrl + child.api)
                .respond(function(method, url, data, headers, params) {
                    console.log('signin whenPOST', method, url, data, headers, params);
                    // todo:  может хранить имена этих коллекций в настройках??
                    var user, 
                        userData = angular.fromJson(data),
                        users = child.dataset.get('UsersTestCollection'),
                        usersCollection;

                    if (!userData || !userData['email']) {
                        console.log('signin data', userData, userData.email, userData["email"]);
                        throw new Error('MockedSigninResource: login is not specified')
                    }
                    if (!users) {
                        throw new Error('MockedSigninResource: Users collection is not found')
                    }

                    usersCollection = users.getAll();
                    user = _.find(usersCollection, {email: userData.email});

                    if (!user || !user.id) {
                        var error = child.getError('1106');

                        return [error.StatusCode, error.request, error.headers];
                    }
                    // set current user
                    child.dataset.setCurrentUser(user);

                    return [200, user, {}];
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
            $httpBackend.whenPOST(child.fakeUrl + child.api)
                .respond(function(method, url, data, headers, params) {
                    console.log('signup whenPOST', data, headers, params);
                    var user, 
                        userData = angular.fromJson(data),
                        users = child.dataset.get('UsersTestCollection'),
                        usersCollection;

                    if (!userData || !userData.email || !userData.name) {
                        throw new Error('MockedSignupResource: login is not specified')
                    }
                    if (!users) {
                        throw new Error('MockedSignupResource: Users collection is not found')
                    }

                    usersCollection = users.getAll();
                    user = _.find(usersCollection, {email: userData.email});

                    if (user && user.id) {
                        var error = child.getError('1104');

                        return [error.StatusCode, error.request, error.headers];
                    }

                    // generate new user and save it into UsersTestCollection
                    user = users.create({
                        email: userData.email,
                        name: userData.name
                    });
                    console.log('signup: add new user', user);

                    // set current user
                    child.dataset.setCurrentUser(user);

                    return [200, user, {}];
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
                console.log('signout whenPOST', data, headers, params);
                child.dataset.clearCurrentUser();

                return [200, "OK", {}];
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
            $httpBackend.whenPOST(child.fakeUrl + child.api)
                .respond(function(method, url, data, headers, params) {
                    console.log('signup_validate whenPOST', data, headers, params);
                    var user, 
                        userData = angular.fromJson(data),
                        users = child.dataset.get('UsersTestCollection'),
                        usersCollection;

                    if (!userData || !userData.email) {
                        throw new Error('MockedSignupValidateResource: email is not specified')
                    }
                    if (!users) {
                        throw new Error('MockedSignupValidateResource: Users collection is not found')
                    }

                    usersCollection = users.getAll();
                    user = _.find(usersCollection, {email: userData.email});

                    if (!user || !user.id) {
                        var error = child.getError('1106');

                        return [error.StatusCode, error.request, error.headers];
                    }

                    return [200, "OK", {}];
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
            $httpBackend.whenPOST(child.fakeUrl + child.api)
                .respond(function(method, url, data, headers, params) {
                    console.log('verify_email whenPOST', data, headers, params);
                    var user, 
                        userData = angular.fromJson(data),
                        users = child.dataset.get('UsersTestCollection'),
                        usersCollection;

                    if (!userData || !userData.email || !userData.code) {
                        throw new Error('MockedVerifyEmailResource: data is not specified')
                    }
                  
                    if (!users) {
                        throw new Error('MockedVerifyEmailResource: Users collection is not found')
                    }

                    usersCollection = users.getAll();
                    user = _.find(usersCollection, {email: userData.email});

                    if (!user || !user.id) {
                        var error = child.getError('1106');

                        return [error.StatusCode, error.request, error.headers];
                    }

                    if (user && user.code != userData.code) {
                        var error = child.getError('1103');

                        return [error.StatusCode, error.request, error.headers];
                    }

                    user.email_ver = true;

                    return [200, "OK", {}];   
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
            $httpBackend.whenPOST(child.fakeUrl + child.api)
                .respond(function(method, url, data, headers, params) {
                    console.log('recover_password whenPOST', data, headers, params);
                    var user, 
                        userData = angular.fromJson(data),
                        users = child.dataset.get('UsersTestCollection'),
                        usersCollection;

                    if (!userData || !userData.email) {
                        throw new Error('MockedRecoverPasswordResource: email is not specified')
                    }
                    if (!users) {
                        throw new Error('MockedRecoverPasswordResource: Users collection is not found')
                    }

                    usersCollection = users.getAll();
                    user = _.find(usersCollection, {email: userData.email});

                    if (!user || !user.id) {
                        var error = child.getError('1106');

                        return [error.StatusCode, error.request, error.headers];
                    }

                    return [200, "OK", {}];   
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
            $httpBackend.whenPOST(child.fakeUrl + child.api)
                .respond(function(method, url, data, headers, params) {
                    console.log('reset_password whenPOST', data, headers, params);
                    var user, 
                        userData = angular.fromJson(data),
                        users = child.dataset.get('UsersTestCollection'),
                        usersCollection;

                    if (!userData || !userData.email || !userData.code || !userData.password) {
                        throw new Error('MockedResetPasswordResource: data is not specified')
                    }
                    if (!users) {
                        throw new Error('MockedResetPasswordResource: Users collection is not found')
                    }

                    usersCollection = users.getAll();
                    user = _.find(usersCollection, {email: userData.email});

                    if (!user || !user.id) {
                        var error = child.getError('1106');

                        return [error.StatusCode, error.request, error.headers];
                    }
                    if (!user || user.code != userData.code) {
                        var error = child.getError('1108');

                        return [error.StatusCode, error.request, error.headers];
                    }

                    return [200, "OK", {}];   
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
            $httpBackend.whenPOST(child.fakeUrl + child.api)
                .respond(function(method, url, data, headers, params) {
                    console.log('change_password whenPOST', data, headers, params);

                    return [200, "OK", {}];
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
 * get/delete: serverurl + /api/parties/ + partyId + '/files/' + imageId + '/content'
 * upload: serverUrl + '/api/parties/' + partyId + '/files?name='
 */

// example  
// get image src     http://alpha.pipservices.net/api/parties/565f12ef8ff2161b1dfeedbf/files/578ddc6b4997deb8138fe5ac/content
// get image object  http://alpha.pipservices.net/api/parties/565f12ef8ff2161b1dfeedbf/files/578ddc6b4997deb8138fe5ac
// post image        http://alpha.pipservices.net/api/parties/565f12ef8ff2161b1dfeedbf/files?name=Screenshot_2.png
// delete image      http://alpha.pipservices.net/api/parties/565f12ef8ff2161b1dfeedbf/files/578ddd944997deb8138fe5d3

// response to post or get (serverurl + /api/parties/ + partyId + '/files/' + imageId)
// {
//   "id": "57a459fbf6dd4d642c1daf23",
//   "name": "Screenshot_2.png",
//   "content_type": "image/png",
//   "length": 78848,
//   "party_id": "565f12ef8ff2161b1dfeedbf",
//   "creator_id": "565f12ef8ff2161b1dfeedbf",
//   "created": "2016-08-05T09:18:52.304Z",
//   "refs": [],
//   "url": "https://s3-us-west-1.amazonaws.com/alpha-uploads.piplife.com/57a459fbf6dd4d642c1daf23/Screenshot_2.png"
// }


(function () {
    'use strict';

    var thisModule = angular.module('pipMocked.Images', ['ngMockE2E', 'ngResource']);

    thisModule.factory('MockedImagesResource', ['$httpBackend', '$log', 'MockedResource', function ($httpBackend, $log, MockedResource) {
        var child = Object.create(MockedResource);

        child.api = '/api/parties';

        child.register = function() {

            // GET object /api/parties/:party_id/files/:image_id
            $httpBackend.whenGET(new RegExp(child.regEsc(child.fakeUrl + child.api + '/') + child.IdRegExp + child.regEsc('/files/') + child.IdRegExp + child.EndStringRegExp))
                .respond(function(method, url, data, headers) {
                    console.log('MockedImagesResource whenGET object', data, headers);

                    var file = child.dataset.get('FilesTestCollection').getByIndex(0);
                    return [200, file, {}];
                });

            // GET image /api/parties/:party_id/files/:image_id/content
            $httpBackend.whenGET(new RegExp(child.regEsc(child.fakeUrl + child.api + '/') + child.IdRegExp + child.regEsc('/files/') + child.IdRegExp + child.regEsc('/content') + child.EndStringRegExp))
                .respond(function(method, url, data, headers) {
                console.log('MockedImagesResource whenGET image', data, headers);
                    
                    var idParams = child.getUrlIdParams(url);

                    console.log('MockedImagesResource GET image url', url);
                    console.log('MockedImagesResource GET image idParams', idParams);

                    var file = child.dataset.get('FilesTestCollection').getByIndex(0) || {};
                    return [200, file.url, {}];
                });

            // PUT /api/parties/:party_id/files?name=
            $httpBackend.whenPOST(new RegExp(child.regEsc(child.fakeUrl + child.api + '/') + child.IdRegExp + child.regEsc('/files?name='))).respond(function(method, url, data, headers) {
                console.log('MockedImagesResource whenPUT', data, headers);

                return [200, {}, {}];
            });   

            // DELETE  /api/parties/:party_id/files/:image_id
            $httpBackend.whenDELETE(new RegExp(child.regEsc(child.fakeUrl + child.api + '/') + child.IdRegExp + child.regEsc('/files/') + child.IdRegExp + child.EndStringRegExp)).respond(function(method, url, data, headers) {
                console.log('MockedImagesResource whenPUT', data, headers);

                return [200, {}, {}];
            });     
                   
        }

        return child;
    }]);

})();
/**
 * @file MockedImageSetResource
 * @copyright Digital Living Software Corp. 2014-2016
 * 
 * Mocked:
 * /api/image_sets/:id
 * /api/images/search
 */

(function () {
    'use strict';

    var thisModule = angular.module('pipMocked.ImageSet', ['ngMockE2E', 'ngResource']);

    thisModule.factory('MockedImageSetResource', ['$httpBackend', '$log', 'MockedResource', function ($httpBackend, $log, MockedResource) {
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

    thisModule.factory('MockedResource', ['$httpBackend', '$log', 'pipTestDataService', 'PipResourcesError', function ($httpBackend, $log, pipTestDataService, PipResourcesError) {

            this.api = '';
            this.fakeUrl = 'http://alpha.pipservices.net';
            this.dataset = pipTestDataService.getDataset();

            this.regEsc = function (str) {
                    //Escape string to be able to use it in a regular expression
                    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
            }

            this.IdRegExp = /[a-zA-Z0-9]{24}/.toString().slice(1, -1);
            this.QueryRegExp = /[\d\w-_\.%\s]*$/.toString().slice(1, -1);
            this.EndStringRegExp = /$/.toString().slice(1, -1);
            
            // search all id into url
            this.getUrlIdParams = function(url) {
                var i, result = url.match(/(\/[a-zA-Z0-9]{24})/g);

                for (i = 0; i < result.length; i++) {
                    result[i] = result[i].slice(1, -1);
                }
                
                return result;
            }

            this.getError = function (errorCode) {
                var error;

                error = PipResourcesError[errorCode];

                if (!error) {
                    error = {
                        StatusCode: 400,
                        StatusMessage: 'Not found',
                        request: {
                            code: '',
                            name: 'Not found',
                            message: ''
                        },
                        headers: {}
                    };
                }

                return error;
            }

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
            $httpBackend.whenGET(child.fakeUrl + child.api)
                .respond(function(method, url, data, headers) {
                console.log('MockedCurrentUserResource whenGET current', data, headers);
                    var user;

                    user = child.dataset.getCurrentUser();

                    if (!user || !user.id) {
                        var error = child.getError('1106');

                        return [error.StatusCode, error.request, error.headers];
                    }

                    return [200, user, {}];   
                });
                
        }

        return child;
    }]);

    thisModule.factory('MockedUsersResource', ['$httpBackend', '$log', 'MockedResource', function ($httpBackend, $log, MockedResource) {
        var child = Object.create(MockedResource);

        child.api = '/api/users';

        child.register = function() {

            // GET /api/users
            $httpBackend.whenGET(child.fakeUrl + child.api)
                .respond(function(method, url, data, headers, params) {
                console.log('MockedUsersResource whenGET collection', method, url, data, headers, params);
                var user, 
                    users = child.dataset.get('UsersTestCollection'),
                    usersCollection;
                  
                    if (!users) {
                        throw new Error('MockedUsersResource: Users collection is not found')
                    }

                    usersCollection = users.getAll();

                    return [200, usersCollection, {}];                    
                });

            // POST /api/users
            $httpBackend.whenPOST(child.fakeUrl + child.api)
                .respond(function(method, url, data, headers, params) {
                    console.log('MockedUsersResource whenPOST', method, url, data, headers, params);
                    var user, 
                        userData = angular.fromJson(data),
                        users = child.dataset.get('UsersTestCollection'),
                        usersCollection;

                    if (!userData || !userData['email']) {
                        console.log('post user', userData);
                        throw new Error('MockedUsersResource: user email is not specified')
                    }

                    if (!users) {
                        throw new Error('MockedUsersResource: Users collection is not found')
                    }

                    usersCollection = users.getAll();
                    user = _.find(usersCollection, {email: userData.email});

                    if (user && user.id) {
                        var error = child.getError('1104'); //todo error code

                        return [error.StatusCode, error.request, error.headers];
                    }

                    // add user to collection
                    user = users.create(userData);

                    return [200, user, {}];
                }); 

            // GET /api/users/:id
            $httpBackend.whenGET(new RegExp(child.regEsc(child.fakeUrl + child.api + '/') + child.IdRegExp + child.EndStringRegExp))
                .respond(function(method, url, data, headers) {
                    console.log('MockedUsersResource whenGET user', data, headers);
                    // var user, 
                    //     userData = angular.fromJson(data),
                    //     users = child.dataset.get('UsersTestCollection'),
                    //     usersCollection;

                    // if (!userData || !userData['email']) {
                    //     console.log('post user', userData);
                    //     throw new Error('MockedUsersResource: user email is not specified')
                    // }

                    // if (!users) {
                    //     throw new Error('MockedUsersResource: Users collection is not found')
                    // }

                    // usersCollection = users.getAll();
                    // user = _.find(usersCollection, {email: userData.email});

                    // if (user && user.id) {
                    //     var error = child.getError('1104'); //todo error code

                    //     return [error.StatusCode, error.request, error.headers];
                    // }

                    // // add user to collection
                    // user = users.create(userData);

                    return [200, user, {}];
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
 

/**
 * @file Rest API enumerations service
 * @copyright Digital Living Software Corp. 2014-2016
 */
 
 /* global _, angular */

(function () {
    'use strict';

    var thisModule = angular.module('PipResources.Error', []);

    thisModule.factory('PipResourcesError', function () {

        var Errors = {};
        
        Errors['1104'] = {
            StatusCode: 400,
            StatusMessage: 'Bad Request',
            request: {
                code: 1104,
                name: 'Bad Request',
                message: 'Email is already registered'
            },
            headers: {}
        };
        Errors['1106'] = {
            StatusCode: 400,
            StatusMessage: 'Bad Request',
            request: {
                code: 1106,
                name: 'Bad Request',
                message: 'User was not found'
            },
            headers: {}
        };
        Errors['1103'] = {
            StatusCode: 400,
            StatusMessage: 'Bad Request',
            request: {
                code: 1103,
                name: 'Bad Request',
                message: 'Invalid email verification code'
            },
            headers: {}
        };
        Errors['1108'] = {
            StatusCode: 400,
            StatusMessage: 'Bad Request',
            request: {
                code: 1108,
                name: 'Bad Request',
                message: 'Invalid password recovery code'
            },
            headers: {}
        };

        return Errors;
    });
    
})();

/**
 * @file pipImageResources service
 * @copyright Digital Living Software Corp. 2014-2016
 * @todo:
 */
 
 /* global _, angular */

(function () {
    'use strict';

    var thisModule = angular.module('pipImageResources', []);

    thisModule.provider('pipImageResources', function() {
        var imagesMap = [],
            size = 0;

        this.setImages = setImages;

        this.$get = ['$rootScope', '$timeout', 'localStorageService', 'pipAssert', function ($rootScope, $timeout, localStorageService, pipAssert) {


            return {
                setImages: setImages,
                getImagesCollection: getImagesCollection,
                getImage: getImage
            }
        }];

        // Add images collection
        function setImages(newImagesRes) {
            console.log('setImages', newImagesRes);
            if (!angular.isArray(newImagesRes)) {
                new Error('pipImageResources setImages: first argument should be an object');
            }

            imagesMap = _.union(imagesMap, newImagesRes);
            size = imagesMap.length;
        }

        // Get images collection
        function getImagesCollection(size, search) {
            console.log('getImagesCollection imagesMap', imagesMap);
            if (!!search && !angular.isString(search)) {
                new Error('pipImageResources getImages: second argument should be a string');
            }

            var result, queryLowercase,
                resultSize = size && size < imagesMap.length ? size : -1;

            if (!search) {
                result = imagesMap;
            } else {
                queryLowercase = search.toLowerCase();
                result = _.filter(imagesMap, function (item) {
                        if (item.title) {
                            return (item.title.toLowerCase().indexOf(queryLowercase) >= 0);
                        } else return false;
                    }) || [];
            }

            if (resultSize === -1) {
                return _.cloneDeep(result);
            } else {
                return _.take(result, resultSize);
            }                        
        }   

        function getImage() {
            var i = _.random(0, size - 1);

            if (size > 0) {
                return _.cloneDeep(imagesMap[i]);
            } else {
                return null;
            }
        }  

    });

})();
//# sourceMappingURL=pip-webui-test.js.map
