(function (angular) {
    'use strict';

    var thisModule = angular.module('appTests.GenerateUsers', []);

    thisModule.config(function (pipTranslateProvider) {
        pipTranslateProvider.translations('en', {
            SAMPLE: 'sample'
        });
        pipTranslateProvider.translations('ru', {
            SAMPLE: 'пример'
        });
    });

    thisModule.controller('GenerateUsersController',
        function ($scope, pipAppBar, $timeout, pipSession, $http, pipDataGeneratorGeneral, pipFakeDataModelUsers) {

            $scope.userCollection = [];

            $scope.onGenerate = onGenerate;
            $scope.onSetUsers = onSetUsers;
            $scope.onClearUsers = onClearUsers;
            $scope.onAddOne = onAddOne;
            $scope.onFindOne = onFindOne;
            $scope.onFindMany = onFindMany;
            $scope.onDeleteUser = onDeleteUser;
            $scope.onUpdateUser = onUpdateUser;
            $scope.onCollapse = onCollapse;
            $scope.getCode = getCode;

            pipAppBar.showMenuNavIcon();
            pipAppBar.showLanguage();
            pipAppBar.showTitleText('Genetate Users');

            return;

            function onGenerate() {
                $scope.userCollection = pipFakeDataModelUsers.dataGenerate();
            }            

            function getCode(user) {
                var str = JSON.stringify(user, "", 4);

                return str.replace(/^\s*/,'').replace(/\s*$/,'');

            } 

            function onCollapse($event, $index) {
                var user = $scope.userCollection[$index];

                user.collapse = !user.collapse;
            }  

            function onUpdateUser($event, $index) {
                 var user = $scope.userCollection[$index];
                 
                 user.name = pipDataGeneratorGeneral.getName();
                 user.collapse = true;   
                 pipFakeDataModelUsers.updateOne(user.id, user);
                 $scope.userCollection = pipFakeDataModelUsers.getData();
            } 

            function onDeleteUser($event, $index) {
                 var user = $scope.userCollection[$index];

                 pipFakeDataModelUsers.deleteOne(user.id);
                 $scope.userCollection = pipFakeDataModelUsers.getData();
            } 

            function onFindMany($event, $index) {

            } 


            function onFindOne($event, $index) {

            } 

            function onAddOne($event, $index) {
                pipFakeDataModelUsers.addOne();
            } 

            function onClearUsers($event, $index) {
                pipFakeDataModelUsers.setData([]);
                $scope.userCollection = pipFakeDataModelUsers.getData();
            } 

            function onSetUsers($event, $index) {
                pipFakeDataModelUsers.setData($scope.userCollection);
            } 
        }
    );

})(window.angular);
