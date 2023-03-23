const Article = require("../models/articleSchema");

//make an article
module.exports.createArticle = async function (req, res) {
  // console.log(req.body);
  try {
    const article = await Article.create({
      title: req.body.title,
      content: req.body.content,
    });
    
    const response = {
        message: "Article created successfully",
        article: article,
        links: [
            {
                href: `/article/${article.title}`,
                rel: "self",
                method: "GET",
            },
            {
                href: `/article/${article.title}`,
                rel: "update",
                method: "PUT",
            },
            {
                href: `/article/${article.title}`,
                rel: "delete",
                method: "DELETE",
            },
            {
                href: `/article`,
                rel: "collection",
                method: "GET",
            },
        ],
    };
    return res
      .status(200)
      .json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "internal server error" });
  }
};

//view all articles
module.exports.viewAll = async function (req, res) {
  try {
    const articles = await Article.find({});
    // console.log(articles);
    const links = [];

    const createLink = {
        rel: "create",
        href: "/article",
        method: "POST",
        title: "Create a new article",
        description: "Use this link to create a new article"
    };
    links.push(createLink);

    const deleteAllLink = {
        rel: "delete-all",
        href: "/article",
        method: "DELETE",
        title: "Delete all articles",
        description: "use this link to delete all articles"
    }

    links.push(deleteAllLink);

    const response = {
        articles: articles,
        links: links
    };

    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "internal server error" });
  }
};

//delete all articles
module.exports.deleteAll = async function (req, res) {
  try {
    const articles = await Article.deleteMany({});
    const response = {
        success: true,
        message: "all articles has been deleted successfully",
        links: [
            {
                href: "/article",
                rel: "get all",
                method: "GET",
            },
            {
                href: "/article",
                method: "POST",
                rel: "post article",
            },
        ],
    };
    res
      .status(200)
      .json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "internal server error" });
  }
};

//view an article(single)
module.exports.view = async function (req, res) {
  try {
    const article = await Article.findOne({ title: req.params.title });
    if (!article) {
      return res.status(404).json({error: "no article found!"});
    }

    //define the links for this resource and related resources
    const links = {
        self : {href: `/article/${article.title}`},
        delete: {href: `/article/${article.title}`, method: 'DELETE'},
        update: {href: `/article/${article.title}`, method: 'PUT'},
        collection: {href: '/article'}
    }

    //include the links in the response
    return res.status(200).json({
        _links: links,
        title: article.title,
        content: article.content,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: true, message: "internal server error" });
  }
};

//update an article
module.exports.udpate = async function (req, res) {
  try {
    //checking if article exists before updating
    const findArticle = await Article.find({ title: req.params.title });
    console.log(req.params.title);
    if (!findArticle) {
      return res.send("cannot update, article does not exist!");
    }

    const article = await Article.findOneAndUpdate(
      {
        title: req.params.title,
      },
      {
        title: req.body.title,
        content: req.body.content,
      },
      {
        overwrite: true,
      }
    );

    const response = {
        success: true,
        message: "updated successfully!",
        links: [
            {
                href: `/article/:title`,
                rel: "get post",
                method: "GET",
            },
            {
                href: `/article/:title`,
                rel: "delete post",
                method: "DELETE"
            },
            {
                href: `/article`,
                rel: "collection",
                method: "GET",
            }
        ]
    }

    return res
      .status(200)
      .json(response);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "internal server error" });
  }
};

//delete an article
module.exports.delete = async function (req, res) {

//   console.log(req.params.title);
  try {
    const findArticle = await Article.find({ title: req.params.title });
    if (findArticle.length === 0) {
      return res.send("Article not found!");
    }

    const article = await Article.findOneAndDelete({ title: req.params.title });
    // console.log(article);
    const response = {
        success: true,
        message: "Article deleted successfully",
        links: [
            {
                href: "/article",
                rel: "post article",
                method: "POST",
            },
            {
                href: "/article/:title",
                rel: "update an article",
                method: "PUT",
            },
            {
                href: "/article/:title",
                rel: "get article",
                method: "GET",
            },
            {
                href: "/article",
                rel: "collection",
                method: "GET",
            },
        ],
    };
    return res
      .status(200)
      .json(response);
  } catch (err) {
    console.log(err);
    a;
    return res
      .status(500)
      .json({ success: false, mesaage: "internal server error" });
  }
};
