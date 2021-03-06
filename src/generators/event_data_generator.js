/**
 * @file pipEventDataGenerator
 * @copyright Digital Living Software Corp. 2014-2016
 */

(function () {
    'use strict';

    var thisModule = angular.module('pipGenerators.Event', []);

    thisModule.factory('pipEventDataGenerator', function (pipDataGenerator, pipBasicGeneratorServices, pipNodeDataGenerator, $log) {

            var refsDefault = {},
                child,
                eventIcon = {
                            'danger': 'warn-circle',
                            'info': 'info-circle-outline',
                            'warn': 'warn-triangle'
                        };

            refsDefault['Nodes'] = pipNodeDataGenerator.newObjectList(10);
            child = new pipDataGenerator('Events', refsDefault);

            child.generateObj = function generateObj(refs) {
                var temperature = chance.integer({min: -40, max: 50}),
                    radiation_level = chance.bool({likelihood: 70}) ? chance.floating({fixed: 2, min: 0, max: 5}) : chance.floating({fixed: 2, min: 0, max: 22}),
                    node, nodes,
                    event;

                    if (refs && angular.isObject(refs)) {
                        nodes = refs['Nodes'] || [];
                    } else {
                        nodes = refsDefault['Nodes'] || [];
                    }

                    node = getOne(nodes);
                    event = {
                        id: pipBasicGeneratorServices.getObjectId(),
                        node_id: getNodeId(node),
                        node_name: getNodeName(node),
                        description: getDesciption(temperature, radiation_level),
                        temperature: temperature,
                        rad_level: radiation_level,
                        icon: getIcon(temperature, radiation_level)
                    };

                return event;
            }

            return child;

            function getNodeId(node) {
                var id;

                if (node && node.id) {
                    id = node.id;
                } else {
                    id = pipBasicGeneratorServices.getObjectId();
                }

                return id;
            };     


            function getNodeName(node) {
                var name;

                if (node && node.name) {
                    name = node.name;
                } else {
                    name =  chance.name();
                }

                return name;
            };   

            function getIcon(temperature, radiation_level) {
                var type = pipNodeDataGenerator.getNodeType(temperature, radiation_level);

                return eventIcon[type] || eventIcon['info'];
            };
    
            function getDesciption(temperature, radiation_level) {
                var radiation_hi = 5, radiation_middle = 2,
                    temperature_hi = 45, temperature_middle = 36,  
                    temperature_low = -25, temperature_lower = -15,
                    resultTemp, resultRad;

                if (temperature > temperature_hi) {
                    resultTemp = pipBasicGeneratorServices.getOne(['Thermal shock.', 'Eruption.']);
                } else  if (temperature > temperature_middle) {
                    resultTemp = pipBasicGeneratorServices.getOne(['Temperature change.', 'Temperature increase.', 'Temperature decrease.']);
                } else  if (temperature < temperature_low) {
                    resultTemp = pipBasicGeneratorServices.getOne(['Temperature dropped significantly.', 'Thermal shock.']);
                } else  if (temperature < temperature_lower) {
                    resultTemp = pipBasicGeneratorServices.getOne(['Temperature change.', 'Temperature increase.', 'Temperature decrease.']);
                } else {
                    resultTemp = pipBasicGeneratorServices.getOne(['Temperature change.', 'Temperature increase.', 'Temperature decrease.']);                    
                }

                if (radiation_level > radiation_hi) {
                    resultRad = pipBasicGeneratorServices.getOne(['Radioactive emission.', 'Reactor explosion.', 'Nuclear tests.']);   
                } else if (radiation_level > radiation_middle) {
                    resultRad = pipBasicGeneratorServices.getOne(['Radiation level increase.', 'Radiation level decrease.', 'Radioactive emission.']); 
                } else {
                    resultRad = pipBasicGeneratorServices.getOne(['Radiation level decrease.', 'Radiation levels normal.']); 
                }

                return resultTemp + ' ' + resultRad;
            };

            function getOne(collection) {
                var index, count;

                count = collection.length;
                index = _.random(count - 1);

                return _.cloneDeep(collection[index]);
            }

    });

})();