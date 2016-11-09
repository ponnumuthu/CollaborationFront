'use strict';
 
angular.module('myApp').controller('BlogController', ['$scope','$location','$rootScope','AuthenticationService','BlogService', function($scope,$location,$rootScope,AuthenticationService,BlogService) {
    
	var self = this;
	self.blog={blogId:'', blogName:'',userId:'',userName:$rootScope.globals.currentUser.userName,status:'N',message:'',content:''};
    self.blogs=[];
    
    self.submit = submit;
    self.edit = edit;
    self.remove = remove;
    self.reset = reset;
    self.get = get;
    
    fetchAllBlogs();
    reset();
    function fetchAllBlogs(){
    	BlogService.fetchAllBlogs()
            .then(
            function(d) {
                self.blogs = d;
            },
            function(errResponse){
                console.error('Error while fetching Blogs');
            }
        );
    }
    function submit() {
        if(self.blog.blogId===null){
            console.log('Creating New Blog', self.blogs);
            createBlog(self.blog);
        }else{
            //updateUser(self.blog, self.blog.blogId);
            console.log('User updated with id ', self.blogs.userId);
        }
        reset();
    }
    function createBlog(blog){
        BlogService.createBlog(blog)
            .then(
            		$scope.message="your are successfully Registered",
            		fetchAllBlogs,
            function(errResponse){
                console.error('Error while creating Blog');
            }
        );
    }
    function deleteblog(id){
    	BlogService.deleteBlog(id)
            .then(
            		fetchAllBlogs,
            function(errResponse){
                console.error('Error while deleting jobs');
            }
        );
    }
    
    function edit(id){
        console.log('id to be edited', id);
        for(var i = 0; i < self.blogs.length; i++){
            if(self.blogs[i].blogId === id) {
                self.blog = angular.copy(self.blogs[i]);
                break;
            }
        }
    }
    function updateBlog(blog, id){
    	BlogService.updateBlog(blog, id)
            .then(
            		fetchAllBlogs,
            function(errResponse){
                console.error('Error while updating jobs');
            }
        );
    }
 
    function remove(id){
        console.log('id to be deleted', id);
        if(self.blog.blogId === id) {//clean form if the user to be deleted is shown there.
            reset();
        }
        deleteblog(id);
    }
 
    function get(blog) {
    	$scope.bc=blog;
		console.log($scope.bc);
		$rootScope.blog=$scope.bc;
		$location.path("viewBlog");
    	
	}
 
    function reset(){
    	self.blog={blogId:null,blogName:'',userId:'',userName:'',status:'N',desc:'',content:''};
       //$scope.myform.$setPristine(); //reset Form
    }
    
    
    
}]);