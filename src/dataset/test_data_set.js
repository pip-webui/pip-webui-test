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

            var currentUser = null;
            var currentParty = null;
            var dataSet = new Array();

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

            for (i = 0; i < dataSet.length; i++) {
                if (dataSet[i] && dataSet[i].isInit === false) {
                    dataSet[i].init();
                }
            }    
        }
   
        // Registers a new collection
        function add(collection) {
            var name;
            
            if (collection && angular.isObject(collection) && collection.name) {
                name = collection.name;
                dataSet[name] = _.cloneDeep(collection);
            } else {
                throw new Error('pipTestDataSet: collection is required');
            }
        }

        // Gets registered collection by its name
        function get(name) {
            if (name && angular.isString(name)) {
                return dataSet[name];
            } else {
                throw new Error('pipTestDataSet: name must be a string');
            }
        }

        // ---------------------------

        function setCurrentUser(user) {
            if (user && angular.isObject(user) && user.id) {
                currentUser = _.cloneDeep(user);
            } else {
                throw new Error('pipTestDataSet: currentUser must be a object');
            }
        }        

        function getCurrentUser() {
            return currentUser;
        }
   
        function setCurrentParty(party) {
            if (party && angular.isObject(party) && party.id) {
                currentParty = _.cloneDeep(party);
            } else {
                throw new Error('pipTestDataSet: currentParty must be a object');
            }
        }

        function getCurrentParty() {
            return currentParty;
        }      

    });

})();