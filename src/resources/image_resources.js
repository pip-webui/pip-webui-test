/**
 * @file pipImageResources service
 * @copyright Digital Living Software Corp. 2014-2016
 * @todo:
 */
 
 /* global _, angular */

(function () {
    'use strict';

    var thisModule = angular.module('pipImageResources', []);

    thisModule.provider('pipImageResources', function() {
        var imagesMap = [],
            size = 0;

        this.setImages = setImages;

        this.$get = function ($rootScope, $timeout, localStorageService, pipAssert) {


            return {
                setImages: setImages,
                getImagesCollection: getImagesCollection,
                getImage: getImage
            }
        };

        // Add images collection
        function setImages(newImagesRes) {
            if (!angular.isArray(newImagesRes)) {
                new Error('pipImageResources setImages: first argument should be an object');
            }

            imagesMap = _.union(imagesMap, newImagesRes);
            size = imagesMap.length;
        }

        // Get images collection
        function getImagesCollection(size, search) {
            if (!!search && !angular.isString(search)) {
                new Error('pipImageResources getImages: second argument should be a string');
            }

            var result, queryLowercase,
                resultSize = size && size < imagesMap.length ? size : -1;

            if (!search) {
                result = imagesMap;
            } else {
                queryLowercase = search.toLowerCase();
                result = _.filter(imagesMap, function (item) {
                        if (item.title) {
                            return (item.title.toLowerCase().indexOf(queryLowercase) >= 0);
                        } else return false;
                    }) || [];
            }

            if (resultSize === -1) {
                return _.cloneDeep(result);
            } else {
                return _.take(result, resultSize);
            }                        
        }   

        function getImage() {
            var i = _.random(0, size - 1);

            if (size > 0) {
                return _.cloneDeep(imagesMap[i]);
            } else {
                return null;
            }
        }  

    });

})();