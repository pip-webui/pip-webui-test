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
        function($httpBackend, pipFakeDataModelUsers, pipDataGeneratorGeneral) {

            var SIGNIN = '/api/signin',
                SIGNUP = '/api/signup';

            // config this
            var serverUrl = pipDataGeneratorGeneral.serverUrl;
        
            $httpBackend.whenGET(serverUrl + SIGNIN).respond(function(method, url, data) {
                var requestData = data ? JSON.parse(data) : {},
                    user = pipFakeDataModelUsers.addOne({email: data["email"]});

                return [200, user, user];
            });
       
            $httpBackend.whenPOST(serverUrl + SIGNIN).respond(function(method, url, data, headers) {
                var requestData = data ? JSON.parse(data) : {},
                    user = pipFakeDataModelUsers.addOne({email: requestData["email"]});

                return [200, user, user];
            });

            // config this?
            $httpBackend.whenGET(/samples\//).passThrough();

        }
    );

})();
