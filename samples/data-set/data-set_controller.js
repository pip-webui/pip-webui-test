(function (angular) {
    'use strict';

    angular
        .module('appTestServices')
        .controller('pipTestDataSetController', pipTestDataSetController);

    function pipTestDataSetController($scope, pipTestDataSet) {
        $scope.ABCD = pipTestDataSet.ABCD;
        $scope.ABCD_CAPITALIZE = pipTestDataSet.ABCD_CAPITALIZE;
        $scope.DIGIT = pipTestDataSet.DIGIT;
        $scope.SIGN = pipTestDataSet.SIGN;
        $scope.SETTINGS1 = JSON.stringify(pipTestDataSet.SETTINGS1, '\t', 4);
        $scope.SETTINGS2 = JSON.stringify(pipTestDataSet.SETTINGS2, '\t', 4);
        $scope.EMPTY_USER = JSON.stringify(pipTestDataSet.EMPTY_USER, '\t', 4);
        $scope.MANAGER_USER = JSON.stringify(pipTestDataSet.MANAGER_USER, '\t', 4);
        $scope.TESTER_ACCOUNT = JSON.stringify(pipTestDataSet.TESTER_ACCOUNT, '\t', 4);
        $scope.SAMPLER_ACCOUNT = JSON.stringify(pipTestDataSet.SAMPLER_ACCOUNT, '\t', 4);
        $scope.SERVER_URL = JSON.stringify(pipTestDataSet.SERVER_URL, '\t', 4);
    }

})(window.angular);
