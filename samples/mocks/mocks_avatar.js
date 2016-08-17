(function (angular) {
    'use strict';

    var thisModule = angular.module('appTests.AvatarMocks', []);

    thisModule.config(function (pipTranslateProvider) {
        pipTranslateProvider.translations('en', {
            SAMPLE: 'sample'
        });
        pipTranslateProvider.translations('ru', {
            SAMPLE: 'пример'
        });
    });

    thisModule.controller('AvatarMocksController',
        function ($scope, $http, pipAppBar, pipTestDataService, pipBasicGeneratorServices ) {

            var dataset = pipTestDataService.createTestDataset();

            $scope.onSignIn = onSignIn;

            pipAppBar.showMenuNavIcon();
            pipAppBar.showLanguage();
            pipAppBar.showTitleText('MOCKS AVATAR');

            return;

            function onSignIn() {
                var user,
                    users = dataset.get('UsersTestCollection'),
                    req = {
                        method: 'POST',
                        url: pipBasicGeneratorServices.serverUrl() + '/api/signin',
                        headers: {'Content-Type': undefined},
                        data: {}
                    };

                if (!users) {
                    throw new Error('MocksController: Users collection is not found');
                } 

                user = users.getByIndex(0);
                if (!user || !user.id) {
                    throw new Error('MocksController: Users collection is empty');
                }

                req.data = {email: user.email, password: pipBasicGeneratorServices.getPassword()}

                $http(req)
                    .success(function (result) {
                        console.log('signin', result);
                        $scope.party = result;
                        $scope.isSignIn = true;                        
                    })
                    .error(function (error) {
                        console.log('onSignIn error', error); 
                    }
                );                
            }   
        }
    );

})(window.angular);
