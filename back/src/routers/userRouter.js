import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { userValidate } from "../middlewares/userValidation";
import { userAuthService } from "../services/userService";
import is from "@sindresorhus/is";

const userAuthRouter = Router();

/**
 * @swagger
 * paths:
 *   /user/register:
 *     post:
 *       tag: user
 *       summary: 유저를 등록합니다.
 *       description: |
 *         # 유저 등록
 *         유저 정보를 전달받아 회원가입을 진행합니다.
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/user"
 *             example:
 *               name: elice
 *               email: elice@elice.com
 *               password: 1234567!
 *       response:
 *         "201":
 *           description: 정상적으로 회원가입이 되었습니다.
 */

userAuthRouter.post("/register", userValidate.registerUser, async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    const { name, email, password } = req.body;

    const newUser = await userAuthService.addUser({
      name,
      email,
      password,
    });

    if (newUser.errorMessage) {
      throw new Error(newUser.errorMessage);
    }

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

userAuthRouter.post("/login", userValidate.loginUser, async (req, res, next) => {
  try {
    // req (request) 에서 데이터 가져오기
    const {email, password} = req.body;

    // 위 데이터를 이용하여 유저 db에서 유저 찾기
    const user = await userAuthService.getUser({ email, password });

    if (user.errorMessage) {
      throw new Error(user.errorMessage);
    }

    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
});

userAuthRouter.get("/list", login_required, async (req, res, next) => {
  try {
    // 전체 사용자 목록을 얻음
    const users = await userAuthService.getUsers();
    res.status(200).send(users);
  } catch (error) {
    next(error);
  }
});

userAuthRouter.get("/current", login_required, async (req, res, next) => {
  try {
    // jwt토큰에서 추출된 사용자 id를 가지고 db에서 사용자 정보를 찾음.
    const user_id = req.currentUserId;
    const currentUserInfo = await userAuthService.getUserInfo({
      user_id,
    });

    if (currentUserInfo.errorMessage) {
      throw new Error(currentUserInfo.errorMessage);
    }

    res.status(200).send(currentUserInfo);
  } catch (error) {
    next(error);
  }
});

userAuthRouter.put("/:id", login_required, userValidate.updateUser, async (req, res, next) => {
  try {
    // URI로부터 사용자 id를 추출함.
    const user_id = req.params.id;
    // body data 로부터 업데이트할 사용자 정보를 추출함.
    const name = req.body.name ?? null;
    const description = req.body.description ?? null;

    const toUpdate = { name, description };

    // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
    const updatedUser = await userAuthService.setUser({ user_id, toUpdate });

    if (updatedUser.errorMessage) {
      throw new Error(updatedUser.errorMessage);
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
});

userAuthRouter.get("/:id", login_required, async (req, res, next) => {
  try {
    const user_id = req.params.id;
    const currentUserInfo = await userAuthService.getUserInfo({ user_id });

    if (currentUserInfo.errorMessage) {
      throw new Error(currentUserInfo.errorMessage);
    }

    res.status(200).send(currentUserInfo);
  } catch (error) {
    next(error);
  }
});

userAuthRouter.delete(
  "/current",
  login_required,
  async function (req, res, next) {
    try {
      const user_id = req.currentUserId;
      await userAuthService.deleteUser({ user_id });
      res.status(200).send("탈퇴되었습니다.");
    } catch (error) {
      next(error);
    }
  }
);

export { userAuthRouter };
