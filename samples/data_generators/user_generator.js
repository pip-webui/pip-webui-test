(function (angular) {
    'use strict';

    var thisModule = angular.module('appTests.GenerateUsers', []);

    thisModule.config(function (pipTranslateProvider) {
        pipTranslateProvider.translations('en', {
            SAMPLE: 'sample'
        });
        pipTranslateProvider.translations('ru', {
            SAMPLE: 'пример'
        });
    });

    thisModule.controller('GenerateUsersController',
        function ($scope, pipAppBar, $timeout, pipSession, $http, pipDataGeneratorGeneral, pipFakeDataModelUsers) {

            $scope.onGenerate = onGenerate;

            pipAppBar.showMenuNavIcon();
            pipAppBar.showLanguage();
            pipAppBar.showTitleText('Genetate Users');

            return;

            function onGenerate() {
                $scope.UserCollection = pipFakeDataModelUsers.dataGenerate();
                console.log('Users Collection', $scope.UserCollection);
            }            

        }
    );

})(window.angular);
