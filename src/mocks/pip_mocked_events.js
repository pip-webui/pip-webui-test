/**
 * @file MockedEventsResource
 * @copyright Digital Living Software Corp. 2014-2016
 * 
 * Mocked:
 * /api/events/:id
 * 
 */

(function () {
    'use strict';

    var thisModule = angular.module('pipMocked.Events', ['ngMockE2E', 'ngResource']);

    thisModule.factory('MockedEventsResource', function ($httpBackend, $log, MockedResource) {
        var child = Object.create(MockedResource);

        child.api = '/api/events';

        child.register = function() {

            // GET /api/events
            $httpBackend.whenGET(child.fakeUrl + child.api)
                .respond(function(method, url, data, headers, params) {
                var events = child.dataset.get('EventsTestCollection'),
                    eventsCollection;
                  
                    if (!events) {
                        throw new Error('MockedEventsResource: Events collection is not found')
                    }

                    eventsCollection = events.getAll();

                    return [200, eventsCollection, {}];                    
                });

            // GET /api/events/:id
            $httpBackend.whenGET(new RegExp(child.regEsc(child.fakeUrl + child.api + '/') + child.IdRegExp + child.EndStringRegExp))
                .respond(function(method, url, data, headers, params) {
                    ('MockedEventsResource whenGET event', method, url, data, headers, params);
                    var event, 
                        idParams,
                        eventId,
                        events = child.dataset.get('EventsTestCollection');

                    idParams = child.getUrlIdParams(url);

                    if (!idParams || idParams.length == 0) {
                        throw new Error('MockedEventsResource: id is not specified into url')
                    }

                    eventId = idParams[0];
                    if (!events) {
                        throw new Error('MockedEventsResource: Events collection is not found')
                    }

                    event = events.findById(eventId);
                    
                    return [200, event, {}];
                });
                     
        }
                   
        return child;
    });

})();