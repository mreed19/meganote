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
      },
      onExit: ['Flash', (Flash) => {
        Flash.clear();
      }]
    })

    .state('sign-in', {
      url: '/sign-in',
      template: '<sign-in></sign-in>',
      data: {
        title: 'Sign in'
      },
      onExit: ['Flash', (Flash) => {
        Flash.clear();
      }]
    })

    .state('user-profile', {
      url: '/profile',
      template: '<user-profile></user-profile>',
      data: {
        title: 'Profile'
      },
      onExit: ['Flash', (Flash) => {
        Flash.clear();
      }]
    });
  }
}
