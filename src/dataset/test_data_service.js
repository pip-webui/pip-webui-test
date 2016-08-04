/**
 * @file pipTestDataService
 * @copyright Digital Living Software Corp. 2014-2016
 */

/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module('pipTestDataService', []);

    thisModule.factory('pipTestDataService', 
        function(pipTestDataSet) {

            // Angular service that holds singleton test dataset that is shared across all

            var dataset = new pipTestDataSet();

            return {
                
                getDataset: getDataset

            };

            // Get singleton dataset
            function getDataset() {

                return dataset;

            }

            

        }
    );

})();