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

    thisModule.factory('MockedSigninResource', function ($httpBackend, $log, MockedResource) {
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
    });    

    thisModule.factory('MockedSignupResource', function ($httpBackend, $log, MockedResource) {
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
    }); 

    thisModule.factory('MockedSignoutResource', function ($httpBackend, $log, MockedResource) {
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
    }); 

    thisModule.factory('MockedSignupValidateResource', function ($httpBackend, $log, MockedResource) {
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
    }); 

    thisModule.factory('MockedVerifyEmailResource', function ($httpBackend, $log, MockedResource) {
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
    }); 

    thisModule.factory('MockedRecoverPasswordResource', function ($httpBackend, $log, MockedResource) {
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
    }); 

    thisModule.factory('MockedResetPasswordResource', function ($httpBackend, $log, MockedResource) {
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
                    if (user || user.code != userData.code) {
                        var error = child.getError('1108');

                        return [error.StatusCode, error.request, error.headers];
                    }

                    return [200, "OK", {}];   
                });                 
        }

        return child;
    });   

    thisModule.factory('MockedChangePasswordResource', function ($httpBackend, $log, MockedResource) {
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
    });  

})();
 
