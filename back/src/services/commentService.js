import { Comment } from "../db";


class commentService {
  /**
   * Community : comment 생성
   */
  static async addComment({userId, postId, author, content}) {
    const newComment = {userId, postId, author, content};

    // db에 저장
    const createdNewComment = await Comment.createComment(newComment);

    return createdNewComment;
  }

  /**
   * Community : commentId로 comment 읽기
   */
  static async getCommentById(commentId) {
    const comment = await Comment.findCommentById(commentId);
    return comment;
  }

  /**
   * postId로 식별한 commetlist의 마지막 페이지
   */
  static async getLastPage({postId, perPage}) {
    const lastPage = await Comment.findLastPage({postId, perPage})
    return lastPage;
  }

  /**
   * Community : postId로 commentList(comments) 읽기
   */
  static async getCommentByPostId({postId, page, perPage}) {
    const comments = await Comment.findCommentsByPostId({postId, page, perPage});
    return comments;
  }

  /**
   * Community : comment 수정
   */
  static async setComment({commentId, toUpdate}) {
    let comment = await Comment.findCommentById(commentId);

    if (!comment) {
      const error = new Error("수정할 댓글을 찾을 수 없습니다.");
      error.status = 404;
      throw error;
    }

    const myKeys = Object.keys(toUpdate);

    for (let i = 0; i < myKeys.length; i++) {
      if (toUpdate[myKeys[i]] !== null) {
        const fieldToUpdate = myKeys[i];
        const newValue = toUpdate[myKeys[i]];
        comment = await Comment.update({commentId, fieldToUpdate, newValue});
      }
    }

    return comment;
  }

  /**
   * Community : comment 삭제
   */
  static async deleteComment(commentId) {
    const isDataDeleted = await Comment.deleteCommentById(commentId);
    if (isDataDeleted === false) {
      const error = new Error("삭제할 게시글을 찾을 수 없습니다.");
      error.status = 404;
      throw error;
    }
    return {status: "삭제 ok"};
  }
}

export { commentService };