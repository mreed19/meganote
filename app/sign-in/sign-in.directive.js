{
  angular
    .module('meganote.signIn')
    .directive('signIn', [

      '$state',
      'Flash',
      'UsersService',
      ($state, Flash, UsersService) => {
        let flash = false;
        class SignInController {
          submit() {
            var vm = this;
            if (Number.isInteger(flash)) {
              Flash.dismiss(flash);
              flash = false;
            }
            UsersService.login(vm.user)
              .then(
                () => $state.go('notes.form', { noteId: undefined }),
                res => flash = Flash.create('danger', res.data.message)
              );
          }
        }

        return {
          scope: {},
          controller: SignInController,
          controllerAs: 'vm',
          bindToController: true,
          template: `

          <div class="container">
            <div class="row">
              <div class="col-xs-6 col-xs-offset-4">
                <h3>Welcome back!</h3>
                <form id="new_user" ng-submit="vm.submit()" novalidate>
                  <p>
                    <label for="username">Username</label><br>
                    <input
                      ng-model="vm.user.username"
                      type="text"
                      name="username"
                      required
                      focus-on>
                  </p>
                  <p>
                    <label for="password">Password</label><br>
                    <input
                      ng-model="vm.user.password"
                      type="password"
                      name="password"
                      required>
                  </p>
                  <input type="submit" name="commit" value="Sign In" class="btn btn-default">
                  <span class="login">
                    Don't have an account?
                    <a ui-sref="sign-up">Sign up!</a>
                  </span>
                </form>
                <flash-message
                  duration="0"
                  show-close="true"
                  ></flash-message>
                <span us-spinner="{top:100}"></span>
              </div>
            </div>
          </div>

          `
        };
      }

    ]);
}
