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
            pipUserDataGenerator, pipPartyAccessDataGenerator, pipSessionsDataGenerator,
            TestCollection, pipTestDataService,
            pipImageResources, pipAvatarsDataGenerator, pipFilesDataGenerator) {

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

            pipAppBar.showMenuNavIcon();
            pipAppBar.showLanguage();
            pipAppBar.showTitleText('MOCKS');

            return;


            function prepareData() {
                var tcPartyAccess, tcSessions, tcUsers, tcImages, tcAvatars,
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
                // init collection
                dataSet.init();

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
                var user,
                    users = dataset.get('UsersTestCollection'),
                    req = {
                        method: 'POST',
                        url: pipBasicGeneratorServices.serverUrl() + '/api/signup_validate',
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

                req.data = {email: user.email}
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
                var req = {
                    method: 'DELETE',
                    url: pipBasicGeneratorServices.serverUrl() + '/api/users/' + userId,
                    headers: {
                      'Content-Type': undefined
                    },
                    data: { test: 'onUserDELETE' }
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
                    headers: {
                      'Content-Type': undefined
                    },
                    data: { test: 'onCurrentUserGET' }
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
                var req = {
                    method: 'GET',
                    url: pipBasicGeneratorServices.serverUrl() + '/api/users/' + userId + '/sessions',
                    headers: {
                      'Content-Type': undefined
                    },
                    data: { test: 'onUserSessionsGET' }
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
                var req = {
                    method: 'DELETE',
                    url: pipBasicGeneratorServices.serverUrl() + '/api/users/' + userId + '/sessions/' + sessionId,
                    headers: {
                      'Content-Type': undefined
                    },
                    data: { test: 'onUserSessionDELETE' }
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
                    url: 'http://alpha.pipservices.net/api/parties/565f12ef8ff2161b1dfeedbf/avatar?default_template=goal&bg=rgba(0,188,212,1)&fg=white&timestamp=1470388249000&obj_id=57891f214997deb8138fe233',
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

        }
    );

})(window.angular);
