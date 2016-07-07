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
          notesLoaded: notesLoaded
        }
      })

      .state('notes.form', {
        url: '/:noteId',
        templateUrl: 'notes/notes-form/notes-form.html',
        controller: 'NotesFormController',
        controllerAs: 'vm'
      });
  }

  notesLoaded.$inject = ['NotesService'];
  function notesLoaded(NotesService) {
    return NotesService.getNotes();
  }
}
