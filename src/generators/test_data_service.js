/**
 * @file pipTestDataService
 * @copyright Digital Living Software Corp. 2014-2016
 */

/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module('pipTestDataService', []);

    thisModule.factory('pipTestDataService', 
        function(pipAreasData, pipGoalsData, $rootScope, pipCollections, NewsUAService, pipEnums) {

    // Angular service that holds singleton test dataset that is shared across all
    // Get singleton dataset
    // public getDataset(): TestDataset;

            return {
                
                
            }
        }
    );

})();