/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module('pipTest.General', ['pipTest.DataSet']);

    thisModule.service('pipTestGeneral', function (pipTestDataSet) {

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

        }
    );

})();
