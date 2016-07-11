{
  angular
    .module('meganote.signIn')
    .directive('signIn', [

      () => {
        class SignInController {

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
                <form id="new_user" ng-submit="vm.submit()">
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
                  <input type="submit" name="commit" value="Sign In" class="btn btn-default">
                  <span class="login">
                    Don't have an account?
                    <a ui-sref="sign-up">Sign up!</a>
                  </span>
                </form>
              </div>
            </div>
          </div>

          `
        };
      }

    ]);
}
