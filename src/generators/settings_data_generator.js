/**
 * @file pipSettingsDataGenerator
 * @copyright Digital Living Software Corp. 2014-2016
 */

(function () {
    'use strict';

    var thisModule = angular.module('pipGenerators.Settings', []);

    thisModule.factory('pipSettingsDataGenerator', function (pipDataGenerator, pipBasicGeneratorServices, $log) {

            var child = new pipDataGenerator('Settings', []);

            child.generateObj = function generateObj() {
                var id = pipBasicGeneratorServices.getObjectId(),
                    date = chance.timestamp(),
                    setting = {
                        settings: {
                            party_id: id,
                            creator_id: id,
                            goals: {},
                            areas: {},
                            intro: {}
                        },
                        updated: new Date(date).toJSON()
                    };

                return setting;
            }

            return child;
    });

})();
 