/**
 * @file Global configuration for test application
 * @copyright Digital Living Software Corp. 2014-2016
 */

(function (angular) {
    'use strict';

    var thisModule = angular.module('pipSampleConfig', ['pipRest.State', 'pipRest', 'pipSideNav',
        'pipAppBar']);

    // Configure application services before start
    thisModule.config(
        function ($mdThemingProvider, $stateProvider, $urlRouterProvider, pipAuthStateProvider, pipTranslateProvider,
                  pipRestProvider, pipSideNavProvider, pipAppBarProvider, $mdIconProvider,
                  $compileProvider, $httpProvider) {

            $compileProvider.debugInfoEnabled(false);
            $httpProvider.useApplyAsync(true);
            
            var content = [
                    { title: 'Mocks', state: 'mocks', url: '/mocks', auth: false,
                        controller: 'MocksController', templateUrl: '../samples/mocks/mocks.html' },
                    { title: 'Get And Started Mocks', state: 'gas_mocks', url: '/gas_mocks', auth: false,
                        controller: 'GASMocksController', templateUrl: '../samples/mocks/get_started_mocks.html' },                        
                    { title: 'User Generator', state: 'user_generator', url: '/user_generator', auth: false,
                        controller: 'GenerateUsersController', templateUrl: '../samples/data_generators/user_generator.html' 
                    }               
                ],
                contentItem, i;

            $mdIconProvider.iconSet('icons', 'images/icons.svg', 512);

            // String translations
            pipTranslateProvider.translations('en', {
                CONTROLS: 'Mocks',
                SIGNOUT: 'Sign out'
            });

            pipTranslateProvider.translations('ru', {
                CONTROLS: 'Моки',
                SIGNOUT: 'Выйти'
            });


            pipAuthStateProvider.unauthorizedState('signin');
            pipAuthStateProvider.authorizedState('mocks');

            for (i = 0; i < content.length; i++) {
                contentItem = content[i];
                $stateProvider.state(contentItem.state, contentItem);
            }

            $urlRouterProvider.otherwise('/mocks');

            // Configure REST API
            // pipRestProvider.serverUrl('http://alpha.pipservices.net');

            // Configure navigation menu
            pipSideNavProvider.sections([
                {
                    links: [
                        {title: 'Mocks', url: '/mocks'},
                        {title: 'Get Started Mocks', url: '/gas_mocks'},
                    ]
                },
                {
                    links: [
                        {title: 'User Generator', url: '/user_generator'}
                    ]
                },                
            ]);
        }
    );

})(window.angular);
