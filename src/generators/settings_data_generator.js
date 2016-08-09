/**
 * @file pipSettingsDataGenerator
 * @copyright Digital Living Software Corp. 2014-2016
 */

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

(function () {
    'use strict';

    var thisModule = angular.module('pipGenerators.Settings', []);

    thisModule.factory('pipSettingsDataGenerator', function (pipDataGenerator, pipBasicGeneratorServices, $log) {

            var child = new pipDataGenerator('Settings', []);

            child.generateObj = function generateObj() {
                var id = pipBasicGeneratorServices.getObjectId();
                    setting = {
                        party_id: id,
                        creator_id: id
                    };

                return party;
            }

            return child;
    });

})();
 