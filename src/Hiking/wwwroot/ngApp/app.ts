namespace Hiking {

    angular.module('Hiking', ['ui.router', 'ngResource', 'ui.bootstrap', 'uiGmapgoogle-maps', 'ngAnimate']).config((
        $stateProvider: ng.ui.IStateProvider,
        $urlRouterProvider: ng.ui.IUrlRouterProvider,
        $locationProvider: ng.ILocationProvider,
        uiGmapGoogleMapApiProvider: any
    ) =>
    {
        uiGmapGoogleMapApiProvider.configure({
            //key: 'AIzaSyDipwkGrC3bLZpUpEGaqcsIDKu5_AmT7C0',
        });
        // Define routes
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: '/ngApp/views/home.html',
                controller: Hiking.Controllers.HomeController,
                controllerAs: 'controller'
            })
            .state('trails', {
                url: '/trails',
                templateUrl: '/ngApp/views/trails.html',
                controller: Hiking.Controllers.TrailsController,
                controllerAs: 'controller'
            })
            .state('trailmap', {
                url: '/trailmap',
                templateUrl: '/ngApp/Trails/Views/trailMap.html',
                controller: Hiking.Controllers.TrailMapController,
                controllerAs: 'controller'
            })
            .state('trailDetail', {
                url: '/trailDetail/:id',
                templateUrl: '/ngApp/views/trailDetail.html',
                controller: Hiking.Controllers.TrailDetailsController,
                controllerAs: 'controller'
            })
            .state( 'changes', {
                url: '/changes/:id?',
                templateUrl: '/ngApp/views/AddEditDeleteTrail.html',
                controller: Hiking.Controllers.AddEditDeleteTrailClientController,
                controllerAs: 'controller'
            })
            .state('secret', {
                url: '/secret',
                templateUrl: '/ngApp/views/secret.html',
                controller: Hiking.Controllers.SecretController,
                controllerAs: 'controller'
            })
            .state('login', {
                url: '/login',
                templateUrl: '/ngApp/views/login.html',
                controller: Hiking.Controllers.LoginController,
                controllerAs: 'controller'
            })
            .state('register', {
                url: '/register',
                templateUrl: '/ngApp/views/register.html',
                controller: Hiking.Controllers.RegisterController,
                controllerAs: 'controller'
            })
            .state('externalRegister', {
                url: '/externalRegister',
                templateUrl: '/ngApp/views/externalRegister.html',
                controller: Hiking.Controllers.ExternalRegisterController,
                controllerAs: 'controller'
            }) 
            .state('about', {
                url: '/about',
                templateUrl: '/ngApp/views/about.html',
                controller: Hiking.Controllers.AboutController,
                controllerAs: 'controller'
            })
            .state('viewprofile', {
                url: '/viewprofile',
                templateUrl: '/ngApp/Users/views/viewprofile.html',
                controller: Hiking.Controllers.ViewProfileController,
                controllerAs: 'controller'
            })
            .state('editprofile', {
                url: '/editprofile/:id',
                templateUrl: '/ngApp/Users/views/EditProfile.html',
                controller: Hiking.Controllers.EditProfileController,
                controllerAs: 'controller'
            })
            .state('blogs', {
                url: '/blogs',
                templateUrl: '/ngApp/Blogs/views/blogs.html',
                controller: Hiking.Controllers.BlogsController,
                controllerAs: 'controller'
            })
            .state('blogDetails', {
                url: '/blogs/:id',
                templateUrl: '/ngApp/Blogs/views/blogDetails.html',
                controller: Hiking.Controllers.BlogDetailsController,
                controllerAs: 'controller'
            })
            .state('addBlog', {
                url: '/blog/add',
                templateUrl: '/ngApp/Blogs/views/addBlog.html',
                controller: Hiking.Controllers.AddBlogController,
                controllerAs: 'controller'
            })
            .state('editBlog', {
                url: '/blogEdit/:id',
                templateUrl: '/ngApp/Blogs/views/editBlog.html',
                controller: Hiking.Controllers.EditBlogController,
                controllerAs: 'controller'
            })
            .state('admin', {
                url: '/admin',
                templateUrl: '/ngApp/Admin/Views/admin.html',
                controller: Hiking.Controllers.ViewProfileController,
                controllerAs: 'controller'
            })
            .state('backpack', {
                url: '/backpack/:id',
                templateUrl: '/ngApp/Users/views/backpack.html',
                controller: Hiking.Controllers.BackPackController,
                controllerAs: 'controller'
            })
            .state('gatherings', {
                url: '/gatherings',
                templateUrl: '/ngApp/Gatherings/Views/gatherings.html',
                controller: Hiking.Controllers.GatheringController,
                controllerAs: 'controller'
            })
            .state('gatheringDetails', {
                url: '/gatheringDetails/:id',
                templateUrl: '/ngApp/Gatherings/Views/gatherDetails.html',
                controller: Hiking.Controllers.GatheringDetailsController,
                controllerAs: 'controller'
            })
            .state('delete', {
                url: '/delete',
                templateUrl: '/ngApp/Users/Views/deleteModal.html',
                controller: Hiking.Controllers.DeleteController,
                controllerAs: 'modal'
            })
            .state( 'about1', {
                url: '/about1',
                templateUrl: '/ngApp/views/About1.html',
                controller: Hiking.Controllers.AboutController,
                controllerAs: 'controller'    
            })
            .state( 'home1', {
                url: '/home1',
                templateUrl: '/ngApp/views/home1.html',
                controller: Hiking.Controllers.AboutController,
                controllerAs: 'controller'
            })
            .state('home2', {
                url: '/home2',
                templateUrl: '/ngApp/views/home2.html',
                controller: Hiking.Controllers.AboutController,
                controllerAs: 'controller'
            })
            .state( 'trekChanges', {
                url: '/trekChanges/:id',
                templateUrl: '/ngApp/views/TrekChanges.html',
                controller: Hiking.Controllers.TrekChangesController,
                controllerAs: 'controller'
            })

            .state('notFound', {
                url: '/notFound',
                templateUrl: '/ngApp/views/notFound.html'
            });

        // Handle request for non-existent route
        $urlRouterProvider.otherwise('/notFound');

        // Enable HTML5 navigation
        $locationProvider.html5Mode(true);
    });

    
    angular.module('Hiking').factory('authInterceptor', (
        $q: ng.IQService,
        $window: ng.IWindowService,
        $location: ng.ILocationService
    ) =>
        ({
            request: function (config) {
                config.headers = config.headers || {};
                config.headers['X-Requested-With'] = 'XMLHttpRequest';
                return config;
            },
            responseError: function (rejection) {
                if (rejection.status === 401 || rejection.status === 403) {
                    $location.path('/login');
                }
                return $q.reject(rejection);
            }
        })
    );

    angular.module('Hiking').config(function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
    });

    

}
