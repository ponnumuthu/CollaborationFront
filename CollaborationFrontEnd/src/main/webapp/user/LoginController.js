(function () {
    'use strict';
 
    angular
        .module('myApp')
        .controller('LoginController', LoginController);
 
    LoginController.$inject = ['$location', 'AuthenticationService', 'FlashService','UserService'];
    function LoginController($location, AuthenticationService, FlashService, UserService) {
        var vm = this;
 
        vm.login = login;
 
        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();
 
        function login() {
            vm.dataLoading = true;
            AuthenticationService.Login(vm.userName, vm.passWord, function (response) {
                if (response.success) {
                    AuthenticationService.SetCredentials(vm.userName, vm.passWord);
                    $location.path('/'); 
                } else {
                    FlashService.Error(response.message);
                    vm.dataLoading = false;
                }
            });
        };
    }
 
})();