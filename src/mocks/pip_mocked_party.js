/**
 * @file MockedPartyResource
 * @copyright Digital Living Software Corp. 2014-2016
 * 
 * Mocked:
 * /api/parties/:id
 * /api/parties/:party_id/settings
 * 
 */

(function () {
    'use strict';

    var thisModule = angular.module('pipMocked.Party', ['ngMockE2E', 'ngResource']);

    thisModule.factory('MockedPartyResource', function ($httpBackend, $log, MockedResource) {
        var child = Object.create(MockedResource);

        child.api = '/api/parties/';

        child.register = function() {

            // GET /api/parties
            $httpBackend.whenGET(child.fakeUrl + child.api)
                .respond(function(method, url, data, headers, params) {
                console.log('MockedPartyResource whenGET collection', method, url, data, headers, params);
                var parties = child.dataset.get('PartiesTestCollection'),
                    partiesCollection;
                  
                    if (!parties) {
                        throw new Error('MockedPartyResource: Parties collection is not found')
                    }

                    partiesCollection = parties.getAll();

                    return [200, partiesCollection, {}];                    
                });

            // GET /api/parties/:id
            $httpBackend.whenGET(new RegExp(child.regEsc(child.fakeUrl + child.api + '/') + child.IdRegExp + child.EndStringRegExp))
                .respond(function(method, url, data, headers, params) {
                    console.log('MockedPartyResource whenGET user', method, url, data, headers, params);
                    var party, 
                        idParams,
                        partyId,
                        parties = child.dataset.get('PartiesTestCollection');

                    idParams = child.getUrlIdParams(url);

                    if (!idParams || idParams.length == 0) {
                        throw new Error('MockedPartyResource: party_id is not specified into url')
                    }

                    partyId = idParams[0];
                    if (!parties) {
                        throw new Error('MockedPartyResource: Parties collection is not found')
                    }

                    party = parties.findById(userId);
                    console.log('MockedPartyResource whenGET party', party);
                    
                    return [200, party, {}];
                });

            // POST /api/parties
            $httpBackend.whenPOST(child.fakeUrl + child.api)
                .respond(function(method, url, data, headers, params) {
                    console.log('MockedPartyResource whenPOST', method, url, data, headers, params);
                    var party, 
                        partyData = angular.fromJson(data),
                        parties = child.dataset.get('PartiesTestCollection'),
                        partiesCollection;

                    if (!partyData || !partyData['email']) {
                        console.log('post user', partyData);
                        throw new Error('MockedPartyResource: user email is not specified')
                    }

                    if (!parties) {
                        throw new Error('MockedPartyResource: Parties collection is not found')
                    }

                    partiesCollection = parties.getAll();
                    party = _.find(partiesCollection, function (item) {
                        return  item.email == partyData.email;
                    });

                    if (party && party.id) {
                        var error = child.getError('1104'); //todo error code

                        return [error.StatusCode, error.request, error.headers];
                    }

                    // add user to collection
                    party = parties.create(partyData);

                    return [200, party, {}];
                }); 

            // PUT /api/parties/:id
            $httpBackend.whenPUT(new RegExp(child.regEsc(child.fakeUrl + child.api + '/') + child.IdRegExp + child.EndStringRegExp))
                .respond(function(method, url, data, headers, params) {
                    console.log('MockedPartyResource whenPUT', method, url, data, headers, params);
                    var party, 
                        partyData = angular.fromJson(data),
                        idParams,
                        partyId,
                        parties = child.dataset.get('PartiesTestCollection');

                    idParams = child.getUrlIdParams(url);

                    if (!idParams || idParams.length == 0) {
                        throw new Error('MockedPartyResource: party_id is not specified into url')
                    }

                    partyId = idParams[0];
                    if (!parties) {
                        throw new Error('MockedPartyResource: Parties collection is not found')
                    }

                    party = parties.findById(partyId);
                    party = parties.update(partyId, partyData);
                    console.log('MockedPartyResource whenPUT party', party);
                    
                    return [200, party, {}];
                });   

            // DELETE /api/parties/:id
            $httpBackend.whenDELETE(new RegExp(child.regEsc(child.fakeUrl + child.api + '/') + child.IdRegExp + child.EndStringRegExp))
                .respond(function(method, url, data, headers, params) {
                    console.log('MockedPartyResource whenDELETE', method, url, data, headers, params);
                    var user, 
                        partyData = angular.fromJson(data),
                        idParams,
                        partyId,
                        party = child.dataset.get('PartiesTestCollection');

                    idParams = child.getUrlIdParams(url);

                    if (!idParams || idParams.length == 0) {
                        throw new Error('MockedPartyResource: party_id is not specified into url')
                    }

                    partyId = idParams[0];
                    if (!parties) {
                        throw new Error('MockedPartyResource: Parties collection is not found')
                    }

                    party = parties.findById(partyId);
                    if (!party || !party.id) {
                        var error = child.getError('1106');

                        return [error.StatusCode, error.request, error.headers];
                    }

                    console.log('MockedPartyResource whenDELETE party', party);
                    parties.deleteById(party.id);
                    console.log('parties collection', parties.getAll());

                    return [200, "OK", {}];
                });                       
        }
                   
        return child;
    });

// expected 
// {
//     "party_id": "565f12ef8ff2161b1dfeedbf"
//     "creator_id": "565f12ef8ff2161b1dfeedbf"
//     "notes": {
//                 "viewType": "tiles"
//                 "tips": "2016-08-01T09:30:46.726Z"
//             }-
//     "visions": {
//                     "viewType": "tiles"
//                 }-
//     "areas": {
//                 "navId": "all"
//                 "tips": "2016-08-05T09:28:04.324Z"
//             }-
   
// }

    thisModule.factory('MockedPartySettingsResource', function ($httpBackend, $log, MockedResource) {
        var child = Object.create(MockedResource);

        child.api = '/api/parties/';

        child.register = function() {


            // GET /api/parties/:party_id/settings
            $httpBackend.whenGET(child.fakeUrl + child.api)
                .respond(function(method, url, data, headers, params) {
                console.log('MockedPartySettingsResource whenGET collection', method, url, data, headers, params);
                var settings = child.dataset.get('SettingsTestCollection'),
                    SettingsCollection;
                  
                    if (!settings) {
                        throw new Error('MockedPartySettingsResource: Settings collection is not found')
                    }

                    SettingsCollection = settings.getAll();

                    return [200, SettingsCollection, {}];                    
                });

            // POST /api/parties/:party_id/settings
            $httpBackend.whenPOST(child.fakeUrl + child.api)
                .respond(function(method, url, data, headers, params) {
                    console.log('MockedPartySettingsResource whenPOST', method, url, data, headers, params);
                    var setting, match = false,
                        settingsData = angular.fromJson(data),
                        settings = child.dataset.get('SettingsTestCollection'),
                        SettingsCollection;

                    if (!settingsData || !settingsData['party_id']) {
                        console.log('post settings', settingsData);
                        throw new Error('MockedPartySettingsResource: Settings party_id is not specified')
                    }

                    if (!settings) {
                        throw new Error('MockedPartySettingsResource: Settings collection is not found')
                    }

                    SettingsCollection = settings.getAll();
                    setting = _.find(SettingsCollection, function (item) {
                        return item.party_id == settingsData.party_id;
                    });

                    if (setting && settings.party_id) {
                         match = true;
                    }

                    // add setting to collection
                    if (match) {
                        setting = settings.update(setting.party_id, settingsData, 'party_id');
                    } else {
                        setting = settings.create(settingsData);
                    }

                    return [200, setting, {}];
                }); 
                   
        }

        return child;
    });

})();