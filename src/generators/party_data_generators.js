/**
 * @file pipPartyDataGenerator
 * @copyright Digital Living Software Corp. 2014-2016
 */

(function () {
    'use strict';

    var thisModule = angular.module('pipGenerators.Party', []);

    thisModule.factory('pipPartyDataGenerator', function (pipDataGenerator, pipBasicGeneratorServices, $log) {

            var child = new pipDataGenerator('Parties', []);

            child.defaultType = 'person';
            child.defaultJoin = 'approve';

            child.generateObj = function generateObj() {
                var date1 = chance.timestamp(),
                    date2 = chance.timestamp(),
                    party = {
                        name: chance.first() + ' ' + chance.name(),
                        email: chance.email(),
                        type: child.defaultType,
                        gender: chance.gender().toLowerCase(),
                        loc_name: chance.address(),
                        loc_pos: {
                            type: 'Point',
                            coordinates: [
                                chance.floating({min: 32, max: 40}),
                                chance.floating({min: -110, max: -90})
                            ]
                        },
                        join: child.defaultJoin,
                        updated: date1 > date2 ? new Date(date1).toJSON() : new Date(date2).toJSON(),
                        created: date1 > date2 ? new Date(date2).toJSON() : new Date(date1).toJSON(),
                        id: pipBasicGeneratorServices.getObjectId()
                    };

                return party;
            }

            return child;
    });

})();
 