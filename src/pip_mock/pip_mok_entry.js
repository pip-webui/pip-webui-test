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

    // thisModule.config(function($provide) {
    //     $provide.decorator('$httpBackend', angular.mock.e2e.$httpBackendDecorator);
    // });

    thisModule.run(
        function($httpBackend, pipFakeDataModelUsers) {

            // config this
            var serverUrl = 'http://alpha.pipservices.net';
        
            $httpBackend.whenGET(serverUrl + '/api/signin').respond(function(method, url, data) {
                var user = pipFakeDataModelUsers.findOne('565f12ef8ff2161b1dfeedbf')

                    console.log('signin get', method, url, data);
                    console.log('signin return', user);
                return [200, user, user];
            });
       
            $httpBackend.whenPOST(serverUrl + '/api/signin').respond(function(method, url, data, headers) {
                var user = pipFakeDataModelUsers.findOne('565f12ef8ff2161b1dfeedbf')

                    console.log('signin post', method, url, data);
                    console.log('signin return', user);
                return [200, user, user];
            });

            $httpBackend.whenGET(/samples\//).passThrough();

            // // do real request
            // $httpBackend.whenJSONP().passThrough();
        }
    );

})();
