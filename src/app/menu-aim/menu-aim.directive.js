'use strict';
angular.module("HM_MenuAimMD")
  .directive('menuAimDir', [function(){
    return {
      link : function(scope, element, attr){
        var submenuDirection = ( !$('.cd-dropdown-wrapper').hasClass('open-to-left') ) ? 'right' : 'left';
	       $('.cd-dropdown-content').menuAim({
            activate: function(row) {
        	    $(row).children().addClass('is-active').removeClass('fade-out');
        	     if( $('.cd-dropdown-content .fade-in').length == 0 ) $(row).children('ul').addClass('fade-in');
             },
             deactivate: function(row) {
        	      $(row).children().removeClass('is-active');
        	       if( $('li.has-children:hover').length == 0 || $('li.has-children:hover').is($(row)) ) {
        		         $('.cd-dropdown-content').find('.fade-in').removeClass('fade-in');
        		           $(row).children('ul').addClass('fade-out')
        	            }
              },
              exitMenu: function() {
        	       $('.cd-dropdown-content').find('.is-active').removeClass('is-active');
        	        return true;
              },
              submenuDirection: submenuDirection,
    });

        element.click(function(event){
          event.preventDefault();
		      toggleNav();
	      });

        function toggleNav(){
      		var navIsVisible = ( !$('.cd-dropdown').hasClass('dropdown-is-active') ) ? true : false;
      		$('.cd-dropdown').toggleClass('dropdown-is-active', navIsVisible);
      		$('.cd-dropdown-trigger').toggleClass('dropdown-is-active', navIsVisible);
      		if( !navIsVisible ) {
      			$('.cd-dropdown').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',function(){
      				$('.has-children ul').addClass('is-hidden');
      				$('.move-out').removeClass('move-out');
      				$('.is-active').removeClass('is-active');
      			});
      		}
      	}

      }
    };
  }]);
