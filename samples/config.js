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
                    { title: 'User Generator', state: 'user_generator', url: '/user_generator', auth: false,
                        controller: 'GenerateUsersController', templateUrl: '../samples/data_generators/user_generator.html' 
                    }               
                ],
                links = [
                    { title: 'Basic controls', href: '/pip-webui-controls/index.html'},
                    { title: 'Composite controls', href: '/pip-webui-composite/index.html'},
                    { title: 'Core', href: '/pip-webui-core/index.html'},
                    { title: 'CSS components', href: '/pip-webui-css/index.html'},
                    { title: 'Document controls', href: '/pip-webui-documents/index.html'},
                    { title: 'Entry pages', href: '/pip-webui-entry/index.html'},
                    { title: 'Error handling', href: '/pip-webui-errors/index.html'},
                    { title: 'Guidance components', href: '/pip-webui-guidance/index.html'},
                    { title: 'Layouts', href: '/pip-webui-layouts/index.html'},
                    { title: 'Location Controls', href: '/pip-webui-locations/index.html'},
                    { title: 'Navigation controls', href: '/pip-webui-nav/index.html'},
                    { title: 'Picture controls', href: '/pip-webui-pictures/index.html'},
                    { title: 'REST API', href: '/pip-webui-rest/index.html'},
                    { title: 'Settings components', href: '/pip-webui-settings/index.html'},
                    { title: 'Support components', href: '/pip-webui-support/index.html'},
                    { title: 'Test Framework', href: '/pip-webui-test/index.html'}
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

            for (i = 0; i < content.length; i++) {
                contentItem = content[i];
                $stateProvider.state(contentItem.state, contentItem);
            }

            pipAuthStateProvider.unauthorizedState('mocks');
            pipAuthStateProvider.authorizedState('mocks');

            $urlRouterProvider.otherwise('/mocks');

            // Configure REST API
            pipRestProvider.serverUrl('http://alpha.pipservices.net');

            // Configure navigation menu
            pipSideNavProvider.sections([
                {
                    links: [
                        {title: 'Mocks', url: '/mocks'}
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

