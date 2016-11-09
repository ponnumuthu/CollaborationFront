'use strict';
 
angular.module('myApp').controller('CommentController', ['$scope','$location','$rootScope','CommentService', function($scope,$location,$rootScope,CommentService) {
    
	var self = this;
	self.comment={CommentId:'', forumId:'',userId:'',userName:'',commends:''};
    self.comments=[];
    
    self.submit = submit;
    self.edit = edit;
    self.remove = remove;
    self.reset = reset;
    self.get = get;
    
    fetchAllComments();
    reset();
    function fetchAllComments(){
    	CommentService.fetchAllComments()
            .then(
            function(d) {
                self.comments = d;
            },
            function(errResponse){
                console.error('Error while fetching Comments');
            }
        );
    }
    function submit() {
        if(self.comment.commentId===null){
            console.log('Creating New Comment', self.comments);
            createComment(self.comment);
        }else{
            //updateUser(self.comment, self.comment.commentId);
            console.log('User updated with id ', self.comments.userId);
        }
        reset();
    }
    function createComment(comment){
        CommentService.createComment(comment)
            .then(
            		$scope.message="your are successfully Registered",
            		fetchAllComments,
            function(errResponse){
                console.error('Error while creating Comment');
            }
        );
    }
    function deletecomment(id){
    	CommentService.deleteComment(id)
            .then(
            		fetchAllComments,
            function(errResponse){
                console.error('Error while deleting jobs');
            }
        );
    }
    
    function edit(id){
        console.log('id to be edited', id);
        for(var i = 0; i < self.comments.length; i++){
            if(self.comments[i].commentId === id) {
                self.comment = angular.copy(self.comments[i]);
                break;
            }
        }
    }
    function updateComment(comment, id){
    	CommentService.updateComment(comment, id)
            .then(
            		fetchAllComments,
            function(errResponse){
                console.error('Error while updating jobs');
            }
        );
    }
 
    function remove(id){
        console.log('id to be deleted', id);
        if(self.comment.commentId === id) {//clean form if the user to be deleted is shown there.
            reset();
        }
        deletecomment(id);
    }
 
    function get(comment) {
    	$scope.bc=comment;
		console.log($scope.bc);
		$rootScope.comment=$scope.bc;
		$location.path("viewComment");
    	
	}
 
    function reset(){
    	self.comment={CommentId:'', forumId:'',userId:'',userName:'',commends:''};
       //$scope.myform.$setPristine(); //reset Form
    }
    
    
    
}]);