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
        function TestCollection(generator, name, size, refs) {
            if (!generator) {
                throw new Error('TestCollection: generator is required');
            }

            this.generator = generator;
            this.size = size ? size : 0;
            this.refs = getRefs(generator, refs);
            this.name = getName(generator, name);
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

        // public init(collection: any[]): void;
        TestCollection.init = function (collection) {
            if (collection && angular.isArray(collection)) {
                this.collection = _.cloneDeep(collection);
                this.size = collection.length;
                //this.refs = ???

                return;
            }

            if (this.size === 0) { 
                this.collection = [];

                return
            } 

            this.collection = generator.newObjectList(this.size, this.refs);
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
            var result = this.generator.initObject(obj);

            if (result) {
                this.collection.push(result);
            }

            return result;
        }    

        // public update(id: string, obj: any): any;
        TestCollection.update = function (id, obj) {
            var result;

            if (!id || !angular.isObject(obj)) {
                // todo: trow error?
                return null;
            }

            result = this.findById(id);

            if (result) {
                result = _.assign(result, obj);
                // todo: replace into collection ???
            } else {
                result = null;
            }

            return result;
        }    

        // public delete(id: string): any;
        this.deleteById = function (id) {
            var i, match = false;

            for (i = 0; i < this.collection.length; i++) {
                if(this.collection[i].id == userId) {
                    match = true;
                    this.collection.splice(i, 1);
                    break;
                }
            }

            return match;            
        }    

        // public delete(id: string): any;
        this.deleteByIndex = function (index) {
            if (!index || index < 0 || index > this.collection.length - 1) {
                return false;
            }

            this.collection.splice(index, 1);

            return true;            
        }

        return TestCollection;

        // ----------------------------------

        function getRefs(generator, refs) {
            var result;
            
            if (refs && angular.isArray(refs)) {
                return _.cloneDeep(refs);
            } else if (generator.refs && angular.isArray(generator.refs)) {
                return _.cloneDeep(generator.refs);
            } else {
                return new Array(); 
            }
        }

        function getName(generator, name) {
            if (name) {
                return name;
            } else {
                return generator.name;
            } 
        }

    });

})();