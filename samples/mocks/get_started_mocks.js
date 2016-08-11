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
            $scope.onNodePUT = onNodePUT;
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
                    eventsRefs = {},
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
                eventsRefs['Nodes'] = _.cloneDeep(tcNodes.getAll());

                // create events collection   
                tcEvents = new TestCollection(pipEventDataGenerator, 'EventsTestCollection', 100, eventsRefs);   
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
                  var req = {
                        method: 'GET',
                        url: pipBasicGeneratorServices.serverUrl() + '/api/nodes',
                        headers: {'Content-Type': undefined},
                        data: null
                    };

                console.log('onNodesGET req', req);

                $http(req)
                    .success(function (result) {
                        console.log('onNodesGET result', result); 
                    })
                    .error(function (error) {
                        console.log('onNodesGET error', error); 
                    }
                );
            }    
            
            function onNodeGET() {
               var node,
                    index,
                    count,
                    nodes = dataset.get('NodesTestCollection'),
                    req;

                if (!nodes) {
                    throw new Error('GASMocksController: Nodes collection is not found');
                } 

                count = nodes.getAll().length;
                if (count === 0) {
                    throw new Error('GASMocksController: Nodes collection is empty');
                } 

                index = _.random(count - 1);
                node = nodes.getByIndex(index);
                if (!node || !node.id) {
                    throw new Error('GASMocksController: Nodes collection is empty');
                }

                req = {
                        method: 'GET',
                        url: pipBasicGeneratorServices.serverUrl() + '/api/nodes/' + node.id,
                        headers: { 'Content-Type': undefined }
                     };
                console.log('onNodeGET req', req);

                $http(req)
                    .success(function (result) {
                        console.log('onNodeGET result', result); 
                    })
                    .error(function (error) {
                        console.log('onNodeGET error', error); 
                    }
                );
            }   

            // /api/nodes/:node_id/events
            function onNodeEventsGET() {
               var node,
                    index,
                    count,
                    nodes = dataset.get('NodesTestCollection'),
                    req;

                if (!nodes) {
                    throw new Error('GASMocksController: Nodes collection is not found');
                } 

                count = nodes.getAll().length;
                if (count === 0) {
                    throw new Error('GASMocksController: Nodes collection is empty');
                } 

                index = _.random(count - 1);
                node = nodes.getByIndex(index);
                if (!node || !node.id) {
                    throw new Error('GASMocksController: Nodes collection is empty');
                }

                req = {
                        method: 'GET',
                        url: pipBasicGeneratorServices.serverUrl() + '/api/nodes/' + node.id + '/events',
                        headers: { 'Content-Type': undefined }
                     };
                console.log('onNodeGET req', req);

                $http(req)
                    .success(function (result) {
                        console.log('onNodeGET result', result); 
                    })
                    .error(function (error) {
                        console.log('onNodeGET error', error); 
                    }
                );               
            }  

            function onNodePUT() {
                var node,
                    index,
                    count,
                    nodes = dataset.get('NodesTestCollection'),
                    req;

                if (!nodes) {
                    throw new Error('GASMocksController: Nodes collection is not found');
                } 

                count = nodes.getAll().length;
                if (count === 0) {
                    throw new Error('GASMocksController: Nodes collection is empty');
                } 

                index = _.random(count - 1);
                node = nodes.getByIndex(index);
                if (!node || !node.id) {
                    throw new Error('GASMocksController: Nodes collection is empty');
                }
                     
                // change node
                node.temperature = chance.integer({min: -40, max: 50});
                node.radiation_level = chance.bool({likelihood: 70}) ? chance.floating({fixed: 2, min: 0, max: 5}) : chance.floating({fixed: 2, min: 0, max: 22});

                req = {
                    method: 'PUT',
                    url: pipBasicGeneratorServices.serverUrl() + '/api/nodes/' + node.id,
                    headers: {'Content-Type': undefined},
                    data: node
                };
                console.log('onNodePUT req', req);

                $http(req)
                    .success(function (result) {
                        console.log('onNodePUT result', result); 
                    })
                    .error(function (error) {
                        console.log('onNodePUT error', error); 
                    }
                );               
            }  
                        
            // Events APi 
            // ----------------------
            
            function onEventsGET() {
                  var req = {
                        method: 'GET',
                        url: pipBasicGeneratorServices.serverUrl() + '/api/events',
                        headers: {'Content-Type': undefined},
                        data: null
                    };

                console.log('onEventsGET req', req);

                $http(req)
                    .success(function (result) {
                        console.log('onEventsGET result', result); 
                    })
                    .error(function (error) {
                        console.log('onEventsGET error', error); 
                    }
                );             
            }      

            function onEventGET() {
               var event,
                    index,
                    count,
                    events = dataset.get('EventsTestCollection'),
                    req;

                if (!events) {
                    throw new Error('GASMocksController: Events collection is not found');
                } 

                count = events.getAll().length;
                if (count === 0) {
                    throw new Error('GASMocksController: Events collection is empty');
                } 

                index = _.random(count - 1);
                event = events.getByIndex(index);
                if (!event || !event.id) {
                    throw new Error('GASMocksController: Events collection is empty');
                }

                req = {
                        method: 'GET',
                        url: pipBasicGeneratorServices.serverUrl() + '/api/events/' + event.id,
                        headers: { 'Content-Type': undefined }
                     };
                console.log('onEventGET req', req);

                $http(req)
                    .success(function (result) {
                        console.log('onEventGET result', result); 
                    })
                    .error(function (error) {
                        console.log('onEventGET error', error); 
                    }
                );               
            }    
            
        }
    );

})(window.angular);
