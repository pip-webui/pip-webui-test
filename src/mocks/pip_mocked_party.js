/**
 * @file MockedPartyResource
 * @copyright Digital Living Software Corp. 2014-2016
 * 
 * Mocked:
 * /api/parties/:id
 * /api/parties/:party_id/settings
 */

(function () {
    'use strict';

    var thisModule = angular.module('pipMocked.Party', ['ngMockE2E', 'ngResource']);

    thisModule.factory('MockedPartyResource', function ($httpBackend, $log, MockedResource) {
        var child = Object.create(MockedResource);

        child.api = '/api/parties/';

        child.register = function() {

                   
        }

        return child;
    });

})();