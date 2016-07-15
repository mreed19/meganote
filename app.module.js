{
  angular.module('meganote', [
    'ui.router',
    'ngFlash',
    'textAngular',
    'angularSpinner',
    'ngLoadingSpinner',
    'ngResource',
    'meganote.notes',
    'meganote.notesForm',
    'meganote.signUp',
    'meganote.users',
    'meganote.signIn'
  ])
  .config(configFunction)
  .run(run);

  configFunction.$inject = ['$urlRouterProvider'];
  function configFunction($urlRouterProvider) {
    $urlRouterProvider.otherwise('/notes/');
  }

  run.$inject = ['$rootScope', '$state'];
  function run($rootScope, $state) {
    $rootScope.$on('$stateChangeSuccess', () => {
      $rootScope.$state = $state;
    });

    $rootScope.$on('$stateChangeError', () => {
      $state.go('sign-in');
    });
  }
}
