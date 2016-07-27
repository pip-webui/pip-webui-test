(function (angular) {
    'use strict';

    var thisModule = angular.module('appTests.Moks', []);

    thisModule.config(function (pipTranslateProvider) {
        pipTranslateProvider.translations('en', {
            SAMPLE: 'sample'
        });
        pipTranslateProvider.translations('ru', {
            SAMPLE: 'пример'
        });
    });

    thisModule.controller('MoksController',
        function ($scope, pipAppBar, $timeout, pipSession, pipTestAccount, $http) {

        //    $scope.serverUrl = pipTestAccount.getServerUrl();
        //    $scope.sampleAccount = pipTestAccount.getSamplerAccount();

            $scope.signIn = signIn;

            pipAppBar.showMenuNavIcon();
            pipAppBar.showLanguage();
            pipAppBar.showTitleText('MOKS');

            return;

            function signIn() {
                // $http.post('http://alpha.pipservices.net/api/signin', {});
                pipSession.signin(
                    {
                        serverUrl: 'http://alpha.pipservices.net', // $scope.serverUrl,
                        email: '1@1.com', // $scope.sampleAccount.email,
                        password: '123456', // $scope.sampleAccount.password
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
