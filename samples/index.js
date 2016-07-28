(function (chance) {
    'use strict';

    var thisModule = angular.module('appTestServices',
        [
            'pipSampleConfig',

            'pipDropdown', 'pipLayout',
            // 3rd Party Modules
            'ui.router', 'ui.utils', 'ngResource', 'ngAria', 'ngCookies', 'ngSanitize', 'ngMessages',
            'ngMaterial', 'wu.masonry', 'LocalStorageModule', 'angularFileUpload', 'ngAnimate',
            'pipLayout', 'pipCore', 'pipRest.State', 'pipNav',
            
            'pipWebuiTests',
            'appTests.Mocks', 'appTests.GenerateUsers'
        ]
    );

    thisModule.controller('AppController',
        function ($scope, $rootScope, $state, $mdSidenav, $timeout, pipTranslate, $mdTheming, pipTheme, $mdMedia) {

            $scope.pages = [ 
                { title: 'Mocks', state: 'mocks', url: '/mocks', auth: false,
                    controller: 'MocksController', templateUrl: '../samples/mocks/mocks.html' 
                },
                { title: 'User Generator', state: 'user_generator', url: '/user_generator', auth: false,
                    controller: 'GenerateUsersController', templateUrl: '../samples/data_generators/user_generator.html'
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

            $scope.isEntryPage = function () {
                return $state.current.name === 'signin' || $state.current.name === 'signup' ||
                    $state.current.name === 'recover_password' || $state.current.name === 'post_signup';
            };

            $scope.isPadding = function () {
                return $rootScope.$state
                    ? !($rootScope.$state.name === 'tabs' ||
                    $rootScope.$state.name === 'dropdown' && $mdMedia('xs')) : true;
            };

        }
    );

})(window.chance);
