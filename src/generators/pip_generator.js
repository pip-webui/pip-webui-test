/**
 * @file Service provide utils
 * @copyright Digital Living Software Corp. 2014-2015
 */

(function (_, chance) {
    'use strict';

    var thisModule = angular.module('pipBasicGeneratorServices', []);

    thisModule.service('pipBasicGeneratorServices', function () {
        
        var ABCD = 'abcdefghijklmnopqrstuvwxyz',
            ABCD_CAPITALIZE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            DIGIT = '0123456789',
            SIGN = ' .,;:-!?',

            SERVER_URL = 'http://alpha.pipservices.net';

        return {
            ABCD: ABCD,
            ABCD_CAPITALIZE: ABCD_CAPITALIZE,
            DIGIT: DIGIT,
            SIGN: SIGN,

            getObjectId: getObjectId,
            getOneWord: getOneWord,
            getPassword: getPassword,
            getEmail: getEmail,
            serverUrl:serverUrl,
            getName: getName,
            getOne: getOne,
            getMany: getMany
        };

        // Returns random ID
        function getObjectId(n, allowedChars) {
            var poolObjectId = ABCD + DIGIT,
                length = n || 16,
                pool = allowedChars || poolObjectId;

            return chance.string({length: length, pool: pool});
        }

        function getEmail() {
            return chance.email();
        }

        function getPassword() {
            return getOneWord(8);
        }

        // Returns random one from the passed asset
        function getOne(arr) {
            return _.sample(arr);
        }

        // Returns random one from the passed asset
        function getMany(arr, count) {
            var number = count ? count : Math.floor(Math.random() * arr.length); 

            return _.sampleSize(arr, number);
        }

        function serverUrl(serverUrl) {
            if (serverUrl) {
                SERVER_URL = serverUrl;
            }

            return SERVER_URL;
        }

        // Returns random word
        function getOneWord(n) {
            var length = n && n > 0 ? Math.floor(Math.random() * n) : null,
                poolWord = ABCD + ABCD_CAPITALIZE;

            return chance.word({length: length, pool: poolWord});
        }

        function getName() {
            var name = chance.first() + ' ' + chance.name();

            return name;
        }

    });

})(window._, window.chance);
