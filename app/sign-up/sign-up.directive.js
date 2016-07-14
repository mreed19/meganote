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
          template: `<div class="container">
            <div class="row">
              <div class="col-xs-6 col-xs-offset-4">
                <h3>Sign Up for Meganote</h3>
                <form id="new_user" ng-submit="vm.submit()" novalidate>
                  <p>
                    <label for="name">Full Name</label><br>
                    <input
                      ng-model="vm.user.name"
                      type="text"
                      name="name"
                      autofocus="autofocus"
                      required>
                  </p>
                  <p>
                    <label for="username">Username</label><br>
                    <input
                      ng-model="vm.user.username"
                      type="text"
                      name="username"
                      required>
                  </p>
                  <p>
                    <label for="password">Password</label><br>
                    <input
                      ng-model="vm.user.password"
                      type="password"
                      name="password"
                      required>
                  </p>
                  <p>
                    <label for="passwordConfirmation">Re-type Password</label><br>
                    <input
                      ng-model="vm.user.passwordConfirmation"
                      type="password"
                      name="passwordConfirmation"
                      required>
                  </p>
                  <input type="submit" name="commit" value="Sign Up" class="btn btn-default">
                  <span class="login">
                    Already have an account?
                    <a ui-sref="sign-in">Log in.</a>
                  </span>
                </form>
                <flash-message
                  duration="5000"
                  show-close="false"
                ></flash-message>
                <span us-spinner="{top:100}"></span>
              </div>
            </div>
          </div>
`
        };
      }]
    );
}
