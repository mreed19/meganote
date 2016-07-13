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
}
