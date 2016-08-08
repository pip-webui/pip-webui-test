/**
 * @file Rest API enumerations service
 * @copyright Digital Living Software Corp. 2014-2016
 */
 
 /* global _, angular */

(function () {
    'use strict';

    var thisModule = angular.module('PipResources.Error', []);

    thisModule.factory('PipResourcesError', function () {

        var Errors = {};
        
        Errors['1104'] = {
            StatusCode: 400,
            StatusMessage: 'Bad Request',
            request: {
                code: 1104,
                name: 'Bad Request',
                message: 'Email is already registered'
            },
            headers: {}
        };
        Errors['1106'] = {
            StatusCode: 400,
            StatusMessage: 'Bad Request',
            request: {
                code: 1106,
                name: 'Bad Request',
                message: 'User was not found'
            },
            headers: {}
        };
        Errors['1103'] = {
            StatusCode: 400,
            StatusMessage: 'Bad Request',
            request: {
                code: 1103,
                name: 'Bad Request',
                message: 'Invalid email verification code'
            },
            headers: {}
        };
        Errors['1108'] = {
            StatusCode: 400,
            StatusMessage: 'Bad Request',
            request: {
                code: 1108,
                name: 'Bad Request',
                message: 'Invalid password recovery code'
            },
            headers: {}
        };

        return Errors;
    });
    
})();
