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
            pipUserDataGenerator, pipPartyAccessDataGenerator, pipSessionsDataGenerator,
            TestCollection, pipTestDataService,
            pipImageResources, pipAvatarsDataGenerator, pipFilesDataGenerator
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

            var dataset = prepareData();

            testImageRes();

            return;
// test 
// ---------------------------------

            function testImageRes() {
                var imagesAll = pipImageResources.getImagesCollection(),
                    imagesSize = pipImageResources.getImagesCollection(10),
                    imagesSearch = pipImageResources.getImagesCollection(null, 'cat'),
                    imagesSizeSearch = pipImageResources.getImagesCollection(10, 'cat');

                    console.log('imagesAll', imagesAll);
                    console.log('imagesAll', imagesSize);
                    console.log('imagesAll', imagesSearch);
                    console.log('imagesAll', imagesSizeSearch);


            }

            function prepareData() {
                var tcPartyAccess, tcSessions, tcUsers, tcImages, tcAvatars,
                    usersRefs = new Array(),
                    dataSet;
                    
                // create dataset    
                dataSet = pipTestDataService.getDataset();

                // create collection without references
                tcPartyAccess = new TestCollection(pipPartyAccessDataGenerator, 'PartyAccessTestCollection', 20);
                tcSessions = new TestCollection(pipSessionsDataGenerator, 'SessionsTestCollection', 20);
                // init collection
                tcPartyAccess.init();
                tcSessions.init();
                // add collection to dataset
                dataSet.add(tcPartyAccess);
                dataSet.add(tcSessions);
                // form references for users collection
                usersRefs['PartyAccess'] = tcPartyAccess.getAll();
           	    usersRefs['Sessions'] = tcSessions.getAll();

                // create users collection   
                tcUsers = new TestCollection(pipSessionsDataGenerator, 'UsersTestCollection', 20, usersRefs);   
                dataSet.add(tcUsers);

                // create images collection
                tcImages = new TestCollection(pipFilesDataGenerator, 'FilesTestCollection', 20);
                dataSet.add(tcImages);
                // create avatar collection
                tcAvatars = new TestCollection(pipAvatarsDataGenerator, 'AvatarsTestCollection', 20);
                dataSet.add(tcAvatars);
                // init collection
                dataSet.init();

                var Sessions, PartyAccess, Users, Files, Avatars;

                Sessions = dataSet.get('SessionsTestCollection').getAll();
                PartyAccess = dataSet.get('PartyAccessTestCollection').getAll();
                Users = dataSet.get('UsersTestCollection').getAll();
                Files = dataSet.get('FilesTestCollection').getAll();
                Avatars = dataSet.get('AvatarsTestCollection').getAll();


                console.log('SessionsTestCollection', Sessions);
                console.log('PartyAccessTestCollection', PartyAccess);
                console.log('UsersTestCollection', Users);
                console.log('FilesTestCollection', Files);
                console.log('AvatarsTestCollection', Avatars);

                return dataSet;
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

            // function runTestForDataGenerators() {
            //     var userCollection, userRefsCollection, partyAccessCollection, sessionsCollection, refs = new Array();

            //     partyAccessCollection = pipPartyAccessDataGenerator.newObjectList(10);
            //     sessionsCollection = pipSessionsDataGenerator.newObjectList(10);
            //     userCollection = pipUserDataGenerator.newObjectList(10);

            //     refs['PartyAccess'] = partyAccessCollection;
           	//     refs['Sessions'] = sessionsCollection;

            //     userRefsCollection = pipUserDataGenerator.newObjectList(10, refs);    

            //     console.log('------------partyAccessCollection', partyAccessCollection);
            //     console.log('------------sessionsCollection', sessionsCollection);
            //     console.log('------------userCollection', userCollection);
            //     console.log('------------userRefsCollection', userRefsCollection);
            // }

            // function runTestForTestCollection() {
            //     var userTestCollection, userTestCollection1, userTestCollection2, userTestCollection3;

            //     var userRefsCollection, partyAccessCollection, sessionsCollection, refs = new Array();
            //     partyAccessCollection = pipPartyAccessDataGenerator.newObjectList(10);
            //     sessionsCollection = pipSessionsDataGenerator.newObjectList(10);

            //     refs['PartyAccess'] = partyAccessCollection;
           	//     refs['Sessions'] = sessionsCollection;
            //     userRefsCollection = pipUserDataGenerator.newObjectList(10, refs);    

            //     console.log('------------partyAccessCollection', partyAccessCollection);
            //     console.log('------------sessionsCollection', sessionsCollection);
            //     console.log('------------userRefsCollection', userRefsCollection);

            //     userTestCollection = new TestCollection(pipUserDataGenerator, 'UserTestCollection', 20);
            //     userTestCollection1 = new TestCollection(pipUserDataGenerator, 'UserTestCollection', 5);
            //     userTestCollection2 = new TestCollection(pipUserDataGenerator, 'UserTestCollection', 7, refs);
            //     userTestCollection3 = new TestCollection(pipUserDataGenerator, 'UserTestCollection', 0);


            //     userTestCollection.init();
            //     userTestCollection1.init();
            //     userTestCollection2.init();
            //     userTestCollection3.init(userRefsCollection);

            //     console.log('userTestCollection', userTestCollection.getAll());
            //     console.log('userTestCollection1', userTestCollection1.getAll());
            //     console.log('userTestCollection2', userTestCollection2.getAll());
            //     console.log('userTestCollection3', userTestCollection3.getAll());

            //     console.log('userTestCollection3 getByIndes 0', userTestCollection3.getByIndex(0));
            //     console.log('userTestCollection3 getByIndes 1', userTestCollection3.getByIndex(1));
            //     console.log('userTestCollection3 getByIndes length-1', userTestCollection3.getByIndex(userTestCollection3.getSize() - 1));
            //     console.log('userTestCollection3 getByIndes length', userTestCollection3.getByIndex(userTestCollection3.getSize()));


            //     var id, objByIndex, idNotFound = '1';

            //     objByIndex = userTestCollection3.getByIndex(0);
                
            //     id = objByIndex && objByIndex.id ? objByIndex.id : null;

            //     console.log('userTestCollection3 getByIndes id', id, userTestCollection3.findById(id));
            //     console.log('userTestCollection3 getByIndes idNotFound', idNotFound, userTestCollection3.findById(idNotFound));


            //     console.log('userTestCollection3 length before create', userTestCollection3.getSize());
            //     var newObj = userTestCollection3.create();
            //     console.log('userTestCollection3 length after create', userTestCollection3.getSize());
            //     console.log('newObj create', newObj);

            //     var updatedObjBefor = userTestCollection3.getByIndex(1), updatedObjAfter;
            //     console.log('updatedObjBefor', updatedObjBefor);
            //     updatedObjAfter = userTestCollection3.update(updatedObjBefor.id, {name: 'new name'});
            //     console.log('updatedObjAfter', updatedObjAfter);
            //     console.log('updatedObjBefor1', updatedObjBefor);

            //     userTestCollection3.deleteById(id);
            //     console.log('userTestCollection3 length after deleteById', userTestCollection3.getSize());

            //     userTestCollection3.deleteByIndex(5);
            //     console.log('userTestCollection3 length after deleteByIndex', userTestCollection3.getSize());

            // }