(function (chance) {
    'use strict';

    var thisModule = angular.module('appTestServices',
        [
            'pipSampleConfig',

            'pipDropdown', 'pipLayout',
            // 3rd Party Modules
            'ui.router', 'ui.utils', 'ngResource', 'ngAria', 'ngCookies', 'ngSanitize', 'ngMessages',
            'ngMaterial', 'wu.masonry', 'LocalStorageModule', 'angularFileUpload', 'ngAnimate',
            'pipLayout', 'pipCore', 'pipRest.State', 'pipNav', 'pipPictures',
            
            'pipWebuiTests',
            'appTests.Mocks', 'appTests.GenerateUsers', 'appTests.GASMocks', 'appTests.AvatarMocks'
        ]
    );

    thisModule.controller('AppController',
        function ($scope, $rootScope, $state, $mdSidenav, $timeout, pipTranslate, $mdTheming, pipTheme, $mdMedia, pipAppBar, pipWebuiTest, pipRest) {


            $scope.pages = [ 
                { title: 'Mocks', state: 'mocks', url: '/mocks', auth: false,
                    controller: 'MocksController', templateUrl: '../samples/mocks/mocks.html' 
                },
                { title: 'Get And Started Mocks', state: 'gas_mocks', url: '/gas_mocks', auth: false,
                        controller: 'GASMocksController', templateUrl: '../samples/mocks/get_started_mocks.html' 
                },    
                { title: 'User Generator', state: 'user_generator', url: '/user_generator', auth: false,
                    controller: 'GenerateUsersController', templateUrl: '../samples/data_generators/user_generator.html'
                },
                { title: 'Avatar Mocks', state: 'avatar_mocs', url: '/avatar_mocs', auth: false,
                    controller: 'AvatarMocksController', templateUrl: '../samples/mocks/mocks_avatar.html' 
                }                               
            ];
            
            $scope.selected = {};
            $timeout(function () {
                $scope.selected.pageIndex = _.findIndex($scope.pages, {state: $state.current.name});
            });

            $scope.onNavigationSelect = function (stateName) {
                if ($state.current.name !== stateName) {
                    $state.go(stateName);
                }
            };

            $scope.onDropdownSelect = function (obj) {
                if ($state.current.name !== obj.state) {
                    $state.go(obj.state);
                }
            };

            pipAppBar.showMenuNavIcon();
            pipAppBar.showLanguage();
            pipAppBar.showTitleText('NAVIGATION_CONTROLS');

            pipWebuiTest.runFakeServer('http://fakeserver.net'); // http://alpha.pipservices.net

            pipRest.serverUrl('http://fakeserver.net');
        }
    );

})(window.chance);
