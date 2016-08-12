(function (angular) {
    'use strict';

    var thisModule = angular.module('appTests.Mocks', []);

    thisModule.config(function (pipTranslateProvider) {
        pipTranslateProvider.translations('en', {
            SAMPLE: 'sample'
        });
        pipTranslateProvider.translations('ru', {
            SAMPLE: 'пример'
        });
    });

    thisModule.controller('MocksController',
        function ($scope, pipAppBar, $timeout, pipSession, $http, 
            pipBasicGeneratorServices, 
            pipUserDataGenerator, pipPartyAccessDataGenerator, pipSessionsDataGenerator, pipPartyDataGenerator,
            TestCollection, pipTestDataService,
            pipImageResources, pipAvatarsDataGenerator, pipFilesDataGenerator, pipSettingsDataGenerator, pipFeedbackDataGenerator) {

            var dataset = prepareData();

            $scope.onSignIn = onSignIn;
            $scope.onSignOut = onSignOut;
            $scope.onSignUp = onSignUp;
            $scope.onSignupValidate = onSignupValidate;
            $scope.onVerifyEmail = onVerifyEmail;
            $scope.onRecoverPassword = onRecoverPassword;
            $scope.onResetPassword = onResetPassword;
            $scope.onChangePassword = onChangePassword;

            $scope.onUserPOST = onUserPOST;
            $scope.onUsersGET = onUsersGET;
            $scope.onUserGET = onUserGET;
            $scope.onUserPUT = onUserPUT;
            $scope.onUserDELETE = onUserDELETE;
            $scope.onCurrentUserGET = onCurrentUserGET;
            
            $scope.onUserSessionsGET = onUserSessionsGET;
            $scope.onUserSessionDELETE = onUserSessionDELETE;

            $scope.onAvatarGET = onAvatarGET;
            $scope.onAvatarDELETE = onAvatarDELETE;
            $scope.onAvatarPOST = onAvatarPOST;
            $scope.onAvatarRecordGET = onAvatarRecordGET;
            $scope.onAvatarRecordDELETE = onAvatarRecordDELETE;
            $scope.onAvatarRecordPOST = onAvatarRecordPOST;            
            $scope.onFileGET = onFileGET;
            $scope.onFileObjectGET = onFileObjectGET;
            $scope.onFileDELETE = onFileDELETE;
            $scope.onFilePOST = onFilePOST;


            $scope.onPartiesGET = onPartiesGET;
            $scope.onPartyGET = onPartyGET;
            $scope.onPartyPOST = onPartyPOST;
            $scope.onPartyPUT = onPartyPUT;
            $scope.onPartyDELETE = onPartyDELETE;
            $scope.onPartiesSettingsGET = onPartiesSettingsGET; 
            $scope.onPartiesSettingsPOST = onPartiesSettingsPOST;

            $scope.onFeedbacksGET = onFeedbacksGET;
            $scope.onFeedbackGET = onFeedbackGET;
            $scope.onFeedbackPOST = onFeedbackPOST;
            $scope.onFeedbackPUT = onFeedbackPUT;
            $scope.onFeedbackDELETE = onFeedbackDELETE;

            pipAppBar.showMenuNavIcon();
            pipAppBar.showLanguage();
            pipAppBar.showTitleText('MOCKS');

            return;


            function prepareData() {
                var i, users, parties = [], settings =[],
                    tcPartyAccess, tcSessions, tcUsers, tcImages, tcAvatars, tcParties, tcSettings, tcFeedback,
                    usersRefs = new Array(),
                    dataSet;
                    
                // create dataset    
                dataSet = pipTestDataService.getDataset();

                // create collection without references
                tcPartyAccess = new TestCollection(pipPartyAccessDataGenerator, 'PartyAccessTestCollection', 20);
                tcSessions = new TestCollection(pipSessionsDataGenerator, 'SessionsTestCollection', 20);
                // init collection
                tcPartyAccess.init();
                tcSessions.init();
                // add collection to dataset
                dataSet.add(tcPartyAccess);
                dataSet.add(tcSessions);
                // form references for users collection
                usersRefs['PartyAccess'] = tcPartyAccess.getAll();
           	    usersRefs['Sessions'] = tcSessions.getAll();

                // create users collection   
                tcUsers = new TestCollection(pipUserDataGenerator, 'UsersTestCollection', 20, usersRefs);   
                dataSet.add(tcUsers);

                // create images collection
                tcImages = new TestCollection(pipFilesDataGenerator, 'FilesTestCollection', 20);
                dataSet.add(tcImages);
                // create avatar collection
                tcAvatars = new TestCollection(pipAvatarsDataGenerator, 'AvatarsTestCollection', 20);
                dataSet.add(tcAvatars);

                // create feedback collection
                tcFeedback = new TestCollection(pipFeedbackDataGenerator, 'FeedbacksTestCollection', 20);
                dataSet.add(tcFeedback);  

                // init collection
                dataSet.init();

                users = dataSet.get('UsersTestCollection').getAll();
                // generate party and settings for each user
                for (i = 0; i < users.length; i ++) {
                    var party = pipPartyDataGenerator.initObject({
                        name: users[i].name,
                        email: users[i].email,
                        id: users[i].id,
                        updated: users[i].updated,
                        created: users[i].created
                    });
                    parties.push(party);
                    var setting = {
                        party_id: party.id,
                        creator_id: party.id
                    }
                    settings.push(setting);
                }
                tcParties = new TestCollection(pipPartyDataGenerator, 'PartiesTestCollection', parties.length);
                tcParties.init(parties);
                dataSet.add(tcParties); 

                tcSettings = new TestCollection(pipSettingsDataGenerator, 'SettingsTestCollection', settings.length);
                tcSettings.init(settings);
                dataSet.add(tcSettings); 

                return dataSet;
            }
            
            // Entry APi 
            // ----------------------

            function onSignIn() {
                var user,
                    users = dataset.get('UsersTestCollection'),
                    req = {
                        method: 'POST',
                        url: pipBasicGeneratorServices.serverUrl() + '/api/signin',
                        headers: {'Content-Type': undefined},
                        data: {}
                    };

                if (!users) {
                    throw new Error('MocksController: Users collection is not found');
                } 

                user = users.getByIndex(0);
                if (!user || !user.id) {
                    throw new Error('MocksController: Users collection is empty');
                }

                req.data = {email: user.email, password: pipBasicGeneratorServices.getPassword()}
                console.log('onSignin req', req);
                $http(req)
                    .success(function (result) {
                        console.log('onSignIn result', result); 
                    })
                    .error(function (error) {
                        console.log('onSignIn error', error); 
                    }
                );                
            }    
            
            function onSignOut() {
                var req = {
                    method: 'POST',
                    url: pipBasicGeneratorServices.serverUrl() + '/api/signout',
                    headers: { 'Content-Type': undefined },
                    data: {}
                };

                console.log('onSignOut req', req);

                $http(req)
                    .success(function (result) {
                        console.log('onSignOut result', result); 
                    })
                    .error(function (error) {
                        console.log('onSignOut error', error); 
                    }
                );                
            }   
            
            function onSignUp() {
                var req = {
                    method: 'POST',
                    url: pipBasicGeneratorServices.serverUrl() + '/api/signup',
                    headers: { 'Content-Type': undefined },
                    data: {
                        email: pipBasicGeneratorServices.getEmail(), 
                        password: pipBasicGeneratorServices.getPassword(),
                        name: pipBasicGeneratorServices.getName(),
                        language: pipBasicGeneratorServices.getOne(['en', 'ru'])
                    }
                };

                console.log('onSignUp req', req);

                $http(req)
                    .success(function (result) {
                        console.log('onSignUp result', result); 
                    })
                    .error(function (error) {
                        console.log('onSignUp error', error); 
                    }
                );                
            }  
            
            function onSignupValidate() {
                var req = {
                        method: 'POST',
                        url: pipBasicGeneratorServices.serverUrl() + '/api/signup_validate',
                        headers: { 'Content-Type': undefined },
                        data: {email: pipBasicGeneratorServices.getEmail()}
                    };

                console.log('onSignupValidate req', req);

                $http(req)
                    .success(function (result) {
                        console.log('onSignupValidate result', result); 
                    })
                    .error(function (error) {
                        console.log('onSignupValidate error', error); 
                    }
                );                
            }      

            function onVerifyEmail() {
                var user,
                    users = dataset.get('UsersTestCollection'),
                    req = {
                        method: 'POST',
                        url: pipBasicGeneratorServices.serverUrl() + '/api/verify_email',
                        headers: { 'Content-Type': undefined },
                        data: {}
                    };

                if (!users) {
                    throw new Error('MocksController: Users collection is not found');
                } 

                user = users.getByIndex(0);
                if (!user || !user.id) {
                    throw new Error('MocksController: Users collection is empty');
                }

                // set verify code
                user.code = pipBasicGeneratorServices.getPassword();
                users.update(user.id, user);
                req.data = { email: user.email, code: user.code };
                console.log('onVerifyEmail req', req);

                $http(req)
                    .success(function (result) {
                        console.log('onVerifyEmail result', result); 
                    })
                    .error(function (error) {
                        console.log('onVerifyEmail error', error); 
                    }
                );                
            }    
            
            function onRecoverPassword() {
                var user,
                    users = dataset.get('UsersTestCollection'),
                    req = {
                        method: 'POST',
                        url: pipBasicGeneratorServices.serverUrl() + '/api/recover_password',
                        headers: { 'Content-Type': undefined },
                        data: {}
                    };

                if (!users) {
                    throw new Error('MocksController: Users collection is not found');
                } 

                user = users.getByIndex(0);
                if (!user || !user.id) {
                    throw new Error('MocksController: Users collection is empty');
                }

                // set verify code
                user.code = pipBasicGeneratorServices.getPassword();
                user = users.update(user.id, user);
                req.data = { email: user.email };
                console.log('onRecoverPassword req', req);

                $http(req)
                    .success(function (result) {
                        console.log('onRecoverPassword result', result); 
                    })
                    .error(function (error) {
                        console.log('onRecoverPassword error', error); 
                    }
                );                
            }   
            
            function onResetPassword() {
                var user,
                    users = dataset.get('UsersTestCollection'),
                    req = {
                        method: 'POST',
                        url: pipBasicGeneratorServices.serverUrl() + '/api/reset_password',
                        headers: { 'Content-Type': undefined },
                        data: {}
                    };

                if (!users) {
                    throw new Error('MocksController: Users collection is not found');
                } 

                user = users.getByIndex(0);
                if (!user || !user.id) {
                    throw new Error('MocksController: Users collection is empty');
                }

                user.code = pipBasicGeneratorServices.getPassword();
                user = users.update(user.id, user);
                req.data = { email: user.email, code: user.code, password: pipBasicGeneratorServices.getPassword() };
                console.log('onResetPassword req', req);

                $http(req)
                    .success(function (result) {
                        console.log('onResetPassword result', result); 
                    })
                    .error(function (error) {
                        console.log('onResetPassword error', error); 
                    }
                );                
            }  

            function onChangePassword() {
                var req = {
                    method: 'POST',
                    url: pipBasicGeneratorServices.serverUrl() + '/api/change_password',
                    headers: {
                      'Content-Type': undefined
                    },
                    data: {}
                };

                console.log('onChangePassword req', req);

                $http(req)
                    .success(function (result) {
                        console.log('onChangePassword result', result); 
                    })
                    .error(function (error) {
                        console.log('onChangePassword error', error); 
                    }
                );                
            }  

            // users API
            // ------------------------

            function onUserPOST() {
                var user,
                    req;

                user = pipUserDataGenerator.newObject();
                console.log('onUser', user);

                req = {
                    method: 'POST',
                    url: pipBasicGeneratorServices.serverUrl() + '/api/users',
                    headers: {'Content-Type': undefined},
                    data: user
                };
                console.log('onUserPOST req', req);

                $http(req)
                    .success(function (result) {
                        console.log('onUserPOST result', result); 
                    })
                    .error(function (error) {
                        console.log('onUserPOST error', error); 
                    }
                );
            }          

            function onUsersGET() {
                var req = {
                        method: 'GET',
                        url: pipBasicGeneratorServices.serverUrl() + '/api/users',
                        headers: {'Content-Type': undefined},
                        data: null
                    };

                console.log('onUsersGET req', req);

                $http(req)
                    .success(function (result) {
                        console.log('onUsersGET result', result); 
                    })
                    .error(function (error) {
                        console.log('onUsersGET error', error); 
                    }
                );
            }   

            function onUserGET() {
                var user,
                    index,
                    count,
                    users = dataset.get('UsersTestCollection'),
                    req;

                if (!users) {
                    throw new Error('MocksController: Users collection is not found');
                } 

                count = users.getAll().length;
                if (count === 0) {
                    throw new Error('MocksController: Users collection is empty');
                } 

                index = _.random(count - 1);
                user = users.getByIndex(index);
                if (!user || !user.id) {
                    throw new Error('MocksController: Users collection is empty');
                }

                req = {
                        method: 'GET',
                        url: pipBasicGeneratorServices.serverUrl() + '/api/users/' + user.id,
                        headers: { 'Content-Type': undefined },
                        data: {}
                     };
                console.log('onUserGET req', req);

                $http(req)
                    .success(function (result) {
                        console.log('onUserGET result', result); 
                    })
                    .error(function (error) {
                        console.log('onUserGET error', error); 
                    }
                );
            }   

            function onUserPUT() {
                var user,
                    index,
                    count,
                    users = dataset.get('UsersTestCollection'),
                    req;

                if (!users) {
                    throw new Error('MocksController: Users collection is not found');
                } 

                count = users.getAll().length;
                if (count === 0) {
                    throw new Error('MocksController: Users collection is empty');
                } 

                index = _.random(count - 1);
                user = users.getByIndex(index);
                if (!user || !user.id) {
                    throw new Error('MocksController: Users collection is empty');
                }
                     
                // change user name
                user.name = pipBasicGeneratorServices.getName();
                req = {
                    method: 'PUT',
                    url: pipBasicGeneratorServices.serverUrl() + '/api/users/' + user.id,
                    headers: {'Content-Type': undefined},
                    data: user
                };
                console.log('onUserPUT req', req);

                $http(req)
                    .success(function (result) {
                        console.log('onUserPUT result', result); 
                    })
                    .error(function (error) {
                        console.log('onUserPUT error', error); 
                    }
                );
            }   

            function onUserDELETE() {
                var user,
                    index,
                    count,
                    users = dataset.get('UsersTestCollection'),
                    req;

                if (!users) {
                    throw new Error('MocksController: Users collection is not found');
                } 

                count = users.getAll().length;
                if (count === 0) {
                    throw new Error('MocksController: Users collection is empty');
                } 

                index = _.random(count - 1);
                user = users.getByIndex(index);
                if (!user || !user.id) {
                    throw new Error('MocksController: Users collection is empty');
                }

                var req = {
                    method: 'DELETE',
                    url: pipBasicGeneratorServices.serverUrl() + '/api/users/' + user.id,
                    headers: { 'Content-Type': undefined }
                };
                console.log('onUserDELETE req', req);

                $http(req)
                    .success(function (result) {
                        console.log('onUserDELETE result', result); 
                    })
                    .error(function (error) {
                        console.log('onUserDELETE error', error); 
                    }
                );
            }   

            function onCurrentUserGET() {
                var req = {
                        method: 'GET',
                        url: pipBasicGeneratorServices.serverUrl() + '/api/users/current',
                        headers: { 'Content-Type': undefined }
                    };
                console.log('onCurrentUserGET req', req);

                $http(req)
                    .success(function (result) {
                        console.log('onCurrentUserGET result', result); 
                    })
                    .error(function (error) {
                        console.log('onCurrentUserGET error', error); 
                    }
                );
            }   

            // Users Sessions
            // ------------------------------

            function onUserSessionsGET() {
                var user, req;

                user = dataset.getCurrentUser();

                if (!user || !user.id) {
                    throw new Error('MocksController: User not login.');
                }

                req = {
                    method: 'GET',
                    url: pipBasicGeneratorServices.serverUrl() + '/api/users/' + user.id + '/sessions',
                    headers: { 'Content-Type': undefined }
                };

                console.log('onUserSessionsGET req', req);

                $http(req)
                    .success(function (result) {
                        console.log('onUserSessionsGET result', result); 
                    })
                    .error(function (error) {
                        console.log('onUserSessionsGET error', error); 
                    }
                );
            }   

            function onUserSessionDELETE() {
                var user, req, session;

                user = dataset.getCurrentUser();

                if (!user || !user.id) {
                    throw new Error('MocksController: User not login.');
                }

                session = user.sessions.pop();
                if (!session || !session.id) {
                    throw new Error('MocksController: User not have open session.');
                }

                req = {
                    method: 'DELETE',
                    url: pipBasicGeneratorServices.serverUrl() + '/api/users/' + user.id + '/sessions/' + session.id,
                    headers: { 'Content-Type': undefined } 
                };

                console.log('onUserSessionDELETE req', req);

                $http(req)
                    .success(function (result) {
                        console.log('onUserSessionDELETE result', result); 
                    })
                    .error(function (error) {
                        console.log('onUserSessionDELETE error', error); 
                    }
                );
            }   

            // Files and Avatars
// get: 
//      http://alpha.pipservices.net/api/parties/565f12ef8ff2161b1dfeedbf/goals/57891f214997deb8138fe233/avatar?default_template=goal&bg=rgba(0,188,212,1)&fg=white&timestamp=1470388249000&obj_id=57891f214997deb8138fe233
//      http://alpha.pipservices.net/api/parties/565f12ef8ff2161b1dfeedbf/areas/578501864997deb8138fd78d/avatar?default_template=area&bg=rgba(236,64,122,1)&fg=white&timestamp=1470391804000&obj_id=578501864997deb8138fd78d
//      http://alpha.pipservices.net/api/parties/565f12ef8ff2161b1dfeedbf/goals/5788cf214997deb8138fe020/avatar?default_template=goal&bg=rgba(236,64,122,1)&fg=white&timestamp=1470388248000&obj_id=5788cf214997deb8138fe020
// post 
//      http://alpha.pipservices.net/api/parties/565f12ef8ff2161b1dfeedbf/goals/56cde0d1b0c1dcf82cf50cb6/avatar?name=cat4.jpg
// delete 
//      http://alpha.pipservices.net/api/parties/565f12ef8ff2161b1dfeedbf/goals/56cde0d1b0c1dcf82cf50cb6/avatar

            function onAvatarDELETE() {
                var req = {
                    method: 'DELETE',
                    url: 'http://alpha.pipservices.net/api/parties/565f12ef8ff2161b1dfeedbf/avatar',
                    headers: {
                      'Content-Type': undefined
                    },
                    data: { test: 'onAvatarDELETE' }
                };

                console.log('onAvatarDELETE req', req);

                $http(req)
                    .success(function (result) {
                        console.log('onAvatarDELETE result', result); 
                    })
                    .error(function (error) {
                        console.log('onAvatarDELETE error', error); 
                    }
                );
            }  


            function onAvatarGET() {
                var req = {
                    method: 'GET',
                    // url: 'http://alpha.pipservices.net/api/parties/565f12ef8ff2161b1dfeedbf/avatar?default_template=goal&bg=rgba(0,188,212,1)&fg=white&timestamp=1470388249000&obj_id=57891f214997deb8138fe233',
                    url: 'http://fakeserver.net/api/parties/sjooujozxrkxe8bezq55zxv4/avatar?default_template=letter&bg=rgba(3,169,244,1)&fg=white&chr=4&timestamp=1470991105000&obj_id=sjooujozxrkxe8bezq55zxv4',
                    headers: {
                      'Content-Type': 'image/jpg'
                    },
                    data: { test: 'onAvatarGET' }
                };

                console.log('onAvatarGET req', req);

                $http(req)
                    .success(function (result) {
                        console.log('onAvatarGET result', result); 
                    })
                    .error(function (error) {
                        console.log('onAvatarGET error', error); 
                    }
                );
            }  


            function onAvatarPOST() {
                var req = {
                    method: 'POST',
                    url: 'http://alpha.pipservices.net/api/parties/565f12ef8ff2161b1dfeedbf/avatar?name=cat4.jpg',
                    headers: {
                      'Content-Type': 'image/jpg'
                    },
                    data: { test: 'onAvatarPOST' }
                };

                console.log('onAvatarPOST req', req);

                $http(req)
                    .success(function (result) {
                        console.log('onAvatarPOST result', result); 
                    })
                    .error(function (error) {
                        console.log('onAvatarPOST error', error); 
                    }
                );
            }  

            function onAvatarRecordDELETE() {
                var req = {
                    method: 'DELETE',
                    url: 'http://alpha.pipservices.net/api/parties/565f12ef8ff2161b1dfeedbf/goals/57891f214997deb8138fe233/avatar',
                    headers: {
                      'Content-Type': undefined
                    },
                    data: { test: 'onAvatarDELETE' }
                };

                console.log('onAvatarDELETE req', req);

                $http(req)
                    .success(function (result) {
                        console.log('onAvatarDELETE result', result); 
                    })
                    .error(function (error) {
                        console.log('onAvatarDELETE error', error); 
                    }
                );
            }  


            function onAvatarRecordGET() {
                var req = {
                    method: 'GET',
                    url: 'http://alpha.pipservices.net/api/parties/565f12ef8ff2161b1dfeedbf/goals/57891f214997deb8138fe233/avatar?default_template=goal&bg=rgba(0,188,212,1)&fg=white&timestamp=1470388249000&obj_id=57891f214997deb8138fe233',
                    headers: {
                      'Content-Type': 'image/jpg'
                    },
                    data: { test: 'onAvatarGET' }
                };

                console.log('onAvatarGET req', req);

                $http(req)
                    .success(function (result) {
                        console.log('onAvatarGET result', result); 
                    })
                    .error(function (error) {
                        console.log('onAvatarGET error', error); 
                    }
                );
            }  


            function onAvatarRecordPOST() {
                var req = {
                    method: 'POST',
                    url: 'http://alpha.pipservices.net/api/parties/565f12ef8ff2161b1dfeedbf/goals/56cde0d1b0c1dcf82cf50cb6/avatar?name=cat4.jpg',
                    headers: {
                      'Content-Type': 'image/jpg'
                    },
                    data: { test: 'onAvatarPOST' }
                };

                console.log('onAvatarPOST req', req);

                $http(req)
                    .success(function (result) {
                        console.log('onAvatarPOST result', result); 
                    })
                    .error(function (error) {
                        console.log('onAvatarPOST error', error); 
                    }
                );
            }  

// get image src     http://alpha.pipservices.net/api/parties/565f12ef8ff2161b1dfeedbf/files/578ddc6b4997deb8138fe5ac/content
// get image object  http://alpha.pipservices.net/api/parties/565f12ef8ff2161b1dfeedbf/files/578ddc6b4997deb8138fe5ac
// post image        http://alpha.pipservices.net/api/parties/565f12ef8ff2161b1dfeedbf/files?name=Screenshot_2.png
// delete image      http://alpha.pipservices.net/api/parties/565f12ef8ff2161b1dfeedbf/files/578ddd944997deb8138fe5d3

            function onFileDELETE() {
                var req = {
                    method: 'DELETE',
                    url: 'http://alpha.pipservices.net/api/parties/565f12ef8ff2161b1dfeedbf/files/578ddd944997deb8138fe5d3',
                    headers: {
                      'Content-Type': undefined
                    },
                    data: { test: 'onFileDELETE' }
                };

                console.log('onFileDELETE req', req);

                $http(req)
                    .success(function (result) {
                        console.log('onFileDELETE result', result); 
                    })
                    .error(function (error) {
                        console.log('onFileDELETE error', error); 
                    }
                );
            }  


            function onFileGET() {
                var req = {
                    method: 'GET',
                    url: 'http://alpha.pipservices.net/api/parties/565f12ef8ff2161b1dfeedbf/files/578ddc6b4997deb8138fe5ac/content',
                    headers: {
                      'Content-Type': 'image/png'
                    },
                    data: { test: 'onFileGET' }
                };

                console.log('onFileGET req', req);

                $http(req)
                    .success(function (result) {
                        console.log('onFileGET result', result); 
                    })
                    .error(function (error) {
                        console.log('onFileGET error', error); 
                    }
                );
            }  

            function onFileObjectGET() {
                var req = {
                    method: 'GET',
                    url: 'http://alpha.pipservices.net/api/parties/565f12ef8ff2161b1dfeedbf/files/578ddc6b4997deb8138fe5ac',
                    headers: {
                      'Content-Type': undefined
                    },
                    data: { test: 'onFileObjectGET' }
                };

                console.log('onFileObjectGET req', req);

                $http(req)
                    .success(function (result) {
                        console.log('onFileObjectGET result', result); 
                    })
                    .error(function (error) {
                        console.log('onFileObjectGET error', error); 
                    }
                );
            }  

            function onFilePOST() {
                var req = {
                    method: 'POST',
                    url: 'http://alpha.pipservices.net/api/parties/565f12ef8ff2161b1dfeedbf/files?name=Screenshot_2.png',
                    headers: {
                      'Content-Type': 'image/png'
                    },
                    data: { test: 'onFilePOST' }
                };

                console.log('onFilePOST req', req);

                $http(req)
                    .success(function (result) {
                        console.log('onFilePOST result', result); 
                    })
                    .error(function (error) {
                        console.log('onFilePOST error', error); 
                    }
                );
            }  

            // parties api

            function onPartyPOST() {
                var party,
                    req;

                party = pipPartyDataGenerator.newObject();
                console.log('onPartyPOST', party);

                req = {
                    method: 'POST',
                    url: pipBasicGeneratorServices.serverUrl() + '/api/parties',
                    headers: {'Content-Type': undefined},
                    data: party
                };
                console.log('onPartyPOST req', req);

                $http(req)
                    .success(function (result) {
                        console.log('onPartyPOST result', result); 
                    })
                    .error(function (error) {
                        console.log('onPartyPOST error', error); 
                    }
                );
            }          

            function onPartiesGET() {
                var req = {
                        method: 'GET',
                        url: pipBasicGeneratorServices.serverUrl() + '/api/parties',
                        headers: {'Content-Type': undefined},
                        data: null
                    };

                console.log('onPartiesGET req', req);

                $http(req)
                    .success(function (result) {
                        console.log('onPartiesGET result', result); 
                    })
                    .error(function (error) {
                        console.log('onPartiesGET error', error); 
                    }
                );
            }   

            function onPartyGET() {
                var party,
                    index,
                    count,
                    parties = dataset.get('PartiesTestCollection'),
                    req;

                if (!parties) {
                    throw new Error('MocksController: Parties collection is not found');
                } 

                count = parties.getAll().length;
                if (count === 0) {
                    throw new Error('MocksController: Parties collection is empty');
                } 

                index = _.random(count - 1);
                party = parties.getByIndex(index);
                if (!party || !party.id) {
                    throw new Error('MocksController: Parties collection is empty');
                }

                req = {
                        method: 'GET',
                        url: pipBasicGeneratorServices.serverUrl() + '/api/parties/' + party.id,
                        headers: { 'Content-Type': undefined },
                        data: {}
                     };
                console.log('onPartyGET req', req);

                $http(req)
                    .success(function (result) {
                        console.log('onPartyGET result', result); 
                    })
                    .error(function (error) {
                        console.log('onPartyGET error', error); 
                    }
                );
            }   

            function onPartyPUT() {
                var party,
                    index,
                    count,
                    parties = dataset.get('PartiesTestCollection'),
                    req;

                if (!parties) {
                    throw new Error('MocksController: Parties collection is not found');
                } 

                count = parties.getAll().length;
                if (count === 0) {
                    throw new Error('MocksController: Parties collection is empty');
                } 

                index = _.random(count - 1);
                party = parties.getByIndex(index);
                if (!party || !party.id) {
                    throw new Error('MocksController: Parties collection is empty');
                }
                     
                // change party
                party.gender = chance.gender().toLowerCase();
                party.loc_name = chance.address(),
                party.loc_pos = {
                    type: 'Point',
                    coordinates: [
                        chance.floating({min: -120, max: 120}),
                        chance.floating({min: -120, max: 120})
                    ]
                };
                req = {
                    method: 'PUT',
                    url: pipBasicGeneratorServices.serverUrl() + '/api/parties/' + party.id,
                    headers: {'Content-Type': undefined},
                    data: party
                };
                console.log('onPartyPUT req', req);

                $http(req)
                    .success(function (result) {
                        console.log('onPartyPUT result', result); 
                    })
                    .error(function (error) {
                        console.log('onPartyPUT error', error); 
                    }
                );
            }   

            function onPartyDELETE() {
                var party,
                    index,
                    count,
                    parties = dataset.get('PartiesTestCollection'),
                    req;

                if (!parties) {
                    throw new Error('MocksController: Parties collection is not found');
                } 

                count = parties.getAll().length;
                if (count === 0) {
                    throw new Error('MocksController: Parties collection is empty');
                } 

                index = _.random(count - 1);
                party = parties.getByIndex(index);
                if (!party || !party.id) {
                    throw new Error('MocksController: Parties collection is empty');
                }

                var req = {
                    method: 'DELETE',
                    url: pipBasicGeneratorServices.serverUrl() + '/api/parties/' + party.id,
                    headers: { 'Content-Type': undefined }
                };
                console.log('onPartyDELETE req', req);

                $http(req)
                    .success(function (result) {
                        console.log('onPartyDELETE result', result); 
                    })
                    .error(function (error) {
                        console.log('onPartyDELETE error', error); 
                    }
                );
            }   

            function onPartiesSettingsPOST() {
                var setting, 
                    party,
                    index,
                    count,
                    parties = dataset.get('PartiesTestCollection'),
                    req;

                if (!parties) {
                    throw new Error('MocksController: Parties collection is not found');
                } 

                count = parties.getAll().length;
                if (count === 0) {
                    throw new Error('MocksController: Parties collection is empty');
                } 

                index = _.random(count - 1);
                party = parties.getByIndex(index);
                if (!party || !party.id) {
                    throw new Error('MocksController: Parties collection is empty');
                }

                setting = pipSettingsDataGenerator.initObject({
                    party_id: party.id,
                    creator_id: party.id
                });
                console.log('onPartiesSettingsPOST', setting);
                
                req = {
                    method: 'POST',
                    url: pipBasicGeneratorServices.serverUrl() + '/api/parties/' + party.id + '/settings',
                    headers: {'Content-Type': undefined},
                    data: setting
                };
                console.log('onPartiesSettingsPOST req', req);

                $http(req)
                    .success(function (result) {
                        console.log('onPartiesSettingsPOST result', result); 
                    })
                    .error(function (error) {
                        console.log('onPartiesSettingsPOST error', error); 
                    }
                );
            }          

            function onPartiesSettingsGET() {
                var party,
                    index,
                    count,
                    parties = dataset.get('PartiesTestCollection'),
                    req;

                if (!parties) {
                    throw new Error('MocksController: Parties collection is not found');
                } 

                count = parties.getAll().length;
                if (count === 0) {
                    throw new Error('MocksController: Parties collection is empty');
                } 

                index = _.random(count - 1);
                party = parties.getByIndex(index);
                if (!party || !party.id) {
                    throw new Error('MocksController: Parties collection is empty');
                }

                req = {
                        method: 'GET',
                        url: pipBasicGeneratorServices.serverUrl() + '/api/parties/' + party.id + '/settings',
                        headers: { 'Content-Type': undefined }
                     };
                console.log('onPartiesSettingsGET req', req);

                $http(req)
                    .success(function (result) {
                        console.log('onPartiesSettingsGET result', result); 
                    })
                    .error(function (error) {
                        console.log('onPartiesSettingsGET error', error); 
                    }
                );
            }  


            // feedbacks api

            function onFeedbackPOST() {
                var feedback,
                    req;

                feedback = pipFeedbackDataGenerator.newObject();
                console.log('onFeedbackPOST', feedback);

                req = {
                    method: 'POST',
                    url: pipBasicGeneratorServices.serverUrl() + '/api/feedbacks',
                    headers: {'Content-Type': undefined},
                    data: feedback
                };
                console.log('onFeedbackPOST req', req);

                $http(req)
                    .success(function (result) {
                        console.log('onFeedbackPOST result', result); 
                    })
                    .error(function (error) {
                        console.log('onFeedbackPOST error', error); 
                    }
                );
            }          

            function onFeedbacksGET() {
                var req = {
                        method: 'GET',
                        url: pipBasicGeneratorServices.serverUrl() + '/api/feedbacks',
                        headers: {'Content-Type': undefined},
                        data: null
                    };

                console.log('onFeedbacksGET req', req);

                $http(req)
                    .success(function (result) {
                        console.log('onFeedbacksGET result', result); 
                    })
                    .error(function (error) {
                        console.log('onFeedbacksGET error', error); 
                    }
                );
            }   

            function onFeedbackGET() {
                var feedback,
                    index,
                    count,
                    feedbacks = dataset.get('FeedbacksTestCollection'),
                    req;

                if (!feedbacks) {
                    throw new Error('MocksController: Feedbacks collection is not found');
                } 

                count = feedbacks.getAll().length;
                if (count === 0) {
                    throw new Error('MocksController: Feedbacks collection is empty');
                } 

                index = _.random(count - 1);
                feedback = feedbacks.getByIndex(index);
                if (!feedback || !feedback.id) {
                    throw new Error('MocksController: Feedbacks collection is empty');
                }

                req = {
                        method: 'GET',
                        url: pipBasicGeneratorServices.serverUrl() + '/api/feedbacks/' + feedback.id,
                        headers: { 'Content-Type': undefined },
                        data: {}
                     };
                console.log('onFeedbackGET req', req);

                $http(req)
                    .success(function (result) {
                        console.log('onFeedbackGET result', result); 
                    })
                    .error(function (error) {
                        console.log('onFeedbackGET error', error); 
                    }
                );
            }   

            function onFeedbackPUT() {
                var feedback,
                    index,
                    count,
                    feedbacks = dataset.get('FeedbacksTestCollection'),
                    req;

                if (!feedbacks) {
                    throw new Error('MocksController: Feedbacks collection is not found');
                } 

                count = feedbacks.getAll().length;
                if (count === 0) {
                    throw new Error('MocksController: Feedbacks collection is empty');
                } 

                index = _.random(count - 1);
                feedback = feedbacks.getByIndex(index);
                if (!feedback || !feedback.id) {
                    throw new Error('MocksController: Feedbacks collection is empty');
                }
                     
                // change feedback
                feedback.title = chance.sentence();
                feedback.content = chance.paragraph();
 
                req = {
                    method: 'PUT',
                    url: pipBasicGeneratorServices.serverUrl() + '/api/feedbacks/' + feedback.id,
                    headers: {'Content-Type': undefined},
                    data: feedback
                };
                console.log('onFeedbackPUT req', req);

                $http(req)
                    .success(function (result) {
                        console.log('onFeedbackPUT result', result); 
                    })
                    .error(function (error) {
                        console.log('onFeedbackPUT error', error); 
                    }
                );
            }   

            function onFeedbackDELETE() {
                var feedback,
                    index,
                    count,
                    feedbacks = dataset.get('FeedbacksTestCollection'),
                    req;

                if (!feedbacks) {
                    throw new Error('MocksController: Feedbacks collection is not found');
                } 

                count = feedbacks.getAll().length;
                if (count === 0) {
                    throw new Error('MocksController: Feedbacks collection is empty');
                } 

                index = _.random(count - 1);
                feedback = feedbacks.getByIndex(index);
                if (!feedback || !feedback.id) {
                    throw new Error('MocksController: Feedbacks collection is empty');
                }

                var req = {
                    method: 'DELETE',
                    url: pipBasicGeneratorServices.serverUrl() + '/api/feedbacks/' + feedback.id,
                    headers: { 'Content-Type': undefined }
                };
                console.log('onFeedbackDELETE req', req);

                $http(req)
                    .success(function (result) {
                        console.log('onFeedbackDELETE result', result); 
                    })
                    .error(function (error) {
                        console.log('onFeedbackDELETE error', error); 
                    }
                );
            }   
                        
        }
    );

})(window.angular);
