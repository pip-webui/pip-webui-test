/**
 * @file Provides a service to work with mocked user
 * @copyright Digital Living Software Corp. 2014-2015
 */

(function () {
    'use strict';

    var thisModule = angular.module('pipTest.Account', ['pipTest.DataSet']);

    thisModule.service('pipTestAccount', function (pipTestDataSet) {

        return {
            getServerUrl: getServerUrl,
            getSamplerAccount: getSamplerAccount,
            getTesterAccount: getTesterAccount
        };

        // Returns server url
        function getServerUrl() {
            return pipTestDataSet.SERVER_URL;
        }

        // Returns account, users and parties
        function getSamplerAccount() {
            return pipTestDataSet.SAMPLER_ACCOUNT;
        }

        function getTesterAccount() {
            return pipTestDataSet.TESTER_ACCOUNT;
        }
    });

})();
