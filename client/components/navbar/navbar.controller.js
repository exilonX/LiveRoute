'use strict';

class NavbarController {
  //end-non-standard

  //start-non-standard
  constructor(Auth, $translate) {
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
    this.translate = $translate;
    this.languages = ['en', 'ro'];

    this.status = {
     isOpen : false
    };
   }

   changeLanguage(langKey) {
     this.translate.use(langKey);
   }

}

angular.module('liverouteApp')
  .controller('NavbarController', NavbarController);
