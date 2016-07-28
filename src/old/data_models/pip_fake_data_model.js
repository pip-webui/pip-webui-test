/**
 * @file Registration of Fake Data Model
 * @copyright Digital Living Software Corp. 2014-2016
 */

(function () {
    'use strict';

    angular.module('pipFakeDataModel', [
        'pipFakeDataModel.Users',
        'pipFakeDataModel.Files',
        'pipFakeDataModel.Settings',
        'pipFakeDataModel.Entry'
    ]);

})();
