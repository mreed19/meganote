{
  angular
    .module('meganote.notes')
    .controller('NotesController', NotesController);

  NotesController.$inject = ['Note'];
  function NotesController(Note) {
    const vm = this;
    vm.notes = Note.query();
    vm.refresh = refresh;

    ///////////////

    function refresh() {
      Note.query().$promise.then(notes => {
        vm.notes = notes;
      });
    }
  }
}
