/**
 * @file pipTestDataService
 * @copyright Digital Living Software Corp. 2014-2016
 */

/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module('pipTestDataService', []);

    thisModule.factory('pipTestDataService', 
        function(pipTestDataSet, pipUserDataGenerator, pipPartyAccessDataGenerator, pipSessionsDataGenerator,
                 pipPartyDataGenerator, TestCollection, pipNodeDataGenerator,
                 pipEventDataGenerator, pipSettingsDataGenerator, pipFeedbackDataGenerator) {

            // Angular service that holds singleton test dataset that is shared across all
            var dataSet = new pipTestDataSet();

            return {
                
                getDataset: getDataset,
                createTestDataset: createTestDataset

            };

            // Get singleton dataset
            function getDataset() {

                return dataSet;

            }

            // Create test dataset
            function createTestDataset() {
                var i, users, parties = [], settings =[],
                    tcPartyAccess, tcSessions, tcUsers, tcParties, tcSettings, tcFeedback,
                    tcNodes, tcEvents, usersRefs = new Array(), eventsRefs = new Array();

                // create collection without references
                tcPartyAccess = new TestCollection(pipPartyAccessDataGenerator, 'PartyAccessTestCollection', 20);
                tcSessions = new TestCollection(pipSessionsDataGenerator, 'SessionsTestCollection', 20);
                // init collection
                tcPartyAccess.init();
                tcSessions.init();
                // add collection to dataset
                dataSet.add(tcPartyAccess);
                dataSet.add(tcSessions);
                // form references for users collection
                usersRefs['PartyAccess'] = tcPartyAccess.getAll();
                usersRefs['Sessions'] = tcSessions.getAll();

                // create users collection
                tcUsers = new TestCollection(pipUserDataGenerator, 'UsersTestCollection', 20, usersRefs);
                dataSet.add(tcUsers);

                // create feedback collection
                tcFeedback = new TestCollection(pipFeedbackDataGenerator, 'FeedbacksTestCollection', 20);
                dataSet.add(tcFeedback);

                // create collection without references
                tcNodes = new TestCollection(pipNodeDataGenerator, 'NodesTestCollection', 20);
                // init collection
                tcNodes.init();

                // add collection to dataset
                dataSet.add(tcNodes);

                // form references for users collection
                eventsRefs['Nodes'] = _.cloneDeep(tcNodes.getAll());

                // create events collection
                tcEvents = new TestCollection(pipEventDataGenerator, 'EventsTestCollection', 100, eventsRefs);
                dataSet.add(tcEvents);

                // init collection
                dataSet.init();

                users = dataSet.get('UsersTestCollection').getAll();
                // generate party and settings for each user
                for (i = 0; i < users.length; i ++) {
                    var party = pipPartyDataGenerator.initObject({
                        name: users[i].name,
                        email: users[i].email,
                        id: users[i].id,
                        updated: users[i].updated,
                        created: users[i].created
                    });
                    parties.push(party);
                    var setting = {
                        party_id: party.id,
                        creator_id: party.id
                    };
                    settings.push(setting);
                }

                tcParties = new TestCollection(pipPartyDataGenerator, 'PartiesTestCollection', parties.length);
                tcParties.init(parties);
                dataSet.add(tcParties);

                tcSettings = new TestCollection(pipSettingsDataGenerator, 'SettingsTestCollection', settings.length);
                tcSettings.init(settings);
                dataSet.add(tcSettings);

                return dataSet;
            }
        }
    );

})();