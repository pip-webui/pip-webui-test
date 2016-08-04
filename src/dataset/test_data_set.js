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

            var currentUser;
            var currentParty;
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

        }
   
        // Registers a new collection
        function add(collection) {

        }

        // Gets registered collection by its name
        function get(name) {

        }

        // ---------------------------

        function setCurrentUser(user) {

        }        

        function getCurrentUser() {

        }
   
        function setCurrentParty(party) {

        }

        function getCurrentParty() {

        }              
    });

})();