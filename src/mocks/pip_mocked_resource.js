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

    thisModule.factory('MockedResource', function ($httpBackend, $log) {
            this.api = '';
            this.fakeUrl = 'http://alpha.pipservices.net';

            this.register = function() {}

        return this;
    });

    thisModule.factory('TruePathResource', function ($httpBackend, $log, MockedResource) {
            var child = Object.create(MockedResource);

            child.api = '';

            child.register = function() {
                $httpBackend.whenGET(/^(http:\/\/alpha.pipservices.net\/api\/){0}.*?/).passThrough();           
            }
            return child;
    });

    thisModule.factory('MockedUsersResource', function ($httpBackend, $log, MockedResource) {
        var child = Object.create(MockedResource);

        child.api = '/api/users';

        child.register = function() {
            $httpBackend.whenPOST(child.fakeUrl + child.api).respond(function(method, url, data, headers, params) {
                console.log('MockedUsersResource whenPOST', data, headers, params);

                return [200, {}, {}];
            }); 

            $httpBackend.whenGET(child.fakeUrl + child.api).respond(function(method, url, data, headers, params) {
                console.log('MockedUsersResource whenGET', data, headers, params);

                return [200, {}, {}];
            }); 

            $httpBackend.whenPUT(child.fakeUrl + child.api).respond(function(method, url, data, headers, params) {
                console.log('MockedUsersResource whenPUT', data, headers, params);

                return [200, {}, {}];
            });             
        }

        return child;
    });

    // thisModule.factory('MockedSigninResource', function ($httpBackend, $log, MockedResource) {
    //     var child = Object.create(MockedResource);

    //     child.api = '/api/signin;

    //     child.register = function() {
    //         $httpBackend.whenPOST(child.fakeUrl + child.api).respond(function(method, url, data, headers, params) {
    //             console.log('pipMocks.Users22222', data, headers, params);

    //             return [200, {}, {}];
    //         }); 
    //     }

    //     return child;
    // });    


    // thisModule.factory('MockedSignupResource', function ($httpBackend, $log, MockedResource) {
    //     var child = Object.create(MockedResource);

    //     child.api = '/api/signup';

    //     child.register = function() {
    //         $httpBackend.whenPOST(child.fakeUrl + child.api).respond(function(method, url, data, headers, params) {
    //             console.log('pipMocks.Users22222', data, headers, params);

    //             return [200, {}, {}];
    //         }); 
    //     }

    //     return child;
    // }); 

    // thisModule.factory('MockedSignoutResource', function ($httpBackend, $log, MockedResource) {
    //     var child = Object.create(MockedResource);

    //     child.api = '/api/signout';

    //     child.register = function() {
    //         $httpBackend.whenPOST(child.fakeUrl + child.api).respond(function(method, url, data, headers, params) {
    //             console.log('pipMocks.Users22222', data, headers, params);

    //             return [200, {}, {}];
    //         }); 
    //     }

    //     return child;
    // }); 

    // thisModule.factory('MockedSignupValidateResource', function ($httpBackend, $log, MockedResource) {
    //     var child = Object.create(MockedResource);

    //     child.api = '/api/signup_validate';

    //     child.register = function() {
    //         $httpBackend.whenPOST(child.fakeUrl + child.api).respond(function(method, url, data, headers, params) {
    //             console.log('pipMocks.Users22222', data, headers, params);

    //             return [200, {}, {}];
    //         }); 
    //     }

    //     return child;
    // }); 

    // thisModule.factory('MockedVerifyEmailResource', function ($httpBackend, $log, MockedResource) {
    //     var child = Object.create(MockedResource);

    //     child.api = '/api/signup_validate';

    //     child.register = function() {
    //         $httpBackend.whenPOST(child.fakeUrl + child.api).respond(function(method, url, data, headers, params) {
    //             console.log('pipMocks.Users22222', data, headers, params);

    //             return [200, {}, {}];
    //         }); 
    //     }

    //     return child;
    // }); 

    // thisModule.factory('MockedRecoverPasswordResource', function ($httpBackend, $log, MockedResource) {
    //     var child = Object.create(MockedResource);

    //     child.api = '/api/recover_password';

    //     child.register = function() {
    //         $httpBackend.whenPOST(child.fakeUrl + child.api).respond(function(method, url, data, headers, params) {
    //             console.log('pipMocks.Users22222', data, headers, params);

    //             return [200, {}, {}];
    //         }); 
    //     }

    //     return child;
    // }); 

    // thisModule.factory('MockedResetPasswordResource', function ($httpBackend, $log, MockedResource) {
    //     var child = Object.create(MockedResource);

    //     child.api = '/api/reset_password';

    //     child.register = function() {
    //         $httpBackend.whenPOST(child.fakeUrl + child.api).respond(function(method, url, data, headers, params) {
    //             console.log('pipMocks.Users22222', data, headers, params);

    //             return [200, {}, {}];
    //         }); 
    //     }

    //     return child;
    // });   

    // thisModule.factory('MockedChangePasswordResource', function ($httpBackend, $log, MockedResource) {
    //     var child = Object.create(MockedResource);

    //     child.api = '/api/change_password';

    //     child.register = function() {
    //         $httpBackend.whenPOST(child.fakeUrl + child.api).respond(function(method, url, data, headers, params) {
    //             console.log('pipMocks.Users22222', data, headers, params);

    //             return [200, {}, {}];
    //         }); 
    //     }

    //     return child;
    // }); 

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