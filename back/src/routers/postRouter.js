import { Router } from "express";
import { postService } from "../services/postService";
import { userAuthService } from "../services/userService";
import { postValidate } from "../middlewares/postValidation";
import { login_required } from "../middlewares/login_required";

const postRouter = Router();

/*
 * Community : Post 생성
 */
postRouter.post(
  "/posts",
  login_required,
  postValidate.createPost,
  async (req, res, next) => {
    try {
      //로그인한 유저의 고유id
      const userId = req.currentUserId
      //로그인 유저의 정보 -> author이름 정보 필요
      const user = await userAuthService.getUserInfo({user_id : userId});
      const author = user.name;

      //유저가 입력한 request body값
      const {category, title, content} = req.body;
      const imageURL = req.body.imageURL ?? "";

      const newPost = await postService.addPost({
        category,
        userId,
        title,
        content,
        author,
        imageURL,
      })

      const body = {
        success: true,
        post: newPost,
      };

      res.status(201).json(body);
    } catch (error) {
      next(error);
    }
});

  

/*
 * Community : Post 조회
 */
postRouter.get(
  "/posts/:id",
  login_required,
  async (req, res, next) => {
    try {
      const postId = req.params.id;
      const post =await postService.getPostById(postId);

      const body = {
          success: true,
          post: post,
        };

      res.status(200).json(body);
    } catch (error) {
      next(error);
    }
  });



/*
 * Community : Post 리스트(제목) 조회(페이징)
 */
postRouter.get(
  "/posts",
  login_required,
  async (req, res, next) => {
    try {
      const category = req.query.category || null //입력 없으면 null값
      const page = +req.query.page || 1; // default 1페이지
      const perPage = +req.query.perPage || 10; //default 10개
      const lastPage = await postService.getLastPage({category, perPage});
      const posts = await postService.getPosts({
        category,
        page,
        perPage,
      });

      const body = {
        success: true,
        page: page,
        lastPage: lastPage,
        posts: posts,
      };

      res.status(200).json(body);
    } catch (error) {
      next(error);
    }
});

/*
 * Community : Post 수정
 */
postRouter.put(
  "/posts/:id",
  login_required,
  postValidate.updatePost,
  async (req, res, next) => {
    try {
      const userId = req.currentUserId;
      const postId = req.params.id;

      const post = await postService.getPostById(postId);
      
      if(userId !== post.userId) {
        const error = new Error("수정 권한이 없습니다.")
        throw error;
      }

      const category = req.body.category ?? null;
      const title = req.body.title ?? null;
      const content = req.body.content ?? null;
      const imageURL = req.body.imageURL ?? null;
      
      const toUpdate = { category, title, content, imageURL };

      const updatePost = await postService.setPost({postId, toUpdate });

      const body = {
        success: true,
        post: updatePost
      };

      res.status(200).json(body);
    } catch (error) {
      next(error);
    }
  });


/*
 * Community : Post 삭제
 */
postRouter.delete(
  "/posts/:id",
  login_required,
  async (req, res, next) => {
    try {
      const userId = req.currentUserId;
      const postId = req.params.id;

      const post = await postService.getPostById(postId);
      
      if(userId !== post.userId) {
        const error = new Error("삭제 권한이 없습니다.")
        throw error;
      }

      const isDeleted = await postService.deletePost(postId);

      res.status(200).json(isDeleted);
    } catch (error) {
      next(error);
    }
  });


export { postRouter };
