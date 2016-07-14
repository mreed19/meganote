{
  angular
    .module('meganote.notes')
    .config(configFunction);

  configFunction.$inject = ['$stateProvider'];
  function configFunction($stateProvider) {
    $stateProvider

      .state('notes', {
        url: '/notes',
        templateUrl: 'notes/notes.html',
        controller: 'NotesController',
        controllerAs: 'vm',
        resolve: {
          authenticated: authenticated
        },
        data: {
          title: 'Notes'
        }
      })

      .state('notes.form', {
        url: '/:noteId',
        templateUrl: 'notes/notes-form/notes-form.html',
        controller: 'NotesFormController',
        controllerAs: 'vm'
      });
  }

  authenticated.$inject = ['CurrentUser'];
  function authenticated(CurrentUser) {
    return new Promise((resolve, reject) => {
      if (CurrentUser.signedIn()) { resolve(); }
      else { reject(); }
    });
  }
}
