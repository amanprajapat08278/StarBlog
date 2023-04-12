const express = require("express")
const router = express.Router()
const authorController = require("../Controller/authorController")
const blogController = require("../Controller/blogController")
const middleware = require("../middleware/authMiddleware")

router.post("/authors",authorController.createAuthor)

router.put("/authors",  middleware.authentication,authorController.updateAuthor)

router.post("/blogs", middleware.authentication,  blogController.createBlog)   //,

router.get("/blogs",  blogController.getBlogs)  //middleware.authentication,

router.get("/blogs/:blogId",  blogController.blogDetails)  //middleware.authentication,

router.put("/blogs/:blogId", middleware.authentication, middleware.authorization,  blogController.updateBlog)

router.delete("/blogs/:blogId", middleware.authentication, middleware.authorization, blogController.deleteBlog)

router.delete("/blogs", middleware.authentication,  blogController.deleteByField)

router.post("/login", authorController.authorLogin)


module.exports = router;