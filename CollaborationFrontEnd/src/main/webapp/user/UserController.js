'use strict';
 
angular.module('myApp').controller('UserController', ['$scope', '$location', 'UserService', function($scope, $location, UserService) {
    
	var self = this;
	self.user={userId:'',userName:'',role:'',emailId:'',phoneNo:'',passWord:'',address:'',zipCode:''};
    self.users=[];
    
    self.submit = submit;
    self.edit = edit;
    self.remove = remove;
    self.reset = reset; 
    

    fetchAllUsers();
    reset();

    function fetchAllUsers(){
        UserService.fetchAllUsers()
            .then(
            function(d) {
                self.users = d;
            },
            function(errResponse){
                console.error('Error while fetching Users');
            }
        );
    }
    function createUser(user){
        UserService.createUser(user)
            .then(
            		 $location.path('/login'),
            		$scope.message="your are successfully Registered",
            		
            		fetchAllUsers,
           
            function(errResponse){
                console.error('Error while creating User');
            }
        );
    }
 
    function updateUser(user, id){
        UserService.updateUser(user, id)
            .then(
            fetchAllUsers,
            function(errResponse){
                console.error('Error while updating User');
            }
        );
    }
    
    function deleteUser(id){
        UserService.deleteUser(id)
            .then(
            fetchAllUsers,
            function(errResponse){
                console.error('Error while deleting User');
            }
        );
    }
 
    function submit() {
        if(self.user.userId===null){
            console.log('Saving New User', self.users);
            createUser(self.user);
        }else{
            updateUser(self.user, self.user.userId);
            console.log('User updated with id ', self.users.userId);
        }
        reset();
    }
 
    function edit(id){
        console.log('id to be edited', id);
        for(var i = 0; i < self.users.length; i++){
            if(self.users[i].userId === id) {
                self.user = angular.copy(self.users[i]);
                break;
            }
        }
    }
 
    function remove(id){
        console.log('id to be deleted', id);
        if(self.user.userId === id) {//clean form if the user to be deleted is shown there.
            reset();
        }
        deleteUser(id);
    }
 
 
    function reset(){
    	self.user={userId:null,userName:'',role:'',emailId:'',phoneNo:'',passWord:'',address:'',zipCode:''};
       
        //$scope.myForm.$setPristine(); //reset Form
    }
}]);