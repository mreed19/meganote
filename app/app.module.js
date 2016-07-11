{
  angular.module('meganote', [
    'ui.router',
    'ngFlash',
    'textAngular',
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
