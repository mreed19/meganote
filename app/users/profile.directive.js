{
  angular
    .module('meganote.users')
    .directive('userProfile', [

      'Flash',
      'CurrentUser',
      'UsersService',
      (Flash, CurrentUser, UsersService) => {
        let flash = false;
        class UserProfileController {
          constructor() {
            var vm = this;
            vm.user = angular.copy(CurrentUser.get());
          }
          submit() {
            if (Number.isInteger(flash)) {
              Flash.dismiss(flash);
              flash = false;
            }
            var vm = this;
            UsersService.update(vm.user).then(
              () => Flash.create('success', 'Successfully updated user.'),
              res =>  {
                if (res.data.errors) {
                  var message = 'Oops! Something went wrong.<ul>';
                  for (var key of Object.keys(res.data.errors)) {
                    message += '<li>' + res.data.errors[key].message + '</li>';
                  }
                  message += '</ul>';
                  flash = Flash.create('danger', message);
                }
              }
            );
          }
        }

        return {
          scope: {},
          controller: UserProfileController,
          controllerAs: 'vm',
          bindToController: true,
          template: `

          <div class="container">
            <div class="row">
              <div class="col-xs-6 col-xs-offset-4">
                <h3>Update Your Profile</h3>
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
                  <input type="submit" name="commit" value="Save Changes" class="btn btn-default">
                  <span class="login">
                    <a ui-sref="notes.form({ noteId: undefined })">
                      Back to my notes
                    </a>
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
