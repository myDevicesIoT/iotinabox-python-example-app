var app = angular.module("myApp",["ui.router"]);

app.controller("controller", function($scope, $http, $interval, $rootScope) {

    $scope.getAccess = function() {
        $http({
            method: 'GET',
            url: 'http://localhost:5000/data'
        })
        .then(function successCallback(response) {
            $rootScope.accessToken = response.data.access_token;
            console.log($rootScope.accessToken);
        })
        .catch(function errorCallback(response) {
        });
    };
    
    $scope.getAccess();
});

app.config(['$stateProvider', function($stateProvider) {

    $stateProvider

        .state('home', {
            url: '/home',
            templateUrl: 'home.html',
            controller: 'controller'
        })
        
        .state('data', {
            url: "/userdata",
            templateUrl: "user_data.html",
            controller: "controller"
        })

        .state('companies', {
            url: "/companies",
            templateUrl: "companies.html",
            resolve: {
                getCompanies: function($http, $rootScope) {
                    return $http({
                        method:"GET",
                        url: "https://va-staging-simplysense-api.mydevices.com/companies",
                        headers: {
                            'Authorization': 'Bearer ' + $rootScope.accessToken
                        }
                    });
                }
            },

            controller: function($scope, getCompanies, $rootScope, $stateParams){
                $rootScope.companyData = getCompanies.data;
            }
        })

        .state('locations', {
            url: "/{companyID}/locations",
            parent: "companies",
            templateUrl: "locations.html",
            resolve: {
                getLocations: function($rootScope, $http, $stateParams) {
                    return $http({
                        method:"GET",
                        url: "https://va-staging-simplysense-api.mydevices.com/companies/" + $stateParams.companyID + "/locations",
                        headers: {
                            'Authorization': 'Bearer ' + $rootScope.accessToken
                        }
                    });
                }
            },

            controller: function($scope, $rootScope, getLocations, $stateParams) {
                console.log(getLocations.data);
                $rootScope.locations = getLocations.data;
            }
        })

        .state('sensors', {
            url: "/{locationID}/sensors",
            parent: "locations",
            templateUrl: "sensors.html",
            resolve: {
                getSensors : function($rootScope, $http, $stateParams) {
                    return $http({
                        method:"GET",
                        url: "https://va-staging-simplysense-api.mydevices.com/companies/" + $stateParams.companyID + "/locations/" + $stateParams.locationID + "/things?type=sensor",
                        headers: {
                            'Authorization': 'Bearer ' + $rootScope.accessToken
                        }
                    });
                }
            },
            controller: function($rootScope, getSensors) {
                $rootScope.sensors = getSensors.data;
            }
        });

}]);