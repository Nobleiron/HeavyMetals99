angular.module("HM_CartMD",['gavruk.card'])
.run(['localStorageService','HM_CartCnst',function(localStorageService,CartCnst){
    var data = localStorageService.get('cartData');
    if(data) {
      if (data.cartVersion != CartCnst.cartVersion) {
        localStorageService.remove("cartData");
      }
    }
  }])
