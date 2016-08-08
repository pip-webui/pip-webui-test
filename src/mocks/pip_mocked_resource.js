/**
 * @file pipMocked
 * @copyright Digital Living Software Corp. 2014-2016
 */


/* API list

+ /api/users/current
+ /api/users/:id

+ /api/users/:party_id/sessions/:id

/api/parties/:id
/api/parties/:party_id/settings

/api/signup_validate
/api/verify_email
/api/users/:party_id/resend_email_verification
/api/change_password
/api/reset_password
/api/recover_password
/api/signup
/api/signout
/api/signin

/api/image_sets/:id
/api/images/search

images:
get serverurl + /api/parties/ + partyId + "/files/" + imageId
    serverUrl + '/api/parties/' + partyId + '/files

    
    // document
$upload.http({
url: addItemUrl(item),
headers: { 'Content-Type': file.type },
data: e.target.result
})    

serverUrl + '/api/parties/' + partyId + '/files?name='

$http['delete'](getItemIdUrl(item))

// image_sets
$http['post'](url)

$upload.http({
url: FILE_URL + '?name=' + file.name,
headers: { 'Content-Type': file.type },
data: e.target.result


/api/servers/activities/:id
/api/guides/:id
/api/tips/:id
/api/feedbacks/:id
/api/announcements/:id

})


avatar
get serverUrl + '/api/parties/' + partyId + '/' + entityTypes[type] + '/' + id + '/avatar
get serverUrl + '/api/parties/' + partyId + '/avatar

*/

(function () {
    'use strict';

    var thisModule = angular.module('pipMocked', ['ngMockE2E', 'ngResource']);

    thisModule.factory('pipMockedResource', function () {
        var mocks = [];


        return {
            addMocks: addMocks,
            registerStandardResources: registerStandardResources
        };

        function registerStandardResources() {
            for (var i = 0; i < mocks.length; i++) {
                var obj = mocks[i];
                obj.register();
            }
        }

        function registerSampleResources() {

        }

        function addMocks(extension) {
            if (extension && angular.isObject(extension)) {
                mocks.push(extension);
            }
        };

    });

    thisModule.factory('MockedResource', function ($httpBackend, $log, pipTestDataService, PipResourcesError) {

            this.api = '';
            this.fakeUrl = 'http://alpha.pipservices.net';
            this.dataset = pipTestDataService.getDataset();

            this.regEsc = function (str) {
                    //Escape string to be able to use it in a regular expression
                    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
            }

            this.IdRegExp = /[a-zA-Z0-9]{24}/.toString().slice(1, -1);
            this.QueryRegExp = /[\d\w-_\.%\s]*$/.toString().slice(1, -1);
            this.EndStringRegExp = /$/.toString().slice(1, -1);
            
            // search all id into url
            this.getUrlIdParams = function(url) {
                var i, result = url.match(/(\/[a-zA-Z0-9]{24})/g);

                for (i = 0; i < result.length; i++) {
                    result[i] = result[i].slice(1, 25);
                }
                
                return result;
            }

            this.getError = function (errorCode) {
                var error;

                error = PipResourcesError[errorCode];

                if (!error) {
                    error = {
                        StatusCode: 400,
                        StatusMessage: 'Not found',
                        request: {
                            code: '',
                            name: 'Not found',
                            message: ''
                        },
                        headers: {}
                    };
                }

                return error;
            }

            this.register = function() {}

        return this;
    });

    thisModule.factory('TruePathResource', function ($httpBackend, $log, MockedResource) {
            var child = Object.create(MockedResource);

            child.register = function() {
                $httpBackend.whenGET(/.*/).passThrough();           
            }
            return child;
    });

})();
 