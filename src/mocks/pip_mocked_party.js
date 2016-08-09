/**
 * @file MockedPartyResource
 * @copyright Digital Living Software Corp. 2014-2016
 * 
 * Mocked:
 * /api/parties/:id
 * /api/parties/:party_id/settings
 * 
 * 
 * 
 * 
{
    "name": "Миньошка"
    "email": "1@1.com"
    "type": "person"
    "about": "Ff"
    "gender": "female"
    "loc_name": "Obolons'kyi Ave, 7Г, Kyiv, Ukraine"
    "loc_pos": {
    "type": "Point"
    "coordinates": [2]
    0:  50.5046445
    1:  30.49428599999999
    -
    }-
    "join": "approve"
    "updated": "2016-07-27T12:53:45.287Z"
    "created": "2015-12-02T15:49:03.223Z"
    "id": "565f12ef8ff2161b1dfeedbf"
}

{
  "name": "stasD",
  "email": "stas@d.com",
  "type": "person",
  "join": "approve",
  "updated": "2016-08-08T19:08:53.148Z",
  "created": "2016-08-08T19:08:53.148Z",
  "id": "57a8d8c5f6dd4d642c1daf66"
}
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

    thisModule.factory('MockedPartySettingsResource', function ($httpBackend, $log, MockedResource) {
        var child = Object.create(MockedResource);

        child.api = '/api/parties/';

        child.register = function() {

                   
        }

        return child;
    });

})();