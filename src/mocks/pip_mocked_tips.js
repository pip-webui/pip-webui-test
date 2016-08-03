/**
 * @file MockedTipsResource
 * @copyright Digital Living Software Corp. 2014-2016
 * 
 * Mocked:
 * /api/tips/:id
 */

(function () {
    'use strict';

    var thisModule = angular.module('pipMocked.Tips', ['ngMockE2E', 'ngResource']);

    thisModule.factory('MockedTipsResource', function ($httpBackend, $log, MockedResource) {
        var child = Object.create(MockedResource);

        child.api = '/api/tips';

        child.register = function() {

                   
        }

        return child;
    });

})();