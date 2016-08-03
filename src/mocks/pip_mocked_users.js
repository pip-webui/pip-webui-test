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

    thisModule.factory('MockedCurrentUserResource', function ($httpBackend, $log, MockedResource) {
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
    });

    thisModule.factory('MockedUsersResource', function ($httpBackend, $log, MockedResource) {
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
    });

    thisModule.factory('MockedUserSessionsResource', function ($httpBackend, $log, MockedResource) {
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
    });    

})();
 
