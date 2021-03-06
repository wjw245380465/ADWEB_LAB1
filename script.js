// Code goes here

var app=angular.module('coursesApp',['ngRoute','ngAnimate','courseAnimations']);

app.config(function($routeProvider){
  
  $routeProvider.when('/',{
    templateUrl:'home.html',
    controller:'HomeCtrl'
  })
  .when('/course/:id',{
    templateUrl:'course.html',
    controller:'ViewCourseCtrl'
  });
  
});

app.factory('coursesDataSvc', function(){
  var courses = [
    {
      'id':1, 
      'title':'Introduction to Angular JS',
      'rating':4,
      'numberOfRatings':100,
      'totalViews':1000,
      'lastWeekViews':100,
      'category':'JavaScript',
      'level':'100',
      'topics':[
        'What is Angular JS?',
        'Basics and Data binding',
        'Building blocks',
        'Services, Values and Factories',
        'AJAX and Promises',
        'Routing'
        ]
    },
    {
    'id':2, 
    'title':'Advanced Angular JS',
    'rating':4.5,
    'numberOfRatings':150,
    'totalViews':1200,
    'lastWeekViews':140,
    'category':'JavaScript',
    'level':'300',
    'topics':[
      'Directives',
      'Animations',
      'Unit Testing',
      'End-to-end Testing'
      ]
    },
    {
    'id':3, 
    'title':'ASP.NET MVC Fundamentals',
    'rating':4,
    'numberOfRatings':100,
    'totalViews':1000,
    'lastWeekViews':100,
    'category':'ASP.NET',
    'level':'200',
    'topics':[
      'Web forms vs MVC',
      'Why MVC?',
      'Model',
      'View',
      'Controller',
      'Going further...'
      ]
    },
    {
    'id':4, 
    'title':'ASP.NET in VS 2013',
    'rating':4,
    'numberOfRatings':100,
    'totalViews':1000,
    'lastWeekViews':100,
    'category':'ASP.NET',
    'level':'300',
    'topics':[
      'Overview',
      'OWIN and Katana',
      'Updates to Web Forms',
      'Updates to MVC and Razor Views',
      'Web API 2 and OData',
      'Tooling Support'
      ]
    },
    {
    'id':5, 
    'title':'Async in C#',
    'rating':4.2,
    'numberOfRatings':100,
    'totalViews':1000,
    'lastWeekViews':100,
    'category':'C#',
    'level':'400',
    'topics':[
      'Introduction',
      'Evolution of async with C# and .NET',
      'Task Parallel Library',
      'Using async and await',
      'Patterns and Best Practices'
      ]
    },
    {
    'id':6, 
    'title':'LINQ',
    'rating':3.8,
    'numberOfRatings':100,
    'totalViews':1000,
    'lastWeekViews':100,
    'category':'C#',
    'level':'200',
    'topics':[
      'C# Language improvements',
      'Basic LINQ Queries',
      'Queries in Lambda Expression Syntax',
      'Deferred and Immediate Execution',
      'LINQ in Layered Applications',
      'Expressions and LINQ to Remote'
      ]
    },
    {
    'id':7, 
    'title':'SQL Server Fundamentals',
    'rating':4.5,
    'numberOfRatings':100,
    'totalViews':1000,
    'lastWeekViews':100,
    'category':'SQL Server',
    'level':'100',
    'topics':[
      'Overview',
      'Creating tables and constraints',
      'Basic CRUD Operations',
      'Join Queries',
      'Apply, Merge and CTE',
      'Transactions',
      'Query Tuning'
      ]
    },
    {
    'id':8, 
    'title':'ASP.NET Web API OData',
    'rating':3.3,
    'numberOfRatings':100,
    'totalViews':1000,
    'lastWeekViews':100,
    'category':'ASP.NET',
    'level':'300',
    'topics':[
      'REST and OData',
      'OData in Web API using ODataController',
      'OData using EntitySetController',
      'Consuming OData Services from .NET and JavaScript clients'
      ]
    },
    {
    'id':9, 
    'title':'Trasactions in SQL Server',
    'rating':4.8,
    'category':'SQL Server',
    'level':'400',
    'topics':[
      'Intro to Transact-SQL',
      'Basic Transactions',
      'Transactions in procedures and triggers',
      'Error Handling',
      'Transaction best practices'
      ]
    },
    {
    'id':10, 
    'title':'Intro to Node.js',
    'rating':3,
    'numberOfRatings':100,
    'totalViews':1000,
    'lastWeekViews':100,
    'category':'JavaScript',
    'level':'200',
    'topics':[
      'What is Node.js?',
      'Asynchronous actions and Event loop',
      'Accessing file system',
      'Accessing Databases',
      'Unit testing',
      'Deploying Node.js Apps'
      ]
    }
  ];
  
  function getAllCourses(){
    return courses;
  }
  
  function getCourse(id){
    var filtered = _.filter(courses, function(c){
      return c.id === id;
    });
    return filtered[0];
  }
  
  return {
    getAllCourses:getAllCourses,
    getCourse:getCourse
  };
});

app.controller('HomeCtrl', function($scope, coursesDataSvc){
  $scope.courses = coursesDataSvc.getAllCourses();
});

app.controller('ViewCourseCtrl',function($scope, $routeParams, coursesDataSvc){
  if ($routeParams.id) {
    $scope.course = coursesDataSvc.getCourse(parseInt($routeParams.id));
  }
  else{
    $scope.course = coursesDataSvc.getCourse(1);
  }
});

app.directive('courseDetails', function($animate){
  return {
    scope: true,
    templateUrl:'courseDetails.html',
    link: function(scope, elem, attrs){
      scope.viewDetails = true;
      elem.find('button').bind('click', function(){
        $animate.addClass(elem, "switching", function(){
          scope.viewDetails = !scope.viewDetails;
          scope.$apply();
          elem.removeClass("switching");
        });
      });
    }
  };
});