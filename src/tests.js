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

        'pipGenerators',
        'pipGenerators.User',
        'pipTestCollection'
    ]);


    thisModule.run(
        function(pipMockedResource, MockedResource, MockedUsersResource, TruePathResource) {

            pipMockedResource.addMocks(TruePathResource);
            pipMockedResource.addMocks(MockedUsersResource);

            pipMockedResource.registerStandardResources();

        }
    );

})();
