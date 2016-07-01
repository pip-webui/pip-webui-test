(function (angular) {
    'use strict';

    angular
        .module('appTestServices')
        .controller('pipTestAccountController', pipTestAccountController);

    function pipTestAccountController($scope, pipTestAccount) {
        $scope.serverUrl = pipTestAccount.getServerUrl();
        $scope.samplerAccount = JSON.stringify(pipTestAccount.getSamplerAccount(), '\t', 4);
        $scope.testerAccount = JSON.stringify(pipTestAccount.getTesterAccount(), '\t', 4);
    }

})(window.angular);
