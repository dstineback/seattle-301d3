(function(module) {
  var articlesController = {};

  // DONE: Create the `articles` table when the controller first loads,
  //  with the code that used to be in index.html:
  Article.createTable();///added this in class
  articlesController.index = function() {
    //init index page with Arcticle view
    // DONE: Complete this function that kicks off the fetching and rendering
    //  of articles, using the same
    //  code that used to be in index.html:

    Article.fetchAll(articleView.initIndexPage);

    // DONE: But wait! There's more: Also be sure to hide all the main section
    //  elements, and reveal the articles section:
    //when you hit the route, hide this then show this- from class
    $('main > section').hide();
    $('#articles').show();
  };

  module.articlesController = articlesController;
})(window);
