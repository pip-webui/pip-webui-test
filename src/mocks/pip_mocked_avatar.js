/**
 * @file MockedAvatarResource
 * @copyright Digital Living Software Corp. 2014-2016
 * 
 * Mocked:
 * get/delete: serverUrl + '/api/parties/' + partyId + '/' + entityTypes[type] + '/' + id + '/avatar
 *              serverUrl + '/api/parties/' + partyId + '/' + entityTypes[type] + '/' + id + '/avatar
 * upload: serverUrl + '/api/parties/' + partyId + '/files?name='
 */

// exemple
// get: 
//      http://alpha.pipservices.net/api/parties/565f12ef8ff2161b1dfeedbf/goals/57891f214997deb8138fe233/avatar?default_template=goal&bg=rgba(0,188,212,1)&fg=white&timestamp=1470388249000&obj_id=57891f214997deb8138fe233
//      http://alpha.pipservices.net/api/parties/565f12ef8ff2161b1dfeedbf/avatar?default_template=area&bg=rgba(236,64,122,1)&fg=white&timestamp=1470391804000&obj_id=578501864997deb8138fd78d
//      http://alpha.pipservices.net/api/parties/565f12ef8ff2161b1dfeedbf/goals/5788cf214997deb8138fe020/avatar?default_template=goal&bg=rgba(236,64,122,1)&fg=white&timestamp=1470388248000&obj_id=5788cf214997deb8138fe020
// post 
//      http://alpha.pipservices.net/api/parties/565f12ef8ff2161b1dfeedbf/goals/56cde0d1b0c1dcf82cf50cb6/avatar?name=cat4.jpg
//      http://alpha.pipservices.net/api/parties/565f12ef8ff2161b1dfeedbf/avatar?name=2017-Hyundai-Elantra-1-e1454492227615.jpg
// delete 
//      http://alpha.pipservices.net/api/parties/565f12ef8ff2161b1dfeedbf/goals/56cde0d1b0c1dcf82cf50cb6/avatar
//      http://alpha.pipservices.net/api/parties/565f12ef8ff2161b1dfeedbf/avatar

// respond to post
// {
//   "id": "56cde0d1b0c1dcf82cf50cb6",
//   "name": "cat4.jpg",
//   "content_type": "image/jpeg",
//   "length": 36916,
//   "creator_id": "565f12ef8ff2161b1dfeedbf",
//   "created": "2016-08-05T09:22:59.141Z",
//   "refs": [
//     {
//       "ref_type": "goal",
//       "ref_id": "56cde0d1b0c1dcf82cf50cb6"
//     }
//   ],
//   "url": "https://s3-us-west-1.amazonaws.com/alpha-uploads.piplife.com/56cde0d1b0c1dcf82cf50cb6/cat4.jpg"
// }

(function () {
    'use strict';

    var thisModule = angular.module('pipMocked.Avatar', ['ngMockE2E', 'ngResource']);

    thisModule.factory('MockedAvatarResource', function ($httpBackend, $log, MockedResource) {
        var child = Object.create(MockedResource);

        child.api = '/api/parties';

        child.register = function() {

            var recordType = ['areas', 'goals'];
           
            // GET for record /api/parties/:party_id/record_type/:record_id/avatar? ...
            $httpBackend.whenGET(new RegExp(child.regEsc(child.fakeUrl + child.api + '/') + child.IdRegExp + child.regExpSet(recordType, true, true) + child.IdRegExp + child.regEsc('/avatar?'))).respond(function(method, url, data, headers) {
               console.log('MockedAvatarResource whenGET record', data, headers);

                 return [200, {}, {}];
            });

            // PUT for record /api/parties/:party_id/record_type/:record_id/avatar?name= ...
            $httpBackend.whenPOST(new RegExp(child.regEsc(child.fakeUrl + child.api + '/') + child.IdRegExp + child.regExpSet(recordType, true, true) + child.IdRegExp + child.regEsc('/avatar?name='))).respond(function(method, url, data, headers) {
                console.log('MockedAvatarResource whenPUT record', data, headers);

                return [200, {}, {}];
            });   

            // DELETE for record /api/parties/:party_id/record_type/:record_id/avatar
            $httpBackend.whenDELETE(new RegExp(child.regEsc(child.fakeUrl + child.api + '/') + child.IdRegExp + child.regExpSet(recordType, true, true) + child.IdRegExp + child.regEsc('/avatar') + child.EndStringRegExp)).respond(function(method, url, data, headers) {
                console.log('MockedAvatarResource whenPUT record', data, headers);

                return [200, {}, {}];
            });  

            // GET for party /api/parties/:party_id/avatar? ...
            $httpBackend.whenGET(new RegExp(child.regEsc(child.fakeUrl + child.api + '/') + child.IdRegExp + child.regEsc('/avatar?'))).respond(function(method, url, data, headers) {
               console.log('MockedAvatarResource whenGET party', data, headers);

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