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
    });

    thisModule.factory('MockedUsersResource', function ($httpBackend, $log, MockedResource) {
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
                .respond(function(method, url, data, headers, params) {
                    console.log('MockedUsersResource whenGET user', method, url, data, headers, params);
                    var user, 
                        idParams,
                        userId,
                        users = child.dataset.get('UsersTestCollection');

                    idParams = child.getUrlIdParams(url);

                    if (!idParams || idParams.length == 0) {
                        throw new Error('MockedUsersResource: user_id is not specified into url')
                    }

                    userId = idParams[0];
                    if (!users) {
                        throw new Error('MockedUsersResource: Users collection is not found')
                    }

                    user = users.findById(userId);
                    console.log('MockedUsersResource whenGET user', user);
                    
                    return [200, user, {}];
                });

            // PUT /api/users/:id
            $httpBackend.whenPUT(new RegExp(child.regEsc(child.fakeUrl + child.api + '/') + child.IdRegExp + child.EndStringRegExp))
                .respond(function(method, url, data, headers, params) {
                    console.log('MockedUsersResource whenPUT', method, url, data, headers, params);
                    var user, 
                        userData = angular.fromJson(data),
                        idParams,
                        userId,
                        users = child.dataset.get('UsersTestCollection');

                    idParams = child.getUrlIdParams(url);

                    if (!idParams || idParams.length == 0) {
                        throw new Error('MockedUsersResource: user_id is not specified into url')
                    }

                    userId = idParams[0];
                    if (!users) {
                        throw new Error('MockedUsersResource: Users collection is not found')
                    }

                    user = users.findById(userId);
                    user = users.update(userId, userData);
                    console.log('MockedUsersResource whenPUT user', user);
                    
                    return [200, user, {}];
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
 
