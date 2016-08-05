/**
 * @file MockedImagesResource
 * @copyright Digital Living Software Corp. 2014-2016
 * 
 * Mocked:
 * get/delete: serverurl + /api/parties/ + partyId + '/files/' + imageId + '/content'
 * upload: serverUrl + '/api/parties/' + partyId + '/files?name='
 */

// example  
// get image src     http://alpha.pipservices.net/api/parties/565f12ef8ff2161b1dfeedbf/files/578ddc6b4997deb8138fe5ac/content
// get image object  http://alpha.pipservices.net/api/parties/565f12ef8ff2161b1dfeedbf/files/578ddc6b4997deb8138fe5ac
// post image        http://alpha.pipservices.net/api/parties/565f12ef8ff2161b1dfeedbf/files?name=Screenshot_2.png
// delete image      http://alpha.pipservices.net/api/parties/565f12ef8ff2161b1dfeedbf/files/578ddd944997deb8138fe5d3

// response to post or get (serverurl + /api/parties/ + partyId + '/files/' + imageId)
// {
//   "id": "57a459fbf6dd4d642c1daf23",
//   "name": "Screenshot_2.png",
//   "content_type": "image/png",
//   "length": 78848,
//   "party_id": "565f12ef8ff2161b1dfeedbf",
//   "creator_id": "565f12ef8ff2161b1dfeedbf",
//   "created": "2016-08-05T09:18:52.304Z",
//   "refs": [],
//   "url": "https://s3-us-west-1.amazonaws.com/alpha-uploads.piplife.com/57a459fbf6dd4d642c1daf23/Screenshot_2.png"
// }


(function () {
    'use strict';

    var thisModule = angular.module('pipMocked.Images', ['ngMockE2E', 'ngResource']);

    thisModule.factory('MockedImagesResource', function ($httpBackend, $log, MockedResource) {
        var child = Object.create(MockedResource);

        child.api = '/api/parties';

        child.register = function() {

            // GET object /api/parties/:party_id/files/:image_id
            $httpBackend.whenGET(new RegExp(child.regEsc(child.fakeUrl + child.api + '/') + child.IdRegExp + child.regEsc('/files/') + child.IdRegExp + child.EndStringRegExp))
                .respond(function(method, url, data, headers) {
                    console.log('MockedImagesResource whenGET object', data, headers);

                    var file = child.dataset.get('FilesTestCollection').getByIndex(0);
                    return [200, file, {}];
                });

            // GET image /api/parties/:party_id/files/:image_id/content
            $httpBackend.whenGET(new RegExp(child.regEsc(child.fakeUrl + child.api + '/') + child.IdRegExp + child.regEsc('/files/') + child.IdRegExp + child.regEsc('/content') + child.EndStringRegExp))
                .respond(function(method, url, data, headers) {
                console.log('MockedImagesResource whenGET image', data, headers);
                    
                    var idParams = child.getUrlIdParams(url);

                    console.log('MockedImagesResource GET image url', url);
                    console.log('MockedImagesResource GET image idParams', idParams);

                    var file = child.dataset.get('FilesTestCollection').getByIndex(0) || {};
                    return [200, file.url, {}];
                });

            // PUT /api/parties/:party_id/files?name=
            $httpBackend.whenPOST(new RegExp(child.regEsc(child.fakeUrl + child.api + '/') + child.IdRegExp + child.regEsc('/files?name='))).respond(function(method, url, data, headers) {
                console.log('MockedImagesResource whenPUT', data, headers);

                return [200, {}, {}];
            });   

            // DELETE  /api/parties/:party_id/files/:image_id
            $httpBackend.whenDELETE(new RegExp(child.regEsc(child.fakeUrl + child.api + '/') + child.IdRegExp + child.regEsc('/files/') + child.IdRegExp + child.EndStringRegExp)).respond(function(method, url, data, headers) {
                console.log('MockedImagesResource whenPUT', data, headers);

                return [200, {}, {}];
            });     
                   
        }

        return child;
    });

})();