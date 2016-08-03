/**
 * @file pipUserDataGenerator
 * @copyright Digital Living Software Corp. 2014-2016
 */

(function () {
    'use strict';

    var thisModule = angular.module('pipGenerators.User', []);

    thisModule.factory('pipUserDataGenerator', function (pipDataGenerator, pipBasicGeneratorServices, $log) {
            // var child = Object.create(pipDataGenerator);
            var child = new pipDataGenerator('User', ['PartyAccess', 'Sessions']);

            child.generateObj = function generateObj() {
                var date1 = chance.timestamp(),
                    date2 = chance.timestamp(),

                    user = {
                        pwd_last_fail: null,
                        pwd_fail_count: 0,
                        name: pipBasicGeneratorServices.getName(),
                        email: chance.email(),
                        language: pipBasicGeneratorServices.getOne(['en', 'ru', 'fr']), 
                        paid: chance.bool({likelihood: 30}),
                        admin: false,
                        //party_access: getPartyAccess(),  - refs  | pipBasicGeneratorServices.getMany(PartyAccess)
                        //sessions: getSession(), - refs  | pipBasicGeneratorServices.getMany(Session)
                        signin: date1 > date2 ? new Date(date1).toJSON() : new Date(date2).toJSON(),
                        signup: date1 > date2 ? new Date(date2).toJSON() : new Date(date1).toJSON(),
                        active: true,
                        lock: false,
                        email_ver: false,
                        id: pipBasicGeneratorServices.getObjectId(),
                        last_session_id: pipBasicGeneratorServices.getObjectId()  //?? сессия должна существовать?
                    };

                return user;
            }

            return child;
    });

})();
 