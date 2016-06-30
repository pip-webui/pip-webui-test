/**
 * @file Mock entry data
 * @copyright Digital Living Software Corp. 2014-2015
 */

(function (_, chance) {
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
                titleLength,
                entity;

            userId = pipTestGeneral.getObjectId();
            userName = chance.sentence({words: 2});
            id = pipTestGeneral.getObjectId();
            titleLength = 1 + Math.random() * 5;

            entity = {
                title: chance.sentence({words: titleLength}),
                type: 'goal',
                creator_id: userId,
                creator_name: userName,
                contribs: [{
                    from_id: id,
                    party_id: userId,
                    party_name: 'emptyUser',
                    accept: 'accepted',
                    role: ''
                }],
                tags: [],
                id: id
            };

            if (propertyValues) {
                entity = _.assign(entity, propertyValues);
            }

            return entity;
        }

        // Set Contrib (entity, parties, contribCount)
        function setContrib(party, partyArray, minContribCount, maxContribCount) {
            if (!party || !partyArray) {
                return;
            }

            var count,
                chooseParty;

            if (minContribCount && maxContribCount) {
                count = Math.floor(Math.random() * (maxContribCount - minContribCount + 1));
            } else {
                count = minContribCount
                    ? Math.floor(Math.random() * (partyArray.length - maxContribCount))
                    : Math.floor(Math.random() * partyArray.length);
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
        }

        // get area
        function getOneArea(forUser, propertyValues) {
            var params = {};

            params.type = 'area';

            if (forUser && forUser.name) {
                params.creator_name = forUser.name;
                params.creator_id = forUser.id;
            }

            return getEntity(params, propertyValues);
        }

        function getAreasCollection(count, forUser, propertyValues) {
            var collection = [],
                params = {},
                i;

            params.type = 'area';

            if (forUser && forUser.name) {
                params.creator_name = forUser.name;
                params.creator_id = forUser.id;
            }

            for (i = 0; i < count; i++) {
                collection.push(getEntity(params, propertyValues));
            }

            return collection;
        }

        // get goal
        function getOneGoal(forUser, propertyValues) {
            var params = {};

            params.type = pipTestGeneral.getOne(['goal', 'aspiration', 'objective', 'dream', 'accomplishment']);

            if (forUser && forUser.name) {
                params.creator_name = forUser.name;
                params.creator_id = forUser.id;
            }

            return getEntity(params, propertyValues);
        }

        function getGoalsCollection(count, forUser, propertyValues) {
            var i,
                collection = [],
                params = {};

            params.type = pipTestGeneral.getOne(['goal', 'aspiration', 'objective', 'dream', 'accomplishment']);

            if (forUser && forUser.name) {
                params.creator_name = forUser.name;
                params.creator_id = forUser.id;
            }

            for (i = 0; i < count; i++) {
                collection.push(getEntity(params, propertyValues));
            }

            return collection;
        }

        // function getTags() {
            // {
            //    'party_id': '55f1ee67880929ec46ec394c',
            //    'tags': [
            //    {
            //        'tag': 'first tag',
            //        'used': '2015-11-19T14:45:57.901Z',
            //        'count': 39
            //    },
            //    {
            //        'tag': '6',
            //        'used': '2015-09-16T12:08:11.316Z',
            //        'count': 1
            //    },
            //    {
            //        'tag': 'yyyyyyyyyyyyyyy',
            //        'used': '2015-09-24T16:20:09.244Z',
            //        'count': 4
            //    }
            // ],
            //    'id': '55f5edcf8175ba46db9dec74'
            // }
        // }

    });

})(window._, window.chance);
