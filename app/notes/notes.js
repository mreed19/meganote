(function() {
  angular.module('meganote.notes', ['ui.router'])
  .config(notesConfig)
  .controller('NotesController', NotesController);

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

  function NotesController($scope) {
    $scope.editing = false;
    $scope.notes = [];
    $scope.note = { title: '', body: ''};
    $scope.addNote = function() {
      $scope.notes.push($scope.note);
      $scope.note = {};
      $scope.note.title = '';
      $scope.note.body = '';
    }
    $scope.removeNote = function(index) {
      $scope.notes.splice(index, 1);
    }
    $scope.editNote = function(note) {
      $scope.editing = true;
      $scope.note = note;
    }
    $scope.updateNote = function() {
      $scope.note = {};
      $scope.editing = false;
    }
  }
})();
