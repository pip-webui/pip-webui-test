/**
 * @file MockedFeedbacksResource
 * @copyright Digital Living Software Corp. 2014-2016
 * 
 * Mocked:
 * /api/feedbacks/:id
 */

(function () {
    'use strict';

    var thisModule = angular.module('pipMocked.Feedbacks', ['ngMockE2E', 'ngResource']);

    thisModule.factory('MockedFeedbacksResource', function ($httpBackend, $log, MockedResource) {
        var child = Object.create(MockedResource);

        child.api = '/api/feedbacks';

        child.register = function() {

                   
        }

        return child;
    });

})();