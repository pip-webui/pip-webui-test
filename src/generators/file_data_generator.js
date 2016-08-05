/**
 * @file pipFilesDataGenerator
 * @copyright Digital Living Software Corp. 2014-2016
 */

// {
//   "id": "57a459fbf6dd4d642c1daf23",
//   "name": "Screenshot_2.png",
//   "content_type": "image/png",
//   "length": 78848,
//   "party_id": "565f12ef8ff2161b1dfeedbf",
//   "creator_id": "565f12ef8ff2161b1dfeedbf",
//   "created": "2016-08-05T09:18:52.304Z",
//   "refs": [],
//   "url": "https://s3-us-west-1.amazonaws.com/alpha-uploads.piplife.com/57a459fbf6dd4d642c1daf23/Screenshot_2.png"
// }

(function () {
    'use strict';

    var thisModule = angular.module('pipGenerators.Files', []);

    thisModule.factory('pipFilesDataGenerator', function (pipDataGenerator, pipBasicGeneratorServices, pipImageResources, $log) {
            
            var child = new pipDataGenerator('Files', []);

            child.generateObj = function generateObj() {
                var image = pipImageResources.getImage(),
                    imageName = pipBasicGeneratorServices.getFileName(image.link),
                    imageExt = pipBasicGeneratorServices.getFileExt(imageName),
                    imageContentType = pipBasicGeneratorServices.getContentType(imageExt),
                    creatorId = pipBasicGeneratorServices.getObjectId(), 
                    obj = {
                        id: pipBasicGeneratorServices.getObjectId(),
                        name: imageName, 
                        content_type: imageContentType, 
                        length: chance.integer({min: 10000, max: 1000000}),
                        party_id: creatorId,
                        creator_id: creatorId,
                        created: chance.date({year: 2015}).toJSON(), 
                        refs: [],
                        url: image.link
                    };

                return obj;
            }

            return child;
    });

})();