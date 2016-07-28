/**
 * @file pipMocked
 * @copyright Digital Living Software Corp. 2014-2016
 */

(function () {
    'use strict';

    var thisModule = angular.module('pipMocked', ['ngMockE2E', 'ngResource']);

    thisModule.factory('pipMockedResource', function () {

        // var newFakeServerUrl = '';

        var mocks = [];

        // this.fakeServerUrl = function (newFakeServerUrl) {
        //     if (newFakeServerUrl)
        //         fakeServerUrl = newFakeServerUrl;
        //     return newFakeServerUrl;
        // };

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

    thisModule.factory('UnMockedResource', function ($httpBackend, $log, MockedResource) {
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
                console.log('pipMocks.Users22222', data, headers, params);

                return [200, {}, {}];
            }); 
        }

        return child;
    });

})();
 