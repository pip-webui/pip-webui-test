/**
 * @file Mock data for checklist
 * @copyright Digital Living Software Corp. 2014-2015
 */

/* global chance */

(function () {
    'use strict';

    var thisModule = angular.module('pipTest.Content', ['pipTest.DataSet']);

    thisModule.service('pipTestContent', function () {

        return {
            getCheckList: getCheckList
        };

        // Returns entity
        function getCheckList(options) {

            var size = 1 + Math.floor(Math.random() * 10),
                onlyCheck,
                onlyUnCheck,
                optionTextType, // {word, sentence, paragraph}
                optionLength,
                checklistContent = [],
                i;

            if (options) {
                size = options.size ? options.size : size;
                onlyCheck = options.onlyCheck ? options.onlyCheck : false;
                onlyUnCheck = options.onlyUnCheck ? options.onlyUnCheck : false;
                optionTextType = options.optionTextType ? options.optionTextType : null;
                optionLength = options.optionLength ? options.optionLength : null;
            }

            for (i = 0; i < size; i++) {
                checklistContent.push({
                    text: getText(optionTextType, optionLength),
                    checked: getChecked(onlyCheck, onlyUnCheck)
                });
            }

            return checklistContent;

            // helpful functions
            function getText(optionTextType, optionLength) {
                var text;

                switch (optionTextType) {
                    case 'word':
                        text = chance.word({ length: optionLength });
                        break;
                    case 'sentence':
                        text = chance.sentence({ words: optionLength });
                        break;
                    case 'paragraph':
                        text = chance.paragraph({ sentences: optionLength });
                        break;
                    default:
                        text = chance.sentence({words: optionLength});
                }

                return text;
            }

            function getChecked(onlyCheck, onlyUnCheck) {
                return onlyCheck || onlyUnCheck || chance.bool();
            }
        }

    });

})();
