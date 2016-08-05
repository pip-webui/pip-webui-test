/**
 * @file MockedImageSetResource
 * @copyright Digital Living Software Corp. 2014-2016
 * 
 * Mocked:
 * /api/image_sets/:id
 * /api/images/search
 */

(function () {
    'use strict';

    var thisModule = angular.module('pipMocked.ImageSet', ['ngMockE2E', 'ngResource']);

    thisModule.factory('MockedImageSetResource', function ($httpBackend, $log, MockedResource) {
        var child = Object.create(MockedResource);

        child.api = '/api/image_sets';

        child.register = function() {

                   
        }

        return child;
    });

})();