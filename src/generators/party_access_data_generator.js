/**
 * @file pipPartyAccessDataGenerator
 * @copyright Digital Living Software Corp. 2014-2016
 */

(function () {
    'use strict';

    var thisModule = angular.module('pipGenerators.PartyAccess', []);

    thisModule.factory('pipPartyAccessDataGenerator', function (pipDataGenerator, pipBasicGeneratorServices, $log) {
            var child = new pipDataGenerator('PartyAccess', []);

            child.isContributorChance = 30;
            child.isManagerChance = 30;
            child.defaultShareLevel = 0;
            child.defaultType = 'partner';

            child.generateObj = function generateObj() {
                var obj = {
                        share_level: child.defaultShareLevel,
                        type: child.defaultType,
                        party_name: chance.first() + ' ' + chance.name(),
                        party_id: pipBasicGeneratorServices.getObjectId(),
                        contributor: chance.bool({likelihood: child.isContributorChance}),
                        manager: isContributor ? chance.bool({likelihood: child.isManagerChance}) : false,
                        id: pipBasicGeneratorServices.getObjectId()
                    };

                return obj;
            }

            return child;
    });

})();