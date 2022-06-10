import { Router } from "express";
import { postService } from "../services/postService";
import { userAuthService } from "../services/userService";
import { login_required } from "../middlewares/login_required";

const postRouter = Router();

/*
 * Community : Post 생성
 */
postRouter.post("/post/create",
  login_required,
  async (req, res, next) => {
    try {
      //로그인한 유저의 고유id
      const user_id = req.currentUserId
      //로그인 유저의 정보 -> author이름 정보 필요
      const user = await userAuthService.getUserInfo({user_id});
      const author = user.name;
      const {category, title, content} = req.body;
      
      const newPost = await postService.addPost({
        category,
        user_id,
        title,
        content,
        author,
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
  "/post/:id",
  //login_required,
  async (req, res, next) => {
    try {
      const postId = req.params.id;
      const post =await postService.getPost(postId);

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
  "/postlist",
  //login_required,
  async (req, res, next) => {
    try {
      const category = req.query.category || null //입력 없으면 null값
      const page = +req.query.page || 1; // default 1페이지
      const perPage = +req.query.perPage || 10; //default 10개
      const finalPage = await postService.getFinalPage({category, perPage});
      const postList = await postService.getPostListPage({
        category,
        page,
        perPage,
      });

      const body = {
        success: true,
        page: page,
        finalPage: finalPage,
        postList: postList,
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
  "/post/:id",
  //login_required,
  async (req, res, next) => {
    try {
      //const userId = req.currentUserId;
      const postId = req.params.id;

      const toUpdate = matchedData(req);

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
  "/post/:id",
  //login_required,
  async (req, res, next) => {
    try {
      const postId = req.params.id;
      const isDeleted = await postService.deletePost(postId);

      res.status(200).json(isDeleted);
    } catch (error) {
      next(error);
    }
  });


export { postRouter };
