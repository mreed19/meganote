(function() {
  angular.module('meganote.notes')
    .controller('NotesFormController', NotesFormController);

  NotesFormController.$inject = ['$state', '$scope', 'Flash', 'NotesService'];
  function NotesFormController($state, $scope, Flash, NotesService) {
    $scope.note = NotesService.find($state.params.noteId);

    $scope.clearForm = function() {
      $scope.note = { title: '', body_html: ''};
      $scope.editing = false;
    };

    $scope.saveNote = function() {
      if ($scope.note._id) {
        NotesService.updateNote($scope.note)
        .then(function(res) {
          $scope.note = res.data.note;
          Flash.create('success', res.data.message);
        },
        function() {
          Flash.create('danger', 'Oops! Something went wrong');
        });
      }
      else {
        NotesService.createNote($scope.note)
        .then(function(res) {
          $scope.note = res.data.note;
          Flash.create('success', res.data.message);
        },
        function() {
          Flash.create('danger', 'Oops! Something went wrong');
        });
      }
    };

    $scope.deleteNote = function() {
      NotesService.deleteNote($scope.note)
      .then(function(res) {
        $scope.clearForm();
        Flash.create('success', res.data.message);
      },
      function() {
        Flash.create('danger', 'Oops! Something went wrong!');
      });
    };
  }
}());
