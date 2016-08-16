/**
 * @file MockedImagesResource
 * @copyright Digital Living Software Corp. 2014-2016
 */

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

                    var file = child.dataset.get('FilesTestCollection').getByIndex(0);
                    return [200, file, {}];
                });

            // GET image /api/parties/:party_id/files/:image_id/content
            $httpBackend.whenGET(new RegExp(child.regEsc(child.fakeUrl + child.api + '/') + child.IdRegExp + child.regEsc('/files/') + child.IdRegExp + child.regEsc('/content') + child.EndStringRegExp))
                .respond(function(method, url, data, headers) {
                    
                    var idParams = child.getUrlIdParams(url);

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