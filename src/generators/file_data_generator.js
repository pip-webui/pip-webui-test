/**
 * @file pipFilesDataGenerator
 * @copyright Digital Living Software Corp. 2014-2016
 */

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