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

    $scope.saveNote = function() {
      if ($scope.note._id) {
        NotesService.updateNote($scope.note);
      }
      else {
        NotesService.createNote($scope.note)
        .then(function(res) {
          $scope.note = res.data.note;
        });
      }
    };

    $scope.editNote = function(note) {
      $scope.note = angular.copy(note);
    };

    $scope.deleteNote = function() {
      NotesService.deleteNote($scope.note)
      .then(function() {
        $scope.clearForm();
      });
    };


    $scope.clearForm();
  }
})();
