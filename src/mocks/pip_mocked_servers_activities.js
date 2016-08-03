/**
 * @file MockedServersActivitiesResource
 * @copyright Digital Living Software Corp. 2014-2016
 * 
 * Mocked:
 * /api/servers/activities/:id
 */

(function () {
    'use strict';

    var thisModule = angular.module('pipMocked.ServersActivities', ['ngMockE2E', 'ngResource']);

    thisModule.factory('MockedServersActivitiesResource', function ($httpBackend, $log, MockedResource) {
        var child = Object.create(MockedResource);

        child.api = '/api/servers/activities';

        child.register = function() {

                   
        }

        return child;
    });

})();
 