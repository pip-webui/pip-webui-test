/*
 * Mocks for Users REST API
 * (с) Digital Living Software Corp. 2014-2016
 */

/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module('pipMocks.Users', ['ngMockE2E', 'ngResource']);

    thisModule.run(
        function($httpBackend, pipFakeDataModelUsers, pipDataGeneratorGeneral) {
            var USERS = '/api/users';

        console.log('pipMocks.Users');
            // config this
            var serverUrl = pipDataGeneratorGeneral.serverUrl();

       
            $httpBackend.whenPOST(serverUrl + USERS).respond(function(method, url, data, headers, params) {
                console.log('pipMocks.Users22222', data, headers, params);
                return [200, {}, {}];
            });

        }
    );

})();
