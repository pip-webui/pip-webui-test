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
            if (extension && angular.isObject(extension)) {
                mocks.push(extension);
            }
        };

    });

    thisModule.factory('MockedResource', function ($httpBackend, $log, PipResourcesError) {

            this.api = '';
            this.fakeUrl = 'http://alpha.pipservices.net';
            this.dataset = null; // pipTestDataService.getDataset();

            this.regEsc = function (str) {
                    //Escape string to be able to use it in a regular expression
                    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
            }

            this.IdRegExp = /[a-zA-Z0-9]{24}/.toString().slice(1, -1);
            this.QueryRegExp = /[\d\w-_\.%\s]*$/.toString().slice(1, -1);
            this.EndStringRegExp = /$/.toString().slice(1, -1);
            
            // search all id into url
            this.getUrlIdParams = function(url) {
                var i, result = url.match(/(\/[a-zA-Z0-9]{24})/g);

                for (i = 0; i < result.length; i++) {
                    result[i] = result[i].slice(1, 25);
                }
                
                return result;
            }

            this.setDataset = function (dataset) {
                this.dataset = dataset;
            };

            this.getError = function (errorCode) {
                var error;

                error = PipResourcesError[errorCode];

                if (!error) {
                    error = {
                        StatusCode: 400,
                        StatusMessage: 'Not found',
                        request: {
                            code: '',
                            name: 'Not found',
                            message: ''
                        },
                        headers: {}
                    };
                }

                return error;
            }

            this.register = function() {}

        return this;
    });

    thisModule.factory('TruePathResource', function ($httpBackend, $log, MockedResource) {
            var child = Object.create(MockedResource);

            child.register = function() {
                $httpBackend.whenGET(/.*/).passThrough();           
                $httpBackend.whenGET(/.*.svg/).passThrough();           
                $httpBackend.whenJSONP(/.*/).passThrough();      
                $httpBackend.whenGET(/^\w+.*/).passThrough();
                $httpBackend.whenPOST(/^\w+.*/).passThrough();                       
            }
            return child;
    });

})();
 