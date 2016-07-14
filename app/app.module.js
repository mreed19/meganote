{
  angular.module('meganote', [
    'ui.router',
    'ngFlash',
    'textAngular',
    'angularSpinner',
    'ngLoadingSpinner',
    'meganote.notes',
    'meganote.notesForm',
    'meganote.signUp',
    'meganote.users',
    'meganote.signIn'
  ])
  .config(configFunction);

  configFunction.$inject = ['$urlRouterProvider'];
  function configFunction($urlRouterProvider) {
    $urlRouterProvider.otherwise('/notes/');
  }

  run.$inject = ['$rootScope', '$state'];
  function run($rootScope, $state) {
    $rootScope.$on('$stateChangeSucess', () => {
      $rootScope.$state = $state;
    });

    $rootScope.$on('$stateChangError', () => {
      $state.go('sign-in');
    });
  }
}
