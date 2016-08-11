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

        child.api = '/api/parties';

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
                    console.log('MockedPartyResource whenGET [party]', method, url, data, headers, params);
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

                    party = parties.findById(partyId);
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

                    if (!partyData || !partyData['id']) {
                        console.log('post party', partyData);
                        throw new Error('MockedPartyResource: party id is not specified')
                    }

                    if (!parties) {
                        throw new Error('MockedPartyResource: Parties collection is not found')
                    }

                    partiesCollection = parties.getAll();
                    party = _.find(partiesCollection, function (item) {
                        return  item.id == partyData.id;
                    });

                    if (party && party.id) {
                        var error = child.getError('1104'); //todo error code

                        return [error.StatusCode, error.request, error.headers];
                    }

                    // add party to collection
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

    thisModule.factory('MockedPartySettingsResource', function ($httpBackend, $log, MockedResource) {
        var child = Object.create(MockedResource);

        child.api = '/api/parties';

        child.register = function() {

            // GET /api/parties/:party_id/settings
            $httpBackend.whenGET(new RegExp(child.regEsc(child.fakeUrl + child.api + '/') + child.IdRegExp + child.regEsc('/settings') + child.EndStringRegExp))
                .respond(function(method, url, data, headers, params) {
                console.log('MockedPartySettingsResource whenGET collection', method, url, data, headers, params);
                var settings = child.dataset.get('SettingsTestCollection'),
                    SettingsCollection, idParams, partyId,
                    setting;
                  
                    if (!settings) {
                        throw new Error('MockedPartySettingsResource: Settings collection is not found')
                    }
                    
                    idParams = child.getUrlIdParams(url);

                    if (!idParams || idParams.length == 0) {
                        throw new Error('MockedPartyResource: party_id is not specified into url')
                    }

                    partyId = idParams[0];

                    SettingsCollection = settings.getAll();
                    setting = _.find(SettingsCollection, function (item) {
                        return item.party_id == partyId;
                    });

                    if (!setting || !setting.party_id) {
                        return [200, {}, {}];   
                    }

                    return [200, setting, {}];                    
                });

            // POST /api/parties/:party_id/settings
            $httpBackend.whenPOST(new RegExp(child.regEsc(child.fakeUrl + child.api + '/') + child.IdRegExp + child.regEsc('/settings') + child.EndStringRegExp))
                .respond(function(method, url, data, headers, params) {
                    console.log('MockedPartySettingsResource whenPOST', method, url, data, headers, params);
                    var setting, match = false,
                        settingsData = angular.fromJson(data) || {},
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

                    if (setting && setting.party_id) {
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