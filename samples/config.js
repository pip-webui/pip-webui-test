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
                { title: 'Moks', state: 'moks', url: '/moks',
                    controller: 'MoksController', templateUrl: '../samples/moks/moks.html' }
                ],
                links = [
                    { title: 'Moks test', href: '/pip-webui-test/index.html'}
                ],
                contentItem, i;

            $mdIconProvider.iconSet('icons', 'images/icons.svg', 512);

            // pipAppBarProvider.globalSecondaryActions([
            //     {name: 'global.signout', title: 'SIGNOUT', state: 'signout'}
            // ]);

            // String translations
            pipTranslateProvider.translations('en', {
                CONTROLS: 'Moks',
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

            // pipAuthStateProvider.unauthorizedState('signin');
            // pipAuthStateProvider.authorizedState('progress');

            $urlRouterProvider.otherwise('/moks');

            // Configure REST API
            pipRestProvider.serverUrl('http://alpha.pipservices.net');

            // Configure navigation menu
            pipSideNavProvider.sections([
                {
                    links: [{title: 'Moks', url: '/moks'}]
                }/*, Links only for publishing samples
                {
                    links: links
                }

                /*,
                {
                    links: [{title: 'SIGNOUT', url: '/signout'}]
                }*/
            ]);
        }
    );

})(window.angular);

