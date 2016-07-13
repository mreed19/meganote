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
                res => {
                  if (res.data.errors) {
                    if (res.data.errors.name) {
                      Flash.create('danger', res.data.errors.name.message);
                    }
                    if (res.data.errors.username) {
                      Flash.create('danger', res.data.errors.username.message);
                    }
                  }
                  else {
                    Flash.create('danger', res.data.message);
                  }
                }
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
