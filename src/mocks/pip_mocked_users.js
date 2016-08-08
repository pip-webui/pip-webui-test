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
                .respond(function(method, url, data, headers, params) {
                console.log('MockedCurrentUserResource whenGET current', method, url, data, headers, params);
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
            $httpBackend.whenDELETE(new RegExp(child.regEsc(child.fakeUrl + child.api + '/') + child.IdRegExp + child.EndStringRegExp))
                .respond(function(method, url, data, headers, params) {
                    console.log('MockedUsersResource whenDELETE', method, url, data, headers, params);
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
                    if (!user || !user.id) {
                        var error = child.getError('1106');

                        return [error.StatusCode, error.request, error.headers];
                    }

                    console.log('MockedUsersResource whenDELETE user', user);
                    users.deleteById(user.id);
                    console.log('users collection', users.getAll());

                    return [200, "OK", {}];
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
                .respond(function(method, url, data, headers, params) {
                    console.log('MockedUserSessionsResource whenGET', method, url, data, headers, params);
                    var user, 
                        idParams,
                        userId,
                        users = child.dataset.get('UsersTestCollection');

                    idParams = child.getUrlIdParams(url);

                    if (!idParams || idParams.length == 0) {
                        throw new Error('MockedUserSessionsResource: user_id is not specified into url')
                    }

                    userId = idParams[0];
                    if (!users) {
                        throw new Error('MockedUserSessionsResource: Users collection is not found')
                    }

                    user = users.findById(userId);
                    if (!user || !user.id) {
                        var error = child.getError('1106');

                        return [error.StatusCode, error.request, error.headers];
                    }

                    console.log('MockedUserSessionsResource whenGET', user.sessions);

                    return [200, user.sessions, {}];
                });

            // DELETE  /api/users/:party_id/sessions/:id
            $httpBackend.whenDELETE(new RegExp(child.regEsc(child.fakeUrl + '/api/users/') + child.IdRegExp + child.regEsc('/sessions/') + child.IdRegExp + child.EndStringRegExp))
                .respond(function(method, url, data, headers, params) {
                    console.log('MockedUserSessionsResource whenDELETE', method, url, data, headers, params);
                    var user, i, match = false,
                        idParams,
                        userId, sessionId,
                        users = child.dataset.get('UsersTestCollection');

                    idParams = child.getUrlIdParams(url);

                    if (!idParams || idParams.length == 0) {
                        throw new Error('MockedUserSessionsResource: user_id is not specified into url')
                    }

                    userId = idParams[0];
                    sessionId = idParams[1];
                    if (!users) {
                        throw new Error('MockedUserSessionsResource: Users collection is not found')
                    }

                    user = users.findById(userId);
                    if (!user || !user.id) {
                        var error = child.getError('1106');

                        return [error.StatusCode, error.request, error.headers];
                    }

                    for (i = 0; i < user.sessions.length; i++) {
                        if (user.sessions[i].id === sessionId) {
                            match = true;
                            user.sessions.splice(i, 1);
                            break;
                        }
                    }
                    user = users.update(userId, users);

                    console.log('MockedUserSessionsResource whenDELETE', user.sessions);

                    return [200, match ? "OK" : null, {}];
                });      
        }

        return child;
    });    

})();
 
