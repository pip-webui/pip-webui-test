(function (angular) {
    'use strict';

    var thisModule = angular.module('appTests.GASMocks', []);

    thisModule.config(function (pipTranslateProvider) {
        pipTranslateProvider.translations('en', {
            SAMPLE: 'sample'
        });
        pipTranslateProvider.translations('ru', {
            SAMPLE: 'пример'
        });
    });

    thisModule.controller('GASMocksController',
        function ($scope, pipAppBar, $timeout, $http, 
            pipBasicGeneratorServices, pipNodeDataGenerator, pipEventDataGenerator,
            TestCollection, pipTestDataService) {

            var dataset = prepareData();

            $scope.onNodesGET = onNodesGET;
            $scope.onNodeGET = onNodeGET;
            $scope.onNodeEventsGET = onNodeEventsGET;
            $scope.onEventsGET = onEventsGET;
            $scope.onEventGET = onEventGET;

            pipAppBar.showMenuNavIcon();
            pipAppBar.showLanguage();
            pipAppBar.showTitleText('MOCKS');

            return;

            function prepareData() {
                var nodes,
                    tcNodes, tcEvents,
                    usersRefs = new Array(),
                    dataSet;
                    
                // create dataset    
                dataSet = pipTestDataService.getDataset();

                // create collection without references
                tcNodes = new TestCollection(pipNodeDataGenerator, 'NodesTestCollection', 20);
                // init collection
                tcNodes.init();

                // add collection to dataset
                dataSet.add(tcNodes);

                // form references for users collection
                usersRefs['Nodes'] = tcNodes.getAll();

                // create users collection   
                tcEvents = new TestCollection(pipEventDataGenerator, 'EventsTestCollection', 100, usersRefs);   
                dataSet.add(tcEvents);

                // init collection
                dataSet.init();

                var events, nodes;

                events = dataSet.get('EventsTestCollection').getAll();
                nodes = dataSet.get('NodesTestCollection').getAll();

                console.log('EventsTestCollection', events);
                console.log('NodesTestCollection', nodes);

                return dataSet;
            }
            
            // Node APi 
            // ----------------------

            function onNodesGET() {
                 
            }    
            
            function onNodeGET() {
               
            }   
            
            // Events APi 
            // ----------------------

            function onNodeEventsGET() {
               
            }  
            
            function onEventsGET() {
             
            }      

            function onEventGET() {
               
            }    
            
        }
    );

})(window.angular);
