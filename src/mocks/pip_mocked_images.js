/**
 * @file MockedImagesResource
 * @copyright Digital Living Software Corp. 2014-2016
 * 
 * Mocked:
 * /api/image_sets/:id
 * /api/images/search
 */

(function () {
    'use strict';

    var thisModule = angular.module('pipMocked.Images', ['ngMockE2E', 'ngResource']);

    thisModule.factory('MockedImagesResource', function ($httpBackend, $log, MockedResource) {
        var child = Object.create(MockedResource);

        child.api = '/api/image_sets';

        child.register = function() {

                   
        }

        return child;
    });

})();