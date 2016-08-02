/**
 * @file Registration of WebUI tests
 * @copyright Digital Living Software Corp. 2014-2015
 */

(function () {
    'use strict';

    var thisModule = angular.module('pipWebuiTests', [
        'pipDataGenerator',
        'pipFakeDataModel',

        'pipMocked',
        'pipMocked.Users',
        'pipMocked.Entry',

        'pipGenerators',
        'pipGenerators.User',
        'pipTestCollection'
    ]);


    thisModule.run(
        ['pipMockedResource', 'MockedUsersResource', 'MockedCurrentUserResource', 'TruePathResource', 'MockedSigninResource', 'MockedSignupResource', 'MockedSignoutResource', 'MockedSignupValidateResource', 'MockedVerifyEmailResource', 'MockedRecoverPasswordResource', 'MockedResetPasswordResource', 'MockedChangePasswordResource', function(pipMockedResource, MockedUsersResource, MockedCurrentUserResource, TruePathResource, MockedSigninResource,
        MockedSignupResource, MockedSignoutResource, MockedSignupValidateResource, MockedVerifyEmailResource,
        MockedRecoverPasswordResource, MockedResetPasswordResource, MockedChangePasswordResource) {


            pipMockedResource.addMocks(MockedUsersResource);
            pipMockedResource.addMocks(MockedCurrentUserResource);

            pipMockedResource.addMocks(MockedSigninResource);
            pipMockedResource.addMocks(MockedSignupResource);
            pipMockedResource.addMocks(MockedSignoutResource);
            pipMockedResource.addMocks(MockedSignupValidateResource);
            pipMockedResource.addMocks(MockedVerifyEmailResource);
            pipMockedResource.addMocks(MockedRecoverPasswordResource);
            pipMockedResource.addMocks(MockedResetPasswordResource);
            pipMockedResource.addMocks(MockedChangePasswordResource);

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
            this.name = name;
            // List of references collection names
            this.refs = refs; // string?    

            this.initObject = initObject;
            this.newObject = newObject;
            this.newObjectList = newObjectList;
            this.initObjectList = initObjectList;
            this.updateObject = updateObject;
        }
            // // Collection name
            // this.name = null;
            // // List of references collection names
            // this.refs = ''; // string?

            // return {
            //     initObject: initObject,
            //     newObject: newObject,
            //     newObjectList: newObjectList,
            //     initObjectList: initObjectList,
            //     updateObject: updateObject
            // }

            function initObject(obj) {
                var result;

                return result;
            }

            function newObject(refs) {
                var result;

                return result;                
            }

            function newObjectList(count, refs) {
                var result = [];

                return result;                
            }

            function initObjectList(obj) {
                var result = [];

                return result;                
            }

            function updateObject(index, obj, refs) {
                var result;

                return result;                 
            }

        return dataGenerator;

    }]);

})();
 
/**
 * @file pipTestCollection
 * @copyright Digital Living Software Corp. 2014-2016
 */

(function () {
    'use strict';

    var thisModule = angular.module('pipTestCollection', []);

// todo: current user
    thisModule.factory('pipTestCollection', ['$log', function ($log) {

        var testCollection = function(generator) { // generator: pipDataGenerator
            this.constructor(generator);

        }


        return testCollection;

    }]);

})();
/**
 * @file pipUserDataGenerators
 * @copyright Digital Living Software Corp. 2014-2016
 */

(function () {
    'use strict';

    var thisModule = angular.module('pipGenerators.User', []);

    thisModule.factory('pipUserDataGenerator', ['pipDataGenerator', '$log', function (pipDataGenerator, $log) {
            // var child = Object.create(pipDataGenerator);
            var child = new pipDataGenerator('User', 'User refs');

            child.someproperty = true;

            return child;
    }]);

})();
 
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
        'pipMocks.Files',
        'pipMocks.Settings',
        'pipMocks.Entry',
        'pipMocks.Users'        
    ]);

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

    thisModule.run(
        ['$httpBackend', 'pipFakeDataModelUsers', 'pipDataGeneratorGeneral', function($httpBackend, pipFakeDataModelUsers, pipDataGeneratorGeneral) {

            var SIGNIN = '/api/signin',
                SIGNUP = '/api/signup';
        console.log('pipMocks.Entry');
            // config this
            var serverUrl = pipDataGeneratorGeneral.serverUrl();
        
            $httpBackend.whenGET(serverUrl + SIGNIN).respond(function(method, url, data, headers, params) {
                var requestData = data ? JSON.parse(data) : {},
                    user = pipFakeDataModelUsers.addOne({email: data["email"]});

                return [200, user, user];
            });
       
            $httpBackend.whenPOST(serverUrl + SIGNIN).respond(function(method, url, data, headers, params) {
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

    var thisModule = angular.module('pipMocks.Users', ['ngMockE2E', 'ngResource']);

    thisModule.run(
        ['$httpBackend', 'pipFakeDataModelUsers', 'pipDataGeneratorGeneral', function($httpBackend, pipFakeDataModelUsers, pipDataGeneratorGeneral) {
            var USERS = '/api/users';

        console.log('pipMocks.Users');
            // config this
            var serverUrl = pipDataGeneratorGeneral.serverUrl();

       
            $httpBackend.whenPOST(serverUrl + USERS).respond(function(method, url, data, headers, params) {
                console.log('pipMocks.Users22222', data, headers, params);
                return [200, {}, {}];
            });

        }]
    );

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
 * @file pipMocked
 * @copyright Digital Living Software Corp. 2014-2016
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

            this.IdRegExp = /[a-zA-Z0-9]{24}$/.toString().slice(1, -1);
            this.QueryRegExp = /[\d\w-_\.%\s]*$/.toString().slice(1, -1);

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
            $httpBackend.whenGET(new RegExp(child.regEsc(child.fakeUrl + child.api + '/') + child.IdRegExp)).respond(function(method, url, data, headers) {
               console.log('MockedUsersResource whenGET user', data, headers);

                 return [200, {}, {}];
            });

            // PUT /api/users/:id
            $httpBackend.whenPUT(new RegExp(child.regEsc(child.fakeUrl + child.api + '/') + child.IdRegExp)).respond(function(method, url, data, headers) {
                console.log('MockedUsersResource whenPUT', data, headers);

                return [200, {}, {}];
            });   

            // DELETE /api/users/:id
            $httpBackend.whenDELETE(new RegExp(child.regEsc(child.fakeUrl + child.api + '/') + child.IdRegExp)).respond(function(method, url, data, headers) {
                console.log('MockedUsersResource whenPUT', data, headers);

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
