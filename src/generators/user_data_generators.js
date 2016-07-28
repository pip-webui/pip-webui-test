/**
 * @file pipUserDataGenerators
 * @copyright Digital Living Software Corp. 2014-2016
 */

(function () {
    'use strict';

    var thisModule = angular.module('pipGenerators.User', []);

    thisModule.factory('pipUserDataGenerator', function (pipDataGenerator, $log) {
            // var child = Object.create(pipDataGenerator);
            var child = new pipDataGenerator('User', 'User refs');

            child.someproperty = true;

            return child;
    });

})();
 