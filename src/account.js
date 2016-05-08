/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module('pipTest.Account', ['pipTest.DataSet']);

    thisModule.service('pipTestAccount', function (pipTestDataSet) {

            return {
                getServerUrl: getServerUrl,
                getSamplerAccount: getSamplerAccount,
                getTesterAccount: getTesterAccount

            };

            // get server url
            function getServerUrl() {
                return pipTestDataSet.SERVER_URL;
            };

            // get account, users and parties
            function getSamplerAccount() {
                return pipTestDataSet.SAMPLER_ACCOUNT;
            };

            function getTesterAccount() {
                return pipTestDataSet.TESTER_ACCOUNT;
            };

        }
    );

})();
