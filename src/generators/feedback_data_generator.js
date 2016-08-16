/**
 * @file pipFeedbackDataGenerator
 * @copyright Digital Living Software Corp. 2014-2016
 */

(function () {
    'use strict';

    var thisModule = angular.module('pipGenerators.Feedback', []);

    thisModule.factory('pipFeedbackDataGenerator', function (pipDataGenerator, pipBasicGeneratorServices, 
        pipUserDataGenerator, $log, pipFilesDataGenerator) {

            var refsDefault = {}, child;

            refsDefault['Users'] = pipUserDataGenerator.newObjectList(10);
            refsDefault['Files'] = pipFilesDataGenerator.newObjectList(30);
            refsDefault['Pictures'] = pipFilesDataGenerator.newObjectList(30);

            child = new pipDataGenerator('Feedback', refsDefault);

            child.generateObj = function generateObj(refs) {
                var feedback, 
                    files, pictures, users, 
                    user, 
                    date = chance.timestamp();

                    if (refs && angular.isObject(refs)) {
                        users = refs['Users'] || [];
                        files = refs['Files'] || [];
                        pictures = refs['Pictures'] || [];
                    } else {
                        users = refsDefault['Users'] || [];
                        files = refsDefault['Files'] || [];
                        pictures = refsDefault['Pictures'] || [];
                    }

                    user = getOne(users);
                    if (!user || !user.id) {
                        user = pipUserDataGenerator.newObject();
                    }

                    feedback = {
                        id: pipBasicGeneratorServices.getObjectId(),
                        sender_id: user.id,
                        sender_name: user.name,
                        sender_email: user.email,
                        type: pipBasicGeneratorServices.getOne(['support', 'feedback', 'copyright', 'business', 'advertising']), 
                        title: chance.sentence(),
                        content: chance.paragraph(),
                        docs: getDocs(files),
                        pic_ids: getPictures(pictures), 
                        sent: new Date(date).toJSON()
                    };

                return feedback;
            }

            return child;

            function getOne(collection) {
                var index, count;

                count = collection.length;
                index = _.random(count - 1);

                return _.cloneDeep(collection[index]);
            }

            function getDocs(collection) {
                var docs, result = [], i;

                docs = pipBasicGeneratorServices.getMany(collection, chance.integer({min: 0, max: 5}));
                for (i = 0; i < docs.length; i++) {
                    result.push({
                        file_id: docs[i].id,
                        file_name: docs[i].name
                    });
                }

                return result;
            }

            function getPictures(collection) {
                var pics, result = [], i;

                pics = pipBasicGeneratorServices.getMany(collection, chance.integer({min: 0, max: 5}));
                for (i = 0; i < pics.length; i++) {
                    result.push(pics[i].id);
                }

                return result;
            }                        

    });

})();