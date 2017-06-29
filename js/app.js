(function(angular) {
    'use strict';

    var myApp = angular.module('myApp', []);

    myApp.config(['$locationProvider', function($locationProvider) {
        $locationProvider.hashPrefix('');
    }]);

    var TodomvcController = myApp.controller('TodomvcController', ['$scope', '$location', function($scope, $location) {

        $scope.input = '';

        $scope.todos = [{
            'id': 0.123,
            'content': 'HTML',
            'completed': true
        }, {
            'id': 0.456,
            'content': 'CSS',
            'completed': true
        }, {
            'id': 0.789,
            'content': 'JavaScript',
            'completed': false
        }];

        $scope.flag = true;
        $scope.toggleAll = function() {
            for (var i = 0; i < $scope.todos.length; i++) {
                $scope.todos[i].completed = $scope.flag;
            }
            $scope.flag = !$scope.flag;
        };

        $scope.add = function() {
            $scope.todos.push({
                'id': getId(),
                'content': $scope.input,
                'completed': false
            });
            $scope.input = '';
        };

        function getId() {
            var id = Math.random();
            for (var i = 0; i < $scope.todos.length; i++) {
                if (id == $scope.todos[i].id) {
                    id = getId();
                    break;
                }
            }
            return id;
        };

        $scope.allCompleted = function() {
            var flag = false;
            for (var i = 0; i < $scope.todos.length; i++) {
                if ($scope.todos[i].completed) {
                    flag = true;
                    break;
                }
            }
            return flag;
        };

        $scope.clear = function() {
            var result = [];
            for (var i = 0; i < $scope.todos.length; i++) {
                if (!$scope.todos[i].completed) {
                    result.push($scope.todos[i]);
                }
            }
            $scope.todos = result;
        };

        $scope.remove = function(id) {
            for (var i = 0; i < $scope.todos.length; i++) {
                if (id == $scope.todos[i].id) {
                    $scope.todos.splice(i, 1);
                    break;
                }
            }
        };

        $scope.$location = $location;
        $scope.$watch('$location.path()', function(now, old) {
            switch (now) {
                case '/active':
                    $scope.search = { 'completed': false };
                    break;
                case '/completed':
                    $scope.search = { 'completed': true };
                    break;
                default:
                    $scope.search = {};
            }
        });

        $scope.currentEditingId = -1;
        $scope.editing = function(id) {
            $scope.currentEditingId = id;
        };

        $scope.save = function() {
            $scope.currentEditingId = -1;
        };


    }]);



})(angular);