import { Comment } from "../db";


class commentService {
  /**
   * Community : comment 생성
   */
  static async addComment({postID, author, content}) {
    const newComment = {postID, author, content};

    // db에 저장
    const createdNewComment = await Comment.createComment(newComment);

    return createdNewComment;
  }

  /**
   * Community : commentID로 comment 읽기
   */
  static async getComment(commentID) {
    const comment = await Comment.findCommentById(commentID);
    return comment;
  }

  /**
   * Community : postId로 commentList(comments) 읽기
   */
  static async getComments(postID) {
    const comments = await Comment.findCommentsByPostId(postID);
    return comments;
  }

  /**
   * Community : comment 수정
   */
  static async setComment({commentID, toUpdate}) {
    let comment = await Comment.findCommentById(commentID);

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
        comment = await Comment.update({commentID, fieldToUpdate, newValue});
      }
    }

    return comment;
  }

  /**
   * Community : comment 삭제
   */
  static async deleteComment(commentID) {
    const isDataDeleted = await Comment.deleteCommentById(commentID);
    if (isDataDeleted === false) {
      const error = new Error("삭제할 게시글을 찾을 수 없습니다.");
      error.status = 404;
      throw error;
    }
    return {status: "삭제 ok"};
  }
}

export { commentService };