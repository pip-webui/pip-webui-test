/**
 * @file pipAvatarsDataGenerator
 * @copyright Digital Living Software Corp. 2014-2016
 */

(function () {
    'use strict';

    var thisModule = angular.module('pipGenerators.Avatars', []);

    thisModule.factory('pipAvatarsDataGenerator', function (pipDataGenerator, pipBasicGeneratorServices, pipImageResources, $log) {

            var child = new pipDataGenerator('Avatars', []);

            child.defaultContentType = 'image/jpeg';

            child.generateObj = function generateObj() {
                var image = pipImageResources.getImage(),
                    imageName = pipBasicGeneratorServices.getFileName(image.link),
                    imageExt = pipBasicGeneratorServices.getFileExt(imageName),
                    imageContentType = pipBasicGeneratorServices.getContentType(imageExt),                
                    obj = {
                        id: pipBasicGeneratorServices.getObjectId(),
                        name: imageName, 
                        content_type: imageContentType, 
                        length: chance.integer({min: 10000, max: 1000000}),
                        creator_id: pipBasicGeneratorServices.getObjectId(),
                        created: chance.date({year: 2015}).toJSON(), 
                        refs: [

                        ],
                        url: image.link
                    };

                return obj;
            }

            return child;
    });

})();