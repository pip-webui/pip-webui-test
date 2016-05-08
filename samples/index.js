/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module('appTestServices',
        [
            // 3rd Party Modules
            'ui.router', 'ui.utils', 'ngResource', 'ngAria', 'ngCookies', 'ngSanitize', 'ngMessages',
            'ngMaterial', 'wu.masonry', 'LocalStorageModule', 'angularFileUpload', 'ngAnimate', 'ngTouch',
            'pipWebuiTests'
        ]
    );

    thisModule.controller('AppController', 
        function ($scope, $rootScope, pipTestGeneral, pipTestDataSet, pipTestContent, pipTestUserParty) {

            var poolObjectId = pipTestDataSet.ABCD + pipTestDataSet.DIGIT,
                poolWord =  pipTestDataSet.ABCD +  pipTestDataSet.ABCD_CAPITALIZE;

            chance.mixin({
                'user': function() {
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
            $scope.sentence5 = chance.sentence({words: 5}) ;
            $scope.paragraph = chance.paragraph();
            $scope.paragraph5 = chance.paragraph({sentences: 5});

            //$scope.li_word = loremIpsum({ count: 1, units: 'word'});
            //$scope.li_sentence = loremIpsum({ count: 1, units: 'sentences'});
            //$scope.li_paragraph = loremIpsum({ count: 1, units: 'paragraphs'});
            //$scope.li_text = loremIpsum({ count: 5, units: 'paragraphs', paragraphLowerBound: 3, paragraphUpperBound: 7 });

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

})();
