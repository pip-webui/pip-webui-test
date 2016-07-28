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
        function ($scope, pipAppBar, $timeout, pipSession, $http, pipDataGeneratorGeneral, pipFakeDataModelUsers) {

            $scope.signIn = signIn;

            $scope.onUser = onUser;


            pipAppBar.showMenuNavIcon();
            pipAppBar.showLanguage();
            pipAppBar.showTitleText('MOCKS');

            return;

            function signIn() {
                var requestUrl = pipDataGeneratorGeneral.serverUrl() + '/api/signin';
                
                $http['post'](requestUrl, {email: pipDataGeneratorGeneral.getEmail(), password: pipDataGeneratorGeneral.getPassword()})
                    .success(function (result) {
                        console.log('SignIn user:', result);
                    })
                    .error(function (error) {
                        console.log('SignIn error:', error);
                    }
                );
            }    

            function onUser() {
                var requestUrl,
                    user = pipFakeDataModelUsers.addOne();
                console.log('onUser', user);

                if (!user || !user.id) {
                    return;
                }


                requestUrl = pipDataGeneratorGeneral.serverUrl() + '/api/users';
                console.log('onUser requestUrl', requestUrl);

                $http['post'](requestUrl, {})
                    .success(function (result) {
                        console.log('onUser result', result); 
                    })
                    .error(function (error) {
                        console.log('onUser error', error); 
                    }
                );
             
            }          


        }
    );

})(window.angular);
