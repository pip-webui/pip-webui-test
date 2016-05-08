/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module('pipTest.UserParty', ['pipTest.DataSet']);

    thisModule.service('pipTestUserParty', function (pipTestDataSet, pipTestGeneral) {

            return {

                getOneUser: getOneUser,

                getSettings: getSettings,

                getParty: getParty,

                getConnection: getConnection,

                getPartyAccess: getPartyAccess,

                getSession: getSession

            };

            function getSession(propertyValues) {
                var date = new Date(chance.timestamp()),
                    session = {
                        "address": chance.ip(),
                        "client": pipTestGeneral.getOne(['chrome', 'mozilla', 'explorer']),
                        "platform": pipTestGeneral.getOne(['windows 8', 'windows 7', 'linux']),
                        "last_req": date.toJSON(),
                        "opened": date.toJSON(),
                        "id": session_id
                    };

                if (propertyValues) session = _.assign(session, propertyValues);

                return session;
            }

            // get user for testing
            function getOneUser(propertyValues) {
                var
                    session_id = pipTestGeneral.getObjectId(),
                    date1 = chance.timestamp(),
                    date2 = chance.timestamp();

                var user = {
                    "pwd_last_fail": null,
                    "pwd_fail_count": 0,
                    "name": chance.first() + ' ' + chance.name(),
                    "email": chance.email(),
                    "language": pipTestGeneral.getOne(['en', 'ru', 'fr']),
                    "paid": chance.bool({likelihood: 30}),
                    "admin": false,
                    "party_access": getPartyAccess(),
                    "sessions": getSession(),
                    "signin": date1 > date2 ? new Date(date1).toJSON() : new Date(date2).toJSON(),
                    "signup": date1 > date2 ? new Date(date2).toJSON() : new Date(date1).toJSON(),
                    "active": true,
                    "lock": false,
                    "email_ver": false,
                    "id": pipTestGeneral.getObjectId(),
                    "last_session_id": session_id
                };

                if (propertyValues) user = _.assign(user, propertyValues);

                return user;
            };

            function getPartyAccess(n, propertyValues) {
                var result = [],
                    n = n ? n : Math.floor(Math.random() * 10),
                    i;

                for (i = 0; i < n; i++) {
                    var isContributor = chance.bool({likelihood: 30});

                    var p = {
                        "share_level": 0,
                        "type": "partner",
                        "party_name": chance.first() + ' ' + chance.name(),
                        "party_id": pipTestGeneral.getObjectId(),
                        "contributor": isContributor,
                        "manager": isContributor ? chance.bool({likelihood: 30}) : false,
                        "id": pipTestGeneral.getObjectId()
                    };
                    if (propertyValues) p = _.assign(p, propertyValues);

                    result.push(p);
                }

                return result;
            };

            function getParty(propertyValues) {
                var date1 = chance.timestamp(),
                    date2 = chance.timestamp();

                var party = {
                    "name": chance.first() + ' ' + chance.name(),
                    "email": chance.email(),
                    "type": "person", // todo ??
                    "gender": chance.gender().toLowerCase(),
                    "loc_name": chance.address(),
                        "loc_pos": {
                        "type": "Point",
                            "coordinates": [
                                chance.floating({min: -120, max: 120}),
                                chance.floating({min: -120, max: 120})
                            ]
                    },
                    "join": "approve", // todo ??
                    "updated": date1 > date2 ? new Date(date1).toJSON() : new Date(date2).toJSON(),
                    "created": date1 > date2 ? new Date(date2).toJSON() : new Date(date1).toJSON(),
                    "id": pipTestGeneral.getObjectId()
                };

                if (propertyValues) party = _.assign(party, propertyValues);

                return party;
            }

            function getConnection(party, propertyValues) {
                if (!party || !party.id || !party.name) return null;
                var isContributor = chance.bool({likelihood: 30});

                var con = {
                    "party_id": party.id,
                    "party_type": party.type,
                    "party_name": party.name,
                    "to_party_id": pipTestGeneral.getObjectId(),
                    "to_party_name": chance.first() + ' ' + chance.name(),
                    "to_party_type": "person", //todo
                    "type": "partner", //todo
                    "share_level": chance.integer({min: 0, max: 4}) ,
                    "accept": "joined", //todo
                    "group_ids": [],
                    "contributor": isContributor,
                    "manager": isContributor ? chance.bool({likelihood: 30}) : false,
                    "snoozed": false,
                    "created": new Date(chance.timestamp()).toJSON(),
                    "id": pipTestGeneral.getObjectId()
                };

                if (propertyValues) con = _.assign(con, propertyValues);

                return con;
            };

            // get settings
            function getSettings(number) {
                if (number && number == 2) return pipTestDataSet.SETTINGS2;

                return pipTestDataSet.SETTINGS1;
            };

        }
    );

})();
