/**
 * @file Registration of WebUI tests
 * @copyright Digital Living Software Corp. 2014-2015
 */

(function () {
    'use strict';

    var thisModule = angular.module('pipWebuiTests', [
        'pipDataGenerator',
        'pipFakeDataModel',
        'pipMocked',
        'pipGenerators.User',
        'pipGenerators'
    ]);


    thisModule.run(
        function(pipMockedResource, MockedResource, MockedUsersResource, UnMockedResource) {

            pipMockedResource.addMocks(UnMockedResource);
            pipMockedResource.addMocks(MockedUsersResource);

            pipMockedResource.registerStandardResources();

        }
    );

})();
