/**
 * @file pipAvatarsDataGenerator
 * @copyright Digital Living Software Corp. 2014-2016
 */

// {
//   "id": "56cde0d1b0c1dcf82cf50cb6",
//   "name": "cat4.jpg",
//   "content_type": "image/jpeg",
//   "length": 36916,
//   "creator_id": "565f12ef8ff2161b1dfeedbf",
//   "created": "2016-08-05T09:22:59.141Z",
//   "refs": [
//     {
//       "ref_type": "goal",
//       "ref_id": "56cde0d1b0c1dcf82cf50cb6"
//     }
//   ],
//   "url": "https://s3-us-west-1.amazonaws.com/alpha-uploads.piplife.com/56cde0d1b0c1dcf82cf50cb6/cat4.jpg"
// }

(function () {
    'use strict';

    var thisModule = angular.module('pipGenerators.Avatars', []);

    thisModule.factory('pipAvatarsDataGenerator', function (pipDataGenerator, pipBasicGeneratorServices, pipImageResources, $log) {
            
            var child = new pipDataGenerator('Avatars', []);

            child.defaultContentType = 'image/jpeg';

            child.generateObj = function generateObj() {
                var image = pipImageResources.getImage(),
                    obj = {
                        id: pipBasicGeneratorServices.getObjectId(),
                        name: pipBasicGeneratorServices.getName(), // getName(image)?
                        content_type: child.defaultContentType, // getContentType(image)?
                        length: chance.штеупук({min: 10000, max: 1000000}),
                        creator_id: pipBasicGeneratorServices.getObjectId(),
                        created: chance.timestamp(),
                        refs: [
                            
                        ],
                        url: image.link
                    };


                return obj;
            }

            return child;
    });

})();