(function() {
  angular.module('meganote.notes')
  .service('NotesService', NotesService);

  NotesService.$inject = ['$http'];
  function NotesService($http) {
    var service = this;
    service.notes = [];

    service.getNotes = function() {
      var notesPromise = $http.get('https://meganote.herokuapp.com/notes');
      notesPromise.then(function(res) {
        service.notes = res.data;
      });
      return notesPromise;
    };

    service.createNote = function(note) {
      var notesPromise = $http.post('https://meganote.herokuapp.com/notes', {
        note: note
      });

      notesPromise.then(function(res) {
        service.notes.unshift(res.data.note);
      });

      return notesPromise;
    };

    service.updateNote = function(note) {
      var notesPromise = $http.put('https://meganote.herokuapp.com/notes/' + note._id, {
        note: note
      });
      return notesPromise;
    };

    service.deleteNote = function(index) {
      var notesPromise = $http.delete('https://meganote.herokuapp.com/notes/' + index);

      return notesPromise;
    };
  }
})();
