{
  angular
    .module('meganote.users')
    .config(configFunction);

  configFunction.$inject = ['$stateProvider'];
  function configFunction($stateProvider) {
    $stateProvider.state('sign-up', {
      url: '/sign-up',
      template: '<sign-up></sign-up>',
      data: {
        title: 'Sign up'
      }
    })

    .state('sign-in', {
      url: '/sign-in',
      template: '<sign-in></sign-in>',
      data: {
        title: 'Sign in'
      }
    })

    .state('user-profile', {
      url: '/profile',
      template: '<user-profile></user-profile>',
      data: {
        title: 'Profile'
      }
    });
  }
}
