angular.module("HM_GlobalMD")
  .directive('errSrc', function() {
  return {
    link: function(scope, element, attrs) {
      var defaultSrc = attrs.errSrc || '/assets/images/img_not_available.png';
      element.bind('error', function() {
        if (attrs.src != defaultSrc) {
          attrs.$set('src', defaultSrc);
        }
      });
    }
  }
});
