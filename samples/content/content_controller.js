(function (angular) {
    'use strict';

    angular
        .module('appTestServices')
        .controller('pipTestContentController', pipTestContentController);

    function pipTestContentController($scope, pipTestContent) {
        $scope.checkList = JSON.stringify(pipTestContent.getCheckList(), '\t', 4);
    }

})(window.angular);
