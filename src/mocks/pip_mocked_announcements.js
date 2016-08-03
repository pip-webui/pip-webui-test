/**
 * @file MockedAnnouncementsResource
 * @copyright Digital Living Software Corp. 2014-2016
 * 
 * Mocked:
 * /api/announcements/:id
 */

(function () {
    'use strict';

    var thisModule = angular.module('pipMocked.Announcements', ['ngMockE2E', 'ngResource']);

    thisModule.factory('MockedAnnouncementsResource', function ($httpBackend, $log, MockedResource) {
        var child = Object.create(MockedResource);

        child.api = '/api/announcements';

        child.register = function() {

                   
        }

        return child;
    });

})();