/**
 * @file MockedNodeResource
 * @copyright Digital Living Software Corp. 2014-2016
 * 
 * Mocked:
 * /api/parties/:id
 * /api/parties/:party_id/settings
 * 
 */

(function () {
    'use strict';

    var thisModule = angular.module('pipMocked.Nodes', ['ngMockE2E', 'ngResource']);

    thisModule.factory('MockedNodeResource', function ($httpBackend, $log, MockedResource) {
        var child = Object.create(MockedResource);

        child.api = '/api/nodes';

        child.register = function() {

            // GET /api/parties
            $httpBackend.whenGET(child.fakeUrl + child.api)
                .respond(function(method, url, data, headers, params) {
                console.log('MockedNodeResource whenGET collection', method, url, data, headers, params);
                var nodes = child.dataset.get('NodesTestCollection'),
                    nodesCollection;
                  
                    if (!nodes) {
                        throw new Error('MockedNodeResource: Nodes collection is not found')
                    }

                    nodesCollection = nodes.getAll();

                    return [200, nodesCollection, {}];                    
                });

            // GET /api/nodes/:id
            $httpBackend.whenGET(new RegExp(child.regEsc(child.fakeUrl + child.api + '/') + child.IdRegExp + child.EndStringRegExp))
                .respond(function(method, url, data, headers, params) {
                    console.log('MockedNodeResource whenGET node', method, url, data, headers, params);
                    var node, 
                        idParams,
                        nodeId,
                        nodes = child.dataset.get('NodesTestCollection');

                    idParams = child.getUrlIdParams(url);

                    if (!idParams || idParams.length == 0) {
                        throw new Error('MockedNodeResource: id is not specified into url')
                    }

                    nodeId = idParams[0];
                    if (!nodes) {
                        throw new Error('MockedNodeResource: Nodes collection is not found')
                    }

                    node = nodes.findById(nodeId);
                    console.log('MockedNodeResource whenGET node', node);
                    
                    return [200, node, {}];
                });

            // GET /api/nodes/:id/events
            $httpBackend.whenGET(new RegExp(child.regEsc(child.fakeUrl + child.api + '/') + child.IdRegExp+ child.regEsc('/events') + child.EndStringRegExp))
                .respond(function(method, url, data, headers, params) {
                    console.log('MockedNodeResource whenGET events for node', method, url, data, headers, params);
                    var events,
                        nodeId, 
                        idParams,
                        events = child.dataset.get('EventsTestCollection'),
                        eventsCollection, nodeEventsCollection;

                    idParams = child.getUrlIdParams(url);

                    if (!idParams || idParams.length == 0) {
                        throw new Error('MockedNodeResource: id is not specified into url')
                    }

                    nodeId = idParams[0];

                    eventsCollection = events.getAll();

                    nodeEventsCollection = _.filter(eventsCollection, function (item) {
                        console.log('compaere', item.node_id == nodeId);
                        return item.node_id == nodeId;
                    });

                    return [200, nodeEventsCollection || [], {}];                   
                });

            // PUT /api/nodes/:id
            $httpBackend.whenPUT(new RegExp(child.regEsc(child.fakeUrl + child.api + '/') + child.IdRegExp + child.EndStringRegExp))
                .respond(function(method, url, data, headers, params) {
                    console.log('MockedNodeResource whenPUT', method, url, data, headers, params);
                    var node, 
                        nodeData = angular.fromJson(data),
                        idParams,
                        nodeId,
                        nodes = child.dataset.get('NodesTestCollection');

                    idParams = child.getUrlIdParams(url);

                    if (!idParams || idParams.length == 0) {
                        throw new Error('MockedNodeResource: id is not specified into url')
                    }

                    nodeId = idParams[0];
                    if (!nodes) {
                        throw new Error('MockedNodeResource: Node collection is not found')
                    }

                    node = nodes.findById(nodeId);
                    node = nodes.update(nodeId, nodeData);
                    console.log('MockedNodeResource whenPUT node', node);
                    
                    return [200, node, {}];
                });   
                     
        }
                   
        return child;
    });

})();