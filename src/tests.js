/**
 * @file Registration of WebUI tests
 * @copyright Digital Living Software Corp. 2014-2015
 */

(function () {
    'use strict';

    var thisModule = angular.module('pipWebuiTests', [
        'pipMocked',
        'pipMocked.Users',
        'pipMocked.Entry',
        'pipMocked.Party',
        'pipMocked.Announcements',
        'pipMocked.Feedbacks',
        'pipMocked.Tips',
        'pipMocked.Guides',
        'pipMocked.ServersActivities',
        'pipMocked.ImageSet',
        'pipMocked.Images',
        'pipMocked.Avatar',

        'pipGenerators',
        'pipBasicGeneratorServices',        
        'pipGenerators.User',
        'pipGenerators.PartyAccess',   
        'pipGenerators.Sessions',    
        'pipGenerators.Party',
        'pipGenerators.Files',
        'pipGenerators.Avatars',
        
        'pipTestCollection',
        'pipTestDataSet',
        'pipTestDataService',

        // resources
        'pipMocked.ImageResources',
        'PipResources.Error',
        'pipImageResources'
    ]);


    thisModule.run(
        function(pipMockedResource, MockedUsersResource, MockedCurrentUserResource, TruePathResource, MockedSigninResource,
        MockedSignupResource, MockedSignoutResource, MockedSignupValidateResource, MockedVerifyEmailResource,
        MockedRecoverPasswordResource, MockedResetPasswordResource, MockedChangePasswordResource, MockedUserSessionsResource,
        MockedTipsResource, MockedAnnouncementsResource, MockedFeedbacksResource, MockedGuidesResource, MockedImageSetResource,
        MockedPartyResource, MockedServersActivitiesResource, MockedAvatarResource, MockedImagesResource) {

            pipMockedResource.addMocks(MockedUsersResource);
            pipMockedResource.addMocks(MockedCurrentUserResource);
            pipMockedResource.addMocks(MockedUserSessionsResource);

            // entry
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
            pipMockedResource.addMocks(MockedPartyResource);
            pipMockedResource.addMocks(MockedPartySettingsResource);
            pipMockedResource.addMocks(MockedServersActivitiesResource);
            
            // files and images
            pipMockedResource.addMocks(MockedImageSetResource);
            pipMockedResource.addMocks(MockedAvatarResource);
            pipMockedResource.addMocks(MockedImagesResource);

            pipMockedResource.addMocks(TruePathResource);
            
            pipMockedResource.registerStandardResources();

        }
    );

})();
