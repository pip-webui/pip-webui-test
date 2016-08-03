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

             // Initializes object with default fields
            this.initObject = function (obj) {
                var result = this.newObject(this.refs);

                if (obj) {
                    result = _.assign(result, obj);
                }

                return result;
            }

            // Create a new random object
            this.newObject = function (refs) {
                var result = this.generateObj();

                return result;                
            }

            this.newObjectList = function (count, refs) {
                var i, obj, result = [];

                if (count > 0) {
                    for (i = 0; i < count; i++) {
                        obj = this.newObject(refs);
                        result.push(obj);
                    }
                }

                return result;                
            }

            // todo ??
            this.initObjectList = function (refs) {
                var result = [];

                return result;                
            }

            // todo ??
            this.updateObject = function (obj, refs) {
                var result;

                return result;                 
            }

            this.generateObj = function generateObj() {
                return {};
            }

        }

        return dataGenerator;

    });

})();
 