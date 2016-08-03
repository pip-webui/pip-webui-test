/**
 * @file MockedGuidesResource
 * @copyright Digital Living Software Corp. 2014-2016
 * 
 * Mocked:
 * /api/guides/:id
 */

(function () {
    'use strict';

    var thisModule = angular.module('pipMocked.Guides', ['ngMockE2E', 'ngResource']);

    thisModule.factory('MockedGuidesResource', function ($httpBackend, $log, MockedResource) {
        var child = Object.create(MockedResource);

        child.api = '/api/guides';

        child.register = function() {

                   
        }

        return child;
    });

})();