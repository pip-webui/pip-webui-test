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

/api/servers/activities/:id

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
})


avatar
get serverUrl + '/api/parties/' + partyId + '/' + entityTypes[type] + '/' + id + '/avatar
get serverUrl + '/api/parties/' + partyId + '/avatar

*/


(function () {
    'use strict';

    angular.module('pipMocks', [
        'pipMocks.Files',
        'pipMocks.Settings',
        'pipMocks.Entry',
        'pipMocks.Users'        
    ]);

})();
