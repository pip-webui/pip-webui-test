/**
 * @file pipNodeDataGenerator
 * @copyright Digital Living Software Corp. 2014-2016
 */

(function () {
    'use strict';

    var thisModule = angular.module('pipGenerators.Node', []);

    thisModule.factory('pipNodeDataGenerator', function (pipDataGenerator, pipBasicGeneratorServices, $log) {

            var child = new pipDataGenerator('Nodes', []);

            child.generateObj = function generateObj() {
                var node = {

                    };

                return node;
            }

            return child;
    });

})();