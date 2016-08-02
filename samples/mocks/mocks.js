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
        function ($scope, pipAppBar, $timeout, pipSession, $http, pipDataGeneratorGeneral, pipFakeDataModelUsers,
        pipUserDataGenerator, pipDataGenerator) {

            var userId = '565f12ef8ff2161b1dfeedbf';

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

            pipAppBar.showMenuNavIcon();
            pipAppBar.showLanguage();
            pipAppBar.showTitleText('MOCKS');

            return;

            // Entry APi 
            // ----------------------

            function onSignIn() {
                var req = {
                    method: 'POST',
                    url: pipDataGeneratorGeneral.serverUrl() + '/api/signin',
                    headers: {
                      'Content-Type': undefined
                    },
                    data: {
                        email: pipDataGeneratorGeneral.getEmail(), 
                        password: pipDataGeneratorGeneral.getPassword(),
                        remember: true
                    }
                };

                console.log('onSignIn req', req);

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
                    url: pipDataGeneratorGeneral.serverUrl() + '/api/signout',
                    headers: {
                      'Content-Type': undefined
                    },
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
                    url: pipDataGeneratorGeneral.serverUrl() + '/api/signup',
                    headers: {
                      'Content-Type': undefined
                    },
                    data: {
                        email: pipDataGeneratorGeneral.getEmail(), 
                        password: pipDataGeneratorGeneral.getPassword(),
                        name: pipDataGeneratorGeneral.getName(),
                        language: pipDataGeneratorGeneral.getOne(['en', 'ru'])
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
                    url: pipDataGeneratorGeneral.serverUrl() + '/api/signup_validate',
                    headers: {
                      'Content-Type': undefined
                    },
                    data: {email: pipDataGeneratorGeneral.getEmail()}
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
                var req = {
                    method: 'POST',
                    url: pipDataGeneratorGeneral.serverUrl() + '/api/verify_email',
                    headers: {
                      'Content-Type': undefined
                    },
                    data: {email: pipDataGeneratorGeneral.getEmail(), code: pipDataGeneratorGeneral.getPassword()}
                };

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
                var req = {
                    method: 'POST',
                    url: pipDataGeneratorGeneral.serverUrl() + '/api/recover_password',
                    headers: {
                      'Content-Type': undefined
                    },
                    data: {email: pipDataGeneratorGeneral.getEmail()}
                };

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
                var req = {
                    method: 'POST',
                    url: pipDataGeneratorGeneral.serverUrl() + '/api/reset_password',
                    headers: {
                      'Content-Type': undefined
                    },
                    data: {
                        email: pipDataGeneratorGeneral.getEmail(), 
                        password: pipDataGeneratorGeneral.getPassword(),
                        code: pipDataGeneratorGeneral.getPassword()
                    }
                };

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
                    url: pipDataGeneratorGeneral.serverUrl() + '/api/change_password',
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
                var user = pipFakeDataModelUsers.addOne(),
                    req;
                
                console.log('onUser', user);

                if (!user || !user.id) { return; }

                req = {
                    method: 'POST',
                    url: pipDataGeneratorGeneral.serverUrl() + '/api/users',
                    headers: {
                      'Content-Type': undefined
                    },
                    data: { test: 'onUserPOST' }
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
                    url: pipDataGeneratorGeneral.serverUrl() + '/api/users',
                    headers: {
                      'Content-Type': undefined
                    },
                    data: { test: 'onUsersGET' }
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
                var req = {
                    method: 'GET',
                    url: pipDataGeneratorGeneral.serverUrl() + '/api/users/' + userId,
                    headers: {
                      'Content-Type': undefined
                    },
                    data: { test: 'onUsersGET' }
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
                var req = {
                    method: 'PUT',
                    url: pipDataGeneratorGeneral.serverUrl() + '/api/users/' + userId,
                    headers: {
                      'Content-Type': undefined
                    },
                    data: { test: 'onUserPUT' }
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
                    url: pipDataGeneratorGeneral.serverUrl() + '/api/users/' + userId,
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
                    url: pipDataGeneratorGeneral.serverUrl() + '/api/users/current',
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

        }
    );

})(window.angular);
