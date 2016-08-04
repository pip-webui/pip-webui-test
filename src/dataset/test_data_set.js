/**
 * @file pipTestDataSet
 * @copyright Digital Living Software Corp. 2014-2016
 */

(function () {
    'use strict';

    var thisModule = angular.module('pipTestDataSet', []);

    // Test dataset, that can be used to hold state of rest api
    thisModule.factory('pipTestDataSet', function ($log) {
        
        // Define the constructor function.
        return function () {

            this.currentUser = null;
            this.currentParty = null;
            this.dataSet = new Array();

            this.init = init;         
            this.add = add;         
            this.get = get;         

            this.getCurrentUser = getCurrentUser;
            this.setCurrentUser = setCurrentUser;
            this.setCurrentParty = setCurrentParty;
            this.getCurrentParty = getCurrentParty;
                    
        }

        // Initializes all registered collectons
        function init() {
            var i;

            for (i in this.dataSet) {
                if (this.dataSet[i] && this.dataSet[i].isInit === false) {
                    this.dataSet[i].init();
                }
            }    
        }
   
        // Registers a new collection
        function add(collection) {
            var name;
            
            if (collection && angular.isObject(collection) && collection.name) {
                name = collection.name;
                this.dataSet[name] = _.cloneDeep(collection);
            } else {
                throw new Error('pipTestDataSet: collection is required');
            }
        }

        // Gets registered collection by its name
        function get(name) {
            if (name && angular.isString(name)) {
                return this.dataSet[name];
            } else {
                throw new Error('pipTestDataSet: name must be a string');
            }
        }

        // ---------------------------

        function setCurrentUser(user) {
            if (user && angular.isObject(user) && user.id) {
                this.currentUser = _.cloneDeep(user);
            } else {
                throw new Error('pipTestDataSet: currentUser must be a object');
            }
        }        

        function getCurrentUser() {
            return this.currentUser;
        }
   
        function setCurrentParty(party) {
            if (party && angular.isObject(party) && party.id) {
                this.currentParty = _.cloneDeep(party);
            } else {
                throw new Error('pipTestDataSet: currentParty must be a object');
            }
        }

        function getCurrentParty() {
            return this.currentParty;
        }      

    });

})();