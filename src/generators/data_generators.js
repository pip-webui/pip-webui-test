/**
 * @file pipDataGenerators
 * @copyright Digital Living Software Corp. 2014-2016
 */

(function () {
    'use strict';

    var thisModule = angular.module('pipGenerators', []);

    thisModule.factory('pipDataGenerator', function ($log) {

        var dataGenerator = function(name, refs) {

            // Collection name
            this.name = name;
            // List of references collection names
            this.refs = refs; // string?    

            this.initObject = initObject;
            this.newObject = newObject;
            this.newObjectList = newObjectList;
            this.initObjectList = initObjectList;
            this.updateObject = updateObject;
        }

             // Initializes object with default fields
            function initObject(obj) {
                var result;

                return result;
            }

            // Create a new random object
            function newObject(refs) {
                var result;

                return result;                
            }

            function newObjectList(count, refs) {
                var result = [];

                return result;                
            }

            function initObjectList(obj) {
                var result = [];

                return result;                
            }

            function updateObject(index, obj, refs) {
                var result;

                return result;                 
            }

        return dataGenerator;

    });

})();
 