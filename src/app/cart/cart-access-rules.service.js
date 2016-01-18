angular.module("HM_CartMD")
  .service('HM_CartAccessRules', ['localStorageService','HM_CartCnst',function(localStorageService, CartCnst){

    var _that = this;

    var data = localStorageService.get('cartData');
    if(data) {
      if (data.cartVersion != CartCnst.cartVersion) {
        localStorageService.remove("cartData");
      }
    }

    this.canAccess = function(state){
      this.cartData = localStorageService.get('cartData') || {
        steps : angular.copy(CartCnst.steps)
      };
      var steps = _that.cartData.steps,
          access = false;
      switch(state) {
        case 'hm.cart.cartDuration':
          console.log(steps);
          access = steps.delivery.complete;
          break;
        case 'hm.cart.review':
          access = steps.delivery.complete && steps.duration.complete;
          break;
        case 'hm.cart.payment':
          access = steps.delivery.complete && steps.duration.complete && steps.review.complete;
          break;

      }
      return access;
    };


  }]);
