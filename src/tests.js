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
        'pipMocked.Party',
        'pipMocked.Announcements',
        'pipMocked.Feedbacks',
        'pipMocked.Tips',
        'pipMocked.Guides',
        'pipMocked.ServersActivities',
        'pipMocked.Images',

        'pipGenerators',
        'pipGenerators.User',
        'pipTestCollection'
    ]);


    thisModule.run(
        function(pipMockedResource, MockedUsersResource, MockedCurrentUserResource, TruePathResource, MockedSigninResource,
        MockedSignupResource, MockedSignoutResource, MockedSignupValidateResource, MockedVerifyEmailResource,
        MockedRecoverPasswordResource, MockedResetPasswordResource, MockedChangePasswordResource, MockedUserSessionsResource,
        MockedTipsResource, MockedAnnouncementsResource, MockedFeedbacksResource, MockedGuidesResource, MockedImagesResource,
        MockedPartyResource, MockedServersActivitiesResource) {

            pipMockedResource.addMocks(MockedUsersResource);
            pipMockedResource.addMocks(MockedCurrentUserResource);

            pipMockedResource.addMocks(MockedUserSessionsResource);

            pipMockedResource.addMocks(MockedSigninResource);
            pipMockedResource.addMocks(MockedSignupResource);
            pipMockedResource.addMocks(MockedSignoutResource);
            pipMockedResource.addMocks(MockedSignupValidateResource);
            pipMockedResource.addMocks(MockedVerifyEmailResource);
            pipMockedResource.addMocks(MockedRecoverPasswordResource);
            pipMockedResource.addMocks(MockedResetPasswordResource);
            pipMockedResource.addMocks(MockedChangePasswordResource);

            // ----------------
            pipMockedResource.addMocks(MockedTipsResource);
            pipMockedResource.addMocks(MockedAnnouncementsResource);
            pipMockedResource.addMocks(MockedFeedbacksResource);
            pipMockedResource.addMocks(MockedGuidesResource);
            pipMockedResource.addMocks(MockedImagesResource);
            pipMockedResource.addMocks(MockedPartyResource);
            pipMockedResource.addMocks(MockedServersActivitiesResource);
            
            pipMockedResource.addMocks(TruePathResource);
            pipMockedResource.registerStandardResources();

        }
    );

})();
