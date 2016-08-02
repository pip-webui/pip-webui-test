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
        'pipMocked.Users',
        'pipMocked.Entry',

        'pipGenerators',
        'pipGenerators.User',
        'pipTestCollection'
    ]);


    thisModule.run(
        function(pipMockedResource, MockedUsersResource, MockedCurrentUserResource, TruePathResource, MockedSigninResource,
        MockedSignupResource, MockedSignoutResource, MockedSignupValidateResource, MockedVerifyEmailResource,
        MockedRecoverPasswordResource, MockedResetPasswordResource, MockedChangePasswordResource) {


            pipMockedResource.addMocks(MockedUsersResource);
            pipMockedResource.addMocks(MockedCurrentUserResource);

            pipMockedResource.addMocks(MockedSigninResource);
            pipMockedResource.addMocks(MockedSignupResource);
            pipMockedResource.addMocks(MockedSignoutResource);
            pipMockedResource.addMocks(MockedSignupValidateResource);
            pipMockedResource.addMocks(MockedVerifyEmailResource);
            pipMockedResource.addMocks(MockedRecoverPasswordResource);
            pipMockedResource.addMocks(MockedResetPasswordResource);
            pipMockedResource.addMocks(MockedChangePasswordResource);

            pipMockedResource.addMocks(TruePathResource);
            pipMockedResource.registerStandardResources();

        }
    );

})();
