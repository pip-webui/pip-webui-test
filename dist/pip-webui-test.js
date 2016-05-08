/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module('pipTest.Account', ['pipTest.DataSet']);

    thisModule.service('pipTestAccount', ['pipTestDataSet', function (pipTestDataSet) {

            return {
                getServerUrl: getServerUrl,
                getSamplerAccount: getSamplerAccount,
                getTesterAccount: getTesterAccount

            };

            // get server url
            function getServerUrl() {
                return pipTestDataSet.SERVER_URL;
            };

            // get account, users and parties
            function getSamplerAccount() {
                return pipTestDataSet.SAMPLER_ACCOUNT;
            };

            function getTesterAccount() {
                return pipTestDataSet.TESTER_ACCOUNT;
            };

        }]
    );

})();

/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module('pipTest.Content', ['pipTest.DataSet']);

    thisModule.service('pipTestContent', function () {

            return {

                getCheckList: getCheckList

            };

            // get entity
            function getCheckList(options) {
                function getText(optionTextType, optionLength) {
                    var text;
                    if (optionTextType)
                        switch (optionTextType) {
                            case 'word':
                                text = chance.word({length: optionLength});
                                break;
                            case 'sentence':
                                text = chance.sentence({words: optionLength});
                                break;
                            case 'paragraph':
                                text = chance.paragraph({sentences: optionLength});
                                break;
                        }
                    else text = chance.sentence({words: optionLength});

                    return text;
                };

                function getChecked(onlyCheck, onlyUnCheck) {
                    if (onlyCheck) return onlyCheck;
                    if (onlyUnCheck) return onlyUnCheck;
                    var checked = chance.bool();

                    return checked;
                };

                var size = 1 + Math.floor(Math.random() * 10),
                    onlyCheck = false,
                    onlyUnCheck = false,
                    optionTextType,// {word, sentence, paragraph}
                    optionLength,
                    checklistContent = [],
                    i = 0;

                if (options) {
                    size = options.size ? options.size : size;
                    onlyCheck = options.onlyCheck === true ? options.onlyCheck : onlyCheck;
                    onlyUnCheck = options.onlyUnCheck === true ? options.onlyUnCheck : onlyUnCheck;
                    optionTextType = options.optionTextType ? options.optionTextType : null;
                    optionLength = options.optionLength ? options.optionLength : null;
                }

                for (i = 0; i < size; i++) {
                    var item = {
                        text: getText(optionTextType, optionLength),
                        checked: getChecked(onlyCheck, onlyUnCheck)
                    }

                    checklistContent.push(item);
                }

                return checklistContent;
            };


        }

    );

})();

/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module('pipTest.DataSet', []);

    thisModule.service('pipTestDataSet', function () {

            var ABCD = 'abcdefghijklmnopqrstuvwxyz',
                ABCD_CAPITALIZE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
                DIGIT = '0123456789',
                SIGN = ' .,;:-!?';

            var SERVER_URL = 'http://alpha.pipservices.net';

            // define users
            var SAMPLER_ACCOUNT = {
                    name: 'Sampler User',
                    email: 'sampler@digitallivingsoftware.com',
                    password: 'test123',
                    language: 'en',
                    theme: ''
                },
                TESTER_ACCOUNT = {
                    name: 'Empty User',
                    email: 'emptyUser@test.ru',
                    password: '123456',
                    language: 'en',
                    theme: ''
                };

            var MANAGER_USER = {
                    "name": "manager_user",
                    "email": "test2piplife@mail.ru",
                    "language": "en",
                    "pwd_fail_count": 0,
                    "pwd_last_fail": null,
                    "paid": false,
                    "admin": false,
                    "party_access": [
                        {
                            "share_level": 0,
                            "type": "partner",
                            "party_name": "Bill Tester",
                            "party_id": "55f20e7b4b0c570c4b1f12e0",
                            "contributor": false,
                            "manager": false,
                            "id": "55f716315b46fab820dd8df3"
                        },
                        {
                            "share_level": 0,
                            "type": "partner",
                            "party_name": "emptyUser",
                            "party_id": "user_id00000000000000001",
                            "contributor": false,
                            "manager": false,
                            "id": "55f716315b46fab820dd8de4"
                        }
                    ],
                    "sessions": [
                        {
                            "address": "109.254.67.37",
                            "client": "chrome",
                            "platform": "windows 6.3",
                            "last_req": "2015-11-19T13:57:12.723Z",
                            "opened": "2015-11-19T13:57:12.723Z",
                            "id": "session_id00000000000002"
                        },  {
                            "address": "176.8.157.60",
                            "client": "chrome",
                            "platform": "windows 6.3",
                            "last_req": "2015-11-19T17:22:11.791Z",
                            "opened": "2015-11-19T17:22:11.791Z",
                            "id": "session_id00000000000003"
                        }
                    ],
                    "signin": "2015-11-19T17:22:11.688Z",
                    "signup": "2015-09-10T20:56:08.025Z",
                    "active": true,
                    "lock": false,
                    "email_ver": false,
                    "id": "user_id00000000000000002",
                    "last_session_id": "session_id00000000000003"
                },

                EMPTY_USER = {
                    "pwd_last_fail": null,
                    "pwd_fail_count": 0,
                    "name": "emptyUser",
                    "email": "emptyUser@test.ru",
                    "language": "en",
                    "paid": false,
                    "admin": false,
                    "party_access": [],
                    "sessions": [
                        {
                            "address": "176.8.157.60",
                            "client": "chrome",
                            "platform": "windows 6.3",
                            "last_req": "2015-11-19T17:34:42.019Z",
                            "opened": "2015-11-19T17:34:42.019Z",
                            "id": "session_id00000000000002"
                        }
                    ],
                    "signin": "2015-11-19T17:34:41.934Z",
                    "signup": "2015-11-19T17:34:41.721Z",
                    "active": true,
                    "lock": false,
                    "email_ver": false,
                    "id": "user_id00000000000000001",
                    "last_session_id": "session_id00000000000002"
                };

            //define settings
            var SETTINGS1 = {
                    "intro": {
                        "lastId": "55f6fc635b46fab820dd8cce",
                        "date": "2015-09-15T17:28:23.941Z"
                    },
                    "party_id": "user_id00000000000000001",
                    "events": {
                        "viewType": "kanban"
                    },
                    "visions": {
                        "viewType": "tile"
                    },
                    "notes": {
                        "viewType": "tile"
                    },
                    "partners": {
                        "viewType": "tile"
                    }
                },
                SETTINGS2 = {
                    "intro": {
                        "lastId": "55f6fc635b46fab820dd8cce",
                        "date": "2015-09-15T17:28:23.941Z"
                    },
                    "party_id": "user_id00000000000000002",
                    "messages": {
                        "viewType": "send"
                    },
                    "goals": {
                        "navId": "all"
                    },
                    "areas": {
                        "navId": "now"
                    },
                    "news": {
                        "viewType": "tile"
                    }
                };

            return {

                ABCD: ABCD,

                ABCD_CAPITALIZE: ABCD_CAPITALIZE,

                DIGIT: DIGIT,

                SIGN: SIGN,

                SETTINGS1: SETTINGS1,

                SETTINGS2: SETTINGS2,

                EMPTY_USER: EMPTY_USER,

                MANAGER_USER: MANAGER_USER,

                TESTER_ACCOUNT: TESTER_ACCOUNT,

                SAMPLER_ACCOUNT: SAMPLER_ACCOUNT,

                SERVER_URL: SERVER_URL

            };

        }
    );

})();

/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module('pipTest.Entity', ['pipTest.DataSet', 'pipTest.General']);

    thisModule.service('pipTestEntity', ['pipTestGeneral', function (pipTestGeneral) {

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

        }]

    );

})();

/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module('pipTest.General', ['pipTest.DataSet']);

    thisModule.service('pipTestGeneral', ['pipTestDataSet', function (pipTestDataSet) {

            return {

                getObjectId: getObjectId,

                getOneWord: getOneWord,

                getOne: getOne

            };

            // get Id
            function getObjectId(n, abd) {
                var poolObjectId = pipTestDataSet.ABCD + pipTestDataSet.DIGIT,
                n = n ? n : 16;
                abd = abd ? abd : poolObjectId;
                var s = chance.string({length: n, pool: abd});

                return s;
            };

            // get random one of set
            function getOne(arr) {
                if (!arr || !Array.isArray(arr) || arr.length == 0) return null;

                var rand = Math.floor(Math.random() * arr.length);

                return arr[rand];
            };


            // get random word
            function getOneWord(n) {
                var length = n && n > 0 ? Math.floor(Math.random() * n) : null;
                var poolWord =  pipTestDataSet.ABCD + pipTestDataSet.ABCD_CAPITALIZE;

                var oneWord = chance.word({length: length, pool: poolWord});

                return oneWord;
            };

        }]
    );

})();

/**
 * @file Registration of WebUI tests
 * @copyright Digital Living Software Corp. 2014-2015
 */

/* global angular */

(function () {
    'use strict';

    angular.module('pipWebuiTests', [
        'pipTest.DataSet',
        'pipTest.Account',
        'pipTest.Entity',
        'pipTest.UserParty',
        'pipTest.General',
        'pipTest.Content'


    ]);

})();



/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module('pipTest.UserParty', ['pipTest.DataSet']);

    thisModule.service('pipTestUserParty', ['pipTestDataSet', 'pipTestGeneral', function (pipTestDataSet, pipTestGeneral) {

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

        }]
    );

})();

//# sourceMappingURL=pip-webui-test.js.map
