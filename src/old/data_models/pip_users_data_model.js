/*
 *
 * (с) Digital Living Software Corp. 2014-2016
 */

/* global angular */

(function (_) {
    'use strict';

    var thisModule = angular.module('pipFakeDataModel.Users', []);

    thisModule.service('pipFakeDataModelUsers', function (pipBasicGeneratorServices, pipDataGeneratorUserParty) {

        var usersCollection = [];

        return {
            dataGenerate: dataGenerate,
            getData: getData,
            setData: setData,
            findOne: findOne,
            findAll: findAll,
            findMany: findMany,
            addOne: addOne,
            updateOne: updateOne,
            deleteOne: deleteOne
        };

        function dataGenerate (n) {
            var newUser, i,
                length = n > 0 ? n : 10;

            usersCollection = [];

            for (i = 0; i < length; i++) {
                newUser = pipDataGeneratorUserParty.getOneUser();
                usersCollection.push(newUser);
            }

            return usersCollection;
        }
        
        function getData () {
            return usersCollection;
        }
        
        function setData (data) {
            usersCollection = data;
        }
    
        function findOne (params) {
            // find the user that matches that params
            var user = _.find(usersCollection, params) || [];

            return user[0] || null;
        }
    
        function findAll () {
            return getData();
        }
        
        function findMany(params) {
            var users = _.find(usersCollection, params) || [];

            return users;
        }
        
        function addOne(data) {
            // must calculate a unique ID to add the new data
            var newUser;

            newUser = pipDataGeneratorUserParty.getOneUser(data);
            usersCollection.push(newUser);

            return newUser;
        }
        
        function updateOne(userId, user) {
            // find the user that matches that id
            var users = getData(),
                match = null,
                i;

            for (i = 0; i < users.length; i++) {
                if(users[i].id == userId) {
                    match = users[i];
                    break;
                }
            }

            if(!angular.isObject(match)) {
                return {};
            }

            angular.extend(match, user);

            return match;
        }
        
        function deleteOne (userId) {
            // find the user that matches that id
            var users = getData(),
                match = false, 
                i;

            for (i = 0; i < users.length; i++) {
                if(users[i].id == userId) {
                    match = true;
                    users.splice(i, 1);
                    break;
                }
            }

            return match;
        }
    });

})(window._);
