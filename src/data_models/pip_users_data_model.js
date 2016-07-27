/*
 *
 * (с) Digital Living Software Corp. 2014-2016
 */

/* global angular */

(function (_) {
    'use strict';

    var thisModule = angular.module('pipFakeDataModel.Users', []);

    thisModule.service('pipFakeDataModelUsers', function (pipTestGeneral) {

        this.data = [
            {

            }     
        ];
        
        this.getData = function() {
            return this.data;
        };
        
        this.setData = function(data) {
            this.data = data;
        };
    
        this.findOne = function(userId) {
            // find the user that matches that id
            var user;

            return user;
        };
    
        this.findAll = function() {
            return this.getData();
        };
        
        this.findMany = function(options) {
            var users;

            return users;       
        };
        
        this.addOne = function(newUser) {
            // must calculate a unique ID to add the new data
            var newId = this.newId();
            newUser.id = newId;
            this.data.push(newUser);

            return newUser;
        };
        
        // return an id to insert a new data item at
        this.newId = function() {
            var newId = pipTestGeneral.getObjectId();

            return newId;
        };
        
        this.updateOne = function(userId, user) {
            // find the user that matches that id
            var users = this.getData(),
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
        };
        
        this.deleteOne = function(userId) {
            // find the user that matches that id
            var users = this.getData(),
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
        };
    });

})(window._);
