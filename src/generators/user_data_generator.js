/**
 * @file pipUserDataGenerator
 * @copyright Digital Living Software Corp. 2014-2016
 */

(function () {
    'use strict';

    var thisModule = angular.module('pipGenerators.User', []);

    thisModule.factory('pipUserDataGenerator', function (pipDataGenerator, pipBasicGeneratorServices, $log, 
        pipPartyAccessDataGenerator, pipSessionsDataGenerator) {

            var refs = new Array();

            refs['PartyAccess'] = pipPartyAccessDataGenerator.newObjectList(10);
            refs['Sessions'] = pipSessionsDataGenerator.newObjectList(10);

            var child = new pipDataGenerator('User', refs);

            child.generateObj = function generateObj(refs) {
                var date1 = chance.timestamp(),
                    date2 = chance.timestamp(),
                    nowDate = new Date(),
                    user,
                    PartyAccess = [],
                    Sessions = [],
                    currentSession = pipSessionsDataGenerator.initObject({
                        last_req: nowDate.toJSON(),
                        opened: nowDate.toJSON(),
                    });

                if (refs && angular.isArray(refs)) {
                    PartyAccess = refs['PartyAccess'] || [];
                    Sessions = refs['Sessions'] || [];
                }

                    user = {
                        pwd_last_fail: null,
                        pwd_fail_count: 0,
                        name: pipBasicGeneratorServices.getName(),
                        email: chance.email(),
                        language: pipBasicGeneratorServices.getOne(['en', 'ru', 'fr']), 
                        paid: chance.bool({likelihood: 30}),
                        admin: false,
                        party_access: pipBasicGeneratorServices.getMany(PartyAccess),
                        sessions: pipBasicGeneratorServices.getMany(Sessions),
                        signin: date1 > date2 ? new Date(date1).toJSON() : new Date(date2).toJSON(),
                        signup: date1 > date2 ? new Date(date2).toJSON() : new Date(date1).toJSON(),
                        active: true,
                        lock: false,
                        email_ver: false,
                        id: pipBasicGeneratorServices.getObjectId(),
                        last_session_id: currentSession.id  
                    };

                    user.sessions.push(currentSession);

                return user;
            }

            return child;
    });

})();
 