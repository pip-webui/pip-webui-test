(function (angular) {
    'use strict';

    angular
        .module('appTestServices')
        .controller('pipTestUserPartyController', pipTestUserPartyController);

    function pipTestUserPartyController($scope, pipTestUserParty) {
        var partyObj = pipTestUserParty.getParty();

        $scope.oneUser = JSON.stringify(pipTestUserParty.getOneUser(), '\t', 4);
        $scope.settings = JSON.stringify(pipTestUserParty.getSettings(), '\t', 4);
        $scope.party = JSON.stringify(partyObj, '\t', 4);
        $scope.connection = JSON.stringify(pipTestUserParty.getConnection(partyObj), '\t', 4);
        $scope.partyAccess = JSON.stringify(pipTestUserParty.getPartyAccess(2), '\t', 4);
        $scope.sessions = JSON.stringify(pipTestUserParty.getSession(), '\t', 4);
    }

})(window.angular);
