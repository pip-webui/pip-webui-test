(function (angular) {
    'use strict';

    var thisModule = angular.module('appTests.Mocks', []);

    thisModule.config(function (pipTranslateProvider) {
        pipTranslateProvider.translations('en', {
            SAMPLE: 'sample'
        });
        pipTranslateProvider.translations('ru', {
            SAMPLE: 'пример'
        });
    });

    thisModule.controller('MocksController',
        function ($scope, pipAppBar, $timeout, pipSession, $http) {

            $scope.signIn = signIn;

            pipAppBar.showMenuNavIcon();
            pipAppBar.showLanguage();
            pipAppBar.showTitleText('MOCKS');

            return;

            function signIn() {
                pipSession.signin(
                    {
                        serverUrl: pipDataGeneratorGeneral.serverUrl, 
                        email: pipDataGeneratorGeneral.getEmail(),
                        password: pipDataGeneratorGeneral.getPassword(),
                    },
                    function (user) {
                        console.log('SignIn', user);
                    },
                    function (error) {
                        console.log(error);
                    }
                );
            }            

        }
    );

})(window.angular);
