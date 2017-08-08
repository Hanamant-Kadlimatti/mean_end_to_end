var app = angular.module('app', ['ngRoute']);
         app.controller('HomeController', function ($http) {
            var vm = this;
            vm.title = "This Is Home Page"

            vm.users = [];
            vm.detailedUser ;

            vm.showDetails = function(user){
               vm.detailedUser = user;
               vm.detailed = true;
            }

            vm.getUsers = function(){
                $http.get('/api/users').then(function(response){
                    vm.users = response.data;
                });
            }
            vm.getUsers();
            
           // Create User
            vm.addUser = function(user){
                //console.log(user);
                if(user && user.name && user.age){
                    console.log("About User is Created");
                    $http.post('/api/users', user).then(function(response){
                        vm.getUsers();
                        vm.user = ''
                        vm.adduser = false;
                    })
                }else{
                   console.log("You have not supplien Enough Deatils")
                }
            }
            
            // Remove User
             vm.removeUser = function(user){
                 if(user){
                  $http.delete('/api/users/',  user).then(function(response){
                      console.log(user);
                      vm.getUsers();
                  });
             }
            }  
            
            // Update User
            vm.updateUser = function(user){
                console.log(user); 
                if(user){
                    $http.put('/api/users', user).then(function(response){
                      vm.getUsers();
                    })
                }
            }

        });

        app.config(function ($routeProvider) {


            $routeProvider.when('/', {
                controller: 'HomeController',
                controllerAs: 'vm',
                templateUrl: './home.html'
            })

            $routeProvider.otherwise('/');
        })