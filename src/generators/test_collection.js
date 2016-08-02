/**
 * @file pipTestCollection
 * @copyright Digital Living Software Corp. 2014-2016
 */

(function () {
    'use strict';

    var thisModule = angular.module('pipTestCollection', []);

// todo: current user
    thisModule.factory('pipTestCollection', function ($log) {

        var testCollection = function(generator) { // generator: pipDataGenerator
            this.constructor(generator);

        }


        return testCollection;

    });

})();