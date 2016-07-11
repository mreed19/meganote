{
  angular
    .module('meganote.users')
    .config(configFunction);

  configFunction.$inject = ['$stateProvider'];
  function configFunction($stateProvider) {
    $stateProvider.state('sign-up', {
      url: '/sign-up',
      template: '<sign-up></sign-up>'
    })

    .state('user-profile', {
      url: '/profile',
      template: '<user-profile></user-profile>'
    });
  }
}
