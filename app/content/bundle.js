"use strict";function _classCallCheck(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function _classCallCheck(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function _classCallCheck(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function _classCallCheck(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function _classCallCheck(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function _classCallCheck(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function _classCallCheck(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}var configFunction=function(e){e.otherwise("/notes/")},run=function(e,n){e.$on("$stateChangeSucess",function(){e.$state=n}),e.$on("$stateChangError",function(){n.go("sign-in")})};angular.module("meganote",["ui.router","ngFlash","textAngular","angularSpinner","ngLoadingSpinner","ngResource","meganote.notes","meganote.notesForm","meganote.signUp","meganote.users","meganote.signIn"]).config(configFunction),configFunction.$inject=["$urlRouterProvider"],run.$inject=["$rootScope","$state"],angular.module("meganote.notesForm",[]),angular.module("meganote.notes",[]),angular.module("meganote.signIn",[]),angular.module("meganote.signUp",[]),angular.module("meganote.users",[]),angular.module("meganote").constant("API_BASE","http://localhost:3030/api/v1/");var AuthInterceptor=function(e,n){return{request:function(t){var r=e.get();return r&&t.url.includes(n)&&(t.headers.Authorization=r),t}}},authConfig=function(e){return e.interceptors.push("AuthInterceptor")};angular.module("meganote").factory("AuthInterceptor",AuthInterceptor).config(authConfig),AuthInterceptor.$inject=["AuthToken","API_BASE"],authConfig.$inject=["$httpProvider"],function(){angular.module("ngLoadingSpinner",["angularSpinner"]).directive("usSpinner",["$http","$rootScope",function(e,n){return{link:function(t,r){n.spinnerActive=!1,t.isLoading=function(){return e.pendingRequests.length>0},t.$watch(t.isLoading,function(e){n.spinnerActive=e,e?r.removeClass("ng-hide"):r.addClass("ng-hide")})}}}])}.call(void 0),!function(){var e=function(e){e.state("notes",{url:"/notes",templateUrl:"notes/notes.html",controller:"NotesController",controllerAs:"vm",resolve:{authenticated:n},data:{title:"Notes"}}).state("notes.form",{url:"/:noteId",templateUrl:"notes/notes-form/notes-form.html",controller:"NotesFormController",controllerAs:"vm"})},n=function(e){return new Promise(function(n,t){e.signedIn()?n():t()})};angular.module("meganote.notes").config(e),e.$inject=["$stateProvider"],n.$inject=["CurrentUser"]}();var Note=function(e,n){return e(n+"notes/:id")};angular.module("meganote.notes").factory("Note",Note),Note.$inject=["$resource","API_BASE"];var NotesFormController=function(e,n,t,r){function o(){return n.params.noteId?r.get({id:n.params.noteId}):new r}function a(){i.note={title:"",body_html:""},i.editing=!1}function s(){i.note._id||i.note.$save().then(function(r){e.$parent.vm.refresh(),i.note=r,t.create("success","Created!"),n.go("notes.form",{noteId:i.note._id})},function(){return t.create("danger","Oops! Something went wrong")})}function u(){}var i=this;i.note=o(),i.clearForm=a,i.save=s,i.destroy=u};angular.module("meganote.notesForm").controller("NotesFormController",NotesFormController),NotesFormController.$inject=["$scope","$state","Flash","Note"];var NotesController=function(e){function n(){e.query().$promise.then(function(e){t.notes=e})}var t=this;t.notes=e.query(),t.refresh=n};angular.module("meganote.notes").controller("NotesController",NotesController),NotesController.$inject=["Note"];var NotesService=function(e,n){function t(){var n=e.get(i);return n.then(function(e){return l.notes=e.data}),n}function r(n){var t=e.post(i,n);return t.then(function(e){return l.notes.unshift(e.data)}),t}function o(n){var t=e.put(""+i+n._id,n);return t.then(function(e){l.removeById(e.data._id),l.notes.unshift(e.data)}),t}function a(n){var t=e["delete"](""+i+n._id);return t.then(function(e){return l.removeById(e.data._id)}),t}function s(e){for(var n=0;n<l.notes.length;n++)l.notes[n]._id===e&&l.notes.splice(n,1)}function u(e){for(var n=0;n<l.notes.length;n++)if(l.notes[n]._id===e)return angular.copy(l.notes[n])}var i=n+"notes/",l={notes:[],getNotes:t,create:r,update:o,destroy:a,removeById:s,find:u};return l};angular.module("meganote.notes").factory("NotesService",NotesService),NotesService.$inject=["$http","API_BASE"];var _createClass=function(){function e(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(n,t,r){return t&&e(n.prototype,t),r&&e(n,r),n}}();angular.module("meganote.signIn").directive("signIn",["$state","Flash","UsersService",function(e,n,t){var r=function(){function r(){_classCallCheck(this,r)}return _createClass(r,[{key:"submit",value:function(){var r=this;t.login(r.user).then(function(){return e.go("notes.form",{noteId:void 0})},function(e){return n.create("danger",e.data.message)})}}]),r}();return{scope:{},controller:r,controllerAs:"vm",bindToController:!0,template:'\n\n          <div class="container">\n            <div class="row">\n              <div class="col-xs-6 col-xs-offset-4">\n                <h3>Welcome back!</h3>\n                <form id="new_user" ng-submit="vm.submit()" novalidate>\n                  <p>\n                    <label for="username">Username</label><br>\n                    <input\n                      ng-model="vm.user.username"\n                      type="text"\n                      name="username"\n                      required>\n                  </p>\n                  <p>\n                    <label for="password">Password</label><br>\n                    <input\n                      ng-model="vm.user.password"\n                      type="password"\n                      name="password"\n                      required>\n                  </p>\n                  <input type="submit" name="commit" value="Sign In" class="btn btn-default">\n                  <span class="login">\n                    Don\'t have an account?\n                    <a ui-sref="sign-up">Sign up!</a>\n                  </span>\n                </form>\n                <flash-message\n                  duration="5000"\n                  show-close="false"\n                  ></flash-message>\n                <span us-spinner="{top:100}"></span>\n              </div>\n            </div>\n          </div>\n\n          '}}]);var _createClass=function(){function e(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(n,t,r){return t&&e(n.prototype,t),r&&e(n,r),n}}();angular.module("meganote.signUp").directive("signUp",["$state","Flash","UsersService",function(e,n,t){var r=function(){function r(){_classCallCheck(this,r),this.user={}}return _createClass(r,[{key:"submit",value:function(){t.create(this.user).then(function(){return e.go("notes.form",{noteId:void 0})},function(e){if(e.data.errors){var t="Oops! Something went wrong.<ul>",r=!0,o=!1,a=void 0;try{for(var s,u=Object.keys(e.data.errors)[Symbol.iterator]();!(r=(s=u.next()).done);r=!0){var i=s.value;t+="<li>"+e.data.errors[i].message+"</li>"}}catch(l){o=!0,a=l}finally{try{!r&&u["return"]&&u["return"]()}finally{if(o)throw a}}t+="</ul>",n.create("danger",t)}})}}]),r}();return{scope:{},controller:r,controllerAs:"vm",bindToController:!0,template:'<div class="container">\n            <div class="row">\n              <div class="col-xs-6 col-xs-offset-4">\n                <h3>Sign Up for Meganote</h3>\n                <form id="new_user" ng-submit="vm.submit()" novalidate>\n                  <p>\n                    <label for="name">Full Name</label><br>\n                    <input\n                      ng-model="vm.user.name"\n                      type="text"\n                      name="name"\n                      autofocus="autofocus"\n                      required>\n                  </p>\n                  <p>\n                    <label for="username">Username</label><br>\n                    <input\n                      ng-model="vm.user.username"\n                      type="text"\n                      name="username"\n                      required>\n                  </p>\n                  <p>\n                    <label for="password">Password</label><br>\n                    <input\n                      ng-model="vm.user.password"\n                      type="password"\n                      name="password"\n                      required>\n                  </p>\n                  <p>\n                    <label for="passwordConfirmation">Re-type Password</label><br>\n                    <input\n                      ng-model="vm.user.passwordConfirmation"\n                      type="password"\n                      name="passwordConfirmation"\n                      required>\n                  </p>\n                  <input type="submit" name="commit" value="Sign Up" class="btn btn-default">\n                  <span class="login">\n                    Already have an account?\n                    <a ui-sref="sign-in">Log in.</a>\n                  </span>\n                </form>\n                <flash-message\n                  duration="5000"\n                  show-close="false"\n                ></flash-message>\n                <span us-spinner="{top:100}"></span>\n              </div>\n            </div>\n          </div>\n'}}]);var _createClass=function(){function e(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(n,t,r){return t&&e(n.prototype,t),r&&e(n,r),n}}();angular.module("meganote.users").service("AuthToken",["$window",function(e){var n=function(){function n(){_classCallCheck(this,n),this.token=e.localStorage.getItem("authToken")}return _createClass(n,[{key:"set",value:function(n){this.token=n,e.localStorage.setItem("authToken",this.token)}},{key:"get",value:function(){return this.token}},{key:"clear",value:function(){this.token=void 0,e.localStorage.removeItem("authToken")}}]),n}();return new n}]);var configFunction=function(e){e.state("sign-up",{url:"/sign-up",template:"<sign-up></sign-up>",data:{title:"Sign up"}}).state("sign-in",{url:"/sign-in",template:"<sign-in></sign-in>",data:{title:"Sign in"}}).state("user-profile",{url:"/profile",template:"<user-profile></user-profile>",data:{title:"Profile"}})};angular.module("meganote.users").config(configFunction),configFunction.$inject=["$stateProvider"];var _createClass=function(){function e(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(n,t,r){return t&&e(n.prototype,t),r&&e(n,r),n}}();angular.module("meganote.users").service("CurrentUser",["$window",function(e){var n=function(){function n(){_classCallCheck(this,n),this.user=JSON.parse(e.localStorage.getItem("currentUser"))}return _createClass(n,[{key:"set",value:function(n){this.user=n,e.localStorage.setItem("currentUser",JSON.stringify(this.user))}},{key:"get",value:function(){return this.user||{}}},{key:"clear",value:function(){this.user=void 0,e.localStorage.removeItem("currentUser")}},{key:"signedIn",value:function(){return!!this.get()._id}}]),n}();return new n}]);var _createClass=function(){function e(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(n,t,r){return t&&e(n.prototype,t),r&&e(n,r),n}}();angular.module("meganote.users").directive("userProfile",["Flash","CurrentUser","UsersService",function(e,n,t){var r=function(){function r(){_classCallCheck(this,r);var e=this;e.user=angular.copy(n.get())}return _createClass(r,[{key:"submit",value:function(){var n=this;t.update(n.user).then(function(){return e.create("success","Successfully updated user.")},function(n){if(n.data.errors){var t="Oops! Something went wrong.<ul>",r=!0,o=!1,a=void 0;try{for(var s,u=Object.keys(n.data.errors)[Symbol.iterator]();!(r=(s=u.next()).done);r=!0){var i=s.value;t+="<li>"+n.data.errors[i].message+"</li>"}}catch(l){o=!0,a=l}finally{try{!r&&u["return"]&&u["return"]()}finally{if(o)throw a}}t+="</ul>",e.create("danger",t)}})}}]),r}();return{scope:{},controller:r,controllerAs:"vm",bindToController:!0,template:'\n\n          <div class="container">\n            <div class="row">\n              <div class="col-xs-6 col-xs-offset-4">\n                <h3>Update Your Profile</h3>\n                <form id="new_user" ng-submit="vm.submit()" novalidate>\n                  <p>\n                    <label for="name">Full Name</label><br>\n                    <input\n                      ng-model="vm.user.name"\n                      type="text"\n                      name="name"\n                      autofocus="autofocus"\n                      required>\n                  </p>\n                  <p>\n                    <label for="username">Username</label><br>\n                    <input\n                      ng-model="vm.user.username"\n                      type="text"\n                      name="username"\n                      required>\n                  </p>\n                  <input type="submit" name="commit" value="Save Changes" class="btn btn-default">\n                  <span class="login">\n                    <a ui-sref="notes.form({ noteId: undefined })">\n                      Back to my notes\n                    </a>\n                </form>\n                <flash-message\n                  duration="5000"\n                  show-close="false"\n                  ></flash-message>\n                <span us-spinner="{top:100}"></span>\n              </div>\n            </div>\n          </div>\n\n\n          '}}]);var _createClass=function(){function e(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(n,t,r){return t&&e(n.prototype,t),r&&e(n,r),n}}();angular.module("meganote.users").directive("userLinks",["CurrentUser","AuthToken",function(e,n){var t=function(){function t(){_classCallCheck(this,t)}return _createClass(t,[{key:"user",value:function(){return e.get()}},{key:"signedIn",value:function(){return e.signedIn()}},{key:"logout",value:function(){e.clear(),n.clear()}}]),t}();return{scope:{},controller:t,controllerAs:"vm",bindToController:!0,template:'\n\n          <div class="user-links">\n            <span ng-show="vm.signedIn()">\n              <a ui-sref="user-profile">Signed in as {{ vm.user().name }}</a>\n              |\n              <a ui-sref="sign-in" ng-click="vm.logout()">Logout</a>\n            </span>\n            <span ng-show="!vm.signedIn()">\n              <a ui-sref="sign-up">Sign up for Meganote today!</a>\n            </span>\n          </div>\n\n          '}}]);var _createClass=function(){function e(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(n,t,r){return t&&e(n.prototype,t),r&&e(n,r),n}}();angular.module("meganote.users").service("UsersService",["$http","API_BASE","AuthToken","CurrentUser",function(e,n,t,r){var o=n+"users/",a=function(){function a(){_classCallCheck(this,a)}return _createClass(a,[{key:"create",value:function(n){var a=e.post(o,{user:n});return a.then(function(e){t.set(e.data.authToken),r.set(e.data.user)}),a}},{key:"update",value:function(n){var t=e.put(""+o+n._id,{user:n});return t.then(function(e){return r.set(e.data.user)}),t}},{key:"login",value:function(o){var a=e.post(n+"sessions/",{user:o});return a.then(function(e){t.set(e.data.authToken),r.set(e.data.user)}),a}}]),a}();return new a}]);
//# sourceMappingURL=bundle.js.map
