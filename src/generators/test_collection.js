/**
 * @file pipTestCollection
 * @copyright Digital Living Software Corp. 2014-2016
 */

(function () {
    'use strict';

    var thisModule = angular.module('pipTestCollection', []);

    // Collection of test data stored in test dataset
    thisModule.factory('pipTestCollection', function ($log) {

        var testCollection = function(generator) { // generator: pipDataGenerator
            this.constructor(generator);

        }

    // Initializes collection with init object list
    // public init(): void;
    // public getAll(): any[];
    // public get(index: number): any[];
    // public findById(id: string): any;
    // public create(obj: any): any;
    // public update(id: string, obj: any): any;
    // public delete(id: string): any;

        return testCollection;

    });

})();