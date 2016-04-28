(function(module) {
  var articlesController = {};

  Article.createTable();  // Ensure the database table is properly initialized

  articlesController.index = function(ctx, next) {
    debugger;
    articleView.index(ctx.articles);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  //loadByID method makes a functions that has 'context' and 'next' as perameters. inside there a varialbe articleData that is equal to a new function. In here you have aticles attached to the url context equal to article. Next line is calling the next() callback but this is not run until the Article.findWhere is ran. The findWhere method selects all from the artcles where columns are equal to the data, which is set to the value parameter. It then takes the context parameters of the url that was created and matches it. It then runs the 'next()' callback to tell articleController.index to run. articleController.index is a function that takes articleView.index and sets the context to articles. articleView.index basically takes the data from the page and manipulates it so you hide and show what ever data you want to render to it.
  articlesController.loadById = function(ctx, next) {
    var articleData = function(article) {
      ctx.articles = article;
      next();
    };

    Article.findWhere('id', ctx.params.id, articleData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  //loadByAuthor method also makes a function that takes context and next as perameters. Inside it creates a variable authorData that passes in articlesByAuthor which mapps through all the articls and returns the author of each article. It then takes the context of the url with and makes it equal to articlesByAuthor. It then goes to Article.findWhere and takes the author that matches the context parameter authorName and replaces the pluses with empty space. It then calls the articleController.index to run. articleController.index is a function that takes articleView.index and sets the context to articles. articleView.index basically takes the data from the page and manipulates it so you hide and show what ever data you want to render to it.
  articlesController.loadByAuthor = function(ctx, next) {
    var authorData = function(articlesByAuthor) {
      ctx.articles = articlesByAuthor;
      next();
    };

    Article.findWhere('author', ctx.params.authorName.replace('+', ' '), authorData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  //loadByCategory method makes a function with contex and next as parameters. inside it makes a variable categoryData that equals a function that pass in articlesInCategory. This is setting the context of ariticles equal to articlesInCategory. It then goes to the Article.findWhere method and takes the url category and changes the context parameters categoryName with the variable that was created categoryData. Finally it calls the next() to tell articleController.index to run. articleView.index basically takes the data from the page and manipulates it so you hide and show what ever data you want to render to it.
  articlesController.loadByCategory = function(ctx, next) {
    var categoryData = function(articlesInCategory) {
      ctx.articles = articlesInCategory;
      next();
    };

    Article.findWhere('category', ctx.params.categoryName, categoryData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  //loadAll method makes a function with the contex and next as parameters. inside it creates a variable articleData equal to a function that passes 'allArticles' as a placeholder. It then sets the context of articles equal to Article.all. Article.all is an empty array in articls.js. it then calls the next() to run articleController.indext to run. BUT there is an 'if' statement. inside the if it runs Article.all.length to run through the Article.all array. In side this sets the context of articles equals to Article.all. It looks through the Arctile.all array to see if it is populated on the page load. If nothing is there it adds the article data. If there is already data thhat is loaded it moves on the next(). the next() callback to make articleController.index. There is also 'else' statement that follows that is the fetchAll method that uses articleData which was created in the articleConroller.loadById. fetchAll is a method on the article.js that creates a function makes a JSON call to our data file in order to load all of our articles on to our webpage. There is no call back if this is run because it is the last method that needs to run in the process. articleView.index basically takes the data from the page and manipulates it so you hide and show what ever data you want to render to it.
  articlesController.loadAll = function(ctx, next) {
    var articleData = function(allArticles) {
      ctx.articles = Article.all;
      next();
    };

    if (Article.all.length) {
      ctx.articles = Article.all;
      next();
    } else {
      Article.fetchAll(articleData);
    }
  };


  module.articlesController = articlesController;
})(window);
