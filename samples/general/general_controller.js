(function (angular) {
    'use strict';

    angular
        .module('appTestServices')
        .controller('pipTestGeneralController', pipTestGeneralController);

    function pipTestGeneralController($scope, pipTestGeneral) {
        $scope.objectId = pipTestGeneral.getObjectId(10);
        $scope.one = pipTestGeneral.getOne(['green', 'red', 'blue', 'orange', 'white']);
        $scope.oneWord = pipTestGeneral.getOneWord(20);
    }

})(window.angular);
