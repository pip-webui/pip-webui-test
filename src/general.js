/**
 * @file Service provide utils
 * @copyright Digital Living Software Corp. 2014-2015
 */

(function (_, chance) {
    'use strict';

    var thisModule = angular.module('pipTest.General', ['pipTest.DataSet']);

    thisModule.service('pipTestGeneral', function (pipTestDataSet) {

        return {
            getObjectId: getObjectId,
            getOneWord: getOneWord,
            getOne: getOne
        };

        // Returns random ID
        function getObjectId(n, allowedChars) {
            var poolObjectId = pipTestDataSet.ABCD + pipTestDataSet.DIGIT,
                length = n || 16,
                pool = allowedChars || poolObjectId;

            return chance.string({length: length, pool: pool});
        }

        // Returns random one from the passed asset
        function getOne(arr) {
            return _.sample(arr);
        }

        // Returns random word
        function getOneWord(n) {
            var length = n && n > 0 ? Math.floor(Math.random() * n) : null,
                poolWord = pipTestDataSet.ABCD + pipTestDataSet.ABCD_CAPITALIZE;

            return chance.word({length: length, pool: poolWord});
        }

    });

})(window._, window.chance);
