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
    });

})();
 
