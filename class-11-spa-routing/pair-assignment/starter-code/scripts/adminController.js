(function(module) {
  var adminController = {};

  adminController.index = function() {
    // DONE: Define a function that hides all main section elements, and then reveals just the #about section:
    //just show the about page-from class
    Article.fetchAll(articleView.initAdminPage);

    $('main > section').hide();
    $('#blog-stats').show();
  };

  module.adminController = adminController;
})(window);
