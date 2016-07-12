{
  angular
    .module('meganote.users')
    .service('UsersService', [
      '$http',
      'API_BASE',
      'AuthToken',
      'CurrentUser',
      ($http, API_BASE, AuthToken, CurrentUser) =>{

        const apiURI = `${API_BASE}users/`;

        class UsersService {

          // Sign up
          create(user) {
            const usersPromise = $http.post(apiURI, {
              user
            });
            usersPromise.then(
              res => {
                AuthToken.set(res.data.authToken);
                CurrentUser.set(res.data.user);
              }
            );
            return usersPromise;
          }

          // Update Profile
          update(user) {
            return $http.put(`${apiURI}${user._id}`, { user })
              .then(
                res => CurrentUser.set(res.data.user)
              );
          }

          // Login
          login(user) {
            return $http.post(`${API_BASE}sessions/`, { user })
              .then(
                res => {
                  AuthToken.set(res.data.authToken);
                  CurrentUser.set(res.data.user);
                }
              );
          }
        }

        return new UsersService();
      }
    ]);
}
