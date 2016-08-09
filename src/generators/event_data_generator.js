/**
 * @file pipEventDataGenerator
 * @copyright Digital Living Software Corp. 2014-2016
 */

(function () {
    'use strict';

    var thisModule = angular.module('pipGenerators.Event', []);

    thisModule.factory('pipEventDataGenerator', function (pipDataGenerator, pipBasicGeneratorServices, $log) {

            var child = new pipDataGenerator('Nodes', []);

            child.generateObj = function generateObj() {
                var event = {

                    };

                return node;
            }

            return child;
    });

})();