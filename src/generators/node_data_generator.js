/**
 * @file pipNodeDataGenerator
 * @copyright Digital Living Software Corp. 2014-2016
 */

(function () {
    'use strict';

    var thisModule = angular.module('pipGenerators.Node', []);

    thisModule.factory('pipNodeDataGenerator', function (pipDataGenerator, pipBasicGeneratorServices, $log) {

            var child = new pipDataGenerator('Nodes', []),
                pointCollors = {
                        'danger': '#EF5350',
                        'info': '#8BC34A',
                        'warn': '#FFD54F'
                    };

            child.getNodeType = getNodeType;
            child.generateObj = function generateObj() {
                var temperature = chance.integer({min: -40, max: 50}),
                    radiation_level = chance.bool({likelihood: 70}) ? chance.floating({fixed: 2, min: 0, max: 5}) : chance.floating({fixed: 2, min: 0, max: 22}),
                    type = getNodeType(temperature, radiation_level),
                    node = {
                        id: pipBasicGeneratorServices.getObjectId(),
                        name: chance.name(),
                        temperature: temperature, 
                        radiation_level: radiation_level,
                        type: type,
                        location_points: {
                            type: 'Point',
                            coordinates: [ chance.floating({min: 32, max: 42}), chance.floating({min: -121, max: -70}) ],
                            fill: getNodeColor(type)
                        },
                    };

                return node;
            }

            return child;

            function getNodeColor(type) {
                return pointCollors[type];
            }

            function getNodeType(temperature, radiation_level) {
                var hi = 10, low = 4, level_denger = 8, level_warn = 4, 
                    radiation_hi = 5, radiation_middle = 2,
                    temperature_hi = 45, temperature_middle = 36,  
                    temperature_low = -25, temperature_lower = -15,  
                    level = 0;

                if (temperature > temperature_hi || temperature < temperature_low) {
                    level += hi;
                } else if (temperature > temperature_middle || temperature < temperature_lower) {
                    level += low;
                }

                if (radiation_level > radiation_hi) {
                     level += hi;
                } else if (radiation_level > radiation_middle) {
                    level += low;
                }

                if (level >= level_denger) {
                    return 'danger';
                } else if (level >= level_warn) {
                    return 'warn';
                } else {
                    return 'info';
                }
            };

    });

})();