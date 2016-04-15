(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name frontendApp.controller:QueryCtrl
   * @description
   * # QueryCtrl
   * Controller of the frontendApp
   */
  angular.module('frontendApp')
    .controller('QueryEndemicCtrl', ['$scope', 'Query', 'PickList', function ($scope, Query, PickList) {
      $scope.query = {};
      $scope.stateList = PickList.STATE_LIST;
      $scope.loading = false;

      $scope.queryEndemic = function() {
        $scope.loading = true;
        Query.endemic({ state: $scope.query.endemic })
          .then(function (species) {
            $scope.results = species;
            $scope.query.terms = buildSearchTermString();
          })
          .finally(function () {
            $scope.loading = false;
          });
      };

      function buildSearchTermString() {
        if ( !angular.isArray($scope.query.endemic) )
          return 'All endemic species (only occur in one state)';
        else
          return 'Endemic species (occur in only one state): ' + $scope.query.endemic.join(' OR ');
      }

    }]);

})();
