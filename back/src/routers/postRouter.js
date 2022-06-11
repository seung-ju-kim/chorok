import { Router } from "express";
import { postService } from "../services/postService";
import { userAuthService } from "../services/userService";
import { s3Upload, s3Delete } from "../middlewares/multerS3";
import { login_required } from "../middlewares/login_required";

const postRouter = Router();

/*
 * Community : Post 생성
 */
postRouter.post("/post/create",
  login_required,
  s3Upload(),
  async (req, res, next) => {
    try {
      //로그인한 유저의 고유id
      const userID = req.currentUserId
      //로그인 유저의 정보 -> author이름 정보 필요
      const user = await userAuthService.getUserInfo({user_id : userID});
      const author = user.name;

      //유저가 입력한 request input값
      const {category, title, content} = req.body;
      const saveFile = req.file;
      const fileName = String(saveFile.key).split("post_img/")[1];
      console.log("saveFile",saveFile);
      console.log("fileName",fileName);


      // if (!saveFile){
      //   return res.status(400).json({
      //     success: false,
      //     message: "업로드 실패"
      //   });
      // } 
    
      const newPost = await postService.addPost({
        category,
        userID,
        title,
        content,
        author,
        //imageURL : saveFile.location,
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

postRouter.post(
  "/post/upload",
  login_required,
  s3Upload(),
  async (req, res, next) => {
    try{
      const saveFile = req.file;
      const fileName = String(saveFile.key).split("post_img/")[1];
      console.log("saveFile",saveFile);
      console.log("fileName",fileName);

      

      if (!saveFile){
        return res.status(400).json({
          success: false,
          message: "업로드 실패"
        });
      } else {
        return res.status(200).json({
          success: true,
          message: "업로드 성공",
          imageURL : saveFile.location,
          fileName : fileName
        });
      };

    } catch(error) {
      next(error);
    }
  }
)
  

/*
 * Community : Post 조회
 */
postRouter.get(
  "/post/:id",
  login_required,
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
  login_required,
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
  login_required,
  s3Upload(),
  async (req, res, next) => {
    try {
      //const userId = req.currentUserId;
      const postId = req.params.id;
      
      const saveFile = req.file ?? null;
      const imageURL = saveFile ? saveFile.location : null;

      const category = req.body.category ?? null;
      const title = req.body.title ?? null;
      const content = req.body.content ?? null;
      
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
