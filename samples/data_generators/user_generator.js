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
        function ($scope, pipAppBar, $timeout, pipSession, $http, 
            pipBasicGeneratorServices, 
            // pipFakeDataModelUsers,
            pipUserDataGenerator, pipPartyAccessDataGenerator, pipSessionsDataGenerator
            , TestCollection
            ) {

            $scope.userCollection = pipUserDataGenerator.newObjectList(10);

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

            // runTestForDataGenerators();
            runTestForTestCollection();
            runTestForDataSet();
            runTestForImageSet();

            return;
// test 
// ---------------------------------

            function runTestForDataGenerators() {
                var userCollection, userRefsCollection, partyAccessCollection, sessionsCollection, refs = new Array();

                partyAccessCollection = pipPartyAccessDataGenerator.newObjectList(10);
                sessionsCollection = pipSessionsDataGenerator.newObjectList(10);
                userCollection = pipUserDataGenerator.newObjectList(10);

                refs['PartyAccess'] = partyAccessCollection;
           	    refs['Sessions'] = sessionsCollection;

                userRefsCollection = pipUserDataGenerator.newObjectList(10, refs);    

                console.log('------------partyAccessCollection', partyAccessCollection);
                console.log('------------sessionsCollection', sessionsCollection);
                console.log('------------userCollection', userCollection);
                console.log('------------userRefsCollection', userRefsCollection);
            }

            function runTestForTestCollection() {
                var userTestCollection, userTestCollection1, userTestCollection2, userTestCollection3;

                var userRefsCollection, partyAccessCollection, sessionsCollection, refs = new Array();
                partyAccessCollection = pipPartyAccessDataGenerator.newObjectList(10);
                sessionsCollection = pipSessionsDataGenerator.newObjectList(10);

                refs['PartyAccess'] = partyAccessCollection;
           	    refs['Sessions'] = sessionsCollection;
                userRefsCollection = pipUserDataGenerator.newObjectList(10, refs);    

                console.log('------------partyAccessCollection', partyAccessCollection);
                console.log('------------sessionsCollection', sessionsCollection);
                console.log('------------userRefsCollection', userRefsCollection);

                userTestCollection = new TestCollection(pipUserDataGenerator, 'UserTestCollection', 20);
                userTestCollection1 = new TestCollection(pipUserDataGenerator, 'UserTestCollection', 5);
                userTestCollection2 = new TestCollection(pipUserDataGenerator, 'UserTestCollection', 7, refs);
                userTestCollection3 = new TestCollection(pipUserDataGenerator, 'UserTestCollection', 0);


                userTestCollection.init();
                userTestCollection1.init();
                userTestCollection2.init();
                userTestCollection3.init(userRefsCollection);

                console.log('userTestCollection', userTestCollection.getAll());
                console.log('userTestCollection1', userTestCollection1.getAll());
                console.log('userTestCollection2', userTestCollection2.getAll());
                console.log('userTestCollection3', userTestCollection3.getAll());


            }

            function runTestForDataSet() {
                
            }

            function runTestForImageSet() {

            }
// --------------------------------

            function getCode(user) {
                var str = JSON.stringify(user, "", 4);

                return str.replace(/^\s*/,'').replace(/\s*$/,'');

            } 

            function onGenerate($event) {
               $scope.userCollection = pipUserDataGenerator.newObjectList(10, []);
            } 

            function onCollapse($event, $index) {
                var user = $scope.userCollection[$index];

                user.collapse = !user.collapse;
            }  

            function onUpdateUser($event, $index) {
                //  var user = $scope.userCollection[$index];
                 
                //  user.name = pipBasicGeneratorServices.getName();
                //  user.collapse = true;   
                //  pipFakeDataModelUsers.updateOne(user.id, user);
                //  $scope.userCollection = pipFakeDataModelUsers.getData();
            } 

            function onDeleteUser($event, $index) {
                //  var user = $scope.userCollection[$index];

                //  pipFakeDataModelUsers.deleteOne(user.id);
                //  $scope.userCollection = pipFakeDataModelUsers.getData();
            } 

            function onFindMany($event, $index) {

            } 


            function onFindOne($event, $index) {

            } 

            function onAddOne($event, $index) {
                // pipFakeDataModelUsers.addOne();
            } 

            function onClearUsers($event, $index) {
                // pipFakeDataModelUsers.setData([]);
                // $scope.userCollection = pipFakeDataModelUsers.getData();
            } 

            function onSetUsers($event, $index) {
                // pipFakeDataModelUsers.setData($scope.userCollection);
            } 
        }
    );

})(window.angular);
