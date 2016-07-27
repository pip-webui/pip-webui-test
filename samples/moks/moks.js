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
        function ($scope, pipAppBar, $timeout) {

            pipAppBar.showMenuNavIcon();
            pipAppBar.showLanguage();
            pipAppBar.showTitleText('MOKS');

        }
    );

})(window.angular);
