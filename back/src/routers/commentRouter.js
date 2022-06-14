import { Router } from 'express';
import { login_required } from "../middlewares/login_required";
import { userAuthService } from "../services/userService";
import { commentService } from "../services/commentService";

const commentRouter = Router();

/*
 * Community : 해당 포스트에 comment 생성
 */
commentRouter.post(
  "/comments/:postID",
  login_required,
  async (req, res, next) => {
    try{
      //post 식별 ID
      const postID = req.params.postID;
      //로그인한 유저 식별 ID
      const userID = req.currentUserId
      //로그인 유저의 정보 -> author이름 정보 필요
      const user = await userAuthService.getUserInfo({user_id : userID})
      const author = user.name;
      
      const {content} = req.body;

      const newComment = await commentService.addComment({
        postID,
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
  "/comments/:postID",
  login_required,
  async (req, res, next) => {
    try {
      const postID = req.params.postID;
      const comments = await commentService.getComments(postID);

      const body = {
          success: true,
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
      const commentID = req.params.id;
      const content = req.body.content ?? null;
      
      const toUpdate = { content };

      const updateComment = await commentService.setComment({ commentID, toUpdate });

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
      const commentID = req.params.id;
      const isDeleted = await commentService.deleteComment(commentID);

      res.status(200).json(isDeleted);
    } catch (error) {
      next(error);
    }
  });

export { commentRouter };