'use strict';
angular.module("HM_CartMD")
  .controller("HM_CartDetailsCtrl",['$scope','HM_RestSV','HM_CartCnst','toastr', function( $scope,RestSV, ShoppingCartCnst,toastr){


    $scope.updateCart = updateCart;

    $scope.applyPromoCode = applyPromoCode;

    $scope.allowSubstitution = {
      closeEl: '.close',
      overlay: {
        template: '<div class="substitution-div">'+
          '<div class="col-md-12">'+
            '<i class="fa fa-close fa-2x pull-right color-gray close marker"></i>'+
          '</div>'+
          '<div class="container">'+
            '<div class="row search-row">'+
              '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">'+
                '<input type="text" placeholder="Search" class="color-blue noborder substitution-input">'+
                '<i class="fa fa-search pull-right"></i>'+
              '</div>'+
            '</div>'+
            '<div class="row">'+
              '<div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">'+
                '<h3 class="heading-text subs-headers">Most Viewed</h3>'+
                '<div class="list-div">'+
                  '<img src="http://0.gravatar.com/avatar/81b58502541f9445253f30497e53c280?s=50&d=identicon&r=G" class="pull-left img-circle">'+
                  '<p class="heading-text">Hello World</p>'+
                '</div>'+
                '<div class="list-div">'+
                  '<img src="http://0.gravatar.com/avatar/81b58502541f9445253f30497e53c280?s=50&d=identicon&r=G" class="pull-left img-circle">'+
                  '<p class="heading-text">Hello World</p>'+
                '</div>'+
                '<div class="list-div">'+
                  '<img src="http://0.gravatar.com/avatar/81b58502541f9445253f30497e53c280?s=50&d=identicon&r=G" class="pull-left img-circle">'+
                  '<p class="heading-text">Hello World</p>'+
                '</div>'+
                '<div class="list-div">'+
                  '<img src="http://0.gravatar.com/avatar/81b58502541f9445253f30497e53c280?s=50&d=identicon&r=G" class="pull-left img-circle">'+
                  '<p class="heading-text">Hello World</p>'+
                '</div>'+
                '<div class="list-div">'+
                  '<img src="http://0.gravatar.com/avatar/81b58502541f9445253f30497e53c280?s=50&d=identicon&r=G" class="pull-left img-circle">'+
                  '<p class="heading-text">Hello World</p>'+
                '</div>'+
                '<div class="list-div">'+
                  '<img src="http://0.gravatar.com/avatar/81b58502541f9445253f30497e53c280?s=50&d=identicon&r=G" class="pull-left img-circle">'+
                  '<p class="heading-text">Hello World</p>'+
                '</div>'+
              '</div>'+
              '<div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">'+
                '<h3 class="heading-text subs-headers">Most Popular</h3>'+
                '<div class="list-div">'+
                  '<img src="http://0.gravatar.com/avatar/81b58502541f9445253f30497e53c280?s=50&d=identicon&r=G" class="pull-left img-circle">'+
                  '<p class="heading-text">Hello World</p>'+
                '</div>'+
                '<div class="list-div">'+
                  '<img src="http://0.gravatar.com/avatar/81b58502541f9445253f30497e53c280?s=50&d=identicon&r=G" class="pull-left img-circle">'+
                  '<p class="heading-text">Hello World</p>'+
                '</div>'+
                '<div class="list-div">'+
                  '<img src="http://0.gravatar.com/avatar/81b58502541f9445253f30497e53c280?s=50&d=identicon&r=G" class="pull-left img-circle">'+
                  '<p class="heading-text">Hello World</p>'+
                '</div>'+
                '<div class="list-div">'+
                  '<img src="http://0.gravatar.com/avatar/81b58502541f9445253f30497e53c280?s=50&d=identicon&r=G" class="pull-left img-circle">'+
                  '<p class="heading-text">Hello World</p>'+
                '</div>'+
                '<div class="list-div">'+
                  '<img src="http://0.gravatar.com/avatar/81b58502541f9445253f30497e53c280?s=50&d=identicon&r=G" class="pull-left img-circle">'+
                  '<p class="heading-text">Hello World</p>'+
                '</div>'+
                '<div class="list-div">'+
                  '<img src="http://0.gravatar.com/avatar/81b58502541f9445253f30497e53c280?s=50&d=identicon&r=G" class="pull-left img-circle">'+
                  '<p class="heading-text">Hello World</p>'+
                '</div>'+
              '</div>'+
              '<div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">'+
                '<h3 class="heading-text subs-headers">Recent</h3>'+
                '<div class="list-div">'+
                  '<img src="http://0.gravatar.com/avatar/81b58502541f9445253f30497e53c280?s=50&d=identicon&r=G" class="pull-left img-circle">'+
                  '<p class="heading-text">Hello World</p>'+
                '</div>'+
                '<div class="list-div">'+
                  '<img src="http://0.gravatar.com/avatar/81b58502541f9445253f30497e53c280?s=50&d=identicon&r=G" class="pull-left img-circle">'+
                  '<p class="heading-text">Hello World</p>'+
                '</div>'+
                '<div class="list-div">'+
                  '<img src="http://0.gravatar.com/avatar/81b58502541f9445253f30497e53c280?s=50&d=identicon&r=G" class="pull-left img-circle">'+
                  '<p class="heading-text">Hello World</p>'+
                '</div>'+
                '<div class="list-div">'+
                  '<img src="http://0.gravatar.com/avatar/81b58502541f9445253f30497e53c280?s=50&d=identicon&r=G" class="pull-left img-circle">'+
                  '<p class="heading-text">Hello World</p>'+
                '</div>'+
                '<div class="list-div">'+
                  '<img src="http://0.gravatar.com/avatar/81b58502541f9445253f30497e53c280?s=50&d=identicon&r=G" class="pull-left img-circle">'+
                  '<p class="heading-text">Hello World</p>'+
                '</div>'+
                '<div class="list-div">'+
                  '<img src="http://0.gravatar.com/avatar/81b58502541f9445253f30497e53c280?s=50&d=identicon&r=G" class="pull-left img-circle">'+
                  '<p class="heading-text">Hello World</p>'+
                '</div>'+
              '</div>'+
            '</div>'+
            '<div class="row">'+
              '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">'+
                '<button class="btn sign_mybtn all-btn primary-btn pull-right">'+
                  'Allow'+
                '</button>'+
              '</div>'+
            '</div>'+
          '</div>'+
        '</div>'
      }
    };


    function updateCart(productId, cartData){
      if(!(/[1-9*]+/.test(cartData.qty))){
        return false;
      }
      if(cartData.isDirty){
        cartData.isDirty = false;
        cartData.updateInProgress = true;
        RestSV.put(ShoppingCartCnst.updateQty.url(),{
          proid: productId,
          qty : cartData.qty
        })
          .then(function(response){
            angular.merge($scope.data.cart,response.data.result.Cart_Content);
          })
          .finally(function(){
            cartData.updateInProgress = false;
          })
      }

    }

    function applyPromoCode(){
      if($scope.promoCode){
        $scope.$broadcast('Cart:ApplyPromoCode:Start');
        RestSV.post(ShoppingCartCnst.applyPromoCode.url(),{
          coupon_code: $scope.promoCode
        })
          .then(function(response){
            if(response.data.result){
              $scope.data.cart = response.data.result.Cart_Content;
            }else{
              toastr.error("Invalid Coupon Code");
            }
          })
          .catch(function(){
            toastr.error("Invalid Coupon Code");
          })
          .finally(function(){
            $scope.$broadcast('Cart:ApplyPromoCode:End');
          })
      }
    }


  }]);
