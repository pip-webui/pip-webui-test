/**
 * @file MockedFeedbacksResource
 * @copyright Digital Living Software Corp. 2014-2016
 * 
 * Mocked:
 * GET /api/feedbacks
 * POST /api/feedbacks
 * GET /api/feedbacks/:id
 * PUT /api/feedbacks/:id
 * DELETE /api/feedbacks/:id
 */

(function () {
    'use strict';

    var thisModule = angular.module('pipMocked.Feedbacks', ['ngMockE2E', 'ngResource']);

    thisModule.factory('MockedFeedbacksResource', function ($httpBackend, $log, MockedResource) {
        var child = Object.create(MockedResource);

        child.api = '/api/feedbacks';

        child.register = function() {

            // GET /api/feedbacks
            $httpBackend.whenGET(child.fakeUrl + child.api)
                .respond(function(method, url, data, headers, params) {
                console.log('MockedFeedbacksResource whenGET collection', method, url, data, headers, params);
                var feedback, 
                    feedbacks = child.dataset.get('FeedbacksTestCollection'),
                    feedbacksCollection;
                  
                    if (!feedbacks) {
                        throw new Error('MockedFeedbacksResource: Feedbacks collection is not found')
                    }

                    feedbacksCollection = feedbacks.getAll();

                    return [200, feedbacksCollection, {}];                    
                });

            // POST /api/feedbacks
            $httpBackend.whenPOST(child.fakeUrl + child.api)
                .respond(function(method, url, data, headers, params) {
                    console.log('MockedFeedbacksResource whenPOST', method, url, data, headers, params);
                    var feedback, 
                        feedbackData = angular.fromJson(data),
                        feedbacks= child.dataset.get('FeedbacksTestCollection'),
                        feedbacksCollection;

                    if (!feedbackData || !feedbackData['id']) {
                        console.log('post feedback', feedbackData);
                        throw new Error('MockedFeedbacksResource: feedback id is not specified')
                    }

                    if (!feedbacks) {
                        throw new Error('MockedFeedbacksResource: Feedbacks collection is not found')
                    }

                    feedbacksCollection = feedbacks.getAll();
                    feedback = _.find(feedbacksCollection, {id: feedbackData.id});

                    if (feedback && feedback.id) {
                        var error = child.getError('1104'); //todo error code

                        return [error.StatusCode, error.request, error.headers];
                    }

                    // add feedback to collection
                    feedback = feedbacks.create(feedbackData);

                    return [200, feedback, {}];
                }); 

            // GET /api/feedbacks/:id
            $httpBackend.whenGET(new RegExp(child.regEsc(child.fakeUrl + child.api + '/') + child.IdRegExp + child.EndStringRegExp))
                .respond(function(method, url, data, headers, params) {
                    console.log('MockedFeedbacksResource whenGET feedback', method, url, data, headers, params);
                    var feedback, 
                        idParams,
                        feedbackId,
                        feedbacks= child.dataset.get('FeedbacksTestCollection');

                    idParams = child.getUrlIdParams(url);

                    if (!idParams || idParams.length == 0) {
                        throw new Error('MockedFeedbacksResource: id is not specified into url')
                    }

                    feedbackId = idParams[0];
                    if (!feedbacks) {
                        throw new Error('MockedFeedbacksResource: Feedbacks collection is not found')
                    }

                    feedback = feedbacks.findById(feedbackId);
                    console.log('MockedFeedbacksResource whenGET feedback', feedback);
                    
                    return [200, feedback, {}];
                });

            // PUT /api/feedbacks/:id
            $httpBackend.whenPUT(new RegExp(child.regEsc(child.fakeUrl + child.api + '/') + child.IdRegExp + child.EndStringRegExp))
                .respond(function(method, url, data, headers, params) {
                    console.log('MockedFeedbacksResource whenPUT', method, url, data, headers, params);
                    var feedback, 
                        feedbackData = angular.fromJson(data),
                        idParams,
                        feedbackId,
                        feedbacks= child.dataset.get('FeedbacksTestCollection');

                    idParams = child.getUrlIdParams(url);

                    if (!idParams || idParams.length == 0) {
                        throw new Error('MockedFeedbacksResource: id is not specified into url')
                    }

                    feedbackId = idParams[0];
                    if (!feedbacks) {
                        throw new Error('MockedFeedbacksResource: Feedbacks collection is not found')
                    }

                    feedback = feedbacks.findById(feedbackId);
                    feedback = feedbacks.update(feedbackId, feedbackData);
                    console.log('MockedFeedbacksResource whenPUT feedback', feedback);
                    
                    return [200, feedback, {}];
                });   

            // DELETE /api/feedbacks/:id
            $httpBackend.whenDELETE(new RegExp(child.regEsc(child.fakeUrl + child.api + '/') + child.IdRegExp + child.EndStringRegExp))
                .respond(function(method, url, data, headers, params) {
                    console.log('MockedFeedbacksResource whenDELETE', method, url, data, headers, params);
                    var feedback, 
                        feedbackData = angular.fromJson(data),
                        idParams,
                        feedbackId,
                        feedbacks= child.dataset.get('FeedbacksTestCollection');

                    idParams = child.getUrlIdParams(url);

                    if (!idParams || idParams.length == 0) {
                        throw new Error('MockedFeedbacksResource: id is not specified into url')
                    }

                    feedbackId = idParams[0];
                    if (!feedbacks) {
                        throw new Error('MockedFeedbacksResource: Feedbacks collection is not found')
                    }

                    feedback = feedbacks.findById(feedbackId);
                    if (!feedback || !feedback.id) {
                        var error = child.getError('1106');

                        return [error.StatusCode, error.request, error.headers];
                    }

                    console.log('MockedFeedbacksResource whenDELETE feedback', feedback);
                    feedbacks.deleteById(feedback.id);
                    console.log('feedbackscollection', feedbacks.getAll());

                    return [200, "OK", {}];
                });     
                   
        }

        return child;
    });

})();