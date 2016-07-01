(function (chance) {
    'use strict';

    var thisModule = angular.module('appTestServices',
        [
            // 3rd Party Modules
            'ui.router', 'ui.utils', 'ngResource', 'ngAria', 'ngCookies', 'ngSanitize', 'ngMessages',
            'ngMaterial', 'wu.masonry', 'LocalStorageModule', 'angularFileUpload', 'ngAnimate',
            'pipWebuiTests', 'pipLayout', 'pipCore', 'pipRest.State', 'pipNav'
        ]
    );

    thisModule.config(function (pipStateProvider, $urlRouterProvider) {
        pipStateProvider
            .state('account', {
                url: '/account',
                controller: 'pipTestAccountController',
                templateUrl: 'account/account.html'
            })
            .state('content', {
                url: '/content',
                controller: 'pipTestContentController',
                templateUrl: 'content/content.html'
            })
            .state('data-set', {
                url: '/data-set',
                controller: 'pipTestDataSetController',
                templateUrl: 'data-set/data-set.html'
            })
            .state('entity', {
                url: '/entity',
                controller: 'pipTestEntityController',
                templateUrl: 'entity/entity.html'
            })
            .state('general', {
                url: '/general',
                controller: 'pipTestGeneralController',
                templateUrl: 'general/general.html'
            })
            .state('user-party', {
                url: '/user-party',
                controller: 'pipTestUserPartyController',
                templateUrl: 'user-party/user-party.html'
            });

        $urlRouterProvider.otherwise('/account');
    });

    thisModule.controller('AppController',
        function ($scope, $rootScope, $state, pipTheme, pipTestGeneral,
                  pipTestDataSet, pipTestContent, pipTestUserParty) {

            pipTheme.setCurrentTheme('blue');

            $scope.pages = [{
                state: 'account',
                title: 'pipTestAccount'
            }, {
                state: 'content',
                title: 'pipTestContent'
            }, {
                state: 'data-set',
                title: 'pipTestDataSet'
            }, {
                state: 'entity',
                title: 'pipTestEntity'
            }, {
                state: 'general',
                title: 'pipTestGeneral'
            }, {
                state: 'user-party',
                title: 'pipTestUserParty'
            }];

            $scope.onNavigationSelect = function (state) {
                $state.go(state);
            };

            $scope.onDropdownSelect = function (state) {
                $scope.onNavigationSelect(state.state);
            };

            // --------------
            chance.mixin({
                user: function () {
                    return {
                        first: chance.first(),
                        last: chance.last(),
                        email: chance.email()
                    };
                }
            });

            $scope.objectId = pipTestGeneral.getObjectId();
            $scope.oneWord = pipTestGeneral.getOneWord(10);

            $scope.sentence = chance.sentence();
            $scope.sentence5 = chance.sentence({words: 5});
            $scope.paragraph = chance.paragraph();
            $scope.paragraph5 = chance.paragraph({sentences: 5});

            // $scope.li_word = loremIpsum({ count: 1, units: 'word'});
            // $scope.li_sentence = loremIpsum({ count: 1, units: 'sentences'});
            // $scope.li_paragraph = loremIpsum({ count: 1, units: 'paragraphs'});
            // $scope.li_text = loremIpsum({ count: 5, units: 'paragraphs', paragraphLowerBound: 3, paragraphUpperBound: 7 });

            $scope.first = chance.first();
            $scope.last = chance.last();
            $scope.name = chance.name();
            $scope.email = chance.email();
            $scope.ip = chance.ip();
            $scope.date = chance.date();
            $scope.user = chance.user();

            $scope.checklist1 = pipTestContent.getCheckList();
            $scope.checklist2 = pipTestContent.getCheckList({
                size: 5,
                onlyCheck: true,
                onlyUnCheck: false,
                optionTextType: 'sentence',
                optionLength: 3
            });
            $scope.checklist3 = pipTestContent.getCheckList({
                size: 15,
                optionTextType: 'paragraph'
            });

            $scope.getOneUser = pipTestUserParty.getOneUser();
            $scope.getParty = pipTestUserParty.getParty();
            $scope.getConnection = pipTestUserParty.getConnection($scope.getParty);
            $scope.getPartyAccess = pipTestUserParty.getPartyAccess();
        }
    );

})(window.chance);
