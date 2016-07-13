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
                    var message = 'Oops! Something went wrong.<ul>';
                    for (var key of Object.keys(res.data.errors)) {
                      message += '<li>' + res.data.errors[key].message + '</li>';
                    }
                    message += '</ul>';
                    Flash.create('danger', message);
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
