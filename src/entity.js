/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module('pipTest.Entity', ['pipTest.DataSet', 'pipTest.General']);

    thisModule.service('pipTestEntity', function (pipTestGeneral) {

            return {

                getEntity: getEntity,

                setContrib: setContrib,

                getOneArea: getOneArea,

                getAreasCollection: getAreasCollection,

                getOneGoal: getOneGoal,

                getGoalsCollection: getGoalsCollection
            };

            // get entity
            function getEntity(propertyValues) {
                var userId,
                    userName,
                    id,
                    titleLength;

                userId = pipTestGeneral.getObjectId();
                userName = getRandomString();
                id = pipTestGeneral.getObjectId();
                titleLength = 1 + Math.random() * 5;

                var entity = {
                    "title": getText(titleLength),
                    "type": "goal",
                    "creator_id": userId,
                    "creator_name": userName,
                    "contribs": [
                        {
                            "from_id": id,
                            "party_id": userId,
                            "party_name": "emptyUser",
                            "accept": "accepted",
                            "role": ""
                        }
                    ],
                    "tags": [],
                    "id": id
                };
                if (propertyValues) entity = _.assign(entity, propertyValues);

                return entity;
            };

            // Set Contrib (entity, parties, contribCount)
            function setContrib(party, partyArray, minContribCount, maxContribCount) {
                if (!party || !partyArray) return;

                var count, i, chooseParty = [];

                if (minContribCount && maxContribCount)
                    count = Math.floor(Math.random() * (maxContribCount - minContribCount + 1));
                else {
                    if (!minContribCount)
                        count = Math.floor(Math.random() * partyArray.length);
                    else
                        count = Math.floor(Math.random() * (partyArray.length - maxContribCount));
                }

                chooseParty = _.take(partyArray, count);
                _.each(chooseParty, function (item) {
                    party.contribs.push({
                        party_name: item.name,
                        party_id: item.id,
                        accept: pipTestGeneral.getOne(['accepted', 'invited'])
                    });
                });

                party.contribs = _.uniq(party.contribs, 'party_id');
            };

              // get area
            function getOneArea(forUser, propertyValues) {
                var area,
                    params = {};

                params.type = 'area';
                if (forUser && forUser.name) {
                    params.creator_name = forUser.name;
                    params.creator_id = forUser.id;
                }
                area = getEntity(params, propertyValues);

                return area;
            };

            function getAreasCollection(count, forUser, propertyValues) {
                var i,
                    collection = [],
                    area,
                    params = {};

                params.type = 'area';
                if (forUser && forUser.name) {
                    params.creator_name = forUser.name;
                    params.creator_id = forUser.id;
                }

                for ( i = 0; i < count; i++ ) {
                    area = getEntity(params, propertyValues);
                    collection.push(area);
                }

                return collection;
            };

            // get goal
            function getOneGoal(forUser, propertyValues) {
                var goal,
                    params = {};

                params.type = pipTestGeneral.getOne(['goal', 'aspiration', 'objective', 'dream', 'accomplishment']);
                if (forUser && forUser.name) {
                    params.creator_name = forUser.name;
                    params.creator_id = forUser.id;
                }
                goal = getEntity(params, propertyValues);

                return goal;
            };

            function getGoalsCollection(count, forUser, propertyValues) {
                var i,
                    collection = [],
                    goal,
                    params = {};

                params.type = getOne(['goal', 'aspiration', 'objective', 'dream', 'accomplishment']);
                if (forUser && forUser.name) {
                    params.creator_name = forUser.name;
                    params.creator_id = forUser.id;
                }

                for ( i = 0; i < count; i++ ) {
                    goal = getEntity(params, propertyValues);
                    collection.push(goal);
                }

                return collection;
            };

            function getTags() {
                //{
                //    "party_id": "55f1ee67880929ec46ec394c",
                //    "tags": [
                //    {
                //        "tag": "first tag",
                //        "used": "2015-11-19T14:45:57.901Z",
                //        "count": 39
                //    },
                //    {
                //        "tag": "6",
                //        "used": "2015-09-16T12:08:11.316Z",
                //        "count": 1
                //    },
                //    {
                //        "tag": "yyyyyyyyyyyyyyy",
                //        "used": "2015-09-24T16:20:09.244Z",
                //        "count": 4
                //    }
                //],
                //    "id": "55f5edcf8175ba46db9dec74"
                //}

            }

            function getOneTag() {

            };

        }

    );

})();
