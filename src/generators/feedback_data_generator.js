/**
 * @file pipFeedbackDataGenerator
 * @copyright Digital Living Software Corp. 2014-2016
 */

// {
//   "sender_id": "565f12ef8ff2161b1dfeedbf",
//   "sender_name": "Миньошка",
//   "sender_email": "1@1.com",
//   "type": "support",
//   "title": "test",
//   "content": "test message",
//   "docs": [
//     {
//       "file_id": "57ab07a9f6dd4d642c1daf96",
//       "file_name": "Screenshot_3.png"
//     }
//   ],
//   "pic_ids": [
//     "57ab07a7f6dd4d642c1daf95"
//   ],
//   "sent": "2016-08-10T10:22:55.479Z",
//   "id": "57ab007ff6dd4d642c1daf94"
// }

(function () {
    'use strict';

    var thisModule = angular.module('pipGenerators.Feedback', []);

    thisModule.factory('pipFeedbackDataGenerator', function (pipDataGenerator, pipBasicGeneratorServices, pipUserDataGenerator, $log) {

            var refsDefault = {};

            refsDefault['Users'] = pipUserDataGenerator.newObjectList(10);
            refsDefault['Files'] = pipFilesDataGenerator.newObjectList(30);
            refsDefault['Pictures'] = pipFilesDataGenerator.newObjectList(30);

            child = new pipDataGenerator('Feedback', refsDefault);

            child.generateObj = function generateObj(refs) {
                var files, pictures, users, user, date = chance.timestamp();

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
                        type: pipBasicGeneratorServices.getOne(['en', 'ru', 'fr']), 
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

                docs = pipBasicGeneratorServices.getMany(collection);
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

                pics = pipBasicGeneratorServices.getMany(collection);
                for (i = 0; i < pics.length; i++) {
                    result.push(pics[i].id);
                }

                return result;
            }                        

    });

})();