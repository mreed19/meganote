(function() {
  angular.module('meganote.notes', ['ui.router'])
  .config(notesConfig)
  .controller('NotesController', NotesController);

  notesConfig.$inject = ['$stateProvider'];
  function notesConfig($stateProvider) {
    $stateProvider

      .state('notes', {
        url: '/notes',
        templateUrl: 'notes/notes.html',
        controller: 'NotesController'
      })

      .state('notes.form', {
        url: '/:noteId',
        templateUrl: 'notes/notes-form.html'
      });
  }

  NotesController.$inject = ['$state', '$scope', 'NotesService'];
  function NotesController($state, $scope, NotesService) {
    $state.go('notes.form');
    NotesService.getNotes()
    .then(function() {
      $scope.notes = NotesService.notes;
    });

    $scope.clearForm = function() {
      $scope.note = { title: '', body_html: ''};
      $scope.editing = false;
    };

    $scope.addNote = function() {
      NotesService.createNote($scope.note);
      $scope.clearForm();
    };

    $scope.editNote = function(note) {
      $scope.editing = true;
      $scope.note = note;
    };

    $scope.updateNote = function() {
      NotesService.updateNote($scope.note);
      $scope.clearForm();
    };

    $scope.removeNote = function() {
      NotesService.deleteNote($scope.note._id);
      for (var i=0; i < $scope.notes.length; i++) {
        if ($scope.notes[i]._id === $scope.note._id) {
          $scope.notes.splice(i, 1);
        }
      }
      $scope.clearForm();
    };

    $scope.clearForm();
  }
})();
