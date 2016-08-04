/**
 * @file pipSessionsDataGenerator
 * @copyright Digital Living Software Corp. 2014-2016
 */

(function () {
    'use strict';

    var thisModule = angular.module('pipGenerators.Sessions', []);

    thisModule.factory('pipSessionsDataGenerator', function (pipDataGenerator, pipBasicGeneratorServices, $log) {
            
            var child = new pipDataGenerator('Sessions', []);

            child.generateObj = function generateObj() {
                var date = new Date(chance.timestamp()),
                    session = {
                        address: chance.ip(),
                        client: pipBasicGeneratorServices.getOne(['chrome', 'mozilla', 'explorer']), // todo:  заменить на массивы из dataGenerators?
                        platform: pipBasicGeneratorServices.getOne(['windows 8', 'windows 7', 'linux']),
                        last_req: date.toJSON(),
                        opened: date.toJSON(),
                        id: pipBasicGeneratorServices.getObjectId()
                    };

                return session;
            }

            return child;
    });

})();