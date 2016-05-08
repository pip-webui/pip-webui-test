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
