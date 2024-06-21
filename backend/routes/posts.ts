import express from "express";
import checkAuth from "../middleware/logged-in";
import showPosts from "../controllers/posts/show-posts";
import createPost from "../controllers/posts/create-post";
import updatePost from "../controllers/posts/update-post";
import deletePost from "../controllers/posts/delete-post";
import likePost from "../controllers/posts/likes/like-post";
import unlikePost from "../controllers/posts/likes/unlike-post";
import addComment from "../controllers/posts/comments/add-comment";
const router = express.Router();

router.get("/", checkAuth, showPosts);
router.post("/", checkAuth, createPost);
router.put("/", checkAuth, updatePost);
router.patch("/", checkAuth, deletePost);

router.put("/like", checkAuth, likePost);
router.patch("/like", checkAuth, unlikePost);

// router.get("/comment", checkAuth, showPosts);
router.post("/comment", checkAuth, addComment);
// router.put("/comment", checkAuth, updatePost);
// router.delete("/comment", checkAuth, deletePost);

export default router;
