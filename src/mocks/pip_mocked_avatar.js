/**
 * @file MockedAvatarResource
 * @copyright Digital Living Software Corp. 2014-2016
 */

(function () {
    'use strict';

    var thisModule = angular.module('pipMocked.Avatar', ['ngMockE2E', 'ngResource']);

    thisModule.factory('MockedAvatarResource', function ($httpBackend, $log, MockedResource) {
        var child = Object.create(MockedResource);

        child.api = '/api/parties';

        child.register = function() {

            var recordType = ['areas', 'goals'];
           
            // GET for goals /api/parties/:party_id/record_type/:record_id/avatar? ...
            $httpBackend.whenGET(new RegExp(child.regEsc(child.fakeUrl + child.api + '/') + child.IdRegExp + child.regEsc('/goals/') + child.IdRegExp + child.regEsc('/avatar?'))).respond(function(method, url, data, headers) {
               console.log('MockedAvatarResource whenGET record', data, headers);

                 return [200, {}, {}];
            });

            // PUT for goals /api/parties/:party_id/record_type/:record_id/avatar?name= ...
            $httpBackend.whenPOST(new RegExp(child.regEsc(child.fakeUrl + child.api + '/') + child.IdRegExp + child.regEsc('/goals/') + child.IdRegExp + child.regEsc('/avatar?name='))).respond(function(method, url, data, headers) {
                console.log('MockedAvatarResource whenPUT record', data, headers);

                return [200, {}, {}];
            });   

            // DELETE for goals /api/parties/:party_id/record_type/:record_id/avatar
            $httpBackend.whenDELETE(new RegExp(child.regEsc(child.fakeUrl + child.api + '/') + child.IdRegExp + child.regEsc('/goals/') + child.IdRegExp + child.regEsc('/avatar') + child.EndStringRegExp)).respond(function(method, url, data, headers) {
                console.log('MockedAvatarResource whenPUT record', data, headers);

                return [200, {}, {}];
            });  

            // GET for areas /api/parties/:party_id/record_type/:record_id/avatar? ...
            $httpBackend.whenGET(new RegExp(child.regEsc(child.fakeUrl + child.api + '/') + child.IdRegExp + child.regEsc('/areas/') + child.IdRegExp + child.regEsc('/avatar?'))).respond(function(method, url, data, headers) {
               console.log('MockedAvatarResource whenGET record', data, headers);

                 return [200, {}, {}];
            });

            // PUT for areas /api/parties/:party_id/record_type/:record_id/avatar?name= ...
            $httpBackend.whenPOST(new RegExp(child.regEsc(child.fakeUrl + child.api + '/') + child.IdRegExp + child.regEsc('/areas/') + child.IdRegExp + child.regEsc('/avatar?name='))).respond(function(method, url, data, headers) {
                console.log('MockedAvatarResource whenPUT record', data, headers);

                return [200, {}, {}];
            });   

            // DELETE for areas /api/parties/:party_id/record_type/:record_id/avatar
            $httpBackend.whenDELETE(new RegExp(child.regEsc(child.fakeUrl + child.api + '/') + child.IdRegExp + child.regEsc('/areas/') + child.IdRegExp + child.regEsc('/avatar') + child.EndStringRegExp)).respond(function(method, url, data, headers) {
                console.log('MockedAvatarResource whenPUT record', data, headers);

                return [200, {}, {}];
            });  

            // GET for party /api/parties/:party_id/avatar? ...
            $httpBackend.whenGET(new RegExp(child.regEsc(child.fakeUrl + child.api + '/') + child.IdRegExp + child.regEsc('/avatar?'))).respond(function(method, url, data, headers) {
               console.log('MockedAvatarResource whenGET party', data, headers);

                 return [200, {}, {}];
            });

            // GET for party /api/parties/:party_id/avatar? ...
            $httpBackend.expectGET(new RegExp(child.regEsc(child.fakeUrl + child.api + '/') + child.IdRegExp + child.regEsc('/avatar?'))).respond(function(method, url, data, headers) {
               console.log('MockedAvatarResource expectGET party', data, headers);

                 return [200, {}, {}];
            });

            // GET for party /api/parties/:party_id/avatar? ...
            $httpBackend.expect('GET', new RegExp(child.regEsc(child.fakeUrl + child.api + '/') + child.IdRegExp + child.regEsc('/avatar?'))).respond(function(method, url, data, headers) {
               console.log('MockedAvatarResource expect party', data, headers);

                 return [200, {}, {}];
            });

            // GET for party /api/parties/:party_id/avatar? ...
            $httpBackend.when('', new RegExp(child.regEsc(child.fakeUrl + child.api + '/') + child.IdRegExp + child.regEsc('/avatar?'))).respond(function(method, url, data, headers) {
               console.log('MockedAvatarResource when party', data, headers);

                 return [200, {}, {}];
            });

            // PUT for party /api/parties/:party_id/avatar?name= ...
            $httpBackend.whenPOST(new RegExp(child.regEsc(child.fakeUrl + child.api + '/') + child.IdRegExp + child.regEsc('/avatar?name='))).respond(function(method, url, data, headers) {
                console.log('MockedAvatarResource whenPUT party', data, headers);

                return [200, {}, {}];
            });   

            // DELETE for party /api/parties/:party_id/avatar
            $httpBackend.whenDELETE(new RegExp(child.regEsc(child.fakeUrl + child.api + '/') + child.IdRegExp + child.regEsc('/avatar') + child.EndStringRegExp)).respond(function(method, url, data, headers) {
                console.log('MockedAvatarResource whenPUT party', data, headers);

                return [200, {}, {}];
            });  
                   
        }

        return child;
    });

})();