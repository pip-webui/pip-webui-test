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
                "name": "Миньошка",
                "email": "1@1.com",
                "language": "en",
                "pwd_fail_count": 0,
                "pwd_last_fail": null,
                "theme": "orange",
                "email_config": {
                    "engage": true,
                    "due": true,
                    "comment": true,
                    "join": true,
                    "follow": false,
                    "response": true,
                    "invite": false,
                    "message": false
                },
                "paid": false,
                "admin": true,
                "party_access": [
                    {
                        "share_level": 3,
                        "type": "member",
                        "party_name": "киця1",
                        "party_id": "56b0a214e8540ddb54705fd4",
                        "contributor": true,
                        "manager": true,
                        "id": "56b0a215e8540ddb54705fd8"
                    },
                    {
                        "share_level": 0,
                        "type": "partner",
                        "party_name": "kitty",
                        "party_id": "56740d3886153bef572804f5",
                        "contributor": false,
                        "manager": false,
                        "id": "56b36e322dd75a9663fc79c8"
                    }
                ],
                "sessions": [
                    {
                        "address": "176.37.183.138",
                        "client": "chrome",
                        "platform": "mobile",
                        "last_req": "2016-07-27T13:52:52.041Z",
                        "opened": "2016-07-27T11:02:23.445Z",
                        "id": "579894bf58270790720df9ee"
                    }
                ],
                "signin": "2016-07-27T13:53:03.049Z",
                "signup": "2015-12-02T15:49:03.466Z",
                "active": true,
                "lock": false,
                "email_ver": false,
                "id": "565f12ef8ff2161b1dfeedbf",
                "last_session_id": "579894bf58270790720df9ee"
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
