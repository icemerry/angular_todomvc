(function(angular) {

    angular.module('todomvc.directive.autofocus', [])
        .directive('autoFocus', ['$location', function($location) {
            return {
                restrict: 'A',
                link: function($scope, $element, $attrs) {
                    $scope.$location = $location;
                    $scope.$watch('$location.path()', function(now, old) {
                        var path = $location.path();
                        var type = $element.attr('href').replace(/#(\/.*)/, '$1');
                        if (path == type) {
                            $element.parent().parent().children().children().removeClass('selected');
                            $element.addClass('selected');
                        }
                    });
                }
            }
        }]);
})(angular);