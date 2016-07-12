{
  angular
    .module('meganote.signUp')
    .directive('signUp', [

      '$state',
      'Flash',
      'UsersService',
      ($state, Flash, UsersService) => {

        class SignUpController {
          constructor() {
            this.user = {};
          }
          submit() {
            UsersService.create(this.user)
              .then(
                () => $state.go('notes.form', { noteId: undefined }),
                res => Flash.create('danger', res.data.message)
              );
          }
        }

        return {
          scope: {},
          controller: SignUpController,
          controllerAs: 'vm',
          bindToController: true,
          templateUrl: 'sign-up/sign-up.html',
        };
      }]
    );
}
