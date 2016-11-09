'use strict';
 
angular.module('myApp').factory('BlogService', ['$http', '$q', function($http, $q){
 
    var REST_SERVICE_URI = 'http://localhost:8081/CollaborationBack/blogs/';
 
    var factory = {
        fetchAllBlogs: fetchAllBlogs,
        createBlog: createBlog,
        updateBlog:updateBlog,
        deleteBlog:deleteBlog
    };
 
    return factory;
 
    function fetchAllBlogs() {
        var deferred = $q.defer(); 
        $http.get(REST_SERVICE_URI)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while fetching Blogs');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }
    function createBlog(blog) {
        var deferred = $q.defer();
        $http.post(REST_SERVICE_URI, blog)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while creating Blogs');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }
 
 
    function updateBlog(blog, id) {
        var deferred = $q.defer();
        $http.put(REST_SERVICE_URI+id, blog)
            .then(
            function (response) {
            	console.log(REST_SERVICE_URI + id);
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while updating Blogs');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }
 
    function deleteBlog(id) {
        var deferred = $q.defer(); 
        $http.delete(REST_SERVICE_URI + id)
            .then( 
            function (response) { 
                deferred.resolve(response.data);
            },
            function(errResponse){ 
                console.error('Error while deleting Blogs');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }
}]);
 