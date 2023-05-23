(function () {

    angular.module(page.APPNAME)
        .config(["$routeProvider", "$locationProvider",
            function ($routeProvider, $locationProvider) {

                $routeProvider.caseInsensitiveMatch = true;

                $locationProvider.hashPrefix('!');

                $routeProvider.when('/', { 
                    templateUrl: '/js/nostreets/app/templates/home.html',
                    controller: 'homeController',
                    controllerAs: 'pg'
                }).when('/skills', {
                    templateUrl: '/js/nostreets/app/templates/skills.html',
                    controller: 'skillsController',
                    controllerAs: 'pg'
                }).when('/pastProjects', {
                    templateUrl: '/js/nostreets/app/templates/pastProjects.html',
                    controller: 'pastEmployersController',
                    controllerAs: 'pg'
                }).when('/contact', {
                    templateUrl: '/js/nostreets/app/templates/contact.html',
                    controller: 'contactUsController',
                    controllerAs: 'pg'
                }).when('/about', {
                    templateUrl: '/js/nostreets/app/templates/about.html',
                    controller: 'aboutController',
                    controllerAs: 'pg'
                }).when('/applicationsInProgress', {
                    templateUrl: '/js/nostreets/app/templates/applicationsInProgress.html',
                    controller: 'personalProjectsController',
                    controllerAs: 'pg'
                }).when('/dynamicGraphs', {
                    templateUrl: '/js/nostreets/app/templates/dynamicGraphs.html',
                    controller: 'dynamicGraphsController',
                    controllerAs: 'pg'
                }).when('/cardBuilder', {
                    templateUrl: '/js/nostreets/app/templates/bootstrapCardBuilder.html',
                    controller: 'cardBuilderController',
                    controllerAs: 'pg'
                }).when('/billManager', {
                    templateUrl: '/js/nostreets/app/templates/billManager.html',
                    controller: 'billManagerController',
                    controllerAs: 'pg'
                });

                $locationProvider.html5Mode({
                    enabled: false,
                    requireBase: false
                });
            }]);
})();