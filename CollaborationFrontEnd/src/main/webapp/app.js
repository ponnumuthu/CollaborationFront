var app = angular.module('myApp', ['ngRoute']);

/*app.Controller('HomeController', function($scope) {
$scope.message = 'Hello from HomeController';
});*/


app.config(['$routeProvider',
		function($routeProvider) {
	$routeProvider
	
	.when('/register', {
		templateUrl : 'user/register.html',
		controller : 'UserController',
		controllerAs: 'ctrl'
	})
	.when('/login', {
	templateUrl : 'user/login.html',
	controller : 'UserController'
	})
	.when('/blog', {
	templateUrl : 'blog/blog.html',
	controller : 'BlogControler'
	})
	/*.when('/home', {
		templateUrl : 'home/home.html',
		controller : 'UserController'
		
	})
	
	.when('/jobs', {
	templateUrl : 'jobs/job.html',
	controller : 'JobController'
	})

	.when('/manageUser',{
	templateUrl : 'admin/manageUser.html',
	controller : 'AdminControler'
	})

	

	.when('/even', {
	templateUrl : 'event/event.html',
	controler : 'EventController'
	})

	.when('/about', {
	templateUrl : 'about/about.html',
	controller : 'AboutController'

})*/
	.otherwise( {
		templateUrl : 'home/home.html',
		controller : 'UserController'
	})
}]);
