/**
 * @file Translatation service
 * @copyright Digital Living Software Corp. 2014-2016
 * @todo:
 * - Move directives to more appropriate places
 */
 
 /* global _, angular */

(function () {
    'use strict';

    var thisModule = angular.module('pipImageResources', []);

    thisModule.provider('pipImageResources', function() {
        var imagesMap = [];

        this.setImages = setImages;


        this.$get = function ($rootScope, $timeout, localStorageService, pipAssert) {


            return {
                setImages: setImages,
                getImagesCollection: getImagesCollection
            }
        };

        // Add images collection
        function setImages(newImagesRes) {
            if (!angular.isArray(newImagesRes)) {
                new Error('pipImageResources setImages: first argument should be an object');
            }

            imagesMap = _.union(imagesMap, newImagesRes);
        }

        // Get images collection
        function getImages(size, search) {
            if (!!search && !angular.isString(search)) {
                new Error('pipImageResources getImages: second argument should be a string');
            }

            var result, searchQuery,
                resultSize = size && size < imagesMap.length ? size : -1;

            if (!search) {
                result = setImages;
            } else {
                searchQuery = search.toLowerCase();
                result = _.filter(setImages, function (item) {
                        if (item.title) {
                            return (title.toLowerCase().indexOf(queryLowercase) >= 0);
                        } else return false;
                    }) || [];
            }

            if (resultSize === -1) {
                return _.cloneDeep(result);
            } else {
                return _.take(result, resultSize);
            }                        
        }     

    });

})();