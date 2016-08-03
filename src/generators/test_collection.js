/**
 * @file pipTestCollection
 * @copyright Digital Living Software Corp. 2014-2016
 */

(function () {
    'use strict';

    var thisModule = angular.module('pipTestCollection', []);

    // Collection of test data stored in test dataset
    thisModule.factory('TestCollection', function ($log) {

        // Define the constructor function.
        function TestCollection(generator, size) {
            this.generator = generator;
            this.size = size ? size : 0;
            this.collection = [];
        }

        TestCollection.prototype = {
            getGeneratorName: function() {
                return this.generator.name;
            },

            getSize: function() {
                return this.size;
            }            
        };

        // public init(): void;   //todo:  init(collection: any[]): void; ??
        TestCollection.init = function (collection) {
            if (this.size === 0) { 
                this.collection = [];

                return
            }

            this.collection = generator.newObjectList(this.size);
        }
    
        // public getAll(): any[];
        TestCollection.getAll = function () {
            return _.cloneDeep(this.collection);
        }     

        // public get(index: number): any[];
        TestCollection.get = function (index) {
            var result = null;

            if (!index || index < 0 || index > this.collection.length - 1) {
                return result;
            }

            result = _.cloneDeep(this.collection[index]);

            return result;
        }    

        // public findById(id: string): any;
        TestCollection.findById = function (id, field) {
            var result = null,
                fieldId = field ? field : 'id';

            if (!id) {
                return result;
            }

            result = _.find(this.collection, {'id': id}); // todo: replace to fieldId

            return result || null;
        }    

        // public create(obj: any): any;
        TestCollection.create = function (obj) {
            //var result = 
        }    

        // public update(id: string, obj: any): any;
        TestCollection.update = function (id, obj) {

        }    

        // public delete(id: string): any;
        this.delete = function (id) {

        }    

        return TestCollection;

    });

})();