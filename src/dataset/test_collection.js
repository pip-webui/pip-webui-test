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
        return function (generator, name, size, refs) {
            if (!generator) {
                throw new Error('TestCollection: generator is required');
            }

            this.generator = generator;
            this.size = size ? size : 0;
            this.refs = getRefs(generator, refs);
            this.name = getName(generator, name);
            this.collection = [];
            this.isInit = false;

            this.getGeneratorName = getGeneratorName;
            this.getSize = getSize;         
            this.init = init;         
            this.getAll = getAll;         
            this.getByIndex = getByIndex;         
            this.findById = findById;         
            this.create = create;         
            this.update = update;         
            this.deleteById = deleteById;         
            this.deleteByIndex = deleteByIndex; 

            return this;             
        }
            
        function getGeneratorName() {
                return this.generator.name;
            }

        function getSize() {
                return this.collection.length;
            }    

        // public init(collection: any[]): void;
        function init(collection) {
            if (collection && angular.isArray(collection)) {
                this.collection = _.cloneDeep(collection);
                this.size = collection.length;

                this.isInit = true;

                return;
            }

            if (this.size === 0) { 
                this.collection = [];

                return
            } 

            this.collection = this.generator.newObjectList(this.size, this.refs);
            this.isInit = true;
        }
    
        // public getAll(): any[];
        function getAll() {
            return _.cloneDeep(this.collection);
        }     

        // public get(index: number): any[];
        function getByIndex(index) {
            var result = null;

            if (index === undefined || index === null || index < 0 || index > this.collection.length - 1) {
                return result;
            }

            result = _.cloneDeep(this.collection[index]);

            return result;
        }    

        // public findById(id: string): any;
        function findById(id, field) {
            var result = null,
                fieldId = field ? field : 'id';

            if (id === undefined || id === null) {
                return result;
            }

            result = _.find(this.collection, function(item) {
                return item[fieldId] == id;
            }); 
            
            return result || null;
        }    

        // public create(obj: any): any;
        function create(obj) {
            var result = this.generator.initObject(obj);

            if (angular.isObject(result)) {
                this.collection.push(result);
            }

            return result;
        }    

        // public update(id: string, obj: any): any;
        function update(id, obj, idField) {
            var result;

            if (id === undefined || id === null || !angular.isObject(obj)) {
                throw new Error('pipTestCollection: id parametr misseed in update function.');
            }

            result = this.findById(id, idField);

            if (angular.isObject(result)) {
                result = _.assign(result, obj);
            } else {
                result = null;
            }

            return result;
        }    

        // public delete(id: string): any;
        function deleteById(id) {
            var i, match = false;

            for (i = 0; i < this.collection.length; i++) {
                if (this.collection[i].id === id) {
                    match = true;
                    this.collection.splice(i, 1);
                    break;
                }
            }

            return match;            
        }    

        // public delete(id: string): any;
        function deleteByIndex(index) {
            if (index === undefined || index === null || index < 0 || index > this.collection.length - 1) {
                return false;
            }

            this.collection.splice(index, 1);

            return true;            
        }

        // ----------------------------------

        function getRefsCopy(arr) {
            var result = {};

            for (var key in arr) {
                result[key] = _.cloneDeep(arr[key]);
            }

            return result;
        }

        function getRefs(generator, refs) {
            if (refs && angular.isObject(refs)) {
                return getRefsCopy(refs);
            } else if (generator.refs && angular.isObject(generator.refs)) {
                return getRefsCopy(generator.refs);
            } else {
                return {}; 
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