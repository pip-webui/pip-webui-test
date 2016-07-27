/**
 * @file Mocks for REST API
 * @copyright Digital Living Software Corp. 2014-2016
 */

/* API list

/api/users/current
/api/users/:id
/api/users/:party_id/sessions/:id
/api/parties/:id


/api/parties/:party_id/settings

/api/image_sets/:id
/api/images/search

/api/guides/:id
/api/tips/:id
/api/feedbacks/:id
/api/announcements/:id

/api/signup_validate
/api/verify_email
/api/users/:party_id/resend_email_verification
/api/change_password
/api/reset_password
/api/recover_password
/api/signup
/api/signout
/api/signin
*/


(function () {
    'use strict';

    angular.module('pipMocks', [
        'pipMocks.Users',
        'pipMocks.Files',
        'pipMocks.Settings',
        'pipMocks.Entry'
    ]);

})();
