{
  angular
    .module('meganote.users')
    .directive('userProfile', [

      'Flash',
      'CurrentUser',
      'UsersService',
      (Flash, CurrentUser, UsersService) => {
        class UserProfileController {
          constructor() {
            var vm = this;
            vm.user = angular.copy(CurrentUser.get());
          }
          submit() {
            var vm = this;
            UsersService.update(vm.user).then(
              () => Flash.create('success', 'Successfully updated user.'),
              res => Flash.create('danger', res.data.message)
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
                <form id="new_user" ng-submit="vm.submit()">
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
                  duration="5000"
                  show-close="false"
                  ></flash-message>
              </div>
            </div>
          </div>


          `
        };
      }
    ]);
}