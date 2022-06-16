import { Router } from 'express';
import { login_required } from "../middlewares/login_required";
import { userAuthService } from "../services/userService";
import { commentService } from "../services/commentService";

const commentRouter = Router();

/*
 * Community : 해당 포스트에 comment 생성
 */
commentRouter.post(
  "/comments/:postId",
  login_required,
  async (req, res, next) => {
    try{
      //post 식별 Id
      const postId = req.params.postId;
      //로그인한 유저 식별 Id
      const userId = req.currentUserId
      //로그인 유저의 정보 -> author이름 정보 필요
      const user = await userAuthService.getUserInfo({user_id : userId})
      const author = user.name;
      
      const {content} = req.body;

      const newComment = await commentService.addComment({
        postId,
        author,
        content,
      })
      
      const body = {
        success: true,
        comment: newComment,
      }
      res.status(201).json(body);

    }catch (error) {
      next(error);
    }
  });

/*
 * Community : 해당 포스트에 속한 comments 조회
 */
commentRouter.get(
  "/comments/:postId",
  login_required,
  async (req, res, next) => {
    try {
      const postId = req.params.postId;
      const page = +req.query.page || 1; // default 1페이지
      const perPage = +req.query.perPage || 10; //default 10개

      const comments = await commentService.getComments({
        postId, 
        page, 
        perPage,
      });

      const lastPage = await commentService.getLastPage({postId, perPage});

      const body = {
          success: true,
          page: page,
          lastPage: lastPage,
          comments: comments,
        };

      res.status(200).json(body);
    } catch (error) {
      next(error);
    }
  });



/*
 * Community : comment 수정
 */
commentRouter.put(
  "/comments/:id",
  login_required,
  async (req, res, next) => {
    try {
      //const userId = req.currentUserId;
      const commentId = req.params.id;
      const content = req.body.content ?? null;
      
      const toUpdate = { content };

      const updateComment = await commentService.setComment({ commentId, toUpdate });

      const body = {
        success: true,
        comment: updateComment
      };

      res.status(200).json(body);
    } catch (error) {
      next(error);
    }
  });


/*
 * Community : comment 삭제
 */
commentRouter.delete(
  "/comments/:id",
  login_required,
  async (req, res, next) => {
    try {
      const commentId = req.params.id;
      const isDeleted = await commentService.deleteComment(commentId);

      res.status(200).json(isDeleted);
    } catch (error) {
      next(error);
    }
  });

export { commentRouter };